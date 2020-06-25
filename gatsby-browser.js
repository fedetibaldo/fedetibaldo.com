/* eslint-disable */
/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
require('typeface-source-sans-pro')
require('./src/styles/global.css')

// Intl polyfills to support Safari
require('@formatjs/intl-pluralrules/polyfill')
require('@formatjs/intl-pluralrules/dist/locale-data/en') // locale-data for en
require('@formatjs/intl-pluralrules/dist/locale-data/it') // locale-data for it
require('@formatjs/intl-relativetimeformat/polyfill')
require('@formatjs/intl-relativetimeformat/dist/locale-data/en') // Add locale data for en
require('@formatjs/intl-relativetimeformat/dist/locale-data/it') // Add locale data for it

// Prism theme
require("prismjs/themes/prism-tomorrow.css")

var trustAllScripts = function () {
    var scriptNodes = document.querySelectorAll('.load-external-scripts script');

    for (var i = 0; i < scriptNodes.length; i += 1) {
        var node = scriptNodes[i];
        var s = document.createElement('script');
        s.type = node.type || 'text/javascript';

        if (node.attributes.src) {
            s.src = node.attributes.src.value;
        } else {
            s.innerHTML = node.innerHTML;
        }

        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

exports.onRouteUpdate = function () {
    trustAllScripts();
};
