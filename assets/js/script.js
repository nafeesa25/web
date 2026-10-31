// --- TASK 1: CRUD & LOCAL STORAGE ---

// 1. Local Storage se records load karna
let records = JSON.parse(localStorage.getItem('myRecords')) || [];

const form = document.getElementById('recordForm');
const recordsContainer = document.getElementById('recordsContainer');
const searchInput = document.getElementById('searchInput');

// Records ko screen par display karne ka function (map() method use karte hue)
function displayRecords(dataToDisplay = records) {
    recordsContainer.innerHTML = '';
    
    if (dataToDisplay.length === 0) {
        recordsContainer.innerHTML = `<p class="text-gray-500">No records found.</p>`;
        return;
    }

    dataToDisplay.map((record) => {
        recordsContainer.innerHTML += `
            <div class="border p-4 rounded flex justify-between items-center bg-gray-50">
                <div>
                    <h4 class="font-bold text-lg">${record.name}</h4>
                    <p class="text-gray-600 text-sm">Category: ${record.category}</p>
                </div>
                <div class="space-x-2">
                    <button onclick="editRecord(${record.id})" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                    <button onclick="deleteRecord(${record.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
            </div>
        `;
    });
}

// Local Storage mein save kar ke display update karna
function saveAndDisplay() {
    localStorage.setItem('myRecords', JSON.stringify(records)); // localStorage.setItem
    displayRecords();
}

// Form submit hone par naya record add karna (Create)
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('recordName').value;
    const category = document.getElementById('recordCategory').value;

    const newRecord = {
        id: Date.now(),
        name: name,
        category: category
    };

    records.push(newRecord);
    saveAndDisplay();
    form.reset();
});

// Delete Record
function deleteRecord(id) {
    records = records.filter(record => record.id !== id); // filter() method
    saveAndDisplay();
}

// Edit Record (Find and Update)
function editRecord(id) {
    const record = records.find(r => r.id === id); // find() method
    if (record) {
        document.getElementById('recordName').value = record.name;
        document.getElementById('recordCategory').value = record.category;
        
        // Purana record hata kar form mein le aana taake update ho sake
        records = records.filter(r => r.id !== id);
        saveAndDisplay();
    }
}

// Search & Filter functionality using filter() method
searchInput.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredRecords = records.filter(record => 
        record.name.toLowerCase().includes(searchText) || 
        record.category.toLowerCase().includes(searchText)
    );
    displayRecords(filteredRecords);
});

// Initial load par records dikhana
displayRecords();


// --- TASK 2: AXIOS API INTEGRATION ---

const apiDataContainer = document.getElementById('apiDataContainer');

function fetchApiData() {
    // Free Public API (JSONPlaceholder Users)
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            apiDataContainer.innerHTML = '';
            response.data.forEach(user => {
                apiDataContainer.innerHTML += `
                    <div class="border p-4 rounded bg-white shadow-sm">
                        <h4 class="font-bold text-blue-600">${user.name}</h4>
                        <p class="text-sm text-gray-700">Email: ${user.email}</p>
                        <p class="text-sm text-gray-500">City: ${user.address.city}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('API Error:', error);
            apiDataContainer.innerHTML = `<p class="text-red-500">Failed to load API data.</p>`;
        });
}

// Page load hone par API data fetch karna
fetchApiData();
