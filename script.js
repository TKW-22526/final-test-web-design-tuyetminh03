
let cart = [];

function toggleCartBox() {
    const cartBox = document.getElementById("cart-box");
    if (cartBox.style.display === "none" || cartBox.style.display === "") {
        cartBox.style.display = "block";
    } else {
        cartBox.style.display = "none";
    }
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        
        existingItem.quantity += 1;
    } else {
        
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartUI();

}

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-muted text-center py-3">Giỏ hàng trống</p>';
        totalElement.innerText = "0";
        return;
    }

    let itemsHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        itemsHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2" style="font-size: 14px;">
                <div>
                    <strong>${item.name}</strong><br>
                    <span class="text-muted">${item.price.toLocaleString()}đ x ${item.quantity}</span>
                </div>
                <div class="text-end">
                    <span class="fw-bold text-success">${itemTotal.toLocaleString()}đ</span>
                    <button class="btn btn-sm btn-link text-danger ms-2 p-0 text-decoration-none" onclick="removeItem(${index})">Xóa</button>
                </div>
            </div>
            <hr class="my-1">
        `;
    });

    cartItems.innerHTML = itemsHTML;
    totalElement.innerText = totalPrice.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn mua hoa trước khi thanh toán.");
        return;
    }

    const checkoutModal = document.getElementById("checkout-modal");
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    let checkoutHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        checkoutHTML += `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name} (x${item.quantity})</span>
                <span class="fw-bold">${itemTotal.toLocaleString()}đ</span>
            </div>
        `;
    });

    checkoutItems.innerHTML = checkoutHTML;
    checkoutTotal.innerText = totalPrice.toLocaleString();

    checkoutModal.classList.remove("d-none");
    document.getElementById("cart-box").style.display = "none"; 
}

function closeCheckout() {
    document.getElementById("checkout-modal").classList.add("d-none");
}

function confirmOrder(event) {

    event.preventDefault();
    const name = document.getElementById("cus-name").value;
    const phone = document.getElementById("cus-phone").value;
    const address = document.getElementById("cus-address").value;
    const totalAmount = document.getElementById("checkout-total").innerText;

    alert(
        `🎉 ĐẶT HÀNG THÀNH CÔNG! 🎉\n\n` +
        `👤 Người nhận: ${name}\n` +
        `📞 Số điện thoại: ${phone}\n` +
        `📍 Địa chỉ giao hàng: ${address}\n` +
        `💰 Tổng tiền đơn hàng: ${totalAmount}đ\n\n` +
        `Cửa hàng hoa sẽ liên hệ giao hàng sớm nhất cho bạn!`
    );

    clearCart();
    document.getElementById("checkout-form").reset();
    closeCheckout();
}