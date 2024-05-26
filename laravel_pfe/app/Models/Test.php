<?php

namespace App\Models;

use App\Models\Echantillon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Test extends Model
{
    use HasFactory;
    protected $fillable=([
'nom','description'
    ]);
    public function echantillons(){
        return $this->hasMany(Echantillon::class);
    }
}
