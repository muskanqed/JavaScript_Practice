const imageContainer = document.getElementById("imageContainer");
const revealBtn = document.getElementById("revealBtn");

const imageUrls = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/200?random=3",
  "https://picsum.photos/300/200?random=4",
];

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function imageReveal() {
  imageContainer.textContent = "";
  for (let url of imageUrls) {
    const img = new Image();
    img.src = url;
    imageContainer.appendChild(img);
    await delay(500);
    img.classList.add("visible");
  }
}

revealBtn.addEventListener("click", imageReveal);
