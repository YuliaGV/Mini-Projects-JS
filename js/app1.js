//Variables

const locatBtn = document.querySelector('#locat');
const stratBtn = document.querySelector('#strat');
const minpriceBtn = document.querySelector('#minprice');
const maxpriceBtn = document.querySelector('#maxprice');
const minareaBtn = document.querySelector('#minarea');
const maxareaBtn = document.querySelector('#maxarea');
const roomsBtn = document.querySelector('#rooms');
const bathroomsBtn = document.querySelector('#bathrooms');

//Contenedor de resultados

const resultado = document.querySelector('#resultado');


//Generar un objeto con la búsqueda
const datosBusqueda = {
    locat : '',
    strat: '',
    minprice : '',
    maxprice: '',
    minarea: '',
    maxarea:'',
    rooms:'',
    bathrooms:''
}


//Eventos


//Event Listener para los select de búsqueda

locatBtn.addEventListener('input', (e) => {
    datosBusqueda.locat = e.target.value;
    filtrarCasa();
});

stratBtn.addEventListener('input', (e) => {
    datosBusqueda.strat =  Number(e.target.value);
    filtrarCasa();
});

minpriceBtn.addEventListener('input', (e) => {
    datosBusqueda.minprice = Number(e.target.value);
    filtrarCasa();
});

maxpriceBtn.addEventListener('input', (e) => {
    datosBusqueda.maxprice = Number(e.target.value);
    filtrarCasa();
});

minareaBtn.addEventListener('input', (e) => {
    datosBusqueda.minarea = Number(e.target.value);
    filtrarCasa();
});

maxareaBtn.addEventListener('input', (e) => {
    datosBusqueda.maxarea = Number(e.target.value);
    filtrarCasa();
});

roomsBtn.addEventListener('input', (e) => {
    datosBusqueda.rooms = Number(e.target.value);
    filtrarCasa();
});

bathroomsBtn.addEventListener('input', (e) => {
    datosBusqueda.bathrooms = Number(e.target.value);
    filtrarCasa();
});




//Funciones
function mostrarCasas(casas) {

    //Limpiar HTML 
    limpiarHTML();
    const contenedor = document.querySelector('#resultado');


    casas.forEach(casa => {
        const casaHTML = document.createElement('p');
        casaHTML.textContent = `
            Ubicación: ${casa.locat} - Estrato: ${casa.strat} - Precio: ${casa.price} - Área: ${casa.area} M² - Habitaciones: ${casa.rooms} - Baños: ${casa.bathrooms}
        
        `;

        contenedor.appendChild(casaHTML);


    });

}


//Cuando no hay resultados
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}



//Limpiar HTML
function limpiarHTML(){
    // Leer el elemento Resultado
    const contenedor = document.querySelector('#resultado');
    // limpiar los resultados anteriores
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

//Función para filtrar las casas en base a la búsqueda

function filtrarCasa(){

    const resultado = casas.filter(filtrarLocat).filter(filtrarStrat).filter(filtrarMinPrice).filter(filtrarMaxPrice).filter(filtrarMinArea).filter(filtrarMaxArea).filter(filtrarRooms).filter(filtrarBathrooms);
    
    if(resultado.length){
        mostrarCasas(resultado);
   } else {
       noResultado();
   }

}


function filtrarLocat(casa){
    const {locat} = datosBusqueda;
    if(datosBusqueda.locat != ''){
        return casa.locat == datosBusqueda.locat;
    }
    return casa;

}

function filtrarStrat(casa){
    const {strat} = datosBusqueda;
    if(datosBusqueda.strat != ''){
        return casa.strat == datosBusqueda.strat;
    }
    return casa;

}

function filtrarMinPrice(casa){
    const {minprice} = datosBusqueda;
    if(datosBusqueda.minprice != ''){
        return casa.price >= datosBusqueda.minprice;
    }
    return casa;
}

function filtrarMaxPrice(casa){
    const {maxprice} = datosBusqueda;
    if(datosBusqueda.maxprice != ''){
        return casa.price <= datosBusqueda.maxprice;
    }
    return casa;
}

function filtrarMinArea(casa){
    const {minarea} = datosBusqueda;
    if(datosBusqueda.minarea != ''){
        return casa.area >= datosBusqueda.minarea;
    }
    return casa;
}

function filtrarMaxArea(casa){
    const {maxarea} = datosBusqueda;
    if(datosBusqueda.maxarea != ''){
        return casa.area <= datosBusqueda.maxarea;
    }
    return casa;
}

function filtrarRooms(casa){
    const {rooms} = datosBusqueda;
    if(datosBusqueda.rooms != ''){
        return casa.rooms == datosBusqueda.rooms;
    }
    return casa;
}

function filtrarBathrooms(casa){
    const {bathrooms} = datosBusqueda;
    if(datosBusqueda.bathrooms != ''){
        return casa.bathrooms == datosBusqueda.bathrooms;
    }
    return casa;
}









