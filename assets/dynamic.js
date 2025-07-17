document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll(".extra-cost-select");
  const inputs = document.querySelectorAll(".extra-cost-input");
  const totalCostInput = document.getElementById("total_cost_input");
  if (selects.length > 0) {
    function updateTotalCost() {
      let extraOptionsTotal = 0;
  
      // Get total from select boxes
      selects.forEach(select => {
        const label = select.dataset.costName;
        const input = document.querySelector(`.extra-cost-input[data-cost-name="${label}"]`);
        const selectedOption = select.options[select.selectedIndex];
        const selectedText = selectedOption.textContent.trim();
        const selectedValue = select.value.trim();
  
        if (input) {
          if (selectedValue === "") {
            input.value = "";
            input.setAttribute("data-amount", "0");
            input.removeAttribute("name");
          } else if (selectedText.includes("₹")) {
            const match = selectedText.match(/₹\s?(\d+)/);
            const amount = match ? match[1] : "0";
            input.setAttribute("data-amount", amount);
            input.value = selectedText;
            input.setAttribute("name", `items[0][properties][${label}]`);
            extraOptionsTotal += parseFloat(amount);
          } else {
            input.setAttribute("data-amount", "0");
            input.value = selectedText;
            input.setAttribute("name", `items[0][properties][${label}]`);
          }
        }
      });
  
      // Upsell total (not in extra_total!)
      let totalUpsellProductPrice = 0;
      const upsellProducts = document.querySelectorAll('[js-product-details] upsell-product input:checked');
      upsellProducts.forEach(item => {
        const parent = item.closest('upsell-product');
        const price = parent?.dataset.upsellProductPrice || "0";
        totalUpsellProductPrice += parseFloat(price.replace(/,/g, '')) || 0;
      });
  
      // Set form input for extra only (no upsell)
      if (totalCostInput) {
        totalCostInput.value = Math.round(extraOptionsTotal);
        if (extraOptionsTotal > 0) {
          totalCostInput.setAttribute("name", `items[0][properties][_extra_total]`);
        } else {
          totalCostInput.removeAttribute("name");
        }
      }
  
      // Show combined total (base + select + upsell)
      const cartPrices = document.querySelectorAll("#aditional_costtotal");
      const mainPrices = document.querySelectorAll('.Product_price_main_new [data-pdp-product-price]');
      cartPrices.forEach((cartPriceEl, index) => {
        const mainPriceEl = mainPrices[index];
        if (mainPriceEl) {
          const rawPrice = mainPriceEl.dataset.pdpProductPrice || "0";
          const base = parseFloat(rawPrice.replace(/,/g, "")) || 0;
          const final = base + extraOptionsTotal + totalUpsellProductPrice;
          cartPriceEl.textContent = '₹ ' + Math.round(final);
        }
      });
    }
  
    // Listen to select box changes
    selects.forEach(select => {
      select.addEventListener("change", function () {
        updateTotalCost();
        setTimeout(updateTotalCost, 1100);
        document.querySelectorAll(".Shipping_orders.order_msg").forEach(el => el.style.display = "none");
        document.querySelectorAll(".metafield-rich_text_field.details_feilds").forEach(el => el.style.display = "none");
        document.querySelectorAll(".metafield-rich_text_field.additional").forEach(el => el.style.display = "block");
        document.querySelectorAll(".bottom_text.regular-text").forEach(el => el.style.display = "none");
        document.querySelectorAll(".bottom_text.return-text-none").forEach(el => el.style.display = "block");
      });
    });
  
    // Listen to upsell checkbox changes
    const upsellCheckboxes = document.querySelectorAll('[js-product-details] upsell-product input');
    upsellCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", function () {
        updateTotalCost();
        setTimeout(updateTotalCost, 1100);
      });
    });
  
    // Radio input changes (product options)
    document.querySelectorAll(".product-form__input input[type=radio]").forEach(radio => {
      radio.addEventListener("change", function () {
        setTimeout(updateTotalCost, 1000);
      });
    });
  }
});
