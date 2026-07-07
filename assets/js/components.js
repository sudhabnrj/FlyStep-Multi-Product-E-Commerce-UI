/* ----------------------------------------------------
   FlyStep - Sports Shoes E-Commerce Components Javascript File
   Version: 3.0 (Iteration 3)
   ---------------------------------------------------- */

// Product Data Store (16 premium products)
const PRODUCTS_DATA = {
  // Best Sellers (1-8)
  '1': {
    id: '1',
    name: 'FlyStep Air Max Elite',
    category: 'Running',
    price: 7999,
    oldPrice: 9999,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    description: 'Engineered with our signature responsive cushioning, the FlyStep Air Max Elite delivers maximum comfort and support for long-distance runs. Features a breathable knit upper and eco-friendly lightweight rubber sole.',
    sizes: [7, 8, 9, 10, 11]
  },
  '2': {
    id: '2',
    name: 'FlyStep Apex Trainer',
    category: 'Training & Gym',
    price: 5499,
    oldPrice: 6499,
    discount: '15% OFF',
    rating: 4.9,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',
    description: 'Designed for high-intensity gym sessions and athletic training, the Apex Trainer offers ultimate lateral support and high-grip traction. Perfect for squats, sprints, and CrossFit training.',
    sizes: [6, 7, 8, 9, 10]
  },
  '3': {
    id: '3',
    name: 'FlyStep Trail Blazer',
    category: 'Trail & Outdoor',
    price: 8499,
    oldPrice: 9999,
    discount: '15% OFF',
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    description: 'Conquer the rugged wilderness with the Trail Blazer. Built with waterproof high-grip outsoles, reinforced toe guards, and heavy shock absorption layers to handle the most demanding trails.',
    sizes: [8, 9, 10, 11]
  },
  '4': {
    id: '4',
    name: 'FlyStep Street Walker',
    category: 'Lifestyle',
    price: 3999,
    oldPrice: 4999,
    discount: '20% OFF',
    rating: 4.6,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    description: 'A stylish, ultra-lightweight sneaker crafted for everyday comfort and urban lifestyle. Made with breathable mesh and premium recycled materials for sustainable step-in comfort.',
    sizes: [7, 8, 9, 10, 11]
  },
  '5': {
    id: '5',
    name: 'FlyStep Velocity Pro',
    category: 'Running',
    price: 9499,
    oldPrice: 11499,
    discount: '17% OFF',
    rating: 4.9,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop',
    description: 'Take speed to the next level. Featuring a carbon-fiber speed plate and responsive foam, the Velocity Pro provides explosive energy return for marathon runs and sprint intervals.',
    sizes: [7, 8, 9, 10, 11]
  },
  '6': {
    id: '6',
    name: 'FlyStep Flex Runner',
    category: 'Lifestyle',
    price: 4499,
    oldPrice: 5499,
    discount: '18% OFF',
    rating: 4.6,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop',
    description: 'Featuring an ultra-flexible groove outsole and sock-like slip-on design, the Flex Runner follows the natural motion of your foot for ultimate casual day-long comfort.',
    sizes: [6, 7, 8, 9, 10]
  },
  '7': {
    id: '7',
    name: 'FlyStep Impact Max',
    category: 'Training & Gym',
    price: 6999,
    oldPrice: 7999,
    discount: '12% OFF',
    rating: 4.8,
    reviews: 75,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop',
    description: 'Built for heavy lifters and intense training cycles. The wide flat heel structure and dual-density foam casing offer stellar stability for squats and heavy gym lifting routines.',
    sizes: [8, 9, 10, 11]
  },
  '8': {
    id: '8',
    name: 'FlyStep Carbon Glide',
    category: 'Running',
    price: 11999,
    oldPrice: 13999,
    discount: '14% OFF',
    rating: 5.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
    description: 'Our top-tier race shoe. The bio-foam compound delivers maximum cushion stack heights while preserving weight specs, combined with carbon-glide technology for speed records.',
    sizes: [7, 8, 9, 10, 11]
  },
  // New Arrivals (9-16)
  '9': {
    id: '9',
    name: 'FlyStep Neon Spark',
    category: 'Running',
    price: 8999,
    oldPrice: 10999,
    discount: '18% OFF',
    rating: 4.8,
    reviews: 36,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    description: 'Turn heads with the Neon Spark. Features a lightweight structural knit cage, vibrant aesthetic, and high-response rebound foam to power your daily runs.',
    sizes: [7, 8, 9, 10, 11]
  },
  '10': {
    id: '10',
    name: 'FlyStep Retro Glide',
    category: 'Lifestyle',
    price: 4999,
    oldPrice: 5999,
    discount: '16% OFF',
    rating: 4.7,
    reviews: 48,
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=600&auto=format&fit=crop',
    description: 'A classic retro silhouette reimagined with modern comfort. Lightweight cupsole design with premium suede details and cushioned step-in feel.',
    sizes: [7, 8, 9, 10]
  },
  '11': {
    id: '11',
    name: 'FlyStep Force One',
    category: 'Lifestyle',
    price: 6499,
    oldPrice: 7999,
    discount: '18% OFF',
    rating: 4.9,
    reviews: 53,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop',
    description: 'The ultimate crossover street icon. Offers clean visual style, durable leather overlay accents, and a soft foam core for all-day urban walking comfort.',
    sizes: [8, 9, 10, 11]
  },
  '12': {
    id: '12',
    name: 'FlyStep Terra Climber',
    category: 'Trail & Outdoor',
    price: 9299,
    oldPrice: 10999,
    discount: '15% OFF',
    rating: 4.8,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop',
    description: 'Engineered for off-road excellence. The Terra Climber features waterproof ripstop fabrics, a heavy-lugged rubber sole, and shock-resistant toe bumper.',
    sizes: [7, 8, 9, 10, 11]
  },
  '13': {
    id: '13',
    name: 'FlyStep Flex Trainer Lite',
    category: 'Training & Gym',
    price: 4299,
    oldPrice: 4999,
    discount: '14% OFF',
    rating: 4.6,
    reviews: 41,
    image: 'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=600&auto=format&fit=crop',
    description: 'Lightweight agility for the studio or gym floor. Features minimal drag construction, lateral outriggers for side-to-side stability, and clean breathable mesh.',
    sizes: [6, 7, 8, 9, 10]
  },
  '14': {
    id: '14',
    name: 'FlyStep Cloud Stride',
    category: 'Walking',
    price: 5999,
    oldPrice: 6999,
    discount: '14% OFF',
    rating: 4.7,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
    description: 'Step into clouds. Features high-stack memory foam inserts and a rocking curve outsole designed to assist the natural rolling motion of walking.',
    sizes: [7, 8, 9, 10, 11]
  },
  '15': {
    id: '15',
    name: 'FlyStep Hyper Dunk',
    category: 'Training & Gym',
    price: 8499,
    oldPrice: 9999,
    discount: '15% OFF',
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    description: 'Explosive leap and landing cushioning. Designed for high-impact jumping exercises, court sports, and dynamic athletic training routines.',
    sizes: [8, 9, 10, 11]
  },
  '16': {
    id: '16',
    name: 'FlyStep Solar Flare',
    category: 'Running',
    price: 10999,
    oldPrice: 12999,
    discount: '15% OFF',
    rating: 5.0,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop',
    description: 'Ignite your run. High-visibility mesh, a reactive pebax cushioning plate, and durable traction zones combine to make the Solar Flare your fastest runner.',
    sizes: [7, 8, 9, 10, 11]
  },
  'plp-1': {
    id: 'plp-1',
    name: 'FlyStep Velocity Pro',
    category: 'Running',
    price: 4999,
    oldPrice: 5999,
    discount: '16% OFF',
    rating: 5.0,
    reviews: 104,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop',
    description: 'High-performance running shoe with carbon energy-return technology, designed for explosive speeds.',
    sizes: [7, 8, 9, 10, 11]
  },
  'plp-2': {
    id: 'plp-2',
    name: 'FlyStep Aero Run',
    category: 'Running',
    price: 5999,
    oldPrice: 6999,
    discount: '14% OFF',
    rating: 4.8,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop',
    description: 'Ultra-breathable daily runner designed for high mileage and maximum comfort on all running surfaces.',
    sizes: [6, 7, 8, 9, 10]
  },
  'plp-3': {
    id: 'plp-3',
    name: 'FlyStep Urban Street',
    category: 'Lifestyle',
    price: 3999,
    oldPrice: 4999,
    discount: '20% OFF',
    rating: 4.5,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    description: 'Retro lifestyle sneaker crafted with modern cushioning, active arch support, and premium recycled mesh.',
    sizes: [7, 8, 9, 10, 11]
  },
  'plp-4': {
    id: 'plp-4',
    name: 'FlyStep Trail Master',
    category: 'Trail Running',
    price: 6499,
    oldPrice: 7999,
    discount: '18% OFF',
    rating: 4.9,
    reviews: 54,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    description: 'All-terrain grip with deep traction lugs, high-stability midsole, and reinforced waterproof canvas protection.',
    sizes: [8, 9, 10, 11]
  },
  'plp-5': {
    id: 'plp-5',
    name: 'FlyStep Gym Elite',
    category: 'Training',
    price: 4799,
    oldPrice: 5499,
    discount: '12% OFF',
    rating: 4.6,
    reviews: 72,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    description: 'Stable gym training trainer offering excellent lateral lock-in support, squat balance, and high shock dispersion.',
    sizes: [6, 7, 8, 9, 10]
  },
  'plp-6': {
    id: 'plp-6',
    name: 'FlyStep Sprint X',
    category: 'Competition',
    price: 7499,
    oldPrice: 8999,
    discount: '16% OFF',
    rating: 5.0,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    description: 'Super lightweight race shoe built for speed records, elite track competition, and quick propulsion.',
    sizes: [7, 8, 9, 10, 11]
  }
};

// Application State
let cart = JSON.parse(localStorage.getItem('flystep_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('flystep_wishlist')) || [];

document.addEventListener('DOMContentLoaded', () => {
  initToastsContainer();
  initWishlistToggle();
  initCartListeners();
  initQuickView();
  initNewsletterForm();
  initDrawerInteractions();

  // Initial renders
  renderCartDrawer();
  renderWishlistDrawer();
});

/**
 * Ensures toast notification container exists in the DOM
 */
function initToastsContainer() {
  if (!document.getElementById('flystepToastContainer')) {
    const container = document.createElement('div');
    container.id = 'flystepToastContainer';
    container.className = 'flystep-toast-container';
    document.body.appendChild(container);
  }
}

/**
 * Triggers a premium toast notification
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('flystepToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `flystep-toast ${type === 'wishlist' ? 'wishlist-toast' : ''}`;

  const icon = type === 'wishlist'
    ? '<i class="bi bi-heart-fill text-danger"></i>'
    : '<i class="bi bi-bag-check-fill text-success"></i>';

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'toast-fade-out 0.3s forwards cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2700);
}

/**
 * Handles wishlist toggling
 */
function initWishlistToggle() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-wishlist');
    if (!btn) return;

    e.preventDefault();
    const productId = btn.getAttribute('data-product-id');
    const heartIcon = btn.querySelector('i');

    if (!productId) return; // Ignore modal wishlist button if handled separately

    toggleWishlistItem(productId, heartIcon);
  });
}

function toggleWishlistItem(productId, heartIcon) {
  const product = PRODUCTS_DATA[productId];
  if (!product) return;

  const idx = wishlist.findIndex(item => item.id === productId);

  if (idx === -1) {
    wishlist.push(product);
    if (heartIcon) {
      heartIcon.classList.replace('bi-heart', 'bi-heart-fill');
      heartIcon.classList.add('text-danger');
    }
    updateWishlistCardIcons(productId, true);
    showToast(`${product.name} added to Wishlist!`, 'wishlist');
  } else {
    wishlist.splice(idx, 1);
    if (heartIcon) {
      heartIcon.classList.replace('bi-heart-fill', 'bi-heart');
      heartIcon.classList.remove('text-danger');
    }
    updateWishlistCardIcons(productId, false);
    showToast(`${product.name} removed from Wishlist!`, 'wishlist');
  }

  renderWishlistDrawer();
}

function updateWishlistCardIcons(productId, isAdded) {
  const buttons = document.querySelectorAll(`.btn-wishlist[data-product-id="${productId}"]`);
  buttons.forEach(btn => {
    const heart = btn.querySelector('i');
    if (isAdded) {
      heart.classList.replace('bi-heart', 'bi-heart-fill');
      heart.classList.add('text-danger');
    } else {
      heart.classList.replace('bi-heart-fill', 'bi-heart');
      heart.classList.remove('text-danger');
    }
  });
}

/**
 * Handles Add to Cart interactions
 */
function initCartListeners() {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-to-cart');
    if (!btn) return;

    e.preventDefault();
    const productId = btn.getAttribute('data-product-id');
    if (!productId) return;

    const product = PRODUCTS_DATA[productId];
    if (!product) return;

    addToCart(productId);
  });
}

function addToCart(productId) {
  const product = PRODUCTS_DATA[productId];
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => item.product.id === productId);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  renderCartDrawer();
  showToast(`Added ${product.name} to Cart!`, 'success');

  // Dynamically open the cart drawer offcanvas
  const drawerEl = document.getElementById('cartDrawer');
  if (drawerEl && typeof bootstrap !== 'undefined') {
    const drawerInstance = bootstrap.Offcanvas.getInstance(drawerEl) || new bootstrap.Offcanvas(drawerEl);
    if (drawerInstance) {
      drawerInstance.show();
    }
  }
}

/**
 * Renders Cart Drawer items dynamically
 */
function renderCartDrawer() {
  localStorage.setItem('flystep_cart', JSON.stringify(cart));
  const cartItemsContainer = document.getElementById('cartDrawerItems');
  const cartSubtotalElement = document.getElementById('cartSubtotal');
  const badgeCounts = document.querySelectorAll('.cart-badge');
  const checkoutBtn = document.getElementById('cartDrawerCheckoutBtn');

  if (checkoutBtn) {
    if (cart.length === 0) {
      checkoutBtn.classList.add('disabled');
      checkoutBtn.style.pointerEvents = 'none';
      checkoutBtn.style.opacity = '0.5';
    } else {
      checkoutBtn.classList.remove('disabled');
      checkoutBtn.style.pointerEvents = 'auto';
      checkoutBtn.style.opacity = '1';
    }
  }

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bag-x display-4 text-muted mb-3 d-block"></i>
        <p class="text-muted">Your cart is empty.</p>
        <button class="btn btn-primary btn-sm mt-2" data-bs-dismiss="offcanvas">Start Shopping</button>
      </div>
    `;
    cartSubtotalElement.textContent = '₹0';
    badgeCounts.forEach(badge => {
      badge.style.display = 'none';
      badge.textContent = '0';
    });
    return;
  }

  let subtotal = 0;
  let totalQuantity = 0;

  const itemsHtml = cart.map((item, idx) => {
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;
    totalQuantity += item.quantity;

    const sizeHtml = item.size ? `<span class="badge bg-light text-dark border me-1" style="font-size: 0.7rem;">UK ${item.size}</span>` : '';
    const colorHtml = item.color ? `<span class="badge bg-light text-dark border" style="font-size: 0.7rem; text-transform: capitalize;">${item.color}</span>` : '';

    return `
      <div class="d-flex gap-3 mb-4 pb-3 border-bottom align-items-center">
        <img src="${item.product.image}" alt="${item.product.name}" class="rounded bg-light" style="width: 70px; height: 70px; object-fit: cover;">
        <div class="flex-grow-1">
          <h6 class="mb-1 fw-bold" style="font-size: 0.95rem;">${item.product.name}</h6>
          <div class="mb-2">
            <span class="text-muted d-inline-block me-2" style="font-size: 0.8rem;">Cat: ${item.product.category}</span>
            ${sizeHtml}
            ${colorHtml}
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="input-group input-group-sm" style="width: 90px;">
              <button class="btn btn-outline-secondary btn-qty-minus py-0 px-2" data-idx="${idx}" type="button">-</button>
              <input type="text" class="form-control text-center py-0 px-1 border-secondary" value="${item.quantity}" readonly style="font-size: 0.85rem;">
              <button class="btn btn-outline-secondary btn-qty-plus py-0 px-2" data-idx="${idx}" type="button">+</button>
            </div>
            <span class="fw-bold text-primary" style="font-size: 0.95rem;">₹${(itemTotal).toLocaleString('en-IN')}</span>
          </div>
        </div>
        <button type="button" class="btn btn-link text-danger p-1 btn-cart-remove" data-idx="${idx}" aria-label="Remove item">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `;
  }).join('');

  cartItemsContainer.innerHTML = itemsHtml;
  cartSubtotalElement.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  badgeCounts.forEach(badge => {
    badge.textContent = totalQuantity;
    badge.style.display = 'flex';
  });
}

/**
 * Renders Wishlist Drawer items dynamically
 */
function renderWishlistDrawer() {
  localStorage.setItem('flystep_wishlist', JSON.stringify(wishlist));
  const wishlistItemsContainer = document.getElementById('wishlistDrawerItems');
  if (!wishlistItemsContainer) return;

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-heartbreak display-4 text-muted mb-3 d-block"></i>
        <p class="text-muted">Your wishlist is empty.</p>
        <button class="btn btn-primary btn-sm mt-2" data-bs-dismiss="offcanvas">Find Shoes</button>
      </div>
    `;
    return;
  }

  const itemsHtml = wishlist.map((product, idx) => {
    return `
      <div class="d-flex gap-3 mb-4 pb-3 border-bottom align-items-center">
        <img src="${product.image}" alt="${product.name}" class="rounded bg-light" style="width: 70px; height: 70px; object-fit: cover;">
        <div class="flex-grow-1">
          <h6 class="mb-1 fw-bold" style="font-size: 0.95rem;">${product.name}</h6>
          <span class="text-muted d-block mb-2" style="font-size: 0.8rem;">Category: ${product.category}</span>
          <span class="fw-bold text-primary d-block mb-2" style="font-size: 0.95rem;">₹${product.price.toLocaleString('en-IN')}</span>
          <button class="btn btn-primary btn-sm w-100 btn-wishlist-tocart" data-product-id="${product.id}" type="button">
            <i class="bi bi-bag-plus"></i> Add to Cart
          </button>
        </div>
        <button type="button" class="btn btn-link text-danger p-1 btn-wishlist-remove" data-idx="${idx}" aria-label="Remove item">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `;
  }).join('');

  wishlistItemsContainer.innerHTML = itemsHtml;
}

/**
 * Handles clicks inside Wishlist and Cart Drawers
 */
function initDrawerInteractions() {
  // Cart Drawer Listeners
  const cartDrawer = document.getElementById('cartDrawer');
  if (cartDrawer) {
    cartDrawer.addEventListener('click', (e) => {
      const plusBtn = e.target.closest('.btn-qty-plus');
      if (plusBtn) {
        const idx = parseInt(plusBtn.getAttribute('data-idx'));
        cart[idx].quantity += 1;
        renderCartDrawer();
        return;
      }

      const minusBtn = e.target.closest('.btn-qty-minus');
      if (minusBtn) {
        const idx = parseInt(minusBtn.getAttribute('data-idx'));
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
        } else {
          cart.splice(idx, 1);
        }
        renderCartDrawer();
        return;
      }

      const removeBtn = e.target.closest('.btn-cart-remove');
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-idx'));
        const name = cart[idx].product.name;
        cart.splice(idx, 1);
        renderCartDrawer();
        showToast(`${name} removed from cart.`, 'success');
        return;
      }
    });
  }

  // Wishlist Drawer Listeners
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  if (wishlistDrawer) {
    wishlistDrawer.addEventListener('click', (e) => {
      const toCartBtn = e.target.closest('.btn-wishlist-tocart');
      if (toCartBtn) {
        const productId = toCartBtn.getAttribute('data-product-id');
        addToCart(productId);

        const idx = wishlist.findIndex(item => item.id === productId);
        if (idx > -1) {
          wishlist.splice(idx, 1);
          updateWishlistCardIcons(productId, false);
          renderWishlistDrawer();
        }
        return;
      }

      const removeBtn = e.target.closest('.btn-wishlist-remove');
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-idx'));
        const productId = wishlist[idx].id;
        const name = wishlist[idx].name;
        wishlist.splice(idx, 1);
        updateWishlistCardIcons(productId, false);
        renderWishlistDrawer();
        showToast(`${name} removed from wishlist.`, 'wishlist');
        return;
      }
    });
  }
}

/**
 * Quick View modal loader
 */
function initQuickView() {
  const quickViewModalElement = document.getElementById('quickViewModal');
  if (!quickViewModalElement) return;

  const qvBody = quickViewModalElement.querySelector('.modal-body-content');

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-quickview');
    if (!btn) return;

    e.preventDefault();
    const productId = btn.getAttribute('data-product-id');
    const product = PRODUCTS_DATA[productId];

    if (!product) return;

    const inWishlist = wishlist.some(item => item.id === productId);
    const wishlistHeartIconClass = inWishlist ? 'bi-heart-fill text-danger' : 'bi-heart';

    const sizesMarkup = product.sizes ? product.sizes.map((size, idx) => `
      <button class="size-option-btn ${idx === 1 ? 'active' : ''}" type="button" aria-label="Size ${size}">${size}</button>
    `).join('') : [6, 7, 8, 9, 10].map((size, idx) => `
      <button class="size-option-btn ${idx === 1 ? 'active' : ''}" type="button" aria-label="Size ${size}">${size}</button>
    `).join('');

    qvBody.innerHTML = `
      <div class="row g-4">
        <div class="col-md-6">
          <div class="qv-modal-img-wrapper">
            <img src="${product.image}" alt="${product.name}" class="qv-modal-img img-fluid">
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex flex-column h-100 justify-content-center">
            <span class="qv-modal-cat">${product.category}</span>
            <h3 class="qv-modal-title">${product.name}</h3>
            
            <div class="product-rating my-2">
              <div class="rating-stars me-2">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <span class="rating-text">(${product.reviews} Customer Reviews)</span>
            </div>

            <div class="qv-modal-price my-2">
              <span>₹${product.price.toLocaleString('en-IN')}</span>
              ${product.oldPrice ? `<span class="text-decoration-line-through text-muted ms-2 fs-6">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
              ${product.discount ? `<span class="badge bg-danger ms-2" style="font-size: 0.8rem;">${product.discount}</span>` : ''}
            </div>

            <p class="qv-modal-desc">${product.description}</p>

            <div class="size-selector mb-4">
              <div class="size-selector-label">Select Size (UK)</div>
              <div class="size-selector-options">
                ${sizesMarkup}
              </div>
            </div>

            <div class="d-flex gap-3">
              <button class="btn btn-primary d-flex justify-content-center flex-grow-1 btn-add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" type="button" data-bs-dismiss="modal">
                <i class="bi bi-bag-plus"></i> Add To Cart
              </button>
              <button class="btn btn-secondary-custom btn-modal-wishlist" data-product-id="${product.id}" type="button" aria-label="Add to Wishlist">
                <i class="bi ${wishlistHeartIconClass}"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const sizeBtns = qvBody.querySelectorAll('.size-option-btn');
    sizeBtns.forEach(sb => {
      sb.addEventListener('click', () => {
        sizeBtns.forEach(btn => btn.classList.remove('active'));
        sb.classList.add('active');
      });
    });

    const modalWishlistBtn = qvBody.querySelector('.btn-modal-wishlist');
    if (modalWishlistBtn) {
      modalWishlistBtn.addEventListener('click', (e) => {
        const modalHeart = modalWishlistBtn.querySelector('i');
        toggleWishlistItem(productId, modalHeart);
      });
    }
  });
}

/**
 * Newsletter Form submission logic
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const submitBtn = form.querySelector('.newsletter-btn');
      const successMsg = form.querySelector('.newsletter-success');

      if (!input || !input.value.trim()) return;

      const emailVal = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        alert('Please enter a valid email address.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';

      setTimeout(() => {
        submitBtn.textContent = 'Subscribed';
        input.value = '';
        if (successMsg) {
          successMsg.style.display = 'block';
        }
      }, 1000);
    });
  });
}
