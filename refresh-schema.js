// Script to refresh the Supabase schema cache
const { execSync } = require('child_process');

try {
  console.log('Refreshing Supabase schema cache...');
  
  // Run the Supabase CLI command to refresh the schema cache
  execSync('npx supabase gen types typescript --project-id wagixhjktcodkdkgtgdj --schema public > src/integrations/supabase/types.ts', 
    { stdio: 'inherit' });
  
  console.log('Schema cache refreshed successfully!');
} catch (error) {
  console.error('Error refreshing schema cache:', error.message);
  process.exit(1);
}