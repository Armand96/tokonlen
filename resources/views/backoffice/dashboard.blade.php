<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
    rel="stylesheet"
/> -->
    <title>Laravel 11 with React</title>
    @viteReactRefresh
    @vite([ 'resources/js/backoffice/src/index.tsx'])
</head>

<body>
    <div id="root"></div>
</body>

</html>
