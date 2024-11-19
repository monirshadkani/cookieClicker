//conf varibales


//Global variables

let total_cookie = 0 
let cookies_per_second = 0
let total_cps = 0

let shop = []

// DOM elements

const cookie_image = document.getElementById('cookie_image')
const cookie_counter_tag = document.getElementById('cookie_counter')
const shop_tag = document.getElementById('shop-container')
const cookie_per_second_tag = document.getElementById('cookie_per_second')
const reset_button = document.getElementById('reset_button')

//Functions

function refreshCPS() {
    let total = 0
    shop.forEach(item => {
        total += item.total * item.cps
    })
    total_cps = total
    cookie_per_second_tag.innerText = `${total_cps} cookies par seconde`
}

function handleShopClick ( item ) {

    if(item.price > total_cookie){
        alert(`You don't have enough cookies` )
        return
    }

    let index = shop.findIndex(o=> o.id == item.id)
    total_cookie -= item.price
    shop[index].total += 1
    shop[index].price = Math.round( shop[index].price * 1.2 )
    localStorage.setItem('saved_shop', JSON.stringify(shop))
    refreshShop()
    refreshCPS(); 
}

function refreshCPS() {
    //can be done with the method reduce, learn this ffs
    let total = 0

    shop?.forEach(item => {
        total += item.total * item.cps
    })
    total_cps = total
    cookie_per_second_tag.innerText = `${total_cps} cookies par seconde`
}

function refreshShop(){

    shop_tag.innerHTML = null

    shop?.forEach((item) => {
        let newDomElement = document.createElement('div')
        newDomElement.classList = ['bg-white rounded p-3 flex justify-between cursor-pointer hover:bg-red-900 transition-all duration-300']

        let leftPart = document.createElement('div')
        leftPart.classList = ['flex items-center gap-3']

        let itemImage = document.createElement('img')
        itemImage.src = item.image_url
        itemImage.classList= ['rounded-full h-20 w-20']

        let itemName = document.createElement('span')
        itemName.innerText = item.title

        let itemTotal = document.createElement('span')
        itemTotal.innerText = item.total

        newDomElement.appendChild(leftPart)
        newDomElement.appendChild(itemTotal)

        leftPart.appendChild(itemImage)
        leftPart.appendChild(itemName)

        shop_tag.appendChild(newDomElement)

        // Add event listener

        newDomElement.addEventListener('click', () => {handleShopClick(item)})
    })

}

function initialiseGame() {
    const saved_cookies = localStorage.getItem('saved_cookies')
    const saved_shop = localStorage.getItem('saved_shop')

    if(!saved_shop){
        shop = [
            {id: "granny", title: "Granny", price: 10, cps: 1, image_url:"assets/granny.png", total: 0},
            {id: "farm", title: "Farm", price: 100, cps: 10, image_url:"assets/farm.png", total: 0},
        ]
    } else {
        shop = JSON.parse(saved_shop)
    }

    if(!saved_cookies) {
        localStorage.setItem('saved_cookies', 0)
        total_cookie = 0
    } else {
        total_cookie = parseInt(saved_cookies)
    }
    refreshShop()
    refreshCPS()
}

function resetGame(){
    localStorage.removeItem('saved_cookies')
    localStorage.removeItem('saved_shop')
    total_cookie = 0
    total_cps = 0
    changeCounterTag(0)
    initialiseGame()
}

function changeCounterTag(value) {
    cookie_counter_tag.innerText = Math.round(total_cookie) + " cookies"
}

function incrementCookies(cookies_to_add) {
    total_cookie += cookies_to_add
    changeCounterTag(total_cookie)
    localStorage.setItem('saved_cookies', total_cookie)

}

function refreshCookies(value) {
    cookie_counter_tag.innerText = Math.round(total_cookie) + " cookies"
}



// Main

initialiseGame()

changeCounterTag(total_cookie)

cookie_image.addEventListener('click', ()=> { incrementCookies(1) })
reset_button.addEventListener('click' ,resetGame)

setInterval(()=>{
    incrementCookies(total_cps / 10)
    refreshCookies(total_cookie + total_cps)
}, 100)