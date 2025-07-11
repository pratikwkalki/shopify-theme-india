


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



  // document.addEventListener('DOMContentLoaded', function () {
  //   const wrapper = document.querySelector('.read-more-wrapper');
  //   const preview = wrapper.querySelector('.read-more-content.preview');
  //   const full = wrapper.querySelector('.read-more-content.full');
  //   const readMoreBtn = wrapper.querySelector('.read-more-button.read-more');
  //   const readLessBtn = wrapper.querySelector('.read-more-button.read-less');

  //   const fullHTML = preview.innerHTML;
  //   const div = document.createElement('div');
  //   div.innerHTML = fullHTML;

  //   let wordCount = 0;
  //   const truncated = document.createElement('div');

  //   function cloneWithLimit(node) {
  //     if (wordCount >= 40) return null;

  //     if (node.nodeType === Node.TEXT_NODE) {
  //       const words = node.textContent.trim().split(/\s+/).filter(Boolean);
  //       if (words.length === 0) return null;

  //       const take = Math.min(40 - wordCount, words.length);
  //       wordCount += take;

  //       const text = words.slice(0, take).join(' ');
  //       // Add a space after the text if it's not the last word
  //       return document.createTextNode(text + (wordCount >= 40 ? '...' : ' '));
  //     }

  //     if (node.nodeType === Node.ELEMENT_NODE) {
  //       const clone = node.cloneNode(false);
  //       for (const child of node.childNodes) {
  //         const limited = cloneWithLimit(child);
  //         if (limited) clone.appendChild(limited);
  //         if (wordCount >= 40) break;
  //       }
  //       return clone;
  //     }

  //     return null;
  //   }

  //   for (const child of div.childNodes) {
  //     const limited = cloneWithLimit(child);
  //     if (limited) truncated.appendChild(limited);
  //     if (wordCount >= 40) break;
  //   }

  //   preview.innerHTML = truncated.innerHTML;

  //   // Toggle logic
  //   readMoreBtn.addEventListener('click', function () {
  //     preview.classList.add('hidden');
  //     full.classList.remove('hidden');
  //     readMoreBtn.classList.add('hidden');
  //     readLessBtn.classList.remove('hidden');
  //   });

  //   readLessBtn.addEventListener('click', function () {
  //     full.classList.add('hidden');
  //     preview.classList.remove('hidden');
  //     readLessBtn.classList.add('hidden');
  //     readMoreBtn.classList.remove('hidden');
  //   });
  // });



// document.addEventListener('DOMContentLoaded', function () {
//     document.body.classList.add('js-ready');

//     const wrapper = document.querySelector('.read-more-wrapper');
//     const preview = wrapper.querySelector('.read-more-content.preview');
//     const full = wrapper.querySelector('.read-more-content.full');
//     const readMoreBtn = wrapper.querySelector('.read-more-button.read-more');
//     const readLessBtn = wrapper.querySelector('.read-more-button.read-less');

//     // Clone full HTML and limit it to 40 words with formatting preserved
//     const fullHTML = preview.innerHTML;
//     const div = document.createElement('div');
//     div.innerHTML = fullHTML;

//     let wordCount = 0;
//     const truncated = document.createElement('div');

//     function cloneWithLimit(node) {
//       if (wordCount >= 40) return null;

//       if (node.nodeType === Node.TEXT_NODE) {
//         const words = node.textContent.trim().split(/\s+/).filter(Boolean);
//         if (words.length === 0) return null;

//         const take = Math.min(40 - wordCount, words.length);
//         wordCount += take;

//         const text = words.slice(0, take).join(' ');
//         return document.createTextNode(text + (wordCount >= 40 ? '...' : ' '));
//       }

//       if (node.nodeType === Node.ELEMENT_NODE) {
//         const clone = node.cloneNode(false);
//         for (const child of node.childNodes) {
//           const limited = cloneWithLimit(child);
//           if (limited) clone.appendChild(limited);
//           if (wordCount >= 40) break;
//         }
//         return clone;
//       }

//       return null;
//     }

//     for (const child of div.childNodes) {
//       const limited = cloneWithLimit(child);
//       if (limited) truncated.appendChild(limited);
//       if (wordCount >= 40) break;
//     }

//     preview.innerHTML = truncated.innerHTML;

//     // Hide full content initially
//     full.classList.remove('show');

//     // Toggle logic
//     readMoreBtn.addEventListener('click', function () {
//       preview.style.display = 'none';
//       full.classList.add('show');
//       readMoreBtn.style.display = 'none';
//       readLessBtn.style.display = 'inline-block';
//     });

//     readLessBtn.addEventListener('click', function () {
//       full.classList.remove('show');
//       preview.style.display = 'block';
//       readMoreBtn.style.display = 'inline-block';
//       readLessBtn.style.display = 'none';
//     });
//   });



  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('js-ready');

    const wrapper = document.querySelector('.read-more-wrapper');
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
  });
