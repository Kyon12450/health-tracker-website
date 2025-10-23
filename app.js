// Initialize data from localStorage
let weightData = JSON.parse(localStorage.getItem('weightData')) || [];
let calorieData = JSON.parse(localStorage.getItem('calorieData')) || [];

// Set today's date as default
document.getElementById('weightDate').valueAsDate = new Date();
document.getElementById('calorieDate').valueAsDate = new Date();

// Weight tracking functionality
const weightForm = document.getElementById('weightForm');
const weightList = document.getElementById('weightList');
let weightChart = null;

weightForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('weightDate').value;
    const weight = parseFloat(document.getElementById('weight').value);

    // Check if entry for this date already exists
    const existingIndex = weightData.findIndex(entry => entry.date === date);

    if (existingIndex !== -1) {
        // Update existing entry
        weightData[existingIndex].weight = weight;
    } else {
        // Add new entry
        weightData.push({ date, weight });
    }

    // Sort by date
    weightData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Save to localStorage
    localStorage.setItem('weightData', JSON.stringify(weightData));

    // Reset form
    weightForm.reset();
    document.getElementById('weightDate').valueAsDate = new Date();

    // Update display
    displayWeightData();
    updateWeightChart();
});

function displayWeightData() {
    weightList.innerHTML = '';

    if (weightData.length === 0) {
        weightList.innerHTML = '<p style="color: #999; text-align: center;">No weight entries yet</p>';
        return;
    }

    // Display in reverse order (newest first)
    [...weightData].reverse().forEach((entry, index) => {
        const actualIndex = weightData.length - 1 - index;
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <div class="entry-info">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-value">${entry.weight} kg</div>
            </div>
            <button class="delete-btn" onclick="deleteWeight(${actualIndex})">Delete</button>
        `;
        weightList.appendChild(entryDiv);
    });
}

function deleteWeight(index) {
    weightData.splice(index, 1);
    localStorage.setItem('weightData', JSON.stringify(weightData));
    displayWeightData();
    updateWeightChart();
}

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

// Calorie tracking functionality
const calorieForm = document.getElementById('calorieForm');
const calorieList = document.getElementById('calorieList');
const totalCaloriesDisplay = document.getElementById('totalCalories');
const todayCaloriesDisplay = document.getElementById('todayCalories');

calorieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('calorieDate').value;
    const calories = parseInt(document.getElementById('calories').value);
    const note = document.getElementById('mealNote').value;

    calorieData.push({
        date,
        calories,
        note,
        timestamp: new Date().toISOString()
    });

    // Sort by date and timestamp
    calorieData.sort((a, b) => {
        const dateCompare = new Date(a.date) - new Date(b.date);
        if (dateCompare !== 0) return dateCompare;
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

    // Save to localStorage
    localStorage.setItem('calorieData', JSON.stringify(calorieData));

    // Reset form
    calorieForm.reset();
    document.getElementById('calorieDate').valueAsDate = new Date();

    // Update display
    displayCalorieData();
    updateCalorieStats();
});

function displayCalorieData() {
    calorieList.innerHTML = '';

    if (calorieData.length === 0) {
        calorieList.innerHTML = '<p style="color: #999; text-align: center;">No calorie entries yet</p>';
        return;
    }

    // Display in reverse order (newest first)
    [...calorieData].reverse().forEach((entry, index) => {
        const actualIndex = calorieData.length - 1 - index;
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `
            <div class="entry-info">
                <div class="entry-date">${formatDate(entry.date)}</div>
                <div class="entry-value">${entry.calories} cal</div>
                ${entry.note ? `<div class="entry-note">${entry.note}</div>` : ''}
            </div>
            <button class="delete-btn" onclick="deleteCalorie(${actualIndex})">Delete</button>
        `;
        calorieList.appendChild(entryDiv);
    });
}

function deleteCalorie(index) {
    calorieData.splice(index, 1);
    localStorage.setItem('calorieData', JSON.stringify(calorieData));
    displayCalorieData();
    updateCalorieStats();
}

function updateCalorieStats() {
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

// Initialize displays on page load
displayWeightData();
updateWeightChart();
displayCalorieData();
updateCalorieStats();
