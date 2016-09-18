/**
 * @file sc5Layout.js
 * @author Christopher Craig
 * @version 0.2
 */

/**
 * Library for creating a baseline grid overlay
 * @namespace sc5Layout
 * @example
 * // Create and then store a refrence to our baseline grid object so we can access the toggle methods on its prototype
 * var sc5Layout = $SC5('.show-baseline').create();
 *
 * // Create a click event and fire $SC5.toggle() method to show/hide the baseline grid overlay
 * $(document).on('click', '#sc5Layout_overlay_btn', function() {
 *   $(this).toggleClass('m-LinkGrp--toggleGroup__link--focus');
 *   sc5Layout.toggle();
 * });
 */

;(function(global, $) {

  // ### 'new' an object
  var SC5Layout = function(selector) {
    // The SC5Layout object is actually just the init constructor 'enhanced'
    // **this concept is taken from jQuery**
    return new SC5Layout.init(selector);
  };

  // ## Hidden properties and function
  // Hidden the scope of the IIFE and never directly accessible
  // var test = 'val';

  // Attach method to prototype object (to save memory space!)

  /**
   * @function environment
   * @memberof sc5Layout
   * @description Checks if we are in the SC% full screen view or the styleguide. If in style guide, it returns true. Internal use only.
   * @private
   * @example
   * SC5().environment(); // => true/ false
   */
  SC5Layout.prototype.environment = function() {
    if(window.location.href.indexOf("fullscreen") === -1) {
      return true;
    }
  };

  /**
   * @function sidenav
   * @memberof sc5Layout
   * @description Wraps sc5 side nav and amedns defualt styles
   * @example
   * var sc5Template = $SC5();
   * sc5Template.sideNav
   */
  SC5Layout.prototype.sideNav = function() {
     if( this.environment() ){
       // Wrap side nav parent
       $('.sg-side-nav').wrap('<div class="base__sidenav base__sidenav--left base__sidenav--persistent base__sidenav--open js-gridOverlay--bl u-bg--prime"></div>');

       // Remove default toggle controll
       $('.sg.side-nav-toggle').remove();

       // Add side nav header
       $('.base__sidenav').prepend('' +
       '<div class="base__sidenav__appBar">' +
         '<div class="base__sidenav__logo u-hide--desktop">' +
             '<a href="" title="Home"><sg-insert>1.5.2</sg-insert></a>' +
         '</div>' +
       '<button class="base__sidenav__close u-hide--desktop a-icon base__sidenav__openLeft"><i class="a-icon a-icon--reg">close</i></button>' +
       '</div>' +
       '<header class="base__sidenav__title">' +
           '<h1>Interface guidelines</h1>' +
           '<p class="meta">Version 1.0</p>' +
       '</header>');


       // Place sg-side-nav inside the main content area of '.base__sidenav'
       $('.sg-side-nav').wrap('<div class="base__sidenav__main"></div>'); // Side bar sc5 navigation

       // Sub Nav Styles
       $('.sg-side-nav').addClass('m-nav-vert--title u-txt-hilgt');
       $('.sg-side-nav > ul > li a').addClass('u-txt-prime');
       $('.sg-side-nav > ul > li > a').removeClass('u-bg').addClass('u-bg');

       // Move Navigation to sit inside the newly creates '.base__sidenav__main'
       $('.sg-side-nav .m-nav-vert').detach().prependTo('.base__sidenav__main');
       $('.base__sidenav').detach().prependTo('.base');

       // CLose Side nav event handler
       $('.base__sidenav__openLeft').off().on('click', function(){
         console.log('click');
         $('.base__sidenav--left').toggleClass('base__sidenav--open');
       });

     }
     return this; // *chainable method*
  };

  /**
   * @function mainContent
   * @memberof sc5Layout
   * @description Sets up main content area
   * @example
   * var sc5Template = $SC5();
   * sc5Template.mainContent
   */
  SC5Layout.prototype.mainContent = function(){
    if( this.environment() ){
      $('body').prepend('<div class="base base--shadow"></div>');
      $('.view-index').detach().appendTo('.base').addClass('base__main');

      $('.base__main > .ng-scope').addClass('base__canvas');
      $('.base__canvas > .full-height').addClass('t-doc');

      $('.base__main').prepend('' +
      '<div class="base__appBar u-bg--prime js-gridOverlay--bl u-hide--desktop">' +
          '<nav class="o-toolbar">' +
              '<div class="o-toolbar_sect--lft u-Grid-col-12">' +
                  '<nav class="m-nav-hor">' +
                     '<ul class="m-nav-hor__list">' +
                         '<li class="m-nav-hor__list__item">' +
                             '<button class="m-nav-hor__list__item__link a-icon base__sidenav__openLeft">&#xE5D2;</button>' +
                         '</li>' +
                     '</ul>' +
                 '</nav>' +
             '</div>' +
         '</nav>' +
      '</div>');

      //$('.sg-body').addClass('t-doc__page');
      //$('.t-doc__page').wrap('<div class="t-doc"></div>');
      //$('.t-doc').wrap('<div class="base__canvas"></div>');

    }
    return this; // *chainable method*
  };

  /**
   * @function placeholder
   * @memberof sc5Layout
   * @description Refrshes the src attr of placeholder images, this insures a ramdom image is retrunred from the api
   * @example
   * var sc5Template = $SC5();
   * sc5Template.placeholder
   */
  SC5Layout.prototype.placeholder = function(){
    $('*').each(function(){
        var imageobj = this;
        $(imageobj).attr('src', $(imageobj).attr('src') + '?' + Math.random() ).attr('srcset', '');
    });
    return this; // *chainable method*
  };

  /**
   * @function placeholder
   * @memberof sc5Layout
   * @description Refrshes the src attr of placeholder images, this insures a ramdom image is retrunred from the api
   * @example
   * var sc5Template = $SC5();
   * sc5Template.placeholder
   */
  SC5Layout.prototype.demo = function(){

    // Image collections
    var imgSets = [ 'placeholder', 'bakery', 'bike' ];
    var currentSet = 'placeholder';

    // Click event
    $('#sg-image-switch').on('click', function() {
        var nextSet = ( imgSets.indexOf( currentSet ) + 1 < imgSets.length ) ? imgSets[imgSets.indexOf( currentSet ) + 1] : imgSets[0];
        currentSet = nextSet;
        swapImage(currentSet);
    });

    function swapImage(demo) {

        var imgNos = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
        // Swap source img elments
        $('img[src*="/demo/"]').each(function(){
            var src= $(this).attr('src');
            var imgPath = src.split('/');

            // Get Random image, range between 1 - 4
            if ( imgNos.length === 0 ){
                imgNos = [ '1', '2', '3', '4', '5', '6', '7', '8' ];
            }
            console.log(imgNos);
            var fileName = imgPath[6].split('?');
            var fileNameTrim = fileName[0].substring(0, fileName[0].length - 5);
            var randImgNo = imgNos[Math.floor(Math.random()*imgNos.length)];
            // Remove the random no from imgNos array so it doesnt get shown twice
            imgNos.splice( imgNos.indexOf(randImgNo) , 1);
            var randImg = fileNameTrim + randImgNo + '.jpg';


            // If Logo just swap source
            if ( imgPath[5] === 'logo' ){
                console.log(imgPath);
                imgPath[4] = demo;
                console.log(imgPath);
                $(this).attr('src', imgPath[0]+ '/' + imgPath[1]+ '/' + imgPath[2] + '/' + imgPath[3] + '/' + imgPath[4] + '/' + imgPath[5] + '/' + imgPath[6] );
            }
            else{
                if (imgPath[0] === '') {
                    imgPath.splice(0,1);
                }
                if ( demo && typeof demo === 'string' ){
                    imgPath[3] = demo;
                    imgPath[5] = randImg;
                    $(this).attr('src', '/' + imgPath[0]+ '/' + imgPath[1]+ '/' + imgPath[2] + '/' + imgPath[3] + '/' + imgPath[4] + '/' + imgPath[5] );
                }
            }


        });



        // Swap css inline background-image url
        $('*[style*="/demo/"]').each(function(){
            var inlneStyle= $(this).attr('style');
            var imgPath = inlneStyle.split('/');

            // Get Random image, range between 1 - 4
            var fileName = imgPath[6].split(')');
            var fileNameTrim = fileName[0].substring(0, fileName[0].length - 5);
            var randImgNo = Math.floor(Math.random() * 8) + 1;
            var randImg = fileNameTrim + randImgNo + '.jpg)' + fileName[1];

            if (imgPath[0] === '') {
                imgPath.splice(0,1);
            }
            if ( demo && typeof demo === 'string' ){
                imgPath[4] = demo
                imgPath[6] = randImg;
                $(this).attr('style', imgPath.join('/') );
            }
        });
    }

    return this; // *chainable method*
  };

  /**
   * @function gridControls
   * @memberof sc5Layout
   * @description Inserts ctrol buttons for grid overlay
   * @example
   * var sc5Template = $SC5();
   * sc5Template.gridControls
   */
  SC5Layout.prototype.gridControls = function(){

      $('body').append(
      '<div id="sg-controls" class="sg-controls">' +
      ' <nav class=" m-nav-tog u-shadow-l3">' +
      '   <ul class=" m-nav-tog__list">' +
      '     <li class=" m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="sg-image-switch">' +
      '          <i class="a-icon a-icon--sml">image</i>' +
      '       </button>' +
      '     </li>' +
      '     <li class=" m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="mqSettings-btn">' +
      '          <i class="a-icon a-icon--sml">devices_other</i>' +
      '       </button>' +
      '     </li>' +
      '     <li class="m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="sg-gridOverlay--hor_btn">' +
      '          <i class="a-icon a-icon--sml">line_style</i>' +
      '       </button>' +
      '     </li>' +
      '     <li class="m-nav-tog__list__item">' +
      '       <button class="m-nav-tog__link" id="baselineGrid_overlay_btn">' +
      '          <i class="a-icon a-icon--sml">line_weight</i>' +
      '       </button>' +
      '     </li>' +
      '  </ul>' +
      ' </nav>' +
      ' </div>' +
      '');

      // Media query toggle control event handler
      $(document).on('click', '#mqSettings-btn', function(){
        $(this).toggleClass('m-nav-tog__link--focus');
        $('body').toggleClass('mqSettings--show');
      });



    return this; // *chainable method*
  };

  /**
   * @function clean
   * @memberof sc5Layout
   * @description Removes deafault stylesheets
   * @example
   * var sc5Template = $SC5();
   * sc5Template.mainContent
   */
  SC5Layout.prototype.clean = function() {
    console.log('cleaning up ...');
    // Remove Defualt css files
    $('link[href="/styleguide-app.css"]').remove();
    $('link[href="/styleguide_helper_elements.css"]').remove();

    return this; // *chainable method*
  };

  // The actual object is created here, allowing us to 'new' an object without calling 'new'
  SC5Layout.init = function(selector) {
      var self = this;
  };

  // Trick borrowed from jQuery so we don't have to use the 'new' keyword
  SC5Layout.init.prototype = SC5Layout.prototype;

  // Attach our SC5Layout to the global object, and provide a shorthand '$SC5' to ease our poor fingers
  global.SC5Layout = global.$SC5 = SC5Layout;

}(window, jQuery));
