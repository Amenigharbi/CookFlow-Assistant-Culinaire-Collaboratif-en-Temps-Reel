'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Eye, EyeOff, ChefHat, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginInput } from '../../../../lib/validators/auth'
import { supabase } from '../../../../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      setSuccess('Connexion réussie ! Redirection...')
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 1000)
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect.')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Veuillez confirmer votre email avant de vous connecter.')
      } else {
        setError(error.message || 'Une erreur est survenue')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-100 to-teal-100 rounded-full border border-emerald-200">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">
              Reconnectez-vous à votre aventure culinaire
            </span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  CookFlow
                </h1>
                <p className="text-sm text-gray-500 mt-1">La cuisine réinventée</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Content de vous revoir !</h2>
            <p className="text-gray-600 mt-2">Reconnectez-vous à votre compte</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-linear-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl animate-fade-in">
              <p className="text-red-700 font-medium text-center">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  Adresse email
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-gray-900 transition-colors" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-12 w-full p-4 bg-white border-2 border-gray-800 text-gray-900 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all placeholder:text-gray-500 hover:border-gray-900"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 animate-shake">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-900">
                  <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-600" />
                    Mot de passe
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-700 hover:text-black font-medium transition-colors hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-gray-900 transition-colors" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-12 pr-12 w-full p-4 bg-white border-2 border-gray-800 text-gray-900 rounded-xl focus:ring-2 focus:ring-black focus:border-black transition-all placeholder:text-gray-500 hover:border-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl px-3 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-600 hover:text-gray-900 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 animate-shake">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full py-4 px-4 bg-linear-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-gray-400/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {loading ? (
                <span className="flex items-center justify-center gap-3 relative">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="animate-pulse">Connexion en cours...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative">
                  <span>Se connecter</span>
                  <div className="h-5 w-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </span>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-700 mb-4">
              Pas encore de compte ? Découvrez l&apos;aventure CookFlow
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] transition-all"
            >
              <span>S&apos;inscrire gratuitement</span>
              <div className="h-5 w-5 bg-white/20 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            En vous connectant, vous acceptez nos{' '}
            <Link href="/terms" className="text-gray-700 hover:text-black font-medium hover:underline">
              Conditions d&apos;utilisation
            </Link>{' '}
            et notre{' '}
            <Link href="/privacy" className="text-gray-700 hover:text-black font-medium hover:underline">
              Politique de confidentialité
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-3">
            © 2025 CookFlow. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}