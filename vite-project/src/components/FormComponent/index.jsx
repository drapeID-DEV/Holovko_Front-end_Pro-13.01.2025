import { useContext, useState } from "react";
import ContactContext from "../../contexts/ContactContaxt";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";

function FormComponent(props) {
  const { addContact, backToForm } = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: "",
    surname: "",
    telephone: "",
  });

  const navigate = useNavigate();

  function handleSubmit(event) {
    debugger;
    event.preventDefault();
    addContact(contact);
    setContact({
      name: "",
      surname: "",
      telephone: "",
    });
  }

  function handleNameChange(event) {
    setContact((prevContact) => ({
      ...prevContact,
      name: event.target.value,
    }));
  }

  function handleSurnameChange(event) {
    setContact((prevContact) => ({
      ...prevContact,
      surname: event.target.value,
    }));
  }

  function handleTelChange(event) {
    setContact((prevContact) => ({
      ...prevContact,
      telephone: event.target.value,
    }));
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Add contact</h3>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={contact.name}
          onChange={handleNameChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Surname"
          variant="outlined"
          value={contact.surname}
          onChange={handleSurnameChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Telephone(000-000-0000)"
          variant="outlined"
          value={contact.telephone}
          onChange={handleTelChange}
          required
        />
        <div className="form-controls">
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
        </div>
      </form>
    </>
  );
}

export default FormComponent;
