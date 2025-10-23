# Personal Health Tracker

A simple, elegant web application to track your daily weight and calorie intake. All data is stored locally in your browser using localStorage.

## Features

- **Weight Tracking**: Input your daily weight and visualize trends with an interactive chart
- **Calorie Tracking**: Record your daily calorie intake with optional notes
- **Statistics**: View total calories consumed and today's calories
- **Data Persistence**: All data is saved locally in your browser
- **Responsive Design**: Works on desktop and mobile devices

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

### Adding Weight Data

1. Select the date (defaults to today)
2. Enter your weight in kilograms
3. Click "Add Weight"
4. View your weight trend on the chart

### Adding Calorie Data

1. Select the date (defaults to today)
2. Enter the calorie amount
3. Optionally add a note (e.g., "Breakfast", "Dinner")
4. Click "Add Calories"
5. View your total and today's calorie count

### Managing Data

- Click "Delete" on any entry to remove it
- All data is stored in your browser's localStorage
- Data persists between sessions
- To reset all data, clear your browser's localStorage for this site

## Local Development

To run this website locally:

1. Simply open `index.html` in your web browser
2. No server or build process required!

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- [Chart.js](https://www.chartjs.org/) for data visualization
- localStorage for data persistence

## Browser Compatibility

Works in all modern browsers that support:
- localStorage
- ES6 JavaScript
- CSS Grid and Flexbox

## Data Privacy

All your data is stored locally in your browser. Nothing is sent to any server. Your data remains completely private and under your control.

## Customization

Feel free to customize:
- Colors in `style.css` (look for `#667eea` and `#764ba2` for the main gradient colors)
- Chart appearance in `app.js` (Chart.js configuration)
- Add more features like BMI calculation, calorie goals, etc.

## License

Free to use and modify as you wish!
