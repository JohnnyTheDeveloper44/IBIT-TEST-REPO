import { useState, useEffect, useCallback } from 'react';

interface TypingConfig {
  text: string;
  typoIndex: number;
  typoChar: string;
  correctChar: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseBeforeCorrect?: number;
  pauseAfterTypo?: number;
  wordPause?: number;
  resetKey?: number; // Increment to restart the animation
}

interface TypingState {
  displayText: string;
  isTyping: boolean;
  showCursor: boolean;
  showOops: boolean;
  isShaking: boolean;
  phase: 'typing' | 'typo-pause' | 'oops' | 'deleting' | 'correcting' | 'complete';
}

export const useTypingEffect = (config: TypingConfig): TypingState => {
  const {
    text,
    typoIndex,
    typoChar,
    correctChar,
    typingSpeed = 120,
    deleteSpeed = 80,
    pauseBeforeCorrect = 800,
    pauseAfterTypo = 600,
    wordPause = 200,
    resetKey = 0,
  } = config;

  const [state, setState] = useState<TypingState>({
    displayText: '',
    isTyping: true,
    showCursor: true,
    showOops: false,
    isShaking: false,
    phase: 'typing',
  });

  const getRandomSpeed = useCallback((baseSpeed: number, isWordEnd: boolean) => {
    // Add human-like variation to typing speed
    const variation = Math.random() * 40 - 20;
    const speed = Math.max(60, baseSpeed + variation);
    // Add extra pause after words (spaces)
    return isWordEnd ? speed + wordPause : speed;
  }, [wordPause]);

  useEffect(() => {
    // Reset state when resetKey changes
    setState({
      displayText: '',
      isTyping: true,
      showCursor: true,
      showOops: false,
      isShaking: false,
      phase: 'typing',
    });

    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let hasTypedTypo = false;
    let isDeleting = false;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        // Check if we're at the typo position and haven't made the typo yet
        if (currentIndex === typoIndex && !hasTypedTypo && !isDeleting) {
          // Type the wrong character
          hasTypedTypo = true;
          setState(prev => ({
            ...prev,
            displayText: prev.displayText + typoChar,
            phase: 'typo-pause',
          }));
          
          // Pause after typo - longer pause to make it noticeable
          timeout = setTimeout(() => {
            setState(prev => ({
              ...prev,
              isShaking: true,
              showOops: true,
              phase: 'oops',
            }));
            
            // Show oops and shake - hold it longer
            timeout = setTimeout(() => {
              setState(prev => ({
                ...prev,
                isShaking: false,
                phase: 'deleting',
              }));
              
              // Delete the wrong character
              timeout = setTimeout(() => {
                isDeleting = true;
                setState(prev => ({
                  ...prev,
                  displayText: prev.displayText.slice(0, -1),
                  showOops: false,
                  phase: 'correcting',
                }));
                
                // Type the correct character
                timeout = setTimeout(() => {
                  isDeleting = false;
                  setState(prev => ({
                    ...prev,
                    displayText: prev.displayText + correctChar,
                    phase: 'typing',
                  }));
                  currentIndex++;
                  const isWordEnd = text[currentIndex] === ' ';
                  timeout = setTimeout(typeNextChar, getRandomSpeed(typingSpeed, isWordEnd));
                }, getRandomSpeed(typingSpeed, false));
              }, deleteSpeed);
            }, pauseBeforeCorrect);
          }, pauseAfterTypo);
        } else {
          // Normal typing
          const nextChar = text[currentIndex];
          setState(prev => ({
            ...prev,
            displayText: prev.displayText + nextChar,
            phase: 'typing',
          }));
          currentIndex++;
          // Check if next char is a space for word pause
          const isWordEnd = text[currentIndex] === ' ' || currentIndex === text.length;
          timeout = setTimeout(typeNextChar, getRandomSpeed(typingSpeed, isWordEnd));
        }
      } else {
        // Typing complete
        setState(prev => ({
          ...prev,
          isTyping: false,
          phase: 'complete',
        }));
      }
    };

    // Start typing after a short delay
    timeout = setTimeout(typeNextChar, 800);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setState(prev => ({
        ...prev,
        showCursor: !prev.showCursor,
      }));
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [text, typoIndex, typoChar, correctChar, typingSpeed, deleteSpeed, pauseBeforeCorrect, pauseAfterTypo, getRandomSpeed, resetKey]);

  return state;
};
