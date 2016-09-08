/*! Input Fit Plugin - v0.0.1 - 2015-07-08
 * https://github.com/Papacidero/inputfit
 *
 * Copyright (c) 2015 Carlos Eduardo Papacidero <papacidero@gmail.com>;
 * Licensed under the MIT license */

(function ($) {

    $.fn.inputFit = function (options) {
        
        var elem = this;

        var defaults = {
            'maxFontSize': this.css('font-size'),
            'minFontSize': 5
        };

        var options = $.extend({}, defaults, options);

        const defaultProperties = {
            originalFontSize : elem.css('font-size'),
            originalFontFamily : elem.css('font-family'),
            originalFontAlignment : elem.css('text-align'),
            originalFontWeight : elem.css('font-weight'),
            originalTextTransform : elem.css('text-transform'),
            maxWidth : elem.width(),
            maxHeight : elem.height(),
            actualWidth : '',
            actualHeight : '',
            actualFontSize : ''
        };

        elem.addClass('inputFit');
        elem.after(
            `<span 
                class="inputFit"
                style="
                display: none;
                position: absolute; bottom: 0;
                left: 0; border: 1px solid gray;
                float: left;
                font-size: ${defaultProperties.originalFontSize};
                font-family: ${defaultProperties.originalFontFamily};
                text-align: ${defaultProperties.originalFontAlignment};
                font-weight: ${defaultProperties.originalFontWeight};
                text-transform: ${defaultProperties.originalTextTransform};">
            </span>`
        );

        var actualSizes = ()=> {
            defaultProperties.actualWidth = $('span.inputFit').width();
            defaultProperties.actualHeight = $('span.inputFit').height();
            defaultProperties.actualFontSize = parseInt($('span.inputFit').css('font-size'));
        };

        var resize = ()=> {
            let fontSize = '';
            fontSize = defaultProperties.actualFontSize * defaultProperties.maxWidth / defaultProperties.actualWidth * 0.9;
            if (defaultProperties.maxWidth < defaultProperties.actualWidth) {
                $('input.inputFit').css({'font-size': fontSize, 'height' : defaultProperties.maxHeight, 'width' : defaultProperties.maxWidth});
            } else if (defaultProperties.maxWidth > defaultProperties.actualWidth) {
                fontSize = defaultProperties.actualFontSize * defaultProperties.maxWidth / defaultProperties.actualWidth * 0.9;
                if (fontSize <= parseInt(defaultProperties.originalFontSize)) {
                    $('input.inputFit').css({'font-size': fontSize, 'height' : defaultProperties.maxHeight, 'width' : defaultProperties.maxWidth});
                }
            }
        };

        elem.keydown(function (event) {            
            $('span.inputFit').html(elem.val().replace(/(\s)/g,"&nbsp;"));
            actualSizes();
            resize();
        });

        elem.keyup(function () {
            $('span.inputFit').html(elem.val().replace(/(\s)/g,"&nbsp;"));
            actualSizes();
		if(elem.val() === ''){
			elem.css('font-size',defaultProperties.originalFontSize);
			}

        });

    };

})(jQuery);