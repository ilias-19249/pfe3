<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ligne_Commande extends Model
{
    use HasFactory;
    protected $fillable=([
     'commande_id','quantite','prix_total'
    ]);
    public function commande(){
        return $this->belongsTo(Commande::class);
    }
}
