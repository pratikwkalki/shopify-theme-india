
document.addEventListener("DOMContentLoaded", function () {
  if (!window.matchMedia("(min-width: 1025px)").matches) return;

  function getFirstAvailable(ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  }

  const navBar = document.getElementById("sideNav"),
        navBarText = document.getElementById("custom-active-facets"),
        footer = document.getElementById("shopify-section-sections--24341382168939__footer"),
        productGrid = document.getElementById("ProductGridContainer"),
        header = document.getElementById("shopify-section-sections--24341382201707__header"),
        popup = document.getElementById("shopify-section-sections--24341382201707__app_link_popup_dpWC4J"),
        announcement = document.getElementById("shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY"),
        ha = getFirstAvailable([
          "shopify-section-template--24423642333547__main",
          "shopify-section-template--24341383086443__main"
        ]),
        hb = getFirstAvailable([
          "shopify-section-template--24423642333547__offer_banner_new_dynamic_DpBCKJ",
          "shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ"
        ]),
        hc = getFirstAvailable([
          "shopify-section-template--24423642333547__html_category_highlighted_banners_7YdPPY",
          "shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY"
        ]),
        hd = getFirstAvailable([
          "shopify-section-template--24423642333547__collection_meta_banner_new_tai6tf",
          "shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf"
        ]),
        he = getFirstAvailable([
          "shopify-section-template--24423642333547__collection_meta_columns_new_YyGhUJ",
          "shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ"
        ]);

  function getTotalHeight() {
    return (header ? header.offsetHeight : 0) +
           (ha ? ha.offsetHeight : 0) +
           (hb ? hb.offsetHeight : 0) +
           (hc ? hc.offsetHeight : 0) +
           (hd ? hd.offsetHeight : 0) +
           (he ? he.offsetHeight : 0) +
           (popup ? popup.offsetHeight : 0) +
           (announcement ? announcement.offsetHeight : 0) - 80;
  }

  let ticking = false;
  function handleScroll() {
    const scrollY = window.scrollY;
    const scrollBottom = scrollY + window.innerHeight;
    const footerTop = footer ? footer.offsetTop : Infinity;
    const totalHeight = getTotalHeight();

    if (scrollBottom >= footerTop) {
      navBar?.classList.remove("navScrolled");
      navBarText?.classList.remove("filtertitle");
      productGrid?.classList.remove("blokmargin");
    } else if (scrollY > totalHeight) {
      navBar?.classList.add("navScrolled");
      navBarText?.classList.add("filtertitle");
      productGrid?.classList.add("blokmargin");
    } else {
      navBar?.classList.remove("navScrolled");
      navBarText?.classList.remove("filtertitle");
      productGrid?.classList.remove("blokmargin");
    }
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  window.addEventListener("load", function () {
    if (navBar) navBar.scrollTop = 0;
  });

  function adjustHeight() {
    if (navBar) navBar.style.height = (window.innerHeight - 200) + "px";
  }

  adjustHeight();
  window.addEventListener("resize", adjustHeight);
});

