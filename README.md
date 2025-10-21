# Projeto
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>GlowCosméticos — Loja</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container">
      <h1 class="brand">Glow<span>Cosméticos</span></h1>
      <nav>
        <input id="search" placeholder="Buscar produtos..." />
        <button id="cart-btn">Carrinho (<span id="cart-count">0</span>)</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section id="hero">
      <h2>Beleza que cuida da sua pele</h2>
      <p>Produtos naturais e testados dermatologicamente.</p>
    </section>

    <section id="products" class="grid"></section>

    <section id="cart-modal" class="modal hidden">
      <div class="modal-content">
        <button id="close-cart" class="close">×</button>
        <h3>Seu Carrinho</h3>
        <div id="cart-items"></div>
        <div class="cart-summary">
          <strong>Total: R$ <span id="cart-total">0.00</span></strong>
          <button id="checkout-btn" class="primary">Finalizar Compra</button>
        </div>
      </div>
    </section>

    <section id="checkout-modal" class="modal hidden">
      <div class="modal-content">
        <button id="close-checkout" class="close">×</button>
        <h3>Finalizar Compra (Simulado)</h3>
        <form id="checkout-form">
          <label>Nome completo<input name="name" required /></label>
          <label>CPF/CNPJ<input name="document" required /></label>
          <label>Endereço<input name="address" required /></label>
          <label>Email<input name="email" type="email" required /></label>
          <label>Telefone<input name="phone" required /></label>
          <button type="submit" class="primary">Confirmar Pedido</button>
        </form>
      </div>
    </section>

    <div id="toast" class="toast hidden"></div>
  </main>

  <footer class="site-footer">
    <div class="container">© GlowCosméticos — 2025</div>
  </footer>

  <script src="app.js"></script>
</body>
</html>