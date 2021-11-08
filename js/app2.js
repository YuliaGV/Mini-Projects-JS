// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

const listaPlatos = document.querySelector('#lista-platos');

let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {

     // Dispara cuando se presiona "Agregar Carrito"
     listaPlatos.addEventListener('click', agregarPlato);

     // Cuando se elimina un plato del carrito
     carrito.addEventListener('click', eliminarPlato);

     //Muestra los datos del LocalStorage
     document.addEventListener('DOMContentLoaded',  () => {
          articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

          carritoHTML();
     
          
     });

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}


// Funciones


// Función que añade el plato al carrito
function agregarPlato(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const plato = e.target.parentElement.parentElement;
          // Enviamos el plato seleccionado para tomar sus datos
          leerDatosPlato(plato);
     }
}

// Lee los datos del plato
function leerDatosPlato(plato) {
     const infoPlato = {
          imagen: plato.querySelector('img').src,
          titulo: plato.querySelector('h4').textContent,
          precio: plato.querySelector('.precio').textContent,
          id: plato.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( plato => plato.id === infoPlato.id ) ) { 
          const platos = articulosCarrito.map( plato => {
               if( plato.id === infoPlato.id ) {
                    plato.cantidad++;
                     return plato;
                } else {
                     return plato;
             }
          })
          articulosCarrito = [...platos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoPlato];
     }

     console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el plato del carrito en el DOM
function eliminarPlato(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-plato') ) {
          // e.target.parentElement.parentElement.remove();
          const platoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(plato => plato.id !== platoId);

          carritoHTML();
     }
}


// Muestra el plato seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(plato => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${plato.imagen}" width=100>
               </td>
               <td>${plato.titulo}</td>
               <td>${plato.precio}</td>
               <td>${plato.cantidad} </td>
               <td>
                    <a href="#" class="borrar-plato" data-id="${plato.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     //Agregar el carrito de compras a LocalStorage
     sincronizarStorage();

}

function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// Elimina los platos del carrito en el DOM
function vaciarCarrito() {

     // forma rapida
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
     
     localStorage.clear();
}
