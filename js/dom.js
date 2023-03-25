// botones "agregar al carrito"
const clickButton = document.querySelectorAll('.btn')

const tbody = document.querySelector('.tbody')
let carrito = []
clickButton.forEach(boton=>{
    boton.addEventListener('click', buscarLibro)
    
})



// busca los datos del libro seleccionado
function buscarLibro(e){
   const button = e.target
   const item= button.closest('.card')
   const itemTitle = item.querySelector('.titLibro').textContent
   const itemPrecio = item.querySelector('.card-text').textContent
   const newLibro = {
        title: itemTitle,
        precio: itemPrecio,
        cantidad: 1
    }

    agregarAlCarrito(newLibro)
}

//busca el libro seleccionado en el array carrito, en caso de estar, suma 1, sino lo pushea al carrito
function agregarAlCarrito(newLibro){
    const inputLibro = tbody.getElementsByClassName('inputCantidadCarrito')
   
    for(let i=0; i < carrito.length; i++){
        if(carrito[i].title === newLibro.title){
            carrito[i].cantidad ++;
            actualizarCarrito()
            totalCarrito()
            return null;
        }
    }
    
    carrito.push(newLibro)
    actualizarCarrito()
}


// agrega el libro a la tabla de carrito para mostrar al usuario
function actualizarCarrito(){
    tbody.innerHTML = ''
    carrito.map(libro =>{
        const tr = document.createElement('tr')
        tr.classList.add('agregarAlCarrito')
        const content = `
        <th scope="row"></th>
                
                <td class="titulo"> ${libro.title} </td>
                <td class="precio"><p> ${libro.precio}  </p></td>
                <td class="cantidad"><p>${libro.cantidad} </p><td>                               </td>
                
                <button class = "delete boton btn-danger">x</button>
                 
        `
        tr.innerHTML = content
        tbody.append(tr)
        
       
        tr.querySelector('.delete').addEventListener ('click', eliminarLibro)
    })
    totalCarrito()
}
function totalCarrito(){
    let total= 0
    const totalCostoCarrito = document.querySelector('.totalCostoCarrito')
    carrito.forEach((libro)=>{
        const precio= Number(libro.precio.replace('$' , ''))
        total= total + precio*libro.cantidad
    })
    totalCostoCarrito.innerHTML = `Total=  $ ${total}`
    agregarAlStorage()
}
// Busca el libro en el array y borra el libro del carrito
function eliminarLibro(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.agregarAlCarrito')
    const titulo = tr.querySelector('.titulo').textContent 
     
    for(let i=0; i< carrito.length; i++){
        if(carrito[i].title.trim() === titulo.trim()){
            carrito.splice(i,1)
            tr.remove()
        }    
                
    }
    totalCarrito()

}
clickFin = document.querySelector('.btn-success')
clickFin.addEventListener('click', finalizarCompra)

function finalizarCompra(){
    let msj= document.createElement("p")
    msj.innerHTML=  "<h2>Tu compra ha sido exitosa. Esperamos que vuelvas a visitarnos pronto </h2>"
    document.body.append(msj)

    localStorage.clear()
}
function agregarAlStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito = storage
        actualizarCarrito()
    }
}





        
    
