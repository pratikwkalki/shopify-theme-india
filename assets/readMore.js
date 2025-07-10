


// document.querySelectorAll('.read-more-container').forEach(container => {
//       const contentEl = container.querySelector('.read-more-content');
//       const button = container.querySelector('.read-more-button');
//       const fullText = contentEl.textContent.trim();
//       const words = fullText.split(/\s+/);
//       const wordLimit = 40;

//       if (words.length <= wordLimit) {
//         button.style.display = 'none';
//         return;
//       }

//       const shortText = words.slice(0, wordLimit).join(' ') + '...';
//       let isExpanded = false;

//       contentEl.textContent = shortText;

//       button.addEventListener('click', () => {
//         isExpanded = !isExpanded;
//         contentEl.textContent = isExpanded ? fullText : shortText;
//         button.textContent = isExpanded ? 'Read less' : 'Read more';
//       });
//     });


// document.addEventListener('DOMContentLoaded', function () {
//       document.querySelectorAll('.read-more-container').forEach(container => {
//         const contentEl = container.querySelector('.read-more-content');
//         const button = container.querySelector('.read-more-button');

//         // Only proceed if the button is visible
//         if (button.classList.contains('hidden')) return;

//         const fullText = contentEl.dataset.fullText;
//         const shortText = contentEl.textContent.trim();
//         let isExpanded = false;

//         button.addEventListener('click', () => {
//           isExpanded = !isExpanded;
//           contentEl.textContent = isExpanded ? fullText : shortText;
//           button.textContent = isExpanded ? 'Read less' : 'Read more';
//         });
//       });
//     });


document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.read-more-button');
    const truncated = document.querySelector('.read-more-content');
    const full = document.querySelector('.full-description');

    if (button) {
      button.addEventListener('click', function () {
        if (full.classList.contains('hidden')) {
          truncated.classList.add('hidden');
          full.classList.remove('hidden');
          button.textContent = 'Read less';
        } else {
          full.classList.add('hidden');
          truncated.classList.remove('hidden');
          button.textContent = 'Read more';
        }
      });
    }
  });