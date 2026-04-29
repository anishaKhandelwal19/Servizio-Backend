import Menu from "../../models/Menu.js";
import BigPromise from "../../utils/bigPromise.js";
import {
    ControllerResponse,
    ErrorHandler,
} from "../../utils/customResponse.js";



// add menu item
export const addMenuItem = BigPromise(async (req, res) => {
    const { name, price, images, timeToPrepare, category, description } = req.body;
    const restaurant_id = req.user._id;

    const newMenuItem = new Menu({
        name,
        price,
        images,
        timeToPrepare,
        category,
        description,
        restaurant_id,
    });

    await newMenuItem.save();
    ControllerResponse(res, 200, newMenuItem);
});



// Get all menu items
export const getMenu = BigPromise(async (req, res) => {
    const { search_query } = req.query;

    if (search_query) {
        const menu = await Menu.find({
            name: { $regex: search_query, $options: "i" },
        });
        return ControllerResponse(res, 200, menu);
    }
    else {
        const menu = await Menu.find();
        return ControllerResponse(res, 200, menu);
    }

});

// Get menu item by id

export const getMenuItemById = BigPromise(async (req, res) => {
    const { id } = req.params;
    const menuItem = await Menu.findById(id).populate("restaurant_id",
        "_id name"

    );
    if (!menuItem) {
        return ErrorHandler(res, "Menu item not found", 404);
    }
    ControllerResponse(res, 200, menuItem);
});

// Get menu items by restaurant id
export const getMenuByRestaurantId = BigPromise(async (req, res) => {
    const { restaurant_id } = req.params;
    const menu = await Menu.find({ restaurant_id });
    ControllerResponse(res, 200, menu);
});
// Rate menu
export const rateMenu = BigPromise(async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    const menu = await Menu.findById(id);
    if (!menu) {
        return ErrorHandler(res, "Menu not found", 404);
    }
    menu.ratings.push({ customer_id: req.user._id, score: rating });
    await menu.save();

    ControllerResponse(res, 200, menu);
}
);