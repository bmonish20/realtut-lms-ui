import * as yup from "yup";

export default yup.object().shape({
  duration: yup
    .string()
    .matches(/^[0-9]+$/, "Duration must be a number")
    .nullable(),
  forCourse: yup.string().required("Associated Course cannot be empty"),
  title: yup.string().required("Quiz Title cannot be empty"),
});
