import { createClient } from '@supabase/supabase-js';

// Set up the Supabase client with the project URL and public key
const supabaseUrl = 'https://wagixhjktcodkdkgtgdj.supabase.co';
// Use the anon key which is safe to use in browser clients
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZ2l4aGprdGNvZGtka2d0Z2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTUxMjMsImV4cCI6MjA1OTc5MTEyM30.AmzMxE1izRhgdTUbqxGY6FLLL0QWoxn21Y2nmV1uSCw';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

async function testConnection() {
  console.log('Testing Supabase connection...');
  try {
    // Test auth
    console.log('Testing auth...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    console.log('Auth test:', authError ? 'Failed' : 'Success');
    console.log('Auth error:', authError);
    console.log('Auth data:', authData);
    
    // Test user_profiles table
    console.log('\nTesting user_profiles table...');
    const { data: profileData, error: profileError } = await supabase.from('user_profiles').select('count');
    console.log('user_profiles test:', profileError ? 'Failed' : 'Success');
    console.log('Profile error:', profileError);
    console.log('Profile data:', profileData);
    
    // Test completed_exercises table
    console.log('\nTesting completed_exercises table...');
    const { data: exercisesData, error: exercisesError } = await supabase.from('completed_exercises').select('count');
    console.log('completed_exercises test:', exercisesError ? 'Failed' : 'Success');
    console.log('Exercises error:', exercisesError);
    console.log('Exercises data:', exercisesData);
    
    // Test signup
    console.log('\nTesting signup...');
    const testEmail = `test${Date.now()}@example.com`;
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: 'testpassword123',
    });
    console.log('Signup test:', signupError ? 'Failed' : 'Success');
    console.log('Signup error:', signupError);
    console.log('Signup data:', signupData);
    
  } catch (e) {
    console.error('Exception:', e);
  }
}

testConnection();