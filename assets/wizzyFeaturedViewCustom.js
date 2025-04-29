document.addEventListener("wizzyFeaturedViewLoaded", function () {
  // window.featuredViewConfig.events.registerEvent(
  //   window.featuredViewConfig.events.allowedEvents.PRODUCT_ADDED_TO_WISHLIST,
  //   function (data) {
  //     const mainSwiperWrapper = document.querySelector(".swiper-wrapper");

  //     if (mainSwiperWrapper) {
  //       const slides = mainSwiperWrapper.querySelectorAll(
  //         ":scope > .swiper-slide"
  //        );
  //       console.log("Total Slides:", slides.length);

  //       const activeSlide = mainSwiperWrapper.querySelector(
  //         ":scope > .swiper-slide.swiper-slide-active"
  //       );
  //       console.log("Active Slide:", activeSlide);

  //       if (activeSlide) {
  //         const activeIndex = Array.from(slides).indexOf(activeSlide);
  //         console.log("Active Index:", activeIndex);

  //         const productList = document.querySelectorAll(
  //           "#wizzy-products-list-usf .product-card"
  //         );
  //         console.log("Total Products:", productList.length);

  //         if (productList.length > activeIndex) {
  //           const targetProduct = productList[activeIndex];
  //           console.log("Target Product:", targetProduct);

  //           if (targetProduct) {
  //             const wishlistButton = targetProduct.querySelector(
  //               ".btn--secondary-accent"
  //             );

  //             if (wishlistButton) {
  //               wishlistButton.click();
  //               console.log(
  //                 "✅ Wishlist button clicked for product at index:",
  //                 activeIndex
  //               );
  //             } else {
  //               console.log(
  //                 "❌ Wishlist button NOT found in product at index:",
  //                 activeIndex
  //               );
  //             }
  //           } else {
  //             console.log("❌ Product NOT found at index:", activeIndex);
  //           }
  //         } else {
  //           console.log(
  //             "❌ No corresponding product found for active index:",
  //             activeIndex
  //           );
  //         }
  //       } else {
  //         console.log("❌ No active slide found.");
  //       }
  //     } else {
  //       console.log("❌ No main .swiper-wrapper found.");
  //     }

  //     return data;
  //   }
  // );
  window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_FETCHED,
    function (data) {
      let results = data.payload.result;
      console.log(results);

      return (
        results.forEach((result) => {
          result.attributes.forEach((attribute) => {
            attribute.id === "product_variant_ids" &&
              ((result.id = attribute.values[0].value[0]),
              console.log(attribute.values[0].value[0], result.id));
          });
          result.images.splice(0, 1);
        }),
        data
      );
    }
  );
});



