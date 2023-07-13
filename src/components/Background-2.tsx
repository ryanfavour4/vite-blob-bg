import React, { useEffect, useRef } from "react";
import "./Background-2.css";

type Prop = {
  children: React.ReactNode;
};

export default function Background({ children }: Prop) {
  const { interactionBlob } = useBackground();
  return (
    <div className="gradient-bg-2">
      <div className="gradients-container-2">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradient-bg-children-2">{children}</div>
        <div className="g1-2"></div>
        <div className="g2-2"></div>
        <div className="g3-2"></div>
        <div className="g4-2"></div>
        <div className="g5-2"></div>
        <div ref={interactionBlob} className="interactive-2"></div>
      </div>
    </div>
  );
}

const useBackground = () => {
  let tgX = 0;
  let tgY = 0;
  let curX = 0;
  let curY = 0;
  const interactionBlob = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    if (interactionBlob.current) {
      interactionBlob.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }
  }

  window.addEventListener("mousemove", (e: MouseEvent) => {
    tgX = e.clientX;
    tgY = e.clientY;
  });

  useEffect(() => {
    move();
  }, []);

  return { interactionBlob };
};
