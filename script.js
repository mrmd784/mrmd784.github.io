async function showPlates(brand) {
  const res = await fetch('data.json');
  const data = await res.json();

  const brandData = data[brand];
  if (!brandData) return;

  const resultDiv = document.getElementById('result');
  const brandTitle = document.getElementById('brand-title');
  const plateList = document.getElementById('plate-list');

  brandTitle.textContent = `${brand} Models`;
  plateList.innerHTML = '';  // Clear existing plates

  // If the brand data is an array (Toyota, BMW, etc.)
  if (Array.isArray(brandData)) {
    plateList.innerHTML = brandData.map(p => `<li>${p}</li>`).join('');
  } else {
    // Handle models as objects (Honda, etc.)
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
      modelHeader.addEventListener('click', function() {
        const platesList = modelSection.querySelector('.plates-list');
        platesList.classList.toggle('hidden');
      });

      // Create the plate list for the model
      const platesList = document.createElement('ul');
      platesList.classList.add('plates-list', 'hidden'); // Start as hidden
      platesList.innerHTML = modelPlates.map(p => `<li>${p}</li>`).join('');

      // Append the header and list to the section
      modelSection.appendChild(modelHeader);
      modelSection.appendChild(platesList);

      // Append the model section to the plate list container
      plateList.appendChild(modelSection);
    }
  }

  // Make the result section visible after loading the data
  resultDiv.classList.remove('hidden');
}
