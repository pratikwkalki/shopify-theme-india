document.addEventListener("DOMContentLoaded", function () {
  const filterForm         = document.querySelector('#FacetFiltersForm');
  const productGridSelector = ".Collection_product_grid_inner_new";

  function scrollToProductGrid() {
    const grid = document.querySelector(productGridSelector);
    if (!grid) return;

    // 1) Align at top…
    grid.scrollIntoView({ behavior: "smooth", block: "start" });

    // 2) …then pull up 200px after a short delay
    setTimeout(() => {
      window.scrollBy({ top: -200, behavior: "smooth" });
    }, 50);
  }

  function observeGridUpdateAndScroll() {
    const gridWrapper = document.querySelector(productGridSelector);
    if (!gridWrapper) return;

    const observer = new MutationObserver((mutations, obs) => {
      if (gridWrapper.innerHTML.trim().length > 0) {
        scrollToProductGrid();
        obs.disconnect();
      }
    });

    observer.observe(gridWrapper, { childList: true, subtree: true });
  }

  if (filterForm) {
    filterForm.addEventListener("change", observeGridUpdateAndScroll);
  }

  document.body.addEventListener("click", function (e) {
    const target = e.target;
    if (target.closest("facet-remove") || target.classList.contains("icon-close-small")) {
      observeGridUpdateAndScroll();
    }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const filterForm = document.querySelector('#FacetFiltersForm');
//   const productGridSelector = ".Collection_product_grid_inner_new";

//   function scrollToProductGrid() {
//     const grid = document.querySelector(productGridSelector);
//     if (grid) {
//       const rect = grid.getBoundingClientRect();
//       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       const offsetPosition = rect.top + scrollTop - 200; // 100px offset from top

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth"
//       });
//     }
//   }

//   function observeGridUpdateAndScroll() {
//     const gridWrapper = document.querySelector(productGridSelector);
//     if (!gridWrapper) return;

//     const observer = new MutationObserver((mutations, obs) => {
//       if (gridWrapper.innerHTML.trim().length > 0) {
//         scrollToProductGrid();
//         obs.disconnect();
//       }
//     });

//     observer.observe(gridWrapper, { childList: true, subtree: true });
//   }

//   if (filterForm) {
//     filterForm.addEventListener("change", function () {
//       observeGridUpdateAndScroll();
//     });
//   }

//   document.body.addEventListener("click", function (e) {
//     const target = e.target;
//     const isFacetRemoveLink =
//       target.closest("facet-remove") ||
//       target.classList.contains("icon-close-small");

//     if (isFacetRemoveLink) {
//       observeGridUpdateAndScroll();
//     }
//   });
// });




// document.addEventListener("DOMContentLoaded", function () {
//   const filterForm = document.querySelector('#FacetFiltersForm');
//   const productGridSelector = ".Collection_product_grid_inner_new";

//   function scrollToProductGrid() {
//     const grid = document.querySelector(productGridSelector);
//     if (grid) {
//       grid.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }

//   function observeGridUpdateAndScroll() {
//     const gridWrapper = document.querySelector(productGridSelector);
//     if (!gridWrapper) return;

//     const observer = new MutationObserver((mutations, obs) => {
//       if (gridWrapper.innerHTML.trim().length > 0) {
//         scrollToProductGrid();
//         obs.disconnect();
//       }
//     });

//     observer.observe(gridWrapper, { childList: true, subtree: true });
//   }

//   // ✅ 1. Filter checkboxes (form change)
//   if (filterForm) {
//     filterForm.addEventListener("change", function () {
//       observeGridUpdateAndScroll();
//     });
//   }

//   // ✅ 2. facet-remove and 3. icon-close-small (click on filter tags)
//   document.body.addEventListener("click", function (e) {
//     const target = e.target;
    
//     const isFacetRemoveLink =
//       target.closest("facet-remove") ||
//       target.classList.contains("icon-close-small");

//     if (isFacetRemoveLink) {
//       observeGridUpdateAndScroll();
//     }
//   });
// });