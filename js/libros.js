const libros = [ {titulo: 'Caballo De Fuego Paris' , codigo: 1, precio: 5500},
                 {titulo: 'Caballo De Fuego Congo', codigo: 2, precio: 5500},
                 {titulo: 'Caballo De Fuego Gaza', codigo: 3, precio: 5500},
                 {titulo: 'El Cuarto Arcano', codigo: 4, precio: 4800},
                 {titulo: 'Indias Blancas', codigo: 5, precio: 4200},
                 {titulo: 'Indias Blancas', codigo: 6, precio: 4500},
                 {titulo: 'El Hechizo Del Agua', codigo: 7, precio: 6800},
                 {titulo: 'Bodas de fuego', codigo: 8, precio: 6200}]
                 
class CarritoCompra{
    constructor (titulo, codigo, precio){
        this.titulo = titulo
        this.codigo = codigo
        this.precio = precio
    }
}
const carritoCompra = []

let continuar = true
let libroElegido = 0
totalCarrito = 0

window.addEventListener("load", function () {
comprar()
})


function comprar(){
    while (continuar){ 
        iniciarConsulta()
        continuar = confirm("Querés comprar otro libro?")
    }
    
    finalizarCompra()
    console.log('compraste los siguientes libros: ')
    mostrarCarrito () 
    console.log('el total de tu compra es de $: ' + totalCarrito)
    
    // alert((carritoCompra.join ("\n")) + "\nEl total de tu compra es de $: "+ totalCarrito +"\nGracias por tu compra")
}    

//promptea nro de libro a comprar  chequea su validez
function iniciarConsulta(){
    let libroElegido = parseInt(prompt("Ingrese el número del libro que desea comprar "))

    if (libroElegido > libros.length|| libroElegido< 1 ||!parseInt(libroElegido)){
        alert('Ingresaste un nro de libro incorrecto')
        return
    }else{
        buscarLibro(libroElegido)
    }
}
//busca el libro en el array y lo pushea al carrito de compras
function buscarLibro(libroElegido){
    let resultado = libros.find(libro => libro.codigo === libroElegido)
    carritoCompra.push(new CarritoCompra(resultado.titulo, resultado.codigo, resultado.precio))
    
    
}       
// recorre el carrito y suma el precio de cada libro
function finalizarCompra(){
    carritoCompra.forEach((el)=>{
        totalCarrito += el.precio
    })

    
}
//muestra el contenido del carrito de compras
function mostrarCarrito(){
    
    for (el of carritoCompra){
        console.log(el.titulo, el.precio)
    }
}    
    



