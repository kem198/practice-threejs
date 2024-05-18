// https://threejs.org/docs/index.html#manual/en/introduction/WebGL-compatibility-check
// 次のメソッドを使用すると、サポートされているかどうかを確認し、
// サポートされていない場合はユーザーにメッセージを表示できます

import WebGL from "three/addons/capabilities/WebGL.js";

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
