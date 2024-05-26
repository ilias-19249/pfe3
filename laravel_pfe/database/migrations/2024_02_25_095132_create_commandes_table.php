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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('produit_id');
            $table->unsignedBigInteger('producteur_id')->nullable();
            $table->timestamp('date');
            $table->timestamp('date_information')->nullable();
            $table->string('message');
            $table->boolean('com_recu');
            $table->integer('bonne_commande')->default(0);
            $table->boolean('confirmation_admin')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('produit_id')->references('id')->on('produits');
            $table->foreign('producteur_id')->references('id')->on('producteurs');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
