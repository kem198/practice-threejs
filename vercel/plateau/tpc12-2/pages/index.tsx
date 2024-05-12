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
          <a href="https://github.com/Project-PLATEAU/plateau-streaming-tutorial">
            Project-PLATEAU/plateau-streaming-tutorial:
            PLATEAU配信サービス利用のためのチュートリアル
          </a>
        </li>
      </ul>
    </>
  );
};

export default Index;
