let player;
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


eventsInit();