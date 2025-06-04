import { Button, List, ListItem, ListItemText } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeContact } from "../../store/slices/contactSlice";

function ContactsList() {
  const contacts = useSelector((state) => state.contacts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleRemove(indexToRemove) {
    dispatch(removeContact(indexToRemove));
  }

  return (
    <>
      <List sx={{ width: 600 }}>
        {contacts.map((contact, index) => (
          <ListItem
            key={index}
            disableGutters
            secondaryAction={
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(`/contacts/update/` + index);
                  }}
                >
                  Update
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleRemove(index)}
                >
                  Delete
                </Button>
              </>
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
      <Outlet />
    </>
  );
}

export default ContactsList;
