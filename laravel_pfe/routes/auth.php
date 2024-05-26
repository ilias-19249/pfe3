<?php

use App\Models\Producer;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::post('/register', [RegisteredUserController::class, 'store'])
                // ->middleware('guest')
                ->name('register');



Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest')
                ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                // ->middleware('auth')
                ->name('logout');
Route::post('/commenter',[ClientController::class,'commenter'])
                ->name('commenter');
                Route::post('/commander/{id}',[ClientController::class,'commander'])
                ->name('commander');
                Route::post('/ajouterPanier/{id}',[ClientController::class,'ajouterPanier'])
                ->name('ajouterPanier');
                Route::post('/supprimerPanier/{id}',[ClientController::class,'supprimerPanier'])
                ->name('supprimerPanier');
                Route::post('/afficherCommandes/{id}',[ClientController::class,'afficherCommandes'])
                ->name('afficherCommandes');
                Route::post('/afficherLigneCommande/{id}',[ClientController::class,'afficherLigneCommande'])
                ->name('afficherLigneCommande');
                Route::post('afficherPanier/{id}',[ClientController::class,'afficherPanier']);
                Route::post('/afficherProduits',[ClientController::class,'afficherProduits'])
                ->name('afficherProduits');
                Route::post('/afficherProduit/{id}',[ClientController::class,'afficherProduit'])
                ->name('afficherProduit');
                Route::post('/confirmerReception/{id}',[ClientController::class,'confirmerReception'])
                ->name('confirmerReception');
                Route::post('contacterProducteur',[ClientController::class,'contacterProducteur'])
                ->name('contacterProducteur');
                Route::post('infosUser/{id}',[ClientController::class,'infosUser']);
                Route::post('facturation/{id}',[ClientController::class,'facturation']);
                Route::post('getCommandes/{id}',[ClientController::class,'getCommandes']);
                Route::post('confirmerReception/{id}',[ClientController::class,'confirmerReception']);
                // Route::get('products',[ProductController::class,'products']);
                Route::get('messages/{id}',[ClientController::class,'messages']);
                Route::get('getMessages/{id}',[ClientController::class,'getMessages']);
                Route::post('last_seen/{id}',[ClientController::class,'last_seen']);
                Route::post('/login', [ClientController::class, 'login']);
                Route::get('/generate-pdf', [ClientController::class, 'generatePdf']);

                
