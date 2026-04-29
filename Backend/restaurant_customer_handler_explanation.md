# Restaurant Customer Handler - Complete Code Explanation

## File: `src/handlers/customer/restaurant.customer.handler.js`

### Table of Contents
1. [File Overview](#file-overview)
2. [Imports Section](#imports-section)
3. [getRestaurantById Function](#getrestaurantbyid-function)
4. [putFavoriteRestaurant Function](#putfavoriterestaurant-function)
5. [deleteFavoriteRestaurant Function](#deletefavoriterestaurant-function)
6. [getFavoriteRestaurants Function](#getfavoriterestaurants-function)
7. [getRestaurants Function](#getrestaurants-function)
8. [Architecture Benefits](#architecture-benefits)

---

## File Overview

This is a **handler file** for customer-related restaurant operations in a Node.js/Express backend application. Handlers are responsible for processing HTTP requests and responses, acting as an intermediary between the controller and the database.

**Purpose**: Provides CRUD operations for customers to interact with restaurant data while maintaining security and performance.

---

## Imports Section

```javascript
import BigPromise from "../../utils/bigPromise.js";
import {
    ControllerResponse,
    ErrorHandler,
} from "../../utils/customResponse.js";
import Restaurant from "../../models/Restaurant.js";
import WorkingDays from "../../models/WorkingDays.js";
import mongoose from "mongoose";
```

### What Each Import Does:

1. **`BigPromise`**: 
   - A utility wrapper that handles async/await operations
   - Provides consistent error handling across all functions
   - Wraps async functions to catch and handle errors automatically

2. **`ControllerResponse` & `ErrorHandler`**: 
   - Utility functions for standardized API responses
   - `ControllerResponse`: Sends successful responses with consistent format
   - `ErrorHandler`: Sends error responses with proper HTTP status codes

3. **`Restaurant`**: 
   - Mongoose model for restaurant data
   - Defines the schema and provides methods for database operations

4. **`WorkingDays`**: 
   - Mongoose model for restaurant working hours
   - Stores information about when restaurants are open

5. **`mongoose`**: 
   - MongoDB ODM (Object Document Mapper) library
   - Provides tools for database operations and data validation

---

## getRestaurantById Function

```javascript
export const getRestaurantById = BigPromise(async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id, {
        password: 0,
        __v: 0,
        panNumber: 0,
        gstinNumber: 0,
        fssaiRegistrationNumber: 0,
        managementPhone: 0,
        restaurantEmail: 0,
        bankDetails: 0,
        owner: 0,
    }).populate("location");

    if (!restaurant) {
        return ErrorHandler(res, "Restaurant not found", 404);
    }
    restaurant.password = undefined;

    const workingDays = await Promise.all(
        restaurant.workingDays.map(async (day) => {
            const data = await WorkingDays.findById(day);
            console.log("here", data);
            return data || day; // Return day if no data is found to avoid undefined assignments
        })
    );

    restaurant._doc.workingDays = workingDays;

    return ControllerResponse(res, 200, restaurant, "Restaurant found");
});
```

### Step-by-Step Breakdown:

1. **Function Declaration**: 
   - Uses `BigPromise` wrapper for automatic error handling
   - Takes `req` (request) and `res` (response) parameters

2. **Extract ID**: 
   - Gets restaurant ID from URL parameters (`req.params.id`)
   - Example: `/restaurants/123` → `id = "123"`

3. **Database Query with Field Exclusion**:
   ```javascript
   const restaurant = await Restaurant.findById(id, {
       password: 0,           // Excludes password for security
       __v: 0,               // Excludes MongoDB version field
       panNumber: 0,         // Excludes PAN number (sensitive business data)
       gstinNumber: 0,       // Excludes GSTIN number
       fssaiRegistrationNumber: 0, // Excludes FSSAI registration
       managementPhone: 0,   // Excludes management contact
       restaurantEmail: 0,   // Excludes restaurant email
       bankDetails: 0,       // Excludes bank account details
       owner: 0,             // Excludes owner information
   }).populate("location");
   ```

4. **`.populate("location")`**: 
   - Fetches related location data instead of just the location ID
   - Converts `location: "507f1f77bcf86cd799439011"` to full location object

5. **Error Handling**: 
   - Returns 404 error if restaurant doesn't exist in database

6. **Working Days Processing**:
   ```javascript
   const workingDays = await Promise.all(
       restaurant.workingDays.map(async (day) => {
           const data = await WorkingDays.findById(day);
           return data || day; // Fallback to original day if data not found
       })
   );
   ```
   - Maps through working day IDs
   - Fetches full working day objects from database
   - Uses `Promise.all()` for parallel execution (faster than sequential)
   - Fallback mechanism to prevent undefined values

7. **Response**: 
   - Returns restaurant data with populated working days
   - Uses standardized response format

---

## putFavoriteRestaurant Function

```javascript
export const putFavoriteRestaurant = BigPromise(async (req, res) => {
    const { restaurant_id } = req.params;
    const customerId = mongoose.Types.ObjectId(req.user._id);
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
        return ErrorHandler(res, 404, "Restaurant not found");
    }
    await Restaurant.findByIdAndUpdate(restaurant_id, {
        $addToSet: { favoriteBy: customerId },
    });
    return ControllerResponse(res, 200, restaurant, "Restaurant added to favorite");
});
```

### Purpose: 
Adds a restaurant to customer's favorites list.

### Key Operations:

1. **Extract IDs**: 
   - Gets restaurant ID from URL parameters
   - Gets customer ID from authenticated user session

2. **Convert to ObjectId**: 
   ```javascript
   const customerId = mongoose.Types.ObjectId(req.user._id);
   ```
   - Ensures proper MongoDB ObjectId format
   - Prevents type mismatches in database queries

3. **Verify Restaurant**: 
   - Checks if restaurant exists before adding to favorites
   - Returns 404 if restaurant not found

4. **Update Database**: 
   ```javascript
   await Restaurant.findByIdAndUpdate(restaurant_id, {
       $addToSet: { favoriteBy: customerId },
   });
   ```
   - Uses `$addToSet` MongoDB operator
   - Adds customer ID to `favoriteBy` array
   - **Prevents duplicates** - won't add same customer twice

5. **Response**: 
   - Returns success message with restaurant data

---

## deleteFavoriteRestaurant Function

```javascript
export const deleteFavoriteRestaurant = BigPromise(async (req, res) => {
    const { restaurant_id } = req.params;
    const customerId = mongoose.Types.ObjectId(req.user._id);
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
        return ErrorHandler(res, "Restaurant not found", 404);
    }
    await Restaurant.findByIdAndUpdate(restaurant_id, {
        $pull: { favoriteBy: customerId },
    });

    return ControllerResponse(res, 200, restaurant, "Restaurant removed from favorite");
});
```

### Purpose: 
Removes a restaurant from customer's favorites list.

### Key Difference from putFavoriteRestaurant:
- Uses `$pull` instead of `$addToSet`
- `$pull` removes the customer ID from the `favoriteBy` array
- `$addToSet` adds the customer ID to the array

### Operations:
1. **Same ID extraction and validation** as putFavoriteRestaurant
2. **Database Update**: 
   ```javascript
   await Restaurant.findByIdAndUpdate(restaurant_id, {
       $pull: { favoriteBy: customerId },
   });
   ```
3. **Response**: Returns success message

---

## getFavoriteRestaurants Function

```javascript
export const getFavoriteRestaurants = BigPromise(async (req, res) => {
    const customerId = mongoose.Types.ObjectId(req.user._id);
    const restaurants = await Restaurant.find({
        favoriteBy: { $in: [customerId] },
    }, {
        password: 0,
        __v: 0,
        panNumber: 0,
        gstinNumber: 0,
        fssaiRegistrationNumber: 0,
        managementPhone: 0,
        restaurantEmail: 0,
        bankDetails: 0,
        owner: 0,
    }).populate("location");
    
    for (let restaurant of restaurants) {
        restaurant.password = undefined;

        const workingDays = await Promise.all(
            restaurant.workingDays.map(async (day) => {
                const data = await WorkingDays.findById(day);
                console.log("here", data);
                return data || day;
            })
        );

        restaurant._doc.workingDays = workingDays;
    }
    return ControllerResponse(res, 200, restaurants, "Favorite restaurants found");
});
```

### Purpose: 
Gets all restaurants that the customer has favorited.

### Key Operations:

1. **Query with `$in` operator**: 
   ```javascript
   const restaurants = await Restaurant.find({
       favoriteBy: { $in: [customerId] },
   }, {
       // field exclusions...
   }).populate("location");
   ```
   - `$in` finds restaurants where customer ID is in the `favoriteBy` array
   - Same security exclusions as other functions
   - Populates location data

2. **Process Multiple Restaurants**: 
   - Loops through all found restaurants
   - Applies same working days processing as `getRestaurantById`
   - Updates each restaurant's working days data

3. **Response**: Returns array of favorite restaurants with complete data

---

## getRestaurants Function

```javascript
export const getRestaurants = BigPromise(async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}, {
            password: 0,
            __v: 0,
            panNumber: 0,
            gstinNumber: 0,
            fssaiRegistrationNumber: 0,
            managementPhone: 0,
            restaurantEmail: 0,
            bankDetails: 0,
            owner: 0,
        }).populate("location");

        for (let restaurant of restaurants) {
            restaurant.password = undefined;

            const workingDays = await Promise.all(
                restaurant.workingDays.map(async (day) => {
                    const data = await WorkingDays.findById(day);
                    console.log("here", data);
                    return data || day;
                })
            );

            restaurant._doc.workingDays = workingDays;
        }

        return ControllerResponse(res, 200, restaurants, "Restaurants found");
    } catch (error) {
        return ErrorHandler(res, "Error in fetching restaurants", 500);
    }
});
```

### Purpose: 
Gets all restaurants in the system (no filtering).

### Key Features:

1. **Empty Query**: 
   ```javascript
   const restaurants = await Restaurant.find({}, {
       // field exclusions...
   }).populate("location");
   ```
   - `{}` means no filters - gets all restaurants
   - Same security exclusions as other functions

2. **Additional Error Handling**: 
   - Has `try-catch` block beyond `BigPromise` wrapper
   - Provides more specific error handling for this function

3. **Same Processing**: 
   - Loops through all restaurants
   - Processes working days for each restaurant
   - Returns complete restaurant list

---

## Architecture Benefits

### 1. **Separation of Concerns**
- Handlers separate business logic from controllers
- Controllers handle routing, handlers handle data processing
- Makes code more maintainable and testable

### 2. **Security**
- Sensitive data (passwords, business details) excluded from customer responses
- Customer can only see public restaurant information
- Prevents data leakage

### 3. **Performance**
- Uses `populate()` for efficient related data fetching
- `Promise.all()` for parallel database operations
- Reduces number of database queries

### 4. **Error Handling**
- Consistent error responses across all functions
- `BigPromise` wrapper provides automatic error catching
- Proper HTTP status codes for different error types

### 5. **Data Integrity**
- Uses MongoDB operators like `$addToSet` and `$pull` for array operations
- Prevents duplicate entries in favorites
- Ensures data consistency

### 6. **Code Reusability**
- Common patterns repeated across functions
- Consistent field exclusions and data processing
- Easy to maintain and extend

---

## Complete File Summary

This handler file provides a complete interface for customers to:
- ✅ View individual restaurant details
- ✅ View all restaurants
- ✅ Add restaurants to favorites
- ✅ Remove restaurants from favorites  
- ✅ View their favorite restaurants

All operations maintain security by excluding sensitive data and provide consistent error handling and response formats.

---

## Usage Examples

### API Endpoints (typical usage):
- `GET /restaurants/:id` → `getRestaurantById`
- `GET /restaurants` → `getRestaurants`
- `PUT /restaurants/:restaurant_id/favorite` → `putFavoriteRestaurant`
- `DELETE /restaurants/:restaurant_id/favorite` → `deleteFavoriteRestaurant`
- `GET /restaurants/favorites` → `getFavoriteRestaurants`

### Database Schema (implied):
```javascript
// Restaurant Schema
{
  _id: ObjectId,
  name: String,
  location: ObjectId, // Reference to Location model
  workingDays: [ObjectId], // Array of WorkingDays references
  favoriteBy: [ObjectId], // Array of customer IDs who favorited this restaurant
  password: String, // Excluded from customer responses
  panNumber: String, // Excluded from customer responses
  // ... other fields
}
```

This handler file is a well-structured example of Node.js/Express backend development with MongoDB, following REST API best practices and security considerations.

