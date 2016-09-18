var AtomicSG = (function ($) {

    var _sideNav = function () {
        // Controls for Side nav
        $('.base__sidenav__openLeft').off().on('click', function(){
            $('.base__sidenav--left').toggleClass('base__sidenav--open');
        });
        $('.base__sidenav__openRight').off().on('click', function(){
            $('.base__sidenav--right').toggleClass('base__sidenav--open');
              //Stickyfill.rebuild();
        });
    };

    var _stickyNav = function () {
        $('.js-pinned').each(function(){
            var sticky = new Waypoint.Sticky({
                element: $(this)[0]
            });
        });
    };

    var _accodrionDropd = function () {
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
    };

    var _transparentAppBars = function () {
        if ( !$('.base__canvas > *:first-child').hasClass('o-splash') ){
            $('.base__appBar--transPrime').removeClass('base__appBar--transPrime');
            $('.base__appBar--transPrimeCompany').removeClass('base__appBar--transPrimeCompany');
            $('.base__appBar--transCompany').removeClass('base__appBar--transCompany');
        }
    };

    var _imgBaseline = function () {
        // Image baseline calc
        function imageBaseline( $img, $bl ){
            var imgHeight = $img.height();
            var multiplyer = Math.round(imgHeight / 12);
            $img.css( 'height', 'calc(0.75rem *'+ multiplyer +')' );
        }
        $('img.js-img-bs').each(function(){
                imageBaseline($(this));
        });
        $(document).resize(function(){
            $('img.js-img-bs').each(function(){
                imageBaseline($(this));
            });
        });
    };

    var _sliders = function () {
        // Flex Slider
        $('.o-splashSlider').flexslider({
          animation: 'fade'
        });
    };

    var init = function () {
        _stickyNav();
        _sideNav();
        _transparentAppBars();
        _accodrionDropd();
        _sliders();
        _imgBaseline();
        $('.m-dropDown').atmDropdown({ option: 'value' }); // Atomic Dropdown
    };

    return {
        init: init
    };

})(jQuery);
