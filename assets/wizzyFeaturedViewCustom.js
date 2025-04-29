document.addEventListener("wizzyFeaturedViewLoaded", function () {
  window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_FETCHED,
    function (data) {
      

      return (
        data.payload.result.forEach((result) => {
          result.images.splice(0, 1);
        }),
        data
      );
    }
  );
});



