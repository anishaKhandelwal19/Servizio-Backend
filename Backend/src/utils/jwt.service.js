import jwt from "jsonwebtoken";
import { doubleEncryptData, doubleDecryptData } from "./doubleEncryption.js";

class JwtService {
  // Set expiry to 365 days by default
  static sign(payload, expiry = "365d", secret = process.env.ACCESS_TOKEN_KEY) {
    if (!secret) {
      throw new Error("Secret key is not defined");
    }

    const jwtToken = jwt.sign(payload, secret, { expiresIn: expiry });
    return doubleEncryptData(jwtToken);
  }

  static verify(token, secret = process.env.ACCESS_TOKEN_KEY) {
    if (!secret) {
      throw new Error("Secret key is not defined");
    }
    try {
      const decryptedToken = doubleDecryptData(token);
      const verified = jwt.verify(decryptedToken, secret);
      console.log("Token verified successfully", verified);
      return verified;
    } catch (error) {
      console.error("Invalid Token", error);
      throw new Error("Invalid Token");
    }
  }
}

export default JwtService;

//jwt structure --> header payload signature.

// : What is the flow of this code?

// User logs in / signs up → Backend creates a JWT token (contains user data like id, email).
// JwtService.sign() is called →
// Takes user data (payload), signs it with ACCESS_TOKEN_KEY, and sets an expiry (default 365 days).
// After signing, it double encrypts the JWT for extra security.
// Returns the encrypted token to the client.
// Later, when the client makes a request with this token →
// JwtService.verify() is called → decrypts the token → verifies it with the same secret key → extracts the original payload.
// If verification succeeds → request is allowed. If not → Invalid Token error is thrown.

//sign() → Creates a secure token for authentication.
// verify() → Validates that the token is legit and unaltered.

// This file is a JWT utility service that handles creating and validating tokens with extra encryption. It ensures secure authentication for API requests.
