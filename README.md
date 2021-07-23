# [WIP] Laravel Mix Multipackage

- Are you developing a modular application in Laravel by using composer packages?
- Do you include js/css resources in those packages?
- Are you separately pre-compiling those resources for each package?

Then this package might change that.

A simple scenario you might encounter:

- package A contains some JS, with a dependency on `lodash`. You pre-compiled this with mix into a bundle `resources/js/package-a.js`  
- package B contains some JS, with a dependency on `jquery`. You pre-compiled this with mix into a bundle `resources/js/package-b.js`
- package C contains some JS, with a dependency on `lodash`. You pre-compiled this with mix into a bundle `resources/js/package-c.js`
- Your application JS can depend on any or all of these packages. Lets say you require all those packages and publish those assets. 

You could end up with some heavy code duplication as both Package A and Package C include lodash.

This package allows another approach to the situation:
- Packages contain the source JS/TS/whatever. No pre-compiled bundles
- Packages have their composer.json or package.json name and define a entry point
- You simply run `mix` from the root application, and those packages sources JS/TS will be included by `mix`. And as such, vendor code duplication will not occurr.
- You will enjoy webpack's tree-hashing and provide you with the smallest build

## Basic developer experience example
Check out the full example in the [example](example) directory.
During development, lets suppose your package is residing in the directory `packages`. But in production, its in the `vendor` map

**/project/{packages|vendor}/foo/core**
- composer.json
    ```json
    {
        "name": "foo/core"
    }
    ```
- package.json
    ```json
    {
        "name": "@foo/core",
        "main": "resources/js/index.js",
        "multipackage": true
    }
    ```
- resources/js/index.js
    ```jsx
    import {merge} from 'lodash'
    
    export const App = {
        mount(elementId){
            const el = document.getElementById(elementId);
            el.classList.add('app')
        }
    }
    export const util = {
        ucfirst(str){
            return str[0].toUpperCase() + str.toString().slice(1)
        },
        merge(...objects){
            return merge(...objects);
        }
    }
    ```

**/project/{packages|vendor}/foo/addon**
- composer.json
    ```json
    {
        "name": "foo/addon",
        "requires": {
            "foo/core": "^1.0"
        }
    }
    ```
- package.json
    ```json
    {
        "name": "@foo/addon",
        "main": "resources/js/index.js",
        "multipackage": true,
        "dependencies": {
            "@foo/core": "^1.0.0"    
        } 
    }
    ```
- resources/js/index.js
    ```jsx
    import {App, util} from '@foo/core'
    
    export const superDuperImportantString = util.ucfirst('superduper');
    ```

**/project**
- composer.json
- artisan
- etc..
- package.json
    ```json
    {
        "private": true,
        "workspaces": {
            "packages": [
                "packages/*/*",
                "vendor/*/*"
            ]
        },
        "scripts": {
            "dev": "npm run development",
            "development": "mix",
            "watch": "mix watch",
            "watch-poll": "mix watch -- --watch-options-poll=1000",
            "hot": "mix watch --hot",
            "prod": "npm run production",
            "production": "mix --production"
        },
        "devDependencies": {
            "axios": "^0.21",
            "laravel-mix": "^6.0.6",
            "@radic/laravel-mix-multipackage": "^1.0.0",
            "lodash": "^4.17.19",
            "postcss": "^8.1.14"
        }
    }
    ```
- webpack.mix.js
    ```jsx
    const mix = require('laravel-mix');
    require('@radic/laravel-mix-multipackage');
    
    mix
        .js('resources/js/app.js', 'public/js')
        .postCss('resources/css/app.css', 'public/css', [])
        .multipackage({
            /*
            results in:
            - public/vendor/foo/runtime.js
            - public/vendor/foo/vendor.js
            - public/vendor/foo/core/js/core.js
            - public/vendor/foo/addon/js/addon.js
            */
            outputPath: 'public/vendor', 
            scanLocations: [
                'vendor/*/*',
                'packages/*/*',
            ]
        })      ;
    ```

## Installation
todo

## Usage
todo

