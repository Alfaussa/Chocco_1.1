const slider = $(".slider").bxSlider({
  pager: false,
  controls: false
});

$(".arrow-left").click((e) => {

  slider.goToPrevSlide();

});

$(".arrow-right").click((e) => {

  slider.goToNextSlide();

});