import { useContext } from "react";
import ContactContext from "../../contexts/ContactContaxt";
import Button from '@mui/material/Button';

function Contact(props) {
  const { removeContact } = useContext(ContactContext);

  return (
    <>
      <div className="contact-container">
        <div className="contact-field contact-name">{props.contact.name}</div>
        <div className="contact-field contact-surname">
          {props.contact.surname}
        </div>
        <div className="contact-field contact-telephone">
          {props.contact.telephone}
        </div>
        <Button color="error" variant="contained" onClick={() => removeContact(props.id)}>Delete</Button>
      </div>
    </>
  );
}

export default Contact;
