async function showPlates(brand) {
  const res = await fetch('data.json');
  const data = await res.json();

  const plates = data[brand] || [];

  document.getElementById('brand-title').textContent = brand + " Plates";
  document.getElementById('plate-list').innerHTML = plates.map(p => `<li>${p}</li>`).join('');
  document.getElementById('result').classList.remove('hidden');
}
