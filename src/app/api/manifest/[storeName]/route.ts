// app/api/manifest/[storeName]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { storeName: string } }
) {
  const storeName = params.storeName;


  const manifest = {
    name: `${storeName} Store`,
    short_name: storeName,
    id: `/store/${storeName}`,  // Unique ID for each store
    description: `Progressive Web App for ${storeName}`,
    start_url: `/store/${storeName}`,
    "scope": `/store/${storeName}`,
    homepage_url: `/store/${storeName}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
        "sizes": "96x96",
        "type": "image/png"
      },
      { 
        "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
        "sizes": "512x512",
        "type": "image/png",
      }
    ]
  };
  switch (storeName) {
    case 'makemytrip':
      manifest.icons =  [
        {
          "src": "https://imgak.mmtcdn.com/pwa/assets/img/mmt_launcher_96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "https://imgak.mmtcdn.com/pwa/assets/img/mmt_launcher_144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "https://imgak.mmtcdn.com/pwa/assets/img/mmt_launcher_192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/mmt_launcher_512x512.png",
          "sizes": "512x512",
          "type": "image/png"        }
      ];
      break;
    case 'boongg':
      manifest.icons =  [
        {
          "src": "https://s.pinimg.com/images/favicon_red_192.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        { 
          "src": "https://s.pinimg.com/images/favicon_red_192.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "https://s.pinimg.com/images/favicon_red_192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "https://s.pinimg.com/images/favicon_red_192.png",
          "sizes": "512x512",
          "type": "image/png",
        }
      ];
    case 'nirmiteeio':
      manifest.icons =  [
        {
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        { 
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "512x512",
          "type": "image/png",
        }
      ];
    case 'bharatgo12':
      manifest.icons =  [
        {
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        { 
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "https://res.cloudinary.com/nirmitee-io/image/upload/v1655042071/nirmitee/nirmitee_p4nmh2.png",
          "sizes": "512x512",
          "type": "image/png",
        }
      ];
      break;  
    default:
      break
    }  

  

  return NextResponse.json(manifest);
}