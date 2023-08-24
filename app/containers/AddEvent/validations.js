import * as yup from "yup";

export default yup.object().shape({
  type: yup.string().required("Event type must be selected"),
  description: yup.string(),
  shortDescription: yup
    .string()
    .required("Summary cannot be empty")
    .max(250, "Summary cannot exceed 250 characters"),
  participants: yup
    .string()
    .matches(/^[0-9]+$/, "Participants must be a number")
    .nullable(),
  dateTime: yup.string().required("Event date cannot be empty"),
  title: yup.string().required("Title cannot be empty"),
});
