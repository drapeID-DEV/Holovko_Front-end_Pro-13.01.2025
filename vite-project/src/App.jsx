import ContactContext from "./contexts/ContactContaxt";
import FormComponent from "./components/FormComponent";
import ContactsList from "./components/ContactsList";
import Button from '@mui/material/Button';
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) =>
        json.forEach((contact) => {
          const fullname = contact.name.split(" ");
          const telephone = contact.phone.split(" ")[0];
          setContacts((prevContacts) => [
            ...prevContacts,
            { name: fullname[0], surname: fullname[1], telephone },
          ]);
        })
      );
  }, []);

  function switchTab(event) {
    const tab = event.target.getAttribute("data-name");
    switch (tab) {
      case "form":
        setShowForm(true);
        break;
      case "list":
        setShowForm(false);
        break;
    }
  }

  function addContact(newContact) {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  function removeContact(indexToRemove) {
    setContacts((prevContacts) =>
      prevContacts.filter((contact, index) => index !== indexToRemove)
    );
  }

  function cancelForm() {
    setShowForm(false);
  }

  return (
    <>
      <div className="page-controls">
        <Button disableElevation variant="contained" data-name="form" onClick={switchTab}>Form</Button>
        <Button disableElevation variant="contained" data-name="list" onClick={switchTab}>List</Button>
      </div>
      <ContactContext.Provider
        value={{ contacts, removeContact, addContact, cancelForm }}
      >
        {showForm ? <FormComponent /> : <ContactsList />}
      </ContactContext.Provider>
    </>
  );
}

export default App;
