//variables globales
const d= document;
let clienteInput = d.querySelector('.cliente');
let productoInput = d.querySelector('.producto');
let precioInput = d.querySelector('.precio');
let imagenInput = d.querySelector('.imagen');
let observacionInput = d.querySelector('.observacion');
let btnGuardar = d.querySelector('.btn-guardar')
let tabla = d.querySelector('.table > tbody');


//agregar evento click al boton del formulario
btnGuardar.addEventListener('click',()=> {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    if (datos != null) {
        guardarDatos(datos);
        
    }
    
    borrarTabla();
    mostrarDatos();
    
});

//funcion para validar los campos del formulario
function validarFormulario() {
    let datosForm;
    if (clienteInput.value == '' || productoInput.value == '' || precioInput.value == '' || imagenInput.value == '') {
        alert('Todos los campos del formulario son obligatorios');     
    }else{
        datosForm = {
            cliente: clienteInput.value,
            producto: productoInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observacion: observacionInput.value
        }
    
    console.log(datosForm);
    clienteInput.value = '';
    productoInput.value = '';
    precioInput.value = '';
    imagenInput.value = '';
    observacionInput.value = '';

    return datosForm;
    }
}

//funcion guardar datos en localStorage
const listadoPedidos = 'Pedidos';

function guardarDatos(datos) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en el localStorage
    if(pedidosPrevios != null){
        pedidos = pedidosPrevios;

    }
    //agregar el pedido nuevo al array
    pedidos.push(datos);

    //guardar en locaStorage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    //validar que los datos fueron guardados
    alert('Datos guardados con éxito');
}

//funcion para extraer los datos guardados en el localStorage
// Función para mostrar los datos desde localStorage en la tabla
function mostrarDatos() {
    let pedidos = [];
    // Extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    // Validar datos guardados previamente en el localStorage
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }

    // Obtener el texto de búsqueda
    const textoBusqueda = document.querySelector('.input-buscar').value.trim().toLowerCase();

    // Obtener la tabla y el cuerpo de la tabla
    const tabla = document.querySelector('.table > tbody');

    // Limpiar el cuerpo de la tabla antes de agregar nuevas filas
    tabla.innerHTML = '';

    // Iterar sobre cada pedido y agregarlo como una fila en la tabla
    pedidos.forEach((pedido, index) => {
        // Convertir el nombre del cliente a minúsculas para comparación
        const cliente = pedido.cliente.toLowerCase();

        // Mostrar solo los pedidos que coincidan con el texto de búsqueda
        if (cliente.includes(textoBusqueda)) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${pedido.cliente}</td>
                <td>${pedido.producto}</td>
                <td>${pedido.precio}</td>
                <td><img src="${pedido.imagen}" width="50"></td>
                <td>${pedido.observacion}</td>
                <td>
                    <button class="btn btn-warning btn-actualizar" onclick="actualizarPedido(${index})">📄</button>
                    <button class="btn btn-danger btn-eliminar" onclick="eliminarPedido(${index})">✖️</button>
                </td>
            `;
            tabla.appendChild(fila);
        }
    });
}

// Agregar evento al campo de búsqueda para filtrar los datos al escribir
document.querySelector('.input-buscar').addEventListener('input', mostrarDatos);

// Función para actualizar el estado de la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    mostrarDatos();
});



//quitar los datos de la tabla
function borrarTabla() {
    let filas = d.querySelectorAll('table tbody tr');
    //console.log(filas)
    filas.forEach((f)=>{
            f.remove();
    })
    
}

//funcion eliminar un pedido de la tabla
function eliminarPedido(pos) {
    let pedidos =[];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));
     //validar datos guardados previamente en el localStorage
   if(pedidosPrevios != null){
       pedidos = pedidosPrevios;
   }
   //confirmar pedido a eliminar
   let confirmar = confirm('¿Deseas eliminar este pedido del cliente: '+pedidos[pos].cliente+ '?');
   if(confirmar){
    //alert('lo eliminaste');
    let p = pedidos.splice(pos, 1);
    alert ('Pedido eliminado con exito');
   //guardar los datos que quedaron en el localstorage
   localStorage.setItem(listadoPedidos,JSON.stringify(pedidos));
   borrarTabla();
   mostrarDatos();

    }
}

//actualizar pedido de localstorage
function actualizarPedido(pos) {
    let pedidos =[];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse (localStorage.getItem(listadoPedidos));
     //validar datos guardados previamente en el localStorage
   if(pedidosPrevios != null){
       pedidos = pedidosPrevios;
   }
   clienteInput.value = pedidos[pos].cliente;
   productoInput.value = pedidos[pos].producto;
   precioInput.value = pedidos[pos].precio;
   observacionInput.value = pedidos[pos].observacion;
   //seleccionar el boton de actualizar
   let btnActualizar = d.querySelector('.btn-actualizar');
   btnActualizar.classList.remove('d-none');
   btnGuardar.classList.add('d-none');
   //agregar evento al boton de actualizar
   btnActualizar.onclick = function() {

    pedidos[pos].cliente = clienteInput.value;
    pedidos[pos].producto = productoInput.value;
    pedidos[pos].precio = precioInput.value;
    pedidos[pos].observacion = observacionInput.value;
    //guardar los datos editados en localStorage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert('datos actualizados con exito');
    

    clienteInput.value = '';
    productoInput.value = '';
    precioInput.value = '';
    observacionInput.value = '';

    btnActualizar.classList.add('d-none');
    btnGuardar.classList.remove('d-none');


    borrarTabla();
    mostrarDatos();
        
   };

}

//mostrar lo datos de localstorage al recargar la pagina
d.addEventListener('DOMContentLoaded', function () {
    borrarTabla();
    mostrarDatos();   
})




