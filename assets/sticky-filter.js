document.addEventListener("DOMContentLoaded",function(){if(!window.matchMedia("(min-width: 1025px)").matches)return;function e(e){for(const t of e){const e=document.getElementById(t);if(e)return e}return null}const t=document.getElementById("sideNav"),n=document.getElementById("custom-active-facets"),o=document.getElementById("shopify-section-sections--24341382168939__footer"),r=document.getElementById("ProductGridContainer"),d=document.getElementById("shopify-section-sections--24341382201707__header"),a=document.getElementById("shopify-section-sections--24341382201707__app_link_popup_dpWC4J"),i=document.getElementById("shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY"),l=e(["shopify-section-template--24423642333547__main","shopify-section-template--24341383086443__main"]),c=e(["shopify-section-template--24423642333547__offer_banner_new_dynamic_DpBCKJ","shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ"]),s=e(["shopify-section-template--24423642333547__html_category_highlighted_banners_7YdPPY","shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY"]),m=e(["shopify-section-template--24423642333547__collection_meta_banner_new_tai6tf","shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf"]),u=e(["shopify-section-template--24423642333547__collection_meta_columns_new_YyGhUJ","shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ"]),h=(d?d.offsetHeight:0)+(l?l.offsetHeight:0)+(c?c.offsetHeight:0)+(s?s.offsetHeight:0)+(m?m.offsetHeight:0)+(u?u.offsetHeight:0)+(a?a.offsetHeight:0)+(i?i.offsetHeight:0)-100;window.addEventListener("scroll",function(){const e=window.scrollY,p=e+window.innerHeight,f=o?o.offsetTop:1/0;p>=f?(t&&t.classList.remove("navScrolled"),n&&n.classList.remove("filtertitle"),r&&r.classList.remove("blokmargin")):e>h?(t&&t.classList.add("navScrolled"),n&&n.classList.add("filtertitle"),r&&r.classList.add("blokmargin")):(t&&t.classList.remove("navScrolled"),n&&n.classList.remove("filtertitle"),r&&r.classList.remove("blokmargin"))}),window.addEventListener("load",function(){t&&(t.scrollTop=0)});function p(){t&&(t.style.height=window.innerHeight-200+"px")}p(),window.addEventListener("resize",p)});




// document.addEventListener("DOMContentLoaded", function () {
//   if (!window.matchMedia("(min-width: 1025px)").matches) return;

//   function getFirstAvailable(ids) {
//     for (const id of ids) {
//       const el = document.getElementById(id);
//       if (el) return el;
//     }
//     return null;
//   }

//   const navBar = document.getElementById("sideNav"),
//         navBarText = document.getElementById("custom-active-facets"),
//         footer = document.getElementById("shopify-section-sections--24341382168939__footer"),
//         productGrid = document.getElementById("ProductGridContainer"),
//         header = document.getElementById("shopify-section-sections--24341382201707__header"),
//         popup = document.getElementById("shopify-section-sections--24341382201707__app_link_popup_dpWC4J"),
//         announcement = document.getElementById("shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY"),
//         ha = getFirstAvailable([
//           "shopify-section-template--24423642333547__main",
//           "shopify-section-template--24341383086443__main"
//         ]),
//         hb = getFirstAvailable([
//           "shopify-section-template--24423642333547__offer_banner_new_dynamic_DpBCKJ",
//           "shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ"
//         ]),
//         hc = getFirstAvailable([
//           "shopify-section-template--24423642333547__html_category_highlighted_banners_7YdPPY",
//           "shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY"
//         ]),
//         hd = getFirstAvailable([
//           "shopify-section-template--24423642333547__collection_meta_banner_new_tai6tf",
//           "shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf"
//         ]),
//         he = getFirstAvailable([
//           "shopify-section-template--24423642333547__collection_meta_columns_new_YyGhUJ",
//           "shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ"
//         ]);

//   const totalHeight =
//     (header ? header.offsetHeight : 0) +
//     (ha ? ha.offsetHeight : 0) +
//     (hb ? hb.offsetHeight : 0) +
//     (hc ? hc.offsetHeight : 0) +
//     (hd ? hd.offsetHeight : 0) +
//     (he ? he.offsetHeight : 0) +
//     (popup ? popup.offsetHeight : 0) +
//     (announcement ? announcement.offsetHeight : 0) - 100;

//   window.addEventListener("scroll", function () {
//     const scrollY = window.scrollY;
//     const scrollBottom = scrollY + window.innerHeight;
//     const footerTop = footer ? footer.offsetTop : Infinity;

//     if (scrollBottom >= footerTop) {
//       navBar?.classList.remove("navScrolled");
//       navBarText?.classList.remove("filtertitle");
//       productGrid?.classList.remove("blokmargin");
//     } else if (scrollY > totalHeight) {
//       navBar?.classList.add("navScrolled");
//       navBarText?.classList.add("filtertitle");
//       productGrid?.classList.add("blokmargin");
//     } else {
//       navBar?.classList.remove("navScrolled");
//       navBarText?.classList.remove("filtertitle");
//       productGrid?.classList.remove("blokmargin");
//     }
//   });

//   window.addEventListener("load", function () {
//     if (navBar) navBar.scrollTop = 0;
//   });

//   function adjustHeight() {
//     if (navBar) navBar.style.height = (window.innerHeight - 200) + "px";
//   }

//   adjustHeight();
//   window.addEventListener("resize", adjustHeight);
// });





// document.addEventListener("DOMContentLoaded", function () {
//   if (!window.matchMedia("(min-width: 1025px)").matches) return;

//   // Helper: pick the first existing element from an array of IDs
//   function getFirstAvailableElement(ids) {
//     for (const id of ids) {
//       const el = document.getElementById(id);
//       if (el) return el;
//     }
//     return null;
//   }

//   const navBar         = document.getElementById("sideNav");
//   const navBarText     = document.getElementById("custom-active-facets");
//   const navBarFooter   = document.getElementById("shopify-section-sections--24341382168939__footer");
//   const ProductContent = document.getElementById("ProductGridContainer");
//   const header         = document.getElementById("shopify-section-sections--24341382201707__header");
//   const hf             = document.getElementById("shopify-section-sections--24341382201707__app_link_popup_dpWC4J");
//   const hg             = document.getElementById("shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY");

//   // Use getFirstAvailableElement to replace all your `||` chains
//   const ha = getFirstAvailableElement([
//     "shopify-section-template--24423642333547__main",
//     "shopify-section-template--24341383086443__main"
//   ]);
//   const hb = getFirstAvailableElement([
//     "shopify-section-template--24423642333547__offer_banner_new_dynamic_DpBCKJ",
//     "shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ"
//   ]);
//   const hc = getFirstAvailableElement([
//     "shopify-section-template--24423642333547__html_category_highlighted_banners_7YdPPY",
//     "shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY"
//   ]);
//   const hd = getFirstAvailableElement([
//     "shopify-section-template--24423642333547__collection_meta_banner_new_tai6tf",
//     "shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf"
//   ]);
//   const he = getFirstAvailableElement([
//     "shopify-section-template--24423642333547__collection_meta_columns_new_YyGhUJ",
//     "shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ"
//   ]);

//   // Compute cumulative height
//   const hdrH = header?.offsetHeight || 0;
//   const haH  = ha?.offsetHeight     || 0;
//   const hbH  = hb?.offsetHeight     || 0;
//   const hcH  = hc?.offsetHeight     || 0;
//   const hdH  = hd?.offsetHeight     || 0;
//   const heH  = he?.offsetHeight     || 0;
//   const hfH  = hf?.offsetHeight     || 0;
//   const hgH  = hg?.offsetHeight     || 0;
//   const allHeight = hdrH + haH + hbH + hcH + hdH + heH  + hfH + hgH - 100;

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
//     navBar && (navBar.scrollTop = 0);
//   });

//   // Set sideNav height and update on resize
//   function setNavHeight() {
//     if (!navBar) return;
//     const h = window.innerHeight - 200;
//     navBar.style.height = `${h}px`;
//   }
//   setNavHeight();
//   window.addEventListener("resize", setNavHeight);
// });















// document.addEventListener("DOMContentLoaded", function () {
//   if (window.matchMedia("(min-width: 1024px)").matches) {

//     var navBar = document.getElementById("sideNav");
//     var navBarText = document.getElementById("custom-active-facets");
//     var navBarFooter = document.getElementById("shopify-section-sections--24341382168939__footer");

//     var ProductContentBlock = document.getElementById("ProductGridContainer");
//     var header = document.getElementById("shopify-section-sections--24341382201707__header");
//     var ha = document.getElementById("shopify-section-template--24341383086443__main") ;
//     var hb = document.getElementById("shopify-section-template--24341383086443__offer_banner_new_dynamic_DpBCKJ");
//     var hc = document.getElementById("shopify-section-template--24341383086443__html_category_highlighted_banners_7YdPPY");
//     var hd = document.getElementById("shopify-section-template--24341383086443__collection_meta_banner_new_tai6tf");
//     var he = document.getElementById("shopify-section-template--24341383086443__collection_meta_columns_new_YyGhUJ");
//     var hf = document.getElementById("shopify-section-sections--24341382201707__app_link_popup_dpWC4J");
//     var hg = document.getElementById("shopify-section-sections--24341382201707__header_announcement_bar_new_UBfXFY");

    

//     var hdrHeight = header?.offsetHeight || 0;
//     var ha1 = ha?.offsetHeight || 0;
//     var hb1 = hb?.offsetHeight || 0;
//     var hc1 = hc?.offsetHeight || 0;
//     var hd1 = hd?.offsetHeight || 0;
//     var he1 = he?.offsetHeight || 0;
//     var hf1 = he?.offsetHeight || 0;
//     var hg1 = he?.offsetHeight || 0;

//     var allheight = hdrHeight + ha1 + hb1 + hc1 + hd1 + he1 + hf1 + hg1 - 880;
//     console.log(allheight);

//     window.addEventListener("scroll", function () {
//       var scrollY = window.scrollY;
//       var scrollBottom = scrollY + window.innerHeight;
//       var footerTop = navBarFooter.offsetTop;

//       if (scrollBottom >= footerTop) {
//         navBar.classList.remove("navScrolled");
//         navBarText.classList.remove("filtertitle");
//         ProductContentBlock.classList.remove("blokmargin");
//       } else if (scrollY > allheight) {
//         navBar.classList.add("navScrolled");
//         navBarText.classList.add("filtertitle");
//         ProductContentBlock.classList.add("blokmargin");
//       } else {
//         navBar.classList.remove("navScrolled");
//         navBarText.classList.remove("filtertitle");
//         ProductContentBlock.classList.remove("blokmargin");
//       }
//     });

//     window.addEventListener('load', function () {
//       const sideNav = document.getElementById('sideNav');
//       if (sideNav) {
//         sideNav.scrollTop = 0;
//       }
//     });

//     function checkHeight() {
//       const element = document.getElementById('sideNav');
//       if (!element) return;

//       const calculatedHeight = window.innerHeight - 200;      

//       element.style.height = `${calculatedHeight}px`;
//     }

//     checkHeight();
//     window.addEventListener('resize', checkHeight);
//   }
// });