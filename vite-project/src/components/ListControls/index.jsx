import { Outlet, useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Button } from "@mui/material";

function ListControls() {
  const navigate = useNavigate();

  return (
    <>
      <div className="list-controls-container">
        <Button
          sx={{
            gap: 2,
            m: 1,
            width: "180px",
            height: "50px",
            borderRadius: "0px",
            backgroundColor: "#FFF",
            color: "#05BC52",
            alignItems: 'center'
          }}
          variant="contained"
          onClick={() => navigate("/products/preview")}
        >
          <PermIdentityIcon color="disabled" />
          Preview
        </Button>
        <Button
          sx={{
            gap: 2,
            m: 1,
            width: "180px",
            height: "50px",
            borderRadius: "0px",
            backgroundColor: "#FFF",
            color: "#05BC52",
            alignItems: 'center'
          }}
          variant="contained"
          onClick={() => navigate("/products/edit/add")}
        >
          <AddIcon color="disabled" />
          Add product
        </Button>
      </div>
      <Outlet />
    </>
  );
}

export default ListControls;
