
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
      console.log("AFTER_PRODUCTS_TRANSFORMED");
      setTimeout(()=>{
        let wishlist_icon = document.querySelector('.wizzy__featuredview__cartCount__Ttudn');
      let main_counter = document.querySelector('.wk-counter.wk-bubble');
        let main_cart_count = document.querySelector('.cart-count-bubble span');
        let cart_count = document.querySelector('.wizzy__cart__count');
        if(cart_count && main_cart_count)
        {
          cart_count.innerText = main_cart_count.innerText;
        }
        else if(cart_count)
        {
          cart_count.style.setProperty("display", "none", "important");
        }
      console.log(wishlist_icon);
      console.log(main_counter);
      if(wishlist_icon && main_counter)
        wishlist_icon.innerText = main_counter.innerText;


        //********************************************************************************************************************
        
      },200);
      
      return data;
    }
   );

   window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.PRODUCT_ADDED_TO_WISHLIST,
    function (data) {
      console.log("AFTER_PRODUCTS_TRANSFORMED");
      setTimeout(()=>{
        let wishlist_icon = document.querySelector('.wizzy__featuredview__cartCount__Ttudn');
      let main_counter = document.querySelector('.wk-counter.wk-bubble');
      console.log(wishlist_icon);
      console.log(main_counter);
      if(wishlist_icon && main_counter)
        wishlist_icon.innerText = main_counter.innerText;
      },200);
      
      return data;
    }
   );

window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.ON_ADD_TO_CART_SUCCESS,
    function (data) {
      setTimeout(()=>{
        let main_cart_count = document.querySelector('.cart-count-bubble span');
        let cart_count = document.querySelector('.wizzy__cart__count');
        if(cart_count && main_cart_count)
        {
          cart_count.innerText = main_cart_count.innerText;
        }
        else if(cart_count)
        {
          cart_count.style.setProperty("display", "none", "important");
        }
      },200);
      return data;
    }
   );
window.featuredViewConfig.events.registerEvent(
    window.featuredViewConfig.events.allowedEvents.ADD_TO_CART,
    function (data) {
      console.log("Add_to_cart", data);
      let variant_id = data.currentProduct.productVariantPrices[0].variationId;
      const formData = new FormData();
      formData.append("items[0][id]", variant_id);
      formData.append("quantity", "1");
      formData.append("items[0][properties][saving_price]", "product-id");
      formData.append("items[0][properties][_ref_id]", "1747046555393");
      fetch("https://in.kalkifashion.com/cart/",{
        method: "GET",
      });
      fetch("https://in.kalkifashion.com/cart/add", {
        method: "POST",
        body: formData,
      })
      .then(response => response.text())
      .then(data => {
        console.log("Response data:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
      let cart_count = document.querySelector('.wizzy__cart__count');
      if (cart_count) {
        if(cart_count.style.display === "none")
        {
          cart_count.style.setProperty("display", "block", "important");
          cart_count.textContent = '1';
        }
        else
        {
          let currentCount = parseInt(cart_count.textContent.trim(), 10) || 0;
          cart_count.textContent = (currentCount + 1).toString();
        }
      }
      return data;
    }
   );