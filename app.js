// Global variables
let currentUser = null;
let weightData = [];
let calorieData = [];
let weightChart = null;

// UI Elements
const loadingScreen = document.getElementById('loadingScreen');
const authScreen = document.getElementById('authScreen');
const mainApp = document.getElementById('mainApp');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userEmailDisplay = document.getElementById('userEmail');

// Wait for Firebase to be initialized
setTimeout(() => {
    initializeApp();
}, 100);

function initializeApp() {
    // Set up authentication listener
    window.onAuthStateChanged(window.firebaseAuth, (user) => {
        if (user) {
            // User is signed in
            currentUser = user;
            userEmailDisplay.textContent = user.email;
            loadingScreen.style.display = 'none';
            authScreen.style.display = 'none';
            mainApp.style.display = 'block';

            // Set up data listeners
            setupDataListeners();
            initializeForms();
        } else {
            // User is signed out
            currentUser = null;
            loadingScreen.style.display = 'none';
            authScreen.style.display = 'flex';
            mainApp.style.display = 'none';
        }
    });

    // Google Sign In
    googleSignInBtn.addEventListener('click', async () => {
        try {
            await window.signInWithPopup(window.firebaseAuth, window.googleProvider);
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Failed to sign in. Please try again.');
        }
    });

    // Sign Out
    signOutBtn.addEventListener('click', async () => {
        try {
            await window.signOut(window.firebaseAuth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    });
}

function setupDataListeners() {
    // Listen to weight data changes
    const weightRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/weight`);
    window.firebaseOnValue(weightRef, (snapshot) => {
        weightData = [];
        snapshot.forEach((childSnapshot) => {
            weightData.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        weightData.sort((a, b) => new Date(a.date) - new Date(b.date));
        displayWeightData();
        updateWeightChart();
    });

    // Listen to calorie data changes
    const calorieRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/calories`);
    window.firebaseOnValue(calorieRef, (snapshot) => {
        calorieData = [];
        snapshot.forEach((childSnapshot) => {
            calorieData.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        calorieData.sort((a, b) => {
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare !== 0) return dateCompare;
            return new Date(a.timestamp) - new Date(b.timestamp);
        });
        displayCalorieData();
        updateCalorieStats();
    });
}

function initializeForms() {
    // Set today's date as default
    document.getElementById('weightDate').valueAsDate = new Date();
    document.getElementById('calorieDate').valueAsDate = new Date();

    // Weight form submission
    const weightForm = document.getElementById('weightForm');
    weightForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = document.getElementById('weightDate').value;
        const weight = parseFloat(document.getElementById('weight').value);

        // Check if entry for this date already exists
        const existingEntry = weightData.find(entry => entry.date === date);

        if (existingEntry) {
            // Update existing entry
            const entryRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/weight/${existingEntry.id}`);
            await window.firebaseSet(entryRef, { date, weight });
        } else {
            // Add new entry
            const weightRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/weight`);
            await window.firebasePush(weightRef, { date, weight });
        }

        // Reset form
        weightForm.reset();
        document.getElementById('weightDate').valueAsDate = new Date();
    });

    // Calorie form submission
    const calorieForm = document.getElementById('calorieForm');
    calorieForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = document.getElementById('calorieDate').value;
        const calories = parseInt(document.getElementById('calories').value);
        const note = document.getElementById('mealNote').value;

        const calorieRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/calories`);
        await window.firebasePush(calorieRef, {
            date,
            calories,
            note,
            timestamp: new Date().toISOString()
        });

        // Reset form
        calorieForm.reset();
        document.getElementById('calorieDate').valueAsDate = new Date();
    });
}

// Display weight data
function displayWeightData() {
    const weightList = document.getElementById('weightList');
    weightList.innerHTML = '';

    if (weightData.length === 0) {
        weightList.innerHTML = '<p style="color: #999; text-align: center;">No weight entries yet</p>';
        return;
    }

    // Display in reverse order (newest first)
    [...weightData].reverse().forEach((entry) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <div class="entry-info">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-value">${entry.weight} kg</div>
            </div>
            <button class="delete-btn" onclick="deleteWeight('${entry.id}')">Delete</button>
        `;
        weightList.appendChild(entryDiv);
    });
}

// Delete weight entry
window.deleteWeight = async function(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        const entryRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/weight/${id}`);
        await window.firebaseRemove(entryRef);
    }
};

// Update weight chart
function updateWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');

    if (weightChart) {
        weightChart.destroy();
    }

    if (weightData.length === 0) {
        return;
    }

    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weightData.map(entry => formatDate(entry.date)),
            datasets: [{
                label: 'Weight (kg)',
                data: weightData.map(entry => entry.weight),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                }
            }
        }
    });
}

// Display calorie data
function displayCalorieData() {
    const calorieList = document.getElementById('calorieList');
    calorieList.innerHTML = '';

    if (calorieData.length === 0) {
        calorieList.innerHTML = '<p style="color: #999; text-align: center;">No calorie entries yet</p>';
        return;
    }

    // Display in reverse order (newest first)
    [...calorieData].reverse().forEach((entry) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <div class="entry-info">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-value">${entry.calories} cal</div>
                ${entry.note ? `<div class="entry-note">${entry.note}</div>` : ''}
            </div>
            <button class="delete-btn" onclick="deleteCalorie('${entry.id}')">Delete</button>
        `;
        calorieList.appendChild(entryDiv);
    });
}

// Delete calorie entry
window.deleteCalorie = async function(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        const entryRef = window.firebaseRef(window.firebaseDatabase, `users/${currentUser.uid}/calories/${id}`);
        await window.firebaseRemove(entryRef);
    }
};

// Update calorie statistics
function updateCalorieStats() {
    const totalCaloriesDisplay = document.getElementById('totalCalories');
    const todayCaloriesDisplay = document.getElementById('todayCalories');

    // Calculate total calories
    const totalCalories = calorieData.reduce((sum, entry) => sum + entry.calories, 0);
    totalCaloriesDisplay.textContent = totalCalories.toLocaleString();

    // Calculate today's calories
    const today = new Date().toISOString().split('T')[0];
    const todayCalories = calorieData
        .filter(entry => entry.date === today)
        .reduce((sum, entry) => sum + entry.calories, 0);
    todayCaloriesDisplay.textContent = todayCalories.toLocaleString();
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
