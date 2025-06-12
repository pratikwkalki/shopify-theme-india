document.querySelectorAll('.read-more-container').forEach(container => {
      const content = container.querySelector('.read-more-content');
      const button = container.querySelector('.read-more-button');

      if (content.scrollHeight <= content.offsetHeight) {
        button.classList.add('hidden');
      }

      button.addEventListener('click', () => {
        content.classList.toggle('expanded');
        button.textContent = content.classList.contains('expanded') ? 'Read less' : 'Read more';
      });
    });