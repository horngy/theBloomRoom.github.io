const section1_flowers = document.querySelectorAll(".section1-flowers");
let section1_count = 0;
const flowers = document.querySelectorAll(".section3-flex-items");
const filter = document.getElementById("filterDropdown");
const count = document.getElementById("showDropdown");
let cart = 0;
let cartItemsArray = []
let totalPrice = 0

function previousFlower() {
    if (section1_count - 1 < 0){
        section1_count = section1_flowers.length - 1
    } else {
        section1_count--
    }
    section1DisplayFlowers()
}

function nextFlower() {
    if (section1_count + 1 >= section1_flowers.length) {
        section1_count = 0
    } else {
        section1_count++
    }
    section1DisplayFlowers()
}

function section1DisplayFlowers() {
    section1_flowers.forEach((flower, index) => {
        if (index === section1_count) {
            flower.style.display = "flex"
        } else {
            flower.style.display = "none"
        }
    })
}

function displayFlowers() {
    const selectedFilter = filter.value;
    let selectedCount = count.value;

    let displayed = []

    flowers.forEach(flower => {
        flower.style.display = "none";  

        if (selectedFilter === "All" || flower.classList.contains(selectedFilter)) {
            displayed.push(flower)
        }
    })
    displayed.forEach(flower => {
        if (selectedCount > 0) {
            flower.style.display = "block"
            selectedCount--
        }
    })
}

function addToCart(product, price) {
    cart++
    totalPrice += price
    document.getElementById("cart").textContent = cart
    cartItemsArray.push({product, price})
    updateCart()

}

function updateCart() {
    const cartItems = document.getElementById("cart-items")
    const totalPriceHTML = document.getElementById("total-price");
    totalPriceHTML.innerHTML = `Total: $${totalPrice}`
    if (cart > 0) {
        cartItems.innerHTML = "";
        cartItemsArray.forEach(flower => {
            cartItems.innerHTML += `<li>${flower.product} - AUD ${flower.price}</li>`
        })
    } else {
        cartItems.innerHTML = '<li>Your Cart is Empty</li>'
    }
}

function openOrCloseCart(choice) {
    if (choice === "active"){
        document.getElementById("cart-list").classList.add("active")
        document.getElementById("dark-background").classList.add("active")
    } else {
        document.getElementById("cart-list").classList.remove("active")
        document.getElementById("dark-background").classList.remove("active")
    }
    console.log("done")
}

section1DisplayFlowers()
filter.addEventListener("change", displayFlowers)
count.addEventListener("change", displayFlowers)
displayFlowers()