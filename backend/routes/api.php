<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

// Routes publiques
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Route d'accueil
Route::get('/', function () {
    return response()->json([
        'message' => 'Bienvenue sur l\'API Laravel!',
        'status' => 'success'
    ]);
});

  // Routes pour les posts
  Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index']); // Lister tous les posts
    Route::post('/', [PostController::class, 'store']); // Créer un nouveau post
    Route::get('/{id}', [PostController::class, 'show']); // Afficher un post spécifique
    Route::put('/{id}', [PostController::class, 'update']); // Mettre à jour un post
    Route::delete('/{id}', [PostController::class, 'destroy']); // Supprimer un post
});


// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
  
    // Routes pour l'authentification
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });

    // Exemple de route protégée
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Accès autorisé']);
    });
});