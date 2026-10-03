import React from "react";

export function MicrosoftLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 108 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft">
      <rect x="0" y="1" width="9.5" height="9.5" fill="#F25022" />
      <rect x="11.5" y="1" width="9.5" height="9.5" fill="#7FBA00" />
      <rect x="0" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
      <rect x="11.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
      <text x="27" y="16.5" fill="#5E5E5E" fontFamily="Segoe UI, -apple-system, sans-serif" fontWeight="600" fontSize="15.5" letterSpacing="-0.3px">
        Microsoft
      </text>
    </svg>
  );
}

export function GoogleLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path d="M9.24 9.94v2.54h6.05c-.24 1.39-1.61 4.07-6.05 4.07-3.64 0-6.62-3.02-6.62-6.73s2.98-6.73 6.62-6.73c2.08 0 3.47.89 4.27 1.65l2.01-1.94C14.23 1.55 11.96.6 9.24.6 4.14.6 0 4.74 0 9.82s4.14 9.22 9.24 9.22c5.33 0 8.87-3.75 8.87-9.03 0-.61-.07-1.07-.15-1.53H9.24z" fill="#4285F4"/>
      <path d="M23.95 9.77c-3.11 0-5.28 2.37-5.28 5.4 0 3.01 2.17 5.4 5.28 5.4 3.09 0 5.26-2.39 5.26-5.4 0-3.03-2.17-5.4-5.26-5.4zm0 8.58c-1.7 0-3.17-1.42-3.17-3.18 0-1.78 1.47-3.18 3.17-3.18 1.68 0 3.15 1.4 3.15 3.18 0 1.76-1.47 3.18-3.15 3.18z" fill="#EA4335"/>
      <path d="M35.64 9.77c-3.11 0-5.28 2.37-5.28 5.4 0 3.01 2.17 5.4 5.28 5.4 3.09 0 5.26-2.39 5.26-5.4 0-3.03-2.17-5.4-5.26-5.4zm0 8.58c-1.7 0-3.17-1.42-3.17-3.18 0-1.78 1.47-3.18 3.17-3.18 1.68 0 3.15 1.4 3.15 3.18 0 1.76-1.47 3.18-3.15 3.18z" fill="#FBBC05"/>
      <path d="M46.77 9.77c-2.9 0-4.99 2.45-4.99 5.4 0 3.09 2.21 5.4 5.09 5.4 1.57 0 2.68-.69 3.25-1.39v1.1c0 2.06-1.12 3.17-2.89 3.17-1.46 0-2.37-1.05-2.73-1.92l-2.28.95c.67 1.61 2.43 3.19 5.01 3.19 2.92 0 5.39-1.72 5.39-5.63V10.03h-2.52v1.07c-.6-.72-1.75-1.33-3.33-1.33zm.31 8.58c-1.7 0-3.07-1.4-3.07-3.18s1.37-3.18 3.07-3.18c1.68 0 2.98 1.42 2.98 3.2 0 1.76-1.3 3.16-2.98 3.16z" fill="#4285F4"/>
      <path d="M54.19 1.13h2.64v19.44h-2.64V1.13z" fill="#34A853"/>
      <path d="M63.85 9.77c-2.79 0-4.82 2.19-4.82 5.4 0 3.24 2.19 5.4 5.26 5.4 2.48 0 3.92-1.37 4.7-2.43l-2.04-1.35c-.53.79-1.42 1.57-2.66 1.57-1.5 0-2.54-.95-2.87-2.19l7.73-3.2-.28-.71c-.51-1.39-2.08-4.49-5.02-4.49zm.17 2.21c1.17 0 2.04.6 2.37 1.48l-5.35 2.21c.07-1.72 1.37-3.69 2.98-3.69z" fill="#EA4335"/>
    </svg>
  );
}

export function AmazonLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Amazon">
      {/* amazon wordmark */}
      <path d="M12.96 11.23c-.15-.88-.7-1.47-1.63-1.47-.9 0-1.55.53-1.66 1.47h3.29zm-5.4 1.44c0-2.4 1.77-3.8 4.03-3.8 2.44 0 3.75 1.51 3.75 3.9v4.44c0 .35.08.52.26.52.1 0 .21-.06.39-.18l.83 1.05c-.5.54-1.28.84-2.02.84-.95 0-1.48-.56-1.56-1.54-.62.9-1.64 1.54-2.85 1.54-1.89 0-3.32-1.28-3.32-3.31 0-2.29 1.71-3.46 4.49-3.46h1.79v-.53c0-1.1-.64-1.75-1.92-1.75-.98 0-1.66.42-1.87 1.28l-2-.44zm4.45 4.31c1.07 0 1.83-.75 1.83-1.75v-.89h-1.66c-1.35 0-2.18.52-2.18 1.62 0 .86.72 1.42 1.71 1.42z" fill="#111111"/>
      <path d="M19.34 9.1h2.24v1.27c.6-.88 1.45-1.47 2.47-1.47 1.15 0 2.06.63 2.44 1.67.65-1.04 1.66-1.67 2.76-1.67 1.8 0 2.87 1.25 2.87 3.38v5.33h-2.31v-4.9c0-1.07-.46-1.66-1.42-1.66-.88 0-1.5.65-1.5 1.79v4.77h-2.31v-4.9c0-1.07-.46-1.66-1.42-1.66-.88 0-1.5.65-1.5 1.79v4.77h-2.32V9.1z" fill="#111111"/>
      <path d="M38.83 8.9c2.97 0 5.12 2.21 5.12 5.37 0 3.16-2.15 5.36-5.12 5.36-2.96 0-5.1-2.2-5.1-5.36 0-3.16 2.14-5.37 5.1-5.37zm0 8.44c1.68 0 2.8-1.39 2.8-3.07 0-1.69-1.12-3.09-2.8-3.09-1.69 0-2.8 1.4-2.8 3.09 0 1.68 1.11 3.07 2.8 3.07z" fill="#111111"/>
      <path d="M47.45 9.1h2.23v1.39c.67-.97 1.64-1.59 2.8-1.59 1.87 0 3.04 1.28 3.04 3.42v5.29h-2.31v-4.9c0-1.12-.52-1.73-1.52-1.73-.97 0-1.64.69-1.64 1.89v4.74h-2.3v-8.51z" fill="#111111"/>
      <path d="M60.92 14.52l3.43-3.79h-4.3V9.1h7.02v1.44l-3.5 3.86h4.5v1.63h-7.15v-1.51z" fill="#111111"/>
      <path d="M72.93 8.9c2.97 0 5.12 2.21 5.12 5.37 0 3.16-2.15 5.36-5.12 5.36-2.96 0-5.1-2.2-5.1-5.36 0-3.16 2.14-5.37 5.1-5.37zm0 8.44c1.68 0 2.8-1.39 2.8-3.07 0-1.69-1.12-3.09-2.8-3.09-1.69 0-2.8 1.4-2.8 3.09 0 1.68 1.11 3.07 2.8 3.07z" fill="#111111"/>
      <path d="M81.55 9.1h2.23v1.39c.67-.97 1.64-1.59 2.8-1.59 1.87 0 3.04 1.28 3.04 3.42v5.29h-2.31v-4.9c0-1.12-.52-1.73-1.52-1.73-.97 0-1.64.69-1.64 1.89v4.74h-2.3v-8.51z" fill="#111111"/>
      {/* amazon smile arrow */}
      <path d="M8.2 20.4c9.1 3.2 21.6 4.4 34.6 1.8 7.4-1.5 13.9-4.2 19.3-7.5.4-.3.9.1.5.6-5.8 4.7-14.8 7.8-24.3 8.2-12.8.5-23.7-2.2-30.8-4-.4-.1-.3-.9.7-.9z" fill="#FF9900"/>
      <path d="M62.6 13.8c-.8-.2-2.1.2-2.7.5-.2.1-.2.4.1.4 1 .3 2.4.4 3.3-.2.3-.2.2-.6-.2-.7l-.5 0z" fill="#FF9900"/>
      <path d="M64.4 12.9c-.3-.4-1.9-.3-2.6 0-.2.1-.1.3.1.4.7.1 1.7.5 2.1 1 .2.2.5.1.6-.2.2-.4.1-.9-.2-1.2z" fill="#FF9900"/>
    </svg>
  );
}

export function AdobeLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Adobe">
      {/* Red Adobe Icon Box */}
      <rect width="24" height="24" rx="3.5" fill="#FA0F00" />
      {/* Authentic Adobe 'A' Negative Space */}
      <path d="M15.1 3.5H20.5V20.5H16.8L14.4 14.2H12.1L15.1 3.5Z" fill="white" />
      <path d="M8.9 3.5H3.5V20.5H7.2L9.6 14.2H11.9L8.9 3.5Z" fill="white" />
      <path d="M10.8 11.2L14.2 20.5H11.2L10.3 17.8H8.7L10.8 11.2Z" fill="white" />
      {/* Adobe Text */}
      <text x="32" y="17.5" fill="#FA0F00" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.8px">
        ADOBE
      </text>
    </svg>
  );
}

export function AccentureLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Accenture">
      <text x="0" y="18" fill="#111111" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="16" letterSpacing="-0.5px">
        accenture
      </text>
      {/* Signature Purple Chevron Symbol above 't' */}
      <path d="M53.5 2.5L58.5 6.5L53.5 10.5" stroke="#A100FF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FlipkartLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 106 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Flipkart">
      {/* Flipkart Bag */}
      <rect x="0.5" y="4.5" width="16" height="17" rx="3" fill="#FFE500" />
      <path d="M5.5 4.5V3C5.5 2.17 6.17 1.5 7 1.5H10C10.83 1.5 11.5 2.17 11.5 3V4.5" stroke="#2874F0" strokeWidth="1.6" />
      <text x="8.5" y="16.5" fill="#2874F0" fontFamily="sans-serif" fontWeight="900" fontSize="13" fontStyle="italic">
        f
      </text>
      {/* Flipkart Wordmark */}
      <text x="23" y="18" fill="#2874F0" fontFamily="sans-serif" fontWeight="800" fontSize="16" fontStyle="italic" letterSpacing="-0.3px">
        Flipkart
      </text>
      {/* Plus Tag Star */}
      <path d="M88.5 7L89.5 9.5L92 10.5L89.5 11.5L88.5 14L87.5 11.5L85 10.5L87.5 9.5L88.5 7Z" fill="#FFE500" />
    </svg>
  );
}

export function DeloitteLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Deloitte">
      <text x="0" y="17.5" fill="#111111" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.5px">
        Deloitte
      </text>
      {/* Signature Green Period */}
      <circle cx="75" cy="15.2" r="3" fill="#86BC25" />
    </svg>
  );
}

export function InfosysLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 86 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Infosys">
      <text x="0" y="18" fill="#007CC3" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.3px">
        Infosys
      </text>
    </svg>
  );
}

export function PayPalLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
      {/* Double Overlapping Monogram P */}
      <path d="M4 3H12C15 3 17 4.8 16.5 7.8C16 11.7 13.5 13.8 10 13.8H7.2L5.8 23H1.8L4 3Z" fill="#003087" />
      <path d="M8 6.5H16C19 6.5 21 8.3 20.5 11.3C20 15.2 17.5 17.3 14 17.3H11.2L9.8 25H6.2L8 6.5Z" fill="#0079C1" fillOpacity="0.88" />
      {/* PayPal text */}
      <text x="26" y="18.5" fill="#003087" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" fontStyle="italic" letterSpacing="-0.3px">
        Pay
      </text>
      <text x="60" y="18.5" fill="#0079C1" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" fontStyle="italic" letterSpacing="-0.3px">
        Pal
      </text>
    </svg>
  );
}

export function TCSLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TCS">
      <text x="0" y="18.5" fill="#E21836" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" letterSpacing="-0.8px">
        tcs
      </text>
      <rect x="36" y="5.5" width="34" height="15" rx="2.5" fill="#E21836" fillOpacity="0.09" />
      <text x="41.5" y="16.5" fill="#E21836" fontFamily="sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="0.8px">
        TATA
      </text>
    </svg>
  );
}

export function GoldmanSachsLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 126 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Goldman Sachs">
      <rect width="22" height="22" rx="3" fill="#7399C6" />
      <text x="3.5" y="15.5" fill="white" fontFamily="serif" fontWeight="bold" fontSize="12">GS</text>
      <text x="28" y="16.5" fill="#20364F" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="13" letterSpacing="0.2px">
        Goldman Sachs
      </text>
    </svg>
  );
}

export function MetaLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Meta">
      <path d="M13 4.5C11.3 4.5 9.7 5.5 8.7 7C7.7 5.5 6.1 4.5 4.4 4.5C1.9 4.5 0 6.6 0 9.2C0 13.3 4.4 17.1 8.7 19C13 17.1 17.4 13.3 17.4 9.2C17.4 6.6 15.5 4.5 13 4.5ZM4.4 14.8C2.7 13.1 1.9 11.1 1.9 9.2C1.9 7.7 3 6.5 4.4 6.5C5.8 6.5 7.1 7.7 7.9 9.4C6.5 11.4 5.2 13.3 4.4 14.8ZM13 14.8C12.2 13.3 10.9 11.4 9.5 9.4C10.3 7.7 11.6 6.5 13 6.5C14.4 6.5 15.5 7.7 15.5 9.2C15.5 11.1 14.7 13.1 13 14.8Z" fill="#0668E1" />
      <text x="23" y="17" fill="#1C2B33" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3px">
        Meta
      </text>
    </svg>
  );
}

export function AppleLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple">
      <path d="M12.5 12.2C12.5 9.7 14.5 8.4 14.6 8.3C13.4 6.7 11.5 6.4 10.8 6.4C9.3 6.2 7.8 7.3 7 7.3C6.1 7.3 4.9 6.3 3.6 6.4C1.9 6.4 0.5 7.6 0.5 10.1C0.5 13.7 4.1 18.9 6.8 18.9C8.1 18.9 8.6 18 10.2 18C11.7 18 12.2 18.9 13.6 18.9C16.3 18.9 17.9 16.3 18.8 15C17.1 14.3 16 12.7 16 10.8c0-.1 0-.2 0-.3-.9.4-2.3.9-3.5 1.7zM9.7 4.3C10.4 3.4 11 2.3 10.8 1C9.7 1.1 8.5 1.8 7.7 2.7C7 3.5 6.5 4.6 6.7 5.8C7.9 5.9 9 5.1 9.7 4.3z" fill="#171A1F" />
      <text x="23" y="16.5" fill="#171A1F" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="15" letterSpacing="-0.3px">
        Apple
      </text>
    </svg>
  );
}

export function OracleLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 94 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Oracle">
      <rect x="1" y="3.5" width="20" height="17" rx="8.5" fill="#C74634" />
      <rect x="5.5" y="7.5" width="11" height="9" rx="4.5" fill="#FAF7F2" />
      <text x="27" y="17.5" fill="#C74634" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.2px">
        ORACLE
      </text>
    </svg>
  );
}

export function CiscoLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cisco">
      <rect x="0" y="9" width="2.5" height="4.5" rx="1.2" fill="#049FD9" />
      <rect x="4" y="6" width="2.5" height="7.5" rx="1.2" fill="#049FD9" />
      <rect x="8" y="2" width="2.5" height="11.5" rx="1.2" fill="#049FD9" />
      <rect x="12" y="6" width="2.5" height="7.5" rx="1.2" fill="#049FD9" />
      <rect x="16" y="9" width="2.5" height="4.5" rx="1.2" fill="#049FD9" />
      <text x="24" y="16.5" fill="#049FD9" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="14" letterSpacing="0.8px">
        cisco
      </text>
    </svg>
  );
}

export function JPMorganLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="JPMorgan Chase">
      <path d="M2 5L7 2L12 2L10 6L5 6L2 5Z" fill="#005EB8" />
      <path d="M12 2L15 7L15 12L11 10L11 5L12 2Z" fill="#005EB8" />
      <path d="M15 12L10 15L5 15L7 11L12 11L15 12Z" fill="#005EB8" />
      <path d="M5 15L2 10L2 5L6 7L6 12L5 15Z" fill="#005EB8" />
      <text x="21" y="16.5" fill="#111111" fontFamily="Georgia, serif" fontWeight="bold" fontSize="13" letterSpacing="0.4px">
        J.P.Morgan
      </text>
    </svg>
  );
}
