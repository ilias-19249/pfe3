<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class res_test extends Model
{
    use HasFactory;
    protected $fillable=([
        'test_id','echantillon_id','res_test'
    ]);
}
