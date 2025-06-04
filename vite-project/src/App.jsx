import ContactsList from "./components/ContactsList";
import UpdateForm from "./components/UpdateForm";
import Button from "@mui/material/Button";
import { useNavigate, Routes, Route } from "react-router";
import { Form } from "react-final-form";
import "./App.css";
import { useEffect } from "react";
import AddForm from "./components/AddForm";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "./store/slices/contactSlice";

function App() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) =>
        json.forEach((contact) => {
          const fullname = contact.name.split(" ");
          const telephone = contact.phone.split(" ")[0];
          dispatch(
            addContact({ name: fullname[0], surname: fullname[1], telephone })
          );
        })
      );
  }, []);

  function handleAdd(values, form) {
    dispatch(addContact(values));
    form.reset();
  }

  function handleUpdate(values) {
    dispatch(updateContact(values));
    navigate("/contacts");
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
      <Routes>
        <Route
          path="/form"
          element={
            <Form
              initialValues={{
                name: "",
                surname: "",
                telephone: "",
              }}
              onSubmit={handleAdd}
              render={AddForm}
            />
          }
        />
        <Route path="/contacts" element={<ContactsList />}>
          <Route
            path="update/:id"
            element={
              <Form
                initialValues={{
                  name: "",
                  surname: "",
                  telephone: "",
                }}
                onSubmit={handleUpdate}
                render={UpdateForm}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
