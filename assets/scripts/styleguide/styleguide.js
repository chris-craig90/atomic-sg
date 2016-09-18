// Custom SC5 stylewguide setup
// ===================================

$(document).ready(function() {
  setTimeout(function () {

      console.log('styleguidestart');

    // # Template setup
    // ==========================================
    var sc5Template = $SC5();
    sc5Template
      //.clean()
        .gridControls();
        //   .mainContent()
        //     .sideNav()
        //       .placeholder()
        //         .demo('temp');
                //.demo('fashion-light-uni');

    // # Grid Overlays
    // ==========================================
    // ## Baseline Grid overlay
    // Create and then store a refrence to our baseline grid object so we can access the toggle methods on its prototype
    var baselineGrid = $BLGRD('.js-gridOverlay--bl, .js-gridOverlay').create();
    // Create a click event and fire BL$.toggle() method to show/hide the baseline grid overlay
    $(document).on('click', '#baselineGrid_overlay_btn', function() {
      $(this).toggleClass('m-LinkGrp--toggleGroup__link--focus');
      baselineGrid.toggle();
    });

    // ## Horizontal Grid overlay
    // Create and then store a refrence to our horizontal grid object so we can access the toggle methods on its prototype
    var horGrid = $HGRD('.u-Grid-wrap, .js-gridOverlay').create();
    // Create a click event and fire horGrid$.toggle() method to show/hide the baseline grid overlay
    $(document).on('click', '#sg-gridOverlay--hor_btn', function() {
      $(this).toggleClass('m-LinkGrp--toggleGroup__link--focus');
      horGrid.toggle();
    });

  },3000);
});
