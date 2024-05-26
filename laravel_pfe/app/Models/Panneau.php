<?php

namespace App\Models;

use App\Models\Produit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Panneau extends Model
{
    use HasFactory;
    protected $fillable=([
        'user_id','produit_id'
    ]);
    public function produits()
    {
        return $this->hasMany(Produit::class);
    }
}
