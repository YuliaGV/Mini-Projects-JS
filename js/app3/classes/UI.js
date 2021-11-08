
import { eliminarReserva, cargarEdicion, DB} from '../funciones.js'
import { contenedorReservas } from '../selectores.js'


class UI {
    imprimirAlerta(mensaje, tipo) {
        // Crea el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        
        // Si es de tipo error agrega una clase
        if(tipo === 'error') {
             divMensaje.classList.add('alert-danger');
        } else {
             divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
        document.querySelector('#contenido').insertBefore( divMensaje , document.querySelector('.agregar-reserva'));

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }

   imprimirReservas() { 
       
          this.limpiarHTML();

          const objectStore = DB.transaction('reservas').objectStore('reservas');

          objectStore.openCursor().onsuccess = function(event) {

          const cursor = event.target.result;
          
          if(cursor) {

              const objCursor = cursor.value;
          
              const {nombre, correo, telefono, fecha, hora, personas, comentario, id } = cursor.value;

              const divReserva = document.createElement('div');
              divReserva.classList.add('reserva', 'p-3');
              divReserva.dataset.id = id;
  
              const nombreParrafo = document.createElement('p');
              nombreParrafo.innerHTML = `<span class="font-weight-bolder">Nombre: </span> ${nombre}`;
  
              const correoParrafo = document.createElement('p');
              correoParrafo.innerHTML = `<span class="font-weight-bolder">Correo: </span> ${correo}`;
  
              const telefonoParrafo = document.createElement('p');
              telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;
  
              const fechaParrafo = document.createElement('p');
              fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;
  
              const horaParrafo = document.createElement('p');
              horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;
  
              const personasParrafo = document.createElement('p');
              personasParrafo.innerHTML = `<span class="font-weight-bolder">Personas: </span> ${personas}`;
  
              const comentarioParrafo = document.createElement('p');
              comentarioParrafo.innerHTML = `<span class="font-weight-bolder">Comentario: </span> ${comentario}`;
  
  
              // Agregar un botón de eliminar...
              const btnEliminar = document.createElement('button');
              btnEliminar.onclick = () => eliminarReserva(id); // añade la opción de eliminar
              btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
              btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  
              // Añade un botón de editar...
              const btnEditar = document.createElement('button');
              btnEditar.onclick = () => cargarEdicion(objCursor); // añade la opción de editar
  
              btnEditar.classList.add('btn', 'btn-info');
              btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
  
              // Agregar al HTML
              divReserva.appendChild(nombreParrafo);
              divReserva.appendChild(correoParrafo);
              divReserva.appendChild(telefonoParrafo);
              divReserva.appendChild(fechaParrafo);
              divReserva.appendChild(horaParrafo);
              divReserva.appendChild(personasParrafo);
              divReserva.appendChild(comentarioParrafo);
              divReserva.appendChild(btnEliminar)
              divReserva.appendChild(btnEditar)
  
              contenedorReservas.appendChild(divReserva);

              cursor.continue();

              
          }

          
          

        }

        
   }

   limpiarHTML() {
        while(contenedorReservas.firstChild) {
            contenedorReservas.removeChild(contenedorReservas.firstChild);
        }
   }
}



export default UI; 
