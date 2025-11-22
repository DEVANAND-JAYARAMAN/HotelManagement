# 🏨 Modern Hotel Management System

A comprehensive, feature-rich hotel management application built with Java Swing, featuring a modern GUI with animations, real-time dashboard, and complete hotel operations management.

## ✨ Features

### 🎯 Core Functionality
- **Room Management**: 60 rooms across 4 categories (Luxury/Deluxe Single/Double)
- **Guest Management**: Complete guest information with check-in/check-out tracking
- **Food Service**: Integrated food ordering system with 8 menu items
- **Billing System**: Automated billing with detailed invoices
- **Real-time Dashboard**: Live statistics and occupancy tracking
- **Data Persistence**: Automatic data saving and loading

### 🎨 Modern UI Features
- **Animated Buttons**: Smooth hover animations and color transitions
- **Gradient Panels**: Beautiful gradient backgrounds
- **Real-time Clock**: Current date and time display
- **Status Indicators**: Color-coded room status visualization
- **Responsive Layout**: Professional card-based layout system

### 🚀 Advanced Features
- **Quick Actions**: Fast check-in/check-out operations
- **Visual Room Grid**: Easy-to-understand room status overview
- **Automatic Calculations**: Real-time bill calculation with dates
- **Data Backup**: Automatic saving every 5 minutes
- **Search & Filter**: Easy room and guest management
- **Multi-day Stays**: Support for extended stays with per-day billing

## 🏗️ System Architecture

### Room Categories & Pricing
- **Luxury Double Rooms** (101-110): ₹4,000/night
- **Deluxe Double Rooms** (201-220): ₹3,000/night  
- **Luxury Single Rooms** (301-310): ₹2,200/night
- **Deluxe Single Rooms** (401-420): ₹1,200/night

### Food Menu
1. Deluxe Sandwich - ₹150
2. Italian Pasta - ₹250
3. Chinese Noodles - ₹200
4. Fresh Coke - ₹50
5. Continental Breakfast - ₹300
6. Dinner Buffet - ₹500
7. Coffee & Snacks - ₹120
8. Fresh Juice - ₹80

## 🖥️ User Interface

### Navigation Sidebar
- 📊 **Dashboard**: Overview with statistics and recent activities
- 🛏️ **Room Booking**: Complete guest registration and room assignment
- 🏠 **Room Management**: Visual room grid with status management
- 🍽️ **Food Service**: Order management for occupied rooms
- 💰 **Billing**: Generate detailed bills and invoices
- 🔄 **Check In/Out**: Quick actions for guest services

### Dashboard Features
- Total rooms count
- Occupied rooms counter
- Available rooms display
- Daily revenue tracking
- Recent activities log
- Real-time updates

## 💾 Technical Details

### Data Storage
- Serialized object storage in `hotel_data.ser`
- Automatic backup on application close
- Auto-save every 5 minutes
- Data integrity with exception handling

### Performance Features
- Efficient room lookup with HashMap
- Lazy loading of UI components
- Optimized table rendering
- Memory-efficient data structures

## 🚀 Getting Started

### Prerequisites
- Java 8 or higher
- Any Java IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)

### Installation & Running

1. **Clone or download** the project files
2. **Compile** the Java file:
   ```bash
   javac ModernHotelManagement.java
   ```
3. **Run** the application:
   ```bash
   java ModernHotelManagement
   ```

### First Time Setup
- The application will create a new hotel with all rooms available
- Start by booking rooms through the "Room Booking" section
- Data will be automatically saved to `hotel_data.ser`

## 🎯 Usage Guide

### Booking a Room
1. Navigate to **Room Booking**
2. Fill in guest details (name, contact required)
3. Select room type and available room number
4. Set check-in and check-out dates
5. Click **Book Room**

### Managing Food Orders
1. Go to **Food Service**
2. Select occupied room number
3. Choose food item and quantity
4. Click **Add to Order**

### Generating Bills
1. Open **Billing** section
2. Select occupied room
3. Click **Generate Bill** for detailed invoice
4. Bill includes room charges and food orders

### Quick Check-out
1. Use **Check In/Out** for fast operations
2. Or use **Room Management** table for detailed view
3. Confirm check-out to clear room and calculate final bill

## 🔧 Maintenance & Support

### Data Management
- Data is automatically saved every 5 minutes
- Manual save available through File menu
- Data backup recommended for production use

### Troubleshooting
- If data file is corrupted, delete `hotel_data.ser` to reset
- Ensure Java version compatibility
- Check file permissions for data saving

## 🎨 Customization

The application is designed for easy customization:
- Modify room rates in the `Room` constructor
- Add new food items in the `Food` class static blocks
- Customize colors in the UI component constructors
- Add new features by extending existing panels

## 📈 Future Enhancements

Potential improvements for future versions:
- Database integration (MySQL/PostgreSQL)
- Online booking system
- Payment processing
- Reporting and analytics
- Mobile app companion
- Multi-hotel support
- Staff management
- Inventory tracking

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs and issues
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with Java Swing for cross-platform compatibility and modern UI design principles for an enhanced user experience.

---

## 🔄 Migration from Original System

If you're upgrading from the original console-based system, here are the key improvements:

### Original System Issues Fixed
- ✅ Fixed all compilation errors
- ✅ Improved user interface from console to modern GUI
- ✅ Added proper data validation and error handling
- ✅ Enhanced room numbering system for better organization
- ✅ Improved food ordering with expanded menu
- ✅ Better billing system with detailed invoices
- ✅ Added data persistence and auto-save functionality

### New Features Added
- 🎨 Modern graphical user interface with animations
- 📊 Real-time dashboard with statistics
- 🏠 Visual room management with status indicators
- 📅 Date-based check-in/check-out system
- 💾 Automatic data backup and recovery
- 🔍 Enhanced search and filtering capabilities
- 📱 Responsive design for better usability