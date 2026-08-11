const shortenerForm = document.getElementById("shortener-form");
const longUrlInput = document.getElementById("long-url");
const resultBox = document.getElementById("result-box");
const shortUrlInput = document.getElementById("short-url");
const copyBtn = document.getElementById("copy-btn");

shortenerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const originalUrl = longUrlInput.value;

    try {
        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: originalUrl })
        });

        const data = await response.json();

        if (response.ok) {
            shortUrlInput.value = data.shortUrl;
            resultBox.classList.remove("hidden");
        } else {
            alert(data.message || "Failed to shorten URL");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while shortening the URL.");
    }
});

copyBtn.addEventListener("click", () => {
    shortUrlInput.select();
    navigator.clipboard.writeText(shortUrlInput.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => { copyBtn.textContent = "Copy"; }, 2000);
});
