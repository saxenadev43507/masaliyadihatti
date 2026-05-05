import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { allProducts } from '@/data/products';

export async function POST() {
  try {
    // Check if products already exist
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (count && count > 0) {
      return NextResponse.json({ 
        message: `Database already has ${count} products. Skipping seed.`,
        count 
      });
    }

    // Map static products to DB format
    const dbProducts = allProducts.map(p => ({
      title: p.title,
      brand: p.brand,
      category: p.category,
      price: p.price,
      rating: p.rating,
      tags: p.tags,
      image_url: p.image, // This will be the Next.js static path
      description: p.desc,
    }));

    const { data, error } = await supabase
      .from('products')
      .insert(dbProducts)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      message: `Successfully seeded ${data.length} products!`,
      count: data.length 
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
