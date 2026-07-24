const menu = [
    {
      name: "Tomahawk Steak",
      category: "Grill",
      price: "15 900 ₸",
      image: "images/steak.jpg",
      description: "Premium marble beef, grilled vegetables."
    },
    {
      name: "Ribeye Steak",
      category: "Grill",
      price: "13 500 ₸",
      image: "images/ribeye.jpg",
      description: "Juicy grilled steak with rosemary."
    },
    {
      name: "Burrata Pizza",
      category: "Pizza",
      price: "5 200 ₸",
      image: "images/pizza.jpg",
      description: "Fresh burrata cheese, tomatoes and basil."
    },
    {
      name: "Pepperoni Pizza",
      category: "Pizza",
      price: "4 900 ₸",
      image: "images/pepperoni.jpg",
      description: "Italian pepperoni with mozzarella."
    },
    {
      name: "Truffle Burger",
      category: "Burgers",
      price: "5 900 ₸",
      image: "images/burger.jpg",
      description: "Black Angus beef with truffle sauce."
    },
    {
      name: "Double Cheese Burger",
      category: "Burgers",
      price: "5 400 ₸",
      image: "images/cheeseburger.jpg",
      description: "Double cheddar and grilled beef."
    },
    {
      name: "Caesar Salad",
      category: "Salads",
      price: "3 900 ₸",
      image: "images/salad.jpg",
      description: "Chicken, parmesan and romaine lettuce."
    },
    {
      name: "Mojito",
      category: "Drinks",
      price: "2 000 ₸",
      image: "images/mojito.jpg",
      description: "Fresh mint, lime and sparkling water."
    },
    {
      name: "Chocolate Cake",
      category: "Desserts",
      price: "3 200 ₸",
      image: "images/cake.jpg",
      description: "Belgian chocolate with berry sauce."
    }
  ];
  
  const container = document.querySelector(".menu");
  
  function renderMenu(items) {
    container.innerHTML = "";
  
    items.forEach(item => {
      container.innerHTML += `
        <div class="card">
  
          <img src="${item.image}" alt="${item.name}">
  
          <div class="card-info">
  
            <h2>${item.name}</h2>
  
            <p>${item.description}</p>
  
            <div class="price-row">
              <span>${item.price}</span>
              <button class="order-btn">Order</button>
            </div>
  
          </div>
  
        </div>
      `;
    });
  }
  
  renderMenu(menu);
  
  // ===== Search =====
  
  const search = document.getElementById("search");
  
  search.addEventListener("keyup", () => {
  
    const value = search.value.toLowerCase();
  
    const filtered = menu.filter(item =>
      item.name.toLowerCase().includes(value) ||
      item.description.toLowerCase().includes(value)
    );
  
    renderMenu(filtered);
  
  });

  // ===== Categories =====

const buttons = document.querySelectorAll(".categories button");

buttons.forEach(button => {

  button.addEventListener("click", () => {

    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    let category = button.textContent;

    category = category.replace("🔥", "");
    category = category.replace("🥩", "");
    category = category.replace("🍕", "");
    category = category.replace("🍔", "");
    category = category.replace("🥗", "");
    category = category.replace("🍷", "");
    category = category.replace("🍰", "");

    category = category.trim();

    if (category === "Signature") {
      renderMenu(menu);
      return;
    }

    const filtered = menu.filter(item => item.category === category);

    renderMenu(filtered);

  });

});