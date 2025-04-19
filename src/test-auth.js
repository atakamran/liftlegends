import { createClient } from '@supabase/supabase-js';

// Set up the Supabase client with the project URL and public key
const supabaseUrl = 'https://wagixhjktcodkdkgtgdj.supabase.co';
// Use the anon key which is safe to use in browser clients
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZ2l4aGprdGNvZGtka2d0Z2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTUxMjMsImV4cCI6MjA1OTc5MTEyM30.AmzMxE1izRhgdTUbqxGY6FLLL0QWoxn21Y2nmV1uSCw';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token',
  },
  global: {
    headers: {
      'X-Client-Info': 'liftlegends-app',
    },
  },
  db: {
    schema: 'public',
  },
});

async function testAuth() {
  console.log('Testing Supabase authentication...');
  
  try {
    // Generate a unique email for testing
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    console.log(`\nStep 1: Signing up with email: ${testEmail}`);
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });
    
    if (signupError) {
      console.error('Signup error:', signupError);
      return;
    }
    
    console.log('Signup successful:', signupData.user.id);
    
    // Wait for the session to be established
    console.log('\nStep 2: Getting session');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      return;
    }
    
    console.log('Session:', sessionData.session ? 'Active' : 'None');
    
    // Create a user profile
    console.log('\nStep 3: Creating user profile');
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: signupData.user.id,
        name: 'Test User',
        age: 30,
        gender: 'male',
        height: 180,
        weight: 80,
        target_weight: 75,
        primary_goal: 'weight_loss',
        fitness_level: 'intermediate',
        subscription_plan: 'basic',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select();
    
    if (profileError) {
      console.error('Profile creation error:', profileError);
    } else {
      console.log('Profile created successfully:', profileData);
    }
    
    // Sign out
    console.log('\nStep 4: Signing out');
    const { error: signoutError } = await supabase.auth.signOut();
    
    if (signoutError) {
      console.error('Signout error:', signoutError);
    } else {
      console.log('Signed out successfully');
    }
    
    // Sign in again
    console.log('\nStep 5: Signing in');
    const { data: signinData, error: signinError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });
    
    if (signinError) {
      console.error('Signin error:', signinError);
    } else {
      console.log('Signed in successfully:', signinData.user.id);
      
      // Get the user profile
      console.log('\nStep 6: Getting user profile');
      const { data: getUserData, error: getUserError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', signinData.user.id)
        .single();
      
      if (getUserError) {
        console.error('Get user error:', getUserError);
      } else {
        console.log('User profile retrieved successfully:', getUserData);
      }
    }
    
  } catch (e) {
    console.error('Exception:', e);
  }
}

testAuth();