export async function sendDataToServer(url) {
    try {
        const response = await fetch("/analyze", {
            method: "POST",
            body: JSON.stringify({ text: url }),
            headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
