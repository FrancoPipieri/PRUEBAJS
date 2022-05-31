class Item{
  constructor(itemTitle,itemPrice,itemImage,itemQuantity,itemColor,itemSize){
    this.itemTitle=itemTitle;
    this.itemPrice=itemPrice;
    this.itemImage=itemImage;
    this.itemQuantity=itemQuantity;
    this.itemColor=itemColor;
    this.itemSize=itemSize;
  }
}
const carrito = JSON.parse(sessionStorage.getItem('carrito') || '[]')

let itemQuantity = document.getElementsByClassName('.cantidadItemsCarrito').textContent
let itemColor = document.getElementsByClassName('.colorItemsCarrito').textContent
let itemSize = document.getElementsByClassName('.tamañoItems').textContent


const agregarArticuloACarrito = document.querySelectorAll('.agregarACarrito');
agregarArticuloACarrito.forEach((agregarACarrito) => {
  agregarACarrito.addEventListener('click', agregarACarritoClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const contenedorDelCarrito = document.querySelector(
  '.contenedorDelCarrito'
);

function agregarACarritoClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  agregarItemAlCarrito(itemTitle, itemPrice, itemImage);
  mostrarCarrito();
}

let contenidoDelCarrito = 0;
mostrarCarrito();

function agregarItemAlCarrito(itemTitle, itemPrice, itemImage) {
  let newItem = new Item(itemTitle, itemPrice, itemImage, '', '', '')
  carrito.push(newItem)
  sessionStorage.setItem('carrito', JSON.stringify(carrito))
}


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
        <input class="inputColor colorItemsCarrito" type="text">
        </div>
        <div class="col-5">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom">
              <input class="shopping-cart-quantity-input cantidadItemsCarrito col-4 ms-3" type="number" value="1">

            <select class="col-4 ms-3 align-self-center tamañoItems">
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
      <input class="inputColor colorItemsCarrito" type="text">
      </div>
      <div class="col-5 ">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom">
              <input class="shopping-cart-quantity-input cantidadItemsCarrito col-4 ms-3" type="number" value="1">

              <select class="col-4 ms-3 align-self-center tamañoItems">
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
      <input class="inputColor colorItemsCarrito" type="text">
      </div>
      <div class="col-5">
          <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom">
              <input class="shopping-cart-quantity-input cantidadItemsCarrito col-4 ms-3" type="number" value="1">

              <select class="col-4 ms-3 tamañoItems">
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

  renglonCarrito
    .querySelector('.cantidadItemsCarrito')
    .addEventListener('change', cambioCantidad);

  actualizarCarritoCompra();
  })
}

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

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  const index = buttonClicked.dataset.productIndex;
  buttonClicked.closest('.itemCarritoCompras').parentNode.remove();
  carrito.splice(index, 1);
  mostrarCarrito();
  sessionStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoCompra()
}

function cambioCantidad(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarCarritoCompra();
}

function comprarButtonClicked() {
  console.log(compra)
  contenedorDelCarrito.innerHTML = '';
  console.log("Su Compra Fue un Exito")
  actualizarCarritoCompra();
}