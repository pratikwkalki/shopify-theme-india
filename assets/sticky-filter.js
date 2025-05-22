// document.addEventListener("DOMContentLoaded", function () {
//   if (!window.matchMedia("(min-width: 1025px)").matches) return;

//   // Helper: return first existing element by ID
//   function getFirstAvailableElement(ids) {
//     for (const id of ids) {
//       const el = document.getElementById(id);
//       if (el) return el;
//     }
//     return null;
//   }

//   const navBar         = document.getElementById("sideNav");
//   const navBarText     = document.getElementById("custom-active-facets");
//   const navBarFooter   = document.getElementById("shopify-section-sections--24423642333547__footer");
//   const ProductContent = document.getElementById("ProductGridContainer");
//   const header         = document.getElementById("shopify-section-sections--24341382201707__header");
//   const hf             = getFirstAvailableElement([
//     "shopify-section-sections--24341382201707__app_link_popup_dpWC4J"
//   ]);
//   const hg             = getFirstAvailableElement([
//     "shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY"
//   ]);

//   const ha = getFirstAvailableElement([
//     "shopify-section-template--24341383086443__main",
//     "shopify-section-template--24423642333547__main"
//   ]);
//   const hb = getFirstAvailableElement([
//     "shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ",
//     "shopify-section-template--24423642333547__offer_banner_new_dynamic_DpBCKJ"
//   ]);
//   const hc = getFirstAvailableElement([
//     "shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY",
//     "shopify-section-template--24423642333547__html_category_highlighted_banners_7YdPPY"
//   ]);
//   const hd = getFirstAvailableElement([
//     "shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf",
//     "shopify-section-template--24423642333547__collection_meta_banner_new_tai6tf"
//   ]);
//   const he = getFirstAvailableElement([
//     "shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ",
//     "shopify-section-template--24423642333547__collection_meta_columns_new_YyGhUJ"
//   ]);

//   // Compute total offset height
//   const hdrH = header?.offsetHeight || 0;
//   const haH  = ha?.offsetHeight     || 0;
//   const hbH  = hb?.offsetHeight     || 0;
//   const hcH  = hc?.offsetHeight     || 0;
//   const hdH  = hd?.offsetHeight     || 0;
//   const heH  = he?.offsetHeight     || 0;
//   const hfH  = hf?.offsetHeight     || 0;
//   const hgH  = hg?.offsetHeight     || 0;
//   // adjust the final subtraction as needed (you had -880)
//   const allHeight = hdrH + haH + hbH + hcH + hdH + heH + hfH + hgH - 880;

//   // Scroll handler
//   window.addEventListener("scroll", function () {
//     const scrollY      = window.scrollY;
//     const scrollBottom = scrollY + window.innerHeight;
//     const footerTop    = navBarFooter?.offsetTop || Infinity;

//     if (scrollBottom >= footerTop) {
//       navBar.classList.remove("navScrolled");
//       navBarText.classList.remove("filtertitle");
//       ProductContent.classList.remove("blokmargin");
//     } else if (scrollY > allHeight) {
//       navBar.classList.add("navScrolled");
//       navBarText.classList.add("filtertitle");
//       ProductContent.classList.add("blokmargin");
//     } else {
//       navBar.classList.remove("navScrolled");
//       navBarText.classList.remove("filtertitle");
//       ProductContent.classList.remove("blokmargin");
//     }
//   });

//   // Reset sideNav scroll on full page load
//   window.addEventListener("load", function () {
//     if (navBar) navBar.scrollTop = 0;
//   });

//   // Set sideNav height and update on resize
//   function setNavHeight() {
//     if (!navBar) return;
//     navBar.style.height = `${window.innerHeight - 200}px`;
//   }
//   setNavHeight();
//   window.addEventListener("resize", setNavHeight);
// });



















document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(min-width: 1024px)").matches) {

    var navBar = document.getElementById("sideNav");
    var navBarText = document.getElementById("custom-active-facets");
    var navBarFooter = document.getElementById("shopify-section-sections--24341382168939__footer");

    var ProductContentBlock = document.getElementById("ProductGridContainer");
    var header = document.getElementById("shopify-section-sections--24341382201707__header");
    var ha = document.getElementById("shopify-section-template--24341383086443__main") ;
    var hb = document.getElementById("shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ");
    var hc = document.getElementById("shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY");
    var hd = document.getElementById("shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf");
    var he = document.getElementById("shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ");
    var hf = document.getElementById("shopify-section-sections--24341382201707__app_link_popup_dpWC4J");
    var hg = document.getElementById("shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY");

    

    var hdrHeight = header?.offsetHeight || 0;
    var ha1 = ha?.offsetHeight || 0;
    var hb1 = hb?.offsetHeight || 0;
    var hc1 = hc?.offsetHeight || 0;
    var hd1 = hd?.offsetHeight || 0;
    var he1 = he?.offsetHeight || 0;
    var hf1 = he?.offsetHeight || 0;
    var hg1 = he?.offsetHeight || 0;

    var allheight = hdrHeight + ha1 + hb1 + hc1 + hd1 + he1 + hf1 + hg1 - 880;
    console.log(allheight);

    window.addEventListener("scroll", function () {
      var scrollY = window.scrollY;
      var scrollBottom = scrollY + window.innerHeight;
      var footerTop = navBarFooter.offsetTop;

      if (scrollBottom >= footerTop) {
        navBar.classList.remove("navScrolled");
        navBarText.classList.remove("filtertitle");
        ProductContentBlock.classList.remove("blokmargin");
      } else if (scrollY > allheight) {
        navBar.classList.add("navScrolled");
        navBarText.classList.add("filtertitle");
        ProductContentBlock.classList.add("blokmargin");
      } else {
        navBar.classList.remove("navScrolled");
        navBarText.classList.remove("filtertitle");
        ProductContentBlock.classList.remove("blokmargin");
      }
    });

    window.addEventListener('load', function () {
      const sideNav = document.getElementById('sideNav');
      if (sideNav) {
        sideNav.scrollTop = 0;
      }
    });

    function checkHeight() {
      const element = document.getElementById('sideNav');
      if (!element) return;

      const calculatedHeight = window.innerHeight;      

      element.style.height = `${calculatedHeight}px`;
    }

    checkHeight();
    window.addEventListener('resize', checkHeight);
  }
});