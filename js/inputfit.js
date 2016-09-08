'use strict';

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

        var defaultProperties = {
            originalFontSize: elem.css('font-size'),
            originalFontFamily: elem.css('font-family'),
            originalFontAlignment: elem.css('text-align'),
            originalFontWeight: elem.css('font-weight'),
            originalTextTransform: elem.css('text-transform'),
            maxWidth: elem.width(),
            maxHeight: elem.height(),
            actualWidth: '',
            actualHeight: '',
            actualFontSize: ''
        };

        elem.addClass('inputFit');
        elem.after('<span \n                    class="inputFit"\n                    style="\n                    display: none;\n                    position: absolute; bottom: 0;\n                    left: 0; border: 1px solid gray;\n                    float: left;\n                    font-size: ' + defaultProperties.originalFontSize + ';\n                    font-family: ' + defaultProperties.originalFontFamily + ';\n                    text-align: ' + defaultProperties.originalFontAlignment + ';\n                    font-weight: ' + defaultProperties.originalFontWeight + ';\n                    text-transform: ' + defaultProperties.originalTextTransform + ';">\n            </span>');

        var actualSizes = function actualSizes() {
            defaultProperties.actualWidth = $('span.inputFit').width();
            defaultProperties.actualHeight = $('span.inputFit').height();
            defaultProperties.actualFontSize = parseInt($('span.inputFit').css('font-size'));
        };

        var resize = function resize() {
            var fontSize = '';
            fontSize = defaultProperties.actualFontSize * defaultProperties.maxWidth / defaultProperties.actualWidth * 0.9;
            if (defaultProperties.maxWidth < defaultProperties.actualWidth) {
                $('input.inputFit').css({ 'font-size': fontSize, 'height': defaultProperties.maxHeight, 'width': defaultProperties.maxWidth });
            } else if (defaultProperties.maxWidth > defaultProperties.actualWidth) {
                fontSize = defaultProperties.actualFontSize * defaultProperties.maxWidth / defaultProperties.actualWidth * 0.9;
                if (fontSize <= parseInt(defaultProperties.originalFontSize)) {
                    $('input.inputFit').css({ 'font-size': fontSize, 'height': defaultProperties.maxHeight, 'width': defaultProperties.maxWidth });
                }
            }
        };

        elem.keydown(function (event) {
            $('span.inputFit').html(elem.val().replace(/(\s)/g, "&nbsp;"));
            actualSizes();
            resize();
        });

        elem.keyup(function () {
            $('span.inputFit').html(elem.val().replace(/(\s)/g, "&nbsp;"));
            actualSizes();
            if (elem.val() === '') {
                elem.css('font-size', defaultProperties.originalFontSize);
            }
        });
    };
})(jQuery);