import JwtService from "../../utils/jwt.service.js";
import Restaurant from "../../models/Restaurant.js";
import Location from "../../models/Location.js";
import WorkingDays from "../../models/WorkingDays.js";
import RestaurantOwner from "../../models/RestaurantOwner.js";
import BankDetails from "../../models/BankDetails.js";
import BigPromise from "../../utils/bigPromise.js";
import {
  ControllerResponse,
  ErrorHandler,
} from "../../utils/customResponse.js";
import { hashPassword, verifyPassword } from "../../utils/encryption.js";
import { createNewRefreshToken } from "../../services/common/refresh.token.service.js";
import mongoose from "mongoose";

// Sign-up function with transaction
export const register = BigPromise(async (req, res) => {
  const {
    name,
    location,
    workingDays,
    images,
    owner,
    panNumber,
    gstinNumber,
    bankDetails,
    fssaiRegistrationNumber,
    password,
    managementPhone,
    restaurantEmail,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the restaurant already exists
    const existingRestaurant = await Restaurant.findOne({
      $or: [{ restaurantEmail }, { name }],
    }).session(session);

    if (existingRestaurant) {
      await session.abortTransaction();
      session.endSession();
      return ErrorHandler(res, "Restaurant already exists", 400);
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create related sub-documents
    const locationDoc = await Location.create([location], { session });
    const workingDaysDoc = await WorkingDays.insertMany(workingDays, {
      session,
    });
    const ownerDoc = await RestaurantOwner.create([owner], { session });
    const bankDetailsDoc = await BankDetails.create([bankDetails], { session });

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      location: locationDoc[0]._id,
      workingDays: workingDaysDoc.map((item) => item._id),
      owner: ownerDoc[0]._id,
      panNumber,
      images,
      gstinNumber,
      bankDetails: bankDetailsDoc[0]._id,
      fssaiRegistrationNumber,
      password: hashedPassword,
      managementPhone,
      restaurantEmail,
    });

    await newRestaurant.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Generate access and refresh tokens
    const access_token = JwtService.sign({
      _id: newRestaurant._id,
      phone_number: newRestaurant.managementPhone,
      email: newRestaurant.restaurantEmail,
      type: "restaurant",
    });

    const refresh_token = JwtService.sign(
      {
        _id: newRestaurant._id,
        phone_number: newRestaurant.managementPhone,
        email: newRestaurant.restaurantEmail,
        type: "restaurant",
      },
      "30d",
      process.env.REFRESH_TOKEN_KEY
    );

    // Save the refresh token
    await createNewRefreshToken(refresh_token);

    //delete password from the response
    newRestaurant.password = undefined;

    // Send the response with restaurant details and tokens
    ControllerResponse(res, 200, {
      ...newRestaurant._doc,
      access_token,
      refresh_token,
    });
  } catch (error) {
    session.endSession();
    return ErrorHandler(res, error.message, 500);
  }
});

// Login function
export const login = BigPromise(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return ErrorHandler(res, "Email and password are required", 400);
  }

  // Find the restaurant owner by email
  const restaurant = await Restaurant.findOne({ restaurantEmail: email });
  if (!restaurant) {
    return ErrorHandler(res, "Restaurant not found", 400);
  }

  // Check if the password is correct
  const isPasswordValid = await verifyPassword(password, restaurant.password);
  if (!isPasswordValid) {
    return ErrorHandler(res, "Invalid password", 400);
  }

  // Generate access and refresh tokens
  const access_token = JwtService.sign({
    _id: restaurant._id,
    phone_number: restaurant.managementPhone,
    email: restaurant.email,
    type: "restaurant",
  });

  const refresh_token = JwtService.sign(
    {
      _id: restaurant._id,
      phone_number: restaurant.managementPhone,
      email: restaurant.email,
      type: "restaurant",
    },
    "30d",
    process.env.REFRESH_TOKEN_KEY
  );

  // Save the refresh token
  await createNewRefreshToken(refresh_token);
  // delete password from the response
  restaurant.password = undefined;
  // Send the response with restaurant details and tokens
  ControllerResponse(res, 200, {
    ...restaurant._doc,
    access_token,
    refresh_token,
  });
});
