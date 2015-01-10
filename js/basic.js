var polyfilter_scriptpath = '/js/';

$(function() {
    $('#tabs').tabulous({
        effect: 'scale'
    });
     $('#tabs2').tabulous({
        effect: 'slideLeft'
    });
     $('#tabs3').tabulous({
        effect: 'scaleUp'
    });
    $('#tabs4').tabulous({
        effect: 'flip'
    });

    $('#va-accordion').vaccordion({
        visibleSlices   : 4,
        expandedHeight  : 400,
        animOpacity     : 0.1,
        contentAnimSpeed: 100
    });

    $('.tooltip').tooltipster({
        theme: '.my-custom-theme',
        delay:0,
        animation: 'grow'});
    
});
