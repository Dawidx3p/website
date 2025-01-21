document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
  
    galleryItems.forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior
        const imageSrc = item.getAttribute('href'); // High-res image link
        modalImg.src = imageSrc;
        modal.style.display = 'block';
      });
    });
  
    // Close the modal when clicking the close button
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Also close the modal if the user clicks anywhere outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });