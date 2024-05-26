<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Test;
use App\Models\User;
use App\Models\Admin;
use App\Models\echSta;
use App\Models\Message;
use App\Models\Produit;
use App\Models\Commande;
use App\Models\Producer;
use App\Models\res_test;
use App\Models\Laboratory;
use App\Models\Echantillon;
use App\Models\messageAdmin;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\BonneCommande;
use App\Models\messagerie_admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function chatter(Request $request){
        $message=messageAdmin::create([
        'message'=>$request->message,
        'date'=>now()
        ]);
        if(!$message){
            return response()->json(['message'=>'message n est envoyé ']);
        }
        return response()->json([
        'message'=>'message envoyé',
        'data'=>$message
        ]);
    }
    public function supprimerProducteurs($id){
     $p=Producer::find($id)->delete();
     return response()->json([
        'message'=>'producer deleted'
     ]);
    }
    public function Echantillons(){
        //  $echans=Echantillon::with('producer')->get();
        $echans = DB::table('echantillons as e')
    ->select('e.id', 'e.nom','e.res_final', 'e.date_prelevement', 'p.name')
    ->join('producers as p', 'e.producteur_id', '=', 'p.id')
    ->get();
        if($echans){
            return response()->json([
            'echans'=>$echans
            ]);
        }else{
            return response()->json([
            'message'=>'probleme de selection des echantillons'
            ]);
        }
    }
    public function AjouterTest(Request $request){
        $test=Test::create([
            'nom'=>$request->nom,
            'description'=>$request->description
        ]);
        return response()->json([
            'message'=>'test ajouté',
            'test'=>$test
        ]);
    }
    public function AfficherTests(){
        $tests=Test::all();
        if($tests){
            return response()->json([
        'tests'=>$tests,
        'message'=>'tests retrieved successefully'
            ]);
         
        }else{
            return response()->json([
             'message'=>'no tests found'
            ]);
        }
    }
    public function notifier(Request $request,$id){
        $notification=Notification::create([
            'notification'=>$request->notification,
            'admin_id'=>$request->user_id,
            'producteur_id'=>$id
        ]);
        return response()->json([
         'message'=>'notification bien recue',
         'data'=>$notification
        ]);
    }
    public function ajouterEchantillon(Request $request){
        // $path=$request->file('image')->store('storage');
        $echantillon=Echantillon::create([
        'nom'=>$request->nom,
        'date_reception'=>$request->date_reception,
        'date_production'=>$request->date_production,
        'date_expiration'=>$request->date_expiration,
        'category'=>$request->category,
        'origine'=>$request->origine,
        'image'=>$request->image,
        // 'image'=>$path,
        'date_prelevement'=>now(),
        'ingrédients'=>$request->ingrédients,
        'stockage'=>$request->stockage,
        'producteur_id'=>$request->producteur_id,
        'res_final'=>9
        ]);
        return response()->json([
            'data'=>$echantillon
        ]);
    }
    public function Producteurs(){
        $producteurs=Producer::all();
        return response()->json([
            'producteurs'=>$producteurs
        ]);
    }
    public function Echantillon($id){
        $ech=Echantillon::find($id);
        if($ech){
             return response()->json([
            'data'=>$ech
             ]);
        }else{
            return response()->json([
                'message'=>'echantillon n est pas trouvé' 
            ]);
        }
    }
    public function donnerRfinal($id,$res){
        $echana=Echantillon::find($id);
        if(!$echana){return response()->json(['message'=>'echnatillon n est pas trouvé ']);}
        $echana->update([
        'res_final'=>$res
        ]);
        // $produit==null;
        if($res == 1){
            $produit=Produit::create([
            'titre'=>$echana->nom,
            'quantite'=>0,
            'description'=>'lll',
           'producteur_id'=>$echana->producteur_id,
            ]);
        }
        return response()->json([
            'etat'=>'true',
            'new data ech'=>$echana,
            'produit'=>$produit,
        ]);
    }
    public function donnerRtest(Request $request){
        $search=res_test::where('test_id',$request->test_id)
        ->where('echantillon_id',$request->echantillon_id)
        ->where('res_test',$request->res)->first();
        if(!$search){
        $res_test=res_test::create([
            'test_id'=>$request->test_id,
            'echantillon_id'=>$request->echantillon_id,
            'res_test'=>$request->res
            ]);
        }else{
            return response()->json([
                'message'=>'the data for this test-prod is already exist',
                'status'=>400
            ]);
        }
        if(!$res_test){
            return response()->json(['message'=>'not inserted']);
        }
        $count_tests=Test::all()->count();
        $count_ech=res_test::where('echantillon_id',$request->echantillon_id)->where('res_test',1)->count();
        // $count_ech2=res_test::where('echantillon_id',$request->echantillon_id)->count();
        // if($count_ech2 < $count_tests){
              if($count_ech === $count_tests){
                $p = Produit::create([
                    'echantillon_id' => $request->echantillon_id,
                    'quantité' => 0,
                    'prix'=>0
                ]);
                // Check if insertion was successful
                if ($p) {
                    // Update res_final only if Produit insertion was successful
                    $res_global = Echantillon::find($request->echantillon_id)->update([
                        'res_final' => 1
                    ]);
        }
    }
       
        return response()->json([
        'res_test'=>'inserted',
        'data'=>$res_test,
        ]);
    }
    public function producersId(){
        $ids=Producer::all();
        if($ids){
            return response()->json([
            'ids'=>$ids
            ]); 
        }else{
            return response()->json([
            'message'=>'no producers found'
            ]);
        }
    }
    public function reussite_echs(){
        $fav=Echantillon::where('res_final',1)->get();
        $defav=Echantillon::where('res_final',9)->get();
        if($fav && $defav){
             return response()->json([
                'fav'=>$fav,
                'defav'=>$defav
             ]);
        }else{
            return response->json([
            'message'=>'un probleme est survenu lors de l extraction des données '
            ]);
        }
    }
    public function clientSatisfes(){
        $sat=echSta::where('res',1)->get();
        $desat=echSta::where('res',0)->get();
        if($sat && $desat){
            return response()->json([
            'sat'=>$sat,
            'desat'=>$desat
            ]);
        }else{
            return response()->json([
           'message'=>'un probleme est survenu lors de l extraction des données'
            ]);
        }
    }
    public function consulterResTests($id){
        $results = res_test::select('echantillons.nom as ech_nom', 'tests.nom as test_nom', 'res_tests.res_test')
    ->join('echantillons', 'res_tests.echantillon_id', '=', 'echantillons.id')
    ->join('tests', 'res_tests.test_id', '=', 'tests.id')
    ->where('res_tests.echantillon_id', $id)
    ->get();
    if($results){
         return response()->json([
        'tests'=>$results,
    ]);
    }else{
        response()->json([
            'message'=>'res_tests est vide',
        ]);
    }
        }
    public function bonneCommande(){
        $commandes = Commande::select('pr.name as nom_producteur', 'u.name as nom_client', 'commandes.id as reference', 'commandes.bonne_commande', 'commandes.created_at')
    ->join('produits as p', 'commandes.produit_id', '=', 'p.id')
    ->join('echantillons as e', 'p.echantillon_id', '=', 'e.id')
    ->join('users as u', 'commandes.user_id', '=', 'u.id')
    ->join('producers as pr', 'commandes.producteur_id', '=', 'pr.id')
    ->get();
    
    $commandes->each(function ($commande) {
        $commande->created_at = Carbon::parse($commande->created_at)->format('Y-m-d H:i:s');
    });
    
    return response()->json([
        'result'=>$commandes
    ]);
    }
    public function bonneCommandeStatistiques(){
        $bonnes=Commande::where('bonne_commande',1)->get();
        $mauvaises=Commande::where('bonne_commande',9)->get();
        $encours=Commande::where('bonne_commande',0)->get();
        return response()->json([
        'bonnes'=>$bonnes,
        'mauvaises'=>$mauvaises,
        'encours'=>$encours
        ]);
    }
    
    public  function statistiquesFavorabilites(){
        $results = Producer::leftJoin('echantillons as e', 'producers.id', '=', 'e.producteur_id')
                    ->selectRaw('producers.id AS producteur_id, producers.name AS producteur_name, 
                                SUM(CASE WHEN e.res_final = 0 THEN 1 ELSE 0 END) AS encours,
                                SUM(CASE WHEN e.res_final = 1 THEN 1 ELSE 0 END) AS fav,
                                SUM(CASE WHEN e.res_final = 9 THEN 1 ELSE 0 END) AS defav')
                    ->groupBy('producers.id', 'producers.name')
                    ->get();
    return response()->json([
        'result'=>$results
    ]);

    }
    public function store(Request $request){
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
         $result = Laboratory::where('email',$request->email)
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
    public function register(Request $request){
        $rules = [
            'name'=>'required',
            'email' => 'required',
            'password' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
         if ($validator->fails()) {
            $errorObjects = [];
            foreach ($validator->errors()->toArray() as $field => $errors) {
                $errorObjects[] = ['message' => $errors[0]];
            }
            return response()->json(['errors' => $errorObjects]);
        }
        $admin=Laboratory::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>$request->password
        ]);
        return response()->json([
            'message'=>'authenticated',
            'data'=>$admin,
            'status'=>201
        ]);
    }
   
   
}
