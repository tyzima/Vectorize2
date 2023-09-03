
const fileInput = document.getElementById("file-upload");
const colorCircles = document.querySelectorAll(".color-circle");
const vectorizeButton = document.getElementById("vectorize-btn");
const downloadButton = document.getElementById("download-btn");
const imageSlider = document.querySelector(".image-slider");

let selectedColor = 0; // Default to no color selected

fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            const imgElement = document.createElement("img");
            imgElement.src = e.target.result;
            imageSlider.innerHTML = ""; // Clear previous images
            imageSlider.appendChild(imgElement); // Display the "before" image
        };
    }
});

colorCircles.forEach(circle => {
    circle.addEventListener("click", function() {
        // Remove the 'selected' class from all circles
        colorCircles.forEach(c => c.classList.remove("selected"));
        // Add the 'selected' class to the clicked circle
        circle.classList.add("selected");
        selectedColor = parseInt(circle.textContent); // Set the selected color count
    });
});

vectorizeButton.addEventListener("click", function() {
    if (fileInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    if (selectedColor === 0) {
        alert("Please select the number of colors.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("processing.max_colors", selectedColor);
    formData.append("output.file_format", "svg");

    fetch("https://api.vectorizer.ai/api/v1/vectorize", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + process.env.API_KEY
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.output && data.output.url) {
            const svgElement = document.createElement("img");
            svgElement.src = data.output.url;
            imageSlider.appendChild(svgElement); // Display the "after" SVG image

            // Enable the download button
            downloadButton.href = data.output.url;
            downloadButton.style.display = "inline-block";
        } else {
            alert("There was an error processing your image. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while vectorizing the image.");
    });
});
