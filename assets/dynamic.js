document.addEventListener("DOMContentLoaded", function () {
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


