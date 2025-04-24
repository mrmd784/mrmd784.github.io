fetch('data.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(carData => {
    const container = document.getElementById('car-data');
    container.innerHTML = ''; // clear loading message

    for (const brand in carData) {
      const brandDetails = document.createElement('details');
      const brandSummary = document.createElement('summary');
      brandSummary.textContent = brand;
      brandDetails.appendChild(brandSummary);

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
        brandDetails.appendChild(modelDetails);
      }

      container.appendChild(brandDetails);
    }
  })
  .catch(error => {
    document.getElementById('car-data').textContent = 'Failed to load data.';
    console.error('Error loading JSON:', error);
  });

