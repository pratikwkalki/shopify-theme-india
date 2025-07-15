  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('js-ready');

    const wrapper = document.querySelector('.read-more-wrapper');
    if(wrapper) {
      const preview = wrapper.querySelector('.read-more-content.preview');
      const full = wrapper.querySelector('.read-more-content.full');
      const readMoreBtn = wrapper.querySelector('.read-more-button.read-more');
      const readLessBtn = wrapper.querySelector('.read-more-button.read-less');
  
      // Detect screen size: 10 for mobile, 40 for desktop
      const isMobile = window.innerWidth <= 768;
      const wordLimit = isMobile ? 10 : 40;
  
      // Clone full HTML and limit it to `wordLimit` words
      const fullHTML = preview.innerHTML;
      const div = document.createElement('div');
      div.innerHTML = fullHTML;
  
      let wordCount = 0;
      const truncated = document.createElement('div');
  
      function cloneWithLimit(node) {
        if (wordCount >= wordLimit) return null;
  
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.trim().split(/\s+/).filter(Boolean);
          if (words.length === 0) return null;
  
          const take = Math.min(wordLimit - wordCount, words.length);
          wordCount += take;
  
          const text = words.slice(0, take).join(' ');
          return document.createTextNode(text + (wordCount >= wordLimit ? '...' : ' '));
        }
  
        if (node.nodeType === Node.ELEMENT_NODE) {
          const clone = node.cloneNode(false);
          for (const child of node.childNodes) {
            const limited = cloneWithLimit(child);
            if (limited) clone.appendChild(limited);
            if (wordCount >= wordLimit) break;
          }
          return clone;
        }
  
        return null;
      }
  
      for (const child of div.childNodes) {
        const limited = cloneWithLimit(child);
        if (limited) truncated.appendChild(limited);
        if (wordCount >= wordLimit) break;
      }
  
      preview.innerHTML = truncated.innerHTML;
  
      // Hide full content initially
      full.classList.remove('show');
  
      // Toggle logic
      readMoreBtn.addEventListener('click', function () {
        preview.style.display = 'none';
        full.classList.add('show');
        readMoreBtn.style.display = 'none';
        readLessBtn.style.display = 'inline-block';
      });
  
      readLessBtn.addEventListener('click', function () {
        full.classList.remove('show');
        preview.style.display = 'block';
        readMoreBtn.style.display = 'inline-block';
        readLessBtn.style.display = 'none';
      });
    }
  });
