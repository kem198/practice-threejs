import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Quaternion, Vector3 } from "three";

// PlateauTilesetTransformContext を作成し、初期値として setCenter 関数を提供します。
export const PlateauTilesetTransformContext = createContext({
  setCenter: (center: Vector3): void => {},
});

// PlateauTilesetTransform コンポーネントのプロパティとして、子要素を受け取ります。
export interface PlateauTilesetTransformProps {
  children: ReactNode;
}

// PlateauTilesetTransform コンポーネント
export const PlateauTilesetTransform: React.FC<
  PlateauTilesetTransformProps
> = ({ children }) => {
  // state の初期値として、offset と rotation を持つオブジェクトを設定します。
  const [{ offset, rotation }, setState] = useState<{
    offset?: Vector3;
    rotation?: Quaternion;
  }>({});

  // センターを設定する関数を作成します。
  const setCenter = useCallback((center: Vector3) => {
    // センター方向を計算します。
    const direction = center.clone().normalize();
    const up = new Vector3(0, 1, 0);
    // センター方向から回転を計算します。
    const rotation = new Quaternion();
    rotation.setFromUnitVectors(direction, up);
    // state を更新して、オフセットと回転を設定します。
    setState({
      offset: new Vector3(0, -center.length(), 0),
      rotation,
    });
  }, []);

  // コンテキスト値をメモ化します。
  const context = useMemo(() => ({ setCenter }), [setCenter]);

  // PlateauTilesetTransformContext.Provider でコンテキストを提供し、子要素をレンダリングします。
  return (
    <PlateauTilesetTransformContext.Provider value={context}>
      <group position={offset} quaternion={rotation}>
        {children}
      </group>
    </PlateauTilesetTransformContext.Provider>
  );
};
