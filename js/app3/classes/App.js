import {datosReserva, nuevaReserva, crearDB} from '../funciones.js';

import { 
    nombreInput, 
    correoInput, 
    fechaInput, 
    horaInput, 
    telefonoInput, 
    personasInput,
    comentarioInput, 
    formulario } from '../selectores.js'

class App{

    constructor(){
        this.initApp();
    }


    initApp(){

        nombreInput.addEventListener('change', datosReserva);
        correoInput.addEventListener('change', datosReserva);
        telefonoInput.addEventListener('change', datosReserva);
        fechaInput.addEventListener('change', datosReserva);
        horaInput.addEventListener('change', datosReserva);
        personasInput.addEventListener('change', datosReserva);
        comentarioInput.addEventListener('change', datosReserva);
        formulario.addEventListener('submit', nuevaReserva);
        
        crearDB();
       
    } 

  


    
    










  
}

export default App;