
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
    loadProject();

    if (project.services.length === 0) {
        addService();
    }

    updateProgress();
});

/* =========================================
DÉMARRER LE BUILDER
========================================= */

function startBuilder() {
    const builder = document.getElementById("builder");

    if (!builder) {
        console.error("L'élément #builder est introuvable.");
        return;
    }

    builder.classList.remove("hidden");

    setTimeout(() => {
        builder.scrollIntoView({
            behavior: "smooth"
        });
    }, 50);
}

/* =========================================
SCROLL EXEMPLE
========================================= */

function scrollToExample() {
    const exemple = document.getElementById("exemple");

    if (exemple) {
        exemple.scrollIntoView({
            behavior: "smooth"
        });
    }
}

/* =========================================
ACTIVITÉ
========================================= */

function selectActivity(button, activity) {
    document
        .querySelectorAll(".activity-grid button")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    project.activity = activity;

    const customActivity = document.getElementById("customActivity");

    if (customActivity) {
        customActivity.value = "";
    }

    saveProject();
}

/* =========================================
STYLE
========================================= */

function selectStyle(button, style) {
    document
        .querySelectorAll(".style-grid button")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    project.style = style;

    saveProject();
}

/* =========================================
NAVIGATION ÉTAPES
========================================= */

function nextStep() {
    if (!validateStep(currentStep)) {
        return;
    }

    saveCurrentStep();

    if (currentStep < 6) {
        currentStep++;
    }

    showStep();
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
    }

    showStep();
}

/* =========================================
AFFICHER L'ÉTAPE
========================================= */

function showStep() {
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

    const builder = document.getElementById("builder");

    if (builder) {
        window.scrollTo({
            top: builder.offsetTop - 80,
            behavior: "smooth"
        });
    }
}

/* =========================================
BARRE DE PROGRESSION
========================================= */

function updateProgress() {
    const percentage = (currentStep / 6) * 100;

    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");

    if (fill) {
        fill.style.width = `${percentage}%`;
    }

    if (text) {
        text.textContent = `Étape ${currentStep} / 6`;
    }
}

/* =========================================
VALIDATION
========================================= */

function validateStep(step) {
    if (step === 1) {
        const customElement = document.getElementById("customActivity");

        const custom = customElement
            ? customElement.value.trim()
            : "";

        if (custom !== "") {
            project.activity = custom;
        }

        if (!project.activity) {
            alert("Choisissez votre activité avant de continuer.");
            return false;
        }
    }

    if (step === 2) {
        const businessNameElement =
            document.getElementById("businessName");

        const cityElement =
            document.getElementById("city");

        const businessName = businessNameElement
            ? businessNameElement.value.trim()
            : "";

        const city = cityElement
            ? cityElement.value.trim()
            : "";

        if (!businessName || !city) {
            alert(
                "Veuillez renseigner le nom de votre entreprise et votre ville."
            );

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
}

/* =========================================
SAUVEGARDER L'ÉTAPE ACTUELLE
========================================= */

function saveCurrentStep() {
    if (currentStep === 1) {
        const customElement =
            document.getElementById("customActivity");

        const custom = customElement
            ? customElement.value.trim()
            : "";

        if (custom) {
            project.activity = custom;
        }
    }

    if (currentStep === 2) {
        const businessName =
            document.getElementById("businessName");

        const city =
            document.getElementById("city");

        const address =
            document.getElementById("address");

        const phone =
            document.getElementById("phone");

        const email =
            document.getElementById("email");

        const social =
            document.getElementById("social");

        if (businessName) {
            project.businessName = businessName.value.trim();
        }

        if (city) {
            project.city = city.value.trim();
        }

        if (address) {
            project.address = address.value.trim();
        }

        if (phone) {
            project.phone = phone.value.trim();
        }

        if (email) {
            project.email = email.value.trim();
        }

        if (social) {
            project.social = social.value.trim();
        }
    }

    if (currentStep === 3) {
        project.services = [];

        document
            .querySelectorAll(".service-row")
            .forEach(row => {
                const nameElement =
                    row.querySelector(".service-name");

                const priceElement =
                    row.querySelector(".service-price");

                const name = nameElement
                    ? nameElement.value.trim()
                    : "";

                const price = priceElement
                    ? priceElement.value.trim()
                    : "";

                if (name) {
                    project.services.push({
                        name: name,
                        price: price
                    });
                }
            });
    }

    saveProject();
}

/* =========================================
SERVICES
========================================= */

function addService(name = "", price = "") {
    const list = document.getElementById("servicesList");

    if (!list) {
        console.error("L'élément #servicesList est introuvable.");
        return;
    }

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
}

function removeService(button) {
    const row = button.parentElement;

    if (row) {
        row.remove();
    }

    saveCurrentStep();
}
function compressImage(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function(event) {

            const img = new Image();

            img.onload = function() {

                const maxWidth = 1600;
                const maxHeight = 1600;

                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {

                    const ratio = Math.min(
                        maxWidth / width,
                        maxHeight / height
                    );

                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas =
                    document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx =
                    canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.82
                    );

                resolve(compressedImage);
            };

            img.onerror = reject;

            img.src = event.target.result;
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}
/* =========================================
PHOTOS
========================================= */

async function previewImages(event) {

    const files = Array.from(event.target.files || []);

    const preview =
        document.getElementById("imagePreview");

    if (!preview) {
        return;
    }

    preview.innerHTML = "";
    project.images = [];

    if (files.length === 0) {
        saveProject();
        return;
    }

    const imageFiles = files.filter(file =>
        file.type.startsWith("image/")
    );

    for (const file of imageFiles) {

        try {

            const imageData =
                await compressImage(file);

            project.images.push(imageData);

            const img =
                document.createElement("img");

            img.src = imageData;
            img.alt = "Photo de l'entreprise";

            preview.appendChild(img);

        } catch (error) {

            console.error(
                "Erreur lors du traitement de la photo :",
                error
            );

        }
    }

    saveProject();
}

/* =========================================
GÉNÉRER LE SITE
========================================= */

function generateWebsitePreview() {
    saveCurrentStep();

    const container =
        document.getElementById("generatedSite");

    if (!container) {
        console.error("L'élément #generatedSite est introuvable.");
        return;
    }

    const servicesHTML =
        project.services.length > 0
            ? project.services
                .map(service => `
                    <div class="generated-service">
                        <span>
                            ${escapeHTML(service.name)}
                        </span>

                        <strong>
                            ${
                                service.price
                                    ? escapeHTML(service.price)
                                    : ""
                            }
                        </strong>
                    </div>
                `)
                .join("")
            : `
                <p>
                    Ajoutez vos prestations pour les afficher ici.
                </p>
            `;

    const imagesHTML =
        project.images.length > 0
            ? `
                <div class="generated-images">
                    ${project.images
                        .map(image => `
                            <img
                                src="${image}"
                                alt="Photo de l'entreprise"
                            >
                        `)
                        .join("")}
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

                    ${
                        project.address
                            ? `<p>📍 ${escapeHTML(project.address)}</p>`
                            : ""
                    }

                    ${
                        project.phone
                            ? `<p>📞 ${escapeHTML(project.phone)}</p>`
                            : ""
                    }

                    ${
                        project.email
                            ? `<p>✉️ ${escapeHTML(project.email)}</p>`
                            : ""
                    }

                    ${
                        project.social
                            ? `<p>📱 ${escapeHTML(project.social)}</p>`
                            : ""
                    }

                </div>

            </div>

        </div>
    `;
}

/* =========================================
PUBLICATION
========================================= */

async function publishSite() {
    try {
       const response = await fetch(
    "https://site-generator.basse-raphael62000.workers.dev/api/create-site",
    {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error || "Erreur lors de la publication."
            );
        }

        alert(
    "🎉 Votre site est prêt !\n\n" +
    "Votre site :\n" +
    "https://site-generator.basse-raphael62000.workers.dev" +
    data.url
);

        console.log("Site publié :", data);

    } catch (error) {
        console.error("Erreur de publication :", error);

        alert(
            "❌ Impossible de publier le site pour le moment.\n\n" +
            error.message
        );
    }
}

/* =========================================
LOCAL STORAGE
========================================= */

function saveProject() {
    localStorage.setItem(
        "sitefacile_project",
        JSON.stringify(project)
    );
}

function loadProject() {
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
}

/* =========================================
RESTAURER LE FORMULAIRE
========================================= */

function restoreForm() {
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

        if (list) {
            list.innerHTML = "";

            project.services.forEach(service => {
                addService(
                    service.name,
                    service.price
                );
            });
        }
    }

    if (project.images.length > 0) {
        const preview =
            document.getElementById("imagePreview");

        if (preview) {
            preview.innerHTML = "";

            project.images.forEach(image => {
                const img =
                    document.createElement("img");

                img.src = image;
                img.alt = "Photo de l'entreprise";

                preview.appendChild(img);
            });
        }
    }
}

/* =========================================
SÉCURITÉ HTML
========================================= */

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
