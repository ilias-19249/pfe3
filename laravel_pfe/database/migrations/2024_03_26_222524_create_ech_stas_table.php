<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ech_stas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produit_id');
            $table->boolean('res')->default(0);
            $table->foreign('produit_id')->references('id')->on('produits');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ech_stas');
    }
};
