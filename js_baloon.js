// Lấy phần tử chứa bong bóng, phần tử "letter", khung nhập tên và các phần tử của popup và video
const balloonContainer = document.getElementById("balloon-container");
const letterDiv = document.getElementById("letter");
const nameInputContainer = document.getElementById("name-input-container");
const nameInput = document.getElementById("name-input");
const popupMessage = document.getElementById("popup-message");
const closePopupButton = document.getElementById("close-popup");
const videoContainer = document.getElementById("video-container");
const videoElement = document.getElementById("loichuc-video");

// Hàm tạo số ngẫu nhiên
function random(num) {
  return Math.floor(Math.random() * num);
}

// Hàm lấy style ngẫu nhiên cho bong bóng
function getRandomStyles() {
  const colors = ['#f5fcff', '#dbf3fa', '#b7e9f6', '#92dff3', '#7ad7f0'];
  const color = colors[random(colors.length)];
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
    background-color: ${color};
    color: ${color}; 
    box-shadow: inset -7px -3px 10px rgba(0, 0, 0, 0.2);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite;
  `;
}

// Hàm tạo bong bóng
function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }

  // Sau 5 giây, xóa tất cả bong bóng
  setTimeout(() => {
    removeBalloons();
  }, 5000);
}

// Hàm xóa bong bóng và hiển thị khung màu be
function removeBalloons() {
  balloonContainer.style.display = "none";
  setTimeout(() => {
    balloonContainer.innerHTML = ""; // Xóa toàn bộ bong bóng
    showLetter(); // Hiển thị khung màu be sau khi bong bóng tắt
  }, 500);
}

// Hàm hiển thị khung màu be
function showLetter() {
  letterDiv.style.display = "flex"; // Hiển thị khung màu be
  setTimeout(() => {
    letterDiv.style.display = "none"; // Ẩn khung màu be sau 3 giây
    nameInputContainer.style.display = "block"; // Hiển thị khung nhập tên
  }, 3000);
}

// Hàm hiển thị cửa sổ popup
function showPopupMessage() {
  popupMessage.style.display = "flex"; // Hiển thị popup
  setTimeout(() => {
    popupMessage.style.opacity = 1; // Làm mờ dần khi xuất hiện
  }, 100);
}

// Hàm đóng cửa sổ popup và hiển thị video
function closePopup() {
  popupMessage.style.opacity = 0; // Làm mờ dần khi biến mất
  setTimeout(() => {
    popupMessage.style.display = "none"; // Ẩn popup sau khi đã mờ dần
    nameInputContainer.style.display = "none"; // Ẩn khung nhập tên
    videoContainer.style.display = "block"; // Hiển thị video
    videoElement.play(); // Tự động phát video khi hiển thị
  }, 500);
}

// Thêm sự kiện khi video kết thúc
videoElement.addEventListener('ended', function() {
  // Đợi 2 giây sau khi video kết thúc, rồi điều hướng sang trang khác
  setTimeout(() => {
    window.location.href = "flowerGrowUp.html"; // Điều hướng sang trang flowerGrowUp.html
  }, 2000); // Đợi 2 giây trước khi chuyển trang
});

// Lắng nghe sự kiện nhập tên
nameInput.addEventListener("input", function() {
  if (nameInput.value.length === 2) {
    showPopupMessage(); // Hiển thị popup khi người dùng nhập đủ 2 ký tự
  }
});

// Thêm sự kiện cho nút đóng popup
closePopupButton.addEventListener("click", closePopup);

// Tạo bong bóng khi tải trang
window.addEventListener("load", () => {
  createBalloons(30); // Tạo 30 bong bóng khi trang tải
});
