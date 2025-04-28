window.featuredViewConfig.events.registerEvent(
  window.featuredViewConfig.events.allowedEvents.AFTER_PRODUCTS_FETCHED,
  function (data) {
    console.log(data);
    return data;
  }
);
