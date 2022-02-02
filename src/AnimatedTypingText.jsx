import React, { useEffect, useState } from "react";

export default function AnimatedTypingText(props) {
  const { text } = props;
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUpdate(new Date().getTime()), 100);

    return () => clearInterval(interval);
  });

  return <div>{text + "... ".slice(0, Math.round(update / 250) % 4)}</div>;
}
