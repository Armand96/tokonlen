<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
// use Symfony\Component\HttpFoundation\Response;
// use Throwable;

class ForceJsonResponse
{
    public function handle(Request $request, Closure $next): JsonResponse
    {
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
