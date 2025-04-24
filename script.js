async function showPlates(brand) {
  const res = await fetch('data.json');
  const data = await res.json();

  const models = data[brand];
  if (!models) return;

  const resultDiv = document.getElementById('result');
  const brandTitle = document.getElementById('brand-title');
  const plateList = document.getElementById('plate-list');

  brandTitle.textContent = `${brand} Models`;
  plateList.innerHTML = '';

  for (const model in models) {
    const modelPlates = models[model];
    
    // Create the collapsible section
    const modelSection = document.createElement('div');
    modelSection.classList.add('model-section');

    // Create the model header (clickable)
    const modelHeader = document.createElement('h3');
    modelHeader.textContent = model;
    modelHeader.style.cursor = 'pointer';
    
    // Add the click event to toggle the model's plates
    modelHeader.onclick = function() {
      const platesList = modelSection.querySelector('.plates-list');
      platesList.classList.toggle('hidden');
    };

    // Create the plate list
    const platesList = document.createElement('ul');
    platesList.classList.add('plates-list');
    platesList.innerHTML = modelPlates.map(p => `<li>${p}</li>`).join('');
    
    modelSection.appendChild(modelHeader);
    modelSection.appendChild(platesList);

    plateList.appendChild(modelSection);
  }

  resultDiv.classList.remove('hidden');
}
