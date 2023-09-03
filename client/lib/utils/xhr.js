/* readyState
  0: uninitalized // 초기화 
  1: loading // 로딩
  2: loaded // 로딩이 완료된 
  3: interactive // 인터랙티브
  4: complete // 완료 
  */

import { typeError } from "../error/typeError.js";

//  콜백 방식
export function xhrData({
  url = "",
  method = "GET",
  body = null,
  onSuccess = null,
  onFail = null,
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
} = {}) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  xhr.addEventListener("readystatechange", () => {
    const { status, readyState, response } = xhr;

    if (status >= 200 && status < 400) {
      if (readyState === 4) {
        console.log("통신 성공");

        onSuccess(JSON.parse(response));
      }
    } else {
      onFail("통신 실패");
    }
  });

  xhr.send(JSON.stringify(body));
}

// shorthand property
xhrData.get = (url, onSuccess, onFail) => {
  xhrData({
    url,
    onSuccess,
    onFail,
  });
};

xhrData.post = (url, body, onSuccess, onFail) => {
  xhrData({
    method: "POST",
    body,
    url,
    onSuccess,
    onFail,
  });
};

xhrData.put = (url, body, onSuccess, onFail) => {
  xhrData({
    method: "PUT",
    body,
    url,
    onSuccess,
    onFail,
  });
};

xhrData.delete = (url, body, onSuccess, onFail) => {
  xhrData({
    method: "DELETE",
    url,
    onSuccess,
    onFail,
  });
};

// promise API
const defaultOptions = {
  url: "",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: null,
};

export function xhrPromise(options = {}) {
  const xhr = new XMLHttpRequest();

  const { method, url, body, headers } = Object.assign(
    {},
    defaultOptions,
    options
  );

  if (!url) typeError("서버와 통신할 url 인자는 반드시 필요합니다.");

  xhr.open(method, url);

  xhr.send(body ? JSON.stringify(body) : null);

  return new Promise((resolve, reject) => {
    xhr.addEventListener("readystatechange", () => {
      const { status, readyState, response } = xhr;

      if (status >= 200 && status < 400) {
        if (readyState === 4) {
          resolve(JSON.parse(response));
        }
      } else {
        reject("에러입니다.");
      }
    });
  });
}

xhrPromise.get = (url) => {
  return xhrPromise({
    url,
  });
};

xhrPromise.post = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: "POST",
  });
};

xhrPromise.put = (url, body) => {
  return xhrPromise({
    url,
    body,
    method: "PUT",
  });
};

xhrPromise.delete = (url) => {
  return xhrPromise({
    url,
    method: "DELETE",
  });
};
