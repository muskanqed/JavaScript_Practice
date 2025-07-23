const imageUrls = [
    "https://via.placeholder.com/150",
    "https://picsum.photos/200/300",
    "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
    "https://thisurldoesnotexist.com/image.jpg",  // 👻 Broken
    "https://via.placeholder.com/250"
];

const gallery = document.getElementById('gallery');
const progressBar = document.getElementById('progress-bar');
const loadImagesBtn = document.getElementById('loadImagesBtn');

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load the image with url: ${url}`)
    });
}

function updateProgressBar(count, total) {
    const percentage = (count / total) * 100;
    progressBar.style.width = `${percentage}%`;
}

loadImagesBtn.addEventListener("click", ()=>{
    gallery.innerHTML = "";
    progressBar.style.width = '0%';

    let completed = 0;

    const promises = imageUrls.map(url => {
        return loadImage(url)
        .then(img =>{
            gallery.appendChild(img);
        })
        .catch(err=>{
            const error = document.createElement('div');
            error.className = 'error-box';
            error.textContent = err;
            gallery.appendChild(error);
        })
        .finally(()=>{
            completed++;
            updateProgressBar(completed,imageUrls.length);
        })
    })

    Promise.allSettled(promises).then(()=>{
        console.log("All image loading attempts completed.");
    })
})