import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
export function SignUp() {
  const { values, handleChange } = useFormik({
    initialValues: {
      name: "arun",
      email: "arun@gmail.com",
      password: "arun123",
    },
  });
  return (
    <form>
      <div className="signup-page">
        <h2>SignUp </h2>
        <div className="signup-container">
          <TextField
            value={values.name}
            onChange={handleChange}
            label="Name"
            variant="outlined"
          />
          <TextField
            value={values.email}
            onChange={handleChange}
            label="Email"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={values.password}
            label="Password"
            variant="outlined"
          />
          <Button variant="contained">Submit</Button>
        </div>
      </div>
    </form>
  );
}
