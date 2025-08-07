import menuArr from '/data.js'

const menuEl = document.getElementById('menu-items')
const orderListEl = document.getElementById('order-section')
const completeOrderBtn = document.getElementById('complete-order')
const payModalEl = document.getElementById('complete-order-modal')
const orderFormEl = document.getElementById('order-form')

menuEl.innerHTML = menuArr.map(item => {
    const {name, ingredients, id, price, emoji} = item
    return `
        <div class="menu-item" id="${id}">
            <div class="item-icon">${emoji}</div>
            <div class="item-info">
                <div class="item-name">${name}</div>
                <div class="item-ingredients">${ingredients}</div>
                <div class="item-price">$${price}</div>
            </div>
            <button class="item-add" data-item="${name}">+</button>
        </div>
    `
}).join('')

window.addEventListener('click', e => {
    if(e.target.dataset.item){
        addToOrder(e.target.dataset.item)
    }
    if(e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
    if(e.target.id === 'complete-order'){
        payModalEl.style.display = 'block' 
    }

})
orderFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const orderFormData = new FormData(orderFormEl)
    
    orderFormData.get('username')
    payModalEl.style.display = 'none' 
    renderCompletedMessage(orderFormData.get('username'))
})
const orderListArr = []

function addToOrder(id){
    // Adds item to the order list
    const itemToBeAdded = menuArr.find(item => item.name === id)
    orderListArr.push(itemToBeAdded)
    renderOrderList(orderListArr)
}

function removeOrder(id){
    //removes item from the order list
    if(orderListArr.length === 1){
        orderListArr.splice(id, 1)
        orderListEl.innerHTML = ``
    }else {
    orderListArr.splice(id, 1)
    renderOrderList(orderListArr)
    }
}


function renderOrderList(orderList){
        let i = 0 - 1
        const orderListItemsHtml = orderList.map(order => {
            i++
            return `
                <div class="order-item">
                    <div class="order-name">${order.name}</div>
                    <div class="order-remove" data-remove="${i}">Remove</div>
                    <div class="order-price">$${order.price}</div>
                </div>
            `
        }).join('')
        const orderListPrices = orderList.map(orderListItem => {
            return orderListItem.price
        })
        const orderListPriceSum = orderListPrices.reduce((total, previousItem) => {
            return total + previousItem
        })
        if(orderList.length !== 0){
            orderListEl.innerHTML = `
                <h3>Your order</h3>
                <div class="order-list">
                    ${orderListItemsHtml}
                    <hr></hr>
                    <div class="total-price">
                        <div class="total-price-label">Total price:</div>
                        <div class="total-price-value">$${orderListPriceSum}</div>
                    </div>
                    <button id="complete-order">Complete order</button>
                </div>
            `
        }else {
            orderListEl.innerHTML = ``
        }
}

function renderCompletedMessage(username){
    orderListEl.innerHTML = `
        <div id="order-completed">
            Thanks, ${username}! Your order is on its way!
        </div>
    `
}