import type { CSSProperties } from "react";

const DemoPlayer = () => {
  const containerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    paddingTop: "56.25%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */,
  };

  /* Then style the iframe to fit in the container div with full height and width */
  const iframeStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  };
  return (
    <div style={containerStyle}>
      <iframe
        style={iframeStyle}
        width="560"
        height="315"
        src="./demo.html"
        title="Vxdk player"
        frameBorder="0"
        scrolling="no"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default DemoPlayer;
