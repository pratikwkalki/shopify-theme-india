
const ctabtnwrapper = document.querySelector('.product_details .product-form__submit');
const stickAddToCartBtn =  document.querySelector('[js-pdp-stick-addToCart-btn]');
const stickAddToCartBtnStitched =  document.querySelector('[js-pdp-stick-addtocart-btn-stitched]');
const productForm = document.querySelector("product-form");
const variantSelects = document.querySelector("variant-selects");
const announcementBar = document.querySelector(".Header_announcement_bar_main_new");
const Header = document.querySelector(".header-wrapper");
const stickBuyNowBtn =  document.querySelector('[data-buy-now]');
const stickBuyNowBtnDone =  document.querySelector('[data-buy-now-done]');

  function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

if(ctabtnwrapper) {
    window.addEventListener('scroll', e => {
        if(window.scrollY > offset(ctabtnwrapper).top) {
            document.body.classList.add('scrolled-past-header-body');
            document.querySelector('[js-pdp-sticky-addtocart-wrapper]').style.bottom = 0;
        } else {
            document.body.classList.remove('scrolled-past-header-body');
            document.querySelector('[js-pdp-sticky-addtocart-wrapper]').style.bottom = "-100%";
        }
    });
    if (window.innerWidth > 767) {
      stickAddToCartBtn.addEventListener('click', () => {
          ctabtnwrapper.click();
          setTimeout(() => // this changes the scrolling behavior to "smooth"
          {
              const headerGroupHeight = ((announcementBar?.clientHeight || 0) + Header.clientHeight);
              const scrollVal = (window.scrollY + variantSelects.getBoundingClientRect().top) - headerGroupHeight;
              console.log('scrollVal', scrollVal)
              window.scrollTo({ top: scrollVal, behavior: 'smooth' })
          }
          , 500)
      })
    }
  function stickyContentChange(currentVarient) {
        if(currentVarient) {
            document.querySelector('[js-pdp-sticky-addToCart-option-label]').textContent = currentVarient.title;
            if(currentVarient.compare_at_price > 0)
            {
              document.querySelector('[js-pdp-sticky-compare-at-price]').textContent = '₹ ' + Math.round(currentVarient.compare_at_price / 100)
            }
            document.querySelectorAll('[js-pdp-original-price]').forEach(originalPrice => {
                originalPrice.textContent = '₹ ' + Math.round(currentVarient.price / 100)
            })
        }
    }
    
    document.addEventListener('sticky-cta-content:init', (e) => {
        stickyContentChange(e.detail)
    });
}


// sticky add to cart with variable popup
var popupTriggre = false
var checkVisibilityButton = false
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


function handleIntersection(entries, observer) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) {
      popupTriggre = true
    } else {
      popupTriggre = false
    }
  });
}
var observer = new IntersectionObserver(handleIntersection, {
  root: null, 
  threshold: 1
});
observer.observe(productForm);

function checkVisibility() {
  if (productForm && isElementInViewport(productForm)) {
    checkVisibilityButton = true;
  } else {
    checkVisibilityButton = false;
  }
}

const sizeInput = document.querySelectorAll('.o-Size .product-form__input_wrap');
function sizeFirstLineAddClass() {
  const firstChipTop = sizeInput[0].getBoundingClientRect().top;
  const firstRowChips = Array.from(sizeInput).filter(sizeInput => {
    return sizeInput.getBoundingClientRect().top === firstChipTop;
  });
  firstRowChips.forEach(sizeInput => {
    sizeInput.classList.add('size-first-row');
  });
}
function sizeFirstLineRemoveClass() {
  sizeInput.forEach(input => {
    input.classList.remove('size-first-row');
  });
}

function mobileStickyVar() {
   if (window.innerWidth <= 767) {
    const closePopup = document.querySelector("#closeSizePopup");
    checkVisibility();
     
    function openVariablePopup() {
      productForm.classList.add('sticky-variable');
      document.querySelector('body').classList.add('variable-popup-open');
      sizeFirstLineAddClass();
    }
   function openVariablePopupBuyNow() {
     document.querySelector('body').classList.add('sticky-variable-buy-open');
   }
   function closeVariablePopupBuyNow() {
     document.querySelector('body').classList.remove('sticky-variable-buy-open');
   }
    function closeVariablePopup() {
      productForm.classList.remove('sticky-variable'); 
      document.querySelector('body').classList.remove('variable-popup-open');
      sizeFirstLineRemoveClass();
    }
    function addToCart() {
      stickAddToCartBtn.addEventListener('click', () => {
        ctabtnwrapper.click();
      });
    }
    function BuyNowBtn() {
      const addToCartForm = document.querySelector('form[action$="/cart/add"]');
      if (!addToCartForm) return;
    
      if (addToCartForm.checkValidity()) {
        const refTimeStamp = Date.now();
        const upsellProducts = addToCartForm.querySelectorAll('[js-upsell-product] input:checked');
    
        if (upsellProducts.length > 0) {
          // 🟢 Add upsell products first
          const upsellFormData = new FormData();
          upsellProducts.forEach((elm, index) => {
            const id = elm.dataset.productId;
            if (id) {
              upsellFormData.append(`items[${index}][id]`, Number(id));
              upsellFormData.append(`items[${index}][quantity]`, 1);
              upsellFormData.append(`items[${index}][properties][_ref_id]`, refTimeStamp);
            }
          });
    
          fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            body: upsellFormData
          })
            .then((res) => res.json())
            .then(() => {
              // 🟢 Add main product after upsells
              setTimeout(() => {
                const mainFormData = new FormData(addToCartForm);
                mainFormData.append('items[0][properties][_ref_id]', refTimeStamp);
    
                fetch(window.Shopify.routes.root + 'cart/add.js', {
                  method: 'POST',
                  body: mainFormData
                })
                  .then((res) => res.json())
                  .then(() => {
                    window.location.href = '/checkout';
                  })
                  .catch((e) => console.error('❌ Error adding main product:', e));
              }, 300);
            })
            .catch((e) => console.error('❌ Error adding upsells:', e));
        } else {
          // 🔵 No upsells, add main product directly
          const mainFormData = new FormData(addToCartForm);
          fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            body: mainFormData
          })
            .then((res) => res.json())
            .then(() => {
              window.location.href = '/checkout';
            })
            .catch((e) => console.error('❌ Error adding main product:', e));
        }
      } else {
        addToCartForm.reportValidity();
      }
    }
     
     
    var inputChecked = false
    function checkInputs() {
        const radioButtons = productForm.querySelectorAll('input[type="radio"]');
        const isRadioSelected = Array.from(radioButtons).some(radio => radio.checked);
        const selectBoxes = productForm.querySelectorAll('select');
        const areSelectsSelected = Array.from(selectBoxes).every(select => select.value !== '');
        if (radioButtons.length > 0 || selectBoxes.length > 0) {
          if (!isRadioSelected || !areSelectsSelected) {
              inputChecked = true
          } else {
            inputChecked = false
          }
        }
    }
    
    if(ctabtnwrapper) {
      productForm.addEventListener('change', checkInputs);
      if (stickAddToCartBtnStitched) {
        stickAddToCartBtnStitched.addEventListener('click', () => {
          if (!popupTriggre && !checkVisibilityButton) {
            ctabtnwrapper.click();
            return;
          }
          checkInputs();
          openVariablePopup()
          addToCart()
        });
      }
      stickBuyNowBtn && stickBuyNowBtn.addEventListener('click', (e) => {
        if (productForm.querySelector("variant-selects")) {
          e.preventDefault();
          if (!popupTriggre && !checkVisibilityButton) {
            BuyNowBtn()
            return;
          }
          checkInputs();
          const Stitched = document.querySelector('.options-header.Stitched')
          const Mod = document.querySelector('.options-header[class*="Conf Size Options"]')
          if (Stitched && !productForm.classList.contains('sticky-variable')) {
            openVariablePopup();
            openVariablePopupBuyNow();
            stickBuyNowBtnDone.addEventListener('click', (e) => {
              BuyNowBtn()
            });
          } else {
            stickBuyNowBtn.click();
          }
          if (Mod && !productForm.classList.contains('sticky-variable')) {
            openVariablePopup();
            openVariablePopupBuyNow();
            BuyNowBtn()
          }
          if (inputChecked || ctabtnwrapper.classList.contains('unavailable-variant')) {
            openVariablePopup();
            openVariablePopupBuyNow();
            stickBuyNowBtnDone.addEventListener('click', (e) => {
              BuyNowBtn()
            });
          }
          if (inputChecked == false) {
            BuyNowBtn()
          }
          if (productForm.classList.contains('sticky-variable')) {
            var errorDiv = document.querySelector('.product-form__error-message-wrapper');
            var checkVisibility = setInterval(function() {
              if (!errorDiv.hasAttribute('hidden')) {
                  errorDiv.scrollIntoView({ behavior: 'smooth' });
                  clearInterval(checkVisibility);
              }
            }, 500);
          } else {
            setTimeout(() => {
                const headerGroupHeight = ((announcementBar?.clientHeight || 0) + Header.clientHeight);
                const scrollVal = (window.scrollY + variantSelects.getBoundingClientRect().top) - headerGroupHeight;
                window.scrollTo({ top: scrollVal, behavior: 'smooth' })
            }, 500)
          }
        } else {
          BuyNowBtn()
        }
      });
      
      stickAddToCartBtn.addEventListener('click', () => {
        if (!popupTriggre && !checkVisibilityButton) {
          ctabtnwrapper.click();
          return;
        }
        checkInputs();
        const Stitched = document.querySelector('.options-header.Stitched')
        const Mod = document.querySelector('.options-header[class*="Conf Size Options"]')
        if (Stitched && !productForm.classList.contains('sticky-variable')) {
          openVariablePopup();
          addToCart()
        } else {
          ctabtnwrapper.click();
        }
        if (Mod && !productForm.classList.contains('sticky-variable')) {
          openVariablePopup();
          addToCart()
        }
        if (inputChecked || ctabtnwrapper.classList.contains('unavailable-variant')) {
          openVariablePopup();
          addToCart()
        }
        if (inputChecked == false) {
          ctabtnwrapper.click();
        }
        if (productForm.classList.contains('sticky-variable')) {
          var errorDiv = document.querySelector('.product-form__error-message-wrapper');
          var checkVisibility = setInterval(function() {
            if (!errorDiv.hasAttribute('hidden')) {
                errorDiv.scrollIntoView({ behavior: 'smooth' });
                clearInterval(checkVisibility);
            }
          }, 500);
        } else {
          setTimeout(() => {
              const headerGroupHeight = ((announcementBar?.clientHeight || 0) + Header.clientHeight);
              const scrollVal = (window.scrollY + variantSelects.getBoundingClientRect().top) - headerGroupHeight;
              window.scrollTo({ top: scrollVal, behavior: 'smooth' })
          }, 500)
        }
      });
      closePopup.addEventListener('click', () => {
        closeVariablePopup();
        closeVariablePopupBuyNow()
        const varUnstitched = document.querySelector('.product-form__input input[type=radio][value="Unstitched"] + label')
        if (varUnstitched) {
          const x = window.scrollX;
          const y = window.scrollY;
          varUnstitched.click();
          window.scrollTo(x, y);
        }
      });
    }
 }
  
}
mobileStickyVar();
window.addEventListener("resize", mobileStickyVar);


var observerCartDrawer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === 'class') {
      var cartDrawer = document.querySelector('cart-drawer');
      
      if (cartDrawer.classList.contains('active')) {
        productForm.classList.remove('sticky-variable'); 
        document.querySelector('body').classList.remove('variable-popup-open');
        sizeFirstLineRemoveClass()
      }
    }
  });
});

observerCartDrawer.observe(document.querySelector('cart-drawer'), {
  attributes: true 
});
