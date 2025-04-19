import { createClient } from '@supabase/supabase-js';

// Set up the Supabase client with the project URL and public key
const supabaseUrl = 'https://wagixhjktcodkdkgtgdj.supabase.co';
// Use the anon key which is safe to use in browser clients
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZ2l4aGprdGNvZGtka2d0Z2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTUxMjMsImV4cCI6MjA1OTc5MTEyM30.AmzMxE1izRhgdTUbqxGY6FLLL0QWoxn21Y2nmV1uSCw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  try {
    const { data, error } = await supabase.from('user_profiles').select('count');
    console.log('Connection test:', error ? 'Failed' : 'Success');
    console.log('Error:', error);
    console.log('Data:', data);
  } catch (e) {
    console.error('Exception:', e);
  }
}

testConnection();