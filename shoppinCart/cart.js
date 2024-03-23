let basket = JSON.parse(localStorage.getItem("data")) || [];

let label = document.getElementById("label");
let label2 = document.getElementById("label2");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
        <div class="cart-item">
         <img width="100" src="${img}" alt="" />
         <div class="details">
            <div class="title-price-x d-flex">
              <h4 class="title-price justify-content-between">
                <p>${name}</p>
                <P class="cart-item-price ">$${price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

           <div class="buttons d-flex ">
               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3 class="px-4">$${item * search.price}</h3>

          </div>
        </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is empty </h2>
    <a href="index.html">
    <button class="HomeBtn" > Back to Home </button>
    `;
  }
};

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};
let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  //  console.log(selectedItem.id);

  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItem();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let ClearCart = () => {
  basket = [];
  generateCartItem();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

generateCartItem();

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    console.log(amount);
    label2.innerHTML = ` <h2>Total Bill : $ ${amount} </h2> 
    <button class="checkout">checkout</button>
    <button onclick="ClearCart()" class="removeAll">Clear cart</button>
    `;
  } else return;
};
TotalAmount();