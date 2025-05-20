import { useContext } from "react";
import ContactContext from "../../contexts/ContactContaxt";
import { Button, List, ListItem, ListItemText } from "@mui/material";

function ContactsList() {
  const { contacts, removeContact } = useContext(ContactContext);

  return (
    <>
      <List sx={{ width: 400 }}>
        {contacts.map((contact, index) => (
          <ListItem
            key={index}
            disableGutters
            secondaryAction={
              <Button
                color="error"
                variant="contained"
                onClick={() => removeContact(index)}
              >
                Delete
              </Button>
            }
          >
            <ListItemText
              primary={
                contact.name + " " + contact.surname + " " + contact.telephone
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ContactsList;
