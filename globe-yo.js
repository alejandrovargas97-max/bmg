// Mostrar yo.jpg después de que termine la animación del globo
setTimeout(function() {
  const globeContainer = document.querySelector('.globe-rotating');
  if (globeContainer) {
    const img = document.createElement('img');
    img.src = 'yo.jpg';
    img.style.cssText = 'width: 120px; height: 120px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.3); position: absolute; margin-left: 10px;';
    globeContainer.appendChild(img);
  }
}, 5000);
