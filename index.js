const outputEl = document.getElementById('output');
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : false;

const start = () => {
    if (!recognition) {
        console.log('no SpeechRecognition object');
        document.innerHTML = '<p>Sorry, speech recognition is not supported on your browser. Consider using Chrome.</p>';
        return;
    }

    console.log(recognition);
    recognition.continuous = true;
    recognition.start();
}

const stop = () => {
    recognition.stop();
}

recognition.addEventListener('result', (evt) => {
    addText(evt.results[evt.results.length - 1][0].transcript);
})

addText = (text) => {
    text = toSentence(text);
    outputEl.innerText = outputEl.innerText == '' ? text : outputEl.innerText + ' ' + text;
}

toSentence = (text) => {
    text = text.trim().split('');
    text[0] = text[0].toUpperCase();
    if (text[text.length - 1] !== '.') text.push('.');
    return text.join('');
}

start();