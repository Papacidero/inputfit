/*! Input Fit Plugin - v0.0.1 - 2015-07-08
 * https://github.com/Papacidero/inputfit
 *
 * Copyright (c) 2015 Carlos Eduardo Papacidero <papacidero@gmail.com>;
 * Licensed under the MIT license */

(function ($) {

    $.fn.inputFit = function (options) {
        
        let elem = this;

        let defaults = {
            'maxFontSize': this.css('font-size'),
            'minFontSize': 5
        };

        var options = $.extend({}, defaults, options);


        let originalFontSize = elem.css('font-size');
        let originalFontFamily = elem.css('font-family');
        let originalFontAlignment = elem.css('text-align');
        let originalFontWeight = elem.css('font-weight');
        let originalTextTransform = elem.css('text-transform');
        let maxWidth = elem.width();
        let maxHeight = elem.height();
        let actualWidth = '';
        let actualHeight = '';
        let actualFontSize = '';

        elem.addClass('inputFit');
        elem.after(`<span class="inputFit" style="display: none; position: absolute; bottom: 0; left: 0; border: 1px solid gray; float: left; font-size: ${originalFontSize}; font-family: ${originalFontFamily}; text-align: ${originalFontAlignment}; font-weight: ${originalFontWeight}; text-transform: ${originalTextTransform};"></span>`);

        function actualSizes() {
            actualWidth = $('span.inputFit').width();
            actualHeight = $('span.inputFit').height();
            actualFontSize = parseInt($('span.inputFit').css('font-size'));
        }

        function resize() {
            let fontSize = '';
            fontSize = actualFontSize * maxWidth / actualWidth * 0.9;
            if (maxWidth < actualWidth) {
                $('input.inputFit').css({'font-size': fontSize, 'height' : maxHeight, 'width' : maxWidth});
            } else if (maxWidth > actualWidth) {
                fontSize = actualFontSize * maxWidth / actualWidth * 0.9;
                if (fontSize <= parseInt(originalFontSize)) {
                    $('input.inputFit').css({'font-size': fontSize, 'height' : maxHeight, 'width' : maxWidth});
                }
            }
        }

        elem.keydown(function (event) {            
            $('span.inputFit').html(elem.val().replace(/(\s)/g,"&nbsp;"));
            actualSizes();
            resize();
        });

        elem.keyup(function () {
            $('span.inputFit').html(elem.val().replace(/(\s)/g,"&nbsp;"));
            actualSizes();
		if(elem.val() === ''){
			elem.css('font-size',originalFontSize);
			}

        });

    };

})(jQuery);