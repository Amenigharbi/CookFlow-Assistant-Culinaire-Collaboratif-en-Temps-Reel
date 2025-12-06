'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { ChefHat, LogOut, User, Settings, Bell } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          router.push('/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50">
      <header className="bg-white border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-r from-emerald-500 to-teal-500 rounded-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">CookFlow Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
              
              {user && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue sur CookFlow {user?.user_metadata?.full_name || 'Chef'} ! 👨‍🍳
          </h2>
          <p className="text-gray-600">
            Prêt à révolutionner votre expérience culinaire ? Voici votre espace personnel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
            <div className="text-emerald-600 mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mes recettes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Créez, organisez et suivez vos recettes préférées.
            </p>
            <Link
              href="/recipes"
              className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100"
            >
              Voir mes recettes →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
            <div className="text-emerald-600 mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Liste de courses</h3>
            <p className="text-gray-600 text-sm mb-4">
              Générez automatiquement vos listes de courses depuis vos recettes.
            </p>
            <Link
              href="/shopping-list"
              className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100"
            >
              Créer une liste →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
            <div className="text-emerald-600 mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuisine collaborative</h3>
            <p className="text-gray-600 text-sm mb-4">
              Invitez des amis à cuisiner avec vous en temps réel.
            </p>
            <Link
              href="/collaborate"
              className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100"
            >
              Inviter des amis →
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Dernières activités</h3>
          <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6">
            <p className="text-gray-600 text-center py-8">
              Bienvenue sur CookFlow ! Commencez par créer votre première recette.
            </p>
            <div className="flex justify-center">
              <Link
                href="/recipes/new"
                className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-200"
              >
                Créer ma première recette
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-emerald-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2024 CookFlow. Tous droits réservés.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-emerald-600">Confidentialité</Link>
            {' · '}
            <Link href="/terms" className="hover:text-emerald-600">Conditions</Link>
            {' · '}
            <Link href="/help" className="hover:text-emerald-600">Aide</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}