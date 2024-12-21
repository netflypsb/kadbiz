import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Share2, Activity, Palette } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create, Customize, and Share Your Professional Identity Online
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Design your digital business card in minutes and share it with the world
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features that Make Us Stand Out
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 text-blue-600">
                <Share2 className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized URLs</h3>
              <p className="text-gray-600">
                Share your card with a custom URL that reflects your brand
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 text-blue-600">
                <Activity className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Tracking</h3>
              <p className="text-gray-600">
                Monitor views and engagement with detailed analytics
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 text-blue-600">
                <Palette className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Themes</h3>
              <p className="text-gray-600">
                Choose from beautiful themes or create your own
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account</p>
            </div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Card</h3>
              <p className="text-gray-600">Design your perfect digital card</p>
            </div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <h3 className="text-xl font-semibold mb-2">Share It</h3>
              <p className="text-gray-600">Share your card with anyone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CreditCard className="w-6 h-6 mr-2" />
              <span className="font-semibold">E-Business Card Maker</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400">About Us</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;