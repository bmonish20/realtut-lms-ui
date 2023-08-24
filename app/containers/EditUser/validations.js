import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default yup.object().shape({
  role: yup.string().required("Role cannot be empty"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10, "Mobile Number cannot exceed 10 digits"),
  email: yup
    .string()
    .required("Email Address cannnot be empty")
    .email("Invalid Email"),
  lastName: yup.string().required("Last Name cannnot be empty"),
  firstName: yup.string().required("First Name cannot be empty"),
});
