export function handleFormSubmit(event) {
    event.preventDefault(); 
    const url = document.getElementById("articleURL").value; 
    console.log(url);

    if (url) {
        fetch("/analyze", {
            method: "POST",
            body: JSON.stringify({ url }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById("result").innerText = `Polarity: ${result.polarity}, Subjectivity: ${result.subjectivity}`;
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert("Please enter a valid URL");
    }
}
