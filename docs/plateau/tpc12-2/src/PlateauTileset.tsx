import { TilesRenderer } from "3d-tiles-renderer";
import { useFrame, useThree } from "@react-three/fiber";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box3, Matrix4, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTFLoader } from "three-stdlib";

import { CesiumRTCPlugin } from "./CesiumRTCPlugin";
import { PlateauTilesetTransformContext } from "./PlateauTilesetTransform";

// GLTFLoader のインスタンスを作成し、CesiumRTCPlugin を登録します。
const gltfLoader = new GLTFLoader();
gltfLoader.register((parser) => new CesiumRTCPlugin(parser));

// シャドウとマテリアルを設定したメッシュ標準マテリアルを作成します。
const material = new MeshStandardMaterial({
  metalness: 0.5,
});

// PlateauTileset コンポーネントのプロパティとして、パスと中央揃えのオプションを受け取ります。
export interface PlateauTilesetProps {
  path: string;
  center?: boolean;
}

// PlateauTileset コンポーネント
export const PlateauTileset: React.FC<PlateauTilesetProps> = ({
  path,
  center = false,
}) => {
  // PlateauTilesetTransform のコンテキストから setCenter 関数を取得します。
  const { setCenter } = useContext(PlateauTilesetTransformContext);
  // 中央揃えの状態を保持する useRef を作成します。
  const centerRef = useRef(center);
  centerRef.current = center;

  // 指定されたパスから TilesRenderer インスタンスを作成するコールバック関数を作成します。
  const createTiles = useCallback(
    (path: string) => {
      const tiles = new TilesRenderer(
        `https://plateau.geospatial.jp/main/data/3d-tiles/${path}/tileset.json`
      );
      tiles.manager.addHandler(/\.gltf$/, gltfLoader);

      // `center` が指定されているとき、タイルの境界ボックスの底面の中央を
      // PlateauTilesetTransform の位置として指定します。
      tiles.onLoadTileSet = () => {
        if (centerRef.current) {
          const box = new Box3();
          const matrix = new Matrix4();
          tiles.getOrientedBounds(box, matrix);
          box.min.z = box.max.z = Math.min(box.min.z, box.max.z);
          box.applyMatrix4(matrix);
          const center = new Vector3();
          box.getCenter(center);
          setCenter(center);
        }
      };

      // タイル内のすべてのオブジェクトに影とマテリアルを適用します。
      tiles.onLoadModel = (scene) => {
        scene.traverse((object) => {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object instanceof Mesh) {
            object.material = material;
          }
        });
      };
      return tiles;
    },
    [setCenter]
  );

  // TilesRenderer のライフサイクル
  const [tiles, setTiles] = useState(() => createTiles(path));

  const pathRef = useRef(path);
  useEffect(() => {
    if (path !== pathRef.current) {
      pathRef.current = path;
      setTiles(createTiles(path));
    }
  }, [path, createTiles]);

  // コンポーネントがアンマウントされるときに TilesRenderer の解放処理を行います。
  useEffect(() => {
    return () => {
      tiles.dispose();
    };
  }, [tiles]);

  // TilesRenderer のカメラを React Three Fiber のカメラと同期します。
  const camera = useThree(({ camera }) => camera);
  useEffect(() => {
    tiles.setCamera(camera);
  }, [tiles, camera]);

  // TilesRenderer の解像度を React Three Fiber のレンダラーから取得し設定します。
  const gl = useThree(({ gl }) => gl);
  useEffect(() => {
    tiles.setResolutionFromRenderer(camera, gl);
  }, [tiles, camera, gl]);

  // フレームごとに TilesRenderer を更新します。
  useFrame(() => {
    tiles.update();
  });

  // TilesRenderer のグループを React Three Fiber の primitive として返します。
  return <primitive object={tiles.group} />;
};
