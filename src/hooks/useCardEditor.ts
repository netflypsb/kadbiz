import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BusinessCard, SocialMediaLink, BusinessLink } from '../types/database';

interface CardData extends Omit<BusinessCard, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  social_links: Omit<SocialMediaLink, 'id' | 'card_id' | 'created_at'>[];
  business_links: Omit<BusinessLink, 'id' | 'card_id' | 'created_at'>[];
}

const initialCardData: CardData = {
  full_name: '',
  job_title: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  personal_description: '',
  profile_image: '',
  theme: 'default',
  public_url: '',
  social_links: [],
  business_links: []
};

export function useCardEditor(cardId?: string) {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cardId) {
      fetchCardData();
    } else {
      setLoading(false);
    }
  }, [cardId]);

  async function fetchCardData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_cards')
        .select(`
          *,
          social_media_links(*),
          business_links(*)
        `)
        .eq('id', cardId)
        .single();

      if (error) throw error;

      if (data) {
        const { social_media_links, business_links, ...card } = data;
        setCardData({
          ...card,
          social_links: social_media_links || [],
          business_links: business_links || []
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch card data');
    } finally {
      setLoading(false);
    }
  }

  async function saveCard() {
    try {
      setSaving(true);
      const { social_links, business_links, ...cardDetails } = cardData;

      let savedCard;
      if (cardId) {
        const { data, error } = await supabase
          .from('business_cards')
          .update(cardDetails)
          .eq('id', cardId)
          .select()
          .single();
        if (error) throw error;
        savedCard = data;
      } else {
        const { data, error } = await supabase
          .from('business_cards')
          .insert(cardDetails)
          .select()
          .single();
        if (error) throw error;
        savedCard = data;
      }

      // Handle social links
      if (savedCard) {
        await supabase
          .from('social_media_links')
          .delete()
          .eq('card_id', savedCard.id);

        if (social_links.length > 0) {
          const { error: socialLinksError } = await supabase
            .from('social_media_links')
            .insert(
              social_links.map((link, index) => ({
                ...link,
                card_id: savedCard.id,
                display_order: index
              }))
            );
          if (socialLinksError) throw socialLinksError;
        }

        // Handle business links
        await supabase
          .from('business_links')
          .delete()
          .eq('card_id', savedCard.id);

        if (business_links.length > 0) {
          const { error: businessLinksError } = await supabase
            .from('business_links')
            .insert(
              business_links.map((link, index) => ({
                ...link,
                card_id: savedCard.id,
                display_order: index
              }))
            );
          if (businessLinksError) throw businessLinksError;
        }
      }

      return savedCard?.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save card');
      throw err;
    } finally {
      setSaving(false);
    }
  }

  return {
    cardData,
    setCardData,
    loading,
    saving,
    error,
    saveCard
  };
}