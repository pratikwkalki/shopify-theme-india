document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.querySelector('#FacetFiltersForm');
  const productGridSelector = ".Collection_product_grid_inner_new";

  function scrollToProductGrid() {
    const grid = document.querySelector(productGridSelector);
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  // ✅ 1. Filter checkboxes (form change)
  if (filterForm) {
    filterForm.addEventListener("change", function () {
      observeGridUpdateAndScroll();
    });
  }

  // ✅ 2. facet-remove and 3. icon-close-small (click on filter tags)
  document.body.addEventListener("click", function (e) {
    const target = e.target;
    
    const isFacetRemoveLink =
      target.closest("facet-remove") ||
      target.classList.contains("icon-close-small");

    if (isFacetRemoveLink) {
      observeGridUpdateAndScroll();
    }
  });
});