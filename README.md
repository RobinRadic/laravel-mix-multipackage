# Laravel Mix Multipackage

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

## Installation
todo

## Usage
todo

