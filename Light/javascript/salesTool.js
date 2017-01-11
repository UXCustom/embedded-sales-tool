$(document).ready(function() {

  // Reset selections in Sales Tool to default
  $('.reset').on('click', function() {
    localStorage.clear();
    window.location.reload();
  });

  // Open/Close Sales Tool Edit Window
  $('.pull').on('click', function() {
    $('#editWindow').toggleClass('open');
  });

  // start Site Type Nav functionality
  var switchSiteType = function(oldSelection) {
    var siteTypes = [
      {
        "id": "1",
        "name": "article",
        "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/articleBased/sales-tool/"
      },
      {
        "id": "2",
        "name": "embeddedCenter",
        "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/embedded/Center"
      },
      {
        "id": "3",
        "name": "embeddedDark",
        "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/embedded/Dark"
      },
      {
        "id": "4",
        "name": "embeddedLight",
        "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/embedded/Light"
      },
      {
        "id": "5",
        "name": "nativeAd",
        "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/native/"
      }
    ];
    var totalSiteTypes = $(siteTypes).length;
    var newSelection = $(".demo-site-nav-list-item.selected").attr("data-id");
    for (i = 0; i < totalSiteTypes; i++) {
      var option = siteTypes[i];
      if ((option.id === newSelection) && (option.id != oldSelection)) {
        window.open (siteTypes[i].url,'_self',false);
      }
    }
  }
  var hideSiteTypeNotSelected = function() {
    if($(".demo-site-nav-list li").hasClass('selected')){
      $(".demo-site-nav-list-item").hide();
      $(".demo-site-nav-list-item.selected").show();
    }
  }
  var showSiteTypeNav = function() {
    $(".demo-site-nav-list-item").show();
    $(".demo-site-nav").removeClass("hideNav").addClass("show");
    $('.demo-site-nav .icon').removeClass("icon-arrow-down").addClass("icon-arrow-up");
  }
  var hideSiteTypeNav = function() {
    hideSiteTypeNotSelected();
    $(".demo-site-nav").removeClass("show").addClass("hideNav");
    $('.demo-site-nav .icon').removeClass("icon-arrow-up").addClass("icon-arrow-down");
  }
  var toggleMenuOnArrowClick = function() {
    $(".demo-site-nav .icon").on("mousedown", function(){
      if ($('.demo-site-nav').hasClass("hideNav")) {
        showSiteTypeNav();
      }
      else {
        hideSiteTypeNav();
      }
    })

  }
  var userSelectsSiteType = function() {
    $('.demo-site-nav-list-item').on('mousedown',function() {
      var oldSelection = $(".demo-site-nav-list-item.selected").attr("data-id");
      $(".demo-site-nav-list-item").removeClass("selected");
      $(this).addClass("selected");
      switchSiteType(oldSelection);
      //hideSiteTypeNav();
      $(".demo-site-nav").removeClass("show").addClass("hideNav");
      $('.demo-site-nav .icon').removeClass("icon-arrow-up").addClass("icon-arrow-down");
      hideSiteTypeNotSelected();
    });
  }

  hideSiteTypeNotSelected();
  userSelectsSiteType();
  toggleMenuOnArrowClick();
  // end Site Type Nav functionality

  // start adjust height of demo tool window
  var adjustEditWindowHeight = function() {
    var editWindow = document.getElementById("editWindow"),
        demoHeader = document.getElementsByClassName("demo-header"),
        demoSiteNav = document.getElementsByClassName("demo-site-nav"),
        demoFooter = document.getElementsByClassName("demo-footer"),
        editWindowHeight = editWindow.offsetHeight,
        demoHeaderHeight = demoHeader[0].offsetHeight,
        demoSiteNavHeight = demoSiteNav[0].offsetHeight,
        demoFooterHeight = demoFooter[0].offsetHeight,
        demoSettingsHeight =  editWindowHeight-demoHeaderHeight-demoSiteNavHeight-demoFooterHeight;
    $('.demo-settings').css("height",demoSettingsHeight);
  }
  adjustEditWindowHeight();
  // end adjust height of demo tool window

  $(".c1").spectrum({
      allowEmpty:true,
      color: "#03a9f4",
      showInput: true,
      containerClassName: "full-spectrum",
      showInitial: true,
      showPalette: true,
      showSelectionPalette: true,
      //- showAlpha: true,
      maxPaletteSize: 10,
      preferredFormat: "hex",
      localStorageKey: "spectrum.demo"
  });

  $(".c2").spectrum({
      allowEmpty:true,
      color: "#ff9800",
      showInput: true,
      containerClassName: "full-spectrum",
      showInitial: true,
      showPalette: true,
      showSelectionPalette: true,
      //- showAlpha: true,
      maxPaletteSize: 10,
      preferredFormat: "hex",
      localStorageKey: "spectrum.demo"
  });

  var colorValue1 = $(".c1").spectrum("get");
  var colorValue2 = $(".c2").spectrum("get");
  $('span.colorText1').text(colorValue1);
  $('span.colorText2').text(colorValue2);

  colorsObj = new Object();

	$("input[type=color]").change(function() {
	  colorKey = $(this).attr('class');
	  colorValue = $(this).val().replace("#", "");
	  createParams(colorKey, colorValue);

		var updatedCSS = $('#sheet1').attr('href');

		var colorValue1 = $(".c1").spectrum("get");
		var colorValue2 = $(".c2").spectrum("get");

		$('p.colorText1').text(colorValue1);
		$('p.colorText2').text(colorValue2);
	});

	function createParams (colorKey, colorValue) {
	  colorsObj[colorKey] = colorValue;
    var str = $('#sheet1').attr('href');
    var nIndex = str.indexOf(".php");
    var mood = str.substr(4, nIndex - 4);
	  tempTxt = "php/" + mood + ".php?" + $.param(colorsObj);
	  $("#sheet1").attr("href", tempTxt);
	};

  $('#moodChoice').on('change', function() {
    if ($(this).val() == 'A') {
      window.location = "../Center";
    } else if ($(this).val() == 'B') {
      window.location = "../Dark";
    } else {
      window.location = "./";
    }
	});

  $('#topicChoice').on('change', function() {
    if ($(this).val() == 'One') {
      $("#micrositeWrapper nav").css('display','none');
    } else {
      $("#micrositeWrapper nav").css('display','block');
    }
	});

  $('#changeTitle').on('input',function() {
    $('#wayFinderContainer h1').text($(this).val());
    if ($(this).val() == '') {
      $('#wayFinderContainer h1').text('Curabitur venenatis mauris finibus nisi hendrerit, sed semper lacus.');
    }
  });

  $('#layoutChoice').on('change', function() {
    if ($(this).val() == 'A') {
      $("#featuredAssets").css('display','block');
      $("#assetsListing").css('display','block');
    } else if ($(this).val() == 'B') {
      $("#featuredAssets").css('display','block');
      $("#assetsListing").css('display','none');
    } else if ($(this).val() == 'C') {
      $("#featuredAssets").css('display','none');
      $("#assetsListing").css('display','block');
    }
	});

  $('#socialChoice').on('change', function() {
    if ($(this).val() == 'A') {
      $("#widgetsOuterContainer").css('display','block');
    } else if ($(this).val() == 'B') {
      $("#widgetsOuterContainer").css('display','none');
    }
	});

  var videoHTML = $('#videoPlayerContainer>div'),
      videoTagID = videoHTML.attr('id'),
      myPlayer,
      vidID = videoHTML.data('video-id'),
      playlistID = videoHTML.data('playlist-id'),
      body = $('body');

  $('#heroChoice').on('change', function() {
    if ($(this).val() == 'SA') {
      if ($('#heroPlayerContainer').length == 1) {
        $('#heroPlayerContainer').css('display','none');
        var assetHTML = $('<div id="heroAssetContainer"><a class="m-exitLink" id="heroImage" href="http://searchcloudstorage.techtarget.com/Embedded-Demo-Center-Asset/document/1447267428_342" target="_blank"><div id="heroOverlay"><h2 class="overlayTitle">How Converged Infrastructure Makes IT Easy</h2><p class="overlayCTA">Learn More<i class="icon-lightbulb"></i></p></div><div id="heroImageContainerOuter"><div id="heroImageContainerInner"><img src="http://cdn.ttgtmedia.com/microsites/democenterasset/images/Asset-Hero1.jpg"></div></div></a></div></div>');
        $(assetHTML).insertAfter('#wayFinder');
      }
    } else if ($(this).val() == 'SV') {
      if ($('#heroAssetContainer').length == 1) {
        function msToTime(duration) {
          var milliseconds = parseInt((duration%1000)/100)
          , seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)
          , hours = parseInt((duration/(1000*60*60))%24);

          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;

          if(hours < 1){
            return minutes + ":" + seconds;
          } else {
            return hours + ":" + minutes + ":" + seconds;
          }
        }

        $('#heroAssetContainer').css('display','none').removeClass('show');
        $('#heroPlaylistContainer, #heroPlaylistInfoContainer').css('display','none').removeClass('show');

        videojs('video-1').catalog.getVideo('5214501353001', function(error, video) {
          if (error) { console.log('Video error', error);
          } else {

            var w = video.duration;
            var tf = w.toFixed(3);
            var x = tf.toString();
            var y = x.replace(/\./g, '');
            var z = parseInt(y,10);

            $('.overlayDuration').html('<i class="icon-video-camera"></i>' + ' ' + 'Video: ' + msToTime(z)).show();
            $('.overlayTitle').html(video.name).show();
            $('.overlayCTA').show();
            $('.spinner').remove();

            videojs('video-1').catalog.load(video);

            $('#heroImage').on('click tapone',function(){

              videojs('video-1').catalog.load(video);

              $('#videoPlayerContainer').addClass('show');
              $('#heroImage').addClass('vjs-selected');
              $('.vjs-playlist .vjs-playlist-item.vjs-selected .vjs-playlist-thumbnail').addClass('show');
              $('#heroOverlay').hide();

              videojs('video-1').play();

              if(body.hasClass('header-desktop-fixed')){
                $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 57},750);
              } else if(body.hasClass('header-mobile-fixed')) {
                $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 60},750);
              } else {
                $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 157},750);
              }
            });
          }
         });


        $('#heroPlayerContainer').css('display','block');
      }
    } else if ($(this).val() == 'MV'){
      $('#heroAssetContainer').css('display','none');
      $('#heroPlayerContainer').css('display','block');
      videojs('video-1').catalog.getPlaylist('5146939306001', function(error, playlist){
        if (error) { console.log('Playlist error',error);
        } else {
          videojs('video-1').catalog.load(playlist);

          var i = 0;
          var videosExists = false;
          var y = setInterval(function() {
            checkVideos();
          },1000);

          function checkVideos() {
            $('.vjs-playlist-ad-overlay').remove();
            if (i > 10) {
              clearInterval(y);
            } else if ($(".vjs-playlist li").length >= 2) {
              clearInterval(y);
              videosExists = true;
              //perform your actions here
              if ($('.bx-wrapper').length < 1) {
                $('.vjs-playlist').bxSlider({
                  minSlides:1,
                  maxSlides: 4,
                  infiniteLoop: false,
                  slideMargin: 10,
                  slideWidth: 260,
                  moveSlides: 1,
                  nextSelector: '#slider-next',
                  prevSelector: '#slider-prev',
                  hideControlOnEnd: true
                });
              }

              if ($('.vjs-playlist-item').length == 2){
                // exactly 2
                $('.vjs-playlist').addClass('twoItems');
                $('#heroPlaylistInfoContainer').remove();
              } else if ($('.vjs-playlist-item').length == 3){
                // exactly 3
                $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('threeItems');
                $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
              } else if ($('.vjs-playlist-item').length == 4){
                // exactly 4
                $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('fourItems');
                $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
              } else {
                $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('manyItems');
                $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
              }

              $('.overlayDuration').html('<i class="icon-video-camera"></i>' + ' ' + 'Video: ' + $('.vjs-playlist-item:first-child .vjs-playlist-duration').text());
              $('.overlayTitle').html($('.vjs-playlist-item:first-child .vjs-playlist-name').text()).show();
              $('.overlayCTA').show();

              $('.bx-next').html('<i class="icon-play"></i>');
              $('.bx-prev').html('<i class="icon-play"></i>');

              $('.spinner').remove();

              var item;
              for (item = 0; item < $('.vjs-playlist-item').length; item++){
                var img = $('.vjs-playlist-thumbnail img')[item];
                img.src = playlist[item].poster;
              }

              $('#heroPlaylistContainer, #heroPlaylistInfoContainer').fadeIn('fast').addClass('show');

              $('#heroImage,.vjs-playlist .vjs-playlist-item').on('click tapone',function(){
                var itemIndex = $(this).index($(this).parent());
                videojs('video-1').playlist.currentItem(itemIndex);

                $('#videoPlayerContainer').addClass('show');
                $('#heroImage').addClass('vjs-selected');
                $('.vjs-playlist .vjs-playlist-item.vjs-selected .vjs-playlist-thumbnail').addClass('show');
                $('#heroOverlay').hide();

                videojs('video-1').play();

                if(body.hasClass('header-desktop-fixed')){
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 57},750);
                } else if(body.hasClass('header-mobile-fixed')) {
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 60},750);
                } else {
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 157},750);
                }
              });

              $('.vjs-playlist .vjs-playlist-item').each(function(){
                $(this).on('click tapone',function(){
                  $(this).find('.vjs-playlist-thumbnail').addClass('show');
                });
              });
            }
            i++;
          }
        }
      });
    }
	});

  // Get Sales Tool Selected Settings and open Email via Footer "Email" Link
  var getSettings = function() {
    var siteType = $('.demo-site-nav-list-item.selected').text(),
        topicChoice = $('#topicChoice option:selected').val(),
        heroChoice = $('#heroChoice option:selected').text(),
        layoutChoice = $('#heroChoice option:selected').text(),
        socialChoice = $('#socialChoice option:selected').text(),
        colorText1 = $('.colorText1').text(),
        colorText2 = $('.colorText2').text();
    var mailto = 'mailto:?body=Site Type: '+ siteType+'%0D%0A' +'Number of Topics: '+topicChoice+'%0D%0A'+'Hero Image: '+heroChoice+'%0D%0A'+'Layout: '+layoutChoice+'%0D%0A'+'Social: '+socialChoice+'%0D%0A'+'Color Text 1: '+colorText1+'%0D%0A'+'Color Text 2: '+colorText2;
    $('.demo-footer-button.demo-button-email').attr('href',mailto);
  }
  getSettings();

  // Change Hero Image on Sales Tool Drop-down selection
  var onClickChangeHero = function() {
    var heroImageOptions = [
      {
        'id': '1',
        'src': 'images/hero/hero_images_01.jpg'
      },
      {
        'id': '2',
        'src': 'images/hero/hero_images_02.jpg'
      },
      {
        'id': '3',
        'src': 'images/hero/hero_images_03.jpg'
      },
      {
        'id': '4',
        'src': 'images/hero/hero_images_04.jpg'
      },
      {
        'id': '5',
        'src': 'images/hero/hero_images_05.jpg'
      },
      {
        'id': '6',
        'src': 'images/hero/hero_images_06.jpg'
      },
      {
        'id': '7',
        'src': 'images/hero/hero_images_07.jpg'
      },
      {
        'id': '8',
        'src': 'images/hero/hero_images_08.jpg'
      }
    ]

    $('#heroImageChoice').change(function() {
      var clickedOption = $('#heroImageChoice option:selected').val(),
          totalOptions = heroImageOptions.length;
      console.log(clickedOption);

      for (i=0;i<totalOptions;i++) {
        if (heroImageOptions[i].id === clickedOption) {
          console.log(heroImageOptions[i].src);
          $('#heroImageContainerInner img').attr('src',heroImageOptions[i].src);
        }
      }
    });
  }
  onClickChangeHero();
});
