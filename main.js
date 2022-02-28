const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".opened__menu");
const close = document.querySelector(".close-icon");
const body = document.querySelector("body");
const menuList = document.querySelector(".menu__list--opened");

hamburger.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.add("opened__menu--active");
  body.classList.add("noscroll");
});

close.addEventListener("click", function(event) {
  menu.classList.remove("opened__menu--active");
  body.classList.remove("noscroll");
});

menuList.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.remove("opened__menu--active");
  body.classList.remove("noscroll");
});


;const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
};

const closeEveryItem = container => {
  const items = container.find(".team__content");
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
};


$('.team__title').click (e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else { 
    closeEveryItem(container);
    openItem($this);
  }
});;let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [57.708870, 11.974560],
   zoom: 11,
   controls: [],
   garg: false,
 });
 
 let coords = [
     [57.78092897893155, 11.989493586343999],
     [57.72747991234878, 11.95783423148954],
     [57.68380486944938, 11.936570485691767],
     [57.663843251732786, 12.031548550255145],     
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: 'images/marker.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);;const mesureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".products-menu__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;  
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

const closeEveryItemInContainer = (container) => {
  const items = container.find(".products-menu__item");
  const content = container.find (".products-menu__content");

  items.removeClass("active");
  content.width(0);
};

const openingItem = item => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".products-menu__container");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};

$(".products-menu__title").on("click", (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".products-menu");

  if (itemOpened) {
    closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    openingItem(item);
  }
});

$(".products-menu__close").on("click", (e) => {
  e.preventDefault();

  closeEveryItemInContainer($(".products-menu"));
});;const validateFields = (form, fieldsArray) => {
  
  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if(field.val().trim()== "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find('.input-error');

  return errorFields.length == 0;
}
$('.form').submit((e)=> {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find("modal__content")

  const isValid = validateFields(form, [name, phone, comment, to]);

  modal.removeClass("error-modal");
  
  if(isValid) {
   const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },
    });

    request.done((data) => {
      content.text(data.message);
      });

    request.fail((data) => {   
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });

    request.always(() => {
      $.fancybox.open({
        src: "#modal",
        type: "inline",
          
      });
    });
   }
});

$('.button-close').click(e => { 
  e.preventDefault();

  const form = $(e.currentTarget);

  $.fancybox.close();
  
  $('#form')[0].reset();
});

;const sections = $("section");
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active"); 
const perfomTransition = (sectionEq) => {

  if(inScroll == false) {
  inScroll = true;
  const position = sectionEq * -100;

  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const sideMenu = $(".fixed-menu");

  if (menuTheme == "black") {
    sideMenu.addClass("fixed-menu--shadowed");
  } else {
    sideMenu.removeClass("fixed-menu--shadowed");
  }
  display.css({
    transform: `translateY(${position}%)`
    });


    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

        

    setTimeout(() => {
          inScroll = false;
         
          sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");
          
         }, 1300);


  }
  }
const scrollViewport = direction => {
  const activeSection = sections.filter(".active"); 
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == "next" && nextSection.length) {
    perfomTransition(nextSection.index())
  }

  if (direction == "prev" && prevSection.length) {
    perfomTransition(prevSection.index())
  }
};




    // 



//  
//     

  


$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;


  if (deltaY > 0) {
  
    scrollViewport("next");
  }

  if (deltaY < 0) {

    scrollViewport("prev");
  }
});

$(window).on("keydown", (e) => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") {
    switch (e.keyCode) {
      case 38:
        scrollViewport("prev");
        break;
    
        case 40:
        scrollViewport("next");
        break;
   }
  }
});
$("[data-scroll-to]").click(e =>{
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  perfomTransition(reqSection.index());


});
  ;let player;
const playerContainer = $('.player');
const playerStart = $('.player__start');
const volumeBtn = $(".volume__pic");


let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        const btn = $(e.currentTarget);

        if (playerStart.hasClass("player--paused")){

            
            player.pauseVideo();

        }else{
            
            player.playVideo();
        }
        
        onPlayerReady();
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = 
            (player.getDuration() / 100) * newButtonPositionPercent;


        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__splash__play").click(e => {
        player.playVideo();
    });


    $(".volume__pic").click(e => {
        e.preventDefault();

        if (volumeBtn.hasClass("volume__pic--nosound")){

            player.unMute();
            volumeBtn.removeClass("volume__pic--nosound");

        }else{
            
            player.mute();
            volumeBtn.addClass("volume__pic--nosound");
        }
    });

    $(".volume__playback").click(e => {

        const barVolume = $(e.currentTarget);
        const clickedPositionVolume = e.originalEvent.layerX;
        const newVolumeButtonPositionPercent = (clickedPositionVolume / barVolume.width()) * 100;
        let volumePoint = player.getVolume();
    
    
        $(".volume__playback-button").css({
            left: `${newVolumeButtonPositionPercent}%`
        });

        player.setVolume(newVolumeButtonPositionPercent);
        
    });

    
};


const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    if (typeof interval !== "undefined"){
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

    }, 1000);
};


const onPlayerStateChange = event => {
    switch(event.data){
        case 1:
            playerContainer.addClass("active");
            playerStart.addClass("player--paused");
            break;
        case 2:
            playerContainer.removeClass("active");
            playerStart.removeClass("player--paused");
            break;
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'LXb3EKWsInQ',
        events:{
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modesbranding: 0
        }
    })
};


eventsInit();;const slider = $(".slider").bxSlider({
  pager: false,
  controls: false
});

$(".arrow-left").click((e) => {

  slider.goToPrevSlide();

});

$(".arrow-right").click((e) => {

  slider.goToNextSlide();

});;const findBlockByAlias = (alias) => {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjEuanMiLCJhY2NvLmpzIiwibWFwLmpzIiwibWVudS1hY2NvLmpzIiwibW9kYWwuanMiLCJvcHMuanMiLCJwbGF5ZXIuanMiLCJzbGlkZXIuanMiLCJ0YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0M3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhhbWJ1cmdlclwiKTtcbmNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wZW5lZF9fbWVudVwiKTtcbmNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZS1pY29uXCIpO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgbWVudUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnVfX2xpc3QtLW9wZW5lZFwiKTtcblxuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBtZW51LmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRfX21lbnUtLWFjdGl2ZVwiKTtcbiAgYm9keS5jbGFzc0xpc3QuYWRkKFwibm9zY3JvbGxcIik7XG59KTtcblxuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIG1lbnUuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZF9fbWVudS0tYWN0aXZlXCIpO1xuICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJub3Njcm9sbFwiKTtcbn0pO1xuXG5tZW51TGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkX19tZW51LS1hY3RpdmVcIik7XG4gIGJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm5vc2Nyb2xsXCIpO1xufSk7XG5cblxuIiwiY29uc3Qgb3Blbkl0ZW0gPSBpdGVtID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gaXRlbS5jbG9zZXN0KFwiLnRlYW1fX2l0ZW1cIik7XG4gIGNvbnN0IGNvbnRlbnRCbG9jayA9IGNvbnRhaW5lci5maW5kKFwiLnRlYW1fX2NvbnRlbnRcIik7XG4gIGNvbnN0IHRleHRCbG9jayA9IGNvbnRlbnRCbG9jay5maW5kKFwiLnRlYW1fX2NvbnRlbnQtYmxvY2tcIik7XG4gIGNvbnN0IHJlcUhlaWdodCA9IHRleHRCbG9jay5oZWlnaHQoKTtcblxuICBjb250YWluZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIGNvbnRlbnRCbG9jay5oZWlnaHQocmVxSGVpZ2h0KTtcbn07XG5cbmNvbnN0IGNsb3NlRXZlcnlJdGVtID0gY29udGFpbmVyID0+IHtcbiAgY29uc3QgaXRlbXMgPSBjb250YWluZXIuZmluZChcIi50ZWFtX19jb250ZW50XCIpO1xuICBjb25zdCBpdGVtQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoXCIudGVhbV9faXRlbVwiKTtcblxuICBpdGVtQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICBpdGVtcy5oZWlnaHQoMCk7XG59O1xuXG5cbiQoJy50ZWFtX190aXRsZScpLmNsaWNrIChlID0+IHtcbiAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gIGNvbnN0IGNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoJy50ZWFtJyk7XG4gIGNvbnN0IGVsZW1Db250YWluZXIgPSAkdGhpcy5jbG9zZXN0KFwiLnRlYW1fX2l0ZW1cIik7XG5cbiAgaWYgKGVsZW1Db250YWluZXIuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcbiAgICBjbG9zZUV2ZXJ5SXRlbShjb250YWluZXIpO1xuICB9IGVsc2UgeyBcbiAgICBjbG9zZUV2ZXJ5SXRlbShjb250YWluZXIpO1xuICAgIG9wZW5JdGVtKCR0aGlzKTtcbiAgfVxufSk7IiwibGV0IG15TWFwO1xuY29uc3QgaW5pdCA9ICgpID0+IHtcbiBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xuICAgY2VudGVyOiBbNTcuNzA4ODcwLCAxMS45NzQ1NjBdLFxuICAgem9vbTogMTEsXG4gICBjb250cm9sczogW10sXG4gICBnYXJnOiBmYWxzZSxcbiB9KTtcbiBcbiBsZXQgY29vcmRzID0gW1xuICAgICBbNTcuNzgwOTI4OTc4OTMxNTUsIDExLjk4OTQ5MzU4NjM0Mzk5OV0sXG4gICAgIFs1Ny43Mjc0Nzk5MTIzNDg3OCwgMTEuOTU3ODM0MjMxNDg5NTRdLFxuICAgICBbNTcuNjgzODA0ODY5NDQ5MzgsIDExLjkzNjU3MDQ4NTY5MTc2N10sXG4gICAgIFs1Ny42NjM4NDMyNTE3MzI3ODYsIDEyLjAzMTU0ODU1MDI1NTE0NV0sICAgICBcbiAgIF0sXG4gICBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbih7fSwge1xuICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXG4gICAgIGljb25JbWFnZUhyZWY6ICcvaW1hZ2VzL21hcmtlci5zdmcnLFxuICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcbiAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTM1LCAtNTJdXG4gICB9KTtcbiBcbiBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgbXlDb2xsZWN0aW9uLmFkZChuZXcgeW1hcHMuUGxhY2VtYXJrKGNvb3Jkc1tpXSkpO1xuIH1cbiBcbiBteU1hcC5nZW9PYmplY3RzLmFkZChteUNvbGxlY3Rpb24pO1xuIFxuIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XG59O1xuIFxueW1hcHMucmVhZHkoaW5pdCk7IiwiY29uc3QgbWVzdXJlV2lkdGggPSBpdGVtID0+IHtcbiAgbGV0IHJlcUl0ZW1XaWR0aCA9IDA7XG4gIGNvbnN0IHNjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdChcIi5wcm9kdWN0cy1tZW51XCIpO1xuICBjb25zdCB0aXRsZXNCbG9ja3MgPSBjb250YWluZXIuZmluZChcIi5wcm9kdWN0cy1tZW51X190aXRsZVwiKTtcbiAgY29uc3QgdGl0bGVzV2lkdGggPSB0aXRsZXNCbG9ja3Mud2lkdGgoKSAqIHRpdGxlc0Jsb2Nrcy5sZW5ndGg7XG5cbiAgY29uc3QgdGV4dENvbnRhaW5lciA9IGl0ZW0uZmluZChcIi5wcm9kdWN0cy1tZW51X19jb250YWluZXJcIik7XG4gIGNvbnN0IHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQodGV4dENvbnRhaW5lci5jc3MoXCJwYWRkaW5nLWxlZnRcIikpO1xuICBjb25zdCBwYWRkaW5nUmlnaHQgPSBwYXJzZUludCh0ZXh0Q29udGFpbmVyLmNzcyhcInBhZGRpbmctcmlnaHRcIikpO1xuXG4gIGNvbnN0IGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA3NjhweClcIikubWF0Y2hlcztcblxuICBpZiAoaXNNb2JpbGUpIHtcbiAgICByZXFJdGVtV2lkdGggPSBzY3JlZW5XaWR0aCAtIHRpdGxlc1dpZHRoO1xuICB9IGVsc2Uge1xuICAgIHJlcUl0ZW1XaWR0aCA9IDUwMDsgIFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb250YWluZXI6IHJlcUl0ZW1XaWR0aCxcbiAgICB0ZXh0Q29udGFpbmVyOiByZXFJdGVtV2lkdGggLSBwYWRkaW5nUmlnaHQgLSBwYWRkaW5nTGVmdFxuICB9XG59O1xuXG5jb25zdCBjbG9zZUV2ZXJ5SXRlbUluQ29udGFpbmVyID0gKGNvbnRhaW5lcikgPT4ge1xuICBjb25zdCBpdGVtcyA9IGNvbnRhaW5lci5maW5kKFwiLnByb2R1Y3RzLW1lbnVfX2l0ZW1cIik7XG4gIGNvbnN0IGNvbnRlbnQgPSBjb250YWluZXIuZmluZCAoXCIucHJvZHVjdHMtbWVudV9fY29udGVudFwiKTtcblxuICBpdGVtcy5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgY29udGVudC53aWR0aCgwKTtcbn07XG5cbmNvbnN0IG9wZW5pbmdJdGVtID0gaXRlbSA9PiB7XG4gIGNvbnN0IGhpZGRlbkNvbnRlbnQgPSBpdGVtLmZpbmQoXCIucHJvZHVjdHMtbWVudV9fY29udGVudFwiKTtcbiAgY29uc3QgcmVxV2lkdGggPSBtZXN1cmVXaWR0aChpdGVtKTtcbiAgY29uc3QgdGV4dEJsb2NrID0gaXRlbS5maW5kKFwiLnByb2R1Y3RzLW1lbnVfX2NvbnRhaW5lclwiKTtcblxuICBpdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICBoaWRkZW5Db250ZW50LndpZHRoKHJlcVdpZHRoLmNvbnRhaW5lcik7XG4gIHRleHRCbG9jay53aWR0aChyZXFXaWR0aC50ZXh0Q29udGFpbmVyKTtcbn07XG5cbiQoXCIucHJvZHVjdHMtbWVudV9fdGl0bGVcIikub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gIGNvbnN0IGl0ZW0gPSAkdGhpcy5jbG9zZXN0KFwiLnByb2R1Y3RzLW1lbnVfX2l0ZW1cIik7XG4gIGNvbnN0IGl0ZW1PcGVuZWQgPSBpdGVtLmhhc0NsYXNzKFwiYWN0aXZlXCIpO1xuICBjb25zdCBjb250YWluZXIgPSAkdGhpcy5jbG9zZXN0KFwiLnByb2R1Y3RzLW1lbnVcIik7XG5cbiAgaWYgKGl0ZW1PcGVuZWQpIHtcbiAgICBjbG9zZUV2ZXJ5SXRlbUluQ29udGFpbmVyKGNvbnRhaW5lcilcbiAgfSBlbHNlIHtcbiAgICBjbG9zZUV2ZXJ5SXRlbUluQ29udGFpbmVyKGNvbnRhaW5lcilcbiAgICBvcGVuaW5nSXRlbShpdGVtKTtcbiAgfVxufSk7XG5cbiQoXCIucHJvZHVjdHMtbWVudV9fY2xvc2VcIikub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY2xvc2VFdmVyeUl0ZW1JbkNvbnRhaW5lcigkKFwiLnByb2R1Y3RzLW1lbnVcIikpO1xufSk7IiwiY29uc3QgdmFsaWRhdGVGaWVsZHMgPSAoZm9ybSwgZmllbGRzQXJyYXkpID0+IHtcbiAgXG4gIGZpZWxkc0FycmF5LmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgZmllbGQucmVtb3ZlQ2xhc3MoXCJpbnB1dC1lcnJvclwiKTtcbiAgICBpZihmaWVsZC52YWwoKS50cmltKCk9PSBcIlwiKSB7XG4gICAgICBmaWVsZC5hZGRDbGFzcyhcImlucHV0LWVycm9yXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZXJyb3JGaWVsZHMgPSBmb3JtLmZpbmQoJy5pbnB1dC1lcnJvcicpO1xuXG4gIHJldHVybiBlcnJvckZpZWxkcy5sZW5ndGggPT0gMDtcbn1cbiQoJy5mb3JtJykuc3VibWl0KChlKT0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCk7XG4gIGNvbnN0IG5hbWUgPSBmb3JtLmZpbmQoXCJbbmFtZT0nbmFtZSddXCIpO1xuICBjb25zdCBwaG9uZSA9IGZvcm0uZmluZChcIltuYW1lPSdwaG9uZSddXCIpO1xuICBjb25zdCBjb21tZW50ID0gZm9ybS5maW5kKFwiW25hbWU9J2NvbW1lbnQnXVwiKTtcbiAgY29uc3QgdG8gPSBmb3JtLmZpbmQoXCJbbmFtZT0ndG8nXVwiKTtcblxuICBjb25zdCBtb2RhbCA9ICQoXCIjbW9kYWxcIik7XG4gIGNvbnN0IGNvbnRlbnQgPSBtb2RhbC5maW5kKFwibW9kYWxfX2NvbnRlbnRcIilcblxuICBjb25zdCBpc1ZhbGlkID0gdmFsaWRhdGVGaWVsZHMoZm9ybSwgW25hbWUsIHBob25lLCBjb21tZW50LCB0b10pO1xuXG4gIG1vZGFsLnJlbW92ZUNsYXNzKFwiZXJyb3ItbW9kYWxcIik7XG4gIFxuICBpZihpc1ZhbGlkKSB7XG4gICBjb25zdCByZXF1ZXN0ID0gJC5hamF4KHtcbiAgICAgIHVybDogXCJodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWxcIixcbiAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWU6IG5hbWUudmFsKCksXG4gICAgICAgIHBob25lOiBwaG9uZS52YWwoKSxcbiAgICAgICAgY29tbWVudDogY29tbWVudC52YWwoKSxcbiAgICAgICAgdG86IHRvLnZhbCgpXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmVxdWVzdC5kb25lKChkYXRhKSA9PiB7XG4gICAgICBjb250ZW50LnRleHQoZGF0YS5tZXNzYWdlKTtcbiAgICAgIH0pO1xuXG4gICAgcmVxdWVzdC5mYWlsKChkYXRhKSA9PiB7ICAgXG4gICAgICBjb25zdCBtZXNzYWdlID0gZGF0YS5yZXNwb25zZUpTT04ubWVzc2FnZTtcbiAgICAgIGNvbnRlbnQudGV4dChtZXNzYWdlKTtcbiAgICAgIG1vZGFsLmFkZENsYXNzKFwiZXJyb3ItbW9kYWxcIik7XG4gICAgfSk7XG5cbiAgICByZXF1ZXN0LmFsd2F5cygoKSA9PiB7XG4gICAgICAkLmZhbmN5Ym94Lm9wZW4oe1xuICAgICAgICBzcmM6IFwiI21vZGFsXCIsXG4gICAgICAgIHR5cGU6IFwiaW5saW5lXCIsXG4gICAgICAgICAgXG4gICAgICB9KTtcbiAgICB9KTtcbiAgIH1cbn0pO1xuXG4kKCcuYnV0dG9uLWNsb3NlJykuY2xpY2soZSA9PiB7IFxuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgZm9ybSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAkLmZhbmN5Ym94LmNsb3NlKCk7XG4gIFxuICAkKCcjZm9ybScpWzBdLnJlc2V0KCk7XG59KTtcblxuIiwiY29uc3Qgc2VjdGlvbnMgPSAkKFwic2VjdGlvblwiKTtcbmNvbnN0IGRpc3BsYXkgPSAkKFwiLm1haW5jb250ZW50XCIpO1xuXG5sZXQgaW5TY3JvbGwgPSBmYWxzZTtcblxuc2VjdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTsgXG5jb25zdCBwZXJmb21UcmFuc2l0aW9uID0gKHNlY3Rpb25FcSkgPT4ge1xuXG4gIGlmKGluU2Nyb2xsID09IGZhbHNlKSB7XG4gIGluU2Nyb2xsID0gdHJ1ZTtcbiAgY29uc3QgcG9zaXRpb24gPSBzZWN0aW9uRXEgKiAtMTAwO1xuXG4gIGNvbnN0IGN1cnJlbnRTZWN0aW9uID0gc2VjdGlvbnMuZXEoc2VjdGlvbkVxKTtcbiAgY29uc3QgbWVudVRoZW1lID0gY3VycmVudFNlY3Rpb24uYXR0cihcImRhdGEtc2lkZW1lbnUtdGhlbWVcIik7XG4gIGNvbnN0IHNpZGVNZW51ID0gJChcIi5maXhlZC1tZW51XCIpO1xuXG4gIGlmIChtZW51VGhlbWUgPT0gXCJibGFja1wiKSB7XG4gICAgc2lkZU1lbnUuYWRkQ2xhc3MoXCJmaXhlZC1tZW51LS1zaGFkb3dlZFwiKTtcbiAgfSBlbHNlIHtcbiAgICBzaWRlTWVudS5yZW1vdmVDbGFzcyhcImZpeGVkLW1lbnUtLXNoYWRvd2VkXCIpO1xuICB9XG4gIGRpc3BsYXkuY3NzKHtcbiAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7cG9zaXRpb259JSlgXG4gICAgfSk7XG5cblxuICAgIHNlY3Rpb25zLmVxKHNlY3Rpb25FcSkuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgICBcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGluU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICBcbiAgICAgICAgICBzaWRlTWVudS5maW5kKFwiLmZpeGVkLW1lbnVfX2l0ZW1cIikuZXEoc2VjdGlvbkVxKS5hZGRDbGFzcyhcImZpeGVkLW1lbnVfX2l0ZW0tLWFjdGl2ZVwiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiZml4ZWQtbWVudV9faXRlbS0tYWN0aXZlXCIpO1xuICAgICAgICAgIFxuICAgICAgICAgfSwgMTMwMCk7XG5cblxuICB9XG4gIH1cbmNvbnN0IHNjcm9sbFZpZXdwb3J0ID0gZGlyZWN0aW9uID0+IHtcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IHNlY3Rpb25zLmZpbHRlcihcIi5hY3RpdmVcIik7IFxuICBjb25zdCBuZXh0U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ubmV4dCgpO1xuICBjb25zdCBwcmV2U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ucHJldigpO1xuXG4gIGlmIChkaXJlY3Rpb24gPT0gXCJuZXh0XCIgJiYgbmV4dFNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgcGVyZm9tVHJhbnNpdGlvbihuZXh0U2VjdGlvbi5pbmRleCgpKVxuICB9XG5cbiAgaWYgKGRpcmVjdGlvbiA9PSBcInByZXZcIiAmJiBwcmV2U2VjdGlvbi5sZW5ndGgpIHtcbiAgICBwZXJmb21UcmFuc2l0aW9uKHByZXZTZWN0aW9uLmluZGV4KCkpXG4gIH1cbn07XG5cblxuXG5cbiAgICAvLyBcblxuXG5cbi8vICBcbi8vICAgICBcblxuICBcblxuXG4kKHdpbmRvdykub24oXCJ3aGVlbFwiLCAoZSkgPT4ge1xuICBjb25zdCBkZWx0YVkgPSBlLm9yaWdpbmFsRXZlbnQuZGVsdGFZO1xuXG5cbiAgaWYgKGRlbHRhWSA+IDApIHtcbiAgXG4gICAgc2Nyb2xsVmlld3BvcnQoXCJuZXh0XCIpO1xuICB9XG5cbiAgaWYgKGRlbHRhWSA8IDApIHtcblxuICAgIHNjcm9sbFZpZXdwb3J0KFwicHJldlwiKTtcbiAgfVxufSk7XG5cbiQod2luZG93KS5vbihcImtleWRvd25cIiwgKGUpID0+IHtcblxuICBjb25zdCB0YWdOYW1lID0gZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmICh0YWdOYW1lICE9PSBcImlucHV0XCIgJiYgdGFnTmFtZSAhPT0gXCJ0ZXh0YXJlYVwiKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHNjcm9sbFZpZXdwb3J0KFwicHJldlwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgXG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgIHNjcm9sbFZpZXdwb3J0KFwibmV4dFwiKTtcbiAgICAgICAgYnJlYWs7XG4gICB9XG4gIH1cbn0pO1xuJChcIltkYXRhLXNjcm9sbC10b11cIikuY2xpY2soZSA9PntcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICBjb25zdCB0YXJnZXQgPSAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGwtdG9cIik7XG4gIGNvbnN0IHJlcVNlY3Rpb24gPSAkKGBbZGF0YS1zZWN0aW9uLWlkPSR7dGFyZ2V0fV1gKTtcblxuICBwZXJmb21UcmFuc2l0aW9uKHJlcVNlY3Rpb24uaW5kZXgoKSk7XG5cblxufSk7XG4gICIsImxldCBwbGF5ZXI7XG5jb25zdCBwbGF5ZXJDb250YWluZXIgPSAkKCcucGxheWVyJyk7XG5jb25zdCBwbGF5ZXJTdGFydCA9ICQoJy5wbGF5ZXJfX3N0YXJ0Jyk7XG5jb25zdCB2b2x1bWVCdG4gPSAkKFwiLnZvbHVtZV9fcGljXCIpO1xuXG5cbmxldCBldmVudHNJbml0ID0gKCkgPT4ge1xuICAgICQoXCIucGxheWVyX19zdGFydFwiKS5jbGljayhlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICBpZiAocGxheWVyU3RhcnQuaGFzQ2xhc3MoXCJwbGF5ZXItLXBhdXNlZFwiKSl7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvblBsYXllclJlYWR5KCk7XG4gICAgfSk7XG5cbiAgICAkKFwiLnBsYXllcl9fcGxheWJhY2tcIikuY2xpY2soZSA9PiB7XG4gICAgICAgIGNvbnN0IGJhciA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY2xpY2tlZFBvc2l0aW9uID0gZS5vcmlnaW5hbEV2ZW50LmxheWVyWDtcbiAgICAgICAgY29uc3QgbmV3QnV0dG9uUG9zaXRpb25QZXJjZW50ID0gKGNsaWNrZWRQb3NpdGlvbiAvIGJhci53aWR0aCgpKSAqIDEwMDtcbiAgICAgICAgY29uc3QgbmV3UGxheWJhY2tQb3NpdGlvblNlYyA9IFxuICAgICAgICAgICAgKHBsYXllci5nZXREdXJhdGlvbigpIC8gMTAwKSAqIG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudDtcblxuXG4gICAgICAgICQoXCIucGxheWVyX19wbGF5YmFjay1idXR0b25cIikuY3NzKHtcbiAgICAgICAgICAgIGxlZnQ6IGAke25ld0J1dHRvblBvc2l0aW9uUGVyY2VudH0lYFxuICAgICAgICB9KTtcblxuICAgICAgICBwbGF5ZXIuc2Vla1RvKG5ld1BsYXliYWNrUG9zaXRpb25TZWMpO1xuICAgIH0pO1xuXG4gICAgJChcIi5wbGF5ZXJfX3NwbGFzaF9fcGxheVwiKS5jbGljayhlID0+IHtcbiAgICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgIH0pO1xuXG5cbiAgICAkKFwiLnZvbHVtZV9fcGljXCIpLmNsaWNrKGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHZvbHVtZUJ0bi5oYXNDbGFzcyhcInZvbHVtZV9fcGljLS1ub3NvdW5kXCIpKXtcblxuICAgICAgICAgICAgcGxheWVyLnVuTXV0ZSgpO1xuICAgICAgICAgICAgdm9sdW1lQnRuLnJlbW92ZUNsYXNzKFwidm9sdW1lX19waWMtLW5vc291bmRcIik7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBsYXllci5tdXRlKCk7XG4gICAgICAgICAgICB2b2x1bWVCdG4uYWRkQ2xhc3MoXCJ2b2x1bWVfX3BpYy0tbm9zb3VuZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIi52b2x1bWVfX3BsYXliYWNrXCIpLmNsaWNrKGUgPT4ge1xuXG4gICAgICAgIGNvbnN0IGJhclZvbHVtZSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY2xpY2tlZFBvc2l0aW9uVm9sdW1lID0gZS5vcmlnaW5hbEV2ZW50LmxheWVyWDtcbiAgICAgICAgY29uc3QgbmV3Vm9sdW1lQnV0dG9uUG9zaXRpb25QZXJjZW50ID0gKGNsaWNrZWRQb3NpdGlvblZvbHVtZSAvIGJhclZvbHVtZS53aWR0aCgpKSAqIDEwMDtcbiAgICAgICAgbGV0IHZvbHVtZVBvaW50ID0gcGxheWVyLmdldFZvbHVtZSgpO1xuICAgIFxuICAgIFxuICAgICAgICAkKFwiLnZvbHVtZV9fcGxheWJhY2stYnV0dG9uXCIpLmNzcyh7XG4gICAgICAgICAgICBsZWZ0OiBgJHtuZXdWb2x1bWVCdXR0b25Qb3NpdGlvblBlcmNlbnR9JWBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGxheWVyLnNldFZvbHVtZShuZXdWb2x1bWVCdXR0b25Qb3NpdGlvblBlcmNlbnQpO1xuICAgICAgICBcbiAgICB9KTtcblxuICAgIFxufTtcblxuXG5jb25zdCBvblBsYXllclJlYWR5ID0gKCkgPT4ge1xuICAgIGxldCBpbnRlcnZhbDtcbiAgICBjb25zdCBkdXJhdGlvblNlYyA9IHBsYXllci5nZXREdXJhdGlvbigpO1xuXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRTZWMgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcbiAgICAgICAgY29uc3QgY29tcGxldGVkUGVyY2VudCA9IChjb21wbGV0ZWRTZWMgLyBkdXJhdGlvblNlYykgKiAxMDA7XG5cbiAgICAgICAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xuICAgICAgICAgICAgbGVmdDogYCR7Y29tcGxldGVkUGVyY2VudH0lYFxuICAgICAgICB9KTtcblxuICAgIH0sIDEwMDApO1xufTtcblxuXG5jb25zdCBvblBsYXllclN0YXRlQ2hhbmdlID0gZXZlbnQgPT4ge1xuICAgIHN3aXRjaChldmVudC5kYXRhKXtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcGxheWVyQ29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgcGxheWVyU3RhcnQuYWRkQ2xhc3MoXCJwbGF5ZXItLXBhdXNlZFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBwbGF5ZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBwbGF5ZXJTdGFydC5yZW1vdmVDbGFzcyhcInBsYXllci0tcGF1c2VkXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbllvdVR1YmVJZnJhbWVBUElSZWFkeSgpIHtcbiAgICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKCd5dC1wbGF5ZXInLCB7XG4gICAgICAgIGhlaWdodDogJzQwNScsXG4gICAgICAgIHdpZHRoOiAnNjYwJyxcbiAgICAgICAgdmlkZW9JZDogJ0xYYjNFS1dzSW5RJyxcbiAgICAgICAgZXZlbnRzOntcbiAgICAgICAgICAgICdvblJlYWR5Jzogb25QbGF5ZXJSZWFkeSxcbiAgICAgICAgICAgICdvblN0YXRlQ2hhbmdlJzogb25QbGF5ZXJTdGF0ZUNoYW5nZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICAgICBjb250cm9sczogMCxcbiAgICAgICAgICAgIGRpc2FibGVrYjogMCxcbiAgICAgICAgICAgIHNob3dpbmZvOiAwLFxuICAgICAgICAgICAgcmVsOiAwLFxuICAgICAgICAgICAgYXV0b3BsYXk6IDAsXG4gICAgICAgICAgICBtb2Rlc2JyYW5kaW5nOiAwXG4gICAgICAgIH1cbiAgICB9KVxufTtcblxuXG5ldmVudHNJbml0KCk7IiwiY29uc3Qgc2xpZGVyID0gJChcIi5zbGlkZXJcIikuYnhTbGlkZXIoe1xuICBwYWdlcjogZmFsc2UsXG4gIGNvbnRyb2xzOiBmYWxzZVxufSk7XG5cbiQoXCIuYXJyb3ctbGVmdFwiKS5jbGljaygoZSkgPT4ge1xuXG4gIHNsaWRlci5nb1RvUHJldlNsaWRlKCk7XG5cbn0pO1xuXG4kKFwiLmFycm93LXJpZ2h0XCIpLmNsaWNrKChlKSA9PiB7XG5cbiAgc2xpZGVyLmdvVG9OZXh0U2xpZGUoKTtcblxufSk7IiwiY29uc3QgZmluZEJsb2NrQnlBbGlhcyA9IChhbGlhcykgPT4ge1xuICByZXR1cm4gJChcIi5yZXZpZXdzLWl0ZW1cIikuZmlsdGVyKChuZHgsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gJChpdGVtKS5hdHRyKFwiZGF0YS1saW5rZWQtd2l0aFwiKSA9PSBhbGlhcztcbiAgfSk7XG59O1xuJChcIi5yZXZpZXdzLXN3aXRjaGVyX19saW5rXCIpLmNsaWNrKChlKSA9PiB7IFxuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cblxuICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgY29uc3QgdGFyZ2V0ID0gJHRoaXMuYXR0cihcImRhdGEtb3BlblwiKTtcbiAgY29uc3QgaXRlbVRvU2hvdyA9IGZpbmRCbG9ja0J5QWxpYXModGFyZ2V0KTtcbiAgY29uc3QgY3VySXRlbSA9ICR0aGlzLmNsb3Nlc3QoXCIucmV2aWV3cy1zd2l0Y2hlcl9faXRlbVwiKTtcblxuXG4gIGl0ZW1Ub1Nob3cuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgY3VySXRlbS5hZGRDbGFzcyhcImFjdGl2ZVwiKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xufSk7ICJdfQ==
