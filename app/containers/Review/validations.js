import * as yup from "yup";

export default yup.object().shape({
  response: yup.array().of(
    yup.object().shape({
      mark: yup.string().matches(/^[0-9]+$/, "Mark must be a number"),
      comment: yup.string(),
    })
  ),
});
