let cart = [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    renderCart();
}

function renderCart() {
    let cartItems = document.getElementById("cart-items");
    let totalEl = document.getElementById("total");
    let countEl = document.getElementById("cart-count");

    if (!cartItems || !totalEl || !countEl) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="text-muted text-center py-3">Giỏ hàng trống</p>`;
        totalEl.innerText = "0";
        countEl.innerText = "0";
        return; 
    }

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        let formattedPrice = item.price.toLocaleString('vi-VN');

        cartItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                    <b class="text-dark">${item.name}</b><br>
                    <small class="text-muted">${formattedPrice}đ x ${item.qty}</small>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <button class="btn btn-sm btn-light border p-1 px-2" onclick="changeQty(${index}, -1)">-</button>
                    <span class="mx-1 fw-bold">${item.qty}</span>
                    <button class="btn btn-sm btn-light border p-1 px-2" onclick="changeQty(${index}, 1)">+</button>
                    <button class="btn btn-sm btn-outline-danger border p-1 px-2 ms-2" onclick="removeItem(${index})">✕</button>
                </div>
            </div>
        `;
    });

    totalEl.innerText = total.toLocaleString('vi-VN');
    countEl.innerText = count;
}
function changeQty(index, value) {

    cart[index].qty += value;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function toggleCart() {

    let box = document.getElementById("cart-box");

    if (!box) return;

    box.style.display = (box.style.display === "block") ? "none" : "block";
}

window.onload = function () {
    renderCart();
};

function openCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng thêm hoa trước khi thanh toán.");
        return;
    }

    let modal = document.getElementById("checkout-modal");
    let checkoutItems = document.getElementById("checkout-items");
    let checkoutTotal = document.getElementById("checkout-total");

    document.getElementById("cart-box").style.display = "none";

    checkoutItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        checkoutItems.innerHTML += `
            <div class="d-flex justify-content-between my-1">
                <span>🌸 ${item.name} (x${item.qty})</span>
                <span>${(item.price * item.qty).toLocaleString('vi-VN')}đ</span>
            </div>
        `;
    });

    checkoutTotal.innerText = total.toLocaleString('vi-VN');

    modal.classList.remove("d-none");
}

function closeCheckout() {
    let modal = document.getElementById("checkout-modal");
    modal.classList.add("d-none");
}

function confirmOrder(event) {
    event.preventDefault(); 
    let name = document.getElementById("cus-name").value;
    let phone = document.getElementById("cus-phone").value;
    let address = document.getElementById("cus-address").value;

    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG! 🎉\n\nCảm ơn bạn ${name} đã ủng hộ cửa hàng hoa!\nĐơn hàng sẽ được giao đến địa chỉ: ${address} trong thời gian sớm nhất.\nNhân viên sẽ liên hệ với bạn qua SĐT: ${phone}.`);

    document.getElementById("checkout-form").reset();

    closeCheckout();

    clearCart();
}