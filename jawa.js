
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const bookPage = document.getElementById("bookPage");
const bookContent = document.getElementById("bookContent");
const gallery = document.getElementById("gallery");

const titleInput = document.getElementById("titleInput");
const textInput = document.getElementById("textInput");
const imageInput = document.getElementById("imageInput");

let stories = [];

function openPopup() {
    popup.style.display = "block";
    overlay.style.display = "block";
}

function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
}

function closeBook() {
    bookPage.style.display = "none";
    overlay.style.display = "none";
}

function createBook() {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const imageFile = imageInput.files[0];

    if (!title || !text || !imageFile) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const storyIndex = stories.length;

        stories.push({
            title: title,
            text: text,
            image: e.target.result
        });

        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";

        const img = document.createElement("img");
        img.src = e.target.result;

        img.onclick = function() {
            bookContent.innerHTML = `
                <h2 style="margin-top:0;">${stories[storyIndex].title}</h2>
                <p>${stories[storyIndex].text}</p>
            `;
            bookPage.style.display = "block";
            overlay.style.display = "block";
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "✕";
        deleteBtn.style.position = "absolute";
        deleteBtn.style.top = "20px";
        deleteBtn.style.right = "20px";
        deleteBtn.style.background = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius = "50%";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.width = "28px";
        deleteBtn.style.height = "28px";
        deleteBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";

        deleteBtn.onclick = function() {
            stories.splice(storyIndex, 1);
            wrapper.remove();
        };

        wrapper.appendChild(img);
        wrapper.appendChild(deleteBtn);
        gallery.appendChild(wrapper);
    };

    reader.readAsDataURL(imageFile);

    titleInput.value = "";
    textInput.value = "";
    imageInput.value = "";
    closePopup();
}

overlay.onclick = function() {
    closePopup();
    closeBook();
};
