<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonneCommande extends Model
{
    use HasFactory;
    protected $fillable=['commande_id'];

}
