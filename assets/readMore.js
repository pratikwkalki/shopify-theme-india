


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


window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.read-more-container').forEach(container => {
        const contentEl = container.querySelector('.read-more-content');
        const button = container.querySelector('.read-more-button');

        const fullText = contentEl.textContent.trim();
        const words = fullText.split(/\s+/);
        const wordLimit = 40;

        if (words.length <= wordLimit) {
          button.classList.add('hidden'); // Hide button if content is short
          return;
        }

        const shortText = words.slice(0, wordLimit).join(' ') + '...';
        let isExpanded = false;

        contentEl.textContent = shortText;
        button.classList.remove('hidden');

        button.addEventListener('click', () => {
          isExpanded = !isExpanded;
          contentEl.textContent = isExpanded ? fullText : shortText;
          button.textContent = isExpanded ? 'Read less' : 'Read more';
        });
      });
    });