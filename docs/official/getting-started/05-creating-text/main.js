// https://threejs.org/docs/index.html#manual/en/introduction/Drawing-lines

// https://threejs.org/docs/index.html#manual/en/introduction/WebGL-compatibility-check
// 次のメソッドを使用すると、サポートされているかどうかを確認し、
// サポートされていない場合はユーザーにメッセージを表示できます

import * as THREE from "three";

///// レンダラー / カメラ / シーン の設定 /////
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

///// マテリアルの定義 /////
// 線のマテリアル
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

///// ジオメトリの定義 /////
// 配列上で連続する拡張・ペアの間には線が描画される
// 最初と最後の要素の頂点の間には線は描画されない
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometory = new THREE.BufferGeometry().setFromPoints(points);

///// 線を形成する /////
const line = new THREE.Line(geometory, material);

///// レンダリング /////
scene.add(line);
renderer.render(scene, camera);
