import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string("")
    .required("Email cannot be empty!")
    .email("Please enter a valid email!"),
  name: yup.string().required("Name cannot be empty"),
});
