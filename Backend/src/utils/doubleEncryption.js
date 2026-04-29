import crypto from "crypto";
const { SECRET_KEY, SECRET_IV, ECNRYPTION_METHOD } = process.env;

// const { secret_key, secret_iv, ecnryption_method } = encryptionConfig
const secret_key = SECRET_KEY;
const secret_iv = SECRET_IV;
const ecnryption_method = ECNRYPTION_METHOD;

if (!secret_key || !secret_iv || !ecnryption_method) {
  throw new Error("secretKey, secretIV, and ecnryptionMethod are required");
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash("sha512")
  .update(secret_key)
  .digest("hex")
  .substring(0, 32);
const encryptionIV = crypto
  .createHash("sha512")
  .update(secret_iv)
  .digest("hex")
  .substring(0, 16);

// Encrypt data
export function doubleEncryptData(data) {
  const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
}

// Decrypt data
export function doubleDecryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(
    ecnryption_method,
    key,
    encryptionIV
  );
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
}

// crypto.createCipheriv(algorithm, key, iv) → Creates an AES cipher instance with the specified method, key, and IV.
// cipher.update(data, "utf8", "hex") → Encrypts the input string from UTF-8 to hex.
// cipher.final("hex") → Completes encryption for remaining bytes.
// Buffer.from(...).toString("base64") → Converts the hex string to base64.
// Base64 is safer for storing in databases or sending over JSON.

// Plain text (UTF-8) → AES encryption → hex → base64 → store/send

//decryption
// Buffer.from(encryptedData, "base64") → Converts the base64 string back to hex.
// crypto.createDecipheriv(algorithm, key, iv) → Creates an AES decipher instance.
// decipher.update(buff.toString("utf8"), "hex", "utf8") → Converts hex back to UTF-8 text.
// decipher.final("utf8") → Completes decryption.

//Double encryption only hides the token from being easily read, but if B steals the encrypted token string, they can still send it to the server and get verified because:
