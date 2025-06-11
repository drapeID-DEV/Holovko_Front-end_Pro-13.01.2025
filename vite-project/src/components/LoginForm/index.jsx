import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Field } from "react-final-form";
import { required } from "../helpers/validators";

import Input from "../Input";
import PasswordInput from "../PasswordInput";

const LoginForm = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/b/be/ROZETKA-Logo-L3-B-RGB.png" alt="" />
      <Field component={Input} validate={required} label="User Name" name="username" />
      <br />
      <Field
        component={PasswordInput}
        validate={required}
        label="Password"
        name="password"
      />
      <br />
      <Button sx={{ m: 1, width: "277px", height: "56px", borderRadius: "0px", backgroundColor: "#44B26F" }} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
