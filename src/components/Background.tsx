import React from "react";

function Background() {
    return (<div className="background">
    <svg className="background-svg" width="100%" height="100%">
      <rect x="0%" y="0%" width="200vh" height="100vh" fill="rgba(0, 0, 0, 0.03)" style={{
        position: "absolute",
        rotate: "45deg"}}/>
      <rect x="70%" y="-85%" width="120vh" height="120vh" fill="rgba(0, 150, 255, 0.7)" style={{
        position: "absolute",
        rotate: "45deg"
      }}/>
      <circle cx="100%" cy="20%" r="62vh" fill="rgba(150, 210, 250, 1)" />
    </svg>
  </div>);
}

export default Background;