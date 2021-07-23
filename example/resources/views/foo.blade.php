<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Example</title>
    <link href="{!! mix('vendor/foo/core/css/core.css') !!}" rel="stylesheet" type="text/css" />
    <link href="{!! mix('vendor/foo/addon/css/addon.css') !!}" rel="stylesheet" type="text/css" />


</head>
<body>
<div id="app"></div>
<script src="{!! mix('vendor/foo/runtime.js') !!}"></script>
<script src="{!! mix('vendor/foo/vendor.js') !!}"></script>
<script src="{!! mix('vendor/foo/core/js/core.js') !!}"></script>
<script src="{!! mix('vendor/foo/addon/js/addon.js') !!}"></script>
<script>
var foo = window.foo
foo.core.App.use(foo.addon.superDuperAppPlugin)
foo.core.App.mount('app');
</script>




</body>
</html>
