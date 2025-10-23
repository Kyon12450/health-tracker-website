# Personal Health Tracker

A simple, elegant web application to track your daily weight and calorie intake with cloud storage and Google authentication.

## Features

- **Weight Tracking**: Input your daily weight and visualize trends with an interactive chart
- **Calorie Tracking**: Record your daily calorie intake with optional notes
- **Statistics**: View total calories consumed and today's calories
- **Cloud Storage**: Data stored online using Firebase - access from any device
- **Google Sign-In**: Secure authentication with your Google account
- **Real-time Sync**: Data syncs instantly across all your devices
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

1. **Set up Firebase** - Follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md) (takes 5-10 minutes)
2. **Deploy to GitHub Pages** - Follow the deployment steps below
3. **Start tracking** - Sign in with Google and start logging your health data!

## How to Deploy on GitHub Pages (Free)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in (or create an account)
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `health-tracker`)
4. Choose "Public"
5. Click "Create repository"

### Step 2: Upload Your Files

You have two options:

#### Option A: Upload via GitHub Website (Easiest)

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all files from the `health-tracker-website` folder:
   - `index.html`
   - `style.css`
   - `app.js`
   - `.gitignore`
3. Click "Commit changes"

#### Option B: Upload via Git Command Line

```bash
cd health-tracker-website
git init
git add .
git commit -m "Initial commit: Health tracker website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (top menu)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for GitHub to build your site
7. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Usage

### First Time Setup

1. **Sign in with Google** - Click the "Sign in with Google" button
2. **Authorize the app** - Grant permission to access your Google account
3. **Start tracking** - You're ready to log your data!

### Adding Weight Data

1. Select the date (defaults to today)
2. Enter your weight in kilograms
3. Click "Add Weight"
4. View your weight trend on the interactive chart

### Adding Calorie Data

1. Select the date (defaults to today)
2. Enter the calorie amount
3. Optionally add a note (e.g., "Breakfast", "Dinner")
4. Click "Add Calories"
5. View your total and today's calorie count

### Managing Data

- Click "Delete" on any entry to remove it
- Data is stored in Firebase Realtime Database
- Access your data from any device by signing in
- Data syncs automatically across all devices

## Local Development

To test this website locally:

1. Complete the Firebase setup (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
2. Add `localhost` to Firebase Authorized domains (usually already there)
3. Open `index.html` in your web browser
4. Sign in and start testing!

**Note:** For local testing, you can use `python -m http.server` or any local server, but opening the HTML file directly also works.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Firebase](https://firebase.google.com/) for authentication and real-time database
- Firebase Realtime Database for cloud storage
- Firebase Authentication with Google Sign-In

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript modules
- Fetch API
- CSS Grid and Flexbox
- Firebase SDK

Tested on: Chrome, Firefox, Safari, Edge

## Data Privacy & Security

- **Authentication Required**: Only you can access your data (via Google Sign-In)
- **Secure Storage**: Data stored in Firebase with security rules
- **Private by Default**: Each user can only read/write their own data
- **HTTPS**: All data transmitted securely over HTTPS
- **No Third-Party Access**: Your health data is never shared

## Cost

Everything is **100% FREE**:

- **GitHub Pages**: Free hosting forever
- **Firebase Free Tier**:
  - 1GB stored data
  - 10GB/month bandwidth
  - 100 simultaneous connections
  - Unlimited authentication

For personal use, you'll never hit these limits!

## Customization

Feel free to customize:
- Colors in `style.css` (look for `#667eea` and `#764ba2` for the main gradient colors)
- Chart appearance in `app.js` (Chart.js configuration)
- Add more features like BMI calculation, calorie goals, weight predictions, etc.

## Troubleshooting

Having issues? Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for common problems and solutions.

Common issues:
- **Can't sign in**: Check Firebase Authorized domains
- **Data not saving**: Verify Firebase security rules are set correctly
- **Works locally but not on GitHub Pages**: Add your GitHub Pages domain to Firebase

## Future Enhancements

Ideas for additional features:
- BMI calculation and tracking
- Daily calorie goals with progress bars
- Weight prediction and goal tracking
- Export data to CSV
- Dark mode
- Multiple weight units (lbs, kg)
- Meal photos
- Water intake tracking

## License

Free to use and modify as you wish!
