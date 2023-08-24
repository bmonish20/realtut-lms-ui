import * as yup from "yup";

export default yup.object().shape({
  description: yup.string().required("Description cannot be empty"),
  shortDescription: yup
    .string()
    .required("Summary cannot be empty")
    .max(250, "Summary cannot exceed 250 characters"),
  duration: yup.string().required("Course duration cannot be empty"),
  startDate: yup.string().required("Cousre start date cannot be empty"),
  type: yup.string().required("Course type must be selected"),
  title: yup.string().required("Title cannot be empty"),
});
