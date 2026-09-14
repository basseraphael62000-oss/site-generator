/* =========================================
SITEFACILE — SCRIPT V1
========================================= */

let currentStep = 1;

let project = {
activity: "",
businessName: "",
city: "",
address: "",
phone: "",
email: "",
social: "",
services: [],
style: "",
images: []
};

/* =========================================
INITIALISATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

```
loadProject();

if (project.services.length === 0) {
    addService();
}

updateProgress();
```

});

/* =========================================
DÉMARRER LE BUILDER
========================================= */

function startBuilder() {

```
const builder = document.getElementById("builder");

builder.classList.remove("hidden");

setTimeout(() => {
    builder.scrollIntoView({
        behavior: "smooth"
    });
}, 50);
```

}

/* =========================================
SCROLL EXEMPLE
========================================= */

function scrollToExample() {

```
document.getElementById("exemple").scrollIntoView({
    behavior: "smooth"
});
```

}

/* =========================================
ACTIVITÉ
========================================= */

function selectActivity(button, activity) {

```
document
    .querySelectorAll(".activity-grid button")
    .forEach(btn => btn.classList.remove("selected"));

button.classList.add("selected");

project.activity = activity;

document.getElementById("customActivity").value = "";

saveProject();
```

}

/* =========================================
STYLE
========================================= */

function selectStyle(button, style) {

```
document
    .querySelectorAll(".style-grid button")
    .forEach(btn => btn.classList.remove("selected"));

button.classList.add("selected");

project.style = style;

saveProject();
```

}

/* =========================================
NAVIGATION ÉTAPES
========================================= */

function nextStep() {

```
if (!validateStep(currentStep)) {
    return;
}

saveCurrentStep();

if (currentStep < 6) {
    currentStep++;
}

showStep();
```

}

function previousStep() {

```
if (currentStep > 1) {
    currentStep--;
}

showStep();
```

}

/* =========================================
AFFICHER L'ÉTAPE
========================================= */

function showStep() {

```
document
    .querySelectorAll(".builder-step")
    .forEach(step => step.classList.remove("active"));

const step = document.getElementById(`step${currentStep}`);

if (step) {
    step.classList.add("active");
}

updateProgress();

if (currentStep === 6) {
    generateWebsitePreview();
}

window.scrollTo({
    top: document.getElementById("builder").offsetTop - 80,
    behavior: "smooth"
});
```

}

/* =========================================
BARRE DE PROGRESSION
========================================= */

function updateProgress() {

```
const percentage = (currentStep / 6) * 100;

const fill = document.getElementById("progressFill");

const text = document.getElementById("progressText");

if (fill) {
    fill.style.width = `${percentage}%`;
}

if (text) {
    text.textContent = `Étape ${currentStep} / 6`;
}
```

}

/* =========================================
VALIDATION
========================================= */

function validateStep(step) {

```
if (step === 1) {

    const custom = document
        .getElementById("customActivity")
        .value
        .trim();

    if (custom !== "") {
        project.activity = custom;
    }

    if (!project.activity) {

        alert("Choisissez votre activité avant de continuer.");

        return false;
    }

}


if (step === 2) {

    const businessName = document
        .getElementById("businessName")
        .value
        .trim();

    const city = document
        .getElementById("city")
        .value
        .trim();

    if (!businessName || !city) {

        alert("Veuillez renseigner le nom de votre entreprise et votre ville.");

        return false;
    }

}


if (step === 4) {

    if (!project.style) {

        alert("Choisissez un style avant de continuer.");

        return false;
    }

}

return true;
```

}

/* =========================================
SAUVEGARDER L'ÉTAPE ACTUELLE
========================================= */

function saveCurrentStep() {

```
if (currentStep === 1) {

    const custom = document
        .getElementById("customActivity")
        .value
        .trim();

    if (custom) {
        project.activity = custom;
    }

}


if (currentStep === 2) {

    project.businessName =
        document.getElementById("businessName").value.trim();

    project.city =
        document.getElementById("city").value.trim();

    project.address =
        document.getElementById("address").value.trim();

    project.phone =
        document.getElementById("phone").value.trim();

    project.email =
        document.getElementById("email").value.trim();

    project.social =
        document.getElementById("social").value.trim();

}


if (currentStep === 3) {

    project.services = [];

    document
        .querySelectorAll(".service-row")
        .forEach(row => {

            const name =
                row.querySelector(".service-name").value.trim();

            const price =
                row.querySelector(".service-price").value.trim();

            if (name) {

                project.services.push({
                    name: name,
                    price: price
                });

            }

        });

}

saveProject();
```

}

/* =========================================
SERVICES
========================================= */

function addService(name = "", price = "") {

```
const list = document.getElementById("servicesList");

const row = document.createElement("div");

row.className = "service-row";

row.innerHTML = `
    <input
        type="text"
        class="service-name"
        placeholder="Nom de la prestation"
        value="${escapeHTML(name)}"
    >

    <input
        type="text"
        class="service-price"
        placeholder="Prix"
        value="${escapeHTML(price)}"
    >

    <button
        class="remove-service"
        onclick="removeService(this)"
        type="button"
    >
        ×
    </button>
`;

list.appendChild(row);
```

}

function removeService(button) {

```
const row = button.parentElement;

row.remove();

saveCurrentStep();
```

}

/* =========================================
PHOTOS
========================================= */

function previewImages(event) {

```
const files = event.target.files;

const preview = document.getElementById("imagePreview");

preview.innerHTML = "";

project.images = [];

Array.from(files).forEach(file => {

    const reader = new FileReader();

    reader.onload = function(e) {

        project.images.push(e.target.result);

        const img = document.createElement("img");

        img.src = e.target.result;

        preview.appendChild(img);

        saveProject();

    };

    reader.readAsDataURL(file);

});
```

}

/* =========================================
GÉNÉRER LE SITE
========================================= */

function generateWebsitePreview() {

```
saveCurrentStep();

const container =
    document.getElementById("generatedSite");

const servicesHTML =
    project.services.length > 0

    ? project.services.map(service => `
        <div class="generated-service">

            <span>
                ${escapeHTML(service.name)}
            </span>

            <strong>
                ${service.price
                    ? escapeHTML(service.price)
                    : ""}
            </strong>

        </div>
    `).join("")

    : `
        <p>
            Ajoutez vos prestations pour les afficher ici.
        </p>
    `;


const imagesHTML =
    project.images.length > 0

    ? `
        <div class="generated-images">
            ${project.images.map(image => `
                <img src="${image}" alt="Photo de l'entreprise">
            `).join("")}
        </div>
    `

    : "";


container.innerHTML = `

    <div class="generated-site">

        <div class="generated-hero">

            <small>
                ${escapeHTML(project.activity)}
            </small>

            <h2>
                ${escapeHTML(project.businessName)}
            </h2>

            <p>
                ${escapeHTML(project.city)}
            </p>

        </div>


        <div class="generated-content">

            ${imagesHTML}


            <h3>
                Nos prestations
            </h3>

            <div class="generated-services">

                ${servicesHTML}

            </div>


            <div class="generated-contact">

                <h3>
                    Contact
                </h3>

                ${project.address
                    ? `<p>📍 ${escapeHTML(project.address)}</p>`
                    : ""}

                ${project.phone
                    ? `<p>📞 ${escapeHTML(project.phone)}</p>`
                    : ""}

                ${project.email
                    ? `<p>✉️ ${escapeHTML(project.email)}</p>`
                    : ""}

                ${project.social
                    ? `<p>📱 ${escapeHTML(project.social)}</p>`
                    : ""}

            </div>

        </div>

    </div>

`;
```

}

/* =========================================
PUBLICATION
========================================= */

function publishSite() {

```
alert(
    "🎉 Votre site est prêt !\n\n" +
    "La publication en ligne sera disponible prochainement."
);
```

}

/* =========================================
LOCAL STORAGE
========================================= */

function saveProject() {

```
localStorage.setItem(
    "sitefacile_project",
    JSON.stringify(project)
);
```

}

function loadProject() {

```
const saved =
    localStorage.getItem("sitefacile_project");

if (!saved) {
    return;
}

try {

    const data = JSON.parse(saved);

    project = {
        ...project,
        ...data
    };

    restoreForm();

} catch (error) {

    console.error(
        "Impossible de charger le projet.",
        error
    );

}
```

}

/* =========================================
RESTAURER LE FORMULAIRE
========================================= */

function restoreForm() {

```
const fields = {
    businessName: project.businessName,
    city: project.city,
    address: project.address,
    phone: project.phone,
    email: project.email,
    social: project.social
};

Object.entries(fields).forEach(([id, value]) => {

    const element = document.getElementById(id);

    if (element && value) {
        element.value = value;
    }

});


if (project.activity) {

    const buttons =
        document.querySelectorAll(".activity-grid button");

    buttons.forEach(button => {

        if (button.textContent.includes(project.activity)) {
            button.classList.add("selected");
        }

    });

}


if (project.style) {

    const buttons =
        document.querySelectorAll(".style-grid button");

    buttons.forEach(button => {

        if (button.textContent.includes(project.style)) {
            button.classList.add("selected");
        }

    });

}


if (project.services.length > 0) {

    const list =
        document.getElementById("servicesList");

    list.innerHTML = "";

    project.services.forEach(service => {

        addService(
            service.name,
            service.price
        );

    });

}


if (project.images.length > 0) {

    const preview =
        document.getElementById("imagePreview");

    preview.innerHTML = "";

    project.images.forEach(image => {

        const img =
            document.createElement("img");

        img.src = image;

        preview.appendChild(img);

    });

}
```

}

/* =========================================
SÉCURITÉ HTML
========================================= */

function escapeHTML(value) {

```
return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
```

}
