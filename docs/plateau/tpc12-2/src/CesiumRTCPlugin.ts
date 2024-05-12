import { GLTF, GLTFLoaderPlugin, GLTFParser } from "three-stdlib";

// CesiumRTCPlugin クラスは、GLTFLoaderPlugin インターフェースを実装しています。
// これは、GLTF ファイルの読み込み時に特定の拡張機能を処理するプラグインです。
export class CesiumRTCPlugin implements GLTFLoaderPlugin {
  // プラグインの名前を定義します。
  readonly name = "CESIUM_RTC";

  // コンストラクターは GLTFParser インスタンスを受け取ります。
  constructor(private readonly parser: GLTFParser) {}

  // GLTF ルートノードの読み込み後に呼び出されるメソッドです。
  // result パラメーターには、GLTF データが含まれます。
  afterRoot(result: GLTF): null {
    // GLTF ファイルに CESIUM_RTC 拡張が含まれている場合の処理を行います。
    if (this.parser.json.extensions?.CESIUM_RTC?.center != null) {
      // 拡張機能から中心座標を取得します。
      const center: [number, number, number] =
        this.parser.json.extensions.CESIUM_RTC.center;
      // 結果のシーンの位置を設定します。
      result.scene.position.set(...center);
    }
    // 処理が完了したことを示すために null を返します。
    return null;
  }
}
