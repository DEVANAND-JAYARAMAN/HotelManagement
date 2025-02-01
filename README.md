Hotel Management System Documentation
This is a Java program designed to manage hotel room bookings, room availability, food orders, and generate customer bills. The system supports the booking of luxury and deluxe single and double rooms, food orders for each room, and calculates the total cost including both room charges and food charges.

Classes and Their Functions
1. Food Class
Purpose: Represents food items ordered by customers.
Attributes:
itemno: The item number of the food item.
quantity: The quantity of the food item ordered.
price: The price of the ordered food, calculated based on the quantity.
Constructor:
The constructor calculates the price based on the itemno and quantity.
2. Singleroom Class
Purpose: Represents a single room booking with customer details.
Attributes:
name: Name of the customer.
contact: Contact number of the customer.
gender: Gender of the customer.
food: A list of food items ordered in the room.
Constructors:
Default constructor initializes the name to an empty string.
A parameterized constructor to set customer details.
3. Doubleroom Class
Purpose: Represents a double room booking, supporting two customers.
Attributes:
name2, contact2, gender2: Second customer's details.
Constructors:
Default constructor initializes names and contacts to empty strings.
A parameterized constructor to set both customers' details.
4. NotAvailable Class
Purpose: Custom exception class used when a room is not available for booking.
Methods:
toString(): Returns a custom message when an exception occurs, stating that the room is not available.
5. Holder Class
Purpose: Holds arrays of available rooms of different types.
Attributes:
Arrays of Doubleroom and Singleroom for both luxury and deluxe room categories.
6. HotelManagement Class
Purpose: The main class that runs the hotel management system.
Methods:
CustDetails(int i, int rn): Collects and stores customer details for a room.
bookroom(int i): Books a room of a specified type (luxury or deluxe, single or double).
features(int i): Displays the features and charges for a selected room type.
availability(int i): Displays the number of available rooms of a selected type.
bill(int rn, int rtype): Generates a bill for the customer, including room charges and food charges.
addfood(int i, int rn): Allows adding food items to a room's order.
main(String[] args): The main method that runs the system, allowing the user to book rooms, check availability, add food, and generate bills.
Room Types and Pricing
Luxury Double Room:

Features: AC, free breakfast, 1 double bed.
Charge per day: 4000
Deluxe Double Room:

Features: No AC, free breakfast, 1 double bed.
Charge per day: 3000
Luxury Single Room:

Features: AC, free breakfast, 1 single bed.
Charge per day: 2200
Deluxe Single Room:

Features: No AC, free breakfast, 1 single bed.
Charge per day: 1200
Food Items Available
Sandwich
Pasta
Noodles
Coke
Each food item has a corresponding price based on the item number and the quantity ordered.
