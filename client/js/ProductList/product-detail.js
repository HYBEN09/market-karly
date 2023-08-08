import { handlerSetText } from "../sign/index.js";
import { productDetails } from "../data/productData.js";

const productDetailElement = document.querySelector(".product-detail__reasons");

// WHY KARLY
function renderProductDetails() {
  if (productDetailElement) {
    productDetails.forEach((detail) => {
      productDetailElement.innerHTML += `
          <dl>
            <dt>
              <img src="${detail.imageUrl}" alt="" class="why-karly_img">
              ${detail.title}
            </dt>
            <dd>${detail.description}</dd>
          </dl>
        `;
    });
  }
}

renderProductDetails();
