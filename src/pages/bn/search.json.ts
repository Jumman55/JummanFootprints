// Site search index (Bangla). Rebuilt automatically on every build.
import { buildIndex } from '../../lib/searchIndex';
export const GET = () => new Response(JSON.stringify(buildIndex('bn')), { headers: { 'Content-Type': 'application/json' } });
