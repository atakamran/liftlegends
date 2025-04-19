# Migration Guide: localStorage to Supabase

This guide explains the changes made to migrate the Lift Legends app from using localStorage to Supabase for data storage.

## Overview

The application has been updated to use Supabase for data storage and authentication while maintaining backward compatibility with the existing localStorage implementation. This ensures a smooth transition for existing users.

## Key Changes

1. **Authentication System**
   - Added Supabase authentication
   - Created an AuthContext for managing user state
   - Updated login and registration flows
   - Added migration functionality for existing users

2. **Data Storage**
   - Created Supabase tables for user profiles and completed exercises
   - Updated services to use Supabase instead of localStorage
   - Added caching for better performance
   - Maintained backward compatibility for users who haven't migrated

3. **Migration Tools**
   - Added a migration dialog component
   - Created migration service functions
   - Added a browser console script for manual migrations

## Setup Instructions

### 1. Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL migrations in `supabase/migrations/`
3. Set up the environment variables:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Code Changes

The following files have been created or modified:

**New Files:**
- `src/context/AuthContext.tsx` - Authentication context
- `src/services/supabaseService.ts` - Supabase service functions
- `src/components/migration/MigrationDialog.tsx` - Migration UI
- `supabase/migrations/20240712000000_create_tables.sql` - Database schema
- `scripts/migrate-to-supabase.js` - Manual migration script

**Modified Files:**
- `src/App.tsx` - Added AuthProvider
- `src/types/index.ts` - Added new types
- `src/services/workoutProgressService.ts` - Updated to use Supabase
- `src/services/migrationService.ts` - Added localStorage to Supabase migration
- `src/pages/PhoneLogin.tsx` - Updated to use Supabase auth
- `src/pages/Registration.tsx` - Updated to use Supabase auth

## Migration Process for Users

Existing users will be prompted to migrate their data when they log in. The migration process:

1. Detects if the user has localStorage data but no Supabase account
2. Prompts the user to create a password for their Supabase account
3. Creates a Supabase user and migrates their profile and completed exercises
4. Logs the user in with their new Supabase account

## Backward Compatibility

The application maintains backward compatibility by:

1. Checking localStorage first if Supabase authentication fails
2. Keeping localStorage updated alongside Supabase
3. Providing fallback mechanisms for users who haven't migrated

## Testing

To test the migration:

1. Create a user using the old localStorage method
2. Log out and back in to trigger the migration dialog
3. Complete the migration process
4. Verify that all data has been transferred to Supabase

## Troubleshooting

If users encounter issues during migration:

1. They can use the manual migration script in the browser console
2. Check the browser console for error messages
3. Contact support if issues persist