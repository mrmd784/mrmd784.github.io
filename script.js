// Redirect to models.html with selected brand
document.querySelectorAll('#brand-icons img').forEach(img => {
  img.addEventListener('click', () => {
    const brand = img.dataset.brand;
    window.location.href = `models.html?brand=${encodeURIComponent(brand)}`;
  });
});

// Load data.json
async function fetchData() {
  const response = await fetch('data.json');
  return response.json();
}

// For models.html
async function showModelsAndData() {
  const params = new URLSearchParams(window.location.search);
  const brand = params.get('brand');
  if (!brand) return;

  document.getElementById('brand-title').textContent = `Models for ${brand}`;
  const data = await fetchData();
  const models = data[brand];
  const modelButtonsDiv = document.getElementById('model-buttons');
  const modelDataDiv = document.getElementById('model-data');

  if (!models) {
    modelButtonsDiv.innerHTML = `<p>No models found for ${brand}.</p>`;
    return;
  }

  Object.keys(models).forEach(model => {
    const button = document.createElement('button');
    button.textContent = model;
    button.addEventListener('click', () => {
      const values = models[model];
      modelDataDiv.innerHTML = `
        <h2>${model}</h2>
        <ul>${values.map(v => `<li>${v}</li>`).join('')}</ul>
      `;
    });
    modelButtonsDiv.appendChild(button);
  });
}

if (window.location.pathname.includes('models.html')) {
  showModelsAndData();
}

// Handle Back Button
const backButton = document.getElementById('back-button');
if (backButton) {
  backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
