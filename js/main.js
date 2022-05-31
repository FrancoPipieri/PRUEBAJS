class Item{
  constructor(itemTitle,itemPrice,itemQuantity,itemColor,itemSize){
    this.itemTitle=itemTitle;
    this.itemPrice=itemPrice;
    this.itemQuantity=itemQuantity;
    this.itemColor=itemColor;
    this.itemSize=itemSize;
  }
}
let compra = [];

let item = 0

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
}

let contenidoDelCarrito = 0;
function agregarItemAlCarrito(itemTitle, itemPrice, itemImage) {
  const renglonCarrito = document.createElement('div');

    if(itemTitle === "Marker Uniposca"){
      contenidoDelCarrito = `<div class="row itemCarritoCompras">
        <div class="col-3">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom">
            <img src=${itemImage} class="imagenEnCarrito">
            <h6 class="shopping-cart-item-title tituloDeItem text-truncate ml-3 mb-0">${itemTitle}</h6>
          </div>
        </div>
        <div class="col-2">
          <div class="shopping-cart-price d-flex justify-content-center align-items-center h-100 border-bottom">
            <p class="item-price mb-0 precioItemCarrito">${itemPrice}</p>
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
    else if(itemTitle === "Squeezer Grog"){
      contenidoDelCarrito = `<div class="row itemCarritoCompras">
      <div class="col-3">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom">
              <img src=${itemImage} class="imagenEnCarrito">
              <h6 class="shopping-cart-item-title tituloDeItem text-truncate ml-3 mb-0">${itemTitle}</h6>
          </div>
      </div>
      <div class="col-2">
          <div class="shopping-cart-price d-flex justify-content-center align-items-center h-100 border-bottom">
              <p class="item-price mb-0 precioItemCarrito">${itemPrice}</p>
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
    }else if(itemTitle === "Crayon Markal"){
      contenidoDelCarrito = `<div class="row itemCarritoCompras">
      <div class="col-3">
          <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom">
              <img src=${itemImage} class="imagenEnCarrito">
              <h6 class="shopping-cart-item-title tituloDeItem text-truncate ml-3 mb-0">${itemTitle}</h6>
          </div>
      </div>
      <div class="col-2">
          <div class="shopping-cart-price d-flex justify-content-center align-items-center h-100 border-bottom">
              <p class="item-price mb-0 precioItemCarrito">${itemPrice}</p>
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

  let itemQuantity = document.getElementsByClassName('.cantidadItemsCarrito').value;
  let itemColor = document.getElementsByClassName('colorItemsCarrito').value;
  let itemTamaño = document.getElementsByClassName('.tamañoItems').textContent;
  let itemSize = itemTamaño


  item = new Item(itemTitle,itemPrice,itemQuantity,itemColor,itemSize)
  compra.push(item)

  renglonCarrito
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  renglonCarrito
    .querySelector('.cantidadItemsCarrito')
    .addEventListener('change', cambioCantidad);

  actualizarCarritoCompra();
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
  buttonClicked.closest('.itemCarritoCompras').remove();
  actualizarCarritoCompra();
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