import { useNavigate, Routes, Route } from "react-router";
import { Form } from "react-final-form";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import { fetchUserLogin } from "./store/slices/loginSlice";
import ProductsList from "./components/ProductsList";
import ControlForm from "./components/ControlForm";
import Header from "./components/Header";
import {
  addProduct,
  fetchProducts,
  updateProduct,
} from "./store/slices/productsSlice";
import { useEffect, useState } from "react";
import ModalRemove from "./components/ModalRemove";
import Preview from "./components/Preview";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  async function handleLogin(values) {
    const result = await dispatch(fetchUserLogin(values));
    if (result.payload) {
      navigate("/products");
    }
  }

  async function handleEdit(values) {
    let result;
    if (values.id != undefined) {
      result = await dispatch(updateProduct(values));
    } else {
      result = await dispatch(addProduct(values));
    }
    if (result.payload) {
      navigate("/products");
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Form
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={handleLogin}
              render={LoginForm}
            />
          }
        />
        <Route path="/products" element={<Header />}>
          <Route index element={<ProductsList onOpenModal={openModal} />} />
          <Route
            path="/products/edit/:action/:id?"
            element={
              <Form
                initialValues={{
                  category: "",
                  name: "",
                  quantity: "",
                  price: "",
                }}
                onSubmit={handleEdit}
                render={ControlForm}
              />
            }
          />
          <Route path="/products/preview" element={<Preview />} />
        </Route>
      </Routes>
      <ModalRemove open={open} onClose={closeModal} selectedId={selectedId} />
    </>
  );
}

export default App;
