// Scroll to target section on size tab click
document.querySelector('.size-tabs a').addEventListener('click', (event) => {
  event.preventDefault();
  const targetSection = document.querySelector(event.target.getAttribute('href'));
  targetSection?.scrollIntoView({ behavior: 'smooth' });
});

let isEventFromCode = false;
const updateSubmitPopupButtonState = () => {
  const selectedValue = document.querySelector('[js-pdp-size-chart-popup] .product-form__input_wrap input[name="Size"]:checked');
  const submitPopupButton = document.getElementById('submit-popup');
  if (selectedValue) {
    submitPopupButton.disabled = false; // Enable button if a size is selected
    if (!isEventFromCode) {
      isEventFromCode = true; // Set flag to prevent recursion
      const mainProductVariant = document.querySelector(`.product-custom .main-grid input[name="Size"][value="${selectedValue?.value}"]`);
        if (mainProductVariant) {
          if (!mainProductVariant.checked) {
            mainProductVariant.checked = true;
            mainProductVariant.dispatchEvent(new Event('change', { bubbles: true }));
            document.querySelector(`label[for="${mainProductVariant.id}"]`)?.click();
          }
        }
      isEventFromCode = false; // Reset flag after event is dispatched
    }
    
  } else {
    submitPopupButton.disabled = true; // Disable button if no size is selected
  }
};
updateSubmitPopupButtonState();
// Normalize variant names
const normalizeVariantName = name => name.replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ').trim().toLowerCase();

// Handle table size chart selection
const tableSizeChartContainers = document.querySelectorAll('[js-pdp-size-chart-popup] .size-radio');
const sizeChartFormVariants = document.querySelectorAll('[js-pdp-size-chart-popup] .product-form__input_wrap input[name="Size"]');
const handleSelection = (selectedVariantValue) => {
  tableSizeChartContainers.forEach(container => {
    container.querySelectorAll('input[name="sizeTable"]').forEach(variant => {
      const parentElement = variant.closest('tr');
      const isSelected = normalizeVariantName(variant.value) === selectedVariantValue;
      variant.checked = isSelected;
      parentElement.classList.toggle('selected', isSelected);
      sizeChartFormVariants.forEach(formVariant => {
        if (normalizeVariantName(formVariant.value) === selectedVariantValue) {
          document.querySelector(`label[for="${formVariant.id}"]`)?.dispatchEvent(new Event('click'));;
        }
      });
      
      if (isSelected) {
        const indiaSize = parentElement.querySelector('[data-india-size]')?.dataset.indiaSize;
        const normalizedIndiaSize = normalizeVariantName(indiaSize);

        const matchingFormVariant = Array.from(sizeChartFormVariants).find(formVariant => {
          const normalizedValue = normalizeVariantName(formVariant.value);
          return normalizedValue === normalizedIndiaSize;
        });
        const allowedIndiaSizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']; // Add what you support
        if (matchingFormVariant) {
          const normalizedValue = normalizeVariantName(matchingFormVariant.value);
          if (allowedIndiaSizes.includes(normalizedValue)) {
            matchingFormVariant.checked = true;
            matchingFormVariant.dispatchEvent(new Event('click', { bubbles: true }));
            document.querySelector(`label[for="${matchingFormVariant.id}"]`)?.dispatchEvent(new Event('click'));
            parentElement.classList.toggle('selected', isSelected);
          }
        }
      }
    });
  });

  sizeChartFormVariants.forEach(sizeChartVariant => {
    if (normalizeVariantName(sizeChartVariant.value) === selectedVariantValue) {
      sizeChartVariant.checked = true;
      sizeChartVariant.dispatchEvent(new Event('change'));
      updateSubmitPopupButtonState()
    }
  });
};

// Handle click events on table size and form size variants
tableSizeChartContainers.forEach(container => {
  container.querySelectorAll('input[name="sizeTable"]').forEach(variant => {
    variant.addEventListener('click', () => handleSelection(normalizeVariantName(variant.value)));
  });
});
sizeChartFormVariants.forEach(variant => {
  variant.addEventListener('click', () => handleSelection(normalizeVariantName(variant.value)));
  
});


tableSizeChartContainers.forEach(container => {
  container.querySelectorAll('input[name="sizeTable"]').forEach(variant => {
    const correspondingFormVariant = Array.from(sizeChartFormVariants).find(formVariant => normalizeVariantName(formVariant.value) === normalizeVariantName(variant.value));
    const parentElement = variant.closest('tr');
    const formVariantParent = correspondingFormVariant?.closest('.product-form__input_wrap');

    if (!correspondingFormVariant) {
      parentElement?.classList.add('hide');
    } else {
      parentElement?.classList.remove('hide');

      if (correspondingFormVariant.disabled) {
        parentElement?.classList.add('disabled'); 
      } else {
        parentElement?.classList.remove('disabled'); 
      }
      if (formVariantParent?.classList.contains('hidden')) {
        parentElement?.classList.add('hide'); 
      } else {
        parentElement?.classList.remove('hide'); 
      }
    }
  });
});

const sizeCountMap = {};

tableSizeChartContainers.forEach(container => {
  container.querySelectorAll('input[name="sizeTable"]').forEach(variant => {
    const parentElement = variant.closest('tr');
    const indiaSize = parentElement.querySelector('[data-india-size]')?.dataset.indiaSize;
    if (!indiaSize) {
      parentElement?.classList.add('hide');
      return;
    }
    const normalizedIndiaSize = normalizeVariantName(indiaSize);
    const isFirstSet = ['xs', 's', 'm'].includes(normalizedIndiaSize);
    const correspondingFormVariant = Array.from(sizeChartFormVariants).find(formInput =>
      normalizeVariantName(formInput.value) === normalizedIndiaSize
    );
    const formVariantParent = correspondingFormVariant?.closest('.product-form__input_wrap');
    if (!!correspondingFormVariant) {
        sizeCountMap[normalizedIndiaSize] = (sizeCountMap[normalizedIndiaSize] || 0) + 1;
      const currentCount = sizeCountMap[normalizedIndiaSize];
      if ((isFirstSet && currentCount === 1) || (!isFirstSet && currentCount > 1)) {
        parentElement?.classList.add('hide');
        return;
      }
      if (!correspondingFormVariant) {
        parentElement?.classList.add('hide');
        return;
      }
      parentElement?.classList.remove('hide');
      if (correspondingFormVariant.disabled) {
        parentElement?.classList.add('disabled');
      } else {
        parentElement?.classList.remove('disabled');
      }
      if (formVariantParent?.classList.contains('hidden')) {
        parentElement?.classList.add('hide');
      }
    }
  });
});



// Convert size units
const inchBtn = document.querySelector('[js-size-convert-btn-inch]');
const cmBtn = document.querySelector('[js-size-convert-btn-cm]');
const convertibleCells = document.querySelectorAll('.convertible');
const inchToCm = 2.54;

const convertToCm = () => {
  convertibleCells.forEach(cell => cell.textContent = (parseFloat(cell.getAttribute('data-inch')) * inchToCm).toFixed(2));
};

const convertToInches = () => {
  convertibleCells.forEach(cell => cell.textContent = cell.getAttribute('data-inch'));
};

inchBtn.addEventListener('click', () => !inchBtn.classList.contains('active') && convertToInches());
cmBtn.addEventListener('click', () => !cmBtn.classList.contains('active') && convertToCm());

// Sync size chart with product variant change
document.querySelectorAll('.product-custom .main-grid input[name="Size"]').forEach(mainProductVariant => {
  mainProductVariant.addEventListener('change', () => {
    if (mainProductVariant.checked) {
      const selectedValue = normalizeVariantName(mainProductVariant.value);
      sizeChartFormVariants.forEach(sizeChartVariant => {
        if (normalizeVariantName(sizeChartVariant.value) === selectedValue) {
          sizeChartVariant.checked = true;
          sizeChartVariant.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      document.querySelectorAll('[js-pdp-size-chart-popup] .size-radio input[name="sizeTable"]').forEach(tableVariant => {
        const parentElement = tableVariant.closest('tr');
        const tableVariantValue = normalizeVariantName(tableVariant.value);
        const indiaSize = parentElement.querySelector('[data-india-size]')?.dataset.indiaSize;
        const normalizedIndiaSize = normalizeVariantName(indiaSize || '');

        parentElement.classList.toggle('selected', tableVariantValue === selectedValue);

        if (normalizedIndiaSize === selectedValue) {
          tableVariant.checked = true;
          tableVariant.dispatchEvent(new Event('change', { bubbles: true }));
          const matchingIndiaSizeVariant = Array.from(sizeChartFormVariants).find(v =>
            normalizeVariantName(v.value) === normalizedIndiaSize
          );
          if (matchingIndiaSizeVariant) {
            const normalized = normalizeVariantName(matchingIndiaSizeVariant.value);
            const allowedIndiaSizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
            if (allowedIndiaSizes.includes(normalized)) {
              parentElement.classList.add('selected');
            } else {
              parentElement.classList.remove('selected');
            }
          }
        }
      });

      updateSubmitPopupButtonState();
    }
  });
});