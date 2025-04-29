document.addEventListener("wizzyFeaturedViewLoaded", function () {
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



