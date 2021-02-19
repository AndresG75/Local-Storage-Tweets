//Variables
const formulario = document.querySelector('#formulario');
const listado = document.querySelector('#lista-tweets');

let tweets = [];

//Eventos
Eventos();

function Eventos(){
    formulario.addEventListener('submit',CargarTweet);
    document.addEventListener('DOMContentLoaded',cargarLocal);
}
//Funciones

function CargarTweet(e){
    e.preventDefault();
    const mensaje = formulario.querySelector('#tweet').value;
    console.log(mensaje);

    if(mensaje !== ''){
        // console.log("Bien");
        const mensaje_body = {
            id : Date.now(),
            mensaje : mensaje
        }
        tweets.push(mensaje_body);
        sincronizarLocalStorage();
        crearHTML();
        formulario.reset();
    }else{
        mostrarError();
    }
}

function mostrarError(){
    const error = document.createElement('p');
    error.textContent = "Debe introducir un valor";
    error.classList.add('error');
    formulario.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 3000);
}

function sincronizarLocalStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function limpiarHTML(){
    while(listado.firstChild){
        listado.firstChild.remove();
    }
}

function crearHTML(){
    limpiarHTML();
    tweets.forEach((tweet)=>{
        const item = document.createElement('li');
        item.textContent = tweet.mensaje;
        item.classList.add('contenido');
        const Btn = document.createElement('a');
        Btn.textContent = 'X';
        Btn.classList.add('borrar-tweet');
        Btn.onclick = ()=>{
            removerTweet(tweet.id);
        };
        item.appendChild(Btn);
        listado.appendChild(item);
    });
    
}

function removerTweet(id){
    tweets = tweets.filter(tweet=>tweet.id != id);
    sincronizarLocalStorage();
    crearHTML();
}

function cargarLocal(){
    tweets = JSON.parse(localStorage.getItem('tweets'));
    console.log(tweets);
    crearHTML();
}