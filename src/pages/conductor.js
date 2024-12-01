import ConductorGame from '../components/ConductorGame';
import Link from 'next/link';

export default function ConductorPage() {
  return (
    <div>
      <div className="p-4">
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← Back to Games
        </Link>
      </div>
      <ConductorGame />
    </div>
  );
}