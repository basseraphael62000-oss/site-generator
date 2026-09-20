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

let currentStep = 1;


/* =========================
   START BUILDER
========================= */

function startBuilder() {

    const builder = document.getElementById("builder");

    if (!builder) {
        console.error("Élément #builder introuvable.");
        return;
    }

    builder.classList.remove("hidden");

    setTimeout(() => {
        builder.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 50);
}


/* =========================
   ACTIVITY
========================= */

function selectActivity(button, activity) {

    document
        .querySelectorAll(".activity-grid button")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    project.activity = activity;

    const customBox = document.getElementById("customActivityBox");

    if (activity === "Autre") {
        customBox.classList.remove("hidden");
    } else {
        customBox.classList.add("hidden");
    }

    saveProject();
}


/* =========================
   STYLE
========================= */

function selectStyle(button, style) {

    document
        .querySelectorAll(".style-grid button")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    project.style = style;

    saveProject();
}


/* =========================
   SERVICES
========================= */

function addService(name = "", price = "") {

    const list = document.getElementById("servicesList");

    if (!list) {
        return;
    }

    const row = document.createElement("div");

    row.className = "service-row";

    row.innerHTML = `
        <input
            type="text"
            class="service-name"
            placeholder="Ex : Coupe homme"
            value="${escapeHTML(name)}"
        >

        <input
            type="text"
            class="service-price"
            placeholder="Ex : 25 €"
            value="${escapeHTML(price)}"
        >

        <button
            type="button"
            onclick="removeService(this)"
            aria-label="Supprimer"
        >
            ✕
        </button>
    `;

    list.appendChild(row);
}


function removeService(button) {

    const row = button.closest(".service-row");

    if (row) {
        row.remove();
    }

    saveCurrentStep();
}


/* =========================
   PHOTOS
========================= */

async function previewImages(event) {

    const files = Array.from(event.target.files || []);

    const preview = document.getElementById("imagePreview");

    if (!preview) {
        return;
    }

    preview.innerHTML = "";

    project.images = [];

    for (const file of files) {

        if (!file.type.startsWith("image/")) {
            continue;
        }

        try {

            const compressed = await compressImage(file);

            project.images.push(compressed);

            const item = document.createElement("div");

            item.className = "image-preview-item";

            const img = document.createElement("img");

            img.src = compressed;

            img.alt = "Photo";

            item.appendChild(img);

            preview.appendChild(item);

        } catch (error) {

            console.error(
                "Erreur lors du traitement de l'image :",
                error
            );

        }
    }

    saveProject();
}


function compressImage(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function(event) {

            const img = new Image();

            img.onload = function() {

                const maxSize = 1200;

                let width = img.width;
                let height = img.height;

                if (width > maxSize || height > maxSize) {

                    if (width > height) {

                        height =
                            Math.round(
                                height * maxSize / width
                            );

                        width = maxSize;

                    } else {

                        width =
                            Math.round(
                                width * maxSize / height
                            );

                        height = maxSize;
                    }
                }

                const canvas =
                    document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                resolve(
                    canvas.toDataURL(
                        "image/jpeg",
                        0.75
                    )
                );
            };

            img.onerror = reject;

            img.src = event.target.result;
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}


/* =========================
   NAVIGATION
========================= */

function nextStep() {

    if (!validateStep(currentStep)) {
        return;
    }

    saveCurrentStep();

    if (currentStep < 6) {
        currentStep++;
        showStep(currentStep);
    }
}


function previousStep() {

    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}


function showStep(step) {

    document
        .querySelectorAll(".builder-step")
        .forEach(section => {
            section.classList.remove("active");
        });

    const target =
        document.getElementById("step" + step);

    if (!target) {
        return;
    }

    target.classList.add("active");

    currentStep = step;

    const progressBar =
        document.getElementById("progressBar");

    const progressText =
        document.getElementById("progressText");

    const percentage =
        (step / 6) * 100;

    if (progressBar) {
        progressBar.style.width =
            percentage + "%";
    }

    if (progressText) {
        progressText.textContent =
            "Étape " + step + " sur 6";
    }

    if (step === 3) {

        const list =
            document.getElementById("servicesList");

        if (
            list &&
            list.children.length === 0
        ) {
            addService();
        }
    }

    if (step === 6) {
        generateWebsitePreview();
    }

    window.scrollTo({
        top:
            document
                .getElementById("builder")
                .offsetTop - 90,
        behavior: "smooth"
    });
}


/* =========================
   VALIDATION
========================= */

function validateStep(step) {

    if (step === 1) {

        if (!project.activity) {

            alert(
                "Veuillez choisir votre activité."
            );

            return false;
        }

        if (
            project.activity === "Autre"
        ) {

            const custom =
                document
                    .getElementById("customActivity");

            if (
                !custom ||
                !custom.value.trim()
            ) {

                alert(
                    "Veuillez préciser votre activité."
                );

                return false;
            }

            project.activity =
                custom.value.trim();
        }
    }


    if (step === 2) {

        const businessName =
            document
                .getElementById("businessName");

        const city =
            document
                .getElementById("city");

        if (
            !businessName ||
            !businessName.value.trim()
        ) {

            alert(
                "Veuillez indiquer le nom de votre entreprise."
            );

            return false;
        }

        if (
            !city ||
            !city.value.trim()
        ) {

            alert(
                "Veuillez indiquer votre ville."
            );

            return false;
        }
    }


    if (step === 4) {

        if (!project.style) {

            alert(
                "Veuillez choisir un style."
            );

            return false;
        }
    }


    return true;
}


/* =========================
   SAVE FORM
========================= */

function saveCurrentStep() {

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

    const customActivity =
        document.getElementById("customActivity");


    if (businessName) {
        project.businessName =
            businessName.value.trim();
    }

    if (city) {
        project.city =
            city.value.trim();
    }

    if (address) {
        project.address =
            address.value.trim();
    }

    if (phone) {
        project.phone =
            phone.value.trim();
    }

    if (email) {
        project.email =
            email.value.trim();
    }

    if (social) {
        project.social =
            social.value.trim();
    }

    if (
        project.activity === "Autre" &&
        customActivity
    ) {
        project.activity =
            customActivity.value.trim();
    }


    project.services = [];

    document
        .querySelectorAll(".service-row")
        .forEach(row => {

            const name =
                row
                    .querySelector(".service-name")
                    ?.value
                    .trim();

            const price =
                row
                    .querySelector(".service-price")
                    ?.value
                    .trim();

            if (name) {

                project.services.push({
                    name: name,
                    price: price || ""
                });
            }
        });


    saveProject();
}


/* =========================
   LOCAL STORAGE
========================= */

function saveProject() {

    try {

        localStorage.setItem(
            "sitefacile_project",
            JSON.stringify(project)
        );

    } catch (error) {

        console.warn(
            "Impossible de sauvegarder le projet.",
            error
        );
    }
}


function loadProject() {

    try {

        const saved =
            localStorage.getItem(
                "sitefacile_project"
            );

        if (!saved) {
            return;
        }

        const data =
            JSON.parse(saved);

        project = {
            ...project,
            ...data
        };

    } catch (error) {

        console.warn(
            "Impossible de charger le projet.",
            error
        );
    }
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================
   PREVIEW
========================= */

function generateWebsitePreview() {

    saveCurrentStep();

    const container =
        document.getElementById("generatedSite");

    if (!container) {
        return;
    }

    const activity =
        escapeHTML(project.activity || "Entreprise");

    const name =
        escapeHTML(
            project.businessName ||
            "Votre entreprise"
        );

    const city =
        escapeHTML(project.city || "");

    const address =
        escapeHTML(project.address || "");

    const phone =
        escapeHTML(project.phone || "");

    const email =
        escapeHTML(project.email || "");

    const social =
        escapeHTML(project.social || "");


    let theme = {
        background: "#111111",
        accent: "#111111",
        text: "#171717",
        light: "#f5f5f5"
    };


    if (project.style === "Élégant") {

        theme = {
            background: "#594538",
            accent: "#594538",
            text: "#2c241f",
            light: "#f5f0ec"
        };

    } else if (project.style === "Minimaliste") {

        theme = {
            background: "#e9e9e9",
            accent: "#222222",
            text: "#222222",
            light: "#fafafa"
        };

    } else if (project.style === "Coloré") {

        theme = {
            background: "#6b4eff",
            accent: "#6b4eff",
            text: "#222222",
            light: "#f5f2ff"
        };
    }


    let servicesHTML = "";

    if (project.services.length > 0) {

        servicesHTML =
            project.services
                .map(service => {

                    return `
                        <div
                            class="generated-service"
                            style="
                                border-color:${theme.light};
                                background:#fff;
                            "
                        >
                            <span>
                                ${escapeHTML(service.name)}
                            </span>

                            <strong>
                                ${escapeHTML(service.price)}
                            </strong>
                        </div>
                    `;
                })
                .join("");

    } else {

        servicesHTML = `
            <div
                class="generated-service"
                style="
                    border-color:${theme.light};
                    background:#fff;
                "
            >
                <span>
                    Vos services apparaîtront ici
                </span>
            </div>
        `;
    }


    let imagesHTML = "";

    if (
        Array.isArray(project.images) &&
        project.images.length > 0
    ) {

        imagesHTML = `
            <section>

                <span
                    class="generated-label"
                    style="color:${theme.accent};"
                >
                    GALERIE
                </span>

                <h3>
                    Découvrez notre univers
                </h3>

                <div class="generated-images">

                    ${project.images
                        .map(image => `
                            <div
                                class="generated-image-item"
                            >
                                <img
                                    src="${image}"
                                    alt="Photo de ${name}"
                                >
                            </div>
                        `)
                        .join("")}

                </div>

            </section>
        `;
    }


    let contactHTML = "";

    if (
        address ||
        city ||
        phone ||
        email ||
        social
    ) {

        contactHTML = `
            <section
                class="generated-contact"
                style="
                    background:${theme.background};
                "
            >

                <span class="generated-label">
                    CONTACT
                </span>

                <h3>
                    Nous contacter
                </h3>

                ${
                    address || city
                        ? `
                            <p>
                                📍
                                ${address}
                                ${address && city ? ", " : ""}
                                ${city}
                            </p>
                        `
                        : ""
                }

                ${
                    phone
                        ? `
                            <p>
                                📞 ${phone}
                            </p>
                        `
                        : ""
                }

                ${
                    email
                        ? `
                            <p>
                                ✉️ ${email}
                            </p>
                        `
                        : ""
                }

                ${
                    social
                        ? `
                            <p>
                                📱 ${social}
                            </p>
                        `
                        : ""
                }

            </section>
        `;
    }


    container.innerHTML = `

        <div
            class="generated-site"
            style="
                color:${theme.text};
                background:#fff;
            "
        >

            <div
                class="generated-hero"
                style="
                    background:${theme.background};
                "
            >

                <span class="generated-activity">
                    ${activity}
                </span>

                <h2>
                    ${name}
                </h2>

                <p>
                    ${city}
                </p>

            </div>


            <div class="generated-content">

                <section>

                    <span
                        class="generated-label"
                        style="
                            color:${theme.accent};
                        "
                    >
                        NOS SERVICES
                    </span>

                    <h3>
                        Ce que nous proposons
                    </h3>

                    <div class="generated-services">
                        ${servicesHTML}
                    </div>

                </section>


                ${imagesHTML}


                ${contactHTML}

            </div>

        </div>
    `;
}


/* =========================
   PUBLISH
========================= */

async function publishSite() {

    saveCurrentStep();

    const button =
        document.querySelector(
            ".publish-button"
        );

    if (button) {

        button.disabled = true;

        button.textContent =
            "Création en cours...";
    }


    try {

        const response =
            await fetch(
                "https://site-generator.basse-raphael62000.workers.dev/api/create-site",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(project)
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Erreur lors de la création du site."
            );
        }


        console.log(
            "Site créé :",
            data
        );


        if (data.url) {

            const container =
                document.getElementById(
                    "generatedSite"
                );

            if (container) {

                container.insertAdjacentHTML(
                    "beforeend",
                    `
                        <div
                            style="
                                margin-top:25px;
                                padding:22px;
                                border-radius:16px;
                                background:#f3f3f3;
                                text-align:center;
                            "
                        >

                            <strong>
                                🎉 Votre site a été créé !
                            </strong>

                            <p
                                style="
                                    margin:8px 0 16px;
                                    color:#666;
                                "
                            >
                                Votre site est disponible ici :
                            </p>

                            <a
                                href="${escapeHTML(data.url)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                style="
                                    display:inline-block;
                                    padding:12px 18px;
                                    border-radius:10px;
                                    background:#111;
                                    color:white;
                                    text-decoration:none;
                                    font-weight:700;
                                "
                            >
                                Voir mon site →
                            </a>

                        </div>
                    `
                );
            }
        } else {

            alert(
                "Les informations ont bien été envoyées à SiteFacile."
            );
        }


    } catch (error) {

        console.error(
            "Erreur publication :",
            error
        );

        alert(
            "Une erreur est survenue lors de la création du site.\n\n" +
            error.message
        );

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "🚀 Publier mon site";
        }
    }
}


/* =========================
   INITIALISATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProject();

        showStep(1);

        console.log(
            "SiteFacile : script.js chargé correctement."
        );
    }
);
