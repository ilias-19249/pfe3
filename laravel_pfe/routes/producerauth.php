<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\ProducerAuth\NewPasswordController;
use App\Http\Controllers\ProducerAuth\VerifyEmailController;
use App\Http\Controllers\ProducerAuth\RegisteredUserController;
use App\Http\Controllers\ProducerAuth\PasswordResetLinkController;
use App\Http\Controllers\ProducerAuth\AuthenticatedSessionController;
use App\Http\Controllers\ProducerAuth\EmailVerificationNotificationController;

Route::group(['middleware'=>['guest:producer'],'prefix'=>'producer', 'as'=>'producer.'],function(){
                    // ->middleware('guest')
                    // ->name('register');
    
                    // ->middleware('guest')
                    // ->name('login');
    
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                    ->middleware('guest')
                    ->name('password.email');
    
    Route::post('/reset-password', [NewPasswordController::class, 'store'])
                    ->middleware('guest')
                    ->name('password.store');
    Route::post('ajouterProduit',[ProducerController::class,'ajouterProduit']);
    Route::post('supprimerProduit/{id}',[ProducerController::class,'supprimerProduit']);
    Route::post('modifierProduit/{id}',[ProducerController::class,'modifierProduit']);
    Route::post('consulterEchantillon/{id}',[ProducerController::class,'consulterEchantillon']);
    Route::post('produit/{id}',[ProducerController::class,'produit']);
    // Route::post('produits',[ProducerController::class,'produits']);
    Route::post('contacterClient',[ProducerController::class,'contacterClient']);
    Route::post('getEchantillons/{id}',[ProducerController::class,'getEchantillons']);
    Route::post('getProducts/{id}',[ProducerController::class,'getProducts']);
    Route::post('supprimerProduit/{id}',[ProducerController::class,'supprimerProduit']);
    Route::post('definirQuantite/{id}',[ProducerController::class,'définirQuantité']);
    Route::post('getCommandes/{id}',[ProducerController::class,'getCommandes']);
    Route::post('bonneCommande/{id}',[ProducerController::class,'bonneCommande']);
    Route::post('confirmerReception/{id}',[ProducerController::class,'confirmerReception']);
    Route::get('staticticsByMonth/{id}',[ProducerController::class,'staticticsByMonth']);
    Route::get('staticticsEchantillons/{id}',[ProducerController::class,'staticticsEchantillons']);
    Route::get('détailsTests/{id}/{id2}',[ProducerController::class,'détailsTests']);
    Route::get('messageClient/{id}/{message}',[ProducerController::class,'messageClient']);
    Route::post('périodeProduit/{id}',[ProducerController::class,'périodeProduit']);
    Route::get('years',[ProducerController::class,'years']);


    });
    Route::post('/producer/register', [ProducerController::class, 'register']);
    Route::post('/producer/login', [ProducerController::class, 'login']);
    
    Route::group(['middleware'=>['auth:producer'],'prefix'=>'producer', 'as'=>'producer.'],function(){
    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                    ->middleware(['auth', 'signed', 'throttle:6,1'])
                    ->name('verification.verify');
    
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                    ->middleware(['auth', 'throttle:6,1'])
                    ->name('verification.send');
    
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                    ->middleware('auth')
                    ->name('logout');

    });