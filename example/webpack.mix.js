const mix = require('laravel-mix');
require('@radic/laravel-mix-multipackage');

mix
    .js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [])
    .multipackage({
        outputPath   : 'public/vendor',
        scanLocations: [
            'vendor/*/*',
            'packages/*/*',
        ]
    });
