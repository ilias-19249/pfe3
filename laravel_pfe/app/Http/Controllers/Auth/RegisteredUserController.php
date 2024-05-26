<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $rules = [
            'name'=>'required',
            'email' => 'required',
            'password' => 'required',
            'addresse'=>'required',
            'naissance'=>'required',
            'telephone'=>'required'
        ];
        $messages = [
            'name.required' => 'Le champ nom est requis.',
            'email.required' => 'Le champ email est requis.',
            'password.required' => 'Le champ mot de passe est requis.',
            'addresse.required' => 'Le champ adresse est requis.',
            'naissance.required' => 'Le champ date de naissance est requis.',
            'telephone.required' => 'Le champ téléphone est requis.'
        ];

        $validator = Validator::make($request->all(), $rules , $messages);
         if ($validator->fails()) {
            $errorObjects = [];
            foreach ($validator->errors()->toArray() as $field => $errors) {
                $errorObjects[] = ['message' => $errors[0]];
            }
            return response()->json(['errors' => $errorObjects]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' =>Hash::make($request->password),
            'addresse'=>$request->addresse,
            'telephone'=>$request->telephone,
            'naissance'=>$request->naissance
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->json([
            'message'=>'register',
            'status'=>201,
            'user'=>$user
        ]);
    }
}
