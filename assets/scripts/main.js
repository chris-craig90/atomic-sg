//
//
//
//  Based on http://goo.gl/EUTi53 by Paul Irish
//
//  Only fires on body classes that match. If a body class contains a dash,
//  replace the dash with an underscore when adding it to the object below.
//
//  .noConflict()
//  The routing is enclosed within an anonymous function so that you can
//  always reference jQuery with $, even when in .noConflict() mode.
//
//

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        // Position Sticky Polyfill
        $(window).bind("styleguide:onRendered", function(e) {
        //$(document).ready(function() {


          //$('.o-toolbar--pinned').Stickyfill();
          $('.js-pinned').each(function(){
              var sticky = new Waypoint.Sticky({
                  element: $(this)[0]
              });
          });

          // Flex Slider
          $('.o-splashSlider').flexslider({
            animation: 'fade'
          });

          // Atomic Dropdown
          $('.m-dropDown').atmDropdown({
            option: 'value'
          });

          // Controls for Side nav
              $('.base__sidenav__openLeft').off().on('click', function(){
                console.log('click');
                $('.base__sidenav--left').toggleClass('base__sidenav--open');
                //Stickyfill.rebuild();
              });
              $('.base__sidenav__openRight').off().on('click', function(){
                $('.base__sidenav--right').toggleClass('base__sidenav--open');
                //Stickyfill.rebuild();
              });




          var accordionTriger2 = $('.m-nav-vert--accord a');
          if( accordionTriger2.length > 0 ) {
              accordionTriger2.each(function(){
                  var $self = $(this);
                  var $dropdown = $self.next('ul');
                  //$dropdown.slideUp(0).css('max-height', '100%');
                    $self.off().on('click', function(){
                      $(this).toggleClass('m-nav-vert--accord@open');
                        //( $(this).hasClass('m-nav-vert--accord@open') ) ? $dropdown.slideDown(350) : $dropdown.slideUp(350);
                    });
                });
          }



          // Image baseline calc
          function imageBaseline( $img, $bl ){
              var imgHeight = $img.height();
              var multiplyer = Math.round(imgHeight / 12);
              $img.css( 'height', 'calc(0.75rem *'+ multiplyer +')' );
          }
          $(document).ready(function(){
              $('img.js-img-bs').each(function(){
                  imageBaseline($(this));
              });
          });
          $(document).resize(function(){
              $('img.js-img-bs').each(function(){
                  imageBaseline($(this));
              });
          });

          $(document).off().on('click', '#js-close-search', function(e){
            console.log('clciked');
            e.preventDefault();
        	$(this).parent('#search-bar').toggleClass('closed');
            $(this).prev().focus();
          });


        });

      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
