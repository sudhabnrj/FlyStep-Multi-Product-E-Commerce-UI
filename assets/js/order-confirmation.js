/**
 * FlyStep - Order Confirmation Page JavaScript
 * Version 2.0 (Build Iteration 2 - Blank Page Fix)
 */

/* ── ORDER DATA ─────────────────────────────────────── */
// Try to load real cart + checkout data from localStorage, fall back to demo
function buildOrderData() {
  const lastOrderRaw = localStorage.getItem('flystep_last_order');
  if (lastOrderRaw) {
    try {
      return JSON.parse(lastOrderRaw);
    } catch (e) {
      console.error("Error parsing last order data", e);
    }
  }

  const cartRaw = localStorage.getItem('flystep_cart');
  const cart = cartRaw ? JSON.parse(cartRaw) : null;

  // Demo / fallback items
  const demoItems = [
    {
      name: 'FlyStep Velocity Pro',
      category: 'Running Shoes',
      color: 'Black / Orange',
      size: '9 UK',
      qty: 1,
      price: 4999,
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'
    },
    {
      name: 'FlyStep Gym Elite',
      category: 'Training Shoes',
      color: 'White',
      size: '8 UK',
      qty: 1,
      price: 4799,
      img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop'
    }
  ];

  let items = demoItems;
  let subtotal = 9798;
  let discount = 800;
  let grandTotal = 9178;
  let rewardPoints = 918;

  if (cart && cart.length > 0) {
    items = cart.map(entry => ({
      name: entry.product ? entry.product.name : 'FlyStep Shoe',
      category: entry.product ? (entry.product.category || 'Sports Shoes') : 'Sports Shoes',
      color: entry.color || 'Standard',
      size: entry.size || 'One Size',
      qty: entry.quantity || 1,
      price: entry.product ? entry.product.price : 0,
      img: entry.product ? (entry.product.image || entry.product.img || demoItems[0].img) : demoItems[0].img
    }));
    subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    discount = 0;
    grandTotal = Math.round(subtotal * 1.18);
    rewardPoints = Math.floor(grandTotal / 10);
  }

  // Generate a random order number each session (persist in sessionStorage)
  let orderNum = sessionStorage.getItem('flystep_order_num');
  if (!orderNum) {
    orderNum = '#FS' + (2026000000 + Math.floor(Math.random() * 999999));
    sessionStorage.setItem('flystep_order_num', orderNum);
  }

  // Generate transaction ID
  let txnId = sessionStorage.getItem('flystep_txn_id');
  if (!txnId) {
    txnId = 'TXN' + Math.random().toString(36).substr(2, 10).toUpperCase();
    sessionStorage.setItem('flystep_txn_id', txnId);
  }

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 4);

  const fmt = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return {
    orderNumber: orderNum,
    orderDate: fmt(today),
    estimatedDelivery: fmt(deliveryDate),
    paymentMethod: 'Credit Card (Visa \u2022\u2022\u2022\u2022 4572)',
    transactionId: txnId,
    paymentStatus: 'Paid',
    shippingMethod: 'Free Express Delivery',
    shippingAddress: {
      name: 'Arjun Sharma',
      phone: '+91 98765 43210',
      line1: '12, Lotus Heights, Sector 18',
      line2: '',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pin: '201 301',
      country: 'India'
    },
    billingAddress: {
      name: 'Arjun Sharma',
      phone: '+91 98765 43210',
      line1: '12, Lotus Heights, Sector 18',
      line2: '',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pin: '201 301',
      country: 'India'
    },
    items,
    subtotal,
    discount,
    shipping: 0,
    tax: Math.round((subtotal - discount) * 0.18),
    grandTotal,
    rewardPointsEarned: rewardPoints
  };
}

const ORDER_DATA = buildOrderData();

/* ── RECOMMENDED PRODUCTS ───────────────────────────── */
const RECOMMENDED_PRODUCTS = [
  {
    name: 'FlyStep Air Rush',
    category: 'Road Running',
    price: 5499,
    oldPrice: 6299,
    rating: 4.8,
    reviews: 312,
    img: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=300&fit=crop'
  },
  {
    name: 'FlyStep Endurance X',
    category: 'Trail Running',
    price: 6299,
    oldPrice: 7499,
    rating: 4.7,
    reviews: 189,
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop'
  },
  {
    name: 'FlyStep PowerStride',
    category: 'Gym & Training',
    price: 3999,
    oldPrice: 4799,
    rating: 4.6,
    reviews: 247,
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop'
  },
  {
    name: 'FlyStep Sprint Elite',
    category: 'Speed & Track',
    price: 7299,
    oldPrice: null,
    rating: 4.9,
    reviews: 98,
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop'
  }
];

/* ── HELPERS ────────────────────────────────────────── */
function fmtINR(n) {
  return '\u20B9' + Number(n).toLocaleString('en-IN');
}

function starHtml(rating) {
  let s = '';
  const full = Math.floor(rating);
  for (let i = 0; i < full; i++) s += '<i class="bi bi-star-fill"></i>';
  if (rating % 1 >= 0.5) s += '<i class="bi bi-star-half"></i>';
  return s;
}

/* ── INIT ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  populateHeroMeta();
  populateOrderSummary();
  populatePurchasedProducts();
  populateShippingAddress();
  populateBillingAddress();
  populatePaymentInfo();
  populateRecommendedProducts();
  populateLoyaltyPoints();
  initDeliveryTimeline();
  initCopyOrderNumber();
  initNewsletterForm();
  initScrollReveal();
  initSmoothScrollLinks();
});

/* ── HERO META ──────────────────────────────────────── */
function populateHeroMeta() {
  var els = {
    heroOrderNumber: ORDER_DATA.orderNumber,
    heroDeliveryDate: ORDER_DATA.estimatedDelivery,
    heroPayStatus: ORDER_DATA.paymentStatus
  };
  Object.keys(els).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = els[id];
  });
}

/* ── ORDER SUMMARY ──────────────────────────────────── */
function populateOrderSummary() {
  var fields = {
    summaryOrderNum: ORDER_DATA.orderNumber,
    summaryOrderDate: ORDER_DATA.orderDate,
    summaryPaymentMethod: ORDER_DATA.paymentMethod,
    summaryShipping: ORDER_DATA.shippingMethod,
    summaryDelivery: ORDER_DATA.estimatedDelivery
  };
  Object.keys(fields).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = fields[id];
  });

  var elMap = {
    summarySubtotal: fmtINR(ORDER_DATA.subtotal),
    summaryDiscount: '-' + fmtINR(ORDER_DATA.discount),
    summaryShippingFee: ORDER_DATA.shipping === 0 ? 'FREE' : fmtINR(ORDER_DATA.shipping),
    summaryTax: fmtINR(ORDER_DATA.tax),
    summaryGrandTotal: fmtINR(ORDER_DATA.grandTotal)
  };
  Object.keys(elMap).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.textContent = elMap[id];
  });
}

/* ── PURCHASED PRODUCTS ─────────────────────────────── */
function populatePurchasedProducts() {
  var container = document.getElementById('purchasedProductsList');
  if (!container) return;

  var html = ORDER_DATA.items.map(function (item) {
    return '<div class="purchased-product-card fade-in-up">' +
      '<img src="' + item.img + '" alt="' + item.name + '" class="purchased-product-img" loading="lazy">' +
      '<div class="purchased-product-info">' +
        '<div class="purchased-product-name">' + item.name + '</div>' +
        '<div class="purchased-product-meta">' +
          '<span class="product-meta-tag">' + item.category + '</span>' +
          '<span class="product-meta-tag">' + item.color + '</span>' +
          '<span class="product-meta-tag">Size: ' + item.size + '</span>' +
          '<span class="product-meta-tag qty-highlight">Qty: ' + item.qty + '</span>' +
        '</div>' +
        '<div class="purchased-product-price">' + fmtINR(item.price) + '</div>' +
      '</div>' +
      '<a href="product.html" class="btn-view-product">' +
        '<i class="bi bi-eye me-1"></i>View' +
      '</a>' +
    '</div>';
  }).join('');

  container.innerHTML = html;
}

/* ── SHIPPING ADDRESS ───────────────────────────────── */
function populateShippingAddress() {
  var addr = ORDER_DATA.shippingAddress;
  var container = document.getElementById('shippingAddressCard');
  if (!container) return;

  var line2Html = addr.line2 ? '<div class="address-line">' + addr.line2 + '</div>' : '';
  container.innerHTML =
    '<div class="address-name">' + addr.name + '</div>' +
    '<div class="address-line"><i class="bi bi-telephone-fill me-1 text-muted" style="font-size:0.75rem;"></i>' + addr.phone + '</div>' +
    '<div class="address-line">' + addr.line1 + '</div>' +
    line2Html +
    '<div class="address-line">' + addr.city + ', ' + addr.state + ' &ndash; ' + addr.pin + '</div>' +
    '<div class="address-line">' + addr.country + '</div>';
}

/* ── BILLING ADDRESS ────────────────────────────────── */
function populateBillingAddress() {
  var addr = ORDER_DATA.billingAddress;
  var container = document.getElementById('billingAddressCard');
  if (!container) return;

  if (!addr || !addr.name) {
    container.innerHTML = '<div class="text-muted small">Same as shipping address</div>';
    return;
  }

  var line2Html = addr.line2 ? '<div class="address-line">' + addr.line2 + '</div>' : '';
  container.innerHTML =
    '<div class="address-name">' + addr.name + '</div>' +
    '<div class="address-line"><i class="bi bi-telephone-fill me-1 text-muted" style="font-size:0.75rem;"></i>' + addr.phone + '</div>' +
    '<div class="address-line">' + addr.line1 + '</div>' +
    line2Html +
    '<div class="address-line">' + addr.city + ', ' + addr.state + ' &ndash; ' + addr.pin + '</div>' +
    '<div class="address-line">' + addr.country + '</div>';
}

/* ── PAYMENT INFO ───────────────────────────────────── */
function populatePaymentInfo() {
  var container = document.getElementById('paymentInfoCard');
  if (!container) return;

  container.innerHTML =
    '<span class="payment-status-badge"><i class="bi bi-check-circle-fill me-1"></i>' + ORDER_DATA.paymentStatus + '</span>' +
    '<div class="payment-detail-row"><span class="label">Payment Method</span><span class="value">' + ORDER_DATA.paymentMethod + '</span></div>' +
    '<div class="payment-detail-row"><span class="label">Transaction ID</span><span class="value" style="font-family:monospace;font-size:0.82rem;">' + ORDER_DATA.transactionId + '</span></div>' +
    '<div class="payment-detail-row"><span class="label">Amount Paid</span><span class="value text-success fw-bold">' + fmtINR(ORDER_DATA.grandTotal) + '</span></div>' +
    '<button class="btn-invoice" id="invoiceDownloadBtn"><i class="bi bi-download me-1"></i>Download Invoice</button>';

  var invoiceBtn = document.getElementById('invoiceDownloadBtn');
  if (invoiceBtn) invoiceBtn.addEventListener('click', handleInvoiceDownload);
}

/* ── LOYALTY POINTS ─────────────────────────────────── */
function populateLoyaltyPoints() {
  var el = document.getElementById('loyaltyPointsDisplay');
  if (el) el.textContent = ORDER_DATA.rewardPointsEarned;
}

/* ── RECOMMENDED PRODUCTS ───────────────────────────── */
function populateRecommendedProducts() {
  var container = document.getElementById('recommendedProductsGrid');
  if (!container) return;

  var html = RECOMMENDED_PRODUCTS.map(function (p) {
    var discountBadgeHtml = p.oldPrice
      ? '<span class="badge-discount">-' + Math.round((p.oldPrice - p.price) / p.oldPrice * 100) + '% OFF</span>'
      : '';
    var priceOldHtml = p.oldPrice
      ? '<span class="price-old text-decoration-line-through text-muted small ms-2">' + fmtINR(p.oldPrice) + '</span>'
      : '';
    return '<div class="col-6 col-md-3">' +
      '<article class="product-card fade-in-up">' +
        '<div class="product-img-wrapper">' +
          discountBadgeHtml +
          '<div class="product-actions-top-right">' +
            '<button type="button" class="btn-wishlist" aria-label="Add to Wishlist"><i class="bi bi-heart"></i></button>' +
            '<button type="button" class="btn-quickview" aria-label="Quick View"><i class="bi bi-eye"></i></button>' +
          '</div>' +
          '<a href="product.html">' +
            '<img src="' + p.img + '" alt="' + p.name + ' shoe image" class="product-img" loading="lazy">' +
          '</a>' +
          '<div class="product-hover-cart">' +
            '<button class="btn btn-accent btn-add-to-cart text-center py-2" type="button"><i class="bi bi-bag-plus"></i> Add to Cart</button>' +
          '</div>' +
        '</div>' +
        '<div class="product-info">' +
          '<span class="product-cat">' + p.category + '</span>' +
          '<h3 class="product-name"><a href="product.html">' + p.name + '</a></h3>' +
          '<div class="product-rating">' +
            '<div class="rating-stars">' + starHtml(p.rating) + '</div>' +
            '<span class="rating-text">(' + p.reviews + ')</span>' +
          '</div>' +
          '<div class="price-container mb-2">' +
            '<span class="price-current">' + fmtINR(p.price) + '</span>' +
            priceOldHtml +
          '</div>' +
        '</div>' +
      '</article>' +
    '</div>';
  }).join('');

  container.innerHTML = html;
}

/* ── DELIVERY TIMELINE ──────────────────────────────── */
function initDeliveryTimeline() {
  var progressBar = document.getElementById('timelineProgressBar');
  if (!progressBar) return;
  // Active step = 1 (Preparing, 0-indexed), 5 total steps → 25% progress
  var percent = (1 / 4) * 100;
  setTimeout(function () {
    progressBar.style.width = percent + '%';
  }, 500);
}

/* ── COPY ORDER NUMBER ──────────────────────────────── */
function initCopyOrderNumber() {
  var btn = document.getElementById('copyOrderBtn');
  var toast = document.getElementById('copyToast');
  if (!btn || !toast) return;

  btn.addEventListener('click', function () {
    var text = ORDER_DATA.orderNumber;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopyToast(toast);
      }).catch(function () {
        fallbackCopy(text, toast);
      });
    } else {
      fallbackCopy(text, toast);
    }
  });
}

function fallbackCopy(text, toast) {
  var input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(input);
  showCopyToast(toast);
}

function showCopyToast(toast) {
  var msgEl = toast.querySelector('.toast-message');
  if (msgEl) msgEl.textContent = 'Order number copied!';
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2500);
}

/* ── INVOICE DOWNLOAD ───────────────────────────────── */
function handleInvoiceDownload() {
  var rupeeSym = '\u20B9';
  var lines = [
    'FlyStep - Order Invoice',
    '========================',
    'Order Number: ' + ORDER_DATA.orderNumber,
    'Order Date: ' + ORDER_DATA.orderDate,
    'Customer: ' + ORDER_DATA.shippingAddress.name,
    '',
    'ITEMS:'
  ];

  ORDER_DATA.items.forEach(function (i) {
    lines.push('- ' + i.name + ' (' + i.color + ', Size ' + i.size + ') x' + i.qty + '  ' + rupeeSym + i.price.toLocaleString('en-IN'));
  });

  lines.push('');
  lines.push('Subtotal: ' + rupeeSym + ORDER_DATA.subtotal.toLocaleString('en-IN'));
  if (ORDER_DATA.discount > 0) lines.push('Discount: -' + rupeeSym + ORDER_DATA.discount.toLocaleString('en-IN'));
  lines.push('Shipping: ' + (ORDER_DATA.shipping === 0 ? 'FREE' : rupeeSym + ORDER_DATA.shipping));
  lines.push('Tax (GST 18%): ' + rupeeSym + ORDER_DATA.tax.toLocaleString('en-IN'));
  lines.push('GRAND TOTAL: ' + rupeeSym + ORDER_DATA.grandTotal.toLocaleString('en-IN'));
  lines.push('');
  lines.push('Payment: ' + ORDER_DATA.paymentStatus + ' via ' + ORDER_DATA.paymentMethod);
  lines.push('Transaction ID: ' + ORDER_DATA.transactionId);
  lines.push('');
  lines.push('Thank you for shopping with FlyStep!');
  lines.push('Move Beyond Limits.');

  var content = lines.join('\n');
  var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'FlyStep_Invoice_' + ORDER_DATA.orderNumber.replace('#', '') + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── NEWSLETTER FORM ────────────────────────────────── */
function initNewsletterForm() {
  var form = document.getElementById('confirmationNewsletterForm');
  var input = document.getElementById('confirmationNewsletterEmail');
  var btn = document.getElementById('confirmationNewsletterBtn');
  if (!form || !input || !btn) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      input.style.borderColor = '#ef4444';
      input.focus();
      return;
    }

    input.style.borderColor = '';
    btn.textContent = 'Subscribed!';
    btn.disabled = true;
    input.value = '';
    input.disabled = true;

    setTimeout(function () {
      btn.textContent = 'Subscribe';
      btn.disabled = false;
      input.disabled = false;
    }, 4000);
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────── */
function initScrollReveal() {
  if (!window.IntersectionObserver) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(function (el) {
    observer.observe(el);
  });
}

/* ── SMOOTH SCROLL LINKS ────────────────────────────── */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href="#deliveryTimelineSection"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById('deliveryTimelineSection');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
