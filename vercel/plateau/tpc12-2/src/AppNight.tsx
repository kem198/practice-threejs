import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React from "react";

import { Illuminator } from "../src/Illuminator";
import { PlateauTileset } from "../src/PlateauTileset";
import { PlateauTilesetTransform } from "../src/PlateauTilesetTransform";

// App コンポーネントの定義
export const App: React.FC = () => (
  // Canvas コンポーネントを使用して 3D シーンを作成します。
  <Canvas shadows>
    {/* 霧効果を追加します。 */}
    <fogExp2 attach="fog" color="#d7ecff" density={0.0002} />
    {/* パースペクティブカメラを作成します。 */}
    <PerspectiveCamera
      makeDefault
      position={[-1600, 450, -1400]}
      near={10}
      far={1e5}
    />
    {/* オービットコントロールを追加します。 */}
    <OrbitControls target={[-1200, 0, -800]} />
    {/* 地面を追加します。 */}
    <Plane
      args={[1e5, 1e5]}
      position={[0, 12, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial color="white" />
    </Plane>
    {/* PlateauTilesetTransform コンポーネント内に PlateauTileset コンポーネントを配置します。 */}
    <PlateauTilesetTransform>
      {/* 1つ目の PlateauTileset コンポーネントを追加します。 */}
      <PlateauTileset
        path="bldg/13100_tokyo/13101_chiyoda-ku/notexture"
        center
      />
      {/* 2つ目の PlateauTileset コンポーネントを追加します。 */}
      <PlateauTileset path="bldg/13100_tokyo/13102_chuo-ku/notexture" />
    </PlateauTilesetTransform>
    {/* Illuminator コンポーネントを追加します。 */}
    <Illuminator />
    {/* エフェクトコンポーザーを追加します。 */}
    <EffectComposer>
      {/* SSAO エフェクトを追加します。 */}
      <SSAO intensity={3000} blendFunction={BlendFunction.OVERLAY} />
      {/* ブルームエフェクトを追加します。 */}
      <Bloom intensity={2} />
    </EffectComposer>
  </Canvas>
);
