document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.querySelector("#FacetFiltersForm");
  const productGridSelector = ".Collection_product_grid_inner_new";

  function scrollToProductGridWhenReady() {
    const grid = document.querySelector(productGridSelector);
    if (!grid) return;

    // Wait for grid to be visibly rendered
    let attempts = 0;
    const maxAttempts = 10;
    const checkRendered = setInterval(() => {
      const rect = grid.getBoundingClientRect();
      if (grid.offsetHeight > 0 && rect.top !== 0 || attempts >= maxAttempts) {
        clearInterval(checkRendered);
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop - 200;

        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
      attempts++;
    }, 100);
  }

  function observeGridUpdateAndScroll() {
    const gridWrapper = document.querySelector(productGridSelector);
    if (!gridWrapper) return;

    const observer = new MutationObserver((mutations, obs) => {
      if (gridWrapper.innerHTML.trim().length > 0) {
        scrollToProductGridWhenReady();
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