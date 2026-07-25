const menu = [
    {
    name:"Tomahawk Steak",
    category:"Grill",
    price:"15 900 ₸",
    image:"images/steak.jpg",
    description:"Premium marble beef grilled to perfection."
    },
    
    {
    name:"Ribeye Steak",
    category:"Grill",
    price:"13 500 ₸",
    image:"images/ribeye.jpg",
    description:"Juicy steak with rosemary butter."
    },
    
    {
    name:"Burrata Pizza",
    category:"Pizza",
    price:"5 200 ₸",
    image:"images/pizza.jpg",
    description:"Fresh burrata, tomatoes and basil."
    },
    
    {
    name:"Pepperoni Pizza",
    category:"Pizza",
    price:"4 900 ₸",
    image:"images/pepperoni.jpg",
    description:"Italian pepperoni & mozzarella."
    },
    
    {
    name:"Truffle Burger",
    category:"Burgers",
    price:"5 900 ₸",
    image:"images/burger.jpg",
    description:"Black Angus beef with truffle sauce."
    },
    
    {
    name:"Double Cheese Burger",
    category:"Burgers",
    price:"5 400 ₸",
    image:"images/cheeseburger.jpg",
    description:"Double cheddar and grilled beef."
    },
    
    {
    name:"Caesar Salad",
    category:"Salads",
    price:"3 900 ₸",
    image:"images/salad.jpg",
    description:"Chicken, parmesan & romaine."
    },
    
    {
    name:"Mojito",
    category:"Drinks",
    price:"2 000 ₸",
    image:"images/mojito.jpg",
    description:"Fresh mint and lime."
    },
    
    {
    name:"Chocolate Cake",
    category:"Desserts",
    price:"3 200 ₸",
    image:"images/cake.jpg",
    description:"Belgian chocolate dessert."
    }
    ];
    
    const menuContainer = document.querySelector(".menu");
    const searchInput = document.getElementById("search");
    const buttons = document.querySelectorAll(".categories button");
    const cart = [];
    function findCartItem(name){

        return cart.find(item => item.name === name);
    
    }

const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cartTotal");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

const checkoutBtn = document.getElementById("checkoutBtn");
const confirmOrder = document.getElementById("confirmOrder");
const cancelCheckout = document.getElementById("cancelCheckout");
const overlayBg = document.getElementById("overlayBg");
    
    function createCard(item){
    
    return `
    <div class="card">
    
    <img src="${item.image}" alt="${item.name}">
    
    <div class="card-info">
    
    <h2>${item.name}</h2>
    
    <p>${item.description}</p>
    
    <div class="price-row">
    
    <span>${item.price}</span>
    
    <button class="order-btn">
    Order
    </button>
    
    </div>
    
    </div>
    
    </div>
    `;
    
    }
    
    function renderMenu(items){
    
    menuContainer.innerHTML="";
    
    items.forEach(item=>{
    
    menuContainer.innerHTML+=createCard(item);
    
    });
    
    }
    
    renderMenu(menu);
    
    searchInput.addEventListener("input",()=>{
    
    const value=searchInput.value.toLowerCase();
    
    const filtered=menu.filter(item=>
    
    item.name.toLowerCase().includes(value) ||
    
    item.description.toLowerCase().includes(value)
    
    );
    
    renderMenu(filtered);
    
    });
    
    buttons.forEach(button=>{
    
    button.addEventListener("click",()=>{
    
    buttons.forEach(btn=>btn.classList.remove("active"));
    
    button.classList.add("active");
    
    let category=button.textContent.trim();
    
    category=category.replace("🔥","")
    .replace("🥩","")
    .replace("🍕","")
    .replace("🍔","")
    .replace("🥗","")
    .replace("🍷","")
    .replace("🍰","")
    .trim();
    
    if(category==="Signature"){
    
    renderMenu(menu);
    
    return;
    
    }
    
    const filtered=menu.filter(item=>item.category===category);
    
    renderMenu(filtered);
    
    });
    
    });
    function updateCart(){

        cartItems.innerHTML="";
    
        let total=0;
    
        if(cart.length===0){
    
            cartItems.innerHTML="<p class='empty-cart'>Cart is empty</p>";
    
        }
    
        cart.forEach((item,index)=>{
    
            total += item.price * item.quantity;    
            cartItems.innerHTML+=`
    
            <div class="cart-item">
    
                <div>

    <h4>${item.name}</h4>

    <p>${item.price.toLocaleString()} ₸ × ${item.quantity}</p>

    <div class="quantity">

        <button class="minus" data-index="${index}">−</button>

        <span>${item.quantity}</span>

        <button class="plus" data-index="${index}">+</button>

    </div>

</div>

<button class="remove-item" data-index="${index}">
❌
</button>
    
            </div>
    
            `;
    
        });
    
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
        cartTotal.textContent=total.toLocaleString()+" ₸";
    
    }
    
    document.addEventListener("click",function(event){
    
        if(event.target.classList.contains("order-btn")){
    
            const card=event.target.closest(".card");
    
            const name=card.querySelector("h2").textContent;
    
            const item=menu.find(food=>food.name===name);
    
            const existing = findCartItem(item.name);

if(existing){

    existing.quantity++;

}else{

    cart.push({

        name: item.name,

        price: Number(item.price.replace(/[^\d]/g,"")),

        quantity: 1

    });

}
    
            updateCart();
    
            cartPanel.classList.add("open");
            overlayBg.classList.add("show");
    
        }
    
    });
    
    cartIcon.addEventListener("click",()=>{
    
        cartPanel.classList.add("open");
        overlayBg.classList.add("show");
    
    });
    
    closeCart.addEventListener("click",()=>{
    
        cartPanel.classList.remove("open");
        overlayBg.classList.remove("show");
    
    });
    document.addEventListener("click",function(event){

        if(event.target.classList.contains("remove-item")){
    
            const index=event.target.dataset.index;
    
            cart.splice(index,1);
    
            updateCart();
    
        }
    
    });
    document.addEventListener("click", function(event){

        // +
    
        if(event.target.classList.contains("plus")){
    
            const index = event.target.dataset.index;
    
            cart[index].quantity++;
    
            updateCart();
    
        }
    
        // -
    
        if(event.target.classList.contains("minus")){
    
            const index = event.target.dataset.index;
    
            cart[index].quantity--;
    
            if(cart[index].quantity <= 0){
    
                cart.splice(index,1);
    
            }
    
            updateCart();
    
        }
    
    });
    overlayBg.addEventListener("click",()=>{

        cartPanel.classList.remove("open");
    
        overlayBg.classList.remove("show");
    
    });
    checkoutBtn.addEventListener("click",()=>{

        checkoutItems.innerHTML="";
    
        let total=0;
    
        cart.forEach(item=>{
    
            total+=item.price*item.quantity;
    
            checkoutItems.innerHTML+=`
    
            <div class="checkout-item">
    
                <span>${item.name} × ${item.quantity}</span>
    
                <strong>${(item.price*item.quantity).toLocaleString()} ₸</strong>
    
            </div>
    
            `;
    
        });
    
        checkoutTotal.textContent=total.toLocaleString()+" ₸";
    
        checkoutModal.classList.add("show");
    
    });
    
    cancelCheckout.addEventListener("click",()=>{
    
        checkoutModal.classList.remove("show");
    
    });
    
    confirmOrder.addEventListener("click",()=>{
    
        alert("🎉 Thank you!\n\nYour order has been received.");
    
        cart.length=0;
    
        updateCart();
    
        checkoutModal.classList.remove("show");
    
        cartPanel.classList.remove("open");
    
        overlayBg.classList.remove("show");
    
    });