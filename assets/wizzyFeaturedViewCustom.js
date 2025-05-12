
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
   window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.ADD_TO_CART,
    function (data) {
      
     console.log("Add to Cart Clicked", data);
      return data;
    }
   );
window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_TRANSFORMED,
    function (data) {
      
     console.log("AFTER_PRODUCTS_TRANSFORMED", data);
      return data;
    }
   );
   



