const indexedDB = window.indexedDB;
const form = document.getElementById('form');
const contenedorProductos = document.getElementById('contenedor-productos')  


if (indexedDB && form) {
    let db
    const request = indexedDB.open('deposito',1);

    request.onsuccess = () => {
        db = request.result
        console.log('OPEN', db)
        readData()

    }
    request.onupgradeneeded = (e) => {
        db = e.target.result
        console.log('Create', db)
        const objectStore = db.createObjectStore('articulos', {
            
            keyPath: 'taskArticulo'
            // autoIncrement: true
        })

    }
    request.onerror = (error) => {
        console.log('Error',error)

    }

    const addData = (data) => {
        const transaction = db.transaction(['articulos'],'readwrite')
        const objectStore = transaction.objectStore('articulos')
        const request = objectStore.add(data)
        readData()
    }

    const getData = (key) => {
        const transaction = db.transaction(['articulos'],'readwrite')
        const objectStore = transaction.objectStore('articulos')
        const request = objectStore.get(key)

        request.onsuccess = () =>{
            form.articulo.value = request.result.taskArticulo
            form.button.dataset.action = 'update'
            form.button.textContent = 'Actualizar Articulo'
        }
    }


    const updateData = (data) => {
        const transaction = db.transaction(['articulos'],'readwrite')
        const objectStore = transaction.objectStore('articulos')
        const request = objectStore.put(data)
        request.onsuccess = () => {
            form.button.dataset.action = 'add'
            form.button.textContent = 'Agregar Tarea'

            readData() 
        }
    }

    const deleteData = (key) => {
        const transaction = db.transaction(['articulos'],'readwrite')
        const objectStore = transaction.objectStore('articulos')
        const request = objectStore.delete(key)
        request.onsuccess = () => {
            readData() 
        }
    }

    const readData = () => {
        const transaction = db.transaction(['articulos'],) //Aca podria ir readonLy, pero no me lo detecta aun. Si no podemos nada, es como esta en teoria por defecto
        const objectStore = transaction.objectStore('articulos')
        const request = objectStore.openCursor()
        const fragment = document.createDocumentFragment()

        request.onsuccess = (e) => {
            const cursor = e.target.result
            if (cursor) {
                const taskArticulo = document.createElement('P')
                taskArticulo.textContent = cursor.value.taskArticulo
                fragment.appendChild(taskArticulo)
                
                const articulosUpdate = document.createElement ('BUTTON')
                articulosUpdate.dataset.type = 'update'
                articulosUpdate.dataset.key = cursor.key
                articulosUpdate.textContent = 'Actualizar'
                fragment.appendChild(articulosUpdate)

                const articulosDelete = document.createElement('BUTTON')
                articulosDelete.textContent = 'Eliminar'
                articulosDelete.dataset.type = 'delete'
                articulosDelete.dataset.key = cursor.key
                fragment.appendChild(articulosDelete)                
                
                cursor.continue()
            } else {
                contenedorProductos.textContent = '' 
                contenedorProductos.appendChild(fragment)
            }

        }


    }


    form.addEventListener ('submit', (e)=> {
        e.preventDefault()
        const data = {
            taskArticulo: e.target.articulo.value
            
        }


        if (e.target.button.dataset.action == 'add') {
            
              addData(data)
        } else if(e.target.button.dataset.action == 'update') {
            
            updateData(data)
        }


        form.reset()
    })

    contenedorProductos.addEventListener('click', (e) => {
        if (e.target.dataset.type == 'update'){

            getData(e.target.dataset.key)
        } else if (e.target.dataset.type == 'delete') {
            deleteData(e.target.dataset.key)
        }
    } )
} 
