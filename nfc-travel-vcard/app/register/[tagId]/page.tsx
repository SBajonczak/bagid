import { Metadata } from 'next';
import TagRegistrationClient from './TagRegistrationClient';

type Props = {
  params: { tagId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Register Tag ${params.tagId} | Bag-Tag.de`,
    description: `Register your NFC luggage tag ${params.tagId} to activate tracking and owner information`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function RegisterTagPage({ params }: Props) {
  return <TagRegistrationClient tagId={params.tagId} />;
}
