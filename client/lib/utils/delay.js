import { getNode } from "../dom/getNode.js";
import { isNumber, isObject } from "./typeOf.js";

const first = getNode(".first");
const second = getNode(".second");

function delay(callback, timeout = 1000) {
  setTimeout(callback, timeout);
}

const defaultOptions = {
  shouldReject: false,
  timeout: 1000,
  data: "성공",
  errorMessage: "알 수 없는 오류가 발생했습니다.",
};

export function delayP(options = {}) {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    config.timeout = options;
  }

  if (isObject(options)) {
    config = { ...config, ...options };
  }

  const { shouldReject, data, errorMessage, timeout } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      !shouldReject ? resolve(data) : reject(errorMessage);
    }, timeout);
  });
}

async function delayA() {
  return "완료";
}

let result = await delayA();

//example
async function 라면끓이기() {
  try {
    await delayP();
    first.style.top = "-100px";

    await delayP();
    first.style.transform = "rotate(360deg)";

    await delayP();
    first.style.top = "0px";

    await delayP();
    console.log("계란넣기");

    await delayP();
    console.log("그릇에담기");
  } catch (err) {
    console.log(err);
  }
}
