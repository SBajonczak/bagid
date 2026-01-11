import { Metadata } from 'next';
import TravelCardEditClient from './TravelCardEditClient';

type Props = {
  params: { tagId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Edit Tag ${params.tagId} | Bag-Tag.de`,
    description: `Edit travel information for your NFC luggage tag ${params.tagId}`,
    robots: {
      index: false, // Don't index edit pages
      follow: false,
    },
  };
}

export default function TagEditPage({ params }: Props) {
  return <TravelCardEditClient tagId={params.tagId} />;
}
