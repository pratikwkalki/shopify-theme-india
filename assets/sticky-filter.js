function stickyFilter () {
  if (!window.matchMedia("(min-width: 1025px)").matches) {
    return;
  }

  const navBar = document.getElementById("sideNav");
  if (!navBar) return;
  
  const header = document.querySelector("header");
  const targetSection = document.querySelector(".Collection_product_grid_inner_new");
  const footer = document.querySelector(".shopify-section-group-footer-group");
  const scrollElm = document.querySelector(".collection_left_new");
  const navBarText = document.getElementById("custom-active-facets");
  const productGrid = document.getElementById("ProductGridContainer");

  if (!header || !targetSection || !footer || !productGrid) {
    return;
  }

  function handleScroll() {
    const navHeight = navBar.getBoundingClientRect().height;
    const productGridHeight = productGrid.getBoundingClientRect().height;
     console.log('navHeight', navHeight)
    console.log('productGridHeight', productGridHeight)
    // ✅ Stop if productGrid is shorter than sidebar
    if (productGridHeight < navHeight) {
      navBar.classList.remove("navScrolled");
      scrollElm?.classList.remove("collection_left_new1");
      navBarText?.classList.remove("filtertitle");
      productGrid?.classList.remove("blokmargin");
      return;
    }

    const sectionRect = targetSection.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const sectionVisible = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;
    const hasReachedHeader = sectionRect.top <= headerRect.bottom;
    const footerVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0;
   
    if (sectionVisible && hasReachedHeader && !footerVisible) {
      navBar.classList.add("navScrolled");
      scrollElm?.classList.add("collection_left_new1");
      navBarText?.classList.add("filtertitle");
      productGrid?.classList.add("blokmargin");
    } else {
      navBar.classList.remove("navScrolled");
      scrollElm?.classList.remove("collection_left_new1");
      navBarText?.classList.remove("filtertitle");
      productGrid?.classList.remove("blokmargin");
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", stickyFilter);