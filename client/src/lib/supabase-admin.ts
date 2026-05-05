import { supabase } from './supabase';

// ========================
// PRODUCT OPERATIONS
// ========================

export interface DBProduct {
  id?: number;
  title: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  tags: string[];
  image_url: string;
  description: string;
  created_at?: string;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as DBProduct[];
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as DBProduct;
}

export async function createProduct(product: Omit<DBProduct, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data as DBProduct;
}

export async function updateProduct(id: number, updates: Partial<DBProduct>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as DBProduct;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function deleteProducts(ids: number[]) {
  const { error } = await supabase
    .from('products')
    .delete()
    .in('id', ids);
  if (error) throw error;
}

export async function getProductCount() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
}

// ========================
// SETTINGS OPERATIONS
// ========================

export async function getSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();
  if (error) return null;
  return data?.value || null;
}

export async function getSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('settings')
    .select('*');
  if (error) return {};
  const settings: Record<string, string> = {};
  data?.forEach((row: { key: string; value: string }) => {
    settings[row.key] = row.value;
  });
  return settings;
}

export async function upsertSetting(key: string, value: string) {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value }, { onConflict: 'key' });
  if (error) throw error;
}

export async function upsertSettings(settings: Record<string, string>) {
  const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
  const { error } = await supabase
    .from('settings')
    .upsert(rows, { onConflict: 'key' });
  if (error) throw error;
}

// ========================
// IMAGE UPLOAD
// ========================

export async function uploadProductImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file);
  
  if (error) throw error;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// ========================
// STATS
// ========================

export async function getDashboardStats() {
  const productCount = await getProductCount();
  
  const { count: userCount } = await supabase
    .from('products') // We can't query auth.users from client, so we'll use product count
    .select('*', { count: 'exact', head: true });

  return {
    totalProducts: productCount,
    totalUsers: userCount || 0,
  };
}
