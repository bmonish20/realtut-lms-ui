import * as yup from "yup";

export default yup.object().shape({
  description: yup.string().required("Description cannot be empty"),
  category: yup.string().required("Category cannot be empty"),
  title: yup.string().required("Title cannot be empty"),
});