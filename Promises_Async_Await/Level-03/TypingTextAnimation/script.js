const text = "Welcome to the Typing Text Animation!";
const typingText = document.getElementById("typingText");

function typeText(text, speed = 100) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      typingText.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

typeText(text);
