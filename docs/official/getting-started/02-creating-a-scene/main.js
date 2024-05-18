// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

import * as THREE from "three";

///// シーンの設定 /////
const scene = new THREE.Scene();

///// カメラの設定 /////
// three.js にはいくつか異なるカメラがあるが、今回は PerspectiveCamera を使用する
const camera = new THREE.PerspectiveCamera(
  // 視野 (FOV / field of view)
  // 値は度単位
  75,
  // アスペクト比 (aspect ratio)
  // 基本的に要素の幅を高さで割った値を使用する
  window.innerWidth / window.innerHeight,
  // 近距離クリッピングプレーン (near clipping plane)
  // 次の遠距離と併せてレンダリングされる閾値を設定する
  0.1,
  // 遠距離クリッピングプレーン (far clipping plane)
  1000
);

///// レンダラーの設定 /////
const renderer = new THREE.WebGLRenderer();
// ウィンドウの幅と高さを使用する
// アプリのサイズを維持しながら、より低い解像度でレンダリングしたい場合は第三引数へ false を指定する
// setSize(window.innerWidth/2, window.innerHeight/2, false)
renderer.setSize(window.innerWidth, window.innerHeight);
// レンダラー要素を HTML ドキュメントへ追加する
// canvas 要素として追加される
document.body.appendChild(renderer.domElement);

///// 立方体を描画する /////
// 立方体ジオメトリ (形状) の頂点と面を含むオブジェクトからインスタンスを生成
const geometory = new THREE.BoxGeometry(1, 1, 1);
// 色を付けるためのマテリアル設定
// 16 進数で緑色 (0x00ff00) を設定している
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// メッシュの設定
// メッシュはジオメトリを取得し、それにマテリアルを適用する
// これによりメッシュをシーンに挿入して自由に移動できる
const cube = new THREE.Mesh(geometory, material);
// シーンへ追加する
// デフォルトでは座標 (0, 0, 0) へ追加される
// これによりカメラと立方体の両方が互いの内側に配置されるので、カメラの座標を少し外側に移動する
scene.add(cube);
camera.position.z = 5;

///// レンダリングする /////
// animate 関数を定義
// 画面が更新されるたびにレンダラーにシーンw描画させるループが作成される
// 基本的に 60fps で描画する
// setInterval に対して、別タブに移動すると一時停止することで処理能力とバッテリー寿命に利点がある
function animate() {
  requestAnimationFrame(animate);

  // 1 フレームごとに x, y に回転を加算する
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// animate 関数を実行
animate();
