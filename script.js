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
    const modelHeader = `<h3>${model}</h3>`;
    const plateItems = modelPlates.map(p => `<li>${p}</li>`).join('');
    plateList.innerHTML += modelHeader + `<ul>${plateItems}</ul>`;
  }

  resultDiv.classList.remove('hidden');
}
