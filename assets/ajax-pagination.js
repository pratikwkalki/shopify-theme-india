class ajaxPagination extends HTMLElement {
    constructor() {
      super();

      const collectionId = document.querySelector("[js-main-collection]").getAttribute('data-section-id');

      this.sections = {
        main: {
            sectionId: collectionId,
            nodeId: "CollectionAjaxContent"
        }
      };

      this.ajaxCollectionEl = document.querySelector(`#${this.sections.main.nodeId}`);
      this.init();

      document.addEventListener("update:scroll", this.updateScroll.bind(this));
    };

    init() {
        const paginationItems = this.querySelectorAll("[js-pagination-item]");

        paginationItems.forEach( item => {
          item.addEventListener('click', evt => {
            evt.preventDefault();
            const url = evt.currentTarget.getAttribute("href");
            this.initAjaxCollection(url, this);
          })
        })
    }

    initAjaxCollection(url) {
        this.updateHistoryState(url);
        this.updateScroll();
        this.renderAjaxCollection(url);
    };

    updateHistoryState(url) {
        window.history.replaceState({path: url}, '', url);
        if(document.querySelector('[data-canonical-url]')) {
          document.querySelector('[data-canonical-url]').setAttribute('href', window.location.href);
        }
    };

    updateScroll() {
        const scrollToElement = document.querySelector('[data-scroll-to]');
        let scrollTo = scrollToElement && scrollToElement.offsetTop;

        let headerHeight = document.querySelector('sticky-header').offsetHeight;
        if(document.querySelector('.Header_announcement_bar_new')) {
            headerHeight += document.querySelector('.Header_announcement_bar_new').offsetHeight
        }
        scrollTo = scrollTo - headerHeight;
        window.scrollTo({top: scrollTo, behavior: 'smooth'});
    }

    renderAjaxCollection(url) {
        fetch(url).then(function(response) {
            return response.text();
        }).then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            this.ajaxCollectionEl.innerHTML = doc.querySelector(`#${this.sections.main.nodeId}`).innerHTML;
        });
    }
}
  
customElements.define('ajax-pagination', ajaxPagination);