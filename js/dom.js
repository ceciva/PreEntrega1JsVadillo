                        

fetch('./data.json')
    .then((res)=> res.json())
    .then(data=> armarCards(data))
    
    
    
    function armarCards(libros){
        
        libros.forEach(libro=>{

            const container = document.getElementById("container")
            container.innerHTML+= `
            <article class="col-sm-12 col-md-6 col-lg-3 ">
            <div class="card">
            <h6 class="codigo" > ${libro.codigo}</h6>
            <img src= ${libro.foto} class= "tapaLibro"> 
            <div class="card-body">
            <h5 class="titLibro">${libro.titulo}</h5>
            <p class= "card-text text-center">${libro.precio}</p>
            <button class= "btn btn-more d-grid gap-2 col-6 mx-auto id="${libro.codigo}" >Agregar al carrito</button>
            </article>
            `
        })
        // botones "agregar al carrito"
        const clickButton = document.querySelectorAll('.btn')
        clickButton.forEach(boton=>{
            boton.addEventListener('click', buscarLibro)
        })
    }    


const tbody = document.querySelector('.tbody')
let carrito = []

// busca los datos del libro seleccionado
function buscarLibro(e){

    const button = e.target
    const item= button.closest('.card')
    const itemCodigo = item.querySelector('.codigo').textContent
    const itemTitle = item.querySelector('.titLibro').textContent
    const itemPrecio = item.querySelector('.card-text').textContent
    const newLibro = {
        codigo: itemCodigo,
        title: itemTitle,
        precio: itemPrecio,
        cantidad: 1
    }
    console.log(newLibro)
    swalEnCarrito()
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
                <td class= "codigo"> ${libro.codigo}</td>
                <td class="titulo"> ${libro.title} </td>
                <td class="precio"><p> ${libro.precio}  </p></td>
                <td class="cantidad"><p>${libro.cantidad} </p></td>                               
                
                <button class = "delete boton btn-danger">x</button>
                 
        `
        tr.innerHTML = content
        tbody.append(tr)
        
        tr.querySelector('.delete').addEventListener ('click', eliminarLibro)
    })
    totalCarrito()
}
//recorre el carrito haciendo sumatoria de los precios
function totalCarrito(){
    let total= 0
    const totalCostoCarrito = document.querySelector('.totalCostoCarrito')
    carrito.forEach((libro)=>{
        const precio= Number(libro.precio.replace('$' , ''))
        total += precio*libro.cantidad
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
            if(carrito[i].cantidad===1){
                carrito.splice(i,1)
                tr.remove()
            }else{
                carrito[i].cantidad--
            }    
        }    
                
    }
    swalEliminado()
    actualizarCarrito()
    totalCarrito()

}
//click en el botón comprar carrito
clickFin = document.querySelector('.btn-success')
clickFin.addEventListener('click', finalizarCompra)

//envía msj de compra exitosa y borra local storage
function finalizarCompra(){
    if (carrito.length>0){
        swalComprarCarrito()
        localStorage.clear()
    }else{
        swalCarritoVacio()
    }
}

//almacena datos del carrito al local storage
function agregarAlStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
//al hacer refresh busca si hay carrito guardado
window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito = storage
        actualizarCarrito()
    }
}
let nroEnCarrito = document.querySelector('.navbar-brand')

function Sumar1EnCarrito(nroEnCarrito){
  
}

//sweet alert: libro eliminado del carrito
function swalEliminado(){
    Swal.fire({
    position: 'top-start',
    icon: 'error',
    title: 'Libro eliminado del carrito',
    showConfirmButton: false,
    timer: 500
  })}
 

 //sweet alert: Estás seguro de finalizar la compra?
 function swalComprarCarrito(){
    swal.fire({
    title: 'Estás por comprar el carrito',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Comprar!',
    cancelButtonText: 'Quiero seguir comprando',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swal.fire(
        'Tu compra ha sido exitosa. Te derivamos a la página para que realices tu pago',
        formularioPago()
      )
    } 
  })} 

   //sweet alert: libro agregado al carrito
   function swalEnCarrito(){
   Swal.fire({
    position: 'top-start',
    icon: 'success',
    title: 'Libro agregado al carrito',
    showConfirmButton: false,
    timer: 500
  })} 
  //sweet alert: El carrito está vacío
  function swalCarritoVacio(){
    Swal.fire({
        position: 'top-start',
        icon: 'error',
        title: 'El carrito está vacío',
        showConfirmButton: true,
        
      })}
function formularioPago(){
    
}      






        
    
