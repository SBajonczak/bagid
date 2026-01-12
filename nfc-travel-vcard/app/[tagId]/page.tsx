import { Metadata } from 'next';
import TravelCardClient from './TravelCardClient';

type Props = {
  params: { tagId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tagId = params.tagId;
  
  return {
    title: `Tag ${tagId} | Bag-Tag.de`,
    description: `View travel information for NFC luggage tag ${tagId}. Contact owner if found.`,
    openGraph: {
      title: `Bag Tag ${tagId} - Travel Information`,
      description: 'NFC luggage tag with owner contact information',
      type: 'website',
    },
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  };
}

export default function TagPage({ params }: Props) {
  return <TravelCardClient tagId={params.tagId} />;
}
