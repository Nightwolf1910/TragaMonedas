//JUEGO - INSTALACION =========
function bernoulli(p){
    return 1 && ( Math.random() < p ) || 0 
}
function getRewards(p, max){
    var reward = 0
    for(var i = 0; i < max ; i++){
    reward += bernoulli(p)
    }
    return reward
}
function debugResult(p, tries, maxRewards){
    var rewards = []
    var sum = 0
    for(var i = 0; i < tries ; i++){
        var r = getRewards(p, maxRewards)
        rewards.push(r)
        sum += r
    }
    console.log(rewards, sum, sum/tries)
}
function get2Randoms(options){
    var r1 = Math.floor(Math.random() * options.length)
    var result1 = options.splice(r1, 1)
    var r2 = Math.floor(Math.random() * options.length)
    var result2 = options.splice(r2, 1)
    return [result1[0], result2[0]]
}
function getResultNoReward(){
    return get2Randoms(['J', 'Q', 'K', 'A']).join('')
}
function getResult(p){
    var rewards = []
    var sum = 0
    var maxRewards = 10
    var tries = 5
    var results = [
        '', '', 'JJ', 'QQ', 'KK', '', '', 'AA'
    ]
    var r = getRewards(p, maxRewards)
    var result = results[ r < results.length ? r : 0 ]
    if(result == ''){
        return getResultNoReward()
    }
    return result
}
function getWin(result){
    var results = {
        'JJ': 2, 'QQ': 3, 'KK': 4, 'AA': 10
    }
    var win = results[result]
    return win || 0
}
function getDistributions(){
    return get2Randoms([0.2, 0.4])
}

function apostarYJugar(maquina, apuesta){
    var resultado = getResult(maquina)
    var ganancia = getWin(resultado)
    return {
        resultado,
        ganancia
    }
}

function imprimirIntento(i, maquina, intento){
     console.log(
        i + '-',
        maquina + ':', 
        intento.resultado, 
        intento.ganancia, 
        intento.ganancia * apuesta
    )
    var resultadoWin = intento.ganancia;
    if(resultadoWin != 0){
        console.log('GANASTE!')
    }
}
//JUEGO - INICIO ===============================
var distribuciones = getDistributions()
console.log(distribuciones)
//0.4 significa que tiene más probabilidades de ganar que 0.2
var maquinas = {
    maquinaA: distribuciones[0],
    maquinaB: distribuciones[1]
}

//JUGAR ========================================
//INTENTO 1
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 1
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO 2
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 2
var maquina = 'maquinaB'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO 3
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 3
var maquina = 'maquinaB'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO 4
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 4
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)

//INTENTO N mientras se tenga monedas para apostar
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 10
var maquina = 'maquinaA'
var apuesta = 10
var intento = apostarYJugar(maquinas[maquina])
imprimirIntento(i, maquina, intento)


//AQUI TERMINA EL CÓDIGO DEL PROFE

var monedas;

var posAleatoria;
var nomAnimalesAnonimos = [
    "Mono Anónimo", "Perro Anónimo", "Gato Anónimo", "Lemur Anónimo", "Cerdo Anónimo", "Loro Anónimo", "Ratón Anónimo", "Lagarto Anónimo", "T-rex Anónimo"
]
var primeraVez=true;
var modalBienvenida;

const asignarNombreAnimal = () =>{
    posAleatoria = Math.floor(Math.random() * 3);
    var nombre = nomAnimalesAnonimos[posAleatoria];

    const inputNombre = document.querySelector("#nombreInicio");
    inputNombre.setAttribute("value", `${nombre}`)
}

const main = () =>{
    asignarNombreAnimal();
    startMonedas();
    //Mostrar la ventana bienvenida una vez
    localStorage.setItem("primera vez",primeraVez);
    const divBienvenida=document.querySelector("#bienvenida");
    modalBienvenida=new bootstrap.Modal(divBienvenida);
    if(primeraVez==true){
        modalBienvenida.toggle();
        primeraVez=false;
        localStorage.setItem("primera vez",primeraVez);
    }
}

const startMonedas = () =>{
    monedas = 200;
    setMonedas()
} 

const setMonedas = () => {
    document.getElementById("monedas").innerText = monedas;
}

const setApuestas10 = () => {
    document.getElementById("apuesta1").innerText=10;
    document.getElementById("apuesta2").innerText=10;
}

const apostarMenos1 = () => {
    document.getElementById("btR1").disabled=false;
    while(document.getElementById("btL1").disabled==false){
        if(parseInt(document.getElementById("apuesta1").innerText)>0){
            document.getElementById("apuesta1").innerText=parseInt(document.getElementById("apuesta1").innerText)-10;
            if(parseInt(document.getElementById("apuesta1").innerText)==0){
                document.getElementById("btL1").disabled=true;
                document.getElementById("btAPOSTAR1").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btL1").addEventListener("click", apostarMenos1);

const apostarMas1 = () => {
    document.getElementById("btAPOSTAR1").disabled=false;
    document.getElementById("btL1").disabled=false;
    while(document.getElementById("btR1").disabled==false){
        if(parseInt(document.getElementById("apuesta1").innerText)<monedas){
            document.getElementById("apuesta1").innerText=parseInt(document.getElementById("apuesta1").innerText)+10;
            if(parseInt(document.getElementById("apuesta1").innerText)==monedas){
                document.getElementById("btR1").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btR1").addEventListener("click", apostarMas1);

const apostarMas2 = () => {
    document.getElementById("btAPOSTAR2").disabled=false;
    document.getElementById("btL2").disabled=false;
    while(document.getElementById("btR2").disabled==false){
        if(parseInt(document.getElementById("apuesta2").innerText)<monedas){
            document.getElementById("apuesta2").innerText=parseInt(document.getElementById("apuesta2").innerText)+10;
            if(parseInt(document.getElementById("apuesta2").innerText)==monedas){
                document.getElementById("btR2").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btR2").addEventListener("click", apostarMas2);

const apostarMenos2 = () => {
    document.getElementById("btR2").disabled=false;
    while(document.getElementById("btL2").disabled==false){
        if(parseInt(document.getElementById("apuesta2").innerText)>0){
            document.getElementById("apuesta2").innerText=parseInt(document.getElementById("apuesta2").innerText)-10;
            if(parseInt(document.getElementById("apuesta2").innerText)==0){
                document.getElementById("btL2").disabled=true;
                document.getElementById("btAPOSTAR2").disabled=true;
            }else{
                break;
            }
        }
    }
}
document.getElementById("btL2").addEventListener("click", apostarMenos2);
//EL usuario ingresa por primera vez

window.addEventListener("load",main);
