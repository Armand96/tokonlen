<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel 11 with React</title>
</head>

<body>
<script type="module" src="{{ asset('frontend/_next/static/chunks/main.js') }}"></script>
<div id="app">
        @csrf
        <script type="module">
            import RefreshRuntime from 'http://localhost:3000/@react-refresh'
            RefreshRuntime.injectIntoGlobalHook(window)
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {}
        </script>
    </div>
</body>

</html>
