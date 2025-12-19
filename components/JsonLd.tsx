'use client';

import { useEffect } from 'react';

interface JsonLdProps {
  data: object;
}

export default function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    // Remove any existing JSON-LD script with this id
    const existing = document.getElementById('json-ld-script');
    if (existing) {
      existing.remove();
    }

    // Create and append the JSON-LD script
    const script = document.createElement('script');
    script.id = 'json-ld-script';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('json-ld-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
}

