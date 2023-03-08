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
    console.log('compraste los siguientes libros: ' )
    mostrarCarrito () 
    
    //preguntar si confirma la compra, vaciar el carrito o sacar algún libro del carrito
    let confirmarOVaciar = prompt('el total de tu compra es de $: ' + totalCarrito  + '\nPresione \n  1 para confirmar \n  2 para vaciar el carrito ')
    if (confirmarOVaciar ==='1'){
        console.log('compra confirmada \nGracias, esperamos tu próxima compra')
        
    }else{
        if (confirmarOVaciar ==='2'){
            vaciarCarrito()
        }else{
            alert('ingresaste una opción equivocada')
            
        }
        
    }finalizarCompra()            
          
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
// recorre el carrito y suma el precio de cada libro del carrito de compras
function finalizarCompra(){
    carritoCompra.forEach((el)=>{
        totalCarrito += el.precio
    })

    
}
//muestra el contenido del carrito de compras
function mostrarCarrito(){
    if (carritoCompra.length>0){
        for (el of carritoCompra){
            console.log(el.titulo, el.precio)
        }
    }else{
        console.log('el carrito de compras está vacio')
        
        
    }
} 
//vacía el carrito
function vaciarCarrito(){
    while (carritoCompra.length>0){
        carritoCompra.pop()
        mostrarCarrito()
    }
}

