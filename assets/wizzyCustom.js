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
    ["Rust", ["#b7410e", !1]],
    [
      "Multi",
      [
        "https://i.ibb.co/BVjj74X/classic-color-spectrum-rgb-line-gradient-vector-522680-173-copy.png",
        1,
      ],
    ],
    ["Peach", ["#ffdab9", !1]],
    ["Golden", ["#ffd900", !1]],
    ["Off-White", ["#f5f5f5", !1]],
    ["Cream", ["#fffdd0", !1]],
    ["Sky Blue", ["#87CEEB", !1]],
    ["Navy Blue", ["#000080", !1]],
    ["Light Blue", ["#ADD8E6", !1]],
    ["Olive Green", ["#556B2F", !1]],
    ["Light Green", ["#90EE90", !1]],
    ["Dark Grey", ["#A9A9A9", !1]],
    ["Dark Blue", ["#00008B", !1]],
    ["Jet Black", ["#000000", !1]],
    ["Bright White", ["#FFFFFF", !1]],
    ["Light Grey", ["#D3D3D3", !1]],
    ["Wine", ["#722F37", !1]],
    ["Teal Blue", ["#008080", !1]],
    ["Royal Blue", ["#4169E1", !1]],
    ["Indigo Blue", ["#4B0082", !1]],
    ["Mid Blue", ["#0000CD", !1]],
    ["Peacock Blue", ["#006994", !1]],
    ["Deep Blue", ["#000080", !1]],
    ["Aqua Blue", ["#00FFFF", !1]],
    ["Ice Blue", ["#BCE6E6", !1]],
    ["Night Blue", ["#191970", !1]],
    ["Denim Blue", ["#1560BD", !1]],
    ["Turquoise Blue", ["#40E0D0", !1]],
    ["Brick Red", ["#B22222", !1]],
    ["Light Red", ["#FF6961", !1]],
    ["Dark Red", ["#8B0000", !1]],
    ["Bright Red", ["#FF0000", !1]],
    ["Carrot red", ["#FF4500", !1]],
    ["Burn Red", ["#9A3334", !1]],
    ["Cardinal Red", ["#C41E3A", !1]],
    ["Oxblood Red", ["#800020", !1]],
    ["Rio Red", ["#DA2C43", !1]],
    ["Rose Red", ["#FF033E", !1]],
    ["Rumba Red", ["#C76E70", !1]],
    ["Spice Red", ["#A23C3C", !1]],
    ["Tango Red", ["#E25822", !1]],
    ["Deep Red", ["#8B0000", !1]],
    ["Mustard Yellow", ["#FFDB58", !1]],
    ["Light Yellow", ["#FFFFE0", !1]],
    ["Lemon Yellow", ["#FFF44F", !1]],
    ["Mellow Yellow", ["#F8DE7E", !1]],
    ["Bright Yellow", ["#FFFF00", !1]],
    ["Golden Yellow", ["#FFD700", !1]],
    ["Chrome Yellow", ["#FFA700", !1]],
    ["Corn Yellow", ["#FBEC5D", !1]],
    ["Musturd Yellow", ["#FFDB58", !1]],
    ["Pale Yellow", ["#EEE8AA", !1]],
    ["Pastel Yellow", ["#FDFD96", !1]],
    ["Taffy Yellow", ["#F8DE7E", !1]],
    ["Dark Green", ["#006400", !1]],
    ["Light Pink", ["#FFB6C1", !1]],
    ["Onion Pink", ["#F5B9F5", !1]],
    ["Island Pink", ["#FFD1DC", !1]],
    ["Lilac Pink", ["#FFC0CB", !1]],
    ["Rose Pink", ["#FF66CC", !1]],
    ["Coral Pink", ["#FF7F50", !1]],
    ["Dusty Pink", ["#D8BFD8", !1]],
    ["Send Pink", ["#FF91A4", !1]],
    ["Blossom Pink", ["#FFC3A0", !1]],
    ["Delicacy Pink", ["#FEC3AC", !1]],
    ["Flamingo Pink", ["#FC8EAC", !1]],
    ["Pastel Pink", ["#FFD1BB", !1]],
    ["Baby Pink", ["#FFC0CB", !1]],
    ["Pastel Purple", ["#B39EB5", !1]],
    ["Dark Purple", ["#800080", !1]],
    ["Beige", ["#F5F5DC", !1]],
    ["Light Purple", ["#E6E6FA", !1]],
    ["Cloud Cream", ["#FFF8E7", !1]],
    ["Custard Cream", ["#FFF0C1", !1]],
    ["Dark Cream", ["#EEE8AA", !1]],
    ["Dawn Cream", ["#FFFAF0", !1]],
    ["Fawn Cream", ["#E5AA70", !1]],
    ["Italian Cream", ["#F6ECD8", !1]],
    ["Light Orange", ["#FFD68F", !1]],
    ["Apricot Orange", ["#FDD5B1", !1]],
    ["Bright Orange", ["#FF8C00", !1]],
    ["Burnt Orange", ["#FF4500", !1]],
    ["Coral Orange", ["#FF7F50", !1]],
    ["Golden Orange", ["#FFD700", !1]],
    ["Apricot Orange", ["#FBCEB1", !1]],
    ["Dark Olive", ["#556B2F", !1]],
    ["Olive Brown", ["#806517", !1]],
    ["Light Olive", ["#AAB300", !1]],
    ["Olive Grey", ["#B5B35C", !1]],
    ["Branch Olive", ["#5F6527", !1]],
    ["Dark Olive Green", ["#556B2F", !1]],
    ["Deep Olive Green", ["#556B2F", !1]],
    ["Dusty Olive", ["#8A8662", !1]],
    ["Olive Melange", ["#6B6C4A", !1]],
    ["Dark Maroon", ["#800000", !1]],
    ["Maroon gold", ["#B03060", !1]],
    ["Silver Grey", ["#C0C0C0", !1]],
    ["Lime Green", ["#00FF00", !1]],
    ["State Gray", ["#808080", !1]],
    ["Teal Green", ["#008080", !1]],
    ["Dusty Teal", ["#4e5d4e", !1]],
    ["Teal Black", ["#003838", !1]],
    ["Teal Grey", ["#69838d", !1]],
    ["Midnight Navy", ["#000080", !1]],
    ["Grey Melange", ["#808080", !1]],
    ["Charcoal Grey", ["#36454F", !1]],
    ["Ercus Melange", ["#B5B5B5", !1]],
    ["Air Force Blue", ["#5D8AA8", !1]],
    ["Aquamarine Blue", ["#7FFFD4", !1]],
    ["Carrot Brown", ["#ED9121", !1]],
    ["Colonial Blue", ["#002F6C", !1]],
    ["Cornet Blue", ["#6495ED", !1]],
    ["Deep Wine", ["#8B0000", !1]],
    ["Bottle Green", ["#092E20", !1]],
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
          facet.key === "colors" &&
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
        products.forEach((product) => {
          let attr = product.attributes.filter(attr => attr.id === "product_handle");
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
          minPrice = parseInt(minPrice).toLocaleString("en-IN");
          maxPrice = parseInt(maxPrice).toLocaleString("en-IN");

          p.textContent = `₹${minPrice} - ₹${maxPrice}`;
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
          minPrice = parseInt(minPrice).toLocaleString("en-IN");
          maxPrice = parseInt(maxPrice).toLocaleString("en-IN");

          p.textContent = `₹${minPrice} - ₹${maxPrice}`;
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
