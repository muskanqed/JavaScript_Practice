function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = () => reject('Image failed to load');
    });
}

function retryLoad(url, attempts = 3, delayTime = 1000) {
    return loadImage(url).catch(error => {
        if (attempts === 1) throw error;
        return delay(delayTime).then(() => {
            retryLoad(url, attempts - 1, delayTime)
        });
    })
}

document.getElementById("loadBtn").addEventListener("click", () => {
    const url = document.getElementById("imageUrl").value.trim();
    const output = document.getElementById("output");
    output.innerHTML = "Loading..."

    retryLoad(url)
        .then(img => {
            output.innerHTML = "";
            output.appendChild(img);
        })
        .catch(error => {
            console.log(error);
            output.textContent = "Image could not be loaded after 3 attempts."
        });
})