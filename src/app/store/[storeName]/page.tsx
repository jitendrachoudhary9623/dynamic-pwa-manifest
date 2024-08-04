import { Metadata } from 'next';
import StoreContent from './StoreContent';

interface StorePageProps {
  params: { storeName: string }
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  return {
    title: `${params.storeName} Store`,
    description: `Welcome to the ${params.storeName} store!`,
  };
}

export default function StorePage({ params }: StorePageProps) {
  return <StoreContent storeName={params.storeName} />;
}