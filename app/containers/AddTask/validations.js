import * as yup from "yup";

export default yup.object().shape({
  description: yup.string(),
  status: yup.string().required("Task status cannot be empty"),
  priority: yup.string().required("Task must have a priority"),
  time: yup.string(),
  dueDate: yup.string(),
  startDate: yup.string(),
  taskName: yup.string().required("Task Title cannot be empty"),
});
