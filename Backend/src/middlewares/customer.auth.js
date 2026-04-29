import BigPromise from "../utils/bigPromise.js";
import { ControllerResponse } from "../utils/customResponse.js";

const ifcustomer = BigPromise(async (req, res, next) => {
  try {
    console.log("req.user", req.user);
    const { type } = req.user;
    if (type !== "customer") {
      return ControllerResponse(res, 400, null, "unAuthorized");
    } else {
      next();
    }
  } catch (err) {
    return ControllerResponse(res, 400, null, "unAuthorized");
  }
});

export default ifcustomer;
