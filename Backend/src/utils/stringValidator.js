export function emailValidator(email) {
  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (validRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}
