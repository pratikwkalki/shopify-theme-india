window.featuredViewConfig.events.registerEvent(
  window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_FETCHED,
  function (data) {
    console.log(data);
    data?.payload?.result.forEach((product) => {
      if (product) {
        product.video = "https://play.gumlet.io/embed/67c941d69f16a95954e33a06";
      }
    });
    return data;
  }
);
