import { getNode, getRandom } from "../../lib/index.js";
import { handlerSignIn } from "../sign/index.js";

const loginButton = getNode(".login--button");
loginButton.addEventListener("click", handlerSignIn);
