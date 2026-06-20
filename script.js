// ==================== I. QUẢN LÝ DỮ LIỆU CỬA HÀNG ====================
const flowerDatabase = {
    'Hoa Hồng Đỏ': { price: 120000, img: '../assets/images/hoa1.jpg', desc: 'Hoa Hồng Đỏ tượng trưng cho tình yêu mãnh liệt, nồng cháy và sự lãng mạn. Thích hợp tặng người yêu vào các dịp lễ đặc biệt.' },
    'Hoa Cúc Trắng': { price: 90000, img: '../assets/images/hoa2.jpg', desc: 'Hoa Cúc Trắng đại diện cho sự thanh cao, thuần khiết, lòng hiếu thảo và sự chân thành.' },
    'Hoa Ly Vàng': { price: 150000, img: '../assets/images/hoa3.jpg', desc: 'Hoa Ly Vàng mang ý nghĩa của sự giàu sang, phú quý, lòng biết ơn và niềm vui tràn đầy.' },
    'Hoa Tulip': { price: 200000, img: '../assets/images/hoa4.jpg', desc: 'Hoa Tulip kiêu sa thể hiện sự hoàn hảo, vinh hoa và tình cảm chân thành sâu sắc.' },
    'Hoa Hướng Dương': { price: 110000, img: '../assets/images/hoa5.jpg', desc: 'Hoa Hướng Dương luôn hướng về phía mặt trời, biểu trưng cho sự kiên cường, niềm hy vọng và sự thủy chung.' },
    'Hoa Lan Hồ Điệp': { price: 350000, img: '../assets/images/hoa6.jpg', desc: 'Lan Hồ Điệp được mệnh danh là nữ hoàng các loài hoa, mang lại sự sang trọng, may mắn và thịnh vượng cho gia chủ.' },
    'Hoa Baby': { price: 130000, img: '../assets/images/hoa7.jpg', desc: 'Hoa Baby trắng li ti mang vẻ đẹp dịu dàng, trong sáng, tựa như những bông tuyết nhỏ xinh xắn.' },
    'Hoa Lavender': { price: 180000, img: '../assets/images/hoa8.jpg', desc: 'Hoa Lavender (Oải hương) mang sắc tím mộng mơ, hương thơm quyến rũ, biểu tượng cho sự chung thủy bến chặt.' },
    'Hoa Cẩm Tú Cầu': { price: 160000, img: '../assets/images/hoa9.jpg', desc: 'Hoa Cẩm Tú Cầu với những cánh hoa san sát tạo thành khối cầu, thể hiện sự biết ơn, chân thành và trọn vẹn.' }
};

// Khởi tạo hoặc tải giỏ hàng từ LocalStorage về
let cart = JSON.parse(localStorage.getItem('flower_cart')) || [];

// Chạy khởi tạo giao diện ngay khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initDetailPage();
});

// ==================== II. LOGIC GIỎ HÀNG VÀ THANH TOÁN ====================

// 1. Thêm sản phẩm vào giỏ
function addToCart(name, price) {
    let item = cart.find(product => product.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    localStorage.setItem('flower_cart', JSON.stringify(cart));
    updateCartUI();
    alert(`Đã thêm "${name}" vào giỏ hàng thành công!`);
}

// 2. Cập nhật giao diện giỏ hàng
function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('total');

    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) cartCountEl.innerText = totalCount;

    if (cartItemsEl) {
        if (cart.length === 0) {
            cartItemsEl.innerHTML = `<p class="text-muted text-center py-3">Giỏ hàng trống</p>`;
        } else {
            cartItemsEl.innerHTML = cart.map((item, index) => `
                <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                    <div>
                        <h6 class="mb-0" style="font-size: 14px; font-weight: bold;">${item.name}</h6>
                        <small class="text-muted">${item.price.toLocaleString()}đ x ${item.quantity}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="removeItem(${index})">✕</button>
                </div>
            `).join('');
        }
    }

    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalEl) totalEl.innerText = totalPrice.toLocaleString();
}

// 3. Ẩn/Hiện giỏ hàng Dropdown
function toggleCartBox() {
    const cartBox = document.getElementById('cart-box');
    if (cartBox) {
        cartBox.style.display = (cartBox.style.display === 'none' || cartBox.style.display === '') ? 'block' : 'none';
    }
}

// 4. Xóa lẻ và xóa tất cả giỏ hàng
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('flower_cart', JSON.stringify(cart));
    updateCartUI();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('flower_cart');
    updateCartUI();
}

// 5. Thanh toán modal
function openCheckout() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutItemsEl = document.getElementById('checkout-items');
    const checkoutTotalEl = document.getElementById('checkout-total');

    if (checkoutModal) checkoutModal.classList.remove('d-none');
    if (checkoutItemsEl) {
        checkoutItemsEl.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between my-1">
                <span>${item.name} (x${item.quantity})</span>
                <span>${(item.price * item.quantity).toLocaleString()}đ</span>
            </div>
        `).join('');
    }
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (checkoutTotalEl) checkoutTotalEl.innerText = totalPrice.toLocaleString();
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.add('d-none');
}

function confirmOrder(event) {
    event.preventDefault();
    alert("🎉 Chúc mừng bạn đã đặt hoa thành công!");
    clearCart();
    closeCheckout();
}

// ==================== III. LOGIC ĐIỀU HƯỚNG CHI TIẾT SẢN PHẨM ====================

// 1. Chuyển hướng từ trang sản phẩm sang trang chi tiết kèm Query Parameter
function viewDetail(flowerName) {
    const encodedName = encodeURIComponent(flowerName);
    window.location.href = `chi-tiet.html?name=${encodedName}`;
}

// 2. Phân tích tham số URL và hiển thị nội dung cho trang chi tiết
function initDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const flowerName = urlParams.get('name');

    // Kiểm tra xem có đang ở trang chi tiết và có nhận được tham số tên hoa hay không
    if (flowerName && flowerDatabase[flowerName] && document.getElementById('detail-title')) {
        const flowerInfo = flowerDatabase[flowerName];

        document.getElementById('detail-title').innerText = flowerName;
        document.getElementById('detail-price').innerText = flowerInfo.price.toLocaleString() + 'đ';
        document.getElementById('detail-desc').innerText = flowerInfo.desc;

        // Ẩn vùng placeholder và hiện ảnh hoa lên
        if(document.getElementById('detail-placeholder')) document.getElementById('detail-placeholder').style.display = 'none';
        const imgElement = document.getElementById('detail-img');
        if (imgElement) {
            imgElement.src = flowerInfo.img;
            imgElement.style.display = 'inline-block';
        }

        // Cấu hình lại nút "Thêm vào giỏ" ngay tại trang chi tiết để nó hoạt động chính xác
        const cartBtn = document.getElementById('detail-btn-cart');
        if (cartBtn) {
            cartBtn.setAttribute('onclick', `addToCart('${flowerName}', ${flowerInfo.price})`);
        }
    }
}