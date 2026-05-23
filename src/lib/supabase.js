import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (url && key) ? createClient(url, key) : null;

export async function saveOrder(order) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('orders').insert([order]).select().single();
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function saveContactMessage(msg) {
  if (!supabase) return null;
  try {
    const { error } = await supabase.from('contact_messages').insert([msg]);
    if (error) throw error;
    return true;
  } catch {
    return null;
  }
}
