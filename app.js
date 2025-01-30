const STORAGE_KEYS = {
   RECORDS: 'collatz_records',
   GLOBAL_COUNT: 'collatz_global_count',
   LAST_NUMBER: 'collatz_last_number'
};

let records = [];
let chart = null;
let currentNumber = 1;
let autoCalcInterval;
let lastSyncTime = 0;
const SYNC_INTERVAL = 5000;

// Chart.js default configuration for dark theme
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = '#334155';

const GIST_ID = '641742d2b625cd291d3944792c21dfeb';
const GIST_URL = `https://gist.githubusercontent.com/Mohdjey123/${GIST_ID}/raw/data.json`;

async function loadInitialData() {
    try {
        // Try loading from Gist first
        const response = await fetch(GIST_URL + '?timestamp=' + Date.now());
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();

        // Update current number to start from the last known number
        currentNumber = Math.max(data.lastNumber,
            parseInt(localStorage.getItem(STORAGE_KEYS.LAST_NUMBER)) || 1);

        // Merge records from server with local records
        const localRecords = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECORDS) || '[]');
        records = mergeAndSortRecords([...data.records, ...localRecords]);

        // Update UI
        updateRecordsTable();
        document.getElementById('globalCount').textContent = data.globalCount.toLocaleString();

        // Store the merged records locally
        localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
        localStorage.setItem(STORAGE_KEYS.LAST_NUMBER, currentNumber.toString());
    } catch (error) {
        console.error('Error loading from Gist:', error);
        // Fall back to local data.json if Gist fails
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Failed to load local data');
            const data = await response.json();
            // ... rest of your existing code ...
        } catch (fallbackError) {
            console.error('Error loading local data:', fallbackError);
            loadFromLocalStorage();
        }
    }
}

function loadFromLocalStorage() {
   const savedRecords = localStorage.getItem(STORAGE_KEYS.RECORDS);
   if (savedRecords) {
      records = JSON.parse(savedRecords);
      updateRecordsTable();
   }
   currentNumber = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_NUMBER)) || 1;
}

function mergeAndSortRecords(allRecords) {
   // Remove duplicates based on number and keep the one with more steps
   const recordMap = new Map();
   allRecords.forEach(record => {
      const existing = recordMap.get(record.number);
      if (!existing || existing.steps < record.steps) {
         recordMap.set(record.number, record);
      }
   });

   // Convert back to array and sort by steps
   return Array.from(recordMap.values())
      .sort((a, b) => b.steps - a.steps)
      .slice(0, 5);
}

async function downloadRecordsAsJson() {
   const data = {
      lastNumber: currentNumber,
      globalCount: parseInt(localStorage.getItem(STORAGE_KEYS.GLOBAL_COUNT)) || 0,
      lastUpdated: new Date().toISOString(),
      records: records
   };

   const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
   });
   const url = URL.createObjectURL(blob);

   const a = document.createElement('a');
   a.href = url;
   a.download = 'collatz_data.json';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
}

function calculateCollatz(number = null) {
   const n = number || parseInt(document.getElementById('number').value);

   if (n < 1) {
      alert('Please enter a positive integer');
      return;
   }

   const sequence = [n];
   let current = n;
   let steps = 0;

   while (current !== 1) {
      if (current % 2 === 0) {
         current = current / 2;
      } else {
         current = current * 3 + 1;
      }
      sequence.push(current);
      steps++;

      // Safety check for very long sequences
      if (steps > 1000000) {
         alert('Sequence exceeded maximum length! This might be a counterexample!');
         break;
      }
   }

   const maxValue = Math.max(...sequence);

   document.getElementById('steps').textContent = steps;
   document.getElementById('maxValue').textContent = maxValue.toLocaleString();

   // Update counters
   updateGlobalCount();
   localStorage.setItem(STORAGE_KEYS.LAST_NUMBER, Math.max(n, currentNumber).toString());

   document.getElementById('sequence').textContent =
      `${n} → ${sequence.slice(1).join(' → ')}`;

   updateRecords(n, steps, maxValue);
   updateChart(sequence);
}

function updateRecords(number, steps, maxValue) {
   const newRecord = {
      number,
      steps,
      maxValue,
      timestamp: new Date().toISOString(),
      device: generateDeviceId()
   };

   // Only add if it's a new record
   if (records.length < 5 || steps > records[records.length - 1].steps) {
      records.push(newRecord);
      records.sort((a, b) => b.steps - a.steps);
      records = records.slice(0, 5);


      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
      updateRecordsTable();
   }
}

function updateRecordsTable() {
   const tbody = document.getElementById('recordsBody');
   tbody.innerHTML = '';

   records.forEach(record => {
      const row = tbody.insertRow();
      row.insertCell(0).textContent = record.number.toLocaleString();
      row.insertCell(1).textContent = record.steps;
      row.insertCell(2).textContent = record.maxValue.toLocaleString();

      const deviceCell = row.insertCell(3);
      deviceCell.textContent = record.device === generateDeviceId() ? 'You' : 'Another Explorer';
      deviceCell.className = 'discoverer';

      const dateCell = row.insertCell(4);
      dateCell.textContent = new Date(record.timestamp).toLocaleDateString();
      dateCell.className = 'date';
   });
}

function generateDeviceId() {
   // Create a simple device identifier if it doesn't exist
   let deviceId = localStorage.getItem('deviceId');
   if (!deviceId) {
      deviceId = 'explorer_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', deviceId);
   }
   return deviceId;
}

function shareDiscovery() {
   const currentValue = document.getElementById('number').value;
   if (currentValue) {
      // Create URL without query parameters first
      const url = window.location.href.split('?')[0];
      const shareUrl = `${url}?n=${currentValue}`;

      navigator.clipboard.writeText(shareUrl);

      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
   }
}

function updateChart(sequence) {
   if (chart) {
      chart.destroy();
   }

   const ctx = document.getElementById('sequenceChart').getContext('2d');
   chart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: Array.from({
            length: sequence.length
         }, (_, i) => i),
         datasets: [{
            label: 'Value',
            data: sequence,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.1
         }]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         interaction: {
            intersect: false,
            mode: 'index'
         },
         scales: {
            y: {
               type: 'logarithmic',
               title: {
                  display: true,
                  text: 'Value (log scale)'
               },
               grid: {
                  color: '#334155'
               }
            },
            x: {
               title: {
                  display: true,
                  text: 'Steps'
               },
               grid: {
                  color: '#334155'
               }
            }
         },
         plugins: {
            title: {
               display: false
            },
            legend: {
               display: false
            }
         }
      }
   });
}

function updateGlobalCount() {
   const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.GLOBAL_COUNT) || '0');
   const newCount = currentCount + 1;
   localStorage.setItem(STORAGE_KEYS.GLOBAL_COUNT, newCount.toString());
   document.getElementById('globalCount').textContent = newCount.toLocaleString();
}

// Auto-calculation feature
function toggleAutoCalc() {
   const autoCalcEnabled = document.getElementById('autoCalc').checked;
   const statusIndicator = document.getElementById('autoCalcStatus');

   if (autoCalcEnabled) {
      statusIndicator.style.display = 'inline-block';
      autoCalcInterval = setInterval(() => {
         calculateCollatz(currentNumber);
         currentNumber++;
         localStorage.setItem(STORAGE_KEYS.LAST_NUMBER, currentNumber.toString());
      }, 2000);
   } else {
      statusIndicator.style.display = 'none';
      clearInterval(autoCalcInterval);
   }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
   loadInitialData().then(() => {
      toggleAutoCalc();
   });

   // Add download button event listener
   document.getElementById('downloadData').addEventListener('click', downloadRecordsAsJson);
});

document.getElementById('autoCalc').addEventListener('change', toggleAutoCalc);
document.getElementById('number').addEventListener('keypress', (e) => {
   if (e.key === 'Enter') calculateCollatz();
});