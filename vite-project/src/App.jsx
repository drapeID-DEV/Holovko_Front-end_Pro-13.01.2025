import ContactContext from "./contexts/ContactContaxt";
import FormComponent from "./components/FormComponent";
import ContactsList from "./components/ContactsList";
import Button from "@mui/material/Button";
import { useNavigate, Routes, Route } from "react-router";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

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

  function addContact(newContact) {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  }

  function removeContact(indexToRemove) {
    setContacts((prevContacts) =>
      prevContacts.filter((contact, index) => index !== indexToRemove)
    );
  }

  return (
    <>
      <div className="page-controls">
        <Button
          disableElevation
          variant="contained"
          data-name="form"
          onClick={() => navigate("/form")}
        >
          Form
        </Button>
        <Button
          disableElevation
          variant="contained"
          data-name="list"
          onClick={() => navigate("/contacts")}
        >
          List
        </Button>
      </div>
      <ContactContext.Provider value={{ contacts, removeContact, addContact }}>
        <Routes>
          <Route path="/form" element={<FormComponent />} />
          <Route path="/contacts" element={<ContactsList />} />
        </Routes>
      </ContactContext.Provider>
    </>
  );
}

export default App;
