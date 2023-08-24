import * as yup from "yup";

export default yup.object().shape({
  points: yup
    .string()
    .matches(/^[0-9]+$/, "Points must be a number")
    .required()
    .nullable(),
  type: yup.string().required("Type cannot be empty"),
  question: yup.string().required("Question cannot be empty"),
});
