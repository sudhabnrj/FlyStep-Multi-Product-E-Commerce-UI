/* ----------------------------------------------------
   FlyStep - Sports Shoes E-Commerce Product Listing Page Javascript
   Version: 1.0 (Iteration 1)
   ---------------------------------------------------- */

// PLP Specific Shoe Catalog (6 core products matching specification)
const PLP_PRODUCTS = [
  {
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
    sizes: [7, 8, 9, 10, 11],
    colors: ['blue', 'black'],
    gender: 'Men',
    sportsType: 'Track',
    availability: 'instock',
    discountVal: 16
  },
  {
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
    sizes: [6, 7, 8, 9, 10],
    colors: ['white', 'orange', 'green'],
    gender: 'Unisex',
    sportsType: 'Track',
    availability: 'instock',
    discountVal: 14
  },
  {
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
    sizes: [7, 8, 9, 10, 11],
    colors: ['black', 'white'],
    gender: 'Men',
    sportsType: 'Street',
    availability: 'instock',
    discountVal: 20
  },
  {
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
    sizes: [8, 9, 10, 11],
    colors: ['black', 'green'],
    gender: 'Men',
    sportsType: 'Trail',
    availability: 'outofstock',
    discountVal: 18
  },
  {
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
    sizes: [6, 7, 8, 9, 10],
    colors: ['black', 'blue'],
    gender: 'Women',
    sportsType: 'Gym',
    availability: 'instock',
    discountVal: 12
  },
  {
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
    sizes: [7, 8, 9, 10, 11],
    colors: ['green', 'red', 'white'],
    gender: 'Unisex',
    sportsType: 'Track',
    availability: 'instock',
    discountVal: 16
  }
];

// Active State Settings
let activeFilters = {
  categories: [],
  gender: [],
  maxPrice: 8000,
  sizes: [],
  colors: [],
  sportsTypes: [],
  availability: [],
  ratings: [],
  discounts: []
};

let currentSort = 'newest';
let currentViewMode = 'grid'; // grid or list

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSortAndLayout();
  initProductCardClicks();
  
  // Initial draw
  renderProducts();
  renderRecentlyViewed();
});

/**
 * Attaches filter control listeners (checkboxes, color swatches, sizes)
 */
function initFilters() {
  // Category checks
  document.querySelectorAll('.filter-category-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleArrayVal(activeFilters.categories, cb.value);
      renderProducts();
    });
  });

  // Gender checks
  document.querySelectorAll('.filter-gender-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleArrayVal(activeFilters.gender, cb.value);
      renderProducts();
    });
  });

  // Sports type checks
  document.querySelectorAll('.filter-sports-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleArrayVal(activeFilters.sportsTypes, cb.value);
      renderProducts();
    });
  });

  // Availability checks
  document.querySelectorAll('.filter-stock-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleArrayVal(activeFilters.availability, cb.value);
      renderProducts();
    });
  });

  // Rating checks
  document.querySelectorAll('.filter-rating-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleArrayVal(activeFilters.ratings, parseFloat(cb.value));
      renderProducts();
    });
  });

  // Discount checks
  document.querySelectorAll('.filter-discount-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      toggleArrayVal(activeFilters.discounts, parseInt(cb.value));
      renderProducts();
    });
  });

  // Price range slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceValueLabel = document.getElementById('priceRangeValue');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      activeFilters.maxPrice = val;
      if (priceValueLabel) {
        priceValueLabel.textContent = `₹${val.toLocaleString('en-IN')}`;
      }
      renderProducts();
    });
  }

  // Size buttons multi-toggle
  document.querySelectorAll('.filter-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sizeVal = parseInt(btn.getAttribute('data-size'));
      btn.classList.toggle('active');
      toggleArrayVal(activeFilters.sizes, sizeVal);
      renderProducts();
    });
  });

  // Color swatches multi-toggle
  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const colorVal = btn.getAttribute('data-color');
      btn.classList.toggle('active');
      toggleArrayVal(activeFilters.colors, colorVal);
      renderProducts();
    });
  });

  // Reset Filters trigger
  document.querySelectorAll('.btn-reset-filters').forEach(btn => {
    btn.addEventListener('click', () => {
      resetAllFilters();
    });
  });
}

function toggleArrayVal(arr, val) {
  const idx = arr.indexOf(val);
  if (idx === -1) {
    arr.push(val);
  } else {
    arr.splice(idx, 1);
  }
}

function resetAllFilters() {
  activeFilters = {
    categories: [],
    gender: [],
    maxPrice: 8000,
    sizes: [],
    colors: [],
    sportsTypes: [],
    availability: [],
    ratings: [],
    discounts: []
  };

  // Reset checkboxes
  document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);

  // Reset price range slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceValueLabel = document.getElementById('priceRangeValue');
  if (priceSlider) {
    priceSlider.value = 8000;
    if (priceValueLabel) priceValueLabel.textContent = '₹8,000';
  }

  // Reset active buttons
  document.querySelectorAll('.filter-size-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.color-swatch-btn').forEach(btn => btn.classList.remove('active'));

  renderProducts();
}

/**
 * Hooks sort dropdown selections and Grid/List toggle selectors
 */
function initSortAndLayout() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Grid view click
  const gridBtn = document.getElementById('gridViewBtn');
  const listBtn = document.getElementById('listViewBtn');
  const gridContainer = document.getElementById('productGrid');

  if (gridBtn && listBtn && gridContainer) {
    gridBtn.addEventListener('click', () => {
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      gridContainer.classList.remove('product-list-view');
      currentViewMode = 'grid';
      renderProducts();
    });

    listBtn.addEventListener('click', () => {
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      gridContainer.classList.add('product-list-view');
      currentViewMode = 'list';
      renderProducts();
    });
  }
}

/**
 * Filter, sort, and render cards inside Grid container
 */
function renderProducts() {
  const container = document.getElementById('productGrid');
  const countLabel = document.getElementById('productCountLabel');
  if (!container) return;

  // 1. FILTERING
  let filtered = PLP_PRODUCTS.filter(prod => {
    // Category check
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(prod.category)) {
      return false;
    }
    // Gender check
    if (activeFilters.gender.length > 0 && !activeFilters.gender.includes(prod.gender)) {
      return false;
    }
    // Price check
    if (prod.price > activeFilters.maxPrice) {
      return false;
    }
    // Size check
    if (activeFilters.sizes.length > 0) {
      const matchSize = prod.sizes.some(s => activeFilters.sizes.includes(s));
      if (!matchSize) return false;
    }
    // Color check
    if (activeFilters.colors.length > 0) {
      const matchColor = prod.colors.some(c => activeFilters.colors.includes(c));
      if (!matchColor) return false;
    }
    // Sports Type check
    if (activeFilters.sportsTypes.length > 0 && !activeFilters.sportsTypes.includes(prod.sportsType)) {
      return false;
    }
    // Availability check
    if (activeFilters.availability.length > 0 && !activeFilters.availability.includes(prod.availability)) {
      return false;
    }
    // Rating check
    if (activeFilters.ratings.length > 0) {
      const matchRating = activeFilters.ratings.some(r => prod.rating >= r);
      if (!matchRating) return false;
    }
    // Discount check
    if (activeFilters.discounts.length > 0) {
      const matchDiscount = activeFilters.discounts.some(d => prod.discountVal >= d);
      if (!matchDiscount) return false;
    }
    return true;
  });

  // 2. SORTING
  if (currentSort === 'price-low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'highest-rated') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'popularity' || currentSort === 'best-selling') {
    filtered.sort((a, b) => b.reviews - a.reviews);
  } else if (currentSort === 'newest' || currentSort === 'newest-arrival') {
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  }

  // Update Count
  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} of ${PLP_PRODUCTS.length} Products`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search display-4 text-muted mb-3 d-block"></i>
        <h4 class="fw-bold text-muted">No Products Match Your Filters</h4>
        <p class="text-muted">Try resetting or modifying filter criteria.</p>
        <button class="btn btn-primary mt-2" onclick="resetAllFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  // 3. GENERATE MARKUP
  const cardsHtml = filtered.map(prod => {
    return generateProductCardHtml(prod, currentViewMode, true);
  }).join('');

  container.innerHTML = cardsHtml;
}

/**
 * Generates the HTML for a single product card
 * @param {Object} prod - Product data
 * @param {string} viewMode - 'grid' or 'list'
 * @param {boolean} includeColWrapper - Whether to wrap in a grid column div
 * @returns {string} Card HTML
 */
function generateProductCardHtml(prod, viewMode, includeColWrapper = true) {
  // Star rating markup
  const fullStars = Math.floor(prod.rating);
  const halfStar = prod.rating % 1 !== 0;
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

  // Color Swatches HTML
  const colorSwatchesHtml = prod.colors.map(col => `
    <span class="color-dot swatch-${col}" style="background-color: ${col}; width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,0.15);" title="${col}"></span>
  `).join('');

  // Stock tag
  const stockTag = prod.availability === 'instock' 
    ? '<span class="badge-stock badge-instock"><i class="bi bi-check-circle-fill"></i> In Stock</span>'
    : '<span class="badge-stock badge-outofstock"><i class="bi bi-x-circle-fill"></i> Out of Stock</span>';

  // Pricing details
  const priceOldHtml = prod.oldPrice ? `<span class="price-old">₹${prod.oldPrice.toLocaleString('en-IN')}</span>` : '';
  const discountBadgeHtml = prod.discount ? `<span class="badge-discount">${prod.discount}</span>` : '';

  // Grid view cart button (overlay on image hover)
  const gridCartHtml = viewMode === 'grid' 
    ? `
      <div class="product-hover-cart">
        <button class="btn btn-accent btn-add-to-cart text-center py-2" data-product-id="${prod.id}" data-product-name="${prod.name}" type="button" ${prod.availability === 'outofstock' ? 'disabled' : ''}>
          <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
        </button>
      </div>
    `
    : '';

  // List view details (Add to Cart side-by-side with price)
  const infoSectionHtml = viewMode === 'list'
    ? `
      <span class="product-cat">${prod.category}</span>
      <h3 class="product-name">${prod.name}</h3>
      
      <div class="product-rating">
        <div class="rating-stars" aria-label="${prod.rating} stars rating">
          ${starsHtml}
        </div>
        <span class="rating-text">(${prod.reviews})</span>
      </div>

      <div class="price-btn-wrapper d-flex justify-content-between align-items-center w-100 mb-3 mt-auto">
        <div class="price-container mb-0 mt-0">
          <span class="price-current">₹${prod.price.toLocaleString('en-IN')}</span>
          ${priceOldHtml}
        </div>
        <div class="product-hover-cart-list">
          <button class="btn btn-accent btn-add-to-cart text-center py-2" data-product-id="${prod.id}" data-product-name="${prod.name}" type="button" ${prod.availability === 'outofstock' ? 'disabled' : ''}>
            <i class="bi bi-bag-plus" aria-hidden="true"></i> Add to Cart
          </button>
        </div>
      </div>
      
      <div class="d-flex justify-content-between align-items-center w-100 border-top pt-2 mt-auto">
        <div class="d-flex gap-1">
          ${colorSwatchesHtml}
        </div>
        <span class="text-muted" style="font-size: 0.75rem;">Sizes: ${prod.sizes.join(', ')}</span>
      </div>
    `
    : `
      <span class="product-cat">${prod.category}</span>
      <h3 class="product-name">${prod.name}</h3>
      
      <div class="product-rating">
        <div class="rating-stars" aria-label="${prod.rating} stars rating">
          ${starsHtml}
        </div>
        <span class="rating-text">(${prod.reviews})</span>
      </div>

      <div class="price-container mb-2">
        <span class="price-current">₹${prod.price.toLocaleString('en-IN')}</span>
        ${priceOldHtml}
      </div>
      
      <div class="d-flex justify-content-between align-items-center w-100 border-top pt-2">
        <div class="d-flex gap-1">
          ${colorSwatchesHtml}
        </div>
        <span class="text-muted" style="font-size: 0.75rem;">Sizes: ${prod.sizes.join(', ')}</span>
      </div>
    `;

  const gridClasses = viewMode === 'grid' ? 'col-6 col-md-4 col-lg-4' : 'col-12';

  const cardMarkup = `
    <article class="product-card">
      <div class="product-img-wrapper">
        ${discountBadgeHtml}
        <div class="product-actions-top-right">
          <button type="button" class="btn-wishlist" data-product-id="${prod.id}" aria-label="Add ${prod.name} to Wishlist">
            <i class="bi bi-heart" aria-hidden="true"></i>
          </button>
          <button type="button" class="btn-quickview" data-product-id="${prod.id}" data-bs-toggle="modal"
            data-bs-target="#quickViewModal" aria-label="Quick View ${prod.name}">
            <i class="bi bi-eye" aria-hidden="true"></i>
          </button>
        </div>
        <img src="${prod.image}" alt="${prod.name} shoe image" class="product-img">
        ${stockTag}
        ${gridCartHtml}
      </div>
      <div class="product-info">
        ${infoSectionHtml}
      </div>
    </article>
  `;

  if (includeColWrapper) {
    return `<div class="${gridClasses}">${cardMarkup}</div>`;
  } else {
    return cardMarkup;
  }
}

/**
 * Dynamic caching and registration for Recently Viewed shoes
 */
function initProductCardClicks() {
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-quickview, .product-img, .product-name');
    if (!trigger) return;

    const card = trigger.closest('.product-card');
    if (!card) return;

    const wishlistBtn = card.querySelector('.btn-wishlist');
    if (!wishlistBtn) return;

    const productId = wishlistBtn.getAttribute('data-product-id');
    if (productId) {
      registerRecentlyViewed(productId);
      
      // Redirect to PDP page if clicking product image or title
      if (e.target.closest('.product-img, .product-name')) {
        window.location.href = `product.html?id=${productId}`;
      }
    }
  });
}

function registerRecentlyViewed(productId) {
  let viewed = JSON.parse(localStorage.getItem('flystep_recently_viewed')) || [];
  
  // Filter out existing and push to top
  viewed = viewed.filter(id => id !== productId);
  viewed.unshift(productId);

  // Limit to 5 items
  if (viewed.length > 5) {
    viewed.pop();
  }

  localStorage.setItem('flystep_recently_viewed', JSON.stringify(viewed));
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  const container = document.getElementById('recentlyViewedContainer');
  if (!container) return;

  const viewedIds = JSON.parse(localStorage.getItem('flystep_recently_viewed')) || [];

  if (viewedIds.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-4 text-muted">
        <i class="bi bi-clock-history mb-2 d-block fs-4"></i>
        No recently viewed items yet.
      </div>
    `;
    return;
  }

  // Load viewed products
  const viewedProducts = viewedIds.map(id => {
    // Search inside PLP catalogue or standard CATALOGUE
    return PLP_PRODUCTS.find(p => p.id === id);
  }).filter(p => p !== undefined);

  if (viewedProducts.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-4 text-muted">
        No recently viewed items yet.
      </div>
    `;
    return;
  }

  const listHtml = viewedProducts.map(prod => {
    return generateProductCardHtml(prod, 'grid', false);
  }).join('');

  container.innerHTML = listHtml;
}
