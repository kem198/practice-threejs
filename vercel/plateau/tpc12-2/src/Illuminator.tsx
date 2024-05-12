import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { ColorRepresentation, Group, Plane, Raycaster, Vector3 } from "three";

// Illuminator コンポーネントの定義
export const Illuminator: React.FC<{
  elevation?: number;
  color?: ColorRepresentation;
}> = ({
  elevation = 100, // デフォルトの高度は 100
  color = "#ff9f46", // デフォルトの色は '#ff9f46' (2500K の色温度に対応)
}) => {
  // グループの参照を作成します。
  const ref = useRef<Group>(null);
  // Raycaster インスタンスを作成します。
  const [raycaster] = useState(() => new Raycaster());
  // 平面を定義し、高度を設定します。
  const [plane] = useState(() => new Plane(new Vector3(0, 1, 0)));
  plane.constant = -elevation;

  // フレームごとにレイキャストを行い、光源の位置を更新します。
  useFrame(({ camera, mouse }) => {
    if (ref.current == null) {
      return;
    }
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, ref.current.position);
  });

  // Illuminator コンポーネントの JSX を返します。
  return (
    <group ref={ref}>
      {/* ポイントライトを追加します。 */}
      <pointLight
        distance={1000}
        intensity={2}
        color={color}
        castShadow
        shadow-radius={20}
        shadow-mapSize={[2048, 2048]}
      />
      {/* 光源を表す球体を追加します。 */}
      <Sphere args={[5, 32]}>
        <meshStandardMaterial emissive={color} emissiveIntensity={10} />
      </Sphere>
    </group>
  );
};
