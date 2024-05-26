<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $fillable=([
        'user_id',
        'produit_id',
        'date',
        'producteur_id',
        'com_recu',
        'bonne_commande',
        'message',
        'date_information'
    ]);
    public function produit()
    {
        return $this->belongsTo(produit::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function ligne_commande(){
        return $this->hasOne(Ligne_Commande::class);
    }
}
