const findBlockByAlias = (alias) => {
  return $(".reviews-item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") == alias;
  });
};
$(".reviews-switcher__link").click((e) => { 
  e.preventDefault();


  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".reviews-switcher__item");


  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
}); 