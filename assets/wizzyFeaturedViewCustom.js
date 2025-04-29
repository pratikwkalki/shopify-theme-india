document.addEventListener("wizzyFeaturedViewLoaded", function () {
  window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_FETCHED,
    function (data) {
      let results = data.payload.result;
      console.log(results);

      return (
        results.forEach((result) => {
          result.images.splice(0, 1);
        }),
        data
      );
    }
  );
});



