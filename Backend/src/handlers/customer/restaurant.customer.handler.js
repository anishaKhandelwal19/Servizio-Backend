import BigPromise from "../../utils/bigPromise.js";
import {
    ControllerResponse,
    ErrorHandler,
} from "../../utils/customResponse.js";
import Restaurant from "../../models/Restaurant.js";
import WorkingDays from "../../models/WorkingDays.js";
import mongoose from "mongoose";




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
}
);
export const putFavoriteRestaurant = BigPromise(async (req, res) => {
    const { restaurant_id } = req.params;
    const customerId = mongoose.Types.ObjectId(req.user._id);
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
        return ErrorHandler(res, 404, "Restaurant not found");
    }
    await Restaurant.findByIdAndUpdate
        (restaurant_id, {
            $addToSet: { favoriteBy: customerId },
        });
    return ControllerResponse(res, 200, restaurant, "Restaurant added to favorite");
}
);
export const deleteFavoriteRestaurant = BigPromise(async (req, res) => {
    const { restaurant_id } = req.params;
    const customerId = mongoose.Types.ObjectId(req.user._id);
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
        return ErrorHandler(res, "Restaurant not found", 404);
    }
    await Restaurant.findByIdAndUpdate
        (restaurant_id, {
            $pull: { favoriteBy: customerId },
        });

    return ControllerResponse(res, 200, restaurant, "Restaurant removed from favorite");
}
);
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
                return data || day; // Return day if no data is found to avoid undefined assignments
            })
        );

        restaurant._doc.workingDays = workingDays;
    }
    return ControllerResponse(res, 200, restaurants, "Favorite restaurants found");
}
);
export const getRestaurants = BigPromise(async (req, res) => {
    try {
        const restaurants = await Restaurant.find({

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
                    return data || day; // Return day if no data is found to avoid undefined assignments
                })
            );

            restaurant._doc.workingDays = workingDays;
        }

        return ControllerResponse(res, 200, restaurants, "Restaurants found");
    } catch (error) {
        return ErrorHandler(res, "Error in fetching restaurants", 500);
    }
}
);

