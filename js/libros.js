window.addEventListener("load", function () {})
let libro1 = 5500
let libro2 = 5500
let libro3 = 5500
let libro4 = 4800
let libro5 = 4200
let libro6 = 4500
let libro7 = 6800
let libro8 = 6200
let continuar = true

function preguntarPrecios(){
    while (continuar){
        iniciarConsulta()
        continuar = confirm("Querés consultar el precio de otro libro?")
    }
}

function iniciarConsulta(){
    let libroElegido = parseInt(prompt("Ingrese el número del libro que desea comprar \n 1- Caballo de fuego Paris \n 2- Caballo de fuego Congo \n 3- Caballo de fuego Gaza \n 4- El cuarto arcano \n 5- Indias blancas 1 \n 6- Indias blancas 2 \n 7- El hechizo del agua \n 8- Bodas de odio"))
                                      

    if (libroElegido >8 ||libroElegido <1 ){
        alert('Ingresaste un nro de libro incorrecto')
        return
    }
        switch(libroElegido){
            case 1:
                msjCosto = "Caballo de fuego Paris cuesta: $ " + libro1
                break
            case 2:
                msjCosto = "Caballo de fuego Congo cuesta: $ " + libro2
                break
            case 3:
                msjCosto = "Caballo de fuego Gaza cuesta: $ " + libro3
                break
            case 4:
                msjCosto = " Cuarto arcano cuesta: $ " + libro4
                break
            case 5:
                msjCosto = "Indias blancas 1 cuesta: $ " + libro5
                break
            case 6:
                msjCosto = "Indias blancas 2 cuesta: $ " + libro6
                break
            case 7:
                msjCosto = "El hechizo del agua cuesta: $ " + libro7
                break
            case 8:
                msjCosto = "Bodas de odio cuesta: $ " + libro8
                break
            default:
                alert('Ingresaste un nro de libro incorrecto')  
                return          
        }
        alert (msjCosto)
                        
}

preguntarPrecios()

    
    
    
 