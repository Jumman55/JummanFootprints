// Site search index (English). Rebuilt automatically on every build.
import { buildIndex } from '../lib/searchIndex';
export const GET = () => new Response(JSON.stringify(buildIndex('en')), { headers: { 'Content-Type': 'application/json' } });
