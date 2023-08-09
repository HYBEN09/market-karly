import { productsList } from "../data/productListData.js";

// DOM 요소 선택
const listItems = document.querySelectorAll(".best-list li");
const sortOptions = document.querySelectorAll(".sort-option");
const toggleButtons = document.querySelectorAll(".toggle-btn");
const productList = document.querySelector(".product-list_nav");
const bestList = document.querySelector(".best-container");

// 메뉴 클릭 토글 함수
function toggleListNav(e) {
  const listItem = e.currentTarget.parentElement;
  const listNav = listItem.nextElementSibling;

  listNav.classList.toggle("active");
  listItem.classList.toggle("active");
  e.currentTarget.classList.toggle("active");
}

// 메뉴 클릭 토글 함수를 버튼에 각각 추가
function toggleNavActive(item, otherItems) {
  otherItems.forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.classList.remove("nav-active");
    }
  });

  item.classList.toggle("nav-active");
}

// 메뉴 클릭 토글 함수를 버튼에 각각 추가
function initializeToggleButtons() {
  toggleButtons.forEach((button) => {
    button.addEventListener("click", toggleListNav);
  });
}

// 다른 메뉴 아이템들의 활성화 클래스를 제거하고 클릭한 아이템에만 추가
function initializeListItems() {
  listItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      toggleNavActive(item, listItems);
    });
  });
}

// 다른 메뉴 아이템들의 활성화 클래스를 제거하고 클릭한 아이템에만 추가
function initializeSortOptions() {
  sortOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      sortOptions.forEach((item) => item.classList.remove("active"));
      event.currentTarget.classList.add("active");
    });
  });
}

// 할인 정보를 생성하는 함수
function generateDiscountInfo(discountRate) {
  return `
    <dd class="best__discount-rate">${(discountRate * 100).toFixed(0)}%</dd>
  `;
}

// 상품 정보를 가지고 상품 목록을 생성하는 함수
function generateBestItem(product) {
  const discountInfo = product.discountRate
    ? generateDiscountInfo(product.discountRate)
    : "";

  return /*html*/ `
     <a href="#">
      <figure class="best-img_wrapper">
       <div class="image-container">
        <img src="${product.imageUrl}" alt="" class="best-product_img" />
      </div>
        <button class="best-cart_btn">
          <img
            src="../../assets/Icon/cart.png"
            alt="장바구니 아이콘"
            class="best-cart_img"
          />
        </button>
        <figcaption class="best-img_container">
          <h3 class="a11yHidden">${product.productName}</h3>
          <dl class="best-item">
            <dt aria-hidden="true" class="a11yHidden">배송안내</dt>
            <dd class="best__delivery">샛별배송</dd>
            <dt class="a11yHidden">상품명</dt>
            <dd id="best-item_${product.id}" class="best__name">
              ${product.productName}
            </dd>
            <div class="price_info">
              <dt class="a11yHidden">가격</dt>
               ${discountInfo}
              <dd class="best__price">${product.price}</dd>
              <dt class="a11yHidden">상품설명</dt>
            </div>
            <dd class="best__info">${product.productInfo}</dd>
          ${
            product.showBestMessage
              ? `
            <div class="best-message">
              <dt aria-hidden="true" class="a11yHidden">단독</dt>
              <dd class="best__only">Karly Only</dd>
              <dt aria-hidden="true" class="a11yHidden">수량정보</dt>
              <dd class="best__limit">한정수량</dd>
            </div>
            `
              : ` <div style="height: 34px;"></div>
`
          }
          </dl>
        </figcaption>
      </figure>
    </a>
  `;
}

// 상품 리스트 초기화 함수
function initializeProductList() {
  productsList.forEach((product) => {
    const bestItem = generateBestItem(product);
    bestList.innerHTML += bestItem;
  });
}

// ---------------------------------------------------------------
initializeToggleButtons();
initializeListItems();
initializeSortOptions();
initializeProductList();
