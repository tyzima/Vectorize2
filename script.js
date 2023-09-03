
let selectedColor = 1; // Default color is set to 1

// Function to select color and change the appearance of color circles
function selectColor(color) {
    for (let i = 1; i <= 6; i++) {
        if (i === color) {
            document.getElementById("color-" + i).classList.add("selected");
        } else {
            document.getElementById("color-" + i).classList.remove("selected");
        }
    }
    selectedColor = color;
}

// Function to handle file upload and display the selected image for preview
document.getElementById("file-upload").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", event.target.result);
            document.querySelector(".image-preview").appendChild(imgElement);
        }
        reader.readAsDataURL(file);
    }
});

// Function to handle the "Vectorize" button click
document.getElementById("vectorize-btn").addEventListener("click", function() {
    // Here, you would make the API call to vectorize the image using the selected color
    // For the purpose of this demonstration, I'm just alerting the selected color
    alert("Vectorizing with color: " + selectedColor);
    // Note: You'll need to integrate the actual API call and handle the response accordingly
});

