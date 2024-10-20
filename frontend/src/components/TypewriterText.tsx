import React, { useState, useEffect } from 'react';

const TypewriterText: React.FC<{ textArray: string[]; typeSpeed?: number; deleteSpeed?: number; delay?: number }> = ({
  textArray,
  typeSpeed = 50,
  deleteSpeed = 30,
  delay = 1000,
}) => {
  const [text, setText] = useState(''); // To hold the current displayed text
  const [index, setIndex] = useState(0); // To track which text in textArray we're on
  const [charIndex, setCharIndex] = useState(0); // To track the current character we're typing
  const [isDeleting, setIsDeleting] = useState(false); // Track whether we're deleting or typing

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < textArray[index].length) {
      // Typing the characters
      typingTimeout = setTimeout(() => {
        setText((prevText) => prevText + textArray[index][charIndex]);
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
      }, typeSpeed);
    } else if (isDeleting && charIndex > 0) {
      // Deleting the characters
      typingTimeout = setTimeout(() => {
        setText((prevText) => prevText.slice(0, -1));
        setCharIndex((prevCharIndex) => prevCharIndex - 1);
      }, deleteSpeed);
    } else if (charIndex === textArray[index].length && !isDeleting) {
      // Pause after the word is fully typed
      typingTimeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && charIndex === 0) {
      // Move to the next word
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length); // Loop through the textArray
    }

    return () => clearTimeout(typingTimeout); // Cleanup timeout on unmount
  }, [charIndex, isDeleting, index, textArray, typeSpeed, deleteSpeed, delay]);

  return (
    <div className="text-center mt-0">
      <h1 className="text-green-600 text-xl">
        {text}
        <span className="blinking-cursor">|</span> {/* Simulating a blinking cursor */}
      </h1>
    </div>
  );
};

export default TypewriterText;