"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [themeStyles, setThemeStyles] = useState<string>("");

  useEffect(() => {
    if (isAdmin) return;

    import('@/lib/shopify')
      .then(({ getShopifyTheme }) => {
        getShopifyTheme()
          .then(theme => {
            if (!theme) return;
            
            let primary = "";
            let accent = "";
            let accentHover = "";
            
            const activeTheme = theme.activeTheme.toLowerCase().trim();

            if (activeTheme === 'christmas') {
              primary = "#8B0000"; // Deep Crimson Red
              accent = "#E5A93C";  // Warm Gold
              accentHover = "#C58F2C";
            } else if (activeTheme === 'diwali') {
              primary = "#3C006B"; // Imperial Festive Purple
              accent = "#FF6F00";  // Radiant Marigold Orange
              accentHover = "#E65F00";
            } else if (activeTheme === 'eid') {
              primary = "#0B3C2A"; // Rich Islamic Emerald
              accent = "#C5A059";  // Soft Warm Gold
              accentHover = "#A58039";
            } else if (activeTheme === 'custom' && theme.primaryColor && theme.accentColor) {
              primary = theme.primaryColor;
              accent = theme.accentColor;
              accentHover = theme.accentColor + "cc"; // slightly translucent
            }
            
            if (primary && accent) {
              setThemeStyles(`
                :root {
                  --primary: ${primary} !important;
                  --accent: ${accent} !important;
                  --accent-hover: ${accentHover || accent} !important;
                }
              `);
            }
          })
          .catch((err) => {
            console.error('[Shopify Theme] Failed to load storefront theme:', err);
          });
      });
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {themeStyles && <style dangerouslySetInnerHTML={{ __html: themeStyles }} />}
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
