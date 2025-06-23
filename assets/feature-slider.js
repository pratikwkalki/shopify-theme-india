
window.addEventListener('load', function () {
  const cardMedia = document.querySelector('.card_media_new');
  const sliderButtons = document.querySelector('.slider-buttons-new');

  if (sliderButtons) {
    sliderButtons.classList.remove('display-none');
  }
  if (cardMedia && sliderButtons) {
    const cardHeight = cardMedia.offsetHeight;
    const marginTop = cardHeight / 2;

    sliderButtons.style.marginTop = `${marginTop}px`;
  }
});