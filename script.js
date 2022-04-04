const indexedDB = window.indexedDB;
const form = document.querySelector('#form');
const contenedorProductos = document.querySelector('#contenedor-productos')  


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

    const readData = () => {
        const transaction = db.transaction(['articulos'],) //Aca podria ir readonLy, pero no me lo detecta aun.
        const objectStore = transaction.objectStore('articulos')
        const request = objectStore.openCursor()
        const fragment = document.createDocumentFragment()

        request.onsuccess = (e) => {
            const cursor = e.target.result
            if (cursor) {
                const taskArticulo = document.createElement('P')
                taskArticulo.textContent = cursor.value.taskArticulo
                fragment.appendChild(taskArticulo)
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
      addData(data)
    })



} 
