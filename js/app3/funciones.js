import Reservas from './classes/Reservas.js'
import UI from './classes/UI.js'

import { 
    nombreInput, 
    correoInput, 
    fechaInput, 
    horaInput, 
    telefonoInput, 
    personasInput,
    comentarioInput, 
    formulario } from './selectores.js'



const ui = new UI();
const administrarReservas = new Reservas();

let editando = false;
export let DB;

const reservaObj = {
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    hora:'',
    personas: '',
    comentario: ''
}

export function datosReserva(e) {
    reservaObj[e.target.name] = e.target.value;
}

export function nuevaReserva(e) {
    e.preventDefault();

    const {nombre, correo, telefono, fecha, hora, personas, comentario } = reservaObj;

    // Validar
    if( nombre === '' || correo === '' || telefono === '' || fecha === ''  || hora === '' || personas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')

        return;
    }

    if(editando) {


        const transaction = DB.transaction(['reservas'], 'readwrite');
        const objectStore = transaction.objectStore('reservas');
        const peticion = objectStore.put(reservaObj);

        transaction.oncomplete = () => {

            
            // Estamos editando
            administrarReservas.editarReserva( {...reservaObj} );

            ui.imprimirAlerta('Guardado Correctamente');

            formulario.querySelector('button[type="submit"]').textContent = 'Crear reserva';

            editando = false;
        }

        transaction.onerror = () => {
            console.log('Hubo un error.')
        }

    } else {
        // Nuevo Registro

        // Generar un ID único
        reservaObj.id = Date.now();
        
        // Añade la nueva reserva
        administrarReservas.agregarReserva({...reservaObj});

        //Insertar registro en IndexedDB

        const transaction = DB.transaction(['reservas'], 'readwrite');
        const objectStore = transaction.objectStore('reservas');
        objectStore.add({...reservaObj});

        transaction.oncomplete = () => {
            ui.imprimirAlerta('Guardado Correctamente');
        }

        transaction.onerror = () => {
            ui.imprimirAlerta('Error al guardar', 'error');
        }
   
    }


    // Imprimir el HTML de reservas
    ui.imprimirReservas();

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

export function reiniciarObjeto() {
    // Reiniciar el objeto
    reservaObj.nombre = '';
    reservaObj.correo = '';
    reservaObj.telefono = '';
    reservaObj.fecha = '';
    reservaObj.hora = '';
    reservaObj.personas = '';
    reservaObj.comentario = '';
}


export function eliminarReserva(id) {

    const transaction = DB.transaction(['reservas'], 'readwrite');
    const objectStore = transaction.objectStore('reservas');
    
    const resultado =  objectStore.delete(id);


    transaction.oncomplete = () => {
        console.log(`Reserva  ${id} fue eliminado`);
        administrarReservas.eliminarReserva(id);
        ui.imprimirReservas()
    }


    transaction.onerror = () => {
        console.log('Hubo un error!');
    }
 
}

export function cargarEdicion(reserva) {

    const {nombre, correo, telefono, fecha, hora, personas, comentario, id } = reserva;

    // Reiniciar el objeto
    reservaObj.nombre= nombre;
    reservaObj.correo = correo;
    reservaObj.telefono = telefono;
    reservaObj.fecha = fecha
    reservaObj.hora = hora;
    reservaObj.personas = personas;
    reservaObj.comentario = comentario;
    reservaObj.id = id;

    // Llenar los Inputs
    nombreInput.value = nombre;
    correoInput.value = correo;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    personasInput.value = personas;
    comentarioInput.value = comentario;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}


export function crearDB() {

    // crear base de datos con la versión 1
    const crearDB = window.indexedDB.open('reservas', 1);

    // si hay un error, lanzarlo
    crearDB.onerror = function() {
        console.log('Hubo un error');
    }

    // si todo esta bien, asignar a database el resultado
    crearDB.onsuccess = function() {
        console.log('Reservas Listo!');

        // guardamos el resultado
        DB = crearDB.result;

        // mostrar reservas al cargar
        ui.imprimirReservas();
    }

    // este método solo corre una vez
    crearDB.onupgradeneeded = function(e) {
        // el evento que se va a correr tomamos la base de datos
        const db = e.target.result;

        
        // definir el objectstore, primer parametro el nombre de la BD, segundo las opciones
        // keypath es de donde se van a obtener los indices
        const objectStore = db.createObjectStore('reservas', { keyPath: 'id',  autoIncrement: true } );

        //createindex, nombre y keypath, 3ro los parametros
        objectStore.createIndex('nombre', 'nombre', {unique: false});
        objectStore.createIndex('correo', 'correo', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('personas', 'personas', {unique: false});
        objectStore.createIndex('comentario', 'comentario', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});

    
        console.log('Database creada y lista');
    }

}


