import React from "react";

import "./Playground.css";
import { select } from "d3";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useIsBrowser from "@docusaurus/useIsBrowser";

interface IPlaygroundProps {
  demoFn: (gui: dat.GUI, playgroundId: string, reRun: HTMLDivElement) => void;
}

function uuid() {
  const random = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "x",
    "y",
    "z",
  ];
  let uuid = "";

  for (let i = 0; i < 10; i++) {
    uuid += random[Math.floor(Math.random() * random.length)];
  }
  return uuid;
}

const Playground: React.FC<IPlaygroundProps> = ({ demoFn }) => {
  const playgroundController = React.useRef<HTMLDivElement>();
  const reRun = React.useRef<HTMLDivElement>();
  const [divId, setUuid] = React.useState("");
  const [clean, setClean] = React.useState(false);
  const isBrowser = useIsBrowser();

  React.useEffect(() => {
      if (clean === false && isBrowser) {
        const dat = require("dat.gui");
        const gui = new dat.GUI({ autoPlace: false });
        playgroundController.current?.appendChild(gui.domElement);
        const uid = uuid();
        setUuid(uid);
        setTimeout(() => demoFn(gui, `#${uid}`, reRun.current));
      }
  }, [clean, isBrowser]);

  React.useEffect(() => {
    if (clean && isBrowser) {
      select(`#${divId}`).html("");
      setTimeout(() => {
        setClean(false);
      });
    }
  }, [clean, divId, isBrowser]);
  return (
    <div className="playground">
      <div className="playground-content">
        <div id={divId}></div>
      </div>
      <div className="playground-controller" ref={playgroundController}></div>
      <div className="playground-rerun" ref={reRun}>
        <button
          onClick={() => {
            setClean(true);
          }}
        >
          Rerun
        </button>
      </div>
    </div>
  );
};
export default (args) => (
  <BrowserOnly>{() => <Playground {...args} />}</BrowserOnly>
);
