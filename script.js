let carData = {};

fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    carData = data;

    // Enable clicks on brand icons
    document.querySelectorAll('#brand-icons img').forEach(img => {
      img.addEventListener('click', () => {
        const brand = img.dataset.brand;
        showBrandData(brand);
      });
    });
  })
  .catch(error => {
    document.getElementById('car-data').textContent = 'Failed to load data.';
    console.error('Error loading JSON:', error);
  });

function showBrandData(brand) {
  const container = document.getElementById('car-data');
  container.innerHTML = `<h2>${brand}</h2>`;

  if (!carData[brand]) {
    container.innerHTML += `<p>No data found for ${brand}.</p>`;
    return;
  }

  for (const model in carData[brand]) {
    const modelDetails = document.createElement('details');
    const modelSummary = document.createElement('summary');
    modelSummary.textContent = model;
    modelDetails.appendChild(modelSummary);

    const list = document.createElement('ul');
    carData[brand][model].forEach(code => {
      const item = document.createElement('li');
      item.textContent = code;
      list.appendChild(item);
    });

    modelDetails.appendChild(list);
    container.appendChild(modelDetails);
  }
}
