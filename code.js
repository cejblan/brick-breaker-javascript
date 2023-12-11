/*
El método querySelector() devuelve el primer elemento del
documento que coincide con el selector CSS especificado.
*/
const contenedor = document.querySelector('.contenedor')
//Medidas
const heightTable = 300
const widthTable = 570
const heightBloque = 20
const widthBloque = 100
//Velocidad de Movimiento
speedBall = 20
speedUser = 10
//Posicion del Usuario
const initialPositionlUser = [230, 10]
let actualPositionUser = initialPositionlUser
//Posicion del balon
const initialPositionlBall = [270, 40]
let actualPositionlBall = initialPositionlBall
//Particularidad del balon
let xDirectionBall = 2
let yDirectionBall = 2
let diameter = 20
//Timer
let timerID
//Clase Bloque
class Bloque {
    /*
    El constructor es un método especial que se utiliza para crear
    instancias de una clase. El constructor se llama cuando se crea
    una nueva instancia de una clase, y se puede utilizar para
    inicializar los valores de los atributos de la instancia.
    */
    constructor(ejeX, ejeY) {
        this.bottomLeft = [ejeX, ejeY]
        this.bottomRight = [ejeX + widthBloque, ejeY]
        this.topLeft = [ejeX, ejeY + heightBloque]
        this.topRight = [ejeX + widthBloque, ejeY + heightBloque]
    }
}
//Definir todos los bloques
const bloques = [
    new Bloque(10, 250),
    new Bloque(120, 250),
    new Bloque(230, 250),
    new Bloque(340, 250),
    new Bloque(450, 250),
    new Bloque(10, 220),
    new Bloque(120, 220),
    new Bloque(230, 220),
    new Bloque(340, 220),
    new Bloque(450, 220),
    new Bloque(10, 190),
    new Bloque(120, 190),
    new Bloque(230, 190),
    new Bloque(340, 190),
    new Bloque(450, 190),
]

//Codigo que escucha el button start
const escuchar = document.querySelector("#button");
//Se agregar listener
escuchar.addEventListener("click",
    function ejecutar() {
        //Se busca por id
        var lista = document.getElementById("container");
        //Se asigna la variable item el elemento con id ='start'de la lista
        var item = lista.querySelector('#start');
        lista.removeChild(item);
        //Se crea el div contenedor
        const contenedor = document.createElement('div')
        contenedor.setAttribute("id", "contenedor")
        container.appendChild(contenedor)

        //Function añadir bloques
        function addBloques() {
            for (let i = 0; i < bloques.length; i++) {
                /*
                createElement() crea un nuevo elemento HTML. El método
                createElement() tiene un solo parámetro, que es el nombre
                del elemento HTML que desea crear.
                */
                const bloque = document.createElement('div')
                /*
                El método classList.add() agrega una clase a un elemento
                HTML. El método classList.add() tiene un solo parámetro,
                que es el nombre de la clase que desea agregar.
                */
                bloque.classList.add('bloque')
                /*
                El atributo style de un elemento HTML se utiliza para establecer
                o obtener los estilos CSS del elemento. El atributo style es un
                objeto CSSStyleDeclaration que contiene propiedades CSS.
        
                La propiedad left del atributo style se utiliza para establecer o
                obtener la posición horizontal de un elemento. La posición horizontal
                se mide en píxeles desde el borde izquierdo del contenedor del elemento.
                Lo misma logica aplica para la propiedad bottom.
                */
                bloque.style.left = bloques[i].bottomLeft[0] + 'px'
                bloque.style.bottom = bloques[i].bottomLeft[1] + 'px'
                /*
                El método appendChild() agrega un nodo al final de la lista de hijos
                de un elemento padre. El método appendChild() tiene un solo parámetro,
                que es el nodo que desea agregar.
                */
                contenedor.appendChild(bloque)
            }
        }
        addBloques()
        //Definir Usuario
        function drawUser() {
            usuario.style.left = actualPositionUser[0] + 'px'
            usuario.style.bottom = actualPositionUser[1] + 'px'
        }
        const usuario = document.createElement('div')
        usuario.classList.add('usuario')
        contenedor.appendChild(usuario)
        drawUser()
        //Mover Usuario
        //La "e" es un evento (las teclas que se presionan)
        function moverUser(e) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (actualPositionUser[0] > 0) {
                        actualPositionUser[0] -= speedUser
                        drawUser()
                    }
                    if (actualPositionUser[0] <= 0) {
                        actualPositionUser[0] = 0
                        drawUser()
                    }
                    break
                case 'ArrowRight':
                    if (actualPositionUser[0] < (widthTable - widthBloque)) {
                        actualPositionUser[0] += speedUser
                        drawUser()
                    }
                    if (actualPositionUser[0] >= (widthTable - widthBloque)) {
                        actualPositionUser[0] = (widthTable - widthBloque)
                        drawUser()
                    }
            }
        }
        //Añadir evento que escucha
        document.addEventListener('keydown', moverUser)

        //Dibujar el balon
        function drawBall() {
            ball.style.left = actualPositionlBall[0] + 'px'
            ball.style.bottom = actualPositionlBall[1] + 'px'
        }
        const ball = document.createElement('div')
        ball.classList.add('ball')
        contenedor.appendChild(ball)
        drawBall()

        function moverBall() {
            actualPositionlBall[0] += xDirectionBall
            actualPositionlBall[1] += yDirectionBall
            drawBall()
            revisarColisiones()
            gameOver()
        }

        timerID = setInterval(moverBall, speedBall)

        //Colisiones con las paredes
        function revisarColisiones() {
            //Colision con bloques
            for (let i = 0; i < bloques.length; i++) {
                if ((actualPositionlBall[0] > bloques[i].bottomLeft[0] && actualPositionlBall[0] < bloques[i].bottomRight[0]) &&
                    ((actualPositionlBall[1] + diameter) > bloques[i].bottomLeft[1] && actualPositionlBall[1] < bloques[i].topLeft[1])
                ) {
                    const todosBloques = Array.from(document.querySelectorAll('.bloque'))
                    //le quita la clase
                    todosBloques[i].classList.remove('bloque')
                    //splice lo elimina del array
                    bloques.splice(i, 1)
                    if (bloques[0] === undefined) {
                        var lista = document.getElementById("container");
                        var item = lista.querySelector('#contenedor');
                        lista.removeChild(item);

                        const contenedor = document.createElement('div')
                        contenedor.setAttribute("id", "start")
                        container.appendChild(contenedor)

                        const h1 = document.createElement('h1')
                        h1.textContent = "Level Complete";
                        contenedor.appendChild(h1)

                        const button = document.createElement('button')
                        button.setAttribute("id", "button")
                        button.textContent = "Level 2";
                        contenedor.appendChild(button)

                        const escuchar = document.querySelector("#button");
                        escuchar.addEventListener("click",
                            function () {
                                location.reload();
                            })
                    }
                    changeDirectionTodo();
                }
            }
            //Colision con paredes
            if (
                actualPositionlBall[0] >= (widthTable - diameter) ||
                actualPositionlBall[1] >= (heightTable - diameter) ||
                actualPositionlBall[0] <= 0 ||
                actualPositionlBall[1] <= 0
            ) {
                changeDirectionTodo()
            }
            //Colision del Usuario
            if ((actualPositionlBall[0] > actualPositionUser[0] && actualPositionlBall[0] < actualPositionUser[0] + widthBloque) &&
                (actualPositionlBall[1] > actualPositionUser[1] && actualPositionlBall[1] < actualPositionUser[1] + heightBloque)
            ) {
                changeDirectionTodo()
            }
        }
        //Game Over
        function gameOver() {
            if (actualPositionlBall[1] <= 0) {
                clearInterval(timerID)
                document.removeEventListener('keydown', moverUser)

                var lista = document.getElementById("container");
                var item = lista.querySelector('#contenedor');
                lista.removeChild(item);

                const contenedor = document.createElement('div')
                contenedor.setAttribute("id", "start")
                container.appendChild(contenedor)

                const h1 = document.createElement('h1')
                h1.textContent = "Game Over";
                contenedor.appendChild(h1)

                const button = document.createElement('button')
                button.setAttribute("id", "button")
                button.textContent = "Restart";
                contenedor.appendChild(button)

                const escuchar = document.querySelector("#button");
                escuchar.addEventListener("click",
                    function () {
                        location.reload();
                    })
            }
        }
        //Cambiar direccion del balon, todo menos usuario
        function changeDirectionTodo() {
            if (xDirectionBall === 2 && yDirectionBall === 2) {
                yDirectionBall = -2
                return
            }
            if (xDirectionBall === 2 && yDirectionBall === -2) {
                xDirectionBall = -2
                return
            }
            if (xDirectionBall === -2 && yDirectionBall === -2) {
                yDirectionBall = 2
                return
            }
            if (xDirectionBall === -2 && yDirectionBall === 2) {
                xDirectionBall = 2
                return
            }
        }

        /*
        //Cambiar direccion del balon, usuario
        function changeDirectionUser() {
            if (xDirectionBall === 2 && yDirectionBall === -2) {
                yDirectionBall = 2
                xDirectionBall = -2
                return
            }
            if (xDirectionBall === -2 && yDirectionBall === -2) {
                yDirectionBall = 2
                xDirectionBall = 2
                return
            }
        }
        */
    });







/*Mejoras incorporadas

- Se corrigio el movimiento del usuario cuando se desplazaba mas de 10px, ya que se salia de las paredes
- Se crearon variables para la velocidad de desplazamiento
- Se agrego un div con el nombre del juego y button start
- Se agrego un div con la frase Game Over y button restart
- Se agrego pantalla de nuevo nivel

(Trabajando en esto) (Falta corregir que se escucha)
- Se creo changeDirectionUser para corregir el redireccionamiento del balon. Si golpeaba al lateral, igual baja




- Se agrego bucle de niveles
- Corregir bug. La bola se queda repotando en la barra del usuario

*/