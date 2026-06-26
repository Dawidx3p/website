document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");

  if (!modal || !modalImg || !closeBtn) {
    return;
  }

  const lightboxLinks = Array.from(
    document.querySelectorAll(".gallery-item, .art-card, .photo-card")
  ).filter((link) => link.getAttribute("href"));

  if (!lightboxLinks.length) {
    return;
  }

  const galleryItems = lightboxLinks.map((link, index) => {
    const image = link.querySelector("img");

    return {
      index,
      href: link.getAttribute("href"),
      thumb: image?.getAttribute("src") || link.getAttribute("href"),
      alt: image?.alt || link.getAttribute("title") || "Powiększony obraz",
      title: link.getAttribute("title") || image?.alt || `Zdjęcie ${index + 1}`,
      link,
    };
  });

  let currentIndex = 0;
  let lastFocusedElement = null;

  const controls = document.createElement("div");
  controls.className = "lightbox-controls";
  controls.innerHTML = `
    <button class="lightbox-arrow lightbox-arrow--prev" type="button" aria-label="Poprzednie zdjęcie">&#10094;</button>
    <button class="lightbox-arrow lightbox-arrow--next" type="button" aria-label="Następne zdjęcie">&#10095;</button>
    <div class="lightbox-counter" aria-live="polite"></div>
    <div class="lightbox-thumbnails" aria-label="Miniatury galerii"></div>
  `;
  modal.appendChild(controls);

  const prevBtn = controls.querySelector(".lightbox-arrow--prev");
  const nextBtn = controls.querySelector(".lightbox-arrow--next");
  const counter = controls.querySelector(".lightbox-counter");
  const thumbnails = controls.querySelector(".lightbox-thumbnails");

  const thumbnailButtons = galleryItems.map((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lightbox-thumbnail";
    button.setAttribute("aria-label", `Pokaż zdjęcie ${item.index + 1}: ${item.title}`);
    button.innerHTML = `<img src="${item.thumb}" alt="" loading="lazy" />`;

    button.addEventListener("click", () => {
      showImage(item.index);
    });

    thumbnails.appendChild(button);
    return button;
  });

  const scrollActiveThumbnailIntoView = () => {
    const activeThumbnail = thumbnailButtons[currentIndex];

    if (!activeThumbnail) {
      return;
    }

    activeThumbnail.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const showImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];

    modalImg.src = item.href;
    modalImg.alt = item.alt;
    counter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;

    thumbnailButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === currentIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });

    scrollActiveThumbnailIntoView();
  };

  const openLightbox = (index) => {
    lastFocusedElement = document.activeElement;
    showImage(index);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  };

  const closeLightbox = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    window.setTimeout(() => {
      modalImg.removeAttribute("src");
    }, 180);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  const showPreviousImage = () => {
    showImage(currentIndex - 1);
  };

  const showNextImage = () => {
    showImage(currentIndex + 1);
  };

  lightboxLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPreviousImage);
  nextBtn.addEventListener("click", showNextImage);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = modal.classList.contains("is-open");

    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }
  });
});
