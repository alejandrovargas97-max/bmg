// Reemplazar globo por yo.jpg después de 5 segundos
setTimeout(function() {
  const globeContainer = document.querySelector('.globe-rotating');
  if (globeContainer) {
    globeContainer.innerHTML = '<img src="yo.jpg" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.3);" />';
  }
}, 5000);
