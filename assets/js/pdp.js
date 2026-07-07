/* ----------------------------------------------------
   FlyStep - Sports Shoes E-Commerce Product Detail Page JavaScript
   Version: 2.0 (Iteration 2 — Critique Loop 1 Fixes)
   ---------------------------------------------------- */

// ── Color → per-color gallery images map ──────────────────────────────────────
const PDP_COLOR_GALLERIES = {
  'plp-1': {
    blue:  [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop'
    ],
    black: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop'
    ],
    white: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'plp-2': {
    white:  [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop'
    ],
    orange: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop'
    ],
    green:  [
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'plp-3': {
    black: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop'
    ],
    white: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop'
    ],
    red: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'plp-4': {
    black: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop'
    ],
    green: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'plp-5': {
    black: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop'
    ],
    blue: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop'
    ],
    orange: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'plp-6': {
    green: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop'
    ],
    red: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop'
    ],
    white: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop'
    ]
  }
};

// Additional details for the dynamic catalogue
const PDP_DETAILS_EXT = {
  'plp-1': {
    gallery: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop'
    ],
    code: 'FS-VEL-PRO-01',
    weight: '285g',
    upper: 'Engineered Mesh',
    midsole: 'Foam Cushioning & Carbon Plate',
    outsole: 'Anti-Slip Performance Rubber',
    heel: '8mm Drop',
    closure: 'Premium Athletic Lacing',
    origin: 'India',
    colors: ['blue', 'black', 'white'],
    sportsType: 'Road Running'
  },
  'plp-2': {
    gallery: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop'
    ],
    code: 'FS-AER-RUN-02',
    weight: '260g',
    upper: 'Breathable Knit',
    midsole: 'UltraSoft Air Cushioning',
    outsole: 'FlexGroove Grip Outsole',
    heel: '6mm Drop',
    closure: 'Speed Loop Laces',
    origin: 'India',
    colors: ['white', 'orange', 'green'],
    sportsType: 'Road Running'
  },
  'plp-3': {
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop'
    ],
    code: 'FS-URB-STR-03',
    weight: '310g',
    upper: 'Recycled Canvas & Mesh',
    midsole: 'Daily Comfort Foam Core',
    outsole: 'Vulcanized Street Grip Rubber',
    heel: '4mm Drop',
    closure: 'Flat Retro Laces',
    origin: 'Vietnam',
    colors: ['black', 'white', 'red'],
    sportsType: 'Casual'
  },
  'plp-4': {
    gallery: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop'
    ],
    code: 'FS-TRL-MAS-04',
    weight: '340g',
    upper: 'Waterproof Canvas Shield',
    midsole: 'Impact Guard High Cushioning',
    outsole: 'MudClaw Multi-Directional Lugs',
    heel: '10mm Drop',
    closure: 'Quick Lace System',
    origin: 'India',
    colors: ['black', 'green'],
    sportsType: 'Trail Running'
  },
  'plp-5': {
    gallery: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop'
    ],
    code: 'FS-GYM-ELI-05',
    weight: '295g',
    upper: 'Reinforced Jacquard Mesh',
    midsole: 'Flat Density Support Foam',
    outsole: 'OmniGrip Rubber Contact Zone',
    heel: '4mm Drop',
    closure: 'Midfoot Lock Strap Laces',
    origin: 'Vietnam',
    colors: ['black', 'blue', 'orange'],
    sportsType: 'Gym & Cross Training'
  },
  'plp-6': {
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-43345095a84f?q=80&w=800&auto=format&fit=crop'
    ],
    code: 'FS-SPR-X-06',
    weight: '210g',
    upper: 'VaporWeave Lightweight Shield',
    midsole: 'ZoomReact High Bounce Foam',
    outsole: 'High-Density Traction Pods',
    heel: '8mm Drop',
    closure: 'Aero Weave Laces',
    origin: 'India',
    colors: ['green', 'red', 'white'],
    sportsType: 'Track Racing'
  }
};

let currentProductId = 'plp-1';
let currentImageIndex = 0;
let currentGallery = [];
let thumbSwiper = null;

document.addEventListener('DOMContentLoaded', () => {
  // Read Product ID from URL parameters
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');
  
  if (idParam && PRODUCTS_DATA[idParam]) {
    currentProductId = idParam;
  }

  // Load product specs & images
  initPDP();

  // Attach interactive features
  initGalleryZoom();
  initQuantityControls();
  initReviewCounters();
  initCartWishlistTriggers();
  init360View();

  // Related & recently viewed updates
  renderRelatedProducts();
  registerRecentlyViewed(currentProductId);
  renderRecentlyViewed();
});

/**
 * Injects product specifications dynamically from components.js and extension databases
 */
function initPDP() {
  const baseProd = PRODUCTS_DATA[currentProductId];
  const extDetails = PDP_DETAILS_EXT[currentProductId] || PDP_DETAILS_EXT['plp-1'];
  
  if (!baseProd) return;

  // Ingest gallery — use first color's gallery if available
  const firstColor = extDetails.colors[0];
  const colorGalleries = PDP_COLOR_GALLERIES[currentProductId];
  currentGallery = (colorGalleries && colorGalleries[firstColor]) ? colorGalleries[firstColor] : extDetails.gallery;
  currentImageIndex = 0;

  // Render gallery HTML
  updateMainImage(true);
  renderThumbnails();

  // Render text details
  document.title = `${baseProd.name} | FlyStep Sports Shoes`;
  document.getElementById('pdpBreadcrumbCurrent').textContent = baseProd.name;
  document.getElementById('pdpCategory').textContent = baseProd.category;
  document.getElementById('pdpTitleName').textContent = baseProd.name;
  document.getElementById('pdpCode').textContent = extDetails.code;

  // Rating Stars
  const starsMarkup = getStarsHtml(baseProd.rating);
  document.getElementById('pdpStarsContainer').innerHTML = starsMarkup;
  document.getElementById('pdpReviewCount').textContent = `(${baseProd.reviews} Customer Reviews)`;

  // Pricing
  document.getElementById('pdpCurrentPrice').textContent = `₹${baseProd.price.toLocaleString('en-IN')}`;
  if (baseProd.oldPrice) {
    document.getElementById('pdpOldPrice').textContent = `₹${baseProd.oldPrice.toLocaleString('en-IN')}`;
    document.getElementById('pdpDiscountBadge').textContent = baseProd.discount;
    document.getElementById('pdpOldPrice').style.display = 'inline';
    document.getElementById('pdpDiscountBadge').style.display = 'inline';
  } else {
    document.getElementById('pdpOldPrice').style.display = 'none';
    document.getElementById('pdpDiscountBadge').style.display = 'none';
  }

  // Stock status
  const inStock = baseProd.availability !== 'outofstock';
  const stockBadge = document.getElementById('pdpStockBadge');
  const addCartBtn = document.getElementById('pdpAddCartBtn');
  const buyNowBtn = document.getElementById('pdpBuyNowBtn');
  const mobileAddCartBtn = document.getElementById('pdpMobileAddCartBtn');

  if (stockBadge) {
    if (inStock) {
      stockBadge.className = 'badge-stock-pill badge-stock-instock';
      stockBadge.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> In Stock';
      if (addCartBtn) addCartBtn.disabled = false;
      if (buyNowBtn) buyNowBtn.disabled = false;
      if (mobileAddCartBtn) mobileAddCartBtn.disabled = false;
    } else {
      stockBadge.className = 'badge-stock-pill badge-stock-outofstock';
      stockBadge.innerHTML = '<i class="bi bi-x-circle-fill me-1"></i> Out of Stock';
      if (addCartBtn) addCartBtn.disabled = true;
      if (buyNowBtn) buyNowBtn.disabled = true;
      if (mobileAddCartBtn) mobileAddCartBtn.disabled = true;
    }
  }

  // Text descriptions
  document.getElementById('pdpShortDesc').textContent = baseProd.description;
  document.getElementById('pdpLongDescText').textContent = baseProd.description + ' Engineered with top-grade materials for optimal performance, ensuring lightweight velocity, structural arch support, and comfortable shock distribution through high-impact runs, trails, or street sessions.';

  // Sticky Mobile Sync
  const stickyImg = document.getElementById('mobileStickyImg');
  const stickyTitle = document.getElementById('mobileStickyTitle');
  const stickyPrice = document.getElementById('mobileStickyPrice');
  if (stickyImg) stickyImg.src = baseProd.image;
  if (stickyTitle) stickyTitle.textContent = baseProd.name;
  if (stickyPrice) stickyPrice.textContent = `₹${baseProd.price.toLocaleString('en-IN')}`;

  // Table Specifications
  document.getElementById('specWeight').textContent = extDetails.weight;
  document.getElementById('specUpper').textContent = extDetails.upper;
  document.getElementById('specMidsole').textContent = extDetails.midsole;
  document.getElementById('specOutsole').textContent = extDetails.outsole;
  document.getElementById('specHeel').textContent = extDetails.heel;
  document.getElementById('specClosure').textContent = extDetails.closure;
  document.getElementById('specOrigin').textContent = extDetails.origin;
  document.getElementById('specSports').textContent = extDetails.sportsType;
  document.getElementById('specWarranty').textContent = '6 Months Official Warranty';

  // Variant setups: colors
  renderColorSwatches(extDetails.colors);
  
  // Variant setups: sizes
  renderSizeButtons(baseProd.sizes || [7, 8, 9, 10, 11]);

  // Set initial wishlist button state
  const wishlistBtn = document.getElementById('pdpWishlistBtn');
  if (wishlistBtn) {
    const inWishlist = wishlist && wishlist.some(item => item.id === currentProductId);
    const heart = wishlistBtn.querySelector('i');
    if (heart) {
      if (inWishlist) {
        heart.className = 'bi bi-heart-fill text-danger';
        wishlistBtn.classList.add('btn-wishlist-active');
      } else {
        heart.className = 'bi bi-heart';
        wishlistBtn.classList.remove('btn-wishlist-active');
      }
    }
  }
}

/**
 * Update main image with smooth fade transition
 */
function updateMainImage(instant = false) {
  const mainImg = document.getElementById('pdpMainImg');
  if (!mainImg) return;

  if (instant) {
    mainImg.src = currentGallery[currentImageIndex];
    return;
  }

  // Smooth crossfade
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'translate(-50%, -50%) scale(0.97)';
  setTimeout(() => {
    mainImg.src = currentGallery[currentImageIndex];
    mainImg.onload = () => {
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'translate(-50%, -50%) scale(1)';
    };
    // Fallback in case onload doesn't fire (cached)
    if (mainImg.complete) {
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }, 200);
}

/**
 * Render thumbnail strip with Swiper-style horizontal scroll
 */
function renderThumbnails() {
  const container = document.getElementById('pdpThumbnails');
  if (!container) return;

  container.innerHTML = currentGallery.map((img, idx) => `
    <button class="pdp-thumbnail ${idx === currentImageIndex ? 'active' : ''}" data-idx="${idx}" type="button" aria-label="View image ${idx + 1}">
      <img src="${img}" alt="Product thumbnail ${idx + 1}" loading="lazy">
    </button>
  `).join('');

  // Add click events to thumbnails
  container.querySelectorAll('.pdp-thumbnail').forEach(btn => {
    btn.addEventListener('click', () => {
      currentImageIndex = parseInt(btn.getAttribute('data-idx'));
      updateMainImage(false);
      updateActiveThumbnail(container, btn);
    });
  });
}

function updateActiveThumbnail(container, activeBtn) {
  container.querySelectorAll('.pdp-thumbnail').forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
  // Scroll into view smoothly
  activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function getStarsHtml(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      html += '<i class="bi bi-star-fill text-warning"></i>';
    } else if (i === full && half) {
      html += '<i class="bi bi-star-half text-warning"></i>';
    } else {
      html += '<i class="bi bi-star text-warning"></i>';
    }
  }
  return html;
}

/**
 * Render color swatches — on color click, swap gallery images
 */
function renderColorSwatches(colors) {
  const container = document.getElementById('pdpColorSwatches');
  const label = document.getElementById('selectedColorLabel');
  if (!container) return;

  container.innerHTML = colors.map((col, idx) => `
    <button class="pdp-color-swatch-btn swatch-${col} ${idx === 0 ? 'active' : ''}" 
      style="background-color: ${col};" 
      data-color="${col}" 
      type="button" 
      aria-label="Select color ${col}"
      title="${col.charAt(0).toUpperCase() + col.slice(1)}">
    </button>
  `).join('');

  if (label && colors[0]) {
    label.textContent = colors[0].charAt(0).toUpperCase() + colors[0].slice(1);
  }

  container.querySelectorAll('.pdp-color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.pdp-color-swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const colName = btn.getAttribute('data-color');
      if (label) label.textContent = colName.charAt(0).toUpperCase() + colName.slice(1);

      // Swap gallery images based on color selection
      const colorGalleries = PDP_COLOR_GALLERIES[currentProductId];
      const extDetails = PDP_DETAILS_EXT[currentProductId] || PDP_DETAILS_EXT['plp-1'];
      currentGallery = (colorGalleries && colorGalleries[colName]) ? colorGalleries[colName] : extDetails.gallery;
      currentImageIndex = 0;
      updateMainImage(false);
      renderThumbnails();
    });
  });
}

/**
 * Render size selection buttons with improved hover effect
 */
function renderSizeButtons(sizes) {
  const container = document.getElementById('pdpSizeSelector');
  const label = document.getElementById('selectedSizeLabel');
  if (!container) return;

  container.innerHTML = sizes.map((size, idx) => `
    <button class="pdp-size-btn ${idx === 1 ? 'active' : ''}" data-size="${size}" type="button" aria-label="Select size UK ${size}">UK ${size}</button>
  `).join('');

  if (label && sizes[1]) {
    label.textContent = `UK ${sizes[1]}`;
  }

  container.querySelectorAll('.pdp-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sizeVal = btn.getAttribute('data-size');
      if (label) label.textContent = `UK ${sizeVal}`;
    });
  });
}

/**
 * Image hover coordinate Calculations + gallery prev/next arrows
 */
function initGalleryZoom() {
  const wrapper = document.getElementById('pdpMainImgWrapper');
  const prevBtn = document.getElementById('pdpGalleryPrev');
  const nextBtn = document.getElementById('pdpGalleryNext');

  if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      if (!wrapper.classList.contains('zoomed')) return;
      const rect = wrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      const transX = -50 - (x - 50) * 0.8;
      const transY = -50 - (y - 50) * 0.8;

      wrapper.style.setProperty('--zoom-x', `${transX}%`);
      wrapper.style.setProperty('--zoom-y', `${transY}%`);
    });

    wrapper.addEventListener('mouseenter', () => {
      wrapper.classList.add('zoomed');
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.classList.remove('zoomed');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
      updateMainImage(false);
      const container = document.getElementById('pdpThumbnails');
      if (container) {
        const activeBtn = container.querySelector(`[data-idx="${currentImageIndex}"]`);
        if (activeBtn) updateActiveThumbnail(container, activeBtn);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
      updateMainImage(false);
      const container = document.getElementById('pdpThumbnails');
      if (container) {
        const activeBtn = container.querySelector(`[data-idx="${currentImageIndex}"]`);
        if (activeBtn) updateActiveThumbnail(container, activeBtn);
      }
    });
  }
}

/**
 * 360° interactive view — simulates rotating shoe images in the modal
 */
function init360View() {
  const badge = document.querySelector('.badge-360');
  const modal360El = document.getElementById('view360Modal');
  if (!modal360El) return;

  const modal360 = bootstrap.Modal.getOrCreateInstance(modal360El);

  // Build 360 spinner content inside modal body
  const modalBody = modal360El.querySelector('.modal-body');
  if (!modalBody) return;

  // Replacement 360 interactive body
  modalBody.innerHTML = `
    <div class="view360-container" id="view360Container">
      <div class="view360-track" id="view360Track">
        <img id="view360Img" src="${currentGallery[0] || ''}" alt="360 degree shoe view" class="view360-img">
      </div>
      <div class="view360-controls d-flex align-items-center justify-content-center gap-3 mt-3">
        <button class="btn btn-outline-secondary btn-sm rounded-pill px-3" id="btn360Prev" type="button">
          <i class="bi bi-chevron-left"></i> Prev
        </button>
        <span class="text-muted small fw-bold" id="view360Counter">1 / 4</span>
        <button class="btn btn-outline-secondary btn-sm rounded-pill px-3" id="btn360Next" type="button">
          Next <i class="bi bi-chevron-right"></i>
        </button>
      </div>
      <p class="text-muted small mt-2 mb-0">Use the arrows to rotate the shoe view 360°</p>
    </div>
  `;

  let view360Index = 0;

  function update360() {
    const img = document.getElementById('view360Img');
    const counter = document.getElementById('view360Counter');
    if (img) {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.95)';
      setTimeout(() => {
        img.src = currentGallery[view360Index] || '';
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 150);
    }
    if (counter) counter.textContent = `${view360Index + 1} / ${currentGallery.length}`;
  }

  // Sync with current gallery when modal opens
  modal360El.addEventListener('show.bs.modal', () => {
    view360Index = 0;
    const img = document.getElementById('view360Img');
    if (img) img.src = currentGallery[0] || '';
    const counter = document.getElementById('view360Counter');
    if (counter) counter.textContent = `1 / ${currentGallery.length}`;
  });

  modal360El.addEventListener('click', (e) => {
    if (e.target.closest('#btn360Next')) {
      view360Index = (view360Index + 1) % currentGallery.length;
      update360();
    }
    if (e.target.closest('#btn360Prev')) {
      view360Index = (view360Index - 1 + currentGallery.length) % currentGallery.length;
      update360();
    }
  });

  // Drag support
  let dragStartX = 0;
  let dragging = false;
  const track = modal360El.querySelector('#view360Track');
  if (track) {
    track.style.cursor = 'grab';
    track.addEventListener('mousedown', (e) => { dragging = true; dragStartX = e.clientX; track.style.cursor = 'grabbing'; });
    track.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      if (Math.abs(e.clientX - dragStartX) > 40) {
        if (e.clientX < dragStartX) {
          view360Index = (view360Index + 1) % currentGallery.length;
        } else {
          view360Index = (view360Index - 1 + currentGallery.length) % currentGallery.length;
        }
        dragStartX = e.clientX;
        update360();
      }
    });
    track.addEventListener('mouseup', () => { dragging = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseleave', () => { dragging = false; track.style.cursor = 'grab'; });
  }
}

/**
 * Plus / Minus adjustments for Quantity inputs
 */
function initQuantityControls() {
  const input = document.getElementById('pdpQtyInput');
  const btnMinus = document.getElementById('pdpQtyMinus');
  const btnPlus = document.getElementById('pdpQtyPlus');

  if (btnMinus && btnPlus && input) {
    btnMinus.addEventListener('click', () => {
      let val = parseInt(input.value);
      if (val > 1) {
        input.value = val - 1;
      }
    });

    btnPlus.addEventListener('click', () => {
      let val = parseInt(input.value);
      if (val < 10) {
        input.value = val + 1;
      }
    });
  }
}

/**
 * Increments helpful counter on reviews
 */
function initReviewCounters() {
  document.querySelectorAll('.btn-review-helpful').forEach(btn => {
    btn.addEventListener('click', () => {
      const countSpan = btn.querySelector('.helpful-count');
      if (countSpan && !btn.classList.contains('clicked')) {
        let count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;
        btn.classList.add('clicked', 'text-success', 'border-success');
      }
    });
  });
}

/**
 * Maps cart and wishlist drawer actions
 */
function initCartWishlistTriggers() {
  const addCartBtn = document.getElementById('pdpAddCartBtn');
  const buyNowBtn = document.getElementById('pdpBuyNowBtn');
  const mobileAddCartBtn = document.getElementById('pdpMobileAddCartBtn');
  const wishlistBtn = document.getElementById('pdpWishlistBtn');
  const shareBtn = document.getElementById('pdpShareBtn');
  const compareBtn = document.getElementById('pdpCompareBtn');

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => addPdpProductToCart());
  }

  if (mobileAddCartBtn) {
    mobileAddCartBtn.addEventListener('click', () => addPdpProductToCart());
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", 'success');
    });
  }

  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      showToast("Added to compare list! (Mock Feature)", 'success');
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      addPdpProductToCart(false);
      setTimeout(() => {
        const offcanvasElement = document.getElementById('cartDrawer');
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        bsOffcanvas.show();
      }, 300);
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const baseProd = PRODUCTS_DATA[currentProductId];
      if (!baseProd) return;

      const heart = wishlistBtn.querySelector('i');
      const idx = wishlist.findIndex(item => item.id === currentProductId);

      if (idx === -1) {
        wishlist.push(baseProd);
        if (heart) {
          heart.className = 'bi bi-heart-fill text-danger';
        }
        wishlistBtn.classList.add('btn-wishlist-active');
        updateWishlistCardIcons(currentProductId, true);
        showToast(`${baseProd.name} added to Wishlist!`, 'wishlist');
      } else {
        wishlist.splice(idx, 1);
        if (heart) {
          heart.className = 'bi bi-heart';
        }
        wishlistBtn.classList.remove('btn-wishlist-active');
        updateWishlistCardIcons(currentProductId, false);
        showToast(`${baseProd.name} removed from Wishlist!`, 'wishlist');
      }
      renderWishlistDrawer();
    });
  }
}

// Override / extend global updateWishlistCardIcons to sync main PDP wishlist button
const originalUpdateWishlistCardIcons = window.updateWishlistCardIcons;
window.updateWishlistCardIcons = function(productId, isAdded) {
  if (typeof originalUpdateWishlistCardIcons === 'function') {
    originalUpdateWishlistCardIcons(productId, isAdded);
  }
  if (productId === currentProductId) {
    const wishlistBtn = document.getElementById('pdpWishlistBtn');
    if (wishlistBtn) {
      const heart = wishlistBtn.querySelector('i');
      if (heart) {
        if (isAdded) {
          heart.className = 'bi bi-heart-fill text-danger';
          wishlistBtn.classList.add('btn-wishlist-active');
        } else {
          heart.className = 'bi bi-heart';
          wishlistBtn.classList.remove('btn-wishlist-active');
        }
      }
    }
  }
};

function addPdpProductToCart(openDrawer = true) {
  const qtyInput = document.getElementById('pdpQtyInput');
  const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

  const activeSizeBtn = document.querySelector('.pdp-size-btn.active');
  const activeColorBtn = document.querySelector('.pdp-color-swatch-btn.active');

  const selectedSize = activeSizeBtn ? activeSizeBtn.getAttribute('data-size') : null;
  const selectedColor = activeColorBtn ? activeColorBtn.getAttribute('data-color') : null;

  if (!selectedSize) {
    showToast("Please choose a size first.", 'wishlist');
    return;
  }

  const baseProd = PRODUCTS_DATA[currentProductId];
  if (!baseProd) return;

  const existingItemIndex = cart.findIndex(item => 
    item.product.id === currentProductId && 
    item.size === selectedSize && 
    item.color === selectedColor
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      product: baseProd,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  }

  renderCartDrawer();
  
  if (openDrawer) {
    const offcanvasElement = document.getElementById('cartDrawer');
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    bsOffcanvas.show();
  }

  showToast(`Added ${quantity}x ${baseProd.name} (Size UK ${selectedSize}) to Cart!`, 'success');
}

/**
 * Filter 4 related products — use full product-card markup matching shop.js style
 */
function renderRelatedProducts() {
  const container = document.getElementById('pdpRelatedGrid');
  if (!container) return;

  const currentCategory = PRODUCTS_DATA[currentProductId].category;

  const related = Object.values(PRODUCTS_DATA).filter(prod => 
    prod.id !== currentProductId && 
    (prod.category === currentCategory || prod.id.startsWith('plp-'))
  ).slice(0, 4);

  container.innerHTML = related.map(prod => {
    const fullStars = Math.floor(prod.rating || 5);
    const halfStar = (prod.rating || 5) % 1 !== 0;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += '<i class="bi bi-star-fill"></i>';
      } else if (i === fullStars && halfStar) {
        starsHtml += '<i class="bi bi-star-half"></i>';
      } else {
        starsHtml += '<i class="bi bi-star"></i>';
      }
    }

    const colorSwatchesHtml = (prod.colors || []).map(col => `
      <span class="color-dot" style="background-color: ${col}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,0.15);" title="${col}"></span>
    `).join('');

    const discountBadgeHtml = prod.discount ? `<span class="badge-discount">${prod.discount}</span>` : '';
    const priceOldHtml = prod.oldPrice ? `<span class="price-old">₹${prod.oldPrice.toLocaleString('en-IN')}</span>` : '';
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
                <i class="${wishlist && wishlist.some(item => item.id === prod.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'}" aria-hidden="true"></i>
              </button>
              <button type="button" class="btn-quickview" data-product-id="${prod.id}" data-bs-toggle="modal" data-bs-target="#quickViewModal" aria-label="Quick view ${prod.name}">
                <i class="bi bi-eye" aria-hidden="true"></i>
              </button>
            </div>
            <a href="product.html?id=${prod.id}">
              <img src="${prod.image}" alt="${prod.name}" class="product-img">
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
              <a href="product.html?id=${prod.id}" style="text-decoration: none; color: inherit;">${prod.name}</a>
            </h3>
            <div class="product-rating">
              <div class="rating-stars" aria-label="${prod.rating} stars">${starsHtml}</div>
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

  // Note: .btn-wishlist and .btn-add-to-cart are handled globally
  // by initWishlistToggle() and initCartListeners() in components.js
}

/**
 * Cache operations for recently viewed drawer items — match shop.js card style
 */
function registerRecentlyViewed(productId) {
  let viewed = JSON.parse(localStorage.getItem('flystep_recently_viewed')) || [];
  
  viewed = viewed.filter(id => id !== productId);
  viewed.unshift(productId);

  if (viewed.length > 6) {
    viewed.pop();
  }

  localStorage.setItem('flystep_recently_viewed', JSON.stringify(viewed));
}

function renderRecentlyViewed() {
  const container = document.getElementById('recentlyViewedContainer');
  if (!container) return;

  const viewedIds = JSON.parse(localStorage.getItem('flystep_recently_viewed')) || [];
  const otherViewedIds = viewedIds.filter(id => id !== currentProductId);

  if (otherViewedIds.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted w-100">
        <i class="bi bi-clock-history mb-2 d-block fs-4"></i>
        No other recently viewed items yet.
      </div>
    `;
    return;
  }

  const viewedProducts = otherViewedIds.map(id => PRODUCTS_DATA[id]).filter(p => p !== undefined);

  if (viewedProducts.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 text-muted w-100">
        No other recently viewed items.
      </div>
    `;
    return;
  }

  // Render using the same product-card style as shop.js
  container.innerHTML = viewedProducts.map(prod => {
    const fullStars = Math.floor(prod.rating || 5);
    const halfStar = (prod.rating || 5) % 1 !== 0;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) starsHtml += '<i class="bi bi-star-fill"></i>';
      else if (i === fullStars && halfStar) starsHtml += '<i class="bi bi-star-half"></i>';
      else starsHtml += '<i class="bi bi-star"></i>';
    }

    const discountBadgeHtml = prod.discount ? `<span class="badge-discount">${prod.discount}</span>` : '';
    const stockTag = prod.availability === 'instock'
      ? '<span class="badge-stock badge-instock"><i class="bi bi-check-circle-fill"></i> In Stock</span>'
      : '<span class="badge-stock badge-outofstock"><i class="bi bi-x-circle-fill"></i> Out of Stock</span>';

    return `
      <article class="product-card" style="min-width: 260px; max-width: 260px; flex-shrink: 0;">
        <div class="product-img-wrapper">
          ${discountBadgeHtml}
          <div class="product-actions-top-right">
            <button type="button" class="btn-wishlist" data-product-id="${prod.id}" aria-label="Wishlist ${prod.name}">
              <i class="${wishlist && wishlist.some(item => item.id === prod.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'}" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn-quickview" data-product-id="${prod.id}" data-bs-toggle="modal" data-bs-target="#quickViewModal" aria-label="Quick View ${prod.name}">
              <i class="bi bi-eye" aria-hidden="true"></i>
            </button>
          </div>
          <a href="product.html?id=${prod.id}">
            <img src="${prod.image}" alt="${prod.name}" class="product-img">
          </a>
          ${stockTag}
          <div class="product-hover-cart">
            <button class="btn btn-accent btn-add-to-cart text-center py-2" data-product-id="${prod.id}" data-product-name="${prod.name}" type="button">
              <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
            </button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-cat">${prod.category}</span>
          <h3 class="product-name">
            <a href="product.html?id=${prod.id}" style="text-decoration: none; color: inherit;">${prod.name}</a>
          </h3>
          <div class="product-rating">
            <div class="rating-stars" aria-label="${prod.rating} stars">${starsHtml}</div>
            <span class="rating-text">(${prod.reviews})</span>
          </div>
          <div class="price-container mb-2">
            <span class="price-current">₹${prod.price.toLocaleString('en-IN')}</span>
            ${prod.oldPrice ? `<span class="price-old">₹${prod.oldPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Note: .btn-wishlist and .btn-add-to-cart are handled globally
  // by initWishlistToggle() and initCartListeners() in components.js
}
