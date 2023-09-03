
const fileInput = document.getElementById("file-upload");
const colorCircles = document.querySelectorAll(".color-circle");
const vectorizeButton = document.getElementById("vectorize-btn");
const downloadButton = document.getElementById("download-btn");
const imageSlider = document.querySelector(".image-slider");

let selectedColorCount = 0;

// Function to select the color count
function selectColor(count) {
    // Resetting all selections
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`color-${i}`).classList.remove('selected');
    }
    // Setting the selected color count
    document.getElementById(`color-${count}`).classList.add('selected');
    selectedColorCount = count;
}

// Function to process the image using Vectorize API
function processImage() {
    let fileInput = document.getElementById('file-upload');
    let image = fileInput.files[0];

    if (!image) {
        alert('Please upload an image first.');
        return;
    }

    if (selectedColorCount === 0) {
        alert('Please select a color count.');
        return;
    }

    let formData = new FormData();
    formData.append('image', image);
    formData.append('processing.max_colors', selectedColorCount);
    formData.append('output.file_format', 'svg');

    fetch('https://api.vectorizer.ai/api/v1/vectorize', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + process.env.VECTORIZER_API_KEY
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.output && data.output.url) {
            // Display SVG beside the original image
            let imageSlider = document.querySelector('.image-slider');
            let svgElement = document.createElement('img');
            svgElement.setAttribute('src', data.output.url);
            imageSlider.appendChild(svgElement);

            // Make SVG downloadable
            let downloadBtn = document.getElementById('download-btn');
            downloadBtn.href = data.output.url;
        } else {
            alert('Error vectorizing the image. Please try again.');
        }
    })
    .catch(error => {
        alert('Error processing the image. Please try again.');
    });
}

// Attach the processImage function to the Vectorize button
document.getElementById('vectorize-btn').addEventListener('click', processImage);
