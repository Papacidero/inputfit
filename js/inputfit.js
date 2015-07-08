/*! Input Fit Plugin - v0.0.1 - 2015-07-08
 * https://github.com/Papacidero/inputfit
 *
 * Copyright (c) 2015 Carlos Eduardo Papacidero <papacidero@gmail.com>;
 * Licensed under the MIT license */

(function ($) {

    $.fn.inputFit = function (options) {

        var defaults = {
            'maxFontSize': 40,
            'minFontSize': 5
        };

        var options = $.extend({}, defaults, options);


        var originalFontSize = $(this).css('font-size');
        var originalFontFamily = $(this).css('font-family');
        var originalFontAlignment = $(this).css('text-align');
        var originalFontWeight = $(this).css('font-weight');
        var originalTextTransform = $(this).css('text-transform');
        var maxWidth = $(this).width();
        var maxHeight = $(this).height();

        $(this).addClass('inputFit');
        
        $(this).after('<span class="inputFit" style="position: absolute; bottom: 0; left: 0; border: 1px solid gray; float: left;"></span>');

        $('span.inputFit').css({
            'font-size': originalFontSize,
            'font-family': originalFontFamily,
            'text-align': originalFontAlignment,
            'font-weight': originalFontWeight,
            'text-transform': originalTextTransform
        });


        var actualWidth = '';
        var actualHeight = '';
        var actualFontSize = '';

        function actualSizes() {
            actualWidth = $('span.inputFit').width();
            actualHeight = $('span.inputFit').height();
            actualFontSize = parseInt($('span.inputFit').css('font-size'));
        }

        function resize() {

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

        $(this).keydown(function (event) {            

            $('span.inputFit').text($(this).val());
            actualSizes();
            resize();
        });

        $(this).keyup(function () {

            $('span.inputFit').text($(this).val());
            actualSizes();

		if($(this).val() == ''){
			$(this).css('font-size',originalFontSize);
			}

        });

    };

})(jQuery);

$('input').inputFit();