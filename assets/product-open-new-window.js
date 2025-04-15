 document.addEventListener("DOMContentLoaded", function () {
    const isWideScreen = window.innerWidth > 768;

    document.querySelectorAll('a[data-open-in-new-tab="true"]').forEach(link => {
      if (isWideScreen) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      } else {
        link.removeAttribute("target");
      }
    });
  });