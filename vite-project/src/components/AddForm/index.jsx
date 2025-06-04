import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { Field } from "react-final-form";
import { composeValidators, required, phoneValid } from "../helpers/validators";

import Input from "../Input";

const AddForm = (props) => {
  const { handleSubmit } = props;

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
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
        Add
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

export default AddForm;
