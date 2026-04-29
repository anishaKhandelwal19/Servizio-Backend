import BigPromise from "../utils/bigPromise.js";
import { ControllerResponse } from "../utils/customResponse.js";

import JwtService from "../utils/jwt.service.js";
const auth = BigPromise(async (req, res, next) => {
  // get header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return ControllerResponse(res, 400, null, "unAuthorized");
  }

  // get token
  const token = authHeader.split(" ")[1];
  console.log("---token---", token);

  try {
    const { _id, phone_number, type } = await JwtService.verify(token);
    // set id & phone_number
    req.user = {
      _id,
      phone_number,
      type,
    };

    next();
  } catch (err) {
    console.log(err);
    return ControllerResponse(res, 400, null, "unAuthorized");
  }
});

export default auth;
