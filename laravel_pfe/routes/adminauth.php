<?php

use App\Http\Controllers\AdminAuth\AuthenticatedSessionController;
use App\Http\Controllers\AdminAuth\EmailVerificationNotificationController;
use App\Http\Controllers\AdminAuth\NewPasswordController;
use App\Http\Controllers\AdminAuth\PasswordResetLinkController;
use App\Http\Controllers\AdminAuth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminAuth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::group(['middleware'=>['guest:admin'],'prefix'=>'admin', 'as'=>'admin.'],function(){
Route::post('/register', [AdminController::class, 'register'])
                // ->middleware('guest')
                ->name('register');

Route::post('/login', [AdminController::class, 'store']);
                // ->middleware('guest')
                // ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest')
                ->name('password.store');

                Route::post('/chatter',[AdminController::class,'chatter']);
                Route::post('/AjouterTest',[AdminController::class,'AjouterTest']);
                Route::post('/AfficherTests',[AdminController::class,'AfficherTests']);
                Route::post('notifier/{id}',[AdminController::class,'notifier']);
                Route::post('ajouterEchantillon',[AdminController::class,'ajouterEchantillon']);  
                Route::post('Echantillons',[AdminController::class,'Echantillons']);  
                Route::post('Echantillon/{id}',[AdminController::class,'Echantillon']);  
                Route::post('Producteurs',[AdminController::class,'Producteurs']);  
                Route::post('donnerRfinal/{id}/{res}',[AdminController::class,'donnerRfinal']);        
                Route::post('donnerRtest',[AdminController::class,'donnerRtest']);
                Route::post('producersId',[AdminController::class,'producersId']);
                Route::post('reussite_echs',[AdminController::class,'reussite_echs']);
                Route::post('clientSatisfes',[AdminController::class,'clientSatisfes']);
                Route::get('consulterResTests/{id}',[AdminController::class,'consulterResTests']);
                Route::get('bonneCommande',[AdminController::class,'bonneCommande']);
                Route::get('bonneCommandeStatistiques',[AdminController::class,'bonneCommandeStatistiques']);
                Route::get('statistiquesFavorabilites',[AdminController::class,'statistiquesFavorabilites']);
                Route::get('producteurs',[AdminController::class,'producteurs']);
                Route::post('supprimerProducteurs/{id}',[AdminController::class,'supprimerProducteurs']);
                

});


Route::group(['middleware'=>['auth:admin'],'prefix'=>'admin', 'as'=>'admin.'],function(){
Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');
                // Route::post('add',function(){
                //     return response
                // })

                
});


