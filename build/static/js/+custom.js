/* global $:true document:true d3:true mapboxgl: true window: true _:true event: true Modernizr: true */

$(document).ready(() => {
  // custom scripting goes here

  if (document.cookie.indexOf('buz-audio') !== -1) {
    $('.fa-volume-up').removeClass('fa-volume-up').addClass('fa-volume-off');
  }

  const domain = document.domain;

  if (Modernizr.touchevents) {
    $('body').addClass('touch');
  } else {
    $('body').removeClass('touch');
  }

  $(window).scroll(() => {
    const wTop = $(window).scrollTop();
    const wHeight = $(window).height();
    const trigger = wTop + (wHeight / 2);

    $.each($('.quote-hang'), function () {
      const qTop = $(this).offset().top;

      if (qTop <= trigger && document.cookie.indexOf('buz-audio') < 0) {
        const thisAudio = $(this).find('audio');
        const muted = thisAudio.attr('muted');
        console.log(muted);
        if (thisAudio.hasClass('played') === false && typeof muted === typeof undefined) {
          $('audio')[0].pause();
          thisAudio[0].play();
        }
        thisAudio.addClass('played');
      }
    });
  });

  const audioPlayer = $('audio');
  $('.audio-marker').click(function () {
    if ($(this).hasClass('fa-volume-up') === true) {
      $('.audio-marker').removeClass('fa-volume-up').addClass('fa-volume-off');
      audioPlayer.each(function () {
        $(this)[0].pause();
        $(this)[0].currentTime = 0;
      });
      audioPlayer.attr('muted', '');

      $.cookie('buz-audio', 1, { domain });
      console.log(document.cookie.indexOf('buz-audio'));
    } else {
      $('.audio-marker').removeClass('fa-volume-off').addClass('fa-volume-up');
      audioPlayer.removeAttr('muted');
      $.removeCookie('buz-audio', { domain });
      $(this).parent('.audio-controls').siblings('audio')[0].play();
    }
  });


  $('.audio-restarter').click(function () {
    const thisAudio = $(this).parent('.audio-controls').siblings('audio');
    thisAudio[0].pause();
    thisAudio[0].currentTime = 0;
    thisAudio[0].play();
    $('.audio-marker').removeClass('fa-volume-off').addClass('fa-volume-up');
    audioPlayer.removeAttr('muted');
  });

  $('.audio-play').click(function () {
    const thisAudio = $(this).parent('.audio-controls').siblings('audio');

    if ($(this).hasClass('fa-play') === true) {
      thisAudio.unbind('ended');
      thisAudio[0].play();
      setTimeout(() => $(this).removeClass('fa-play').addClass('fa-pause'), 100);
      thisAudio.bind('ended', () => $(this).removeClass('fa-pause').addClass('fa-play'));
    }

    if ($(this).hasClass('fa-pause') === true) {
      thisAudio[0].pause();
      $(this).removeClass('fa-pause').addClass('fa-play');
    }
  });
});
