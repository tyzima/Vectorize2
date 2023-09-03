document.getElementById("vectorize-btn").addEventListener("click", async () => {
    const fileInput = document.getElementById('file-upload');
    if (!fileInput.files.length) {
        alert("Please upload an image first.");
        return;
    }

    const selectedColor = document.querySelector('.color-circle.selected');
    if (!selectedColor) {
        alert("Please select a color count.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('processing.max_colors', selectedColor.textContent);
    formData.append('output.file_format', 'svg');

    try {
        const response = await fetch("https://api.vectorizer.ai/api/v1/vectorize", {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${process.env.VECTORIZER_API_KEY}`
            },
            body: formData
        });

        const data = await response.json();
        if (data && data.output && data.output.url) {
            const slider = document.querySelector(".image-slider");
            slider.innerHTML = `<img src="${data.output.url}" alt="Vectorized Image">`;
            document.getElementById("download-btn").href = data.output.url;
        } else {
            alert("Failed to vectorize the image. Please try again.");
        }
    } catch (error) {
        console.error("Error vectorizing the image:", error);
        alert("An error occurred. Please try again.");
    }
});

function selectColor(num) {
    const allColors = document.querySelectorAll('.color-circle');
    allColors.forEach(el => el.classList.remove('selected'));
    document.getElementById(`color-${num}`).classList.add('selected');
}
