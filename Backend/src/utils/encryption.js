import bcrypt from "bcrypt";
const saltRounds = 10; // Number of salt rounds for bcrypt (adjust as needed)
import { doubleEncryptData, doubleDecryptData } from "./doubleEncryption.js";

// Function to hash a password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds).then((hash) => {
    return doubleEncryptData(hash);
  });
};

// Function to verify a password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, doubleDecryptData(hashedPassword));
};

export { hashPassword, verifyPassword };

// Q why bcrypt
// A bcrypt is a widely used and trusted library for hashing passwords securely. It incorporates several important security
// bcrypt → Industry-standard library for password hashing.

// Password → bcrypt hash → AES encrypt (using SHA-512 derived key/IV) → store.
