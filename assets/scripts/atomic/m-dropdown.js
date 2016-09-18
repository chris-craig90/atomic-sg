/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {
    'use strict';

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var atmDropdown = "defaultPluginName",
        defaults = {
            propertyName: "value"
        };


    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = atmDropdown;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            this.menuPos(this.element);
            this.eventHandlers(this.element, this.options);

            // Insert triangle infdicator
            $(this.element).find('.m-dropDown__menu').prepend('<li class="m-dropDown__menu__tri up border"></li>');

            //this.trigger = this.element.find('.m-dropDown__trigger');
            //this.menu = this.element.find('.m-dropDown__menu');
        },

        eventHandlers: function(el, options){
            var self = this;
            $(el).find('.m-dropDown__trigger').on('click', this.toggle); // Toggle event
            $(window).on('resize', function() { self.menuPos(self.element); }); // Re-calc menu positon on viewport resise
        },

        toggle: function(e) {
            var $this = $(this),
                $parent = $this.parent('li'),
                $menu = $this.next('.m-dropDown__menu');

            // Open menu
            $this.toggleClass('m-dropDown__trigger--open');
            $parent.toggleClass('is--active');
            $menu.toggleClass('m-dropDown__menu--open');
        },

        menuPos : function(el){
            var $menu = $(el).find('.m-dropDown__menu'),
                menuPos = $menu[0].getBoundingClientRect();

            // Clean old menu position classes
            $menu.removeClass('m-dropDown__menu--left, m-dropDown__menu--right, m-dropDown__menu--center');

            // hard left
            if ( menuPos.right > 80 && menuPos.left < 80  ){
                console.log('hard-left');
                $menu.addClass('m-dropDown__menu--left').removeClass('m-dropDown__menu--right, m-dropDown__menu--center');
            }
            // hard right
            else if ( menuPos.right < 80 && menuPos.left > 80  ){
                console.log('hard-right');
                $menu.addClass('m-dropDown__menu--right').removeClass('m-dropDown__menu--left, m-dropDown__menu--center');
            } else{
                console.log('center');
                $menu.addClass('m-dropDown__menu--center').removeClass('m-dropDown__menu--left, m-dropDown__menu--right');
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.atmDropdown = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + atmDropdown)) {
                $.data(this, "plugin_" + atmDropdown,
                new Plugin( this, options ));
            }
        });
    };


})( jQuery, window, document );

/* HACK jshint ignore:start */
// Jquery Visible plugin
!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);
/* jshint ignore:end */
