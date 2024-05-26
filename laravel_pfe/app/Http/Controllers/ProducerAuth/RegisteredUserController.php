<?php

// namespace App\Http\Controllers\Auth;
namespace App\Http\Controllers\ProducerAuth;


// use App\Models\User;
use App\Models\Producer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    // public function store(Request $request): Response
    // {
    //     return response()->json([
    //         'message'=>'wa fiq a'
    //     ]);
       

    //     $producer = Producer::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //         'ville'=>$request->ville,
    //         'naissance'=>$request->naissance
    //     ]);

    //    return response()->json([
    //     'message'=>'authenticated',
    //     'message2'=>'registered',
    //     'status'=>201,
    //     'producer'=>$producer
    //    ]);

    // }
}
