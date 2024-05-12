import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import React from "react";

import { PlateauTileset } from "../src/PlateauTileset";
import { PlateauTilesetTransform } from "../src/PlateauTilesetTransform";

// アプリケーションのメインコンポーネント App
export const App: React.FC = () => (
  // Canvas コンポーネントを使用して 3D シーンを作成します。
  <Canvas shadows>
    {/* 霧効果を追加します。*/}
    <fogExp2 attach="fog" color="white" density={0.0002} />
    {/* パースペクティブカメラを作成します。*/}
    <PerspectiveCamera
      makeDefault
      position={[-1600, 450, -1400]}
      near={10}
      far={1e5}
    />
    {/* オービットコントロールを追加します。*/}
    <OrbitControls target={[-1200, 0, -800]} />
    {/* 環境光を追加します。*/}
    <ambientLight intensity={0.5} />
    {/* 平行光源を追加します。*/}
    <directionalLight
      position={[500, 1000, 1000]}
      intensity={1}
      castShadow
      shadow-mapSize={[8192, 8192]}
    >
      {/* ライトの影を設定します。*/}
      <orthographicCamera
        attach="shadow-camera"
        args={[-2500, 2500, 2500, -2500, 1, 5000]}
      />
    </directionalLight>
    {/* 地面を追加します。*/}
    <Plane
      args={[1e5, 1e5]}
      position={[0, 12, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial color="white" />
    </Plane>
    {/* PlateauTilesetTransform コンポーネント内に PlateauTileset コンポーネントを配置します。*/}
    <PlateauTilesetTransform>
      {/* 1つ目の PlateauTileset コンポーネントを追加します。 */}
      <PlateauTileset
        path="bldg/13100_tokyo/13101_chiyoda-ku/notexture"
        center
      />
      {/* 2つ目の PlateauTileset コンポーネントを追加します。 */}
      <PlateauTileset path="bldg/13100_tokyo/13102_chuo-ku/notexture" />
    </PlateauTilesetTransform>
    {/* ポストプロセスエフェクトを追加します。*/}
    <EffectComposer>
      <SSAO intensity={5000} />
    </EffectComposer>
  </Canvas>
);
