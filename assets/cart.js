class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0);
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement =
      document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');

    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);

    this.addEventListener('change', debouncedOnChange.bind(this));
    document.addEventListener("DOMContentLoaded", () => {
    this.checkAndRemoveOrphanUpsells();
    });
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') {
        return;
      }
      this.onCartUpdate();
    });
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  onChange(event) {
    if(event.target.closest('cart-upsell')) return
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'), event.target.dataset.quantityVariantId, event.target);
  }

  onCartUpdate() {
    if (this.tagName === 'CART-DRAWER-ITEMS') {
      fetch(`${routes.cart_url}?section_id=cart-drawer`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const selectors = ['cart-drawer-items', '.cart-drawer__footer'];
          for (const selector of selectors) {
            const targetElement = document.querySelector(selector);
            const sourceElement = html.querySelector(selector);
            if (targetElement && sourceElement) {
              targetElement.replaceWith(sourceElement);
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      fetch(`${routes.cart_url}?section_id=main-cart-items`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const sourceQty = html.querySelector('cart-items');
          this.innerHTML = sourceQty.innerHTML;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'main-sub-cartfooter',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.cart__blocks-totals',
      },
      {
        id: 'main-cart-footer-inner',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.cart__footer'
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      },
    ];
  }


  updateQuantity(line, quantity, name, variantId, targetElement_) {

    let drawer = this.querySelector('#CartDrawer-CartItems')
    let formData = new FormData();
    let intendedProduct;

    if(drawer) {
      intendedProduct = drawer.querySelector(`#CartDrawer-Item-${line}`)
    } else {
      intendedProduct = this.querySelector(`#main-cart-items #CartItem-${line}`)
    }

    let checkUpsell=  intendedProduct.querySelector(`.cart-item__details .product-option[data-property-first="_ref_id"]`)

    let targetElmInput;
    if(targetElement_) {
      targetElmInput = targetElement_?.classList.contains('quantity__input')
    } else {
      targetElmInput = !targetElement_?.classList.contains('quantity__input')
    }
    
    if(checkUpsell && intendedProduct.querySelector('[js-main-product]') && targetElmInput) {
      let ref_id_ = intendedProduct.querySelector('.cart-item__details .product-option[data-property-first="_ref_id"]').getAttribute('data-property-last')
      let availableSameRef = this.querySelectorAll(`.cart-item__details .product-option[data-property-first="_ref_id"][data-property-last='${ref_id_}']`)

      availableSameRef.forEach(el => {
        let elm_ = el.closest('[js-cart-item-details]')
        formData.append(`updates[${elm_.dataset.lineItemKey}]`,quantity)
      })
    } else {
      formData.append(`updates[${intendedProduct.querySelector('[js-cart-item-details]').dataset.lineItemKey}]`,quantity)

    }
 
    formData.append('sections',this.getSectionsToRender().map((section) => section.section))
    formData.append('sections_url', window.location.pathname)


    this.enableLoading(line);

    const config = fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];

    config.body = formData

    fetch(`${routes.cart_update_url}`, config)
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        const quantityElement =
          document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
        const items = document.querySelectorAll('.cart-item');
       
        if (parsedState.message) {
          const errorMessage = "The requested qty is not available";
          quantityElement.value = quantityElement.getAttribute('value');
          this.updateLiveRegions(line, errorMessage);
          return;
        }

        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });
        
        // update cart title number
        const titleCount = document.querySelector('.cart-wrapper .title--primary b');
        if (titleCount && parsedState.item_count !== undefined) {
          titleCount.textContent = `(${parsedState.item_count})`;
        }
        
        const updatedValue = parsedState.items[line - 1] ? parsedState.items[line - 1].quantity : undefined;
        let message = '';
        if (items.length === parsedState.items.length && updatedValue !== parseInt(quantityElement.value)) {
          if (typeof updatedValue === 'undefined') {
            message = window.cartStrings.error;
          } else {
            message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
          }
        }
        this.updateLiveRegions(line, message);

        const lineItem =
          document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper
            ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`))
            : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'));
        }
        attachEventDatePickerListener();
        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cartData: parsedState, variantId: variantId });
      })
      .catch(() => {
        this.querySelectorAll('.loading__spinner').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
      })
      .finally(() => {
        this.disableLoading(line);
      });
}
 
  updateLiveRegions(line, message) {
    console.log('updateLiveRegions');
    const lineItemError =
      document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
    if (lineItemError) lineItemError.querySelector('.cart-item__error-text').innerHTML = message;

    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus =
      document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    cartItemElements.forEach((overlay) => overlay.classList.add('hidden'));
    cartDrawerItemElements.forEach((overlay) => overlay.classList.add('hidden'));
  }

  // ✅ New Method: Automatically Remove Upsell Without Main Product
  checkAndRemoveOrphanUpsells() {
    const cartItems = this.querySelectorAll('[js-cart-item-details]');
    const mainProductRefIds = new Set();

    // Collect _ref_id from all main products
    cartItems.forEach(item => {
      const isMain = item.querySelector('[js-main-product]');
      const refEl = item.querySelector('.product-option[data-property-first="_ref_id"]');
      if (isMain && refEl) {
        console.log('testing 1')
        mainProductRefIds.add(refEl.getAttribute('data-property-last'));
      }
    });

    // Remove upsell items if their main product is missing
    cartItems.forEach(item => {
      const isMain = item.querySelector('[js-main-product]');
      const refEl = item.querySelector('.product-option[data-property-first="_ref_id"]');

      if (!isMain && refEl) {
        console.log('testing 2')
        const refId = refEl.getAttribute('data-property-last');
        const lineItemKey = item.dataset.lineItemKey;

        if (!mainProductRefIds.has(refId)) {
          const formData = new FormData();
          formData.append(`updates[${lineItemKey}]`, 0);
          formData.append('sections_url', window.location.pathname);

          fetch(`${routes.cart_update_url}`, {
            method: 'POST',
            body: formData,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          }).then(() => this.onCartUpdate());
        }
      }
    });
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define(
    'cart-note',
    class CartNote extends HTMLElement {
      constructor() {
        super();

        this.addEventListener(
          'input',
          debounce((event) => {
            const body = JSON.stringify({ note: event.target.value });
            fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
          }, ON_CHANGE_DEBOUNCE_TIMER)
        );
      }
    }
  );
}

function addBusinessDaysCart(originalDate, numDaysToAdd) {
  const Sunday = 0;
  let daysRemaining = numDaysToAdd;
  const newDate = originalDate.clone();

  while (daysRemaining > 0) {
    newDate.add(1, 'days');
    if (newDate.day() !== Sunday) {
      daysRemaining--;
    }
  }

  return newDate;
}

function updateCartEstimatedDeliverySequentially(items, index = 0, deliveryUpdated = false) {
  if (index >= items.length) {
    if (deliveryUpdated) {
      window.location.reload(); // Refresh cart if any updates happened
    }
    return Promise.resolve();
  }

  const item = items[index];

  // Get inventory from DOM
  const itemRows = document.querySelectorAll(`[data-line-item-key="${item.key}"]`);
  const itemRow = [...itemRows].find(el => el.dataset.inventory !== undefined);
  const rawInventory = itemRow?.dataset?.inventory ?? "0";
  const inventoryQty = parseInt(rawInventory || "0", 10);

  // Choose delivery days based on inventory
  let deliveryDays;
  if (inventoryQty !== null && inventoryQty <= 0) {
    deliveryDays = parseInt(item.properties["_Delivery days mto"], 10);
    if (isNaN(deliveryDays)) {
      deliveryDays = parseInt(item.properties["_Delivery days"], 10);
    }
  } else {
    deliveryDays = parseInt(item.properties["_Delivery days"], 10);
  }
  
  if (isNaN(deliveryDays)) {
    return updateCartEstimatedDeliverySequentially(items, index + 1, deliveryUpdated);
  }

  const originalDate = moment();
  const testDate = originalDate.clone().add(4, 'days');
  const newEstimatedDelivery = addBusinessDaysCart(originalDate, deliveryDays).format("dddd, DD MMM YYYY");

  // Only update if value actually changed
  const currentEstimate = (item.properties["Estimated delivery"] || "").trim().toLowerCase();
  const calculatedEstimate = newEstimatedDelivery.trim().toLowerCase();
  
  if (currentEstimate === calculatedEstimate) {
    return updateCartEstimatedDeliverySequentially(items, index + 1, deliveryUpdated);
  }
  const updatedProperties = {
    ...item.properties,
    "Estimated delivery": newEstimatedDelivery
  };

  return fetch(`/cart/change.js?timestamp=${new Date().getTime()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: item.key,
      properties: updatedProperties
    })
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error ${response.status}`);
      return response.json();
    })
    .then(() => {
      // Re-fetch updated cart to get fresh keys
      return fetch(`/cart.js?timestamp=${new Date().getTime()}`)
        .then(res => res.json())
        .then(refetchedCart => {
          return updateCartEstimatedDeliverySequentially(refetchedCart.items, index + 1, true); // 🔁 Mark as updated
        });
    })
    .catch(error => {
      console.error("Error updating cart:", error);
      return updateCartEstimatedDeliverySequentially(items, index + 1, deliveryUpdated); // Continue with next
    });
}

function updateCartEstimatedDelivery() {
  fetch(`/cart.js?timestamp=${new Date().getTime()}`)
    .then(res => res.json())
    .then(cart => updateCartEstimatedDeliverySequentially(cart.items))
    .catch(err => console.error("Error fetching cart:", err));
}

// 🔁 Call once on page load
updateCartEstimatedDelivery();

