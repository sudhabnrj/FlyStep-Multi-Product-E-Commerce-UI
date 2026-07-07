/* ----------------------------------------------------
   FlyStep - Sports Shoes E-Commerce Checkout Page JS
   Version: 1.0 (Iteration 1)
   ---------------------------------------------------- */

// Active Coupon State (inherited from cart if persisted, or new)
let activeCoupon = null; // { code: string, type: 'percent'|'shipping', value: number }
let selectedShippingFee = 0; // standard standard is free if subtotal > 999
let selectedDeliveryMethod = 'standard';
let selectedPaymentMethod = 'card';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial renders
  renderCheckoutSummary();
  initDeliverySelection();
  initBillingToggle();
  initPaymentSelection();
  initCouponHandler();
  initFormValidations();
  initPlaceOrder();
  initMobileStickyPlaceOrderBar();
});

/**
 * Renders the products inside order summary preview and calculates pricing lines
 */
function renderCheckoutSummary() {
  const container = document.getElementById('checkoutSummaryItems');
  const subtotalValEl = document.getElementById('summarySubtotal');
  const discountRowEl = document.getElementById('summaryDiscountRow');
  const discountValEl = document.getElementById('summaryDiscount');
  const shippingValEl = document.getElementById('summaryShipping');
  const taxValEl = document.getElementById('summaryTax');
  const grandTotalValEl = document.getElementById('summaryGrandTotal');
  const savingsValEl = document.getElementById('summarySavings');
  const mobileTotalEl = document.getElementById('mobileStickyCheckoutTotal');

  if (!grandTotalValEl) return;

  // Handle empty state
  if (!cart || cart.length === 0) {
    if (container) {
      container.innerHTML = `
        <div class="text-center py-4 text-muted">
          <i class="bi bi-cart-x fs-2 d-block mb-2"></i>
          Your cart is empty.
        </div>
      `;
    }
    if (subtotalValEl) subtotalValEl.textContent = '₹0';
    if (discountRowEl) discountRowEl.style.display = 'none';
    if (shippingValEl) shippingValEl.textContent = '₹0';
    if (taxValEl) taxValEl.textContent = '₹0';
    grandTotalValEl.textContent = '₹0';
    if (savingsValEl) savingsValEl.style.display = 'none';
    if (mobileTotalEl) mobileTotalEl.textContent = '₹0';
    return;
  }

  // Draw items list preview
  if (container) {
    container.innerHTML = cart.map(item => {
      const sizeVal = item.size || '8';
      const colorVal = item.color || 'Black';
      const itemTotal = item.product.price * item.quantity;
      return `
        <div class="summary-item-preview">
          <div class="summary-item-img-wrapper">
            <img src="${item.product.image}" alt="${item.product.name}" class="summary-item-img">
            <span class="summary-item-qty-badge">${item.quantity}</span>
          </div>
          <div class="summary-item-details">
            <h5 class="summary-item-title">${item.product.name}</h5>
            <span class="summary-item-meta">Size UK ${sizeVal} | Color ${colorVal}</span>
          </div>
          <span class="summary-item-price">₹${itemTotal.toLocaleString('en-IN')}</span>
        </div>
      `;
    }).join('');
  }

  // 1. Calculate basic subtotal
  let subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  if (subtotalValEl) subtotalValEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  // 2. Coupon discount
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
      discountRowEl.style.display = 'table-row';
      discountValEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
    } else {
      discountRowEl.style.display = 'none';
    }
  }

  // 3. Shipping rate
  // Default values based on choice
  let shipping = 0;
  if (selectedDeliveryMethod === 'standard') {
    shipping = (subtotal > 999 || freeShippingApplied) ? 0 : 99;
  } else if (selectedDeliveryMethod === 'express') {
    shipping = freeShippingApplied ? 0 : 150;
  } else if (selectedDeliveryMethod === 'sameday') {
    shipping = freeShippingApplied ? 0 : 300;
  }

  if (shippingValEl) {
    shippingValEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`;
    if (shipping === 0) {
      shippingValEl.classList.add('text-success', 'fw-bold');
    } else {
      shippingValEl.className = 'fw-bold';
    }
  }

  // 4. Tax (18% GST of taxable value)
  let taxableValue = Math.max(0, subtotal - discountAmount);
  let tax = Math.round(taxableValue * 0.18);
  if (taxValEl) taxValEl.textContent = `₹${tax.toLocaleString('en-IN')}`;

  // 5. Grand Total
  let grandTotal = taxableValue + shipping + tax;
  grandTotalValEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  // 6. Savings (catalog discounts + coupon)
  let catalogSavings = cart.reduce((sum, item) => {
    if (item.product.oldPrice) {
      return sum + ((item.product.oldPrice - item.product.price) * item.quantity);
    }
    return sum;
  }, 0);
  let totalSavings = catalogSavings + discountAmount;

  if (savingsValEl) {
    if (totalSavings > 0) {
      savingsValEl.style.display = 'table-row';
      // Find the cell inside and update its content
      const savingsCell = savingsValEl.querySelector('td');
      if (savingsCell) {
        savingsCell.textContent = `You saved ₹${totalSavings.toLocaleString('en-IN')} on this order`;
      }
    } else {
      savingsValEl.style.display = 'none';
    }
  }

  // 7. Sync mobile bottom sticky bar grand total
  if (mobileTotalEl) {
    mobileTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }
}

/**
 * Handle delivery option selection
 */
function initDeliverySelection() {
  const cards = document.querySelectorAll('.delivery-method-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      selectedDeliveryMethod = card.getAttribute('data-method');
      
      // Update delivery window estimates in summary card
      const desc = card.querySelector('.method-card-desc').textContent;
      const summaryWindow = document.querySelector('.delivery-estimate-card div');
      if (summaryWindow) {
        summaryWindow.innerHTML = `
          <span class="d-block text-uppercase fw-bold text-muted" style="font-size: 0.65rem;">Estimated Delivery</span>
          ${desc}
        `;
      }

      renderCheckoutSummary();
    });
  });
}

/**
 * Collapsible billing details address toggle
 */
function initBillingToggle() {
  const chk = document.getElementById('billingSameAsShipping');
  const collapse = document.getElementById('billingAddressCollapse');
  if (!chk || !collapse) return;

  chk.addEventListener('change', () => {
    if (chk.checked) {
      collapse.classList.remove('show');
    } else {
      collapse.classList.add('show');
    }
  });
}

/**
 * Payment selector cards and conditional payment form visibility
 */
function initPaymentSelection() {
  const cards = document.querySelectorAll('.payment-method-card');
  const cardForm = document.getElementById('cardPaymentForm');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      selectedPaymentMethod = card.getAttribute('data-payment');

      // Show card form only for credit/debit selections
      if (cardForm) {
        if (selectedPaymentMethod === 'card') {
          cardForm.classList.add('show');
        } else {
          cardForm.classList.remove('show');
        }
      }
    });
  });
}

/**
 * Promo validation and calculations
 */
function initCouponHandler() {
  const applyBtn = document.getElementById('checkoutCouponApplyBtn');
  const input = document.getElementById('checkoutCouponInput');
  const appliedSection = document.getElementById('checkoutAppliedCouponContainer');
  const appliedBadge = document.getElementById('checkoutAppliedCouponBadge');

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

    // Coupon checks
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
        <button type="button" class="btn-remove-coupon ms-2" id="checkoutCouponRemoveBtn" aria-label="Remove coupon">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      `;
      appliedSection.style.display = 'block';
    }

    input.value = '';
    renderCheckoutSummary();
  });

  // Remove coupon trigger
  if (appliedSection) {
    appliedSection.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('#checkoutCouponRemoveBtn');
      if (removeBtn) {
        showToast(`Coupon '${activeCoupon.code}' removed.`, 'success');
        activeCoupon = null;
        appliedSection.style.display = 'none';
        renderCheckoutSummary();
      }
    });
  }
}

/**
 * Setup regex live validation on input focus/blur events
 */
function initFormValidations() {
  const inputs = document.querySelectorAll('.form-control');

  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateField(input);
      }
    });
  });
}

function validateField(input) {
  const val = input.value.trim();
  let isValid = true;

  if (input.hasAttribute('required') && !val) {
    isValid = false;
  } else if (val) {
    // Format validators
    if (input.type === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = regex.test(val);
    } else if (input.id === 'shippingPhone' || input.id === 'billingPhone') {
      const regex = /^\d{10}$/;
      isValid = regex.test(val);
    } else if (input.id === 'shippingPin' || input.id === 'billingPin') {
      const regex = /^\d{6}$/;
      isValid = regex.test(val);
    } else if (input.id === 'cardNumber') {
      const cleanVal = val.replace(/\s+/g, '');
      const regex = /^\d{16}$/;
      isValid = regex.test(cleanVal);
    } else if (input.id === 'cardExpiry') {
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      isValid = regex.test(val);
    } else if (input.id === 'cardCvv') {
      const regex = /^\d{3}$/;
      isValid = regex.test(val);
    }
  }

  if (isValid) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }

  return isValid;
}

/**
 * Place Order validations and redirects
 */
function initPlaceOrder() {
  const placeOrderBtns = [
    document.querySelector('.btn-place-order-primary'),
    document.querySelector('#mobileStickyPlaceOrderBar .btn')
  ];

  placeOrderBtns.forEach(btn => {
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!cart || cart.length === 0) {
        showToast("Your cart is empty. Please add items to checkout.", "wishlist");
        return;
      }

      // 1. Gather all fields to validate
      let formsToValidate = ['#shippingForm'];
      const chk = document.getElementById('billingSameAsShipping');
      if (chk && !chk.checked) {
        formsToValidate.push('#billingForm');
      }

      let allFields = [];
      formsToValidate.forEach(sel => {
        const formEl = document.querySelector(sel);
        if (formEl) {
          allFields.push(...formEl.querySelectorAll('input[required], select[required]'));
        }
      });

      // Card payment verification fields
      if (selectedPaymentMethod === 'card') {
        const cardFormEl = document.getElementById('cardPaymentForm');
        if (cardFormEl) {
          allFields.push(...cardFormEl.querySelectorAll('input[required]'));
        }
      }

      // 2. Validate all gathered input nodes
      let isFormValid = true;
      let firstInvalidElement = null;

      allFields.forEach(field => {
        const isFieldValid = validateField(field);
        if (!isFieldValid) {
          isFormValid = false;
          if (!firstInvalidElement) {
            firstInvalidElement = field;
          }
        }
      });

      if (!isFormValid) {
        showToast("Please fill in all required checkout fields correctly.", "wishlist");
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalidElement.focus();
        }
        return;
      }

      // 3. Trigger loader animation and execute order completion
      placeOrderBtns.forEach(b => {
        if (b) {
          b.style.pointerEvents = 'none';
          b.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Securing Order...`;
        }
      });

      showToast("Verifying payment transaction details...", "success");

      setTimeout(() => {
        // Gather order details
        const getValue = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
        const shippingAddress = {
          name: `${getValue('shippingFirst')} ${getValue('shippingLast')}`.trim(),
          phone: getValue('shippingPhone'),
          line1: getValue('shippingAddr1'),
          line2: getValue('shippingAddr2'),
          pin: getValue('shippingPin'),
          city: getValue('shippingCity'),
          state: getValue('shippingState'),
          country: getValue('shippingCountry')
        };

        // Recalculate totals
        let subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        let discountAmount = 0;
        let freeShippingApplied = false;
        if (activeCoupon) {
          if (activeCoupon.type === 'percent') {
            discountAmount = Math.round(subtotal * (activeCoupon.value / 100));
          } else if (activeCoupon.type === 'shipping') {
            freeShippingApplied = true;
          }
        }
        let shipping = 0;
        if (selectedDeliveryMethod === 'standard') {
          shipping = (subtotal > 999 || freeShippingApplied) ? 0 : 99;
        } else if (selectedDeliveryMethod === 'express') {
          shipping = freeShippingApplied ? 0 : 150;
        } else if (selectedDeliveryMethod === 'sameday') {
          shipping = freeShippingApplied ? 0 : 300;
        }
        let taxableValue = Math.max(0, subtotal - discountAmount);
        let tax = Math.round(taxableValue * 0.18);
        let grandTotal = taxableValue + shipping + tax;

        const orderId = `FS-${Math.floor(100000 + Math.random() * 900000)}`;

        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 4);
        const fmt = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

        const txnId = 'TXN' + Math.random().toString(36).substr(2, 10).toUpperCase();

        let billingAddress = {};
        const chkSame = document.getElementById('billingSameAsShipping');
        if (chkSame && chkSame.checked) {
          billingAddress = { ...shippingAddress };
        } else {
          billingAddress = {
            name: `${getValue('billingFirst')} ${getValue('billingLast')}`.trim(),
            phone: getValue('billingPhone'),
            line1: getValue('billingAddr1'),
            line2: '',
            pin: getValue('billingPin'),
            city: getValue('billingCity'),
            state: getValue('billingState'),
            country: shippingAddress.country
          };
        }

        const orderDetails = {
          orderNumber: `#${orderId}`,
          orderDate: fmt(today),
          estimatedDelivery: fmt(deliveryDate),
          paymentMethod: selectedPaymentMethod === 'card' ? 'Credit Card' : selectedPaymentMethod.toUpperCase(),
          paymentStatus: selectedPaymentMethod === 'cod' ? 'Pending (COD)' : 'Paid',
          shippingMethod: selectedDeliveryMethod === 'standard' ? 'Standard Shipping' : (selectedDeliveryMethod === 'express' ? 'Express Shipping' : 'Same Day Delivery'),
          shippingAddress: shippingAddress,
          billingAddress: billingAddress,
          transactionId: txnId,
          items: cart.map(item => ({
            name: item.product.name,
            category: item.product.category,
            color: item.color || 'Standard',
            size: item.size || '9 UK',
            qty: item.quantity,
            price: item.product.price,
            img: item.product.image
          })),
          subtotal: subtotal,
          discount: discountAmount,
          shipping: shipping,
          tax: tax,
          grandTotal: grandTotal,
          rewardPointsEarned: Math.floor(grandTotal / 10)
        };

        localStorage.setItem('flystep_last_order', JSON.stringify(orderDetails));

        // Clear cart database on checkout completion
        localStorage.removeItem('flystep_cart');
        cart = [];

        showToast("Order placed successfully! Redirecting...", "success");

        setTimeout(() => {
          window.location.href = `order-confirmation.html?id=${orderId}`;
        }, 1000);

      }, 2000);
    });
  });
}

/**
 * Handle mobile bottom sticky Place Order bar visibility on scroll
 */
function initMobileStickyPlaceOrderBar() {
  const bar = document.getElementById('mobileStickyPlaceOrderBar');
  if (!bar) return;

  const stickyWrapper = document.querySelector('.checkout-summary-sticky');
  if (!stickyWrapper) return;

  window.addEventListener('scroll', () => {
    if (window.innerWidth >= 992) {
      bar.style.display = 'none';
      return;
    }

    const wrapperRect = stickyWrapper.getBoundingClientRect();
    // Hide sticky mobile actions if the normal Place Order button is in view
    if (wrapperRect.top < window.innerHeight - 100) {
      bar.style.display = 'none';
    } else {
      bar.style.display = 'block';
    }
  });
}
