document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  let products = [];

  function updateCartCount() {
    const count = cart.reduce(
      (sum, item) => parseInt(item.quantity || 0) + sum,
      0
    );
    document
      .querySelectorAll("#cart-count")
      .forEach((el) => (el.textContent = count));
  }

  function saveState() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function addToCart(product, quantity = 1) {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) existing.quantity += quantity;
    else cart.push({ id: product.id, quantity });
    saveState();
    updateCartCount();
    showToast("Item added to cart!");
  }

  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) wishlist.push(productId);
    else wishlist.splice(index, 1);
    saveState();
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function createProductCard(product) {
    const card = document.createElement("div");
    card.className =
      "product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300";
    const isInWishlist = wishlist.includes(product.id);

    card.innerHTML = `
      <div class="h-48 bg-white flex items-center justify-center overflow-hidden">
        <img src="${product.image}" alt="${
      product.title
    }" class="object-contain h-full w-full" />
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <h3 class="font-semibold mb-2">${product.title}</h3>
          <button class="wishlist-btn" data-id="${product.id}">
            <i class="fas fa-heart ${
              isInWishlist ? "text-red-500" : "text-gray-400"
            }"></i>
          </button>
        </div>
        <p class="text-indigo-600 font-bold mb-2">$${product.price.toFixed(
          2
        )}</p>
        <button class="add-to-cart-btn w-full bg-indigo-600 text-white py-1 rounded-md hover:bg-indigo-700 transition" data-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
    `;

    card.querySelector(".add-to-cart-btn").onclick = () => addToCart(product);
    card.querySelector(".wishlist-btn").onclick = () => {
      toggleWishlist(product.id);
      card.querySelector("i").classList.toggle("text-gray-400");
      card.querySelector("i").classList.toggle("text-red-500");
    };

    return card;
  }

  function applyFiltersAndRender() {
    const selectedCategories = Array.from(
      document.querySelectorAll(".category-filter:checked")
    ).map((cb) => cb.value);
    const maxPrice =
      parseInt(document.getElementById("price-range").value) || 1000;
    const sort = document.getElementById("sort")?.value;

    let filtered = products.filter((p) => {
      const matchCategory =
        selectedCategories.includes("all") ||
        selectedCategories.includes(p.category);
      const matchPrice = p.price <= maxPrice;
      return matchCategory && matchPrice;
    });

    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);

    const grid = document.getElementById("products-grid");
    if (grid) {
      grid.innerHTML = "";
      filtered.forEach((p) => grid.appendChild(createProductCard(p)));
    }
  }

  const allCheckbox = document.getElementById("all");
  if (allCheckbox) {
    allCheckbox.addEventListener("change", () => {
      document
        .querySelectorAll(".category-filter:not(#all)")
        .forEach((cb) => (cb.checked = false));
    });

    document.querySelectorAll(".category-filter:not(#all)").forEach((cb) => {
      cb.addEventListener("change", () => {
        if (cb.checked) allCheckbox.checked = false;
      });
    });
  }

  document
    .getElementById("apply-filters")
    ?.addEventListener("click", applyFiltersAndRender);
  document
    .getElementById("sort")
    ?.addEventListener("change", applyFiltersAndRender);
  document
    .getElementById("price-range")
    ?.addEventListener("input", function () {
      document.getElementById("price-value").textContent = `$${this.value}`;
    });

  fetch("php/products.php")
    .then((res) => res.json())
    .then((data) => {
      products = data;
      localStorage.setItem("products", JSON.stringify(products));

      if (document.getElementById("featured-products"))
        renderProducts("featured-products", (p) => p.featured);

      if (document.getElementById("products-grid")) applyFiltersAndRender();

      if (window.location.pathname.includes("cart.html")) displayCart();
      if (window.location.pathname.includes("checkout.html"))
        updateOrderSummary("checkout");
    });

  function renderProducts(containerId, filterFn = () => true) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    products
      .filter(filterFn)
      .forEach((p) => container.appendChild(createProductCard(p)));
  }

  /// 🛒 CART VIEW WITH REMOVE BUTTON
  function displayCart() {
    const container = document.getElementById("cart-items");
    const empty = document.getElementById("empty-cart-message");
    if (!container) return;
    container.innerHTML = "";

    if (cart.length === 0 || !products.length) {
      container.classList.add("hidden");
      empty?.classList.remove("hidden");
      updateOrderSummary("cart");
      return;
    }

    container.classList.remove("hidden");
    empty?.classList.add("hidden");

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;

      const div = document.createElement("div");
      div.className = "flex justify-between items-center border-b py-4";

      div.innerHTML = `
        <div class="flex items-center">
          <img src="${product.image}" alt="${
        product.title
      }" class="w-16 h-16 object-cover rounded mr-4" />
          <div>
            <h4 class="font-semibold">${product.title}</h4>
            <p class="text-indigo-600">${formatCurrency(product.price)}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-semibold">Qty: ${item.quantity}</p>
          <p>Total: ${formatCurrency(product.price * item.quantity)}</p>
          <button class="remove-btn text-red-500 mt-2 text-sm" data-id="${
            item.id
          }">
            Remove
          </button>
        </div>
      `;

      // ✅ Handle remove
      div.querySelector(".remove-btn").addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        cart = cart.filter((p) => p.id !== id);
        saveState();
        updateCartCount();
        displayCart();
      });

      container.appendChild(div);
    });

    updateOrderSummary("cart");
  }

  function updateOrderSummary(page) {
    const subtotal = cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    document.getElementById(`${page}-subtotal`).textContent =
      formatCurrency(subtotal);
    document.getElementById(`${page}-shipping`).textContent =
      shipping === 0 ? "Free" : formatCurrency(shipping);
    document.getElementById(`${page}-tax`).textContent = formatCurrency(tax);
    document.getElementById(`${page}-total`).textContent =
      formatCurrency(total);
  }

  function formatCurrency(n) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  /// ✅ CHECKOUT FORM
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const payload = {
        email: document.getElementById("email").value,
        items: cart,
        shipping: {
          name:
            document.getElementById("first-name").value +
            " " +
            document.getElementById("last-name").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
        },
      };

      fetch("php/checkout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            localStorage.removeItem("cart");
            window.location.href = `confirmation.html?order=${response.orderNumber}&email=${response.email}`;
          } else {
            alert("Checkout failed: " + response.message);
          }
        })
        .catch((err) => {
          console.error("Checkout error:", err);
          alert("An error occurred during checkout.");
        });
    });
  }

  if (window.location.pathname.includes("confirmation.html")) {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("order-number").textContent =
      params.get("order") || "-";
    document.getElementById("confirmation-email").textContent =
      params.get("email") || "-";
  }

  updateCartCount();
});
