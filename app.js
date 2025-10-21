app.js
// Dados de produtos (exemplo). Substitua por imagens reais ou carregue via fetch.
const PRODUCTS = [
  { id: "p1", title: "Creme Hidratante Facial 50ml", price: 49.90, short: "Hidratação intensa", img: "" },
  { id: "p2", title: "Base Líquida Alta Cobertura 30ml", price: 79.90, short: "Longa duração", img: "" },
  { id: "p3", title: "Bálsamo Labial Natural", price: 19.90, short: "Proteção e brilho", img: "" },
  { id: "p4", title: "Sérum Vitamina C 30ml", price: 129.90, short: "Ilumina e uniformiza", img: "" }
];

let cart = JSON.parse(localStorage.getItem('cart_v1')) || {};
const productsEl = document.getElementById('products');
const cartCountEl = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('search');

function formatBRL(v){ return v.toFixed(2).replace('.',','); }
function saveCart(){ localStorage.setItem('cart_v1', JSON.stringify(cart)); renderCartCount(); }
function renderCartCount(){
  const total = Object.values(cart).reduce((s,i)=>s+i.qty,0);
  cartCountEl.textContent = total;
}

function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(()=>toast.classList.add('hidden'),2500);
}

// Render produtos
function renderProducts(list = PRODUCTS){
  productsEl.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <div class="product-image">${p.img ? `<img src="${p.img}" alt="${p.title}" style="max-width:100%;height:100%;object-fit:cover;border-radius:8px">` : 'Imagem'}</div>
      <h4>${p.title}</h4>
      <div class="muted">${p.short || ''}</div>
      <div class="price">R$ ${formatBRL(p.price)}</div>
      <button class="btn add" data-id="${p.id}">Adicionar</button>
    `;
    productsEl.appendChild(card);
  });
  document.querySelectorAll('.add').forEach(b => {
    b.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      addToCart(id);
    });
  });
}

// Cart functions
function addToCart(id, qty = 1){
  const prod = PRODUCTS.find(p=>p.id===id);
  if(!prod) return;
  if(cart[id]) cart[id].qty += qty;
  else cart[id] = { ...prod, qty };
  saveCart();
  showToast('Produto adicionado ao carrinho');
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  const items = Object.values(cart);
  if(items.length===0){ cartItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>'; cartTotalEl.textContent='0.00'; return; }
  let total = 0;
  items.forEach(it=>{
    total += it.price * it.qty;
    const div = document.createElement('div');
    div.className='cart-item';
    div.innerHTML = `
      <div style="flex:1">
        <strong>${it.title}</strong>
        <div>R$ ${formatBRL(it.price)}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end">
        <input class="qty" type="number" min="1" value="${it.qty}" data-id="${it.id}" />
        <button class="btn secondary remove" data-id="${it.id}">Remover</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = formatBRL(total);

  // events
  document.querySelectorAll('.qty').forEach(i=>{
    i.addEventListener('change', e=>{
      const id = e.target.dataset.id;
      const v = parseInt(e.target.value) || 1;
      cart[id].qty = v;
      saveCart();
      renderCart();
    });
  });
  document.querySelectorAll('.remove').forEach(b=>{
    b.addEventListener('click', e=>{
      const id = e.currentTarget.dataset.id;
      delete cart[id];
      saveCart();
      renderCart();
      showToast('Produto removido');
    });
  });
}

// UI events
cartBtn.addEventListener('click', ()=>{ renderCart(); cartModal.classList.remove('hidden'); });
closeCartBtn.addEventListener('click', ()=>cartModal.classList.add('hidden'));
checkoutBtn.addEventListener('click', ()=>{ cartModal.classList.add('hidden'); checkoutModal.classList.remove('hidden'); });
closeCheckout.addEventListener('click', ()=>checkoutModal.classList.add('hidden'));

checkoutForm.addEventListener('submit', e=>{
  e.preventDefault();
  // Aqui você integraria com um backend ou gateway de pagamento.
  // No SPA simulamos o pedido:
  const data = Object.fromEntries(new FormData(checkoutForm).entries());
  const pedido = { customer: data, items: Object.values(cart), total: Object.values(cart).reduce((s,i)=>s+i.price*i.qty,0), date: new Date().toISOString() };
  console.log('PEDIDO (simulado):', pedido);
  // Limpar carrinho
  cart = {};
  saveCart();
  checkoutModal.classList.add('hidden');
  showToast('Pedido confirmado! (simulação)');
});

searchInput.addEventListener('input', e=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q) return renderProducts();
  renderProducts(PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || (p.short||'').toLowerCase().includes(q)));
});

// inicialização
renderProducts();
renderCartCount();