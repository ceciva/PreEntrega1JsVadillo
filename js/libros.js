const libros = [ {codigo: 1, titulo: 'Caballo De Fuego Paris' , precio: 8100, foto:"./img/caballoDeFuegoParis.webp"},
                 {codigo: 2, titulo: 'Caballo De Fuego Congo', precio: 6300, foto:"./img/cabaloDeFuegoCongo.webp"},
                 {codigo: 3, titulo: 'Caballo De Fuego Gaza',  precio: 6300, foto:"./img/caballoDeFuegoGaza.webp"},
                 {codigo: 4, titulo: 'El Cuarto Arcano',  precio: 5600, foto:"./img/cuartoArcano.webp"},
                 {codigo: 5, titulo: 'Indias Blancas', precio: 4200, foto:"./img/indiasBlancas.webp"},
                 {codigo: 6, titulo: 'Indias Blancas',  precio: 4500, foto:"./img/indiasBlancas2.webp"},
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


function retornoCard(libro) {
    return `<article class="col-sm-12 col-md-6 col-lg-3 ">
    <div class="card" id="cardLibro ">
    <img src= ${libro.foto} class= "tapaLibro"> 
    <div class="card-body">
    <h5 class="titLibro">${libro.titulo}</h5>
    <p class= "card-text text-center">${libro.precio}</p>
    <button class="btn btn-more d-grid gap-2 col-6 mx-auto " >Agregar al carrito</button>
    </article>
    
`
}

const container = document.getElementById("container")
	libros.forEach(libro => {
	container.innerHTML += retornoCard(libro)
	})

    