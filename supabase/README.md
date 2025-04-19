# Supabase Setup for Lift Legends

This directory contains the Supabase configuration and migration files for the Lift Legends application.

## Database Setup

To set up the database, you need to run the SQL migrations in the `migrations` directory.

### Using Supabase CLI

If you have the Supabase CLI installed, you can run:

```bash
supabase db reset
```

### Manual Setup

If you prefer to set up the database manually:

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Copy the contents of each migration file in the `migrations` directory
4. Run the SQL commands in order

## Required Tables

The application requires the following tables:

1. `user_profiles` - Stores user profile information
2. `completed_exercises` - Stores completed workout exercises

## Authentication Setup

The application uses Supabase Auth with phone/password authentication, using the user's phone number directly for authentication.

## Environment Variables

Make sure to set up the following environment variables in your application:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Data Migration

The application includes functionality to migrate data from localStorage to Supabase. This happens automatically when a user logs in with localStorage credentials but doesn't have a Supabase account yet.

## Row Level Security

The database is set up with Row Level Security (RLS) to ensure users can only access their own data.