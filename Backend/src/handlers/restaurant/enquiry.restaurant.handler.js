import Enquiry from "../../models/Enquiry.js";
import Menu from "../../models/Menu.js";
import BigPromise from "../../utils/bigPromise.js";
import {
    ControllerResponse,
    ErrorHandler,
} from "../../utils/customResponse.js";

// create enquiry
export const createEnquiry = BigPromise(async (req, res) => {
    const { menuId, quantity, totalPrice } = req.body;

    const menu = await Menu.findById(menuId);
    if (!menu) {
        return ErrorHandler(res, "Menu not found", 404);
    }
    const restaurantId = menu.restaurant_id;
    const newEnquiry = new Enquiry({
        customerId: req.user._id,
        restaurantId,
        menuId,
        quantity,
        totalPrice,
        timeToPrepare: menu.timeToPrepare,
    });
    await newEnquiry.save();
    ControllerResponse(res, 200, newEnquiry);
});

// Get all enquiries by customer

export const getEnquiriesByCustomer = BigPromise(async (req, res) => {
    const enquiries = await Enquiry.find({ customerId: req.user._id }).populate("menuId").populate("restaurantId", "name").populate("customerId", "firstName").sort({ updatedAt: -1 });

    ControllerResponse(res, 200, enquiries);
});

// Get all enquiries by restaurant

export const getEnquiriesByRestaurant = BigPromise(async (req, res) => {
    const enquiries = await Enquiry.find({ restaurantId: req.user._id }).populate("menuId").populate("restaurantId", "name").populate("customerId", "firstName").sort({ updatedAt: -1 });

    ControllerResponse(res, 200, enquiries);
});

// Get enquiry by id

export const getEnquiryById = BigPromise(async (req, res) => {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id).populate("menuId").populate("restaurantId", "name").populate("customerId", "firstName");

    if (!enquiry) {
        return ErrorHandler(res, "Enquiry not found", 404);
    }
    ControllerResponse(res, 200, enquiry);
}
);

// Update enquiry status

export const updateEnquiryStatus = BigPromise(async (req, res) => {
    const { id } = req.params;
    const { status, timeToPrepare } = req.body;


    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
        return ErrorHandler(res, "Enquiry not found", 404);
    }
    enquiry.status = status;
    enquiry.timeToPrepare = timeToPrepare ?? enquiry.timeToPrepare;
    await enquiry.save();
    ControllerResponse(res, 200, enquiry);
}
);


