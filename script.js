const baseURL = 'http://localhost:3000';

async function loadAll() {
  const res = await fetch(`${baseURL}/products`);
  const data = await res.json();
  displayProducts(data);
}

async function filterByCategory() {
  const category = document.getElementById('categoryInput').value;
  const res = await fetch(`${baseURL}/products/category/${category}`);
  const data = await res.json();
  displayProducts(data);
}

async function loadVariants() {
  const res = await fetch(`${baseURL}/products/variants`);
  const data = await res.json();
  displayProducts(data);
}
function displayProducts(products) {
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <div class="product-title">${product.name}</div>
      <div class="product-meta">
        ${product.category ? `Category: ${product.category}<br>` : ''}
        ${product.price ? `Price: ₹${product.price}<br>` : ''}
      </div>
      ${product.variants ? `
        <div class="variant-list">
          <strong>Variants:</strong>
          ${product.variants.map(v => `
            <div class="variant-item">
              Color: ${v.color}, Size: ${v.size}, Stock: ${v.stock}
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
    list.appendChild(card);
  });
}
