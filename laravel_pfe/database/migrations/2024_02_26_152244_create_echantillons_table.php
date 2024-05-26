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
        Schema::create('echantillons', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->timestamp('date_prelevement');
            $table->integer('res_final')->default(9);
            $table->unsignedBigInteger('producteur_id');
            $table->date('date_reception')->nullable();
            $table->string('ingrédients')->nullable();
            $table->string('stockage')->nullable();
            $table->dateTime ('date_production')->nullable();
            $table->dateTime ('date_expiration')->nullable();
            $table->string('category')->nullable();
            $table->longText('image')->nullable();
            $table->string('origine')->nullable();
            $table->foreign('producteur_id')->references('id')->on('producers');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('echantillons');
    }
};
