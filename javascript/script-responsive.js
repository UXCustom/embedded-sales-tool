$(document).ready(function() {

  $('#moodChoice').on('change', function() {
    if ($(this).val() == 'A') {
      $("#sheet1").attr("href", "php/center.php");
      $('#heroImageContainerInner img').attr('src', 'images/background-medium.jpg');
    } else if ($(this).val() == 'B') {
      $('#sheet0').attr("href","");
      $("#sheet1").attr("href", "php/dark.php");
      $('#heroImageContainerInner img').attr('src', 'images/background-dark.jpg');
    } else {
      $('#sheet0').attr("href", "");
      $("#sheet1").attr("href", "php/light.php");
      $('#heroImageContainerInner img').attr('src', 'images/background-light.jpg');
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
      // var docHead = document.getElementsByTagName('head')[0];
      // var vscript = document.createElement('script');
      // vscript.type = "text/javascript";
      // vscript.src = "javascript/video.js";
      // docHead.appendChild(vscript);
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



  var socialMenu = function(){
    $('.icon-share').on('click',function(){
      $('.micrositeSocialMenu').toggleClass('show');
      $('.sponsorInfoPanel.show').removeClass('show');
      $(this).toggleClass('active');
      $('#sponsoredBy i').removeClass('active');
    });
  }

  var sponsoredContent = function(){
    $('#sponsoredBy').on('click',function(){
      $('.sponsorInfoPanel').toggleClass('show');
      $('.micrositeSocialMenu.show').removeClass('show');
      $(this).find('i').toggleClass('active');
      $('.icon-share').removeClass('active');
      $('.sponsoredByText').toggleClass('hide');
    });
  }

  var hidePopups = function(){
    $('.sponsorInfoPanel,.micrositeSocialMenu').removeClass('show');
    $('#sponsoredBy i,.icon-share').removeClass('active');
    $('.sponsoredByText').removeClass('hide');
  }

  var headerNavActiveTab = function(){
    $('#tabDropDown a').text($('#navList .activeTab').text());
  }

  var tabSelection = function(){

    $('#navList li').each(function(){
      $(this).on('click',function(){
        // $(this).addClass('activeTab');
        // $('#navList li').not($(this)).removeClass('activeTab');
        // headerNavActiveTab();
        $('#navList').removeClass('show');
      });
    });

    $('#tabDropDown').on('click',function(){
      $('#navList').toggleClass('show');
    });
  }

  var contentViewer = function(){

    var assetsListingCount = $('#assetsList li').length;

    $('.assetListingExpand').click(function(){
      $('#assetsList li:nth-child(n+4)').addClass('open');
      $(this).remove();
      $('#assetListingFader').remove();
    })

    /*
      Hide Load More option when there are 3 or fewer assets
    */
    if($(window).width() < 960){
      if(assetsListingCount > 3) {
        $('.assetListingExpand').show();
      }
    } else if ($(window).width() >= 960){
      if(assetsListingCount > 10) {
        $('.assetListingExpand').show();
      }
    }

    // if(assetsListingCount%2 === 0 ) {
    //   $('#assetsList li:nth-last-child(2)').addClass('penultimate');
    // }
  }

  if(typeof socialFeed !== 'undefined' && socialFeed == true){
    var socialFeedHasAccounts = [socialFeedHasTwitter, socialFeedHasFacebook, socialFeedHasRSS];
    var socialFeedAccountsCounter = socialFeedHasAccounts.length;

    var socialFeedAccountsTotal = 0;

    for (var i = 0; i < socialFeedAccountsCounter; i++) {
      if(socialFeedHasAccounts[i] == true){
        socialFeedAccountsTotal++;
      }
    }

    $('#micrositeSocialFeeds').addClass('count' + socialFeedAccountsTotal);

    var socialFeedTabNavigation = function(){
      var activeTab = 'micrositeSocialFeedNav' + startActive + 'Tab';

      $('.' + activeTab).addClass('active');

      var activePanel = 'micrositeSocialFeedNav' + startActive + 'Panel';

      $('.' + activePanel).css('display','block');


      function selectTab(){
        $('.micrositeSocialFeedNavRSSTab').click(function(){
          activeTab = 'rss';
        })
        $('.micrositeSocialFeedNavFacebookTab').click(function(){
          activeTab = 'facebook';
        })
        $('.micrositeSocialFeedNavTwitterTab').click(function(){
          activeTab = 'twitter';
        })
      }

      function loadPanel(){

        if($('.micrositeSocialFeedNavRSSTab').hasClass('active')){
          $('.micrositeSocialFeedRSSPanel').css('display','block');
          $('.micrositeSocialFeedTwitterPanel').css('display','none');
          $('.micrositeSocialFeedFacebookPanel').css('display','none');
          $('.micrositeSocialFeedFooter').html('<a href=' + rssLink + ' rel="nofollow" target="_blank"><div class="micrositeSocialFeedFooterCTA">View more blog posts</div></a>');
          // $('.micrositeSocialFeedFooterCTA').html('<a href=' + rssLink + ' target="_blank">View more blog posts</a>');
        } else if ($('.micrositeSocialFeedNavTwitterTab').hasClass('active')){
          $('.micrositeSocialFeedTwitterPanel').css('display','block');
          $('.micrositeSocialFeedRSSPanel').css('display','none');
          $('.micrositeSocialFeedFacebookPanel').css('display','none');
          $('.micrositeSocialFeedFooterCTA').html('Follow ' + twitterAccountName).wrap('<a href=' + twitterLink + ' rel="nofollow" target="_blank"></a>');
          // $('.micrositeSocialFeedFooterCTA').html('<a href=' + twitterLink + ' target="_blank">Follow ' + twitterAccountName + '</a>');
        } else if ($('.micrositeSocialFeedNavFacebookTab').hasClass('active')){
          $('.micrositeSocialFeedFacebookPanel').css('display','block');
          $('.micrositeSocialFeedRSSPanel').css('display','none');
          $('.micrositeSocialFeedTwitterPanel').css('display','none');
          $('.micrositeSocialFeedFooterCTA').html('Like us at ' + facebookAccountName).wrap('<a href=' + facebookLink + ' rel="nofollow" target="_blank"></a>');
          // $('.micrositeSocialFeedFooterCTA').html('<a href=' + facebookLink + ' target="_blank">Like us at ' + facebookAccountName + '</a>');
        }
      }

      loadPanel();
      selectTab();

      $('.micrositeSocialFeedNav ul li').on('click',function(e){
        e.preventDefault();

        if($(this).siblings().hasClass('active')){
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
        }

        loadPanel();
      });
      if (socialFeedAccountsTotal < 2) {
        $('.micrositeSocialFeedNav ul li').css('cursor','default');
      }
    }



    var errorStructure = '<div class="socialFeedMissingErrorMessage"><h2>Sorry</h2><p>Feed is temporarily unavailable.</p></div>';

    var getRSSFeed = function(){

      // var host_LI = 'yahooql.qa.techtarget.com'; // Testing
      var host = (window.location.hostname.indexOf('.eng.') != '-1') ? 'yahooql.eng.techtarget.com' : (window.location.hostname.indexOf('.qa.') != '-1') ? 'yahooql.qa.techtarget.com' : 'yahooql.techtarget.com';

      $('.viewAllBlogPosts').attr({'href':rssFeedSource, 'rel':'nofollow'});

      var rssStructure = '<li class="rssRow"><h4></h4><span class="rssPubDateDay"></span> <span class="rssPubDate"></span></div><p class="rssLink"></p></li>';

      $.ajax({
        type:'GET',
        url:'http://' + host + '/rss_json.php?rssFeedSource='+encodeURIComponent(rssFeedSource),
        dataType:'jsonp',
        crossDomain: true,
        success: function(rssFeed){
          if(typeof rssFeed.query === 'undefined') {
            $('.spinningBoxes').css('display','none');
            $('.micrositeSocialFeedRSSPanel #rssFeed').html('<p class="errorMessage">There was an error loading the RSS feed. <a href="' + rssLink + '" rel="nofollow" target="_blank">Visit the feed directly here.</a></p>');
          } else {
            $('.spinningBoxes').css('display','none');
            for(i = 0; i < 3; i++) {
              $('.micrositeSocialFeedRSSPanel #rssFeed ul').append(rssStructure);
              // Convert date format from "Fri, 19 Jun 2015 14:34:23 GMT" to "19" and "JUN15"
              rssDateNativeFormat = rssFeed.query.results.item[i].pubDate;
              rssDateSplitFormat = rssDateNativeFormat.split(' ');
              rssDateDayofMonth = rssDateSplitFormat[1];
              var rssDateYear4 = rssDateSplitFormat[3];
              rssDateMonthYear = rssDateSplitFormat[2] + rssDateYear4.substr(2);

              $('.rssRow:nth-of-type(' + (i+1) + ') .rssPubDateDay').html(rssDateDayofMonth);
              $('.rssRow:nth-of-type(' + (i+1) + ') .rssPubDate').html(rssDateMonthYear);
              $('.rssRow:nth-of-type(' + (i+1) + ') h4').html('<a href="' + rssFeed.query.results.item[i].link + '" rel="nofollow" target="_blank" + data-track="' + rssFeed.query.results.item[i].link + '" title="View this feed">' + rssFeed.query.results.item[i].title + '</a>');
              $('.rssRow:nth-of-type(' + (i+1) + ') .rssLink').html('<a href="' + rssFeed.query.results.item[i].link + '" rel="nofollow" target="_blank" + data-track="' + rssFeed.query.results.item[i].link + '" title="View this feed">Read More</a>');
            }
            $('.viewAllBlogPosts').css('display','block');
          }
        }
      });

    }

    var getTweets = function(){

      // var host_LI = 'twitter.qa.techtarget.com'; // Testing
      var host_LI = (window.location.hostname.indexOf('.eng.') != '-1') ? 'twitter.eng.techtarget.com' : (window.location.hostname.indexOf('.qa.') != '-1') ? 'twitter.qa.techtarget.com' : 'twitter.techtarget.com';

      var numTweets = 12; // Number of tweets to retrieve.
      var tweetId = 0; // Unique number which is associated to each individual tweet. Used to construct URLs for intents.

      // Structure per tweet. Customize away!
      var tweetStructure = '<li class="clearfix"><div class="twitterAvatarContainer"><img class="twitterAvatar"/></div><div class="tweetContent"><p><a class="twitterUserName" data-tweet-id="placeholder" target="_blank"></a> <a class="twitterUserHandle1" data-tweet-id="placeholder" target="_blank"></a><a class="tweetDate" data-tweet-id="placeholder" target="_blank"></a><br/><a class="twitterUserHandle2" data-tweet-id="placeholder" target="_blank"></a></p><div class="tweet" ><span class="tweetText"></span></div></div><div class="tweetIntents"></div></li>';

      var urlRE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g;
      var hashtagRE = /#(\S+)/g;
      var handleRE = /@(\S+)/g;

      var tweetText = new String();
      var tweetDateNativeFormat = new String();
      var tweetDateCorrectFormat = new Array();

      // Build out structure based on number of tweets we're getting back.
      for(i = 0; i < numTweets; i++) {
        $('.tweets').append(tweetStructure);
      }

      $.ajax({
        type:'GET',
        url:'http://' + host_LI + '/twitter_json.php?count='+numTweets+'&screen_name='+twitterAccount,
        dataType:'jsonp',
        crossDomain: true,
        success: function(listTweets){
          $('.spinningBoxes').css('display','none');
          $('#twitterfeed').css('display','block');

          var tweetIntentRetweeted;
          var tweetIntentFavorited;

          for(i = 0; i < numTweets; i++) {
            tweetId = listTweets[i].id_str;
            $('.tweets li:nth-of-type(' + (i+1) + ') a').attr('data-tweet-id', listTweets[i].id_str);
            $('.tweets li:nth-of-type(' + (i+1) + ') .tweetDate').attr({'href':'https://twitter.com/' + twitterAccount + '/status/' + listTweets[i].id_str, 'rel':'nofollow'});
            $('.tweets li:nth-of-type(' + (i+1) + ') .twitterUserName').html(listTweets[i].user.name).attr({'href':'https://twitter.com/' + twitterAccount, 'rel':'nofollow'});
            $('.tweets li:nth-of-type(' + (i+1) + ') .twitterUserHandle1').html(' @' + listTweets[i].user.screen_name).attr({'href':'https://twitter.com/' + twitterAccount, 'rel':'nofollow'});
            $('.tweets li:nth-of-type(' + (i+1) + ') .twitterUserHandle2').html(' @' + listTweets[i].user.screen_name).attr({'href':'https://twitter.com/' + twitterAccount, 'rel':'nofollow'});
            $('.tweets li:nth-of-type(' + (i+1) + ') .twitterAvatar').attr('src', listTweets[i].user.profile_image_url);

            // Convert Twitter created_at format from "Fri Feb 27 00:24:55 +0000 2015" to "Feb 27"
            tweetDateNativeFormat = listTweets[i].created_at;
            tweetDateSplitFormat = tweetDateNativeFormat.split(' ');
            tweetDateCorrectFormat = tweetDateSplitFormat[1] + ' ' + tweetDateSplitFormat[2];
            $('.tweets li:nth-of-type(' + (i+1) + ') .tweetDate').html(tweetDateCorrectFormat);

            // Tweet with links to hashtag/URLs where applicable
            tweetText = listTweets[i].text;
            if(tweetText != undefined && tweetText.length != 0) {
              $('.tweets li:nth-of-type(' + (i+1) + ') .tweetText').html(tweetText.replace(
                urlRE,
                '<a class="inLineLink" href="$&" data-tweet-id="' + listTweets[i].id_str + '" rel="nofollow" target="_blank">$&</a>'
              ).replace(hashtagRE, '<a class="hashLink" href="http://twitter.com/#!/search/$1" data-tweet-id="' + listTweets[i].id_str + '" rel="nofollow" target="_blank">#$1</a>'
            ).replace(handleRE, '<a class="handleLink" href="http://twitter.com/$1" data-tweet-id="' + listTweets[i].id_str + '" rel="nofollow" target="_blank">@$1</a>'));
            }

            var removedCharacters;
            $('.inLineLink').each(function(){
              if($(this).html().substr(-1) == '.'){
                removedCharacters = $(this).html().slice(0,-1);
                $(this).attr({'href': removedCharacters, 'rel':'nofollow'});
              }
            })
            $('.handleLink').each(function(){
              if($(this).html().substr(-1) == ':'){
                removedCharacters = $(this).html().slice(0,-1);
                $(this).attr({'href':'http://twitter.com/' + removedCharacters, 'rel':'nofollow'});
              }
            })

            // $('.micrositeSocialFeedFooter').css('display','block');

            tweetIntentRetweeted = listTweets[i].retweet_count;
            tweetIntentFavorited = listTweets[i].favorite_count;

            // Twitter intents. Reply/Retweet/Favorite
            $('.tweets li:nth-of-type(' + (i+1) + ') .tweetIntents').html('<a class="replyIntentLink" rel="nofollow" target="_blank" data-tweet-id="' + listTweets[i].id_str + '" href="https://twitter.com/intent/tweet?in_reply_to=' + tweetId + '"><i class="icon-reply"></i><span>Reply</span></a><a class="retweetIntentLink" rel="nofollow" target="_blank" data-tweet-id="' + listTweets[i].id_str + '" href="https://twitter.com/intent/retweet?tweet_id=' + tweetId + '"><i class="icon-retweet"></i><span>Retweet</span></a><span class="micrositeSocialFeedTwitterRetweeted">' + tweetIntentRetweeted + '</span><a class="favoriteIntentLink" rel="nofollow" target="_blank" data-tweet-id="' + listTweets[i].id_str + '" href="https://twitter.com/intent/favorite?tweet_id=' + tweetId + '"><i class="icon-favorite"></i><span>Favorite</span></a><span class="micrositeSocialFeedTwitterFavorited">' + tweetIntentFavorited + '</span>');


            if(tweetIntentRetweeted === 0){
              $('.tweets').find('.micrositeSocialFeedTwitterRetweeted').eq(i).css('display','none');
            }
            if(tweetIntentFavorited === 0){
              $('.tweets').find('.micrositeSocialFeedTwitterFavorited').eq(i).css('display','none');
            }

          };
        }, error: function(){
          $('.spinningBoxes').css('display','none');
          $('#twitterfeed').css('display','block').html(errorStructure);
        }
      });

    }

    var getFacebookStatuses = function(){

      // var host_LI = 'facebook.qa.techtarget.com'; // Testing
      var host_LI = (window.location.hostname.indexOf('.eng.') != '-1') ? 'facebook.eng.techtarget.com' : (window.location.hostname.indexOf('.qa.') != '-1') ? 'facebook.qa.techtarget.com' : 'facebook.techtarget.com';

      // Structure per status. Customize away!
      var facebookStatusStructure = '<li><p><a href="" target="_blank" class="facebookLink"><span class="facebookUser"></span></a><a href="" rel="nofollow" target="_blank" class="facebookLink"><span class="facebookStatusDate"></span></a></p><div class="facebookStatuses"><a href="" rel="nofollow" target="_blank" class="facebookLink"><p class="facebookStatus"></p></a><p class="facebookCTA"><a href="" rel="nofollow" target="_blank" class="facebookLink"><span>View Now</span></a></p></div></li>';

      // Regular Expression for finding URLs
      var urlRE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g;

      var numStatuses = 10;

      var facebookPostPoster = new String();
      var facebookPostURLNative = new String();
      var facebookPostURLFinal = new String();
      var facebookPostPicture = new String();
      var facebookPostTimeNative = new String();
      var facebookPostTimeFinal = new String();
      var facebookStatusText = new String();
      var month;
      var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

      $.ajax({
        type:'GET',
        url:'http://' + host_LI + '/facebook_json.php?facebookName='+facebookAccount+'&facebookCount='+numStatuses,
        dataType:'jsonp',
        crossDomain: true,
        success: function(listStatuses){

          if(listStatuses){
            $('#facebookfeed').css('display','block');

            for(i = 0; i < numStatuses; i++) {
              $('.facebookstatusupdates').append(facebookStatusStructure);

              facebookPostPoster = listStatuses.data[i].from.name;
              facebookPostURLNative = listStatuses.data[i].id.split('_');
              facebookPostURLFinal = "http://www.facebook.com/" + facebookPostURLNative[0] + '/posts/' + facebookPostURLNative[1];
              $('.facebookstatusupdates li:nth-of-type(' + (i+1) + ') .facebookUser').html(facebookPostPoster);
              $('.facebookstatusupdates li:nth-of-type(' + (i+1) + ') .facebookLink').attr({'href':facebookPostURLFinal, 'rel':'nofollow'});
              $('.facebookstatusupdates li:nth-of-type(' + (i+1) + ') .facebookStatus').html(listStatuses.data[i].message);

              facebookPostPicture = listStatuses.data[i].picture;
              if (facebookPostPicture != undefined){
                $('.facebookstatusupdates li:nth-of-type(' + (i+1) + ') .facebookStatusPictureContainer').css('display','block');
                $('.facebookstatusupdates li:nth-of-type(' + (i+1) + ') .facebookStatusPicture').css('display','block');
              } else {
              }

              // Convert Facebook created_time format from "2015-02-03T02:08:25+0000" to "Feb 03"
              facebookPostTimeNative = listStatuses.data[i].created_time.split('-');
              month = parseInt(facebookPostTimeNative[1]);
              facebookPostTimeFinal = months[month - 1] + ' ' + facebookPostTimeNative[2].substring(0,2);
              $('.facebookstatusupdates li:nth-of-type(' + (i+1) + ') .facebookStatusDate').html(facebookPostTimeFinal);
            };
            $('.spinningBoxes').css('display','none');
          } else {
            $('.spinningBoxes').css('display','none');
            console.log('wtf');
            $('.micrositeSocialFeedFacebookPanel').html(errorStructure);
          }
        }, error: function(){
          $('.spinningBoxes').css('display','none');
          $('#facebookFeed').css('display','block');
          $('.micrositeSocialFeedFacebookPanel').html('hi!');
        }
      });

    }
    if(socialFeedHasAccounts[0] == true){
      var twitterAccount = socialFeedTwitterAccount;
      var twitterLink = 'https://twitter.com/@' + twitterAccount;
      var twitterAccountName = socialFeedTwitterAccountName;
      $('.micrositeSocialFeedNav ul').append('<li class="micrositeSocialFeedNavTwitterTab"><i class="icon-twitter"></i><span>Latest Tweets</span></li>')
      $('.micrositeSocialFeedContent > ul').append('<li class="micrositeSocialFeedTwitterPanel"><div id="twitterfeed"><ul class="tweets"></ul></div></li>')
      getTweets();
    }

    if(socialFeedHasAccounts[1] == true){
      var facebookAccount = socialFeedFacebookAccount;
      var facebookLink = 'https://www.facebook.com/' + facebookAccount;
      var facebookAccountName = socialFeedFacebookAccountName;
      $('.micrositeSocialFeedNav ul').append('<li class="micrositeSocialFeedNavFacebookTab"><i class="icon-facebook"></i><span>Latest Updates</span></li>')
      $('.micrositeSocialFeedContent > ul').append('<li class="micrositeSocialFeedFacebookPanel"><div id="facebookfeed"><ul class="facebookstatusupdates"></ul></div></li>')
      getFacebookStatuses();
    }

    if(socialFeedHasAccounts[2] == true){
      var rssFeedSource = socialFeedRSSAccount;
      var rssLink = socialFeedRSSLinkURL;
      $('.micrositeSocialFeedNav ul').append('<li class="micrositeSocialFeedNavRSSTab"><i class="icon-rss"></i><span>Latest Posts</span></li>')
      $('.micrositeSocialFeedContent > ul').append('<li class="micrositeSocialFeedRSSPanel"><div id="rssFeed"><ul></ul></div></li>')
      getRSSFeed();
    }

    $(window).on('scroll',function(){
      if($('.sponsorInfoPanel').hasClass('show') && $(window).scrollTop() > $('.header').outerHeight(true) || $('.micrositeSocialMenu').hasClass('show') && $(window).scrollTop() > $('.header').outerHeight(true)){
        hidePopups();
      }
    });
    socialFeedTabNavigation();
  }

  var abstractHeaderHTML = function(){
    if ($('body#bprAbstractOneReg')){
      $('#abstractHeader').html('<div id="headerOuterContainer"><div id="headerInnerContainer"><div id="sponsorBar"><div id="sponsorBarContainer"><div id="socialMenu"><i class="icon-share"></i><div class="micrositeSocialMenu"><div class="share-bar-container"><ul class="share-bar"><li title="Like/Share on Facebook" data-socialsite="facebook" class="share-bar-item share-bar-item-desktop socialMedia-facebook"><a href="#"><i data-icon="u" class="icon"></i></a></li><li title="Share on Twitter" data-socialsite="twitter" class="share-bar-item share-bar-item-desktop socialMedia-twitter"><a href="#"><i data-icon="c" class="icon"></i></a></li><li title="Share on LinkedIn" data-socialsite="linkedin" class="share-bar-item share-bar-item-desktop socialMedia-linkedin"><a href="#"><i data-icon="o" class="icon"></i></a></li><li title="Email a Friend" class="share-bar-item share-bar-item-desktop contentTools-email"><a href="http://api.addthis.com/oexchange/0.8/forward/email/offer?pubid=uxtechtarget&amp;url=http%3A%2F%2Fpreview.techtarget.com%3A8080%2Fibmbizconnect%3Fvgnextrefresh%3D1%233744114142001&amp;title=Managing+the+%22Smart+Enterprise%22&amp;email_template=TechTargetSearchSites&amp;ct=1"><i data-icon="n" class="icon"></i></a></li></ul></div></div></div><div id="sponsoredBy"><p class="sponsoredByText">Sponsored Content </p><i class="icon-iCircle"></i><div class="sponsorInfoPanel"><p>Sponsored content is a special advertising section provided by IT vendors. It features educational content and interactive media.</p></div></div></div></div><div id="micrositeHeader"><a class="clientLogo"></a></div><div id="headerContainerClear"></div></div></div>');
    }
  }

  socialMenu();
  headerNavActiveTab();
  tabSelection();
  contentViewer();
  abstractHeaderHTML();
  sponsoredContent();

  $(window).on('resize',function(){
    if($(window).width() < 960){
      if($('#assetsList li').length > 3) {
        $('.assetListingExpand').show();
      }
    } else if ($(window).width() >= 960){
      if($('#assetsList li').length > 10) {
        $('.assetListingExpand').show();
      } else {
        $('.assetListingExpand').hide();
      }
    }
  });

});
