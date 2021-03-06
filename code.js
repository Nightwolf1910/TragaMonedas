var win=false; //flag
var animToggleA=false;
var animToggleB=false;
var apuestaCobrarA;
var apuestaCobrarB;
var cambiarBotonA=false;
var cambiarBotonB=false;
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

function imprimirIntento(i, maquina, intento, apuesta){
     console.log(
        i + '-',
        maquina + ':', 
        intento.resultado, 
        intento.ganancia, 
        intento.ganancia * apuesta
    )

    var resultadoWin = intento.ganancia;    
    var gananciaTotal = intento.ganancia * apuesta;

    var letras = intento.resultado.split("");
    var letra1 = letras[0]; 
    var letra2 = letras[1];

    if(maquina == 'maquinaA'){
        apuestaCobrarA = gananciaTotal;
        const letraA1 = document.querySelector("#LetraM1-A");
        letraA1.innerHTML = `${letra1}`
        movLetrasMA_2(letra2,resultadoWin, maquina,apuesta,gananciaTotal)
    }else{
        apuestaCobrarB = gananciaTotal;
        const letraA1 = document.querySelector("#LetraM2-A");
        letraA1.innerHTML = `${letra1}`
        movLetrasMB_2(letra2,resultadoWin, maquina,apuesta,gananciaTotal)
    }

    
    
    /*
    if(resultadoWin != 0){
        win = true;
        if(maquina == 'maquinaA'){
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '??GANASTE!'
        }else{
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '??GANASTE!'
        }
    }else{
        win = false;
        if(maquina == 'maquinaA'){
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '-'
        }else{
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '-'
        }
    }
*/
    

}

//JUEGO - INICIO ===============================
var distribuciones = getDistributions()
console.log(distribuciones)
//0.4 significa que tiene m??s probabilidades de ganar que 0.2
var maquinas = {
    maquinaA: distribuciones[0],
    maquinaB: distribuciones[1]
}
/*
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
*/

//AQUI TERMINA EL C??DIGO DEL PROFE


var posAleatoria;
var nomAnimalesAnonimos = [
    "MONO AN??NIMO", "PERRO AN??NIMO", "GATO AN??NIMO", "LEMUR AN??NIMO", "CERDO AN??NIMO", "LORO AN??NIMO", "RAT??N AN??NIMO","ULIME??O AN??NIMO", "LAGARTO AN??NIMO", "T-REX AN??NIMO"
]

var nombreCambiadoPorPrimeraVez=false;
var modalBienvenida;
var gananciaAux;
var usuarios=[
    {
        id:1,
        nombre:"",
        monedas:200,
        numeroDeApuestas:0,
        ganancia:0
    },
    {
        id:2,
        nombre:"Billy",
        monedas:500,
        numeroDeApuestas:8,
        ganancia:160
    },
    {
        id:3,
        nombre:"Mario",
        monedas:350,
        numeroDeApuestas:6,
        ganancia:50
    },
    {
        id:4,
        nombre:"Jose",
        monedas:600,
        numeroDeApuestas:15,
        ganancia:250
    },
    {
        id:5,
        nombre:"Alberto",
        monedas:400,
        numeroDeApuestas:20,
        ganancia:200
    },
    {
        id:6,
        nombre:"Luis",
        monedas:450,
        numeroDeApuestas:10,
        ganancia:50
    },
    {
        id:7,
        nombre:"Angel",
        monedas:210,
        numeroDeApuestas:9,
        ganancia:100
    },
    {
        id:8,
        nombre:"Javier",
        monedas:250,
        numeroDeApuestas:3,
        ganancia:30
    },
    {
        id:9,
        nombre:"Olenka",
        monedas:300,
        numeroDeApuestas:10,
        ganancia:60
    },
    {
        id:10,
        nombre:"Fabricio",
        monedas:450,
        numeroDeApuestas:13,
        ganancia:200
    },
    {
        id:11,
        nombre:"Carlos",
        monedas:310,
        numeroDeApuestas:6,
        ganancia:40
    },
    {
        id:12,
        nombre:"Renato",
        monedas:360,
        numeroDeApuestas:5,
        ganancia:50
    },
]
var jugador= usuarios.find(x => x.id == 1);
var monedas=jugador.monedas;

const asignarNombreAnimal = () =>{
    posAleatoria = Math.floor(Math.random() * 9);
    var nombre = nomAnimalesAnonimos[posAleatoria];

    const inputNombre = document.querySelector("#nombreInicio");
    inputNombre.setAttribute("value", `${nombre}`)
}

const startMonedas = () =>{
    monedas = 200;
    setMonedas(monedas)
} 

const realizarApuesta = (apuesta) =>{
    monedas = monedas - apuesta;
    setMonedas(monedas)
}

const ganarApuesta = (ganancia) =>{
    monedas = monedas + ganancia;
    setMonedas(monedas)
}

const setMonedas = (cant) => {
    document.getElementById("monedas").innerText = cant;
}

const setApuestas10 = () => {
    document.getElementById("apuesta1").innerText=10;
    document.getElementById("apuesta2").innerText=10;
}

const apostarMenos1 = () => {
    if((document.getElementById("apuesta1").innerText)<=monedas+10){
        document.getElementById("btAPOSTAR1").disabled=false;
    }
    if((document.getElementById("apuesta1").innerText)<=monedas){
        document.getElementById("btAPOSTAR1").disabled=false;
        document.getElementById("btR1").disabled=false;
    }
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
    if((document.getElementById("apuesta2").innerText)<=monedas+10){
        document.getElementById("btAPOSTAR2").disabled=false;
    }
    if((document.getElementById("apuesta2").innerText)<=monedas){
        document.getElementById("btAPOSTAR2").disabled=false;
        document.getElementById("btR2").disabled=false;
    }
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
const butAbrirRankingOnClick=()=>{
    ordenarUsuarios(usuarios);
    cargarTablaRanking();
    modalCrearRanking.toggle();
}
const butCambiarNombreOnClick=()=>{
    modalCambiarNombre.toggle();
}

const butAbrirAcercaDeOnClick=()=>{
    modalAcercaDe.toggle();
}

const butAbrirInstruccionesOnClick=()=>{
    modalInstrucciones.toggle();
}

const butIngresarNombreInicialOnClick=()=>{
    usuarios[0]['nombre']=document.getElementById("nombreInicio").value;
    document.getElementById("nombre").innerText=usuarios[0]['nombre'];
}
const butIngresarNombreCambiadoOnClick=()=>{
    jugador.nombre=document.getElementById("nombreCambiado").value;
    document.getElementById("nombre").innerText=jugador.nombre;
    if(nombreCambiadoPorPrimeraVez==false){
        //const result = usuarios.find(x => x.id == 1);
        monedas=200;
        document.querySelector("#monedas").innerText=monedas;
        nombreCambiadoPorPrimeraVez=true;
    }
    setApuestas10();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var apostar1 = document.getElementById("btAPOSTAR1");
  var apostar2 = document.getElementById("btAPOSTAR2");
  var L1 = document.getElementById("btL1");
  var L2 = document.getElementById("btL2");
  var R1 = document.getElementById("btR1");
  var R2 = document.getElementById("btR2");


const ApostarOnClickMaquinaA = async () =>{

    var apuesta = parseInt(document.getElementById("apuesta1").innerHTML);
    //var text = document.getElementById("btAPOSTAR1").innerHTML;

    if(cambiarBotonA==false){
        animToggleA=true;
        animacionMA()
        movLetrasMA_1()
        realizarApuesta(apuesta);
        jugador.numeroDeApuestas++;
        apostar1.disabled=true;
        R1.disabled=true;
        L1.disabled=true;
         //implementar audio al girar en la maquina B
        var audiogirar=document.getElementById('audio-girar'); 
        audiogirar.play(); 
    }else{
        funcionCobrarA();
        document.querySelector("#btAPOSTAR1").innerText="APOSTAR";
        if(document.querySelector("#btAPOSTAR2").innerText=="APOSTAR"){
            apostar2.disabled=false;
            L2.disabled=false;
            R2.disabled=false;
            verificarB();
        }
    }
    if(document.querySelector("#btAPOSTAR2").innerText=="APOSTAR"){
        verificarB();
    }

}
document.getElementById("btAPOSTAR1").addEventListener("click", ApostarOnClickMaquinaA);

const ApostarOnClickMaquinaB = async () =>{
    var apuesta = parseInt(document.getElementById("apuesta2").innerHTML);

    if(cambiarBotonB==false){
        animToggleB=true;
        animacionMB()
        movLetrasMB_1()
        realizarApuesta(apuesta);
        jugador.numeroDeApuestas++;
        apostar2.disabled=true;
        R2.disabled=true;
        L2.disabled=true;
        //implementar audio al girar en la maquina B
        var audiogirar=document.getElementById('audio-girar'); 
        audiogirar.play(); 
    }else{
        funcionCobrarB()
        document.querySelector("#btAPOSTAR2").innerText="APOSTAR";
        if(document.querySelector("#btAPOSTAR1").innerText=="APOSTAR"){
            apostar1.disabled=false;
            L1.disabled=false;
            R1.disabled=false;
            verificarA();
        }
    }
    if(document.querySelector("#btAPOSTAR1").innerText=="APOSTAR"){
        verificarA();   
    }
}
document.getElementById("btAPOSTAR2").addEventListener("click", ApostarOnClickMaquinaB);


const movLetrasMA_1 = () =>{
    var cont=0;
    const letraRandom = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        var rand2 = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM1-A").innerHTML = letra1[rand];
        document.querySelector("#LetraM1-B").innerHTML = letra1[rand2];
        cont++;
        //console.log(letra[rand])
    
        if(cont>5){
            clearInterval(repetir)
            var maquina = 'maquinaA'
            var displayApuesta = document.getElementById("apuesta1")
            var apuesta = parseInt(displayApuesta.innerHTML)
            var intento = apostarYJugar(maquinas[maquina])
            imprimirIntento(1, maquina, intento,apuesta)
        }
    }
    
    letraRandom()
    var repetir = setInterval(letraRandom,250);
}

const movLetrasMB_1 = () =>{
    var cont=0;
    const letraRandom = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        var rand2 = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM2-A").innerHTML = letra1[rand];
        document.querySelector("#LetraM2-B").innerHTML = letra1[rand2];
        cont++;
        //console.log(letra[rand])
    
        if(cont>5){
            clearInterval(repetir)
            var maquina = 'maquinaB'
            var displayApuesta = document.getElementById("apuesta2")
            var apuesta = parseInt(displayApuesta.innerHTML)
            var intento = apostarYJugar(maquinas[maquina])
            imprimirIntento(1, maquina, intento,apuesta)
        }
    }
    
    letraRandom()
    var repetir = setInterval(letraRandom,250);
}

const movLetrasMA_2 = (letra, result, maq,apuest,ganTotal) =>{
    var cont=0;
    const letraRandom2 = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM1-B").innerHTML = letra1[rand];
        cont++;
    
        if(cont>2){
            clearInterval(repetir)
            const letraA2 = document.querySelector("#LetraM1-B");
            letraA2.innerHTML = `${letra}`
           
            mostrarResultado(result,maq,apuest,ganTotal)
        }
    }
    
    letraRandom2()
    var repetir = setInterval(letraRandom2,250);
}

const movLetrasMB_2 = (letra,result,maq,apuest,ganTotal) =>{
    var cont=0;
    const letraRandom2 = () =>{
        var letra1 = ['J', 'Q', 'K', 'A'];
        var rand = Math.floor(Math.random() * 4);
        
        document.querySelector("#LetraM2-B").innerHTML = letra1[rand];
        cont++;
    
        if(cont>2){
            clearInterval(repetir)
            const letraA2 = document.querySelector("#LetraM2-B");
            letraA2.innerHTML = `${letra}`

            mostrarResultado(result,maq,apuest,ganTotal)
        }
    }
    
    letraRandom2()
    var repetir = setInterval(letraRandom2,250);
}

const mostrarResultado = (resultWin, maq,apuest,ganTotal) =>{
    
    if(resultWin != 0){
        win = true;


        if(maq == 'maquinaA'){
            L1.disabled=true;
            R1.disabled=true;
            apostar1.disabled=false;
            animToggleA=false;
            animacionMA();
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '??GANASTE!'

            const msjGanancia = document.querySelector("#gananciaM1");
            msjGanancia.innerHTML = `${ganTotal}`
            
            const cobrar=document.querySelector("#btAPOSTAR1");
            cobrar.innerText="COBRAR";
            gananciaAux= parseInt(msjGanancia.innerText);
            cambiarBotonA=true;
        }else{
            L2.disabled=true;
            R2.disabled=true;
            apostar2.disabled=false;
            animToggleB=false;
            animacionMB();
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '??GANASTE!'

            const msjGanancia = document.querySelector("#gananciaM2");
            msjGanancia.innerHTML = `${ganTotal}`

            const cobrar=document.querySelector("#btAPOSTAR2");
            cobrar.innerText="COBRAR";
            gananciaAux= parseInt(msjGanancia.innerText);
            cambiarBotonB=true;
        }
        
    }else{
        win = false;

        if(maq == 'maquinaA'){
            apostar1.disabled=false;
            L1.disabled=false;
            R1.disabled=false;
            verificarA();
            animToggleA=false;
            animacionMA();
            const msjWin = document.querySelector("#mensajes1");
            msjWin.innerHTML = '-'

            const msjGanancia = document.querySelector("#gananciaM1");
            msjGanancia.innerHTML = '0'
        }else{
            apostar2.disabled=false;
            L2.disabled=false;
            R2.disabled=false;
            verificarB();
            animToggleB=false;
            animacionMB();
            const msjWin = document.querySelector("#mensajes2");
            msjWin.innerHTML = '-'

            const msjGanancia = document.querySelector("#gananciaM2");
            msjGanancia.innerHTML = '0'
        }
    }
    
}
    
const animacionMA = () =>{
    const img = document.querySelector("#laVeridica")
    if(animToggleA == true){
        img.setAttribute("src",'media/Tragamonedas1-2.png')
    }else{
        img.setAttribute("src",'media/Tragamonedas1.png')
    }
}

const animacionMB = () =>{
    const img = document.querySelector("#laSuertuda")
    if(animToggleB == true){
        img.setAttribute("src",'media/Tragamonedas2-2.png')
    }else{
        img.setAttribute("src",'media/Tragamonedas2.png')
    }
}
const ordenarUsuarios=(usuarios)=>{
    usuarios.sort(function(a, b) {
        var textA = a.ganancia;
        var textB = b.ganancia;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }).reverse();
}


const crearFila=(usuarios,n)=>{
    const tr=document.createElement("tr");
    const tdId=document.createElement("td");
    const tdNombre=document.createElement("td");
    const tdGanancia=document.createElement("td");
    const tdNumeroDeApuestas=document.createElement("td");
    const tdGananciaPromedio=document.createElement("td");
    tdId.innerText=n;
    tdNombre.innerText=usuarios.nombre;
    tdGanancia.innerText=usuarios.ganancia;
    tdNumeroDeApuestas.innerText=usuarios.numeroDeApuestas;
    if(usuarios.numeroDeApuestas!=0){
        tdGananciaPromedio.innerText=parseFloat(usuarios.ganancia/usuarios.numeroDeApuestas).toFixed(2);
    }else{
        tdGananciaPromedio.innerText=parseFloat(0).toFixed(2);
    }
    
    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdGanancia);
    tr.appendChild(tdNumeroDeApuestas);
    tr.appendChild(tdGananciaPromedio);
    return tr;
}
const cargarTablaRanking=()=>{
    var n=1;
    const tbody=document.querySelector("#tablaRanking");
    tbody.innerHTML="";
    for (let user of usuarios){
        const tr= crearFila(user,n);
        tbody.appendChild(tr);
        n++;
    }
}

const seleccionarTexto = () =>{
    document.querySelector("#nombreInicio").select();
}

const verificarA = () =>{
    if(document.getElementById("apuesta1").innerText>monedas){
        apostar1.disabled=true;
        R1.disabled=true;
    }
    else if(document.getElementById("apuesta1").innerText==monedas){
        R1.disabled=true;
    }
}

const verificarB = () =>{
    if(document.getElementById("apuesta2").innerText>monedas){
        apostar2.disabled=true;
        R2.disabled=true;
    }
    else if(document.getElementById("apuesta2").innerText==monedas){
        R2.disabled=true;
    }
}

const funcionCobrarA = () =>{
    ganarApuesta(apuestaCobrarA);
    R1.disabled=false;
    L1.disabled=false;
    jugador.ganancia=jugador.ganancia+gananciaAux;
    document.querySelector("#ganancia").innerText=jugador.ganancia;
    cambiarBotonA=false;
    //implementar audio al ganar y cobrar en la maquina A
    var audiowin=document.getElementById('audio-win'); 
    audiowin.play();
}

const funcionCobrarB = () =>{
    ganarApuesta(apuestaCobrarB);
    R2.disabled=false;
    L2.disabled=false;
    jugador.ganancia=jugador.ganancia+gananciaAux;
    document.querySelector("#ganancia").innerText=jugador.ganancia;
    cambiarBotonB=false;
    //implementar audio al ganar y cobrar en la maquina A
    var audiowin=document.getElementById('audio-win'); 
    audiowin.play();
}

const main =async () =>{
    asignarNombreAnimal();
    startMonedas();
    setApuestas10();
    //Mostrar la ventana bienvenida una vez
    const divBienvenida=document.querySelector("#bienvenida");
    modalBienvenida=new bootstrap.Modal(divBienvenida);
    modalBienvenida.toggle();
    const divModalRanking=document.querySelector("#modalRanking");
    modalCrearRanking=new bootstrap.Modal(divModalRanking);
    const butAbrirRanking=document.querySelector("#ranking");
    butAbrirRanking.addEventListener("click",butAbrirRankingOnClick);

    const divModalCambiarNombre=document.querySelector("#modalCambiarNombre");
    modalCambiarNombre=new bootstrap.Modal(divModalCambiarNombre);
    const labelNombre=document.querySelector("#nombre");
    labelNombre.addEventListener("click",butCambiarNombreOnClick);

    const divModalAcercaDe=document.querySelector("#modalAcercaDe");
    modalAcercaDe=new bootstrap.Modal(divModalAcercaDe);
    const butAcercaDe=document.querySelector("#acercaDe");
    butAcercaDe.addEventListener("click",butAbrirAcercaDeOnClick);

    const divModalInstrucciones=document.querySelector("#modalInstrucciones");
    modalInstrucciones=new bootstrap.Modal(divModalInstrucciones);
    const butInstrucciones=document.querySelector("#instrucciones");
    butInstrucciones.addEventListener("click",butAbrirInstruccionesOnClick);

    document.getElementById("monedas").innerText=usuarios[0]['monedas'];
    document.getElementById("ganancia").innerText=usuarios[0]['ganancia'];

    document.getElementById("ingresarNombreInicio").addEventListener("click",butIngresarNombreInicialOnClick);
    document.getElementById("ingresarNombreCambiado").addEventListener("click",butIngresarNombreCambiadoOnClick);
    document.getElementById("close").addEventListener("click",butAbrirAcercaDeOnClick);
    document.getElementById("close").addEventListener("click",butAbrirInstruccionesOnClick);
}

window.addEventListener("load",main);

// Audio mute con boton para lobby. Fase Beta(v.02) -> Finalizado.

function btnlobby() { 
    var btnmusica=document.getElementById('musica'); 
    btnmusica.addEventListener('click', audiolobby, false); 
 } 
 function audiolobby() { 
    var audio=document.getElementById('lobby-audio'); 
        if(!audio.paused && !audio.ended)   { 
           audio.pause(); 
           btnmusica.value='Reproducir';   
        } 
        else 
        { 
           audio.play(); 
           btnmusica.value='Pausa';   
        } 
    
 } 
 window.addEventListener('load', btnlobby, false); 

 // Audio al girar 
/*
 function btngirar() { 
    var btnApostar1=document.getElementById('btAPOSTAR1'); 
    btnApostar1.addEventListener('click', audiospin, false); 
    var btnApostar2=document.getElementById('btAPOSTAR2'); 
    btnApostar2.addEventListener('click', audiospin, false)
 } 
 function audiospin() { 
    var audiogirar=document.getElementById('audio-girar'); 
    audiogirar.play(); 
 } 
 window.addEventListener('load', btngirar, false); 
*/


