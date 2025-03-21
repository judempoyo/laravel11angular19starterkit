<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Validation\ValidationException;
    use App\Models\User;


    use Illuminate\Support\Str;

    class AuthController extends Controller
    {
        public function register(Request $request)
        {
            try {
                $validatedData = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|unique:users,email',
                    'password' => 'required|string|min:8',
                ]);

                $user = User::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'password' => Hash::make($validatedData['password']),
                ]);

                return response()->json([
                    'message' => 'User registered successfully',
                    'user' => $user->only(['id', 'name', 'email'])
                ], 201);

            } catch (ValidationException $e) {
                return response()->json([
                    'message' => 'Erreur de validation',
                    'errors' => $e->errors()
                ], 422);
            } catch (\Exception $e) {
                Log::error('Registration error: ' . $e->getMessage());
                return response()->json([
                    'message' => 'Erreur interne du serveur lors de l\'inscription'
                ], 500);
            }
        }
        public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            // Recherche de l'utilisateur avec email insensible à la casse
            $user = User::where('email', $credentials['email'])->first();

            // Vérification du mot de passe et de l'existence de l'utilisateur
            if (!$user) {
                return response()->json([
                    'message' => 'Aucun utilisateur trouvé avec cet email.'
                ], 404);
            }

            if (!Hash::check($credentials['password'], $user->password)) {
                return response()->json([
                    'message' => 'Mot de passe incorrect.'
                ], 401);
            }

            // Création du token Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user->only(['id', 'name', 'email']),
                'token_type' => 'Bearer'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage() . "\n" . $e->getTraceAsString());
            return response()->json([
                'message' => 'Erreur interne du serveur',
                'error' => env('APP_DEBUG') ? $e->getMessage() : null
            ], 500);
        }
    }
    public function logout(Request $request)
    {
        try {
            // Nouvelle méthode recommandée pour Laravel 11
            $request->user()->tokens()->where('id', $request->user()->currentAccessToken()->id)->delete();
    
            return response()->json(['message' => 'Déconnexion réussie']);
    
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur de déconnexion'], 500);
        }
    }
    
    public function user(Request $request)
    {
        try {
            // Méthode plus explicite
            return response()->json([
                'user' => $request->user()->only(['id', 'name', 'email'])
            ]);
    
        } catch (\Exception $e) {
            Log::error('User fetch error: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur de récupération'], 500);
        }
    }
    /*  public function logout(Request $request)
        {
            try {
                $request->user()->currentAccessToken()->delete();
                return response()->json(['message' => 'Successfully logged out']);

            } catch (\Exception $e) {
                Log::error('Logout error: ' . $e->getMessage());
                return response()->json([
                    'message' => 'Internal server error during logout'
                ], 500);
            }
        }

        public function user(Request $request)
        {
            try {
                return response()->json($request->user()->only(['id', 'name', 'email']));

            } catch (\Exception $e) {
                Log::error('User fetch error: ' . $e->getMessage());
                return response()->json([
                    'message' => 'Internal server error fetching user data'
                ], 500);
            }
        } */


    }
