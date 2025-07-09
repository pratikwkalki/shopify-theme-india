/* document.addEventListener("DOMContentLoaded", function () {
    console.log("loaded.....");

    // Get elements
     const additionalSelect = document.getElementById("main_aditional");
      const embroiderySelect = document.getElementById("main_embroidery");

      const additionalInput = document.getElementById("additional_cost_input");
      const embroideryInput = document.getElementById("embroidery_cost_input");
      const totalCostInput = document.getElementById("total_cost_input");
      
      
      // Function to format the price with commas and Indian numbering system
      function formatPriceIndia(price) {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(price);
      }

      // Modify your updateTotalCost function to format finalPrice properly in INR
      function updateTotalCost() {
        // Extract numeric value from additionalInput and embroideryInput
        const additionalPrice = parseFloat(additionalInput.value) || 0; // Default to 0 if no value
        const embroideryPrice = parseFloat(embroideryInput.value) || 0; // Default to 0 if no value
      
        const totalPrice = additionalPrice + embroideryPrice; // Sum the prices
        console.log("totalPrice", totalPrice);
      
        // Update the total cost (keep two decimal places)
      // Update the total cost (keep two decimal places)
        totalCostInput.value = totalPrice.toFixed(2); 
        
        const cartPrices = document.querySelectorAll("#aditional_costtotal");
        console.log("cartPrices", cartPrices);
        
        cartPrices.forEach(cartprice => {
            if (cartprice) {
                const carttotalprice = cartprice.getAttribute("data-price");
                console.log("carttotalprice", carttotalprice);  
        
                // Convert cart total price to a number (assuming it's in string format)
                const cartTotalPriceNum = parseFloat(carttotalprice.replace(/[^0-9.-]+/g, ""));
              
                // Calculate the final price
                const finalPrice = cartTotalPriceNum + totalPrice;
                console.log("finalPrice", finalPrice);
              
                // Format the final price in Indian currency without decimals
                const formattedFinalPrice = formatPriceIndia(finalPrice);
                console.log("Formatted finalPrice", formattedFinalPrice);
              
                // Display formatted final price in cart
                cartprice.textContent = formattedFinalPrice;
            }
        });

         // Dynamically add/remove the name attribute
        updateInputAttributes(additionalInput, "items[0][properties[Additional Cost]]");
        updateInputAttributes(embroideryInput, "items[0][properties[Embroidery Cost]]");
        updateInputAttributes(totalCostInput, "items[0][properties[_extra_total]]");
      }
       // Function to add/remove the name attribute dynamically
        function updateInputAttributes(input, name) {
            if (input.value.trim() !== "0") {
                input.setAttribute("name", name);
            } else {
                input.removeAttribute("name");
            }
        }
     // Event listeners for changes in the selections
      if(additionalSelect){
         additionalSelect.addEventListener("change", function () {
         console.log("change...!!!!");
            additionalInput.value = this.value;
            updateTotalCost();
        
            const orderMsgElement = document.querySelector(".Shipping_orders.order_msg");
            if (orderMsgElement) {
                orderMsgElement.style.display = "none";
            }
        
            const additionalMessageElement = document.querySelector(".Shipping_orders.additional_message");
            if (additionalMessageElement) {
                additionalMessageElement.style.display = "block";
            }
        
            document.querySelectorAll(".metafield-rich_text_field.details_feilds").forEach(element => {
                element.style.display = "none";
            });
        
            document.querySelectorAll(".metafield-rich_text_field.additional").forEach(element => {
                element.style.display = "block";
            });           
        
             // Reference the elements
        
            document.querySelectorAll(".bottom_text.regular-text").forEach(element => {
                element.style.display = "none";
            });
        
            document.querySelectorAll(".bottom_text.return-text-none").forEach(element => {
                element.style.display = "block";
            });
        });
      }
      
      if(embroiderySelect){
            embroiderySelect.addEventListener("change", function () {
            embroideryInput.value = this.value;
            updateTotalCost();
        
            const orderMsgElement = document.querySelector(".Shipping_orders.order_msg");
            if (orderMsgElement) {
                orderMsgElement.style.display = "none";
            }
        
            const additionalMessageElement = document.querySelector(".Shipping_orders.additional_message");
            if (additionalMessageElement) {
                additionalMessageElement.style.display = "block";
            }
        
            document.querySelectorAll(".metafield-rich_text_field.details_feilds").forEach(element => {
                element.style.display = "none";
            });
        
            document.querySelectorAll(".metafield-rich_text_field.additional").forEach(element => {
                element.style.display = "block";
            });

          // Reference the elements
        
            document.querySelectorAll(".bottom_text.regular-text").forEach(element => {
                element.style.display = "none";
            });
        
            document.querySelectorAll(".bottom_text.return-text-none").forEach(element => {
                element.style.display = "block";
            });
        });
      }
});


 */

document.addEventListener("DOMContentLoaded", function () {
  const additionalSelects = document.querySelectorAll("#main_aditional");
  const embroiderySelects = document.querySelectorAll("#main_embroidery");

  const additionalInputs = document.querySelectorAll("#additional_cost_input");
  const embroideryInputs = document.querySelectorAll("#embroidery_cost_input");
  const totalCostInputs = document.querySelectorAll("#total_cost_input");

  function formatPriceIndia(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  function updateTotalCost(index) {
    const additionalInput = additionalInputs[index];
    const embroideryInput = embroideryInputs[index];
    const totalCostInput = totalCostInputs[index];

    const additionalPrice = parseFloat(additionalInput.value) || 0;
    const embroideryPrice = parseFloat(embroideryInput.value) || 0;
    const totalPrice = additionalPrice + embroideryPrice;

    totalCostInput.value = totalPrice.toFixed(2);

    const cartPrices = document.querySelectorAll("#aditional_costtotal");
    cartPrices.forEach((cartprice) => {
      const carttotalprice = cartprice.getAttribute("data-price");
      const cartTotalPriceNum = parseFloat(
        carttotalprice.replace(/[^0-9.-]+/g, "")
      );
      const finalPrice = cartTotalPriceNum + totalPrice;
      const formattedFinalPrice = formatPriceIndia(finalPrice);
      cartprice.textContent = formattedFinalPrice;
    });

    updateInputAttributes(additionalInput, "items[0][properties[Additional Cost]]");
    updateInputAttributes(embroideryInput, "items[0][properties[Embroidery Cost]]");
    updateInputAttributes(totalCostInput, "items[0][properties[_extra_total]]");
  }

  function updateInputAttributes(input, name) {
    if (input.value.trim() !== "0") {
      input.setAttribute("name", name);
    } else {
      input.removeAttribute("name");
    }
  }

  additionalSelects.forEach((select, index) => {
    select.addEventListener("change", function () {
      additionalInputs[index].value = this.value;
      updateTotalCost(index);

      const orderMsg = document.querySelectorAll(".Shipping_orders.order_msg")[index];
      if (orderMsg) orderMsg.style.display = "none";

      const additionalMsg = document.querySelectorAll(".Shipping_orders.additional_message")[index];
      if (additionalMsg) additionalMsg.style.display = "block";

      document.querySelectorAll(".metafield-rich_text_field.details_feilds").forEach((el) => {
        el.style.display = "none";
      });

      document.querySelectorAll(".metafield-rich_text_field.additional").forEach((el) => {
        el.style.display = "block";
      });

      document.querySelectorAll(".bottom_text.regular-text").forEach((el) => {
        el.style.display = "none";
      });

      document.querySelectorAll(".bottom_text.return-text-none").forEach((el) => {
        el.style.display = "block";
      });
    });
  });

  embroiderySelects.forEach((select, index) => {
    select.addEventListener("change", function () {
      embroideryInputs[index].value = this.value;
      updateTotalCost(index);

      const orderMsg = document.querySelectorAll(".Shipping_orders.order_msg")[index];
      if (orderMsg) orderMsg.style.display = "none";

      const additionalMsg = document.querySelectorAll(".Shipping_orders.additional_message")[index];
      if (additionalMsg) additionalMsg.style.display = "block";

      document.querySelectorAll(".metafield-rich_text_field.details_feilds").forEach((el) => {
        el.style.display = "none";
      });

      document.querySelectorAll(".metafield-rich_text_field.additional").forEach((el) => {
        el.style.display = "block";
      });

      document.querySelectorAll(".bottom_text.regular-text").forEach((el) => {
        el.style.display = "none";
      });

      document.querySelectorAll(".bottom_text.return-text-none").forEach((el) => {
        el.style.display = "block";
      });
    });
  });
});
