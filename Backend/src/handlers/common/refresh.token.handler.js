import {
  ControllerResponse,
  ErrorHandler,
} from "../../utils/customResponse.js";
import BigPromise from "../../utils/bigPromise.js";
import JwtService from "../../utils/jwt.service.js";
import {
  createNewRefreshToken,
  deleteRefreshToken,
  findToken,
} from "../../services/common/refresh.token.service.js";

export const refresh = BigPromise(async (req, res) => {
  try {
    if (!req.body.refresh_token) {
      return ErrorHandler(res, 400, "Token is required");
    }

    // check if token is in db.
    const refreshToken = await findToken();

    if (!refreshToken) {
      return ErrorHandler(res, 400, "Invalid refresh token");
    }

    // get _id & phone_number
    const { _id, phone_number, type } = JwtService.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_KEY
    );

    // generate access token
    const access_token = JwtService.sign({
      _id,
      phone_number,
      type,
    });

    // generate refresh token
    const refresh_token = JwtService.sign(
      {
        _id,
        phone_number,
        type,
      },
      "30d",
      process.env.REFRESH_TOKEN_KEY
    );

    // store refresh token in database
    await createNewRefreshToken(refresh_token);

    // remove old refresh token from database
    await deleteRefreshToken(req);

    return ControllerResponse(res, 200, { access_token, refresh_token });
  } catch (error) {
    return ErrorHandler(res, 500, error.message || "Internal Server Error");
  }
});
