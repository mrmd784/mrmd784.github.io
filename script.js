async function showPlates(brand) {
  const res = await fetch('data.json');
  const data = await res.json();

  const brandData = data[brand];
  if (!brandData) return;

  const resultDiv = document.getElementById('result');
  const brandTitle = document.getElementById('brand-title');
  const plateList = document.getElementById('plate-list');

  brandTitle.textContent = `${brand} Models`;
  plateList.innerHTML = '';

  // If the brand is a flat list (like Toyota, BMW), show plates directly
  if (Array.isArray(brandData)) {
    plateList.innerHTML = brandData.map(p => `<li>${p}</li>`).join('');
  } else {
    // Otherwise, handle the case where brandData is an object with models (like Honda)
    for (const model in brandData) {
      const modelPlates = brandData[model];

      // Create the collapsible section for the model
      const modelSection = document.createElement('div');
      modelSection.classList.add('model-section');

      // Create the model header (clickable)
      const modelHeader = document.createElement('h3');
      modelHeader.textContent = model;
      modelHeader.style.cursor = 'pointer';

      // Add the click event to toggle the model's plates
      modelHeader.onclick = function() {
        const platesList = modelSection.querySelector('.plates-list');
        // Toggle visibility of the plates list
        platesList.classList.toggle('hidden');
      };

      // Create the plate list for the model
      const platesList = document.createElement('ul');
      platesList.classList.add('plates-list');
      platesList.innerHTML = modelPlates.map(p => `<li>${p}</li>`).join('');
      
      modelSection.appendChild(modelHeader);
      modelSection.appendChild(platesList);

      plateList.appendChild(modelSection);
    }
  }

  resultDiv.classList.remove('hidden');
}
