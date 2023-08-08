import {
  getNode,
  bindEvent,
  css,
  visibleElement,
  invisibleElement,
} from "../../lib/index.js";
import { menuData } from "../data/navigationData.js";

const dropDown = getNode(".nav-menu__list");
const dropDownItem = getNode(".nav-sub-menu ");

const subMenuContent = menuData
  .map(
    (item) => `
      <li>
        <a href="#">
          <img src="${item.icon}" alt="메뉴 아이콘" />
          <span>${item.text}</span>
        </a>
      </li>
    `
  )
  .join("");

dropDownItem.innerHTML = subMenuContent;

const handler = (() => {
  let isEnter = false;

  return () => {
    !isEnter ? visibleElement(dropDownItem) : invisibleElement(dropDownItem);
    isEnter = !isEnter;
  };
})();

bindEvent(dropDown, "mouseover focus", handler);
bindEvent(dropDown, "mouseout blur", handler);
