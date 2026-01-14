// --- 1. CẤU HÌNH ÂM THANH (HOWLER.JS) ---
const s_click = new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'] });
const s_shake = new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/1074/1074-preview.mp3'], loop: true });
const s_swipe = new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'] });
const s_win = new Howl({ src: ['https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3'] });

// --- 2. KHO LỜI PHÁN (LÀM NỔI BẬT PHẦN BÓI) ---
const fortunes = [
    { title: "🌟 ĐẠI CÁT", text: "Tiền vào như nước sông Đà. Tiền ra nhỏ giọt như cà phê phin. Quẻ này cực linh, ghé 10/5 uống nước là 'lên đời' luôn!" },
    { title: "🍀 TRUNG CÁT", text: "Vận thế hanh thông, tình duyên phơi phới. Bước chân ra ngõ là gặp quý nhân, mà quý nhân chính là chủ quán 10/5 đó!" },
    { title: "✨ TIỂU CÁT", text: "Hôm nay trời đẹp rạng ngời. Lòng ta phơi phới, rủ người đi mua. Đi một mình thì buồn, đi 5 người giảm 10k thì vui!" },
    { title: "🔥 CÁT TƯỜNG", text: "Vạn sự như ý, tỷ sự như mơ. Làm việc bất ngờ, thành công rực rỡ. Quẻ phán bạn nên uống một ly trà để giải nhiệt vận hạn!" }
];

// --- 3. ĐIỀU HƯỚNG MÀN HÌNH ---
function go(id) {
    s_click.play();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    setTimeout(() => {
        document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
        const nextScreen = document.getElementById(id);
        nextScreen.style.display = 'block';
        setTimeout(() => nextScreen.classList.add('active'), 50);
    }, 300);
}

function toJar() {
    const dateInput = document.getElementById('date').value;
    if(!dateInput) {
        alert("Bạn chưa chọn ngày sinh kìa!");
        return;
    }
    go('s4');
}

// --- 4. HIỆU ỨNG XÓC QUẺ ---
function shakeJar() {
    const wrapper = document.getElementById('jar-wrapper');
    if(wrapper.classList.contains('shaking')) return;
    
    s_shake.play();
    wrapper.classList.add('shaking');

    setTimeout(() => {
        s_shake.stop();
        wrapper.classList.remove('shaking');
        go('s5');
        makeSticks();
    }, 2500);
}

// --- 5. TẠO THẺ QUẺ VÀ RÚT ---
function makeSticks() {
    const container = document.getElementById('box');
    container.innerHTML = '';
    for(let i=0; i<5; i++) {
        const s = document.createElement('div');
        s.className = 'stick';
        s.onclick = function() {
            s_swipe.play();
            this.classList.add('selected');
            // Vô hiệu hóa các cây còn lại
            document.querySelectorAll('.stick').forEach(el => el.style.pointerEvents = 'none');
            setTimeout(showFinalResult, 1000);
        };
        container.appendChild(s);
    }
}

// --- 6. HIỂN THỊ KẾT QUẢ VỚI HIỆU ỨNG CHỮ CHẠY ---
function showFinalResult() {
    const res = fortunes[Math.floor(Math.random() * fortunes.length)];
    document.getElementById('modal').style.display = 'flex';
    
    const msgBox = document.getElementById('msg');
    msgBox.innerHTML = `<div id="fortune-title">${res.title}</div><div id="fortune-body"></div>`;
    
    // Hiệu ứng Typewriter (chữ chạy)
    let i = 0;
    const bodyBox = document.getElementById('fortune-body');
    let interval = setInterval(() => {
        bodyBox.innerHTML += res.text.charAt(i);
        i++;
        if (i >= res.text.length) clearInterval(interval);
    }, 40);
}

// --- 7. QUÀ TẶNG MARKETING ---
function getGift() {
    s_win.play();
    const rewards = [
        "LỘC KẾT ĐOÀN: Nhóm 5 bạn mua chung -> GIẢM NGAY 10.000đ!",
        "LỘC TRI KỶ: Mua 3 ly tặng thêm Topping cho mỗi ly!",
        "LỘC MAY MẮN: Giảm ngay 2.000đ đơn hàng từ 2 ly!",
        "LỘC HOAN HỈ: Tặng 1 Sticker 10/5 siêu cấp khi mua nước!"
    ];
    
    const giftBox = document.getElementById('gift');
    giftBox.innerText = "🎁 " + rewards[Math.floor(Math.random() * rewards.length)];
    document.getElementById('gift-btn').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    
    // Đồng hồ đếm ngược 15 phút
    let t = 900;
    const clock = document.getElementById('clock');
    const cd = setInterval(() => {
        let m = Math.floor(t / 60), s = t % 60;
        clock.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (t-- <= 0) clearInterval(cd);
    }, 1000);
}
