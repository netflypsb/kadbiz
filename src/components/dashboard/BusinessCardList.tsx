import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Share2, Trash2 } from 'lucide-react';
import type { BusinessCard } from '../../types/database';

interface BusinessCardListProps {
  cards: BusinessCard[];
  onDelete: (id: string) => void;
}

export function BusinessCardList({ cards, onDelete }: BusinessCardListProps) {
  if (cards.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 text-center py-8">
          You haven't created any business cards yet. Click "Create New Card" to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.full_name}</h3>
            {card.job_title && (
              <p className="text-gray-600 mb-1">{card.job_title}</p>
            )}
            {card.company && (
              <p className="text-gray-600 mb-4">{card.company}</p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Link
                to={`/editor/${card.id}`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Edit"
              >
                <Edit2 className="w-5 h-5" />
              </Link>
              <button
                onClick={() => card.public_url && window.open(`/card/${card.public_url}`, '_blank')}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                title="Share"
                disabled={!card.public_url}
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(card.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}