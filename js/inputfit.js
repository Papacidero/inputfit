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
        var maxWidth = $(this).width() - 5;
        var maxHeight = $(this).height();

        $(this).addClass('inputFit');
        //$(this).after('<div id="temp" style="width:' + maxWidth + 'px;height:' + maxHeight + 'px;border: 1px solid red; float: left;"><span class="inputFit" style="display:block; border: 1px solid red; float: left;"></span></div>');
		
		$(this).after('<span class="inputFit" style="display:none; border: 1px solid red; float: left;"></span>');

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
            actualWidth = $('span.inputFit').width() + 5;
            actualHeight = $('span.inputFit').height();
            actualFontSize = parseInt($('span.inputFit').css('font-size'));
        }

        function resize() {

            fontSize = actualFontSize * maxWidth / actualWidth * 0.9;
            if (maxWidth < actualWidth) {
                $('.inputFit').css('font-size', fontSize);
            } else if (maxWidth > actualWidth) {
                fontSize = actualFontSize * maxWidth / actualWidth * 0.9;
                if (fontSize <= parseInt(originalFontSize)) {
                    $('.inputFit').css('font-size', fontSize);
                }
            }
        }

        $(this).keydown(function (event) {

            //Using toUpperCase
            $('span.inputFit').text($(this).val().toUpperCase());
            actualSizes();
            resize();
        });

        $(this).keyup(function () {
            //Using toUpperCase
            $('span.inputFit').text($(this).val().toUpperCase());
            actualSizes();

		if($(this).val() == ''){
			$(this).css('font-size',originalFontSize);
			}

        });

    };

})(jQuery);