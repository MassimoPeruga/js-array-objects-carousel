'use strict';

// Array di oggetti
const allImages = [
    { url: 'https://picsum.photos/900/500?random=1', titolo: 'Image 1', descrizione: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati quas voluptate, unde iste molestias reiciendis, dignissimos odit velit, perspiciatis optio officiis doloremque. Dicta sint alias minima optio eligendi voluptas quisquam?' },
    { url: 'https://picsum.photos/900/500?random=2', titolo: 'Image 2', descrizione: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat assumenda id, voluptate, facere quidem rem eos laudantium, ipsum quia dolore eligendi? Magnam fugit quos voluptatum nihil sed quo aspernatur temporibus.' },
    { url: 'https://picsum.photos/900/500?random=3', titolo: 'Image 3', descrizione: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus blanditiis commodi quos quisquam nam, obcaecati fugiat dolore voluptas at, voluptate mollitia vitae vero quam eius rem alias velit tempora ex!' },
    { url: 'https://picsum.photos/900/500?random=4', titolo: 'Image 4', descrizione: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error blanditiis possimus harum vero officia. Sequi, fuga dicta cupiditate sed esse laborum molestias sint culpa, doloribus voluptas consequatur facere aspernatur tempora?' },
    { url: 'https://picsum.photos/900/500?random=5', titolo: 'Image 5', descrizione: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, similique tempore! Facere rerum, vitae blanditiis quo ipsum deleniti quidem, ducimus illo adipisci iste minus sapiente nobis qui minima provident doloribus?' },
];

// Variabili globali
const itemsContainer = document.querySelector(".ms_items");
const thumbnailsContainer = document.querySelector(".ms_thumbnails");
const prev = document.querySelector('.ms_prev');
const next = document.querySelector('.ms_next');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const imageInfo = document.getElementById("imageInfo");
let autoplayInterval;
let currentImageIndex = 0;
let autoplayDirection = 1;

// Funzione per creare elementi di immagine
function createImageElement(image, isActive) {
    const item = document.createElement("div");
    item.classList.add("ms_item");

    if (isActive) {
        item.classList.add("ms_active");
    }

    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.titolo;

    // Aggiungi titolo e descrizione solo se sono presenti nell'immagine attiva
    if ((image.titolo || image.descrizione) && isActive) {
        const fragment = document.createDocumentFragment();

        if (image.titolo) {
            const title = document.createElement("h4");
            title.textContent = image.titolo;
            fragment.appendChild(title);
        }

        if (image.descrizione) {
            const description = document.createElement("p");
            description.classList.add('m-0', 'fw-semibold');
            description.textContent = image.descrizione;
            fragment.appendChild(description);
        }

        imageInfo.classList.add('p-3');
        imageInfo.appendChild(fragment);
    }

    item.appendChild(img);
    return item;
}

// Funzione per creare miniature
function createThumbnailElement(image, index, isActive) {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("ms_thumbnail");

    if (isActive) {
        thumbnail.classList.add("ms_active_thumbnail");
    }

    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = image.url;
    thumbnailImg.alt = image.titolo;

    thumbnail.appendChild(thumbnailImg);

    thumbnail.addEventListener('click', () => {
        currentImageIndex = index;
        renderImages();
    });

    return thumbnail;
}

// Funzione per aggiornare l'immagine attiva
function renderImages() {
    const allItems = document.querySelectorAll(".ms_item");
    const allThumbnails = document.querySelectorAll(".ms_thumbnail");

    // Rimuovi le informazioni precedenti
    imageInfo.innerHTML = '';

    allItems.forEach((item, index) => {
        const isActive = index === currentImageIndex;
        item.classList.toggle("ms_active", isActive);

        if (isActive) {
            const activeImage = allImages[currentImageIndex];

            if (activeImage.titolo || activeImage.descrizione) {
                imageInfo.classList.add('p-3');
            }

            if (activeImage.titolo || activeImage.descrizione) {
                const fragment = document.createDocumentFragment();

                if (activeImage.titolo) {
                    const title = document.createElement("h4");
                    title.textContent = activeImage.titolo;
                    fragment.appendChild(title);
                }

                if (activeImage.descrizione) {
                    const description = document.createElement("p");
                    description.classList.add('m-0', 'fw-semibold');
                    description.textContent = activeImage.descrizione;
                    fragment.appendChild(description);
                }

                imageInfo.appendChild(fragment);
            }
        }
    });

    allThumbnails.forEach((thumbnail, index) => {
        const isActive = index === currentImageIndex;
        thumbnail.classList.toggle("ms_active_thumbnail", isActive);
    });
}

// Aggiorna l'immagine attiva e cambia la direzione dell'autoplay
function updateImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = allImages.length - 1;
    } else if (currentImageIndex >= allImages.length) {
        currentImageIndex = 0;
    }

    renderImages();
    autoplayDirection = direction;
}

// Dai il via all'autoplay
function startAutoplay() {
    if (!autoplayInterval) {
        autoplayInterval = setInterval(() => updateImage(autoplayDirection), 3000); // Cambia immagine ogni 3 secondi
    }
}

// Ferma l'autoplay
function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = undefined;
}

// Associa le funzioni agli eventi
prev.addEventListener('click', () => updateImage(-1));
next.addEventListener('click', () => updateImage(1));
startBtn.addEventListener('click', startAutoplay);
stopBtn.addEventListener('click', stopAutoplay);

// Inizializzazione
allImages.forEach((image, index) => {
    const isActive = index === currentImageIndex;
    itemsContainer.appendChild(createImageElement(image, isActive));
    thumbnailsContainer.appendChild(createThumbnailElement(image, index, isActive));
});

// Avvia l'autoplay all'inizio
startAutoplay();