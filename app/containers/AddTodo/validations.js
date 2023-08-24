import * as yup from "yup";

export default yup.object().shape({
  description: yup.string(),
  status: yup.string().required("Todo status cannot be empty"),
  priority: yup.string().required("Todo must have a priority"),
  time: yup.string(),
  dueDate: yup.string().required("Date cannot be empty"),
  todoName: yup.string().required("Todo Title cannot be empty"),
});
