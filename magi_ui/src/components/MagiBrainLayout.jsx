import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PANELS = [
  { brain: "SARASWATI", label: "BRAIN 1", position: "top" },
  { brain: "LAKSHMI", label: "BRAIN 2", position: "left" },
  { brain: "DURGA", label: "BRAIN 3", position: "right" },
];

export default function MagiBrainLayout({ brainStates, votes, majorityDecision, phase }) {
  const frameRef = useRef(null);
  const topRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [trianglePoints, setTrianglePoints] = useState([]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const topPanel = topRef.current;
    const leftPanel = leftRef.current;
    const rightPanel = rightRef.current;

    if (!frame || !topPanel || !leftPanel || !rightPanel) {
      return undefined;
    }

    function recalculateTriangle() {
      const frameRect = frame.getBoundingClientRect();
      const topRect = topPanel.getBoundingClientRect();
      const leftRect = leftPanel.getBoundingClientRect();
      const rightRect = rightPanel.getBoundingClientRect();

      const frameCenterX = frameRect.width / 2;
      const topBottomY = topRect.bottom - frameRect.top;
      const leftCenterY = leftRect.top - frameRect.top + leftRect.height / 2;
      const rightCenterY = rightRect.top - frameRect.top + rightRect.height / 2;
      const leftInnerEdgeX = leftRect.right - frameRect.left;
      const rightInnerEdgeX = rightRect.left - frameRect.left;

      const lowerBrainMidpointY = (leftCenterY + rightCenterY) / 2;
      const gapWidth = Math.max(rightInnerEdgeX - leftInnerEdgeX, 0);
      const triangleWidth = gapWidth * 1.5;
      const triangleHeight = triangleWidth * 1.25;

      const topVertex = {
        x: frameCenterX,
        y: topBottomY - 300,
      };

      const leftVertex = {
        x: frameCenterX - triangleWidth / 2,
        y: Math.min(lowerBrainMidpointY, topVertex.y + triangleHeight)+20,
      };

      const rightVertex = {
        x: frameCenterX + triangleWidth / 2,
        y: Math.min(lowerBrainMidpointY, topVertex.y + triangleHeight)+20,
      };

      setTrianglePoints([topVertex, leftVertex, rightVertex]);
    }

    const observer = new ResizeObserver(recalculateTriangle);
    observer.observe(frame);
    observer.observe(topPanel);
    observer.observe(leftPanel);
    observer.observe(rightPanel);
    window.addEventListener("resize", recalculateTriangle);
    recalculateTriangle();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recalculateTriangle);
    };
  }, []);

  return (
    <section className="magi-frame" ref={frameRef}>
      <div className="magi-header-row">
        <div className="magi-banner">
          <span>質問</span>
        </div>
        <div className="magi-banner magi-banner-right">
          <span>解決</span>
        </div>
      </div>

      <aside className="system-dossier">
        <p>CODE:473</p>
        <p>FILE: MAGI.SYS</p>
        <p>EXTENSION: 3023</p>
        <p>EX_MODE: {phase === "processing" ? "RUN" : "OFF"}</p>
        <p>PRIORITY: AAA</p>
      </aside>

      <aside className="system-status">
        <p className="system-status-label">STATE</p>
        <strong>{phase.toUpperCase()}</strong>
      </aside>

      {PANELS.map((panel) => (
        <BrainPanel
          key={panel.brain}
          panelRef={
            panel.position === "top"
              ? topRef
              : panel.position === "left"
                ? leftRef
                : rightRef
          }
          name={panel.brain}
          label={panel.label}
          position={panel.position}
          state={brainStates[panel.brain]}
          vote={votes?.[panel.brain]?.selected_action}
        />
      ))}

      <div className="magi-connector-overlay" aria-hidden="true">
        <svg className="magi-connector-svg">
          {trianglePoints.length === 3 ? (
            <polygon
              className="magi-triangle"
              points={trianglePoints.map((point) => `${point.x},${point.y}`).join(" ")}
            />
          ) : null}
        </svg>
      </div>

      <div className="magi-hub">
        <span className="magi-hub-label">MAGI</span>
      </div>

      <div className="decision-readout">
        <span>MAJORITY</span>
        <strong>{majorityDecision ?? "STANDBY"}</strong>
      </div>
    </section>
  );
}

function BrainPanel({ name, label, panelRef, position, state, vote }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (state !== "processing") {
      setIsBlinking(false);
      return undefined;
    }

    let waitTimer = 0;
    let flashTimer = 0;
    let cancelled = false;

    const randomBetween = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const scheduleBlink = () => {
      waitTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setIsBlinking(true);

        flashTimer = window.setTimeout(() => {
          if (cancelled) {
            return;
          }

          setIsBlinking(false);
          scheduleBlink();
        }, randomBetween(50, 120));
      }, randomBetween(80, 300));
    };

    scheduleBlink();

    return () => {
      cancelled = true;
      window.clearTimeout(waitTimer);
      window.clearTimeout(flashTimer);
    };
  }, [state]);

  return (
    <article
      className={`brain-panel brain-${position} state-${state}${isBlinking ? " processing-flash" : ""}`}
      ref={panelRef}
    >
      <div className="brain-gridlines" />
      <div className="brain-content">
        <p className="brain-tag">{position.toUpperCase()}</p>
        <h2>{label}</h2>
        <p className="brain-vote">{vote ?? "STANDBY"}</p>
        <p className="brain-sub">{label}</p>
      </div>
    </article>
  );
}
