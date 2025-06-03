const cursor = document.querySelector(".cursor");
const container = document.querySelector(".container");
const dots = document.querySelectorAll(".dot");

let currentPage = 0;
const totalPages = dots.length;

let startY = 0;
let isDragging = false;
let isScrolling = false;

// 커서 따라다니기
document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// 페이지 이동 함수 (무한 루프 포함)
function goToPage(index) {
  if (index < 0) {
    index = totalPages - 1;
  } else if (index >= totalPages) {
    index = 0;
  }
  currentPage = index;
  container.style.transform = `translateY(${-100 * currentPage}vh)`;
  updateDots();
}

// 점점점 네비 업데이트
function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPage);
  });
}

// 터치 이벤트
container.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
  isDragging = true;
});
container.addEventListener("touchend", e => {
  if (!isDragging) return;
  const endY = e.changedTouches[0].clientY;
  const diffY = endY - startY;

  if (diffY > 50) {
    goToPage(currentPage - 1);
  } else if (diffY < -50) {
    goToPage(currentPage + 1);
  }
  isDragging = false;
});

// 마우스 드래그 이벤트
container.addEventListener("mousedown", e => {
  startY = e.clientY;
  isDragging = true;
});
container.addEventListener("mouseup", e => {
  if (!isDragging) return;
  const endY = e.clientY;
  const diffY = endY - startY;

  if (diffY > 50) {
    goToPage(currentPage - 1);
  } else if (diffY < -50) {
    goToPage(currentPage + 1);
  }
  isDragging = false;
});

// 마우스 휠 이벤트 (중복 없이)
window.addEventListener("wheel", e => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 30) {
    goToPage(currentPage + 1);
  } else if (e.deltaY < -30) {
    goToPage(currentPage - 1);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 600);
});

// 점 클릭 이동
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToPage(index);
  });
});
