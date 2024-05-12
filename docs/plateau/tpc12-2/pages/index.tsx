import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Index: NextPage = () => {
  return (
    <>
      <h2>サンプル</h2>
      <ul>
        <li>
          <Link href="/basic">basic</Link>
        </li>
        <li>
          <Link href="/night">night</Link>
        </li>
      </ul>
      <h2>出典</h2>
      <ul>
        <li>
          <a href="https://www.mlit.go.jp/plateau/learning/tpc12-2/">
            TOPIC 12｜Three.jsで活用する[2/2]｜ReactでThree.jsを扱う | How To
            Use | PLATEAU [プラトー]
          </a>
        </li>
        <li>
          <a href="https://www.geospatial.jp/ckan/dataset/plateau-tokyo23ku/resource/04a3109d-9392-42e9-95d2-e04bda7a8d42">
            一般社団法人　社会基盤情報流通推進協議会$都市局$3D都市モデル（Project
            PLATEAU）東京都23区$FBX
          </a>
        </li>
      </ul>
    </>
  );
};

export default Index;
