
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

function previewImages(event) {

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

    imageFiles.forEach((file, index) => {

        compressImage(file)
            .then(imageData => {

                project.images[index] = imageData;

                const wrapper =
                    document.createElement("div");

                wrapper.className =
                    "image-preview-item";

                const img =
                    document.createElement("img");

                img.src = imageData;

                img.alt =
                    "Photo de l'entreprise";

                wrapper.appendChild(img);

                preview.appendChild(wrapper);

                if (
                    project.images.filter(Boolean).length ===
                    imageFiles.length
                ) {
                    saveProject();
                }

            })
            .catch(error => {

                console.error(
                    "Erreur lors du traitement de la photo :",
                    error
                );

            });

    });
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

                const ratio = Math.min(
                    maxWidth / width,
                    maxHeight / height,
                    1
                );

                width = Math.round(width * ratio);
                height = Math.round(height * ratio);

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
GÉNÉRER LE SITE
========================================= */

function generateWebsitePreview() {

    saveCurrentStep();

    const container =
        document.getElementById("generatedSite");

    if (!container) {
        console.error(
            "L'élément #generatedSite est introuvable."
        );
        return;
    }

    const style =
        String(project.style || "Moderne")
            .toLowerCase()
            .trim();

    let theme = {
        background: "#f5f5f5",
        surface: "#ffffff",
        text: "#151515",
        muted: "#777777",
        primary: "#111111",
        hero: "linear-gradient(135deg, #111111, #303030)"
    };


    if (style === "élégant") {

        theme = {
            background: "#f5f1eb",
            surface: "#fffdf9",
            text: "#2a2520",
            muted: "#766e65",
            primary: "#6d5140",
            hero: "linear-gradient(135deg, #2c211b, #735641)"
        };

    }


    else if (style === "minimaliste") {

        theme = {
            background: "#ffffff",
            surface: "#ffffff",
            text: "#222222",
            muted: "#888888",
            primary: "#222222",
            hero: "linear-gradient(135deg, #eeeeee, #dcdcdc)"
        };

    }


    else if (style === "coloré") {

        theme = {
            background: "#f5f3ff",
            surface: "#ffffff",
            text: "#222222",
            muted: "#68627a",
            primary: "#6c4cff",
            hero: "linear-gradient(135deg, #6c4cff, #d84cff)"
        };

    }


    /* SERVICES */

    const servicesHTML =
        project.services.length > 0

            ? project.services
                .map(service => `
                    <div
                        class="generated-service"
                        style="
                            background:${theme.surface};
                            border-color:#e8e8e8;
                        "
                    >

                        <span>
                            ${escapeHTML(
                                service.name || ""
                            )}
                        </span>

                        ${
                            service.price
                                ? `
                                    <strong>
                                        ${escapeHTML(
                                            service.price
                                        )} €
                                    </strong>
                                `
                                : ""
                        }

                    </div>
                `)
                .join("")

            : `
                <p style="color:${theme.muted};">
                    Ajoutez vos prestations
                    pour les afficher ici.
                </p>
            `;


    /* PHOTOS */

    const imagesHTML =
        project.images.length > 0

            ? `
                <section class="generated-gallery-section">

                    <span
                        class="generated-label"
                        style="
                            color:${theme.muted};
                        "
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
                                        alt="Photo de ${escapeHTML(
                                            project.businessName ||
                                            "l'entreprise"
                                        )}"
                                    >

                                </div>
                            `)
                            .join("")}

                    </div>

                </section>
            `

            : "";


    /* CONTACT */

    const contactItems = [];

    if (project.address) {
        contactItems.push(
            `<p>📍 ${escapeHTML(project.address)}</p>`
        );
    }

    if (project.phone) {
        contactItems.push(
            `<p>📞 ${escapeHTML(project.phone)}</p>`
        );
    }

    if (project.email) {
        contactItems.push(
            `<p>✉️ ${escapeHTML(project.email)}</p>`
        );
    }

    if (project.social) {
        contactItems.push(
            `<p>📱 ${escapeHTML(project.social)}</p>`
        );
    }


    container.innerHTML = `

        <div
            class="generated-site"
            style="
                background:${theme.background};
                color:${theme.text};
            "
        >

            <!-- HERO -->

            <header
                class="generated-hero"
                style="
                    background:${theme.hero};
                "
            >

                <span class="generated-activity">
                    ${escapeHTML(
                        project.activity ||
                        "Entreprise"
                    )}
                </span>

                <h2>
                    ${escapeHTML(
                        project.businessName ||
                        "Votre entreprise"
                    )}
                </h2>

                ${
                    project.city
                        ? `
                            <p>
                                📍
                                ${escapeHTML(
                                    project.city
                                )}
                            </p>
                        `
                        : ""
                }

            </header>


            <!-- CONTENU -->

            <main class="generated-content">

                ${imagesHTML}


                <!-- SERVICES -->

                <section>

                    <span
                        class="generated-label"
                        style="
                            color:${theme.muted};
                        "
                    >
                        NOS SERVICES
                    </span>

                    <h3>
                        Des prestations
                        adaptées à vos besoins
                    </h3>

                    <div class="generated-services">
                        ${servicesHTML}
                    </div>

                </section>


                <!-- CONTACT -->

                ${
                    contactItems.length > 0
                        ? `
                            <section
                                class="generated-contact"
                                style="
                                    background:${theme.primary};
                                "
                            >

                                <h3>
                                    Contact
                                </h3>

                                ${contactItems.join("")}

                            </section>
                        `
                        : ""
                }

            </main>

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
