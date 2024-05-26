<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     // return ['Laravel' => app()->version()];
//     // return response()->json([
//     //     'message'=>'hhhh',
//     // ]);
// });

require __DIR__.'/auth.php';
require __DIR__.'/adminauth.php';
require __DIR__.'/producerauth.php';
// Route::get('/generate-pdf', 'PdfController@generatePdf');

