const supportsVideo = !!document.createElement("video").canPlayType;

if (supportsVideo) {
  const videoContainer = document.querySelector("#videoContainer");
  const video = document.querySelector("#video");
  const videoControls = document.querySelector("#video-controls");
  video.controls = false;
  videoControls.style.display = "flex";
  let playpause = document.querySelector("#playpause");
  let stop = document.querySelector("#stop");
  let mute = document.querySelector("#mute");
  let volinc = document.querySelector("#volinc");
  let voldec = document.querySelector("#voldec");
  let progress = document.querySelector("#progress");
  let progressBar = document.querySelector("#progress-bar");
  let fullScreen = document.querySelector("#fs");

  playpause.addEventListener("click", e => {
    if (video.paused || video.ended) video.play();
    else video.pause();
  });
  stop.addEventListener("click", e => {
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
  });

  mute.addEventListener("click", e => {
    video.muted != video.muted;
  });

  volinc.addEventListener("click", e => {
    alterVolume("+");
  });
  voldec.addEventListener("click", e => {
    alterVolume("-");
  });

  let alterVolume = dir => {
    let currentVolume = Math.round(video.volume);
    if (dir === "+") {
      video.volume += 0.1;
    } else if (dir === "-") {
      video.volume -= 0.1;
    }
  };
  video.addEventListener("loadedmetadata", () => {
    progress.setAttribute("max", video.duration);
  });

  video.addEventListener("timeupdate", () => {
    progress.value = video.currentTime;
    progressBar.style.width =
      Math.floor((video.currentTime / video.duration) * 100) + "%";
  });

  progress.addEventListener("click", e => {
    let pos = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
    video.currentTime = pos * video.duration;
  });

  let fullScreenEnabled = !!(
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled ||
    document.webkitSupportsFullscreen ||
    document.webkitFullscreenEnabled ||
    document.createElement("video").webkitRequestFullScreen
  );

  if (!fullScreenEnabled) {
    fullScreen.style.display = "none";
  }
  fullScreen.addEventListener("click", e => {
    handleFullscreen();
  });

  const handleFullscreen = () => {
    if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen)
        document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
    } else {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.mozRequestFullScreen)
        videoContainer.mozRequestFullScreen();
      else if (videoContainer.webkitRequestFullScreen)
        videoContainer.webkitRequestFullScreen();
      else if (videoContainer.msRequestFullscreen)
        videoContainer.msRequestFullscreen();
      setFullscreenData(true);
    }
  };
  const isFullScreen = () => {
    return !!(
      document.fullScreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
  };

  const setFullscreenData = state => {
    videoContainer.setAttribute("data-fullscreen", !!state);
  };
  document.addEventListener("fullscreenchange", function(e) {
    setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
  });
  document.addEventListener("webkitfullscreenchange", function() {
    setFullscreenData(!!document.webkitIsFullScreen);
  });
  document.addEventListener("mozfullscreenchange", function() {
    setFullscreenData(!!document.mozFullScreen);
  });
  document.addEventListener("msfullscreenchange", function() {
    setFullscreenData(!!document.msFullscreenElement);
  });
}
