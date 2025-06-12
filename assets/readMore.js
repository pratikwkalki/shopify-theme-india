// document.querySelectorAll('.read-more-container').forEach(container => {
//       const content = container.querySelector('.read-more-content');
//       const button = container.querySelector('.read-more-button');

//       if (content.scrollHeight <= content.offsetHeight) {
//         button.classList.add('hidden');
//       }

//       button.addEventListener('click', () => {
//         content.classList.toggle('expanded');
//         button.textContent = content.classList.contains('expanded') ? 'Read less' : 'Read more';
//       });
//     });


document.querySelectorAll('.read-more-container').forEach(container => {
      const contentEl = container.querySelector('.read-more-content');
      const button = container.querySelector('.read-more-button');
      const fullText = contentEl.textContent.trim();
      const words = fullText.split(/\s+/);
      const wordLimit = 40;

      if (words.length <= wordLimit) {
        button.style.display = 'none';
        return;
      }

      const shortText = words.slice(0, wordLimit).join(' ') + '...';
      let isExpanded = false;

      contentEl.textContent = shortText;

      button.addEventListener('click', () => {
        isExpanded = !isExpanded;
        contentEl.textContent = isExpanded ? fullText : shortText;
        button.textContent = isExpanded ? 'Read less' : 'Read more';
      });
    });