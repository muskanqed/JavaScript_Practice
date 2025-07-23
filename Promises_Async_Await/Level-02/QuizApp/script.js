const question = {
    text: "Which language is known as the language of the web?",
    options: ["Python", "C++", "JavaScript", "Rust"],
    correct: "JavaScript",
    hint: "It's the only one browsers understand natively."
};

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const hintEl = document.getElementById("hint");
const resultEl = document.getElementById("result");

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function askQuestion(q) {
    questionEl.textContent = q.text;
    hintEl.textContent = '';
    resultEl.textContent = '';
    optionsEl.innerHTML = '';

    let answered = false;

    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            resultEl.textContent = option === q.correct ? "✅ Correct!" : "❌ Wrong!"
        });
        optionsEl.appendChild(btn)
    })

    const hintPromise = delay(5000).then(() => {
        if (!answered) {
            hintEl.textContent = `💡 Hint: ${q.hint}`;
        }
    });

    const userClickedPromise = new Promise(resolve => {
        optionsEl.addEventListener('click', () => {
            resolve();
        }, { once: true })
    });

    Promise.race([hintPromise, userClickedPromise])
}

askQuestion(question);