import Link from 'next/link'
import { ChefHat, Users, Clock, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-amber-50">
      <header className="sticky top-0 z-50 p-6 backdrop-blur-md bg-white/80 border-b border-emerald-100">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-r from-emerald-500 to-teal-500 rounded-lg">
              <ChefHat className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              CookFlow
            </h1>
          </div>
          
          <div className="flex gap-4 items-center">
            <Link 
              href="/features" 
              className="hidden md:inline px-4 py-2 text-emerald-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link 
              href="/pricing" 
              className="hidden md:inline px-4 py-2 text-emerald-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Tarifs
            </Link>
            <Link 
              href="/login" 
              className="px-5 py-2.5 text-emerald-700 hover:bg-emerald-50 rounded-full font-medium transition-all hover:scale-105"
            >
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all hover:scale-105"
            >
              Essai gratuit
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700">
                  Nouveau • 14 jours d&apos;essai gratuit
                </span>
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Cuisinez ensemble,
                <span className="block bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  où que vous soyez
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Transformez votre cuisine en expérience collaborative. Planifiez, cuisinez et partagez 
                des moments culinaires uniques avec vos proches.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Link 
                href="/register" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-lg font-semibold shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300 transition-all duration-300 hover:scale-105"
              >
                Commencer gratuitement
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                href="/demo" 
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-2xl text-lg font-semibold border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Voir la démo en direct
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-50">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10k+</div>
                <div className="text-gray-600">Recettes partagées</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-50">
                <div className="text-3xl font-bold text-emerald-600 mb-2">95%</div>
                <div className="text-gray-600">De réussite en cuisine</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-50">
                <div className="text-3xl font-bold text-emerald-600 mb-2">50%</div>
                <div className="text-gray-600">Moins de gaspillage</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-50">
                <div className="text-3xl font-bold text-emerald-600 mb-2">4.8★</div>
                <div className="text-gray-600">Note moyenne</div>
              </div>
            </div>

            <div className="mb-24">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Tout ce dont vous avez besoin pour
                <span className="block text-emerald-600">réussir en cuisine</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group p-8 bg-linear-to-br from-white to-emerald-50 rounded-3xl border border-emerald-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="inline-flex p-4 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Cuisine collaborative</h3>
                  <p className="text-gray-600 mb-6">
                    Cuisinez en temps réel avec vos amis ou votre famille, comme si vous étiez dans la même pièce.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                      Vidéo et chat intégrés
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                      Partage d&apos;écran cuisine
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                      Jusqu&apos;à 8 cuisiniers simultanés
                    </li>
                  </ul>
                </div>

                <div className="group p-8 bg-linear-to-br from-white to-amber-50 rounded-3xl border border-amber-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="inline-flex p-4 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl mb-6">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Listes intelligentes</h3>
                  <p className="text-gray-600 mb-6">
                    Liste de courses générée automatiquement depuis vos recettes, organisée par rayons.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                      Scan de produits par photo
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                      Synchronisation en temps réel
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                      Rappels d&apos;achats automatiques
                    </li>
                  </ul>
                </div>

                <div className="group p-8 bg-linear-to-br from-white to-teal-50 rounded-3xl border border-teal-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="inline-flex p-4 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl mb-6">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Timers intégrés</h3>
                  <p className="text-gray-600 mb-6">
                    Ne ratez plus jamais la cuisson de vos plats avec nos timers intelligents synchronisés.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                      Multi-timers simultanés
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                      Alertes sur tous vos appareils
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <div className="h-2 w-2 bg-teal-500 rounded-full"></div>
                      Commandes vocales mains libres
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-emerald-500 to-teal-500 rounded-3xl p-12 text-white mb-20">
              <div className="max-w-3xl mx-auto text-center">
                <div className="text-6xl mb-6">&ldquo;</div>
                <p className="text-2xl italic mb-8">
                  CookFlow a transformé notre façon de cuisiner en famille. Même à distance, 
                  nous préparons maintenant des repas ensemble chaque week-end. C&apos;est magique !
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">MS</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Marie et Sophie</div>
                    <div className="text-emerald-100">Sœurs et foodies passionnées</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Prêt à révolutionner votre cuisine ?
              </h3>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Rejoignez des milliers de passionnés qui cuisinent déjà mieux ensemble.
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-xl font-bold shadow-2xl shadow-emerald-300 hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                Commencer mon essai gratuit
                <ArrowRight className="h-6 w-6" />
              </Link>
              <p className="text-gray-500 mt-6 text-sm">
                Aucune carte bancaire requise • 14 jours gratuits
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-emerald-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-linear-to-r from-emerald-500 to-teal-500 rounded-lg">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">CookFlow</span>
            </div>
            <div className="flex gap-6 text-gray-600">
              <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                Conditions
              </Link>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}