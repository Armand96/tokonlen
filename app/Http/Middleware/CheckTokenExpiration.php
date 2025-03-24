<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class CheckTokenExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // Check if the token has expired
        $expiration = config('sanctum.expiration');
        if ($expiration && $accessToken->created_at->addMinutes($expiration)->isPast()) {
            $accessToken->delete(); // Delete the expired token
            return response()->json(['message' => 'Token expired'], 401);
        }

        return $next($request);
    }
}
