const libros = [ {codigo: 1, titulo: 'Caballo De Fuego Paris' , precio: 8100, foto:"./img/caballoDeFuegoParis.webp"},
                 {codigo: 2, titulo: 'Caballo De Fuego Congo', precio: 6300, foto:"./img/cabaloDeFuegoCongo.webp"},
                 {codigo: 3, titulo: 'Caballo De Fuego Gaza',  precio: 6300, foto:"./img/caballoDeFuegoGaza.webp"},
                 {codigo: 4, titulo: 'El Cuarto Arcano',  precio: 5600, foto:"./img/cuartoArcano.webp"},
                 {codigo: 5, titulo: 'Indias Blancas 1', precio: 4200, foto:"./img/indiasBlancas.webp"},
                 {codigo: 6, titulo: 'Indias Blancas 2',  precio: 4500, foto:"./img/indiasBlancas2.webp"},
                 {codigo: 7, titulo: 'El Hechizo Del Agua',  precio: 7100, foto:"./img/elHechizoDelAgua.webp"},
                 {codigo: 8,titulo: 'Bodas de odio',  precio: 6200, foto:"./img/bodasDeOdio.webp"}]
                                  
class CardsLibros{
    constructor ( codigo, titulo, precio, foto){
        this.codigo = codigo
        this.titulo = titulo
        this.precio = precio
        this.foto = foto
    }
}
// modelo de cards para el html
function retornoCard(libro) {
    return `<article class="col-sm-12 col-md-6 col-lg-3 ">
    <div class="card">
    <img src= ${libro.foto} class= "tapaLibro"> 
    <div class="card-body">
    <h5 class="titLibro">${libro.titulo}</h5>
    <p class= "card-text text-center">${libro.precio}</p>
    <button class="btn btn-more d-grid gap-2 col-6 mx-auto " >Agregar al carrito</button>
    </article>
    
`
}
// recorre el array de libros y publica las cards en el html
const container = document.getElementById("container")
	libros.forEach(libro => {
	container.innerHTML += retornoCard(libro)
	})


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
//recorre el carrito haciendo sumatoria de los precios
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
//click en el botón comprar carrito
clickFin = document.querySelector('.btn-success')
clickFin.addEventListener('click', finalizarCompra)

//envía msj de compra exitosa y borra local storage
function finalizarCompra(){
    let msj= document.createElement("p")
    msj.innerHTML=  "<h2>Tu compra ha sido exitosa. Esperamos que vuelvas a visitarnos pronto </h2>"
    document.body.append(msj)

    localStorage.clear()
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





        
    
