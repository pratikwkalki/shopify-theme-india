
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
    window.featuredViewConfig.events.allowedEvents.ON_FEATURED_VIEW_CLICKED,
    function (data) {
      setTimeout(()=>{
        let wishlist_icon = document.querySelector('.wizzy__featuredview__cartCount__Ttudn');
      let main_counter = document.querySelector('.wk-counter.wk-bubble');
      console.log(wishlist_icon);
      console.log(main_counter);
      if(wishlist_icon && main_counter)
        wishlist_icon.innerText = main_counter.innerText;
      },10000);
      
      return data;
    }
   );
   



