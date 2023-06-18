// Elementos del DOM
const dayPrincipal = document.querySelector('#day');
const DayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
const setDate = document.querySelector('.fecha');
const setHour = document.querySelector('.reloj');
const loader = document.querySelector('.loader');
const modalCatch = document.querySelector('.catch');
const modalDenied = document.querySelector('.warning');
// Valores del DOM referente a los datos del CLIMA
const temperatura = document.querySelector('#temp');
const calidez     = document.querySelector('#calidez');
const humedad     = document.querySelector('#humedad');
const presion     = document.querySelector('#presion');
const img         = document.querySelector('#img');

// Constante de la ubicacion del usuario
const ubication = navigator.geolocation.getCurrentPosition(fechData, error);

// CONSTANTE DE LA API_KEY
const API_KEY = '4feb9afd625ac3229b73ae6a28dd9cc7';
// FUNCION QUE EXTRAE EL VALOR DE LA API_KEY
function fechData(data){
    const {latitude, longitude} = data.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => {
            console.log(error);
            modalCatch.classList.add('catch--active');
          });
    
}
// Funcion de error de permisos denegados
function error(error) {
    if(error.code === error.PERMISSION_DENIED){
        modalDenied.classList.add('warning--active');
    }else{
        return;
    }
}
// Funcion que cambia los estilos segun la calidez
function nublado(){
    document.querySelector('body').classList.add('nublado');
    img.src = './img/lluvia.png';
    return 'Nublado';
}
// Funcion que cambia los estilos segun la calidez de calido o caluroso
function calido(temperatura){
    document.querySelector('body').classList.add('light');
    img.src = './img/sol.png';
    return temperatura;
}

// FUNCION QUE SELECCIONA LOS DATOS QUE SERAN UTILIZADOS DE LA API_KEY
function setWeatherData(data){

    loader.style.left = '-150%';

    let {temp, humidity, pressure} = data.main;
    const calidezValue = (temp < 15) ? nublado() : (temp < 29) ? calido('Calido'): calido('Caluroso');

    temperatura.textContent = `${temp}`.slice(0, 2) + '°C';
    calidez.textContent     = calidezValue;
    humedad.textContent = `${humidity}`;
    presion.textContent = pressure;
}
// FUNCION QUE PROVEE LOS DATOS PARA EL RELOJ
function getDate() {
    const date = new Date();
    const getDay = DayNames[date.getDay()];

    const dia = `0${date.getDate()}`.slice(-2);
    const mes = `0${date.getMonth() +1}`.slice(-2);
    const anio = `${date.getUTCFullYear()}`;

    setDate.insertAdjacentHTML('beforeend', `${dia}/${mes}/${anio}`);

    getElementsDom(getDay);
}
// INVOCACION DE LA FUNCION DEL DIA TY LA FECHA
getDate();
// FUNCION QUE BRINDA EL DIA 
function getElementsDom(day) {
    dayPrincipal.textContent = day;
}
// FUNCION QUE HACE FUNCIONAL EL RELOJ
function reloj() {
    const date = new Date();
    const nowHours = `0${date.getHours()}`.slice(-2);
    const nowMinutes = `0${date.getMinutes()}`.slice(-2);
    const nowSeconds = `0${date.getSeconds()}`.slice(-2);
    let horario = null;
    let hora  = null;
    if(nowHours <= 12){
        horario = 'A.M';
        hora = nowHours;
    }else if(nowHours > 12){
        horario = 'P.M'
        hora = (Number(nowHours) -12)
    }

    if(hora == 0){
        hora = 1;
    }
    setHour.textContent = `${hora}:${nowMinutes}:${nowSeconds} ${horario}`;
}
// INTERVALO DE LA FUNCION RELOJ PARA QUE ESTA VAYA CAMBIANDO SEGUN EL TIEMPO
setInterval(()=>{
    reloj()
}, 1000);