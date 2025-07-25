const box = document.getElementById('box');
const changeColorBtn = document.getElementById('changeColorBtn');

function changeColor(color, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            box.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

changeColorBtn.addEventListener('click', () => {
    changeColor('crimson', 1000)
        .then(() => changeColor('orange', 2000))
        .then(() => changeColor('blue', 2000))
        .then(() => changeColor('green', 2000))
        .then(() => changeColor('red', 2000))
        .then(() => changeColor('#ddd', 1000));
})