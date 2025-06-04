import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Field } from "react-final-form";
import { composeValidators, required, phoneValid } from "../helpers/validators";

import Input from "../Input";

const UpdateForm = (props) => {
  const { handleSubmit } = props;
  const navigate = useNavigate();

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <Field component={Input} validate={required} label="Name" name="name" />
      <br />
      <Field
        component={Input}
        validate={required}
        label="Surname"
        name="surname"
      />
      <br />
      <Field
        component={Input}
        validate={composeValidators(required, phoneValid)}
        label="Telephone(000-000-0000)"
        name="telephone"
      />
      <br />
      <Button type="submit" variant="contained">
        Update
      </Button>
      <Button
        onClick={() => {
          navigate("/contacts");
        }}
        variant="outlined"
        color="error"
      >
        Cancel
      </Button>
    </form>
  );
};

export default UpdateForm;
