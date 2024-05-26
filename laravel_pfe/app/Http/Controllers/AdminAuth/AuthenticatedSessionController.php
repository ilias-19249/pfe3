<?php

namespace App\Http\Controllers\AdminAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminAuth\LoginRequest;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
         $result = Admin::where('email',$request->email)->where('password',$request->password)->get();
         if($result){
            return response()->json([
                'message'=>'authenticated',
                'data'=>$request
            ]);
         }else{
            return response()->json([
                'message'=>'not authenticated',
                'data'=>$request
            ]);
         }
        // $request->authenticate();

        // $request->session()->regenerate();

        // return response()->noContent();
      
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
