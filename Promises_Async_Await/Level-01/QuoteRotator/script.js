const quoteBox = document.getElementById('quoteBox');

const quotes = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky"
];

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

let index = 0;

function showQuote() {
    quoteBox.textContent = quotes[index];
    index = index + 1 % quotes.length;

    delay(5000).then(showQuote);
}

showQuote();

