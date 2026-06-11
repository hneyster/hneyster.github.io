/* ==========================
   CAROUSELS
========================== */

document.querySelectorAll('.carousel').forEach(carousel => {

    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dotsContainer = carousel.querySelector('.dots');

    let current = 0;

    slides.forEach((_, index) => {

        const dot = document.createElement('span');
        dot.classList.add('dot');

        if (index === 0)
            dot.classList.add('active');

        dot.addEventListener('click', () => {
            showSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function showSlide(index) {

        if (index >= slides.length)
            index = 0;

        if (index < 0)
            index = slides.length - 1;

        slides.forEach(slide =>
            slide.classList.remove('active')
        );

        dots.forEach(dot =>
            dot.classList.remove('active')
        );

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        current = index;
    }

    prevBtn.addEventListener('click', () => {
        showSlide(current - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(current + 1);
    });
// comment this out to disable auto-advance. 
//   setInterval(() => {
//        showSlide(current + 1);
//    }, 5000);
});

/* ==========================
   LIGHTBOX
========================== */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');

const closeBtn = document.querySelector('.close');
const prevLightboxBtn = document.querySelector('.prev-lightbox');
const nextLightboxBtn = document.querySelector('.next-lightbox');

const galleryImages = [
    ...document.querySelectorAll('.slide img')
];

let currentImageIndex = 0;

function openLightbox(index) {

    currentImageIndex = index;

    const img = galleryImages[index];

    const caption =
        img.parentElement.querySelector('.caption')
        ?.textContent || '';

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;

    lightboxCounter.textContent =
        `${index + 1} / ${galleryImages.length}`;

    lightbox.classList.add('show');
}

function showLightboxImage(index) {

    if (index < 0)
        index = galleryImages.length - 1;

    if (index >= galleryImages.length)
        index = 0;

    openLightbox(index);
}

galleryImages.forEach((img, index) => {

    img.addEventListener('click', () => {
        openLightbox(index);
    });

});

prevLightboxBtn.addEventListener('click', () => {
    showLightboxImage(currentImageIndex - 1);
});

nextLightboxBtn.addEventListener('click', () => {
    showLightboxImage(currentImageIndex + 1);
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

lightbox.addEventListener('click', (e) => {

    if (e.target === lightbox) {
        lightbox.classList.remove('show');
    }

});

document.addEventListener('keydown', (e) => {

    if (!lightbox.classList.contains('show'))
        return;

    if (e.key === 'ArrowLeft')
        showLightboxImage(currentImageIndex - 1);

    if (e.key === 'ArrowRight')
        showLightboxImage(currentImageIndex + 1);

    if (e.key === 'Escape')
        lightbox.classList.remove('show');
});

/* ==========================
   TOUCH SWIPE SUPPORT
========================== */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {

    touchEndX = e.changedTouches[0].screenX;

    const distance = touchStartX - touchEndX;

    if (distance > 50)
        showLightboxImage(currentImageIndex + 1);

    if (distance < -50)
        showLightboxImage(currentImageIndex - 1);
});
                   
window.addEventListener('DOMContentLoaded', () => {

    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        document.body.appendChild(lightbox);
    }

});
