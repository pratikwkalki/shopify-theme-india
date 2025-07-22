const priceFilterProductCount = () => {
  document.querySelectorAll('.price_counter_new').forEach(el => {
    const [minPrice, maxPrice] = [el.getAttribute('data-min') || 0, el.getAttribute('data-max') || 5000000];
    fetch(`${window.location.pathname}?filter.v.price.gte=${minPrice}&filter.v.price.lte=${maxPrice}&view=ajax`)
      .then(res => res.text())
      .then(data => {
        const count = new DOMParser().parseFromString(data, "text/html")
          .querySelector('#ProductCountDesktop')?.textContent.trim().match(/\d+/) || "0";
        el.textContent = count;
      })
      .catch(() => el.textContent = "Error");
  });
};
if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  priceFilterProductCount();
}
class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      if(!event.target.hasAttribute('js-ignore-input-field')) {
        this.onSubmitHandler(event);
      }
    }, 500);

    const facetForm = this.querySelector('form');
    facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));
    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);

    this.mobileFilterForm = document.querySelector('#FacetFiltersFormMobile')
    if(!this.mobileFilterForm?.querySelectorAll('.active-facets facet-remove').length) {
      this.mobileFilterForm.querySelector('[js-filter-drawer-clear-all]').classList.add('hide')
    } else {
      this.mobileFilterForm.querySelector('[js-filter-drawer-clear-all]').classList.remove('hide')
    }
    document.querySelector('#SortBy-mobile').addEventListener('change', function () {
      document.body.classList.remove('overflow-hidden-mobile')
      const getFilterForm = document.querySelector('menu-drawer.mobile-facets__wrapper');
      if (getFilterForm) {
        getFilterForm.classList.remove("sort-filter-open");
      }
    });
   
    let collectionFullUrl = window.location.href;
    if(collectionFullUrl.includes('?filter.')) {
       if(document.querySelector('.meta-robots')) {
        document.querySelector('.meta-robots').setAttribute('content', 'index, nofollow');
       }
    }
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      priceFilterProductCount();
    }
    
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    };
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, facet-filters-form .loading__spinner, .product-grid-container .loading__spinner'
    );
    loadingSpinners.forEach((spinner) => spinner.classList.remove('hidden'));
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = (element) => element.url === url;
      FacetFiltersForm.filterData.some(filterDataUrl)
        ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
        : FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
    stickyFilter ()
    productCardSwiper ()
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, { html, url }];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
        if (typeof collectionLoadMore === 'function') collectionLoadMore();
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
    if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
    // close filter
    const drawerContainer = document.querySelector('.facets-container-drawer')
    if(drawerContainer) {
      const drawerDetailState = drawerContainer.querySelector('.mobile-facets__wrapper > details[open]')
      if(drawerDetailState) {
        drawerDetailState.removeAttribute('open')
        drawerDetailState.classList.remove('menu-opening')
      }
    }
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('ProductGridContainer').innerHTML;

    document
      .getElementById('ProductGridContainer')
      .querySelectorAll('.scroll-trigger')
      .forEach((element) => {
        element.classList.add('scroll-trigger--cancel');
      });
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
    const loadingSpinners = document.querySelectorAll(
      '.facets-container .loading__spinner, facet-filters-form .loading__spinner'
    );
    loadingSpinners.forEach((spinner) => spinner.classList.add('hidden'));
    if (document.body.classList.contains('template--luxe-collection-new') && window.matchMedia('(min-width: 750px) and (max-width: 1024px)').matches) {
      document.body.classList.remove('overflow-hidden-mobile')
    }
    stickyFilter ()
    productCardSwiper ()
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
    const facetDetailsElementsFromFetch = parsedHTML.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );
    const facetDetailsElementsFromDom = document.querySelectorAll(
      '#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'
    );

    // Remove facets that are no longer returned from the server
    Array.from(facetDetailsElementsFromDom).forEach((currentElement) => {
      if (!Array.from(facetDetailsElementsFromFetch).some(({ id }) => currentElement.id === id)) {
        currentElement.remove();
      }
    });

    const matchesId = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.id === jsFilter.id : false;
    };
    const facetsToRender = Array.from(facetDetailsElementsFromFetch).filter((element) => !matchesId(element));
    const countsToRender = Array.from(facetDetailsElementsFromFetch).find(matchesId);

    facetsToRender.forEach((elementToRender, index) => {
      const currentElement = document.getElementById(elementToRender.id);
      // Element already rendered in the DOM so just update the innerHTML
      if (currentElement) {
        document.getElementById(elementToRender.id).innerHTML = elementToRender.innerHTML;
      } else {
        if (index > 0) {
          const { className: previousElementClassName, id: previousElementId } = facetsToRender[index - 1];
          // Same facet type (eg horizontal/vertical or drawer/mobile)
          if (elementToRender.className === previousElementClassName) {
            document.getElementById(previousElementId).after(elementToRender);
            return;
          }
        }

        if (elementToRender.parentElement) {
          document.querySelector(`#${elementToRender.parentElement.id} .js-filter`).before(elementToRender);
        }
      }
    });

    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) {
      const closestJSFilterID = event.target.closest('.js-filter').id;

      if (closestJSFilterID) {
        FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
        FacetFiltersForm.renderMobileCounts(countsToRender, document.getElementById(closestJSFilterID));

        const newFacetDetailsElement = document.getElementById(closestJSFilterID);
        const newElementSelector = newFacetDetailsElement.classList.contains('mobile-facets__details')
          ? `.mobile-facets__close-button`
          : `.facets__summary`;
        const newElementToActivate = newFacetDetailsElement.querySelector(newElementSelector);
        if (newElementToActivate) newElementToActivate.focus();
      }
    }
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
    });

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetSummary = target.querySelector('.facets__summary');
    const sourceSummary = source.querySelector('.facets__summary');

    if (sourceSummary && targetSummary) {
      targetSummary.outerHTML = sourceSummary.outerHTML;
    }

    const targetHeaderElement = target.querySelector('.facets__header');
    const sourceHeaderElement = source.querySelector('.facets__header');

    if (sourceHeaderElement && targetHeaderElement) {
      targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
    }

    const targetWrapElement = target.querySelector('.facets-wrap');
    const sourceWrapElement = source.querySelector('.facets-wrap');

    if (sourceWrapElement && targetWrapElement) {
      const isShowingMore = Boolean(target.querySelector('show-more-button .label-show-more.hidden'));
      if (isShowingMore) {
        sourceWrapElement
          .querySelectorAll('.facets__item.hidden')
          .forEach((hiddenItem) => hiddenItem.classList.replace('hidden', 'show-more-item'));
      }

      targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
    }
  }

  static renderMobileCounts(source, target) {
    const targetFacetsList = target.querySelector('.mobile-facets__list');
    const sourceFacetsList = source.querySelector('.mobile-facets__list');

    if (sourceFacetsList && targetFacetsList) {
      targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
    }
  }

  static updateURLHash(searchParams) {
   
    history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
    
     if(document.querySelector('.meta-robots')) {
      if(searchParams.includes('filter.')) {
       
        document.querySelector('.meta-robots').setAttribute('content', 'index, nofollow');
      }
      else {
       
        document.querySelector('.meta-robots').setAttribute('content', 'index, follow');
      }
    }
    
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      },
    ];
  }

  createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }

  onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
    const targetFacets = event.target;
    const closestDetails = targetFacets.closest('details');
    if (closestDetails) {
      closestDetails.removeAttribute('open');
    }
    if (document.body.classList.contains('overflow-hidden-mobile')) {
      document.body.classList.remove('overflow-hidden-mobile')
    }
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');

    const currentFilterState = event.target
    const currentFilterName = currentFilterState.name

    if(currentFilterState && !currentFilterState.checked) {
      const currentFilterInMobileFD = document.querySelector(`#FacetFiltersFormMobile input:checked[name='${currentFilterName}']`)
      if(currentFilterInMobileFD) {
        currentFilterInMobileFD.checked = false
      }
    }

    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(event.target.closest('form'));
      this.onSubmitForm(searchParams, event);
    } else {
      const forms = [];
      const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            const noJsElements = document.querySelectorAll('.no-js-list');
            noJsElements.forEach((el) => el.remove());
            forms.push(this.createSearchParams(form));
          }
        }  
        if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this.createSearchParams(form));
        }
      });

      if(!isMobile) {
        const sortForm = event.target.closest('#FacetSortForm') ? event.target.closest('#FacetSortForm') : document.querySelector('#FacetSortForm');
        forms.push(this.createSearchParams(sortForm));
      }
      

      const url = new URL(location.href);
      const pagination = url.searchParams.get('limit');
      if(pagination) {
        forms.push(`limit=${pagination}`);
      }

      this.onSubmitForm(forms.join('&'), event);
    }
    if(window.innerWidth >= 750) {
        const drawerContainer = event.target.closest('.facets-container-drawer')
        if(drawerContainer) {
          const drawerDetailState = drawerContainer.querySelector('.mobile-facets__wrapper details[open]')
          if(drawerDetailState) {
            drawerDetailState.removeAttribute('open')
            drawerDetailState.classList.remove('menu-opening')
          }
        }
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    let url =
      event.currentTarget.href.indexOf('?') == -1
        ? ''
        : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    if (!url.includes('filter')) {
        url = ''
    }
    // if(url == '') {
    //   url = window.location.search.split('?')[1].split('&').filter(x => x.includes('sort'))
    //   !url ? '' : url
    // }
    FacetFiltersForm.renderPage(url);
    document.querySelectorAll('facet-filters-form input[type="checkbox"]:checked').forEach(el => el.checked = false);
  }
}

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

class PriceRange extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll('input').forEach((element) =>
      element.addEventListener('change', this.onRangeChange.bind(this))
    );
    this.setMinAndMaxValues();
  }

  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll('input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value) minInput.setAttribute('max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('min', 0);
    if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
  }

  adjustToValidValues(input) {
    const value = Number(input.value);
    const min = Number(input.getAttribute('min'));
    const max = Number(input.getAttribute('max'));

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }
}

customElements.define('price-range', PriceRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
    const detailsElements = document.querySelectorAll(".facets-container details");
    detailsElements.forEach(detail => {
      detail.removeAttribute("open");
    });
    document.body.classList.remove('overflow-hidden-mobile')
  }
}

customElements.define('facet-remove', FacetRemove);


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
