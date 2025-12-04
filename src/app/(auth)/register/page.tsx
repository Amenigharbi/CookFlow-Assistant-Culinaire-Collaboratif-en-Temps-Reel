'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Eye, EyeOff, User, ChefHat, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerSchema, type RegisterInput } from '../../../../lib/validators/auth'
import { supabase } from '../../../../lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Création du compte
      const { error: signUpError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) throw signUpError

      // Création du profil
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              username: data.email.split('@')[0],
              full_name: data.fullName,
            },
          ])

        if (profileError) throw profileError
      }

      setSuccess('Compte créé avec succès ! Vérifiez votre email pour confirmer votre compte.')
      
      // Redirection après 3 secondes
      setTimeout(() => {
        router.push('/login?registered=true')
      }, 3000)

    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message || 'Erreur lors de l\'inscription Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              CookFlow
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Commencez votre aventure culinaire</h2>
          <p className="text-gray-600 mt-2">Créez votre compte gratuitement</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Votre nom complet"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-full rounded-full ${password?.length >= 6 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  <span className="text-xs text-gray-500">6+ caractères</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-full rounded-full ${/[A-Z]/.test(password || '') ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  <span className="text-xs text-gray-500">1 majuscule</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-full rounded-full ${/[0-9]/.test(password || '') ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  <span className="text-xs text-gray-500">1 chiffre</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-emerald-800">Ce que vous obtenez gratuitement :</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-emerald-700">
                  <Check className="h-4 w-4" />
                  14 jours d&apos;essai premium
                </li>
                <li className="flex items-center gap-2 text-sm text-emerald-700">
                  <Check className="h-4 w-4" />
                  Jusqu&apos;à 5 collaborateurs
                </li>
                <li className="flex items-center gap-2 text-sm text-emerald-700">
                  <Check className="h-4 w-4" />
                  100 recettes sauvegardées
                </li>
                <li className="flex items-center gap-2 text-sm text-emerald-700">
                  <Check className="h-4 w-4" />
                  Support par email
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Création du compte...
                </span>
              ) : (
                'Créer mon compte gratuitement'
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Ou s&apos;inscrire avec</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              S&apos;inscrire avec Google
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link
                href="/login"
                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          En vous inscrivant, vous acceptez nos{' '}
          <Link href="/terms" className="text-emerald-600 hover:underline">
            Conditions d&apos;utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/privacy" className="text-emerald-600 hover:underline">
            Politique de confidentialité
          </Link>
        </p>
      </div>
    </div>
  )
}