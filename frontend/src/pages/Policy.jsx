import { useEffect, useState } from "react";

const Policy = ({ type }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const displayText = async () => {
        console.log(type)
      try {
        // Use absolute path starting with / to fetch from public folder
        const response = await fetch(`/${type}.txt`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const textContent = await response.text();
        setText(textContent);
      } catch (error) {
        console.error("Failed to load policy text:", error);
        setText("Failed to load policy content.");
      }
    };

    if (type) {
      displayText();
    }
  }, [type]);

  return (
    <div className="min-h-dvh w-full p-8 bg-(--cream-color)">
      <pre className="mx-auto text-base whitespace-pre-wrap max-w-6xl leading-5">{text}</pre>
    </div>
  );
};

export default Policy;
