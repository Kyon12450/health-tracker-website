# Security Guidelines

## Firebase API Key - Is It Safe?

**YES!** The Firebase API key visible in `index.html` is **safe to expose publicly**. Here's why:

### Why Firebase API Keys Are Different

Unlike traditional API keys (like AWS Secret Keys or Stripe Secret Keys), Firebase API keys are:

1. **Public by design** - They're meant to be embedded in client-side code
2. **Not secret credentials** - They only identify your Firebase project
3. **Not authentication tokens** - They don't grant access to your data

### Where Real Security Comes From

Your data is protected by:

#### 1. Firebase Security Rules
Located in Firebase Console > Realtime Database > Rules:

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

**This ensures:**
- Users must be authenticated (signed in with Google)
- Users can only access their own data
- No anonymous access allowed

#### 2. Firebase Authentication
- Google Sign-In required
- Only authorized users can access the database
- Firebase handles all authentication security

#### 3. Authorized Domains
Only domains you whitelist in Firebase Console can use your Firebase project:
- `localhost` (for development)
- `your-username.github.io` (for production)
- Prevents unauthorized sites from using your Firebase

### Official Documentation

From Google's official documentation:
> "Unlike how API keys are typically used, API keys for Firebase services are not used to control access to backend resources; that can only be done with Firebase Security Rules. Usually, you need to fastidiously guard API keys (for example, by using a vault service or setting the keys as environment variables); however, API keys for Firebase services are ok to include in code or checked-in config files."

**Source:** https://firebase.google.com/docs/projects/api-keys

## What You Should Still Protect

While the API key is safe, you **should protect**:

1. **Service Account Keys** - Never commit these (they look like JSON files)
2. **Environment Variables** - If you add backend services later
3. **Firebase Admin SDK credentials** - Only used for server-side code

## Security Checklist

✅ **Good Practices:**
- Firebase API key in client code: **SAFE**
- Security Rules properly configured: **REQUIRED**
- Authorized domains configured: **REQUIRED**
- Google Authentication enabled: **REQUIRED**

❌ **Bad Practices:**
- Committing Firebase Admin SDK service account JSON files
- Using "test mode" security rules in production
- Not configuring authorized domains
- Storing user passwords or sensitive data unencrypted

## Verifying Your Security

### Check Your Security Rules

1. Go to Firebase Console
2. Navigate to Realtime Database > Rules
3. Verify rules match the template in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
4. Test with the Rules simulator

### Check Authorized Domains

1. Go to Firebase Console > Authentication > Settings
2. Verify only your domains are listed
3. Remove any unauthorized domains

### Monitor Usage

1. Go to Firebase Console > Usage and Billing
2. Set up budget alerts
3. Monitor for unusual activity

## If Your API Key Is Compromised

Even though it's safe to expose, if you want to rotate it:

1. Go to Google Cloud Console
2. Navigate to APIs & Services > Credentials
3. Find your API key
4. Click "Regenerate key"
5. Update your `index.html` with the new key

**Note:** As long as your Security Rules are correct, even a "leaked" API key won't give attackers access to your data.

## Reporting Security Issues

If you find a security vulnerability:
1. Check Security Rules configuration
2. Verify Authorized Domains
3. Review authentication requirements
4. Test data access without authentication

## Additional Resources

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/rules)
- [Firebase API Key Best Practices](https://firebase.google.com/docs/projects/api-keys)
- [Authentication Best Practices](https://firebase.google.com/docs/auth/web/start)
- [OWASP Security Guidelines](https://owasp.org/www-project-web-security-testing-guide/)

## Summary

**Your Firebase API key being visible in the code is completely normal and safe.** What protects your data is:
- Proper Security Rules ✅
- Authentication requirements ✅
- Authorized domain restrictions ✅

As long as these are configured correctly (as shown in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)), your health tracking data is secure.
