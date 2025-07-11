document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll(".extra-cost-select");
  const inputs = document.querySelectorAll(".extra-cost-input");
  const totalCostInput = document.getElementById("total_cost_input");

  if (selects.length > 0) {

    function updateTotalCost() {
      let total = 0;

      inputs.forEach(input => {
        const amount = parseFloat(input.getAttribute("data-amount")) || 0;
        total += amount;
      });

      if (totalCostInput) {
        totalCostInput.value = Math.round(total);
        if (total > 0) {
          totalCostInput.setAttribute("name", `items[0][properties][_extra_total]`);
        } else {
          totalCostInput.removeAttribute("name");
        }
      }

      const cartPrices = document.querySelectorAll("#aditional_costtotal");
      const mainPrices = document.querySelectorAll('.Product_price_main_new [data-pdp-product-price]');

      cartPrices.forEach((cartPriceEl, index) => {
        const mainPriceEl = mainPrices[index];
        if (mainPriceEl) {
          const rawPrice = mainPriceEl.dataset.pdpProductPrice || "0";
          const base = parseFloat(rawPrice.replace(/,/g, "")) || 0;
          const final = base + total;
          cartPriceEl.textContent = '₹ ' + Math.round(final);
        }
      });

      // Set name attributes only if price is present
      inputs.forEach(input => {
        const label = input.dataset.costName;
        const amount = parseFloat(input.getAttribute("data-amount")) || 0;
        input.setAttribute("name", `items[0][properties][${label}]`);
      });
    }

    selects.forEach(select => {
      select.addEventListener("change", function () {
        const label = this.dataset.costName;
        const input = document.querySelector(`.extra-cost-input[data-cost-name="${label}"]`);
        const selectedOption = this.options[this.selectedIndex];
        const selectedText = selectedOption.textContent.trim();
        const selectedValue = this.value.trim();

        if (input) {
          if (selectedText.includes("₹")) {
            const match = selectedText.match(/₹\s?(\d+)/);
            const amount = match ? match[1] : "0";
            input.setAttribute("data-amount", amount);
            input.value = this.value
          } else {
            input.setAttribute("data-amount", "0");
            input.value = selectedText;
          }
        }

        updateTotalCost();
        setTimeout(updateTotalCost, 1100);

        // Optional UI toggles
        document.querySelectorAll(".Shipping_orders.order_msg").forEach(el => el.style.display = "none");
        document.querySelectorAll(".Shipping_orders.additional_message").forEach(el => el.style.display = "block");
        document.querySelectorAll(".metafield-rich_text_field.details_feilds").forEach(el => el.style.display = "none");
        document.querySelectorAll(".metafield-rich_text_field.additional").forEach(el => el.style.display = "block");
        document.querySelectorAll(".bottom_text.regular-text").forEach(el => el.style.display = "none");
        document.querySelectorAll(".bottom_text.return-text-none").forEach(el => el.style.display = "block");
      });
    });

    // Also recalculate when radio input changes
    document.querySelectorAll(".product-form__input input[type=radio]").forEach(radio => {
      radio.addEventListener("change", function () {
        setTimeout(updateTotalCost, 1000);
      });
    });
  }
});
