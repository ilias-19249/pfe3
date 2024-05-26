<?php

namespace App\Models;

use App\Models\Test;
use App\Models\Producer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Echantillon extends Model
{
    use HasFactory;
    protected $fillable=([
        'nom','date_prelevement','producteur_id','res_final','date_reception','date_production',
        'date_expiration','category','origine','image','ingrédients','stockage'
    ]);
    public function tests(){
        return $this->hasMany(Test::class);
    }



    public function producer()
    {
        return $this->hasOne(Producer::class, 'id', 'producteur_id');
    }


    
}
