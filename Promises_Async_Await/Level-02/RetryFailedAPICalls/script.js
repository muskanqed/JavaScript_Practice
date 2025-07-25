const fetchBtn = document.getElementById("fetchBtn");
const output = document.getElementById("output");

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryFetch(url, options = {}, retries = 5, delayMs = 1000) {
    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .catch(async (error) => {
            if (retries > 0) {
                output.textContent = `\n⚠️ Retry in ${delayMs}ms... (${retries} retries left)`
                await delay(delayMs);
                return retryFetch(url, options, retries - 1, delayMs * 2);
            } else {
                output.textContent += `\n❌ Failed after multiple attempts.`;
                throw error;
            }
        });
}

fetchBtn.addEventListener("click", () => {
    output.textContent = "";
    retryFetch("https://dummyjson.c/")
        .then(data => {
            output.textContent += `\n✅ Success:\n${JSON.stringify(data, null, 2)}`;
        })
        .catch(err => {
            output.textContent += `\n🚨 ${err.message}`;
        });
});
