
  window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_FETCHED,
    function (data) {
      
      console.log(data.payload.result);
      return (
        data.payload.result.forEach((result) => {
          result.images.splice(0, 1);
        }),
        data
      );
    }
  );




