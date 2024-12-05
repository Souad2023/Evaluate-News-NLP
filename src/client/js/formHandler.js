export function handleFormSubmit(event) {
    event.preventDefault();
    const url = document.getElementById("articleURL").value;
    if (url) {
        import('./serverClient.js')
            .then((module) => {
                const sendDataToServer = module.sendDataToServer;
                sendDataToServer(url)
                    .then(result => {
                        document.getElementById("result").innerText = `Sentiment: ${result.sentiment}, Agreement: ${result.agreement}, Subjectivity: ${result.subjectivity}`;
                    })
                    .catch(error => {
                        alert("An error occurred while processing the request.");
                    });
            })
            .catch((err) => {
                console.error("Error loading module", err);
            });
    } else {
        alert("Please enter a valid URL");
    }
}
