import BigPromise from "../utils/bigPromise.js";
import { ControllerResponse } from "../utils/customResponse.js";

const ifRestaurant = BigPromise(async (req, res, next) => {
  try {
    const { type } = req.user;
    if (type !== "restaurant") {
      return ControllerResponse(res, 400, null, "unAuthorized");
    } else {
      next();
    }
  } catch (err) {
    return ControllerResponse(res, 400, null, "unAuthorized");
  }
});

export default ifRestaurant;
