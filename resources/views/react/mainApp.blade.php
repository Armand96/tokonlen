<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel 11 with React</title>

</head>

<body>
    <div id="root"></div>
    @section('content')
    {!! file_get_contents(public_path('mainApp/index.html')) !!}
@endsection

</body>

</html>