import * as yup from "yup";

export default yup.object().shape({
  dateTime: yup.string(),
  level: yup.string().required("Lesson Level cannnot be empty"),
  type: yup.string().required("Lesson Type cannnot be empty"),
  title: yup.string().required("Lesson Title cannnot be empty"),
});
