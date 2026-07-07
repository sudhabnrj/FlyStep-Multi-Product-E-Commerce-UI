/* ----------------------------------------------------
   FlyStep - Sports Shoes E-Commerce Cart Page JavaScript
   Version: 1.0 (Iteration 1)
   ---------------------------------------------------- */

// Active Coupon State
let activeCoupon = null; // { code: string, type: 'percent'|'shipping', value: number }

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial draw of the cart items and summary
  renderCartPage();
  renderOrderSummary();

  // 2. Setup interactive coupon logic
  initCouponHandler();

  // 3. Render recommendations and recently viewed lists
  renderCartRecommendations();
  renderCartRecentlyViewed();

  // 4. Setup mobile bottom bar scroll listener
  initMobileStickyCheckoutBar();

  // 5. Setup general page interactions (newsletter, etc.)
  initPageForms();
});

/**
 * Renders list of cart item cards inside the main items container
 */
function renderCartPage() {
  const container = document.getElementById('cartItemsListContainer');
  const countBadge = document.getElementById('cartHeaderItemCount');
  if (!container) return;

  // Sync count badge
  let totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countBadge) {
    countBadge.textContent = `${totalItemsCount} Item${totalItemsCount !== 1 ? 's' : ''}`;
  }

  // Handle empty state
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-card">
        <i class="bi bi-cart-x empty-cart-icon" aria-hidden="true"></i>
        <h3 class="fw-bold mb-3">Your Shopping Cart is Empty</h3>
        <p class="text-muted mb-4">Looks like you haven't added anything to your cart yet. Take a look at our latest high-performance footwear collection.</p>
        <a href="shop.html" class="btn btn-primary px-4 py-3 rounded-pill fw-bold">
          Start Shopping
        </a>
      </div>
    `;
    // Update summary state
    renderOrderSummary();
    return;
  }

  // Draw cart items list
  const cartHtml = cart.map((item, idx) => {
    const itemTotal = item.product.price * item.quantity;
    const priceOldHtml = item.product.oldPrice 
      ? `<span class="text-decoration-line-through text-muted small ms-2">₹${item.product.oldPrice.toLocaleString('en-IN')}</span>` 
      : '';
    const sizeVal = item.size || '8';
    const colorVal = item.color || 'Black';

    return `
      <article class="cart-item-card" data-idx="${idx}">
        <div class="d-flex flex-column flex-md-row gap-3">
          <!-- Image -->
          <a href="product.html?id=${item.product.id}">
            <img src="${item.product.image}" alt="${item.product.name} shoe image" class="cart-item-img">
          </a>

          <!-- Info -->
          <div class="cart-item-info">
            <div>
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="cart-item-cat">${item.product.category}</span>
                  <h4 class="cart-item-name mb-1">
                    <a href="product.html?id=${item.product.id}">${item.product.name}</a>
                  </h4>
                </div>
                <span class="fw-extrabold text-primary fs-5">₹${(item.product.price).toLocaleString('en-IN')}</span>
              </div>

              <!-- Meta specs selection -->
              <div class="cart-item-meta mt-2">
                <span class="meta-pill">Size: UK ${sizeVal}</span>
                <span class="meta-pill">Color: ${colorVal}</span>
              </div>
            </div>

            <!-- Quantity adjuster & Line subtotal -->
            <div class="d-flex justify-content-between align-items-center mt-3 pt-2">
              <div class="cart-qty-adjuster">
                <button type="button" class="btn-cart-page-minus" data-idx="${idx}" ${item.quantity <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">-</button>
                <input type="text" value="${item.quantity}" readonly aria-label="Item quantity">
                <button type="button" class="btn-cart-page-plus" data-idx="${idx}" aria-label="Increase quantity">+</button>
              </div>
              <div class="text-end">
                <span class="text-muted small d-block">Subtotal</span>
                <span class="fw-bold text-primary" style="font-size: 1.05rem;">₹${itemTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <!-- Actions (Save for later, Remove) -->
            <div class="cart-item-actions">
              <button type="button" class="btn-item-action save-btn" data-idx="${idx}">
                <i class="bi bi-bookmark-plus" aria-hidden="true"></i> Save for Later
              </button>
              <button type="button" class="btn-item-action remove-btn" data-idx="${idx}">
                <i class="bi bi-trash3" aria-hidden="true"></i> Remove
              </button>
            </div>

          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = cartHtml;

  // Bind cart adjustments click events
  bindCartEvents(container);
}

/**
 * Event bindings for quantity changes, remove buttons, and save-for-later actions
 */
function bindCartEvents(container) {
  container.addEventListener('click', (e) => {
    const plusBtn = e.target.closest('.btn-cart-page-plus');
    if (plusBtn) {
      const idx = parseInt(plusBtn.getAttribute('data-idx'));
      const newQty = cart[idx].quantity + 1;
      updateQuantityInDOM(idx, newQty);
      return;
    }

    const minusBtn = e.target.closest('.btn-cart-page-minus');
    if (minusBtn) {
      const idx = parseInt(minusBtn.getAttribute('data-idx'));
      if (cart[idx].quantity > 1) {
        const newQty = cart[idx].quantity - 1;
        updateQuantityInDOM(idx, newQty);
      }
      return;
    }

    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
      const idx = parseInt(removeBtn.getAttribute('data-idx'));
      const name = cart[idx].product.name;
      const card = removeBtn.closest('.cart-item-card');
      if (card) {
        card.classList.add('removing');
        card.addEventListener('transitionend', () => {
          cart.splice(idx, 1);
          syncAndRenderAll();
          showToast(`${name} removed from cart.`, 'success');
        }, { once: true });
      } else {
        cart.splice(idx, 1);
        syncAndRenderAll();
        showToast(`${name} removed from cart.`, 'success');
      }
      return;
    }

    const saveBtn = e.target.closest('.save-btn');
    if (saveBtn) {
      const idx = parseInt(saveBtn.getAttribute('data-idx'));
      const item = cart[idx];
      const product = item.product;
      const card = saveBtn.closest('.cart-item-card');

      const handleSave = () => {
        if (!wishlist.some(w => w.id === product.id)) {
          wishlist.push(product);
        }
        cart.splice(idx, 1);
        syncAndRenderAll();
        renderWishlistDrawer();
        showToast(`${product.name} saved to Wishlist!`, 'success');
      };

      if (card) {
        card.classList.add('removing');
        card.addEventListener('transitionend', handleSave, { once: true });
      } else {
        handleSave();
      }
    }
  });
}

/**
 * Directly updates quantity inputs, line subtotals, and minus button disable states
 * in the DOM without rebuilding the list, preventing flashes and focus losses.
 */
function updateQuantityInDOM(idx, newQty) {
  const card = document.querySelector(`.cart-item-card[data-idx="${idx}"]`);
  if (!card) return;

  const qtyInput = card.querySelector('.cart-qty-adjuster input');
  const minusBtn = card.querySelector('.btn-cart-page-minus');
  const priceVal = card.querySelector('.text-end .fw-bold');

  // Update memory state
  cart[idx].quantity = newQty;

  // Sync state to local storage
  localStorage.setItem('flystep_cart', JSON.stringify(cart));

  // Trigger pop animation in input
  if (qtyInput) {
    qtyInput.value = newQty;
    qtyInput.classList.remove('quantity-updated');
    void qtyInput.offsetWidth; // Trigger reflow
    qtyInput.classList.add('quantity-updated');
  }

  // Disable minus button if quantity is 1
  if (minusBtn) {
    minusBtn.disabled = (newQty <= 1);
  }

  // Update subtotal text
  if (priceVal) {
    const itemTotal = cart[idx].product.price * newQty;
    priceVal.textContent = `₹${itemTotal.toLocaleString('en-IN')}`;
  }

  // Sync total count in page header count badge
  const countBadge = document.getElementById('cartHeaderItemCount');
  let totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countBadge) {
    countBadge.textContent = `${totalItemsCount} Item${totalItemsCount !== 1 ? 's' : ''}`;
  }

  // Update order summary and global cart drawer
  renderOrderSummary();
  renderCartDrawer();
}

function syncAndRenderAll() {
  renderCartPage();
  renderOrderSummary();
  renderCartDrawer();
}

/**
 * Calculations for shipping, GST, savings, discounts, and active coupons
 */
function renderOrderSummary() {
  const subtotalValEl = document.getElementById('summarySubtotal');
  const discountRowEl = document.getElementById('summaryDiscountRow');
  const discountValEl = document.getElementById('summaryDiscount');
  const shippingValEl = document.getElementById('summaryShipping');
  const taxValEl = document.getElementById('summaryTax');
  const grandTotalValEl = document.getElementById('summaryGrandTotal');
  const savingsValEl = document.getElementById('summarySavings');
  const mobileTotalEl = document.getElementById('mobileStickyCartTotal');

  if (!grandTotalValEl) return;

  // If cart is empty, set all to ₹0
  if (cart.length === 0) {
    if (subtotalValEl) subtotalValEl.textContent = '₹0';
    if (discountRowEl) discountRowEl.style.display = 'none';
    if (shippingValEl) shippingValEl.textContent = '₹0';
    if (taxValEl) taxValEl.textContent = '₹0';
    grandTotalValEl.textContent = '₹0';
    if (savingsValEl) savingsValEl.style.display = 'none';
    if (mobileTotalEl) mobileTotalEl.textContent = '₹0';
    return;
  }

  // 1. Calculate basic subtotal
  let subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  if (subtotalValEl) subtotalValEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  // 2. Coupon calculations
  let discountAmount = 0;
  let freeShippingApplied = false;

  if (activeCoupon) {
    if (activeCoupon.type === 'percent') {
      discountAmount = Math.round(subtotal * (activeCoupon.value / 100));
    } else if (activeCoupon.type === 'shipping') {
      freeShippingApplied = true;
    }
  }

  if (discountRowEl && discountValEl) {
    if (discountAmount > 0) {
      discountRowEl.style.display = 'flex';
      discountValEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
    } else {
      discountRowEl.style.display = 'none';
    }
  }

  // 3. Shipping rate
  // Standard shipping is ₹99. Free if subtotal > 999 or FREESHIP coupon applied.
  let shipping = (subtotal > 999 || freeShippingApplied) ? 0 : 99;
  if (shippingValEl) {
    shippingValEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`;
    if (shipping === 0) {
      shippingValEl.classList.add('text-success', 'fw-bold');
    } else {
      shippingValEl.className = '';
    }
  }

  // 4. Tax (18% GST of taxable value)
  let taxableValue = Math.max(0, subtotal - discountAmount);
  let tax = Math.round(taxableValue * 0.18);
  if (taxValEl) taxValEl.textContent = `₹${tax.toLocaleString('en-IN')}`;

  // 5. Grand Total
  let grandTotal = taxableValue + shipping + tax;
  grandTotalValEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  // 6. Savings (calculate catalog oldPrice discounts + coupon)
  let catalogSavings = cart.reduce((sum, item) => {
    if (item.product.oldPrice) {
      return sum + ((item.product.oldPrice - item.product.price) * item.quantity);
    }
    return sum;
  }, 0);
  let totalSavings = catalogSavings + discountAmount;

  if (savingsValEl) {
    if (totalSavings > 0) {
      savingsValEl.style.display = 'flex';
      savingsValEl.textContent = `You saved ₹${totalSavings.toLocaleString('en-IN')} on this order`;
    } else {
      savingsValEl.style.display = 'none';
    }
  }

  // 7. Update sticky mobile panel price
  if (mobileTotalEl) {
    mobileTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }
}

/**
 * Handle promo coupons validation and application
 */
function initCouponHandler() {
  const applyBtn = document.getElementById('couponApplyBtn');
  const input = document.getElementById('couponCodeInput');
  const appliedSection = document.getElementById('appliedCouponContainer');
  const appliedBadge = document.getElementById('appliedCouponBadge');

  if (!applyBtn || !input) return;

  applyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const val = input.value.trim().toUpperCase();

    if (!val) {
      showToast("Please enter a coupon code.", 'wishlist');
      return;
    }

    if (activeCoupon) {
      showToast("A coupon is already applied. Remove it first.", 'wishlist');
      return;
    }

    // Coupon logic
    if (val === 'WELCOME20') {
      activeCoupon = { code: 'WELCOME20', type: 'percent', value: 20 };
      showToast("Coupon 'WELCOME20' applied! 20% discount added.", 'success');
    } else if (val === 'FLYSTEP10') {
      activeCoupon = { code: 'FLYSTEP10', type: 'percent', value: 10 };
      showToast("Coupon 'FLYSTEP10' applied! 10% discount added.", 'success');
    } else if (val === 'FREESHIP') {
      activeCoupon = { code: 'FREESHIP', type: 'shipping', value: 0 };
      showToast("Coupon 'FREESHIP' applied! Free shipping added.", 'success');
    } else {
      showToast("Invalid coupon code.", 'wishlist');
      return;
    }

    // Render applied badge
    if (appliedSection && appliedBadge) {
      appliedBadge.innerHTML = `
        <span class="fw-bold">${activeCoupon.code}</span>
        <button type="button" class="btn-remove-coupon ms-2" id="couponRemoveBtn" aria-label="Remove coupon">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      `;
      appliedSection.style.display = 'block';
    }

    input.value = '';
    renderOrderSummary();
  });

  // Coupon removal listener
  if (appliedSection) {
    appliedSection.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('#couponRemoveBtn');
      if (removeBtn) {
        showToast(`Coupon '${activeCoupon.code}' removed.`, 'success');
        activeCoupon = null;
        appliedSection.style.display = 'none';
        renderOrderSummary();
      }
    });
  }
}

/**
 * Renders 4 products in cross-sell layout inside recommendations container
 */
function renderCartRecommendations() {
  const container = document.getElementById('recommendedProductsContainer');
  if (!container) return;

  // Filter 4 products different from cart items
  const cartIds = cart.map(item => item.product.id);
  const recommended = Object.values(PRODUCTS_DATA).filter(prod => 
    !cartIds.includes(prod.id) && prod.id.startsWith('plp-')
  ).slice(0, 4);

  if (recommended.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center text-muted py-4">
        No recommendations available right now.
      </div>
    `;
    return;
  }

  container.innerHTML = recommended.map(prod => {
    const fullStars = Math.floor(prod.rating || 5);
    const halfStar = (prod.rating || 5) % 1 !== 0;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) starsHtml += '<i class="bi bi-star-fill text-warning"></i>';
      else if (i === fullStars && halfStar) starsHtml += '<i class="bi bi-star-half text-warning"></i>';
      else starsHtml += '<i class="bi bi-star text-warning"></i>';
    }

    const colorSwatchesHtml = (prod.colors || []).map(col => `
      <span class="color-dot" style="background-color: ${col}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,0.15);" title="${col}"></span>
    `).join('');

    const discountBadgeHtml = prod.discount ? `<span class="badge-discount">${prod.discount}</span>` : '';
    const priceOldHtml = prod.oldPrice ? `<span class="price-old text-decoration-line-through text-muted small ms-2">₹${prod.oldPrice.toLocaleString('en-IN')}</span>` : '';
    const stockTag = prod.availability === 'instock' 
      ? '<span class="badge-stock badge-instock"><i class="bi bi-check-circle-fill"></i> In Stock</span>' 
      : '<span class="badge-stock badge-outofstock"><i class="bi bi-x-circle-fill"></i> Out of Stock</span>';

    return `
      <div class="col-6 col-md-3">
        <article class="product-card">
          <div class="product-img-wrapper">
            ${discountBadgeHtml}
            <div class="product-actions-top-right">
              <button type="button" class="btn-wishlist" data-product-id="${prod.id}" aria-label="Add ${prod.name} to Wishlist">
                <i class="${wishlist.some(w => w.id === prod.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'}" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn-quickview" data-product-id="${prod.id}" data-bs-toggle="modal" data-bs-target="#quickViewModal" aria-label="Quick View ${prod.name}">
                <i class="bi bi-eye" aria-hidden="true"></i>
              </button>
            </div>
            <a href="product.html?id=${prod.id}">
              <img src="${prod.image}" alt="${prod.name} image" class="product-img">
            </a>
            ${stockTag}
            <div class="product-hover-cart">
              <button class="btn btn-accent btn-add-to-cart text-center py-2" data-product-id="${prod.id}" data-product-name="${prod.name}" type="button" ${prod.availability === 'outofstock' ? 'disabled' : ''}>
                <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
              </button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-cat">${prod.category}</span>
            <h3 class="product-name">
              <a href="product.html?id=${prod.id}">${prod.name}</a>
            </h3>
            <div class="product-rating">
              <div class="rating-stars">${starsHtml}</div>
              <span class="rating-text">(${prod.reviews})</span>
            </div>
            <div class="price-container mb-2">
              <span class="price-current">₹${prod.price.toLocaleString('en-IN')}</span>
              ${priceOldHtml}
            </div>
            <div class="d-flex justify-content-between align-items-center w-100 border-top pt-2">
              <div class="d-flex gap-1">${colorSwatchesHtml}</div>
              <span class="text-muted" style="font-size: 0.75rem;">Sizes: ${(prod.sizes || []).join(', ')}</span>
            </div>
          </div>
        </article>
      </div>
    `;
  }).join('');
}

/**
 * Recently Viewed slider renderer inside cart page
 */
function renderCartRecentlyViewed() {
  const container = document.getElementById('recentlyViewedContainer');
  if (!container) return;

  const viewedIds = JSON.parse(localStorage.getItem('flystep_recently_viewed')) || [];
  
  if (viewedIds.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted w-100">
        <i class="bi bi-clock-history mb-2 d-block fs-4"></i>
        No recently viewed items yet.
      </div>
    `;
    return;
  }

  const viewedProducts = viewedIds.map(id => PRODUCTS_DATA[id]).filter(p => p !== undefined);

  if (viewedProducts.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted w-100">
        No recently viewed items.
      </div>
    `;
    return;
  }

  container.innerHTML = viewedProducts.map(prod => {
    const fullStars = Math.floor(prod.rating || 5);
    const halfStar = (prod.rating || 5) % 1 !== 0;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) starsHtml += '<i class="bi bi-star-fill text-warning"></i>';
      else if (i === fullStars && halfStar) starsHtml += '<i class="bi bi-star-half text-warning"></i>';
      else starsHtml += '<i class="bi bi-star text-warning"></i>';
    }

    const colorSwatchesHtml = (prod.colors || []).map(col => `
      <span class="color-dot" style="background-color: ${col}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,0.15);" title="${col}"></span>
    `).join('');

    const discountBadgeHtml = prod.discount ? `<span class="badge-discount">${prod.discount}</span>` : '';
    const priceOldHtml = prod.oldPrice ? `<span class="price-old text-decoration-line-through text-muted small ms-2">₹${prod.oldPrice.toLocaleString('en-IN')}</span>` : '';
    const stockTag = prod.availability === 'instock' 
      ? '<span class="badge-stock badge-instock"><i class="bi bi-check-circle-fill"></i> In Stock</span>' 
      : '<span class="badge-stock badge-outofstock"><i class="bi bi-x-circle-fill"></i> Out of Stock</span>';

    return `
      <article class="product-card" style="min-width: 260px; max-width: 260px; flex-shrink: 0;">
        <div class="product-img-wrapper">
          ${discountBadgeHtml}
          <div class="product-actions-top-right">
            <button type="button" class="btn-wishlist" data-product-id="${prod.id}" aria-label="Add ${prod.name} to Wishlist">
              <i class="${wishlist.some(w => w.id === prod.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'}" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn-quickview" data-product-id="${prod.id}" data-bs-toggle="modal" data-bs-target="#quickViewModal" aria-label="Quick View ${prod.name}">
              <i class="bi bi-eye" aria-hidden="true"></i>
            </button>
          </div>
          <a href="product.html?id=${prod.id}">
            <img src="${prod.image}" alt="${prod.name} image" class="product-img">
          </a>
          ${stockTag}
          <div class="product-hover-cart">
            <button class="btn btn-accent btn-add-to-cart text-center py-2" data-product-id="${prod.id}" data-product-name="${prod.name}" type="button" ${prod.availability === 'outofstock' ? 'disabled' : ''}>
              <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
            </button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-cat">${prod.category}</span>
          <h3 class="product-name">
            <a href="product.html?id=${prod.id}">${prod.name}</a>
          </h3>
          <div class="product-rating">
            <div class="rating-stars">${starsHtml}</div>
            <span class="rating-text">(${prod.reviews})</span>
          </div>
          <div class="price-container mb-2">
            <span class="price-current">₹${prod.price.toLocaleString('en-IN')}</span>
            ${priceOldHtml}
          </div>
          <div class="d-flex justify-content-between align-items-center w-100 border-top pt-2">
            <div class="d-flex gap-1">${colorSwatchesHtml}</div>
            <span class="text-muted" style="font-size: 0.75rem;">Sizes: ${(prod.sizes || []).join(', ')}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Handle mobile bottom bar visibility on scroll
 */
function initMobileStickyCheckoutBar() {
  const bar = document.getElementById('mobileStickyCartBar');
  if (!bar) return;

  const summary = document.getElementById('orderSummaryCard');
  if (!summary) return;

  window.addEventListener('scroll', () => {
    if (window.innerWidth >= 992) {
      bar.style.display = 'none';
      return;
    }

    const summaryRect = summary.getBoundingClientRect();
    // Show sticky actions if the desktop Proceed to Checkout button is scrolled out of viewport
    if (summaryRect.top < window.innerHeight - 100) {
      bar.style.display = 'none';
    } else {
      bar.style.display = 'block';
    }
  });
}

function initPageForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.querySelector('.newsletter-success');
      const input = form.querySelector('.newsletter-input');
      if (successMsg) {
        successMsg.style.display = 'block';
        if (input) input.value = '';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  });

  // Wire up Checkout Actions
  const checkoutButtons = [
    document.querySelector('.btn-checkout-primary'),
    document.querySelector('#mobileStickyCartBar .btn')
  ];

  checkoutButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        showToast("Your cart is empty. Add shoes before checkout.", "wishlist");
        return;
      }

      // Add loading state
      btn.style.pointerEvents = 'none';
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...`;

      showToast("Proceeding to secure checkout...", "success");

      setTimeout(() => {
        // Reset state & redirect to checkout page
        btn.style.pointerEvents = 'auto';
        btn.innerHTML = originalHtml;
        showToast("Redirecting to Checkout...", "success");
        setTimeout(() => {
          window.location.href = "checkout.html";
        }, 800);
      }, 1500);
    });
  });
}

// Override global addToCart to dynamically update cart list on the page too!
const originalAddToCart = window.addToCart;
window.addToCart = function(productId) {
  if (typeof originalAddToCart === 'function') {
    originalAddToCart(productId);
  }
  if (typeof renderCartPage === 'function') {
    renderCartPage();
    renderOrderSummary();
    renderCartRecommendations();
  }
};

// Override global updateWishlistCardIcons to dynamically update cart page items too
const originalUpdateWishlistCardIcons = window.updateWishlistCardIcons;
window.updateWishlistCardIcons = function(productId, isAdded) {
  if (typeof originalUpdateWishlistCardIcons === 'function') {
    originalUpdateWishlistCardIcons(productId, isAdded);
  }
  // Refresh recommendations and recently viewed hearts
  if (typeof renderCartRecommendations === 'function') {
    renderCartRecommendations();
  }
  if (typeof renderCartRecentlyViewed === 'function') {
    renderCartRecentlyViewed();
  }
};

