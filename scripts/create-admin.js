#!/usr/bin/env node

/**
 * Creates the admin user for The Guided Path.
 * Run once: node scripts/create-admin.js
 *
 * Default credentials:
 *   Email: azam@distru.com
 *   Password: guidedpath123
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const ADMIN_EMAIL = 'azam@distru.com';
const ADMIN_PASSWORD = 'guidedpath123';
const ADMIN_NAME = 'Azam';

async function createAdmin() {
  console.log('Creating admin user...');
  console.log(`  Email: ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log('');

  // Create user via admin API (bypasses email confirmation)
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: ADMIN_NAME }
  });

  if (createError) {
    if (createError.message.includes('already been registered')) {
      console.log('User already exists. Updating password...');

      // Get existing user
      const { data: users } = await supabase.auth.admin.listUsers();
      const existing = users?.users?.find(u => u.email === ADMIN_EMAIL);

      if (existing) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
          password: ADMIN_PASSWORD,
          email_confirm: true
        });
        if (updateError) {
          console.error('Failed to update user:', updateError.message);
          process.exit(1);
        }
        console.log('Password updated successfully.');

        // Ensure profile exists with admin role
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ id: existing.id, email: ADMIN_EMAIL, full_name: ADMIN_NAME, role: 'admin' });

        if (profileError) {
          console.error('Profile upsert warning:', profileError.message);
        }
      }
    } else {
      console.error('Failed to create user:', createError.message);
      process.exit(1);
    }
  } else {
    console.log('User created successfully!');
    console.log('User ID:', userData.user.id);

    // Ensure profile has admin role
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ id: userData.user.id, email: ADMIN_EMAIL, full_name: ADMIN_NAME, role: 'admin' });

    if (profileError) {
      console.error('Profile upsert warning:', profileError.message);
    }
  }

  console.log('');
  console.log('Admin account ready! Login at http://localhost:3000/auth/login');
  console.log(`  Email: ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log('');
  console.log('You can change your password and email from the admin Profile page.');
}

createAdmin().catch(console.error);
