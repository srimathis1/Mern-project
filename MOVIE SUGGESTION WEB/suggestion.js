const popup = document.querySelector(".popup");
const dialog = document.querySelector(".dialog");
const addbutton = document.querySelector(".add");
const cancel = document.getElementById("cancelsug");
const addsug = document.getElementById("addsug");

const titleInput = document.getElementById("addtitle");
const langInput = document.getElementById("addlang");
const genreInput = document.getElementById("addgenre");
const descInput = document.getElementById("desc");
const posterInput = document.getElementById("poster");

const whole = document.getElementById("whole");

// Show popup
addbutton.addEventListener("click", () => {
    popup.style.display = "block";
    dialog.style.display = "block";
});

// Cancel button
cancel.addEventListener("click", function (e) {
    e.preventDefault();
    popup.style.display = "none";
    dialog.style.display = "none";
    document.getElementById("sugform").reset();
});

// Add suggestion
addsug.addEventListener("click", function (e) {
    e.preventDefault();

    // ✨ Check for empty fields
    if (
        !titleInput.value.trim() ||
        !langInput.value.trim() ||
        !genreInput.value.trim() ||
        !descInput.value.trim() ||
        !posterInput.files.length
    ) {
        alert("Please enter all details before adding the suggestion.");
        return;
    }

    const reader = new FileReader();
    const file = posterInput.files[0];

    reader.onload = function () {
        const posterURL = reader.result;

        const newdiv = document.createElement("div");
        newdiv.setAttribute("class", "content");
        newdiv.innerHTML = `
            <h1>--${titleInput.value}--</h1>
            <h2>${langInput.value}</h2>
            <h2>${genreInput.value}</h2>
            <p>${descInput.value}</p>
            <img src="${posterURL}" alt="Poster">
            <button class="delsugg" onclick="delbutton(event)">Delete</button>
        `;
        whole.appendChild(newdiv);

        saveToLocalStorage();
        popup.style.display = "none";
        dialog.style.display = "none";
        document.getElementById("sugform").reset();
    };

    reader.readAsDataURL(file);
});

// Delete suggestion
function delbutton(event) {
    event.target.parentElement.remove();
    saveToLocalStorage();
}

// Save suggestions to localStorage
function saveToLocalStorage() {
    const cards = Array.from(document.querySelectorAll(".content")).map(card => {
        return {
            title: card.querySelector("h1").innerText,
            lang: card.querySelector("h2:nth-of-type(1)").innerText,
            genre: card.querySelector("h2:nth-of-type(2)").innerText,
            desc: card.querySelector("p").innerText,
            poster: card.querySelector("img").src
        };
    });
    localStorage.setItem("suggestions", JSON.stringify(cards));
}

// Load suggestions from localStorage
window.addEventListener("load", () => {
    const stored = localStorage.getItem("suggestions");
    if (stored) {
        const suggestions = JSON.parse(stored);
        suggestions.forEach(data => {
            const newdiv = document.createElement("div");
            newdiv.setAttribute("class", "content");
            newdiv.innerHTML = `
                <h1>--${data.title}--</h1>
                <h2>${data.lang}</h2>
                <h2>${data.genre}</h2>
                <p>${data.desc}</p>
                <img src="${data.poster}" alt="Poster">
                <button class="delsugg" onclick="delbutton(event)">Delete</button>
            `;
            whole.appendChild(newdiv);
        });
    }
});
