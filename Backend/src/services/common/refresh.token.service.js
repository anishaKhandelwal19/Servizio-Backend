import RefreshToken from "../../models/RefreshToken.js";

export async function deleteRefreshToken(req) {
  await RefreshToken.findOneAndDelete({ token: req.body.refresh_token });
}

export async function createNewRefreshToken(refresh_token) {
  await RefreshToken.create({ token: refresh_token });
}
export async function findToken() {
  return await RefreshToken.findOne({
    token: req.body.refresh_token,
  });
}
