const isEmpty = (string) => {
  if (string===null && string === "" && string.trim() === "") return true;
  else return false;
};
const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};
exports.validateSignUpData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Password is not same";
  }
  if (isEmpty(data.mobilenumber)) {
    errors.mobilenumber = "Must not be empty";
  }
  if (data.mobilenumber && data.mobilenumber.length !== 10)
    errors.mobilenumber = "Must be 10 digit number";

  if (isEmpty(data.username)) {
    errors.username = "Must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.sortJson = (property) => {
  return function (a, b) {
    if (a[property] < b[property]) return 1;
    else if (a[property] > b[property]) return -1;

    return 0;
  };
};
exports.validateNewTransaction = (data) => {
  let errors = {};
  console.log(data,data.amount,!data.amount , data.amount===null , isEmpty(data.amount) , (data.amount) <= 0);
  if (!data.amount)
    errors.amount = "Must not be empty";
  if(  data.amount===null)
errors.amount = "Must not be empty";
    if(isEmpty(data.amount))
errors.amount = "Must not be empty";
      if((data.amount) <= 0)
        errors.amount = "Must not be empty";
  if (!data.toUID && isEmpty(data.toUID)) errors.user = "Not found";
  if (!data.message && isEmpty(data.message)) delete data["message"];
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.validateNewRequest = (data) => {
  let errors = {};
  if (!data.amount)
    errors.amount = "Must not be empty";
  if(  data.amount===null)
errors.amount = "Must not be empty";
    if(isEmpty(data.amount))
errors.amount = "Must not be empty";
      if((data.amount) <= 0)
        errors.amount = "Must not be empty";
  if (data.sender && isEmpty(data.sender)) errors.user = "Not found";
  if (data.message && isEmpty(data.message)) delete data["message"];
  console.log(errors);
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
