import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../redux/slice/user";

import { nanoid } from "@reduxjs/toolkit";
import { CREATE_USER, UPDATE_USER_BY_ID } from "../redux/types";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const MyForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const userToUpdate = {
      ...values,
      id: values.id === 0 ? nanoid(8) : values.id,
    };

    if (user.id === 0) {
      dispatch({ type: CREATE_USER, user: userToUpdate });
    } else {
      dispatch({ type: UPDATE_USER_BY_ID, user: userToUpdate });
    }

    dispatch(
      setUserSlice({
        id: 0,
        name: "",
        email: "",
        password: "",
      })
    );
    resetForm();
  };
    
    
  return (
    <Container>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
            style={{ margin: "10px" }}
            name="id"
            margin="normal"
            disabled
          />

          <Field
            as={Input}
            style={{ margin: "10px" }}
            name="name"
            placeholder="Enter Name"
            fullWidth
          />
          <ErrorMessage
            name="name"
            component="div"
            style={{ color: "red", margin: "5px" }}
          />

          <Field
            as={Input}
            style={{ margin: "10px" }}
            name="email"
            placeholder="Enter Email"
            fullWidth
          />
          <ErrorMessage
            name="email"
            component="div"
            style={{ color: "red", margin: "5px" }}
          />

          <Field
            as={Input}
            style={{ margin: "10px" }}
            name="password"
            type="password"
            placeholder="Enter Password"
            fullWidth
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red", margin: "5px" }}
          />

          <Button
            style={{ margin: "10px" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default MyForm;
