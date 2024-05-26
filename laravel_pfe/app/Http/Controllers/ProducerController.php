<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Produit;
use App\Models\Commande;
use App\Models\Producer;
use App\Models\Echantillon;
use Illuminate\Http\Request;
use App\Models\BonneCommande;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProducerController extends Controller
{
       
    public function ajouterProduit(Request $request){
        $produit=Produit::create([
        'titre'=>$request->titre,
        'quantite'=>$request->quantite,
        'description'=>$request->description,
        ]);
        if(!$produit){
            return response()->json([
                'message'=>'produit n est pas ajouté ',
            ]);
        }  
        return response()->json([
        'message'=>'produit ajouté',
        'data'=>$produit
        ]);
    }
    public function supprimerProduit($id){
        $produit=Produit::find($id);
        if(!$produit){
            return response()->json([
                'message'=>'produit n est pas trouvé',
            ]);  
        }
        $produit->delete();
        return response()->json([
        'message'=>'produit supprimé',
        'data'=>$produit
        ]);
    }
    public function modifierProduit(Request $request,$id){
        $product = Produit::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found.'], 404);
        }

        // Update only the provided fields
        if ($request->has('titre')) {
            $product->titre = $request->titre;
        }

        if ($request->has('description')) {
            $product->description = $request->description;
        }

        if ($request->has('quantite')) {
            $product->quantite = $request->quantite;
        }

        // Save the changes to the database
        $product->save();

        return response()->json(['message' => 'Product updated successfully.']);
    }

    public function consulterEchantillon($id){
    $echan = Echantillon::where('producteur_id',$id)->get();    
    if(!$echan){return response()->json(['message'=>'echantillon n est pas trouvé']);}
    return response()->json([
    'message'=>'ton echantillon',
    'echantillon'=>$echan,
    ]);    
    }
    public function contacterClient(Request $request){
        $message=Message::create([
            'message'=>$request->message,
            'user_id'=>$request->user_id,
            'producteur_id'=>$request->producteur_id
        ]);
        return response()->json([
            'message'=>$message
        ]);
    }
    public function Produits(){
        $produits=Produit::all();
        return response()->json([
            'produits'=>$produits
        ]);
    }
    public function Produit($id){
        $produit=Produit::where('producteur_id',$id)->get();
        return response()->json([
            'produit'=>$produit
        ]);
    }
    public function getEchantillons($id){
        $ech=Echantillon::where('producteur_id',$id)->get();
        if($ech){
            return response()->json([
                'ech'=>$ech
            ]);
        }else{
            return response()->json([
                'message'=>'ce producteur n est pas d ecantillons'
            ]);
        }
    }
    public function getProducts($id){
        $echs = DB::table('echantillons as e')
                ->join('produits as p', 'p.echantillon_id', '=', 'e.id')
                ->where('e.producteur_id', $id)
                ->select('e.*', 'p.*')
                ->get();
        if($echs){
        return response()->json([
            'echs'=>$echs
        ]);
        }else{
        return response()->json([
            'message'=>'pas de produits autorisés pour ce producteur',
        ]);
        }
    }
    public function définirQuantité(Request $request,$id){
         $p=Produit::find($id);
         $p->quantité=$request->quantité;
         $p->prix=$request->prix;
         $p->save();
         return response()->json([
            'message'=>'produit modifié'
         ]);
    }
    public function getCommandes($id){
        $commandes = Commande::select('e.nom as nom_produit','e.id as clientId','u.id as clientId','commandes.bonne_commande', 'commandes.confirmation_admin as confirmation_admin', 'commandes.id as reference', 'l_c.quantite as quantite', 'l_c.prix_total as prix_total', 'u.name as nom_client', 'commandes.com_recu', 'commandes.created_at as date_commande')
        ->join('ligne__commandes as l_c', 'commandes.id', '=', 'l_c.commande_id')
        ->join('produits as p', 'p.id', '=', 'commandes.produit_id')
        ->join('echantillons as e', 'e.id', '=', 'p.echantillon_id')
        ->join('users as u', 'u.id', '=', 'commandes.user_id')
        ->join('producers as pr', 'pr.id', '=', 'e.producteur_id')
        ->where('commandes.producteur_id',$id)
        ->get();
        if($commandes){
            return response()->json([
                'commandes'=>$commandes
            ]);
        }else{
            return response()->json([
                'message'=>'erreur'
            ]);
        }
    }
    public function confirmerReception($id){
    $c=Commande::find($id);
    $c->confirmation_admin=1;
    $c->save();
    return response()->json([
     'message'=>'commande bien recu par le producteur '
    ]);
    }
    public function bonneCommande($id){
        $p=Commande::find($id);
        $p->bonne_commande=1;
        $p->save();
        if($p){
          return response()->json([
            'message'=>'bonne commande enregistrée'
          ]);
        }else{
            return response()->json([
                'message'=>'bonne commande n est pas enregistrée'
              ]);
        }
    }
    public function staticticsByMonth($id,Request $request){
        DB::statement("SET lc_time_names = 'fr_FR'");
        if($id == 'm'){
        $ordersByMonth = DB::table('commandes')
                ->select(DB::raw("DATE_FORMAT(ANY_VALUE(created_at), '%Y-%m') as month_name"), DB::raw('COUNT(*) as `total des commandes`'))
                ->whereYear('created_at', $request->year)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->orderBy(DB::raw('MONTH(created_at)'))
                ->get();
        }elseif($id == 'y'){
        $ordersByMonth = DB::table('commandes')
            ->select(DB::raw("DATE_FORMAT(ANY_VALUE(created_at), '%Y') as year_name"), DB::raw('COUNT(*) as `total des commandes`'))
            ->groupBy(DB::raw('Year(created_at)'))
            ->orderBy(DB::raw('Year(created_at)'))
            ->get();
        }
       
        return response()->json([
          'result'=>$ordersByMonth
        ]);
    }
    public function staticticsEchantillons($id){
        $fav=Echantillon::where('res_final',1)->where('producteur_id',$id)->count();
        $defav=Echantillon::where('res_final',9)->where('producteur_id',$id)->count();
        $encours=Echantillon::where('res_final',0)->where('producteur_id',$id)->count();
        return response()->json([
            'fav'=>$fav,
            'defav'=>$defav,
            'encours'=>$encours
        ]);
    }
    public function register(Request $request){
        $rules = [
            'name'=>'required',
            'email' => 'required',
            'password' => 'required',
            'ville'=>'required',
            'naissance'=>'required'
        ];

        $validator = Validator::make($request->all(), $rules);
         if ($validator->fails()) {
            $errorObjects = [];
            foreach ($validator->errors()->toArray() as $field => $errors) {
                $errorObjects[] = ['message' => $errors[0]];
            }
            return response()->json(['errors' => $errorObjects]);
        }

        $producer = Producer::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'ville' => $request->ville,
            'naissance' => $request->naissance
        ]);
        return response()->json([
        'message'=>'authenticated',
        'message2'=>'registereddd',
        'status'=>201,
        'producer'=>$producer
       ]);
       
        
    }
    public function login(Request $request){

        $rules = [
            'email' => 'required',
            'password' => 'required',
        ];
        $messages = [
            'email.required' => 'Le champs email est requis ',
            'password.required' => 'Le champs mot de passe est requis',
        ];

        $validator = Validator::make($request->all(), $rules,$messages);

        if ($validator->fails()) {
            $errorObjects = [];
            foreach ($validator->errors()->toArray() as $field => $errors) {
                $errorObjects[] = ['message' => $errors[0]];
            }
            return response()->json(['errors' => $errorObjects]);
        }

        $result = Producer::where('email',$request->email)
        ->where('password',$request->password)->get();
        if(!$result->isEmpty()){
           return response()->json([
               'message'=>'authenticated',
               'data'=>$result
           ]);
        }else{
           return response()->json([
               'message'=>'not authenticated',
               'data'=>$request
           ]);
        }
    }
    public function détailsTests( $id,$id2){
        $data = Test::join('res_tests', 'tests.id', '=', 'res_tests.test_id')
            ->join('echantillons', 'res_tests.echantillon_id', '=', 'echantillons.id')
            ->where('echantillons.producteur_id', $id)
            ->where('echantillons.id', $id2 )
            ->get(['tests.description', 'res_tests.res_test', 'echantillons.nom','tests.nom as nomTest']);
            return response()->json([
                'data'=>$data
            ]);


    }
    public function messageClient($id,$message){
        $p=Commande::find($id);
        $p->message=$message;
        $p->date_information=NOW();
        $p->save();
        return response()->json([
            'message'=>'message envoye'
        ]);
        }

        public function périodeProduit($id, Request $request){
            $result = Echantillon::join('produits as p', 'echantillons.id', '=', 'p.echantillon_id')
            ->where('p.id', $id)
            ->select('echantillons.*')
            ->first();

            if (!$result) {
                return response()->json(['error' => 'Produit not found'], 404);
            }

            $result->date_production = $request->date_production;
            $result->date_expiration = $request->date_expiration;
            $result->save();

            return response()->json([
                'result' => 'Success',
                'data' => $result
            ]);

        }
        public function years(){
            $years = DB::table('commandes')
    ->select(DB::raw('DISTINCT YEAR(created_at) as year'))
    ->orderBy('year', 'asc')
    ->pluck('year');
    return response()->json([
        'years'=>$years
    ]);
        }

}
