// Hotel Management System JavaScript

// Application State
let appState = {
    rooms: {},
    guests: {},
    foodOrders: {},
    currentUser: 'Admin',
    settings: {
        autoSave: true,
        emailNotifications: false,
        darkMode: false
    }
};

// Food Menu Data
const foodMenu = {
    1: { name: 'Deluxe Sandwich', price: 150, category: 'Snacks' },
    2: { name: 'Italian Pasta', price: 250, category: 'Main Course' },
    3: { name: 'Chinese Noodles', price: 200, category: 'Main Course' },
    4: { name: 'Fresh Coke', price: 50, category: 'Beverages' },
    5: { name: 'Continental Breakfast', price: 300, category: 'Breakfast' },
    6: { name: 'Dinner Buffet', price: 500, category: 'Buffet' },
    7: { name: 'Coffee & Snacks', price: 120, category: 'Beverages' },
    8: { name: 'Fresh Juice', price: 80, category: 'Beverages' }
};

// Room Configuration
const roomConfig = {
    'luxury-double': { 
        range: [101, 110], 
        price: 4000, 
        name: 'Luxury Double',
        amenities: ['AC', 'Free Breakfast', 'Double Bed', 'WiFi', 'Room Service']
    },
    'deluxe-double': { 
        range: [201, 220], 
        price: 3000, 
        name: 'Deluxe Double',
        amenities: ['Free Breakfast', 'Double Bed', 'WiFi', 'Room Service']
    },
    'luxury-single': { 
        range: [301, 310], 
        price: 2200, 
        name: 'Luxury Single',
        amenities: ['AC', 'Free Breakfast', 'Single Bed', 'WiFi']
    },
    'deluxe-single': { 
        range: [401, 420], 
        price: 1200, 
        name: 'Deluxe Single',
        amenities: ['Free Breakfast', 'Single Bed', 'WiFi']
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showSplashScreen();
    initializeRooms();
    loadSavedData();
    setupEventListeners();
    updateCurrentTime();
    loadTheme(); // Load saved theme
    
    // Hide splash screen after loading
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        updateDashboard();
        addActivity('System initialized successfully');
    }, 3000);
}

function showSplashScreen() {
    const splash = document.getElementById('splash-screen');
    splash.classList.remove('hidden');
}

function initializeRooms() {
    // Initialize all rooms as available
    Object.entries(roomConfig).forEach(([type, config]) => {
        const [start, end] = config.range;
        for (let i = start; i <= end; i++) {
            appState.rooms[i] = {
                number: i,
                type: type,
                typeName: config.name,
                price: config.price,
                amenities: config.amenities,
                status: 'available',
                guest: null,
                checkIn: null,
                checkOut: null,
                foodOrders: []
            };
        }
    });
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            showPage(page);
            setActiveMenuItem(item);
        });
    });

    // Forms
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleRoomBooking);
    }

    const foodOrderForm = document.getElementById('food-order-form');
    if (foodOrderForm) {
        foodOrderForm.addEventListener('submit', handleFoodOrder);
    }

    // Settings
    const settingsForm = document.getElementById('hotel-settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsUpdate);
    }

    // Global search
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('input', handleGlobalSearch);
    }

    // Date inputs - set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput) {
        checkInInput.min = today;
        checkInInput.value = today;
        checkInInput.addEventListener('change', updateCheckOutMinDate);
    }
    
    if (checkOutInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
        checkOutInput.value = tomorrow.toISOString().split('T')[0];
    }

    // Auto-save
    if (appState.settings.autoSave) {
        setInterval(saveData, 300000); // Save every 5 minutes
    }
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page-specific data
        switch (pageName) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'booking':
                updateAvailableRooms();
                break;
            case 'rooms':
                renderRoomsGrid();
                break;
            case 'guests':
                renderGuestsTable();
                break;
            case 'food':
                renderFoodService();
                break;
            case 'billing':
                updateBillingRooms();
                break;
            case 'reports':
                renderReports();
                break;
        }
    }
}

function setActiveMenuItem(activeItem) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleString();
    }
    
    // Update init time on dashboard
    const initTimeElement = document.getElementById('init-time');
    if (initTimeElement && initTimeElement.textContent === '') {
        initTimeElement.textContent = new Date().toLocaleTimeString();
    }
    
    setTimeout(updateCurrentTime, 1000);
}

// Dashboard Functions
function updateDashboard() {
    const totalRooms = Object.keys(appState.rooms).length;
    const occupiedRooms = Object.values(appState.rooms).filter(room => room.status === 'occupied').length;
    const availableRooms = totalRooms - occupiedRooms;
    const todayRevenue = calculateTodayRevenue();

    document.getElementById('total-rooms').textContent = totalRooms;
    document.getElementById('occupied-rooms').textContent = occupiedRooms;
    document.getElementById('available-rooms').textContent = availableRooms;
    document.getElementById('total-revenue').textContent = `₹${todayRevenue.toLocaleString()}`;

    // Update occupancy chart
    updateOccupancyChart(occupiedRooms, availableRooms);
}

function calculateTodayRevenue() {
    const today = new Date().toISOString().split('T')[0];
    let revenue = 0;

    Object.values(appState.rooms).forEach(room => {
        if (room.status === 'occupied' && room.checkIn === today) {
            revenue += room.price;
        }
        // Add food orders revenue
        room.foodOrders.forEach(order => {
            if (order.date === today) {
                revenue += order.total;
            }
        });
    });

    return revenue;
}

function updateOccupancyChart(occupied, available) {
    const canvas = document.getElementById('occupancyChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Simple pie chart representation
    const total = occupied + available;
    const occupiedAngle = (occupied / total) * 2 * Math.PI;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw occupied portion
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 80, 0, occupiedAngle);
    ctx.lineTo(canvas.width/2, canvas.height/2);
    ctx.closePath();
    ctx.fillStyle = '#ef4444';
    ctx.fill();
    
    // Draw available portion
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 80, occupiedAngle, 2 * Math.PI);
    ctx.lineTo(canvas.width/2, canvas.height/2);
    ctx.closePath();
    ctx.fillStyle = '#10b981';
    ctx.fill();
    
    // Add labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${occupied} Occupied`, canvas.width/2, canvas.height/2 - 10);
    ctx.fillText(`${available} Available`, canvas.width/2, canvas.height/2 + 10);
}

function addActivity(message) {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;

    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <i class="fas fa-clock"></i>
        <span>${message}</span>
        <small>${new Date().toLocaleTimeString()}</small>
    `;
    
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Keep only last 10 activities
    while (activityList.children.length > 10) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Booking Functions
function updateAvailableRooms() {
    const roomTypeSelect = document.getElementById('room-type');
    const roomNumberSelect = document.getElementById('room-number');
    
    if (!roomTypeSelect || !roomNumberSelect) return;
    
    roomTypeSelect.addEventListener('change', () => {
        const selectedType = roomTypeSelect.value;
        roomNumberSelect.innerHTML = '<option value="">Select Room</option>';
        
        if (selectedType) {
            Object.values(appState.rooms)
                .filter(room => room.type === selectedType && room.status === 'available')
                .forEach(room => {
                    const option = document.createElement('option');
                    option.value = room.number;
                    option.textContent = `Room ${room.number}`;
                    roomNumberSelect.appendChild(option);
                });
        }
    });
    
    renderAvailableRoomsGrid();
}

function renderAvailableRoomsGrid() {
    const grid = document.getElementById('available-rooms-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    Object.values(appState.rooms)
        .filter(room => room.status === 'available')
        .slice(0, 20) // Show first 20 available rooms
        .forEach(room => {
            const roomElement = document.createElement('div');
            roomElement.className = `room-item available`;
            roomElement.innerHTML = `
                <div class="room-number">${room.number}</div>
                <div class="room-price">₹${room.price}</div>
            `;
            roomElement.addEventListener('click', () => selectRoom(room.number));
            grid.appendChild(roomElement);
        });
}

function selectRoom(roomNumber) {
    const roomNumberSelect = document.getElementById('room-number');
    const roomTypeSelect = document.getElementById('room-type');
    
    if (roomNumberSelect && roomTypeSelect) {
        const room = appState.rooms[roomNumber];
        roomTypeSelect.value = room.type;
        roomNumberSelect.innerHTML = `<option value="${roomNumber}" selected>Room ${roomNumber}</option>`;
        
        // Trigger change event to update available rooms for this type
        roomTypeSelect.dispatchEvent(new Event('change'));
        roomNumberSelect.value = roomNumber;
        
        updateBookingSummary();
    }
}

function updateCheckOutMinDate() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        const checkInDate = new Date(checkInInput.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        checkOutInput.min = checkInDate.toISOString().split('T')[0];
        
        if (checkOutInput.value <= checkInInput.value) {
            checkOutInput.value = checkInDate.toISOString().split('T')[0];
        }
        
        updateBookingSummary();
    }
}

function updateBookingSummary() {
    const roomNumber = document.getElementById('room-number').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const summaryDiv = document.getElementById('booking-summary');
    
    if (!roomNumber || !checkIn || !checkOut || !summaryDiv) return;
    
    const room = appState.rooms[roomNumber];
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = room.price * nights;
    
    summaryDiv.style.display = 'block';
    summaryDiv.querySelector('.summary-details').innerHTML = `
        <div class="summary-row">
            <span>Room ${room.number} (${room.typeName})</span>
            <span>₹${room.price}/night</span>
        </div>
        <div class="summary-row">
            <span>${nights} night(s)</span>
            <span>₹${total.toLocaleString()}</span>
        </div>
        <div class="summary-row total">
            <span><strong>Total Amount</strong></span>
            <span><strong>₹${total.toLocaleString()}</strong></span>
        </div>
    `;
}

function handleRoomBooking(event) {
    event.preventDefault();
    
    const formData = {
        guestName: document.getElementById('guest-name').value,
        guestPhone: document.getElementById('guest-phone').value,
        guestEmail: document.getElementById('guest-email').value,
        guestId: document.getElementById('guest-id').value,
        guestAddress: document.getElementById('guest-address').value,
        roomNumber: parseInt(document.getElementById('room-number').value),
        checkIn: document.getElementById('check-in').value,
        checkOut: document.getElementById('check-out').value
    };
    
    // Validation
    if (!formData.guestName || !formData.guestPhone || !formData.roomNumber) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Book the room
    const room = appState.rooms[formData.roomNumber];
    room.status = 'occupied';
    room.guest = {
        name: formData.guestName,
        phone: formData.guestPhone,
        email: formData.guestEmail,
        idProof: formData.guestId,
        address: formData.guestAddress
    };
    room.checkIn = formData.checkIn;
    room.checkOut = formData.checkOut;
    
    // Add to guests record
    const guestId = Date.now().toString();
    appState.guests[guestId] = {
        id: guestId,
        ...formData,
        bookingDate: new Date().toISOString()
    };
    
    showToast(`Room ${formData.roomNumber} booked successfully for ${formData.guestName}`, 'success');
    addActivity(`Room ${formData.roomNumber} booked for ${formData.guestName}`);
    
    resetBookingForm();
    updateDashboard();
    saveData();
}

function resetBookingForm() {
    document.getElementById('booking-form').reset();
    document.getElementById('booking-summary').style.display = 'none';
    
    // Reset date fields to default
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('check-in').value = today;
    document.getElementById('check-out').value = tomorrow.toISOString().split('T')[0];
    
    updateAvailableRooms();
}

// Room Management Functions
function renderRoomsGrid() {
    const grid = document.getElementById('rooms-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    Object.values(appState.rooms).forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        
        const statusClass = room.status;
        const guestInfo = room.guest ? `
            <div><span>Guest:</span> <span>${room.guest.name}</span></div>
            <div><span>Check-in:</span> <span>${room.checkIn}</span></div>
            <div><span>Check-out:</span> <span>${room.checkOut}</span></div>
        ` : '';
        
        roomCard.innerHTML = `
            <div class="room-header">
                <div>
                    <div class="room-number">Room ${room.number}</div>
                    <div class="room-type">${room.typeName}</div>
                </div>
                <div class="room-status ${statusClass}">${room.status}</div>
            </div>
            <div class="room-body">
                <div class="room-info">
                    <div><span>Rate:</span> <span>₹${room.price}/night</span></div>
                    ${guestInfo}
                </div>
                <div class="room-actions">
                    ${room.status === 'occupied' ? 
                        `<button class="btn btn-warning btn-sm" onclick="checkOutRoom(${room.number})">Check Out</button>` :
                        `<button class="btn btn-primary btn-sm" onclick="bookFromRoom(${room.number})">Book</button>`
                    }
                    <button class="btn btn-info btn-sm" onclick="viewRoomDetails(${room.number})">Details</button>
                </div>
            </div>
        `;
        
        grid.appendChild(roomCard);
    });
}

function filterRooms() {
    const typeFilter = document.getElementById('room-type-filter').value;
    const statusFilter = document.getElementById('room-status-filter').value;
    
    const rooms = document.querySelectorAll('.room-card');
    
    rooms.forEach(card => {
        const roomNumber = card.querySelector('.room-number').textContent.replace('Room ', '');
        const room = appState.rooms[roomNumber];
        
        let showRoom = true;
        
        if (typeFilter !== 'all' && room.type !== typeFilter) {
            showRoom = false;
        }
        
        if (statusFilter !== 'all' && room.status !== statusFilter) {
            showRoom = false;
        }
        
        card.style.display = showRoom ? 'block' : 'none';
    });
}

function checkOutRoom(roomNumber) {
    showConfirmationModal(
        'Confirm Check Out',
        `Are you sure you want to check out Room ${roomNumber}?`,
        () => {
            const room = appState.rooms[roomNumber];
            const bill = calculateRoomBill(room);
            
            room.status = 'available';
            room.guest = null;
            room.checkIn = null;
            room.checkOut = null;
            room.foodOrders = [];
            
            showToast(`Room ${roomNumber} checked out successfully. Total bill: ₹${bill.toLocaleString()}`, 'success');
            addActivity(`Room ${roomNumber} checked out - Bill: ₹${bill.toLocaleString()}`);
            
            renderRoomsGrid();
            updateDashboard();
            saveData();
        }
    );
}

function bookFromRoom(roomNumber) {
    showPage('booking');
    setActiveMenuItem(document.querySelector('[data-page="booking"]'));
    
    // Pre-select this room
    setTimeout(() => {
        selectRoom(roomNumber);
    }, 100);
}

function viewRoomDetails(roomNumber) {
    const room = appState.rooms[roomNumber];
    const amenitiesHtml = room.amenities.map(amenity => `<li>${amenity}</li>`).join('');
    
    let guestDetails = '';
    if (room.guest) {
        guestDetails = `
            <h4>Guest Information</h4>
            <p><strong>Name:</strong> ${room.guest.name}</p>
            <p><strong>Phone:</strong> ${room.guest.phone}</p>
            <p><strong>Email:</strong> ${room.guest.email || 'N/A'}</p>
            <p><strong>Check-in:</strong> ${room.checkIn}</p>
            <p><strong>Check-out:</strong> ${room.checkOut}</p>
        `;
    }
    
    showModal(
        `Room ${room.number} Details`,
        `
            <h4>Room Information</h4>
            <p><strong>Type:</strong> ${room.typeName}</p>
            <p><strong>Rate:</strong> ₹${room.price}/night</p>
            <p><strong>Status:</strong> ${room.status}</p>
            
            <h4>Amenities</h4>
            <ul>${amenitiesHtml}</ul>
            
            ${guestDetails}
        `
    );
}

// Food Service Functions
function renderFoodService() {
    updateFoodOrderRooms();
    renderMenuGrid();
    renderActiveOrders();
}

function updateFoodOrderRooms() {
    const roomSelect = document.getElementById('order-room');
    if (!roomSelect) return;
    
    roomSelect.innerHTML = '<option value="">Select Room</option>';
    
    Object.values(appState.rooms)
        .filter(room => room.status === 'occupied')
        .forEach(room => {
            const option = document.createElement('option');
            option.value = room.number;
            option.textContent = `Room ${room.number} - ${room.guest.name}`;
            roomSelect.appendChild(option);
        });
}

function renderMenuGrid() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    Object.entries(foodMenu).forEach(([id, item]) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.dataset.itemId = id;
        
        menuItem.innerHTML = `
            <h4>${item.name}</h4>
            <p class="price">₹${item.price}</p>
            <p class="category">${item.category}</p>
            <div class="quantity-controls" style="display: none;">
                <button type="button" class="quantity-btn" onclick="changeQuantity(${id}, -1)">-</button>
                <span class="quantity-display">1</span>
                <button type="button" class="quantity-btn" onclick="changeQuantity(${id}, 1)">+</button>
            </div>
        `;
        
        menuItem.addEventListener('click', () => selectMenuItem(id));
        grid.appendChild(menuItem);
    });
}

function selectMenuItem(itemId) {
    const menuItem = document.querySelector(`[data-item-id="${itemId}"]`);
    const isSelected = menuItem.classList.contains('selected');
    
    if (isSelected) {
        menuItem.classList.remove('selected');
        menuItem.querySelector('.quantity-controls').style.display = 'none';
    } else {
        menuItem.classList.add('selected');
        menuItem.querySelector('.quantity-controls').style.display = 'flex';
    }
    
    updateFoodOrderSummary();
}

function changeQuantity(itemId, change) {
    const menuItem = document.querySelector(`[data-item-id="${itemId}"]`);
    const quantityDisplay = menuItem.querySelector('.quantity-display');
    let quantity = parseInt(quantityDisplay.textContent) + change;
    
    if (quantity < 1) {
        quantity = 1;
        menuItem.classList.remove('selected');
        menuItem.querySelector('.quantity-controls').style.display = 'none';
    }
    
    quantityDisplay.textContent = quantity;
    updateFoodOrderSummary();
}

function updateFoodOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    
    if (!orderItems || !orderTotal) return;
    
    let total = 0;
    let items = [];
    
    document.querySelectorAll('.menu-item.selected').forEach(menuItem => {
        const itemId = menuItem.dataset.itemId;
        const quantity = parseInt(menuItem.querySelector('.quantity-display').textContent);
        const item = foodMenu[itemId];
        const itemTotal = item.price * quantity;
        
        items.push({
            id: itemId,
            name: item.name,
            quantity: quantity,
            price: item.price,
            total: itemTotal
        });
        
        total += itemTotal;
    });
    
    orderItems.innerHTML = items.map(item => 
        `<div class="order-item">
            <span>${item.name} x${item.quantity}</span>
            <span>₹${item.total}</span>
        </div>`
    ).join('');
    
    orderTotal.textContent = total;
}

function handleFoodOrder(event) {
    event.preventDefault();
    
    const roomNumber = parseInt(document.getElementById('order-room').value);
    if (!roomNumber) {
        showToast('Please select a room', 'error');
        return;
    }
    
    const selectedItems = [];
    let total = 0;
    
    document.querySelectorAll('.menu-item.selected').forEach(menuItem => {
        const itemId = menuItem.dataset.itemId;
        const quantity = parseInt(menuItem.querySelector('.quantity-display').textContent);
        const item = foodMenu[itemId];
        const itemTotal = item.price * quantity;
        
        selectedItems.push({
            id: itemId,
            name: item.name,
            quantity: quantity,
            price: item.price,
            total: itemTotal
        });
        
        total += itemTotal;
    });
    
    if (selectedItems.length === 0) {
        showToast('Please select at least one food item', 'error');
        return;
    }
    
    // Add order to room
    const order = {
        id: Date.now().toString(),
        items: selectedItems,
        total: total,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status: 'active'
    };
    
    appState.rooms[roomNumber].foodOrders.push(order);
    
    showToast(`Food order placed for Room ${roomNumber} - Total: ₹${total}`, 'success');
    addActivity(`Food order placed for Room ${roomNumber} - ₹${total}`);
    
    clearFoodOrder();
    renderActiveOrders();
    saveData();
}

function clearFoodOrder() {
    document.querySelectorAll('.menu-item.selected').forEach(item => {
        item.classList.remove('selected');
        item.querySelector('.quantity-controls').style.display = 'none';
        item.querySelector('.quantity-display').textContent = '1';
    });
    
    updateFoodOrderSummary();
}

function renderActiveOrders() {
    const activeOrdersList = document.getElementById('active-orders-list');
    if (!activeOrdersList) return;
    
    activeOrdersList.innerHTML = '';
    
    let hasActiveOrders = false;
    
    Object.values(appState.rooms)
        .filter(room => room.foodOrders && room.foodOrders.length > 0)
        .forEach(room => {
            room.foodOrders.forEach(order => {
                if (order.status === 'active') {
                    hasActiveOrders = true;
                    const orderElement = document.createElement('div');
                    orderElement.className = 'active-order';
                    orderElement.innerHTML = `
                        <div class="order-header">
                            <strong>Room ${room.number}</strong>
                            <span class="order-time">${order.time}</span>
                        </div>
                        <div class="order-items">
                            ${order.items.map(item => 
                                `<div>${item.name} x${item.quantity}</div>`
                            ).join('')}
                        </div>
                        <div class="order-total">
                            Total: ₹${order.total}
                            <button class="btn btn-sm btn-success" onclick="completeOrder('${room.number}', '${order.id}')">
                                Complete
                            </button>
                        </div>
                    `;
                    activeOrdersList.appendChild(orderElement);
                }
            });
        });
    
    if (!hasActiveOrders) {
        activeOrdersList.innerHTML = '<p class="text-center">No active food orders</p>';
    }
}

function completeOrder(roomNumber, orderId) {
    const room = appState.rooms[roomNumber];
    const order = room.foodOrders.find(o => o.id === orderId);
    if (order) {
        order.status = 'completed';
        showToast('Order completed successfully', 'success');
        renderActiveOrders();
        saveData();
    }
}

// Billing Functions
function updateBillingRooms() {
    const roomSelect = document.getElementById('bill-room');
    if (!roomSelect) return;
    
    roomSelect.innerHTML = '<option value="">Select Room</option>';
    
    Object.values(appState.rooms)
        .filter(room => room.status === 'occupied')
        .forEach(room => {
            const option = document.createElement('option');
            option.value = room.number;
            option.textContent = `Room ${room.number} - ${room.guest.name}`;
            roomSelect.appendChild(option);
        });
}

function generateBill() {
    const roomNumber = document.getElementById('bill-room').value;
    if (!roomNumber) {
        showToast('Please select a room', 'error');
        return;
    }
    
    const room = appState.rooms[roomNumber];
    const bill = calculateDetailedBill(room);
    
    renderBill(bill);
    document.getElementById('bill-actions').style.display = 'flex';
}

function calculateRoomBill(room) {
    const checkInDate = new Date(room.checkIn);
    const today = new Date();
    const nights = Math.ceil((today - checkInDate) / (1000 * 60 * 60 * 24));
    
    let roomCharges = room.price * Math.max(1, nights);
    let foodCharges = 0;
    
    room.foodOrders.forEach(order => {
        foodCharges += order.total;
    });
    
    return roomCharges + foodCharges;
}

function calculateDetailedBill(room) {
    const checkInDate = new Date(room.checkIn);
    const today = new Date();
    const nights = Math.ceil((today - checkInDate) / (1000 * 60 * 60 * 24));
    
    const roomCharges = room.price * Math.max(1, nights);
    let foodCharges = 0;
    const foodItems = [];
    
    room.foodOrders.forEach(order => {
        order.items.forEach(item => {
            foodItems.push({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total
            });
            foodCharges += item.total;
        });
    });
    
    const subtotal = roomCharges + foodCharges;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    
    return {
        room: room,
        nights: Math.max(1, nights),
        roomCharges: roomCharges,
        foodItems: foodItems,
        foodCharges: foodCharges,
        subtotal: subtotal,
        tax: tax,
        total: total
    };
}

function renderBill(bill) {
    const billContent = document.getElementById('bill-content');
    if (!billContent) return;
    
    const foodItemsHtml = bill.foodItems.map(item => 
        `<div class="bill-item">
            <span>${item.name} x${item.quantity}</span>
            <span>₹${item.total.toLocaleString()}</span>
        </div>`
    ).join('');
    
    billContent.innerHTML = `
        <div class="bill-header">
            <h2>Grand Hotel</h2>
            <p>123 Main Street, City, State 12345</p>
            <p>Phone: +1 234 567 8900</p>
            <hr>
            <h3>BILL</h3>
        </div>
        
        <div class="bill-details">
            <div class="bill-item">
                <span><strong>Room Number:</strong></span>
                <span>${bill.room.number}</span>
            </div>
            <div class="bill-item">
                <span><strong>Guest Name:</strong></span>
                <span>${bill.room.guest.name}</span>
            </div>
            <div class="bill-item">
                <span><strong>Check-in Date:</strong></span>
                <span>${bill.room.checkIn}</span>
            </div>
            <div class="bill-item">
                <span><strong>Billing Date:</strong></span>
                <span>${new Date().toISOString().split('T')[0]}</span>
            </div>
        </div>
        
        <div class="bill-items">
            <h4>Room Charges</h4>
            <div class="bill-item">
                <span>${bill.room.typeName} x ${bill.nights} night(s)</span>
                <span>₹${bill.roomCharges.toLocaleString()}</span>
            </div>
            
            ${bill.foodItems.length > 0 ? `
                <h4>Food & Beverages</h4>
                ${foodItemsHtml}
            ` : ''}
        </div>
        
        <div class="bill-totals">
            <div class="bill-item">
                <span>Subtotal:</span>
                <span>₹${bill.subtotal.toLocaleString()}</span>
            </div>
            <div class="bill-item">
                <span>Tax (18% GST):</span>
                <span>₹${bill.tax.toLocaleString()}</span>
            </div>
            <div class="bill-total">
                <span><strong>Total Amount:</strong></span>
                <span><strong>₹${bill.total.toLocaleString()}</strong></span>
            </div>
        </div>
        
        <div class="bill-footer">
            <p>Thank you for staying with us!</p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
    `;
}

function printBill() {
    const billContent = document.getElementById('bill-content');
    if (!billContent) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>Hotel Bill</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .bill-header { text-align: center; margin-bottom: 20px; }
                    .bill-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                    .bill-total { border-top: 2px solid #333; padding-top: 10px; font-weight: bold; }
                    h2, h3, h4 { margin: 10px 0; }
                    hr { border: 1px solid #333; }
                </style>
            </head>
            <body>
                ${billContent.innerHTML}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function downloadBill() {
    showToast('PDF download feature coming soon!', 'info');
}

function processCheckout() {
    const roomNumber = document.getElementById('bill-room').value;
    if (!roomNumber) return;
    
    showConfirmationModal(
        'Process Checkout',
        `This will check out the guest and clear the room. Continue?`,
        () => {
            checkOutRoom(parseInt(roomNumber));
            document.getElementById('bill-content').innerHTML = `
                <div class="bill-placeholder">
                    <i class="fas fa-receipt"></i>
                    <p>Select a room to generate bill</p>
                </div>
            `;
            document.getElementById('bill-actions').style.display = 'none';
            updateBillingRooms();
        }
    );
}

// Guest Management
function renderGuestsTable() {
    const tableBody = document.getElementById('guests-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    Object.values(appState.rooms)
        .filter(room => room.guest)
        .forEach(room => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${room.guest.name}</td>
                <td>Room ${room.number}</td>
                <td>${room.guest.phone}</td>
                <td>${room.checkIn}</td>
                <td>${room.checkOut}</td>
                <td><span class="room-status ${room.status}">${room.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewGuestDetails(${room.number})">View</button>
                    <button class="btn btn-sm btn-warning" onclick="checkOutRoom(${room.number})">Check Out</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    
    if (tableBody.children.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No guests currently checked in</td></tr>';
    }
}

function viewGuestDetails(roomNumber) {
    const room = appState.rooms[roomNumber];
    const guest = room.guest;
    
    showModal(
        `Guest Details - Room ${roomNumber}`,
        `
            <div class="guest-details">
                <p><strong>Name:</strong> ${guest.name}</p>
                <p><strong>Phone:</strong> ${guest.phone}</p>
                <p><strong>Email:</strong> ${guest.email || 'N/A'}</p>
                <p><strong>ID Proof:</strong> ${guest.idProof || 'N/A'}</p>
                <p><strong>Address:</strong> ${guest.address || 'N/A'}</p>
                <p><strong>Check-in:</strong> ${room.checkIn}</p>
                <p><strong>Check-out:</strong> ${room.checkOut}</p>
                <p><strong>Room Type:</strong> ${room.typeName}</p>
                <p><strong>Room Rate:</strong> ₹${room.price}/night</p>
            </div>
        `
    );
}

// Reports
function renderReports() {
    renderOccupancyReport();
    renderRevenueReport();
    renderFoodReport();
}

function renderOccupancyReport() {
    const canvas = document.getElementById('occupancyReportChart');
    if (!canvas) return;
    
    // Simple implementation - in a real app, you'd use Chart.js or similar
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const occupied = Object.values(appState.rooms).filter(room => room.status === 'occupied').length;
    const total = Object.keys(appState.rooms).length;
    const occupancyRate = (occupied / total) * 100;
    
    // Draw bar chart
    const barHeight = 200;
    const barWidth = 100;
    const x = (canvas.width - barWidth) / 2;
    const y = canvas.height - 50;
    
    // Background bar
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(x, y - barHeight, barWidth, barHeight);
    
    // Occupied bar
    const occupiedHeight = (barHeight * occupancyRate) / 100;
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(x, y - occupiedHeight, barWidth, occupiedHeight);
    
    // Labels
    ctx.fillStyle = '#1e293b';
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`${occupancyRate.toFixed(1)}%`, canvas.width / 2, y + 30);
    ctx.fillText('Occupancy Rate', canvas.width / 2, y + 50);
}

function renderRevenueReport() {
    const canvas = document.getElementById('revenueReportChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const todayRevenue = calculateTodayRevenue();
    
    // Simple display
    ctx.fillStyle = '#10b981';
    ctx.font = '24px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(`₹${todayRevenue.toLocaleString()}`, canvas.width / 2, canvas.height / 2);
    ctx.font = '16px Inter';
    ctx.fillText("Today's Revenue", canvas.width / 2, canvas.height / 2 + 30);
}

function renderFoodReport() {
    const canvas = document.getElementById('foodReportChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let totalOrders = 0;
    Object.values(appState.rooms).forEach(room => {
        totalOrders += room.foodOrders.length;
    });
    
    ctx.fillStyle = '#f59e0b';
    ctx.font = '24px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(totalOrders.toString(), canvas.width / 2, canvas.height / 2);
    ctx.font = '16px Inter';
    ctx.fillText('Total Food Orders', canvas.width / 2, canvas.height / 2 + 30);
}

// Settings
function handleSettingsUpdate(event) {
    event.preventDefault();
    
    const hotelName = document.getElementById('hotel-name').value;
    const hotelAddress = document.getElementById('hotel-address').value;
    const hotelPhone = document.getElementById('hotel-phone').value;
    
    // Update settings (in a real app, this would be saved to backend)
    appState.settings.hotelName = hotelName;
    appState.settings.hotelAddress = hotelAddress;
    appState.settings.hotelPhone = hotelPhone;
    
    showToast('Settings updated successfully', 'success');
    saveData();
}

// Dark Mode Functions
function toggleDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode');
    const isDarkMode = darkModeToggle.checked;
    
    // Update app state
    appState.settings.darkMode = isDarkMode;
    
    // Apply theme
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        showToast('Dark mode enabled', 'success');
    } else {
        document.documentElement.removeAttribute('data-theme');
        showToast('Light mode enabled', 'success');
    }
    
    // Save settings
    saveData();
}

function loadTheme() {
    const savedTheme = appState.settings.darkMode;
    const darkModeToggle = document.getElementById('dark-mode');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
}

// Utility Functions
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        ${message}
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function showModal(title, content, confirmCallback = null) {
    const modal = document.getElementById('confirmation-modal');
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const confirmButton = document.getElementById('modal-confirm');
    
    if (!modal || !overlay) return;
    
    modalTitle.textContent = title;
    modalMessage.innerHTML = content;
    
    if (confirmCallback) {
        confirmButton.style.display = 'inline-block';
        confirmButton.onclick = () => {
            confirmCallback();
            closeModal();
        };
    } else {
        confirmButton.style.display = 'none';
    }
    
    overlay.classList.add('active');
}

function showConfirmationModal(title, message, confirmCallback) {
    showModal(title, message, confirmCallback);
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function confirmAction() {
    // This is handled by the specific confirm callback
    closeModal();
}

function quickCheckOut() {
    const occupiedRooms = Object.values(appState.rooms).filter(room => room.status === 'occupied');
    
    if (occupiedRooms.length === 0) {
        showToast('No rooms are currently occupied', 'info');
        return;
    }
    
    const roomOptions = occupiedRooms.map(room => 
        `<option value="${room.number}">Room ${room.number} - ${room.guest.name}</option>`
    ).join('');
    
    showModal(
        'Quick Check-out',
        `
            <div class="form-group">
                <label for="quick-checkout-room">Select Room:</label>
                <select id="quick-checkout-room" class="form-control">
                    <option value="">Choose a room</option>
                    ${roomOptions}
                </select>
            </div>
        `,
        () => {
            const roomNumber = document.getElementById('quick-checkout-room').value;
            if (roomNumber) {
                checkOutRoom(parseInt(roomNumber));
            }
        }
    );
}

function handleGlobalSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm.length < 2) return;
    
    // Simple search implementation
    const results = [];
    
    // Search rooms
    Object.values(appState.rooms).forEach(room => {
        if (room.number.toString().includes(searchTerm) || 
            room.typeName.toLowerCase().includes(searchTerm) ||
            (room.guest && room.guest.name.toLowerCase().includes(searchTerm))) {
            results.push({
                type: 'room',
                data: room,
                text: `Room ${room.number} - ${room.typeName}${room.guest ? ` - ${room.guest.name}` : ''}`
            });
        }
    });
    
    // Show search results (simplified implementation)
    if (results.length > 0) {
        console.log('Search results:', results);
        // In a real app, you'd show a dropdown with results
    }
}

// Data Persistence
function saveData() {
    try {
        localStorage.setItem('hotelManagementData', JSON.stringify(appState));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function loadSavedData() {
    try {
        const savedData = localStorage.getItem('hotelManagementData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Merge saved data with current state
            appState = { ...appState, ...parsedData };
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}