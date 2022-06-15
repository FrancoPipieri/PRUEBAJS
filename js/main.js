cargarProductos();


function cargarProductos(){
  console.log(fetch("product.data.json")
    .then(response => response.json())
    .then(json => mostrarProductos(json)));
}

function mostrarProductos(datos){
  const div = document.querySelector(".items");
  div.innerText = "";

  datos.forEach(productoBody =>{
    const {img, title, body, precio} = productoBody;

      const card = document.createElement("div");
      card.setAttribute("class","card text-white item");
      card.innerHTML = ` <img src="${img}" class="card-img-top item-image" alt="Uniposca">
                        <div class="card-body">
                          <h5 class="card-title p-1 item-title">${title}</h5>
                          <p class="card-text">${body}</p>
                          <div class="item-details">
                            <h6 class="item-price valor">${precio}</h6>
                            <button class="boton btn agregarACarrito">Agregar</button>
                          </div>
                        </div>`;
  })
}

class Item{
  constructor(id,itemTitle,itemPrice,itemImage,itemQuantity,itemColor,itemSize){
    this.id=id;
    this.itemTitle=itemTitle;
    this.itemPrice=itemPrice;
    this.itemImage=itemImage;
    this.itemQuantity=itemQuantity;
    this.itemColor=itemColor;
    this.itemSize=itemSize;
  }
}


let carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')


// Boton de seleccion
const agregarArticuloACarrito = document.querySelectorAll('.agregarACarrito');
agregarArticuloACarrito.forEach((agregarACarrito) => {
  agregarACarrito.addEventListener('click', agregarACarritoClicked);
});

// Boton de Comprar
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const contenedorDelCarrito = document.querySelector('.contenedorDelCarrito');

// Seleccionar el Item a Comprar
function agregarACarritoClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  agregarItemAlCarrito(itemTitle, itemPrice, itemImage);
  mostrarCarrito();
  // Ejecutar inputs

  let itemQuantity = document.querySelectorAll('.cantidadItemsCarrito');
  let itemColor = document.querySelectorAll('.colorItemsCarrito');
  let itemSize = document.querySelectorAll('.sizeItems');

  itemQuantity.forEach((elemento)=>{
    elemento.addEventListener('change', modificarCantidad)
  })
  itemColor.forEach((elemento)=>{
    elemento.addEventListener('change', modificarColor)
  })
  itemSize.forEach((elemento)=>{
    elemento.addEventListener('change', modificarSize)
  })
}

let contenidoDelCarrito = 0;
mostrarCarrito();

//Agregar el item seleccionado al carrito

function agregarItemAlCarrito(itemTitle, itemPrice, itemImage) {
  let id = 0;
  if(carrito.length >0){
    id = carrito[carrito.length-1].id+1
  }
  let newItem = new Item(id,itemTitle, itemPrice, itemImage, "1", null, null);
  carrito.push(newItem);
}

// Mostrar carrito de compras
function mostrarCarrito() {
  document.querySelector('.contenedorDelCarrito').innerHTML = '';
   
  carrito.forEach(producto => {

  const renglonCarrito = document.createElement('div');

    if(producto.itemTitle === "Marker Uniposca"){
      contenidoDelCarrito = `<div class="row itemCarritoCompras">
        <div class="col-3">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom">
            <img src=${producto.itemImage} class="imagenEnCarrito">
            <h6 class="shopping-cart-item-title tituloDeItem text-truncate ml-3 mb-0">${producto.itemTitle}</h6>
          </div>
        </div>
        <div class="col-2">
          <div class="shopping-cart-price d-flex justify-content-center align-items-center h-100 border-bottom">
            <p class="item-price mb-0 precioItemCarrito">${producto.itemPrice}</p>
          </div>
        </div>
        <div class="col-2 align-self-center">
        <input id="color-${producto.id}" class="inputColor colorItemsCarrito" type="text">
        </div>
        <div class="col-5">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom">
              <input  id="cant-${producto.id}" class="shopping-cart-quantity-input cantidadItemsCarrito col-4 ms-3" type="number" value="1">

            <select id="size-${producto.id}" class="col-4 ms-3 align-self-center sizeItems">
              <option>Seleccione una Opcion</option>
              <option>1.7mm</option>
              <option>1.3mm</option>
              <option>2.5mm</option>
              <option>8mm</option>
              <option>15mm</option>
            </select>
              <button class="btnBorrar btn btn-danger buttonDelete col-2" type="button">X</button>
          </div>
        </div>
      </div>`;}
    else if(producto.itemTitle === "Squeezer Grog"){
      contenidoDelCarrito = `<div class="row itemCarritoCompras">
      <div class="col-3">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom">
              <img src=${producto.itemImage} class="imagenEnCarrito">
              <h6 class="shopping-cart-item-title tituloDeItem text-truncate ml-3 mb-0">${producto.itemTitle}</h6>
          </div>
      </div>
      <div class="col-2">
          <div class="shopping-cart-price d-flex justify-content-center align-items-center h-100 border-bottom">
              <p class="item-price mb-0 precioItemCarrito">${producto.itemPrice}</p>
          </div>
      </div>
      <div class="col-2 align-self-center">
      <input id="color-${producto.id}" class="inputColor colorItemsCarrito" type="text">
      </div>
      <div class="col-5 ">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom">
              <input id="cant-${producto.id}" class="shopping-cart-quantity-input cantidadItemsCarrito col-4 ms-3" type="number" value="1">

              <select id="size-${producto.id}" class="col-4 ms-3 align-self-center sizeItems">
              <option>Seleccione una Opcion</option>
              <option>5mm</option>
              <option>10mm</option>
              <option>20mm</option>
              <option>25mm</option>
              </select>
              <button class="btnBorrar btn btn-danger buttonDelete col-2" type="button">X</button>
          </div>
      </div>
      </div>`;  
    }else if(producto.itemTitle === "Crayon Markal"){
      contenidoDelCarrito = `<div class="row itemCarritoCompras">
      <div class="col-3">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom">
              <img src=${producto.itemImage} class="imagenEnCarrito">
              <h6 class="shopping-cart-item-title tituloDeItem text-truncate ml-3 mb-0">${producto.itemTitle}</h6>
          </div>
      </div>
      <div class="col-2">
          <div class="shopping-cart-price d-flex justify-content-center align-items-center h-100 border-bottom">
              <p class="item-price mb-0 precioItemCarrito">${producto.itemPrice}</p>
          </div>
      </div>
      <div class="col-2 align-self-center">
      <input id="color-${producto.id}" class="inputColor colorItemsCarrito" type="text">
      </div>
      <div class="col-5">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom">
              <input id="cant-${producto.id}" class="shopping-cart-quantity-input cantidadItemsCarrito col-4 ms-3" type="number" value="1">

              <select id="size-${producto.id}" class="col-4 ms-3 sizeItems">
              <option>Seleccione una Opcion</option>
              <option>17mm</option>
              </select>
              <button class="btnBorrar btn btn-danger buttonDelete col-2" type="button">X</button>
          </div>
      </div>
    </div>`;
    }
  renglonCarrito.innerHTML = contenidoDelCarrito;
  contenedorDelCarrito.append(renglonCarrito);


  renglonCarrito
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  actualizarCarritoCompra();
  })
}

// Actualizar precios
function actualizarCarritoCompra() {
  let total = 0;
  const totalCarritoCompra = document.querySelector('.totalCarritoCompra');

  const ItemsdeCarrito = document.querySelectorAll('.itemCarritoCompras');

  ItemsdeCarrito.forEach((itemCarritoCompras) => {
    const preciodelElementoCarrito = itemCarritoCompras.querySelector(
      '.precioItemCarrito'
    );
    const precioItemCarrito = Number(
      preciodelElementoCarrito.textContent.replace('$', '')
    );
    const cantidadElementos = itemCarritoCompras.querySelector(
      '.cantidadItemsCarrito'
    );
    const cantidadItemsCarrito = Number(
      cantidadElementos.value
    );
    total = total + precioItemCarrito * cantidadItemsCarrito;
  });
  totalCarritoCompra.innerHTML = `   ${total.toFixed(2)} $`;
}

// Eliminar Item del Carrito
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  const index = buttonClicked.dataset.productIndex;
  buttonClicked.closest('.itemCarritoCompras').parentNode.remove();
  carrito.splice(index, 1);
  mostrarCarrito();
  sessionStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoCompra()
}

// Boton Comprar
function comprarButtonClicked() {

  Swal.fire({
    title:'Confirmar Compra',
    text: 'Desea concluir la compra?',
    icon: 'success',
    confirmButtonText: 'Finalizar',
    cancelButtonText: 'Seguir Comprando',
    showCancelButton: true,
}).then((result)=>{
    if(result.isConfirmed)
    {
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      carrito = [];
      contenedorDelCarrito.innerHTML = '';
      actualizarCarritoCompra();
    }
})
actualizarCarritoCompra();
}

// Modificar Inputs del Carrito
function modificarCantidad(event){
  let input = event.target;
  input.value <=0 ? (input.value=1) : null;

  let item = carrito.findIndex((elemento)=>{
    return `cant-${elemento.id}` == input.id
  })
 
  carrito[item].itemQuantity = input.value;
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarritoCompra()
}

function modificarColor(event){
  let input = event.target;

  let item = carrito.findIndex((elemento)=>{
    return `color-${elemento.id}` == input.id
  })

  carrito[item].itemColor = input.value;
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarritoCompra()
}

function modificarSize(event){
  let input = event.target;

  let item = carrito.findIndex((elemento)=>{
    return `size-${elemento.id}` == input.id
  })

  carrito[item].itemSize = input.value;
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarritoCompra()
}
