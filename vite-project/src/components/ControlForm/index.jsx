import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { Field } from "react-final-form";
import { composeValidators, isNumber, required } from "../helpers/validators";
import CloseIcon from "@mui/icons-material/Close";

import Input from "../Input";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ControlForm = (props) => {
  const { action, id } = useParams();
  const products = useSelector((state) => state.products.value);
  const productToUpdate = products.find((item) => item.id === +id);
  const { handleSubmit, form } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (action === "update") {
      form.initialize({
        id: +id,
        category: productToUpdate.category,
        name: productToUpdate.name,
        quantity: productToUpdate.quantity,
        price: productToUpdate.price,
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="control-form">
      <div className="form-header">
        <h3 className="form-action">
          {action == "update" ? "Edit product" : "Add product"}
        </h3>
        <button
          className="control-btn close-btn"
          onClick={(event) => {
            event.preventDefault();
            navigate("/products");
          }}
        >
          <CloseIcon fontSize="large" />
        </button>
      </div>
      <Field
        action="edit"
        component={Input}
        validate={required}
        label="Category"
        name="category"
      />
      <br />
      <Field
        action="edit"
        component={Input}
        validate={required}
        label="Name"
        name="name"
      />
      <br />
      <Field
        action="edit"
        component={Input}
        validate={composeValidators(required, isNumber)}
        label="Quantity"
        name="quantity"
      />
      <br />
      <Field
        action="edit"
        component={Input}
        validate={composeValidators(required, isNumber)}
        label="Price"
        name="price"
      />
      <br />
      <div className="form-controls">
        <Button
          sx={{
            m: 1,
            width: "115px",
            height: "30px",
            borderRadius: "0px",
            backgroundColor: "#726969",
          }}
          variant="contained"
          onClick={() => navigate("/products")}
        >
          Cancel
        </Button>
        <Button
          sx={{
            m: 1,
            width: "115px",
            height: "30px",
            borderRadius: "0px",
            backgroundColor: "#44B26F",
          }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ControlForm;
