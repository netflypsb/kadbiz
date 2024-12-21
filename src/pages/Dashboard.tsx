import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBusinessCards } from '../hooks/useBusinessCards';
import { BusinessCardList } from '../components/dashboard/BusinessCardList';
import { CreateCardButton } from '../components/dashboard/CreateCardButton';
import { LogOut } from 'lucide-react';

function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { cards, loading, error, deleteCard } = useBusinessCards();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Business Cards</h1>
          <div className="flex items-center gap-4">
            <CreateCardButton />
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <BusinessCardList cards={cards} onDelete={deleteCard} />
      </div>
    </div>
  );
}

export default Dashboard;