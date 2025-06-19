window.onWizzyScriptLoaded = function () {
  $("body").on("change", ".wizzy-range-for-grid", function (event) {
    handleRangeInputValueChange(event.target.value);
  });

  function handleRangeInputValueChange(value) {
    let x = document.querySelector(".wizzy-search-results");
    if (typeof x != "undefined") {
      if (x.classList.contains("wizzy-2-products-in-a-row")) {
        x.classList.remove("wizzy-2-products-in-a-row");
      }

      if (x.classList.contains("wizzy-4-products-in-a-row")) {
        x.classList.remove("wizzy-4-products-in-a-row");
      }

      if (x.classList.contains("wizzy-6-products-in-a-row")) {
        x.classList.remove("wizzy-6-products-in-a-row");
      }

      sessionStorage.setItem("wizzy-2-products-in-a-row", false);
      sessionStorage.setItem("wizzy-4-products-in-a-row", false);
      sessionStorage.setItem("wizzy-6-products-in-a-row", false);
      x.classList.add("wizzy-" + value + "-products-in-a-row");
      sessionStorage.setItem("wizzy-" + value + "-products-in-a-row", true);
    }
  }
  function toHandleComingBackFromProductPage() {
    let waitForInputToLoad = setInterval(function () {
      let CBrangeInputForGrid = document.querySelector(".wizzy-range-for-grid");
      if (CBrangeInputForGrid != null && CBrangeInputForGrid != undefined) {
        if (sessionStorage.getItem("wizzy-2-products-in-a-row") === "true") {
          CBrangeInputForGrid.value = 2;
          handleRangeInputValueChange(2);
        } else if (
          sessionStorage.getItem("wizzy-4-products-in-a-row") === "true"
        ) {
          CBrangeInputForGrid.value = 4;
          handleRangeInputValueChange(4);
        } else if (
          sessionStorage.getItem("wizzy-6-products-in-a-row") === "true"
        ) {
          CBrangeInputForGrid.value = 6;
          handleRangeInputValueChange(6);
        }
        clearInterval(waitForInputToLoad);
      }
    }, 1000);

    setTimeout(function () {
      clearInterval(waitForInputToLoad);
    }, 10000);
  }

  toHandleComingBackFromProductPage();
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.PRODUCTS_RESULTS_RENDERED,
    function (payload) {
      // $("html").removeClass("filtersOpend");
      // console.log("Inside PRODUCTS_RESULTS_RENDERED");
      let rangeInputForGrid;
      if (window.innerWidth <= 768) {
        rangeInputForGrid = document.querySelectorAll(
          ".wizzy-range-for-grid"
        )[1];
      } else {
        rangeInputForGrid = document.querySelectorAll(
          ".wizzy-range-for-grid"
        )[0];
      }
      if (
        sessionStorage.getItem("wizzy-2-products-in-a-row") === "true" &&
        rangeInputForGrid != null &&
        typeof rangeInputForGrid != "undefined"
      ) {
        // console.log("2 products in a row");
        rangeInputForGrid.value = 2;
        handleRangeInputValueChange(2);
      } else if (
        sessionStorage.getItem("wizzy-4-products-in-a-row") === "true" &&
        rangeInputForGrid != null &&
        typeof rangeInputForGrid != "undefined"
      ) {
        // console.log("3 products in a row");
        rangeInputForGrid.value = 4;
        handleRangeInputValueChange(4);
      } else if (
        sessionStorage.getItem("wizzy-6-products-in-a-row") === "true" &&
        rangeInputForGrid != null &&
        typeof rangeInputForGrid != "undefined"
      ) {
        // console.log("4 products in a row");
        rangeInputForGrid.value = 6;
        handleRangeInputValueChange(6);
      }

      // if(window.innerWidth <= 768)
      // {
      //   rangeInputForGrid.value = 3;
      //    handleRangeInputValueChange(3);
      // }
      // console.log("hello world");
      document
        .querySelector("#init-wizzy-featured-view-button")
        .addEventListener("click", function () {
          if (typeof window.initFeaturedView !== "undefined") {
            window.initFeaturedView({
              dom: "wizzyFeaturedViewRoot",
              filters: window.location.href.includes(
                window.wizzyConfig.search.configs.general.searchEndpoint
              )
                ? JSON.stringify(
                    window.wizzyConfig.pageStore.searchedResponse.filters
                  )
                : window.wizzyConfig.pageStore.lastExecutedFilters,
              attributeIds: [
                "product_variant_ids",
                "product_sku",
                "product_value_tags_product_type",
                "product_filter_sub_categories_custom",
                "product_filter_color_custom",
                "product_filter_occasion_custom",
                "product_filter_fabric_custom",
                "product_filter_fabric_custom",
                "product_filter_work_custom",
                "product_style_no_custom",
                
              ],
              displayImageInSquare: true,
              // "9:16 Vertical Rectangle" === "1:1 Square" ? true : false,
              displayStoreName: true,
              displayDispalyAddToCartNumber: true,
              storeName: "Kalki",
              currentCartCount: 0,
              displayAddToCart: true,
              displayViewMore: true,
              attributesToShowOnViewMore: [
                "product_filter_sub_categories_custom",
                "product_filter_color_custom",
                "product_filter_occasion_custom",
                "product_filter_fabric_custom",
                "product_filter_work_custom",
                "product_style_no_custom",
              ],
            });
          }
        });

      return payload;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_INIT,
    function (data) {
      data.filters.configs.keepOpenedInMobileAfterApply = true;
      window.wizzyConfig.search.configs.pagination.infiniteScrollOffset = {
        desktop: 5e3,
        mobile: 5e3,
      };
      window.wizzyConfig.search.configs.facets.configs.forEach((facet) => {
        if(facet.key === "discountPercentage")
        {
          facet.configs.interval = 10;
        }
      })
      try {
        window.wizzyConfig.search.view.templates.facets.rangeListItem =
          "#wizzy-facet-range-list-item";
        window.wizzyConfig.search.configs.facets.configs =
          window.wizzyConfig.search.configs.facets.configs.filter(
            (facet) => facet.key !== "sellingPrice"
          );
        window.wizzyConfig.search.configs.facets.configs.push({
          label: "Price",
          buckets: [
            {
              from: 0,
              to: 18419,
            },
            {
              from: 18479,
              to: 36838,
            },
            {
              from: 36838,
              to: 55257,
            },
            {
              from: 55257,
              to: 73676,
            },
            {
              from: 73676,
              to: 92095,
            },
          ],
          key: "sellingPrice",
          position: "left",
          // order: 50
        });
      } catch (error) {}

      return data;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_LAZY_INIT,
    function (data) {
      window.wizzyConfig.search.configs.pagination.infiniteScrollOffset = {
        desktop: 5e3,
        mobile: 5e3,
      };
      window.wizzyConfig.search.configs.facets.configs.forEach((facet) => {
        if(facet.key === "discountPercentage")
        {
          facet.configs.interval = 10;
        }
      })
      data.filters.configs.keepOpenedInMobileAfterApply = true;
      try {
        window.wizzyConfig.search.view.templates.facets.rangeListItem =
          "#wizzy-facet-range-list-item";
        window.wizzyConfig.search.configs.facets.configs =
          window.wizzyConfig.search.configs.facets.configs.filter(
            (facet) => facet.key !== "sellingPrice"
          );
        window.wizzyConfig.search.configs.facets.configs.push({
          label: "Price",
          buckets: [
            {
              from: 0,
              to: 18419,
            },
            {
              from: 18479,
              to: 36838,
            },
            {
              from: 36838,
              to: 55257,
            },
            {
              from: 55257,
              to: 73676,
            },
            {
              from: 73676,
              to: 92095,
            },
          ],
          key: "sellingPrice",
          position: "left",
          // order: 50
        });
      } catch (error) {}

      return data;
    }
  );
  const colorMap = new Map([
    [
      "Multi",
      [
        "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/multicolor_filter_01dd6091-6aa8-4887-97bf-1a50e81100a5.png?v=1747300683",
        !0,
      ],
    ],
    ["Brown", ["#964B00", !1]],
    ["Red", ["#FF0000", !1]],
    ["Orange", ["#FFA500", !1]],
    ["Yellow", ["#FFFF00", !1]],
    ["Green", ["#00FF00", !1]],
    ["Blue", ["#0000FF", !1]],
    ["Beige", ["#F5F5DC", !1]],
    ["Pink", ["#FFC0CB", !1]],
    ["Peach", ["#FFE5B4", !1]],
    ["Purple", ["#800080", !1]],
    ["Gold", ["#FFD700", !1]],
    ["Black", ["#000000", !1]],
    ["Grey", ["#808080", !1]],
    ["White", ["#FFFFFF", !1]],
    ["Wine", ["#990012", !1]],
    ["Silver", ["#C0C0C0", !1]],
    ["Off White", ["#F8F0E3", !1]],
  ]);
  function findHaxCode(key) {
    return colorMap.has(key) ? colorMap.get(key) : [key, !1];
  }
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_RENDER_RESULTS,
    function (payload) {
      // console.log("BEFORE_RENDER_RESULTS", payload);
      if (payload.api === "search" || payload.api === "filter") {
        var facets = payload.response.payload.facets;
        facets.forEach((facet) => {
          facet.key === "product_confi_color_magento" &&
            facet.data.forEach((item) => {
              let color = findHaxCode(item.key);
              // console.log(color);
              (item.isSwatch = !0),
                (item.isURLSwatch = color[1]),
                (item.isVisualSwatch = !0),
                (item.swatchValue = color[0]),
                (item.data = {
                  value: item.key,
                  swatch: {
                    type: "visual",
                    value: color[0],
                  },
                });
            });
        });
        // console.log(payload);
      }

      facets = payload.response.payload.facets;
      for (let i = 0; i < facets.length; i++) {
        if (facets[i].key == "sizes") {
          let sizes = facets[i].data,
            numbers = [],
            letters = [],
            newArray = new Array(),
            temp = [
              "US 0",
              "US 2",
              "US 4",
              "US 6",
              "US 8",
              "US 10",
              "US 12",
              "US 14",
              "US 16",
              "US 17",
              "US 18",
              "US 19",
              "US 20",
              "US 21",
              "S",
              "M",
              "36",
              "38",
              "40",
              "42",
              "44",
              "46",
              "48",
              "50",
              "Fabric Only",
            ];
          for (let j = 0; j < temp.length; j++) {
            for (let k = 0; k < sizes.length; k++) {
              sizes[k].key == temp[j] && newArray.push(sizes[k]);
            }
          }
          facets[i].data = newArray;
        }
      }
      //  try {
      //   window.wizzyConfig.search.view.templates.facets.rangeListItem =
      //     "#wizzy-facet-range-list-item";
      //   payload.response.payload.facets =
      //     payload.response.payload.facets.filter(
      //       (facet) => facet.key !== "sellingPrice"
      //     );
      //    console.log("Inside Price");
      //   payload.response.payload.facets.push({
      //     label: "Price",
      //     buckets: [
      //       {
      //         from: 0,
      //         to: 18419,
      //       },
      //       {
      //         from: 18479,
      //         to: 36838,
      //       },
      //       {
      //         from: 36838,
      //         to: 55257,
      //       },
      //       {
      //         from: 55257,
      //         to: 73676,
      //       },
      //       {
      //         from: 73676,
      //         to: 92095,
      //       },
      //     ],
      //     key: "sellingPrice",
      //     position: "left",
      //     order: 12
      //   });
      //    console.log(payload);
      //    console.log("Inside Price2");
      // } catch (error) {}
      return payload;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.AFTER_PRODUCTS_TRANSFORMED,
    function (products) {
      try {
        console.log("after products transformed");
        products.forEach((product) => {
          // product.url = product.url.searchParams.delete("variant").toString();
          const parsedUrl = new URL(product.url);
          parsedUrl.searchParams.delete("variant");
          console.log(parsedUrl);
          product.url = parsedUrl.toString();
           console.log(product.url);
          let attr = product.attributes.filter(attr => attr.id === "product_handle");
          console.log(product.url.searchParams);
          console.log(attr);
          product.productHandle = attr[0].values[0].value[0];
          let product_sellingprice = product.sellingPrice;
          product_sellingprice = product_sellingprice.replace(".00", "");
          product.sellingPrice = product_sellingprice;

          const deliveryMeta = product.attributes.find(
            (item) => item.id === "product_filter_delivery_custom"
          );
          if (deliveryMeta) {
            let del = deliveryMeta.values[0].value[0];
            if (del == "Ready To Ship") {
              product.deliveryMeta = del;
            } else {
              product.deliverydayMeta = del;
            }
          }

          const festivalMeta = product.attributes.find(
            (item) => item.id === "product_festival_stamp_magento"
          );

          if (festivalMeta || deliveryMeta) {
            product.hasLabel = true;
          }
          if (festivalMeta) {
            product.festivalMeta = festivalMeta.values[0].value[0];
          }

          product.attributes.forEach((attr) => {
            if (attr.id === "product_gumlet_video_url_custom") {
              product.mainVideo = attr.values[0].value[0];
            }
          });
        });
      } catch (error) {}

      return products;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_SEARCH_EXECUTED,
    function (data) {
      let body = document.body;
      if (body.classList.contains("collection_header_transparent_new")) {
        body.classList.remove("collection_header_transparent_new");
      }

      if (body.classList.contains("template--bridal-collection-new")) {
        body.classList.remove("template--bridal-collection-new");
      }
      if (body.classList.contains("template--luxe-collection-new")) {
        body.classList.remove("template--luxe-collection-new");
      }
      if (body.classList.contains("bridal-wedding-dresses_page_new")) {
        body.classList.remove("bridal-wedding-dresses_page_new");
      }
      if (body.classList.contains("template--bridal-wedding-dress-new")) {
        body.classList.remove("template--bridal-wedding-dress-new");
      }
      if (
        document.body.classList.contains("page_white_header_transparent_new")
      ) {
        body.classList.remove("page_white_header_transparent_new");
      }

      if (body.classList.contains("collection_hide_announcement_bar_new")) {
        // console.log("inside removing");
        body.classList.remove("collection_hide_announcement_bar_new");
      }

      let video = document.querySelector(".Collection_meta_banner_new");
      if (video) video.style.setProperty("display", "none", "important");

      if (window.innerWidth <= 768) {
        if (body.classList.contains("template-collection")) {
          body.classList.remove("template-collection");
        }
        if (body.classList.contains("template--luxe-collection-new")) {
          body.classList.remove("template--luxe-collection-new");
        }
        if (body.classList.contains("collection_hide_announcement_bar_new")) {
          body.classList.remove("collection_hide_announcement_bar_new");
        }
        if (body.classList.contains("collection_header_transparent_new")) {
          body.classList.remove("collection_header_transparent_new");
        }
        if (body.classList.contains("collection_full_width_new")) {
          body.classList.remove("collection_full_width_new");
        }
      }

      return data;
    }
  );

  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.VIEW_RENDERED,
    function (data) {
      let selectedPrice = document.querySelectorAll(
        ".wizzy-selected-facet-list-item[data-facetkey='sellingPrice'] .facet-item-label-value"
      );
      selectedPrice.forEach((p) => {
        if (p) {
          let price = p.textContent.replace(/\.0/g, "");
          let [minPrice, maxPrice] = price.split("-");
           minPrice = minPrice.trim();
            maxPrice = maxPrice.trim();
        
            if (!minPrice.startsWith("₹")) {
              minPrice = `₹${minPrice}`;
            }
        
            if (!maxPrice.startsWith("₹")) {
              maxPrice = `₹${maxPrice}`;
            }
        
            p.textContent = `${minPrice} - ${maxPrice}`;
        }
      });

      const firstFilterBlock = document.querySelector(
        ".wizzy-search-filters-left-wrapper .wizzy-facet-list-block .wizzy-filters-facet-block"
      );

      if (firstFilterBlock) {
        if (firstFilterBlock.classList.contains("first-opened")) {
          firstFilterBlock.classList.remove("collapsed");
        }
      }

      let label = document.querySelector(".wizzy-common-select-label.mobile");
      if (label) {
        label.textContent = "Sort";
      }
      if (window.innerWidth <= 769) {
        const applyButton = document.querySelector(
          ".wizzy-common-select-options.inner button.no-js-hidden.button.button--primary"
        );
        if (applyButton) {
          applyButton.addEventListener("click", function () {
            document.body.classList.remove("wizzy-overlay-opened");
            document.body.classList.remove("wizzy-common-select-body-overlay");
            const sortButton = document.querySelector(
              ".wizzy-overlay-opened.wizzy-common-select-body-overlay .wizzy-common-select-selector"
            );
            if (sortButton) {
              sortButton.click();
            }

            const container = document.querySelector(
              ".wizzy-search-wrapper .wizzy-search-results-wrapper .wizzy-search-results-container .wizzy-search-filters-top .search-filters-top-wrapper .wizzy-search-sort-wrapper .wizzy-sort-container .wizzy-common-select-wrapper .wizzy-common-select-container .wizzy-common-select-options"
            );
            container.style.setProperty("display", "none", "important");
          });
        }
      }

      const original = document.querySelector(
        ".wizzy-filters-facet-block.facet-block-sizes"
      );

      if (original) {
        const targetContainer = document.querySelector(
          ".wizzy-search-filters-top .search-filters-top-wrapper .wizzy-search-filters-list-top"
        );

        if (targetContainer) {
          const existingClone = targetContainer.querySelector(
            ".wizzy-filters-facet-block.facet-block-sizes.facet-block-top"
          );

          if (!existingClone) {
            const clone = original.cloneNode(true); // true for deep clone
            clone.classList.remove("facet-block-left", "collapsed");
            clone.classList.add("facet-block-top");

            targetContainer.appendChild(clone);
          }
        }
      }
      var filterPanel = document.querySelectorAll(
        ".wizzy-search-wrapper .wizzy-search-filters-left .wizzy-filters-facet-block .wizzy-facet-head"
      );

      filterPanel.forEach((facet) => {
        facet.addEventListener("click", function (e) {
          let currentFilter = this.closest(".wizzy-filters-facet-block");
          const isActive = currentFilter.classList.contains("collapsed");

          setTimeout(() => {
            filterPanel.forEach((h) => {
              let filter = h.closest(".wizzy-filters-facet-block");
              if (filter !== currentFilter) {
                filter.classList.add("collapsed");
              }
            });

            if (isActive) {
              currentFilter.classList.remove("collapsed");
            } else {
              currentFilter.classList.add("collapsed");
            }
          }, 100);
        });
      });
      // console.log("in view rendered");
      let ranges = document.querySelectorAll(
        ".wizzy-facet-list-item.facet-rangeList-item .wizzy-facet-list-item-count"
      );
      ranges.forEach((range) => {
        if (range.textContent.trim() === "(0)") {
          range.parentElement.remove();
        }
      });

      const selectedList = document.querySelector(".wizzy-selected-facet-list");
      const targetDiv1 = document.querySelector(".wizzy-facet-list-block"); // Replace if needed
      const targetDiv2 = document.querySelectorAll(".wizzy-facet-body"); // Replace if needed
      let title = document.querySelector(".applied-filters-header");
      if (selectedList && selectedList.querySelectorAll("li").length > 0) {
        // console.log("Inside divs");
        targetDiv1?.classList.add("with-selected-filters");
        targetDiv2.forEach((d) => {
          d?.classList.add("with-selected-filters");
        });
        title?.classList.remove("remove");
      } else {
        // console.log("inside remove");
        // console.log("No selected filters");
        targetDiv1?.classList.remove("with-selected-filters");
        targetDiv2.forEach((d) => {
          d?.classList.remove("with-selected-filters");
        });
        // console.log(title);
        title?.classList.add("remove");
        // console.log("Removed title", title);
      }
      document
        .querySelectorAll(".wizzy-grid-filters-box")
        .forEach((filterBox) => {
          const facetList = filterBox.querySelector(".wizzy-facet-list");
          const leftButton = filterBox.querySelector(".scroll-btn.left");
          const rightButton = filterBox.querySelector(".scroll-btn.right");

          if (!facetList || !leftButton || !rightButton) return;

          leftButton.addEventListener("click", () => {
            facetList.scrollBy({ left: -200, behavior: "smooth" });
          });

          rightButton.addEventListener("click", () => {
            facetList.scrollBy({ left: 200, behavior: "smooth" });
          });
        });

      document.addEventListener("click", function (e) {
        if (
          !e.target.closest(
            ".filters-list-top-values-wrapper .wizzy-facet-body"
          ) &&
          !e.target.closest(".wizzy-search-filters-list-top .wizzy-facet-head")
        ) {
          const wrapper = document.querySelector(
            ".filters-list-top-values-wrapper"
          );
          let facets = document.querySelectorAll(
            ".wizzy-search-filters-list-top .wizzy-filters-facet-block"
          );
          facets.forEach((facet) => {
            let head = facet.querySelector(".wizzy-facet-head");
            if (head && head.classList.contains("active")) {
              head.classList.remove("active");
              if (wrapper) {
                const childDivs = wrapper.querySelectorAll("div");
                childDivs.forEach((div) => div.remove());
              }
            }
          });
        }
      });

      const priceElements = document.querySelectorAll('.price-item--regular');
      priceElements.forEach((el) => {
        el.textContent = el.textContent.replace(/\.00\b/, '');
      });

      return data;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.BEFORE_FILTERS_EXECUTED,
    function (payload) {
      if (payload.filters) {
        payload.filters.showOOSProductsInOrder = "true";
      }

      return payload;
    }
  );
  window.wizzyConfig.events.registerEvent(
    window.wizzyConfig.events.allowedEvents.PRODUCTS_CACHED_RESULTS_RENDERED,
    function (data) {
      let selectedPrice = document.querySelectorAll(
        ".wizzy-selected-facet-list-item[data-facetkey='sellingPrice'] .facet-item-label-value"
      );
      selectedPrice.forEach((p) => {
        if (p) {
          let price = p.textContent.replace(/\.0/g, "");
          let [minPrice, maxPrice] = price.split("-");
           minPrice = minPrice.trim();
            maxPrice = maxPrice.trim();
        
            if (!minPrice.startsWith("₹")) {
              minPrice = `₹${minPrice}`;
            }
        
            if (!maxPrice.startsWith("₹")) {
              maxPrice = `₹${maxPrice}`;
            }
        
            p.textContent = `${minPrice} - ${maxPrice}`;
        }
      });

      const firstFilterBlock = document.querySelector(
        ".wizzy-search-filters-left-wrapper .wizzy-facet-list-block .wizzy-filters-facet-block"
      );

      if (firstFilterBlock) {
        if (firstFilterBlock.classList.contains("first-opened")) {
          firstFilterBlock.classList.remove("collapsed");
        }
      }

      let label = document.querySelector(".wizzy-common-select-label.mobile");
      if (label) {
        label.textContent = "Sort";
      }
      if (window.innerWidth <= 769) {
        const applyButton = document.querySelector(
          ".wizzy-common-select-options.inner button.no-js-hidden.button.button--primary"
        );
        if (applyButton) {
          applyButton.addEventListener("click", function () {
            document.body.classList.remove("wizzy-overlay-opened");
            document.body.classList.remove("wizzy-common-select-body-overlay");
            const sortButton = document.querySelector(
              ".wizzy-overlay-opened.wizzy-common-select-body-overlay .wizzy-common-select-selector"
            );
            if (sortButton) {
              sortButton.click();
            }

            const container = document.querySelector(
              ".wizzy-search-wrapper .wizzy-search-results-wrapper .wizzy-search-results-container .wizzy-search-filters-top .search-filters-top-wrapper .wizzy-search-sort-wrapper .wizzy-sort-container .wizzy-common-select-wrapper .wizzy-common-select-container .wizzy-common-select-options"
            );
            container.style.setProperty("display", "none", "important");
          });
        }
      }

      const original = document.querySelector(
        ".wizzy-filters-facet-block.facet-block-sizes"
      );

      if (original) {
        const targetContainer = document.querySelector(
          ".wizzy-search-filters-top .search-filters-top-wrapper .wizzy-search-filters-list-top"
        );

        if (targetContainer) {
          const existingClone = targetContainer.querySelector(
            ".wizzy-filters-facet-block.facet-block-sizes.facet-block-top"
          );

          if (!existingClone) {
            const clone = original.cloneNode(true); // true for deep clone
            clone.classList.remove("facet-block-left", "collapsed");
            clone.classList.add("facet-block-top");

            targetContainer.appendChild(clone);
          }
        }
      }
      var filterPanel = document.querySelectorAll(
        ".wizzy-search-wrapper .wizzy-search-filters-left .wizzy-filters-facet-block .wizzy-facet-head"
      );

      filterPanel.forEach((facet) => {
        facet.addEventListener("click", function (e) {
          let currentFilter = this.closest(".wizzy-filters-facet-block");
          const isActive = currentFilter.classList.contains("collapsed");

          setTimeout(() => {
            filterPanel.forEach((h) => {
              let filter = h.closest(".wizzy-filters-facet-block");
              if (filter !== currentFilter) {
                filter.classList.add("collapsed");
              }
            });

            if (isActive) {
              currentFilter.classList.remove("collapsed");
            } else {
              currentFilter.classList.add("collapsed");
            }
          }, 100);
        });
      });
      // console.log("in view rendered");
      let ranges = document.querySelectorAll(
        ".wizzy-facet-list-item.facet-rangeList-item .wizzy-facet-list-item-count"
      );
      ranges.forEach((range) => {
        if (range.textContent.trim() === "(0)") {
          range.parentElement.remove();
        }
      });

      const selectedList = document.querySelector(".wizzy-selected-facet-list");
      const targetDiv1 = document.querySelector(".wizzy-facet-list-block"); // Replace if needed
      const targetDiv2 = document.querySelectorAll(".wizzy-facet-body"); // Replace if needed
      let title = document.querySelector(".applied-filters-header");
      if (selectedList && selectedList.querySelectorAll("li").length > 0) {
        // console.log("Inside divs");
        targetDiv1?.classList.add("with-selected-filters");
        targetDiv2.forEach((d) => {
          d?.classList.add("with-selected-filters");
        });
        title?.classList.remove("remove");
      } else {
        // console.log("inside remove");
        // console.log("No selected filters");
        targetDiv1?.classList.remove("with-selected-filters");
        targetDiv2.forEach((d) => {
          d?.classList.remove("with-selected-filters");
        });
        // console.log(title);
        title?.classList.add("remove");
        // console.log("Removed title", title);
      }
      document
        .querySelectorAll(".wizzy-grid-filters-box")
        .forEach((filterBox) => {
          const facetList = filterBox.querySelector(".wizzy-facet-list");
          const leftButton = filterBox.querySelector(".scroll-btn.left");
          const rightButton = filterBox.querySelector(".scroll-btn.right");

          if (!facetList || !leftButton || !rightButton) return;

          leftButton.addEventListener("click", () => {
            facetList.scrollBy({ left: -200, behavior: "smooth" });
          });

          rightButton.addEventListener("click", () => {
            facetList.scrollBy({ left: 200, behavior: "smooth" });
          });
        });

      document.addEventListener("click", function (e) {
        if (
          !e.target.closest(
            ".filters-list-top-values-wrapper .wizzy-facet-body"
          ) &&
          !e.target.closest(".wizzy-search-filters-list-top .wizzy-facet-head")
        ) {
          const wrapper = document.querySelector(
            ".filters-list-top-values-wrapper"
          );
          let facets = document.querySelectorAll(
            ".wizzy-search-filters-list-top .wizzy-filters-facet-block"
          );
          facets.forEach((facet) => {
            let head = facet.querySelector(".wizzy-facet-head");
            if (head && head.classList.contains("active")) {
              head.classList.remove("active");
              if (wrapper) {
                const childDivs = wrapper.querySelectorAll("div");
                childDivs.forEach((div) => div.remove());
              }
            }
          });
        }
      });

      const priceElements = document.querySelectorAll('.price-item--regular');
      priceElements.forEach((el) => {
        el.textContent = el.textContent.replace(/\.00\b/, '');
      });
      return data;
    }
  );
};
const currentURL = window.location.href;

// const autocompleteMenu = document.querySelector('.wizzy-autocomplete-wrapper');

// if (!autocompleteMenu) return;
// if (currentURL.includes('/collections')) {
//   autocompleteMenu.style.top = "85px";
// } else {
//   autocompleteMenu.style.top = "117px";
// }

let searchbtn = document.querySelector(".search_main_new");
searchbtn.addEventListener("click", function () {
  let searchBar = document.querySelector(".search__input");
  if (searchBar) {
    searchBar.click();
  }
});
  let wishlist = document.querySelector('.wizzy__featuredview__wishlist___e6gQ');
    if(wishlist)
    {
      wishlist.addEventListener("click", function(e) {
        e.stopImmediatePropagation();
        window.location.href = 'https://in.kalkifashion.com/apps/wishlist';
      })
    }
      // let reel_view_button = document.querySelector('#init-wizzy-featured-view-button');
      // if(reel_view_button)
      // {
        
      //   reel_view_button.addEventListener("click", function() {
      //     console.log("clicked on reel button");
      //     setTimeout(()=>{
      //        let reel_wishlist = document.querySelector('.wizzy__featuredview__wishlist___e6gQ');
      //       console.log("inside set Timeout");
      //        if(reel_wishlist)
      //         {
      //           reel_wishlist.addEventListener("click", function(e){
      //             console.log("clicked wishlist button");
      //             e.stopImmediatePropagation();
      //             window.localtion.href = "https://in.kalkifashion.com/apps/wishlist";
      //           });
      //         }
      //     }, 1000)
      //   })
      // }
