import BigPromise from "../../utils/bigPromise.js";
import {
  ControllerResponse,
  ErrorHandler,
} from "../../utils/customResponse.js";
import Customer from "../../models/Customer.js";
import { verifyPassword, hashPassword } from "../../utils/encryption.js";
import { createNewRefreshToken } from "../../services/common/refresh.token.service.js";
import {
  findCustomerByEmail,
  createNewCustomer,
} from "../../services/customer/auth.customer.service.js";
import JwtService from "../../utils/jwt.service.js";

export const login = BigPromise(async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });
  if (!customer) {
    return ErrorHandler(res, "Invalid email or password", 400);
  }
  const isMatch = await verifyPassword(password, customer.password);
  if (!isMatch) {
    return ErrorHandler(res, "Invalid email or password", 400);
  }
  const access_token = JwtService.sign({
    _id: customer._id,
    phone_number: customer.phoneNumber,
    email: customer.email,
    type: "customer",
  });

  const refresh_token = JwtService.sign(
    {
      _id: customer._id,
      phone_number: customer.phoneNumber,
      email: customer.email,
      type: "customer",
    },
    "30d",
    process.env.REFRESH_TOKEN_KEY
  );
  await createNewRefreshToken(refresh_token);
  delete customer._doc.password;
  return ControllerResponse(
    res,
    200,
    {
      ...customer._doc,
      refresh_token,
      access_token,
    },
    "Login Successful!"
  );
});

export const register = BigPromise(async (req, res) => {
  const { email } = req.body;
  const customer = await findCustomerByEmail(email);
  if (customer) {
    return ErrorHandler(res, "Email already exists", 400);
  }
  req.body.password = await hashPassword(req.body.password);
  const newCustomer = await createNewCustomer(req);
  const access_token = JwtService.sign({
    _id: newCustomer._id,
    phone_number: newCustomer.phoneNumber,
    email: newCustomer.email,
    type: "customer",
  });

  const refresh_token = JwtService.sign(
    {
      _id: newCustomer._id,
      phone_number: newCustomer.phoneNumber,
      email: newCustomer.email,
      type: "customer",
    },
    "30d",
    process.env.REFRESH_TOKEN_KEY
  );
  await createNewRefreshToken(refresh_token);
  delete newCustomer._doc.password;
  return ControllerResponse(
    res,
    200,
    {
      ...newCustomer._doc,
      refresh_token,
      access_token,
    },
    "Registered Successful!"
  );
});
