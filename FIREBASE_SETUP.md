# Firebase Setup Guide

This guide will walk you through setting up Firebase for online data storage and Google authentication.

## Why Firebase?

- **Free tier** with generous limits (1GB storage, 10GB/month bandwidth)
- **Real-time database** - data syncs instantly across devices
- **Google authentication** - secure sign-in
- **Works with GitHub Pages** - no server needed

## Step-by-Step Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "health-tracker")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Realtime Database

1. In your Firebase project, click "Realtime Database" in the left menu
2. Click "Create Database"
3. Choose a location (closest to you)
4. Start in **Test mode** for now (we'll secure it next)
5. Click "Enable"

### Step 3: Configure Database Security Rules

1. In the Realtime Database page, click on the "Rules" tab
2. Replace the rules with this secure configuration:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

3. Click "Publish"

**Important:** These rules ensure users can only read and write their own data.

### Step 4: Enable Google Authentication

1. Click "Authentication" in the left menu
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Google"
5. Toggle "Enable"
6. Enter a support email (your email)
7. Click "Save"

### Step 5: Get Your Firebase Configuration

1. Click the gear icon next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the "</>" (Web) icon
5. Register your app with a nickname (e.g., "health-tracker-web")
6. **Copy the firebaseConfig object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 6: Add Config to Your Website

1. Open `index.html` in your health-tracker-website folder
2. Find the line with `// TODO: Replace with your Firebase config`
3. Replace the placeholder config with your actual config values:

```javascript
// Replace this:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // ...
};

// With your actual config:
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    // ... (paste all your values)
};
```

4. Save the file

### Step 7: Configure Authorized Domains (for GitHub Pages)

1. In Firebase Console, go to "Authentication" > "Settings" tab
2. Scroll to "Authorized domains"
3. Add your GitHub Pages domain:
   - `your-username.github.io`
4. Click "Add domain"

**Note:** You can also add `localhost` for local testing (usually already there).

### Step 8: Test Locally

1. Open `index.html` in your browser
2. Click "Sign in with Google"
3. Sign in with your Google account
4. Try adding some weight and calorie data
5. Refresh the page - your data should persist!

### Step 9: Deploy to GitHub Pages

Follow the main README.md instructions to deploy to GitHub Pages. Your data will work across all devices once deployed!

## Troubleshooting

### "Firebase not defined" error
- Make sure you've added the Firebase config to `index.html`
- Check browser console for errors

### Can't sign in
- Check that Google authentication is enabled in Firebase Console
- Make sure your domain is in the Authorized domains list
- Try clearing browser cache

### Data not saving
- Check the database security rules are set correctly
- Make sure you're signed in
- Check browser console for errors

### Works locally but not on GitHub Pages
- Add your `username.github.io` domain to Authorized domains in Firebase
- Wait a few minutes for changes to propagate

## Data Structure

Your data is stored in Firebase Realtime Database with this structure:

```
users/
  └── {user-id}/
      ├── weight/
      │   ├── {entry-id}/
      │   │   ├── date: "2024-01-15"
      │   │   └── weight: 70.5
      │   └── ...
      └── calories/
          ├── {entry-id}/
          │   ├── date: "2024-01-15"
          │   ├── calories: 2000
          │   ├── note: "Breakfast"
          │   └── timestamp: "2024-01-15T08:30:00.000Z"
          └── ...
```

## Security

- Each user can only access their own data
- Authentication is required to read or write data
- Data is transmitted over HTTPS
- Firebase handles all security and encryption

## Costs

Firebase Realtime Database free tier includes:
- **1GB stored data**
- **10GB/month downloaded data**
- **100 simultaneous connections**

For a personal health tracker, you'll likely never exceed these limits!

## Support

For more information:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Realtime Database Guide](https://firebase.google.com/docs/database)
- [Authentication Guide](https://firebase.google.com/docs/auth)
