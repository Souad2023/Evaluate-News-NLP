import { sendDataToServer } from './serverClient.js';

export function handleFormSubmit(event) {
    event.preventDefault();
    const url = document.getElementById("articleURL").value;

    if (url) {
        sendDataToServer(url)
            .then(result => {
                document.getElementById("result").innerText = `Sentiment: ${result.sentiment}, Agreement: ${result.agreement}, Subjectivity: ${result.subjectivity}`;
            })
            .catch(error => {
                alert("An error occurred while processing the request.");
            });
    } else {
        alert("Please enter a valid URL");
    }
}
