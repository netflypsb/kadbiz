import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export function CreateCardButton() {
  return (
    <Link
      to="/editor"
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      <Plus className="w-5 h-5 mr-2" />
      Create New Card
    </Link>
  );
}