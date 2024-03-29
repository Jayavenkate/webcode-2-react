import { Button, Card, CardContent } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as yup from "yup";
import { useState } from "react";
import { API } from "../global";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),

  password: yup.string().required("password required").min(8),
});
export function Login() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState("success");
  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        // const data = await fetch(`${API}/login`, {
        //   method: "POST",
        //   body: JSON.stringify(values),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        // });
        // const result = await data.json();
        // console.log(data);

        // localStorage.setItem("token", result.token);
        navigate("/moviebooking");
        // }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="signup" elevation={4}>
        <h2>Login </h2>
        <CardContent className="card-container">
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            variant="outlined"
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          {/* <p>priya@gmail.com</p> */}
          <TextField
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            variant="outlined"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          {/* <p>priyakumar123</p> */}
          {/* <span>
          <Checkbox onClick={togglePassword}aria-label="Checkbox demo"/>
            show password</span> */}
          <Button
            color={formState}
            type="submit"
            variant="contained"
            sx={{ width: "400px" }}
          >
            {formState === "success" ? "Submit" : "Retry"}
          </Button>
          <small
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/login/forgetpassword")}
          >
            forget password?
            <hr style={{ opacity: 0.5, width: "70%" }} />
          </small>
        </CardContent>

        <Button
          color="success"
          variant="contained"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </Card>
    </form>
  );
}
