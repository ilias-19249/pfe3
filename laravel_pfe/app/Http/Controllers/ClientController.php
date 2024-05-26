<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Message;
use App\Models\Panneau;
use App\Models\Produit;
use App\Models\Commande;
use App\Models\Commentaire;
use App\Models\Echantillon;
use Illuminate\Http\Request;
use App\Models\Ligne_Commande;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function commenter(Request $request){
        
        $commentaire=Commentaire::create([
        'commentaire'=>$request->commentaire,
        'user_id'=>$request->user_id
        ]);
        return response()->json([
        'message'=>'inserted',
        'data'=>$commentaire
        ]);

    }
    public function commander(Request $request,$id){
       $commande=Commande::create([
          'user_id'=>$id,
          'produit_id'=>$request->produit_id,
          'com_recu'=>false,
          'confirmation_admin'=>false,
          'date'=>now(),
          'message'=>'pas encore',
          'producteur_id'=>$request->producteur_id
       ]);  
       $commandeId = $commande->id;
       $l_commande = Ligne_Commande::create([
          'commande_id'=>$commandeId,
          'quantite'=>$request->quantite,
          'prix_total'=>$request->prix_total
       ]);
       return response()->json([
        'message'=>'comm et l_comm sont passées avec succes',
        'comm'=>$commande,
        'l_comm'=>$l_commande
       ]);
    }
    public function afficherCommandes($id){
        $commandes = Commande::select('e.nom as nom_produit','commandes.message as message','commandes.confirmation_admin', 'commandes.confirmation_admin as confirmation_admin', 'commandes.id as reference', 'l_c.quantite as quantite', 'l_c.prix_total as prix_total', 'u.name as nom_client', 'commandes.com_recu', 'commandes.created_at as date_commande')
        ->join('ligne__commandes as l_c', 'commandes.id', '=', 'l_c.commande_id')
        ->join('produits as p', 'p.id', '=', 'commandes.produit_id')
        ->join('echantillons as e', 'e.id', '=', 'p.echantillon_id')
        ->join('users as u', 'u.id', '=', 'commandes.user_id')
        ->join('producers as pr', 'pr.id', '=', 'e.producteur_id')
        ->where('commandes.user_id',$id)
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
    public function afficherPanier($id){
        //    $ids=Panneau::where('user_id',$id)->distinct()->pluck('produit_id');
        //    $products=Produit::whereIn('id',$ids)->get();
        //    $res=Echantillon::whereIn('id',$products->echantillon_id)->get();
        $panierItems = Panneau::where('user_id', $id)->get();
        // return response()->json([
        //     'm'=>$panierItems[2]['produit_id']
        // ]);
        $echantillons = [];
    
    foreach ($panierItems as $panierItem){
        $echantillons [] = DB::table('produits')
                        ->join('echantillons', 'produits.echantillon_id', '=', 'echantillons.id')
                        ->where('produits.id', $panierItem['produit_id'])
                        ->select('echantillons.*','produits.id as pid')
                        ->get();
    }
        return response()->json([
           'status'=>200,
           'products'=>$echantillons
           ]);
    }
    public function ajouterPanier(Request $request, $id){
        $panier=Panneau::create([
            'produit_id'=>$id,
            'user_id'=>$request->user_id,
        ]);
        if($panier){
              return response()->json([
            'status'=>201,
            'produit ajoué au panier '=>$panier
        ]);
        }else{
            return response()->json([
                'message'=>'a problem is happened'
            ]);
        }
      
    }
    public function supprimerPanier(Request $request, $id){
        $panier=Panneau::where('user_id',$request->user_id)->where('produit_id',$id)->delete();
        if($panier){
              return response()->json([
            'status'=>201,
            'produit supprimé du panier '=>$panier
        ]);
        }else{
            return response()->json([
                'message'=>'a problem is happened'
            ]);
        }
      
    }
    public function afficherProduits(){
        $produits=DB::table('produits')
        ->join('echantillons', 'produits.echantillon_id', '=', 'echantillons.id')
        ->join('producers','producers.id','=','echantillons.producteur_id')
        ->select('produits.quantité','produits.prix', 'echantillons.*','produits.id as produitId','producers.name')
        ->get();
        return response()->json([
        'produits'=>$produits
        ]);
    }
    public function afficherProduit($id){
        $produit=DB::table('produits as p')
        ->join('echantillons as e','p.echantillon_id','=','e.id')
        ->join('producers','producers.id','=','e.producteur_id')
        ->where('p.id',$id)
        ->select('p.id as reference','p.quantité as pQte','p.prix as price','e.*','producers.name')
        ->get();
        return response()->json([
        'produits'=>$produit
        ]);
    }
    public function contacterProducteur(Request $request){
        $message=Message::create([
        'message'=>$request->message,
        'user_id'=>$request->user_id,
        'producteur_id'=>$request->producteur_id
        ]);
        return response()->json([
            'message'=>'message envoyé',
            'contenu'=>$message
        ]);
    }
    public function afficherLigneCommande($id){
        $l_commande=Ligne_Commande::where('commande_id',$id)->first();
        if($l_commande){
            return response()->json([
            'data'=>$l_commande
            ]);
        }else{
         return response()->json([
            'message'=>'erreur'
         ]);
        }
    }
    public function facturation($id){
        $result = DB::table('commandes AS c')
        ->join('ligne__commandes AS lc', 'c.id', '=', 'lc.commande_id')
        ->join('produits AS p', 'c.produit_id', '=', 'p.id')
        ->join('echantillons as e','e.id','p.echantillon_id')
        ->join('producers','producers.id','=','c.producteur_id')
        ->where('c.id', $id)
        ->select('c.id AS commande_id', 'e.nom as nom', 'lc.quantite as commandeQte', 'lc.prix_total as commandePrix','producers.name','producers.email')
        ->get();
        if($result){
         return response()->json([
         'result'=>$result
         ]);
        }else{

        }
        
    }
    
    public function infosUser($id){
    $user=User::find($id);

    return response()->json([
        'infos'=>$user
    ]);
    
    }
    public function confirmerReception($id){
        $p=Commande::find($id);
        $p->com_recu=1;
        $p->save();
        return response()->json([
            'message'=>'recu',
        ]);
    }
    public function messages($id,Request $request){
        $last_seen=User::where('id',$id)->pluck('last_seen'); 
        $endDate = Carbon::now()->addHours(1)->format('Y-m-d H:i:s');
        $count = Commande::whereBetween('date_information', [$last_seen[0], $endDate])->where('user_id',$id)->count();
        return response()->json([
        'nbr_messages'=>$count
        ]);
    }
    public function last_seen($id){
        $user=User::find($id);
        $user->last_seen=now();
        $user->save();
        return response()->json([
            'message'=>'enregistré'
        ]);

    }
    public function getMessages($id){
        $last_seen=User::where('id',$id)->pluck('last_seen'); 
        $lus = Commande::where('user_id', $id)
                ->where('date_information', '<', $last_seen)
                ->get('message');
        $non_lus = Commande::where('id', $id)
                ->where('date_information', '>', $last_seen)
                ->get('message');

        // $lus=Commande::where('date_information','>',$last_seen)->get('message');

        return response()->json([
            'lus'=>$lus,
            'non_lus'=>$non_lus
        ]);
    }
    public function login(Request $request){
        $customMessages = [
            'email.required' => 'L\'adresse e-mail est requise.',
            'password.required' => 'Le mot de passe est requis.',
        ];
         
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ],$customMessages);
        

        // If validation fails, return error response
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['errors' => $errors],400);
        }
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken('auth-token')->plainTextToken;
            $user=User::where('email',$request->email)->get();
            return response()->json(['token' => $token,
                'user'=>$user,'status'=>200
                ]);
        }
    
        return response()->json(['message' => 'les informations sont incorrectes']);

    }
    public function generatePdf()
    {
        $pdf = PDF::loadView('pdf.invoice');
        return $pdf->download('invoice.pdf');
    }
}
