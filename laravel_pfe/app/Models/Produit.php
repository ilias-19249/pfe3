<?php

namespace App\Models;

use App\Models\Panneau;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produit extends Model
{
    use HasFactory;
    protected $fillable=([
    'echantillon_id','quantité','prix'
    ]);
    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }
    public function panneau()
    {
        return $this->belongsTo(Panneau::class);
    }
    

}
