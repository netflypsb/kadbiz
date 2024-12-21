import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCardEditor } from '../hooks/useCardEditor';
import { BasicInfoForm } from '../components/editor/BasicInfoForm';
import { DescriptionForm } from '../components/editor/DescriptionForm';
import { SocialLinksForm } from '../components/editor/SocialLinksForm';
import { BusinessLinksForm } from '../components/editor/BusinessLinksForm';
import { ThemeSelector } from '../components/editor/ThemeSelector';
import { CardPreview } from '../components/editor/CardPreview';
import { Save, X } from 'lucide-react';

function CardEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cardData, setCardData, loading, saving, error, saveCard } = useCardEditor(id);

  const handleFieldChange = (field: string, value: any) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedId = await saveCard();
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save card:', err);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? 'Edit Business Card' : 'Create Business Card'}
            </h1>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-5 h-5 mr-2" />
                {saving ? 'Saving...' : 'Save Card'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <BasicInfoForm
                fullName={cardData.full_name}
                jobTitle={cardData.job_title || ''}
                company={cardData.company || ''}
                email={cardData.email || ''}
                phone={cardData.phone || ''}
                website={cardData.website || ''}
                onChange={handleFieldChange}
              />

              <DescriptionForm
                description={cardData.personal_description || ''}
                onChange={(value) => handleFieldChange('personal_description', value)}
              />

              <SocialLinksForm
                links={cardData.social_links}
                onChange={(links) => handleFieldChange('social_links', links)}
              />

              <BusinessLinksForm
                links={cardData.business_links}
                onChange={(links) => handleFieldChange('business_links', links)}
              />

              <ThemeSelector
                value={cardData.theme}
                onChange={(theme) => handleFieldChange('theme', theme)}
              />
            </div>

            <div className="lg:sticky lg:top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              <CardPreview {...cardData} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardEditor;