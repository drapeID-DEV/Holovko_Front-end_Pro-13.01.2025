import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../store/slices/productsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFFFFF",
  border: 0,
  boxShadow: 24,
  p: 4,
};

export default function ModalRemove({ open, onClose, selectedId }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            color="#05BC52"
          >
            Are u sure you want to delete product {selectedId}?
          </Typography>
          <div>
            <Button
              sx={{
                m: 1,
                width: "115px",
                height: "30px",
                borderRadius: "0px",
                backgroundColor: "#D8D5D5",
              }}
              variant="contained"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                m: 1,
                width: "115px",
                height: "30px",
                borderRadius: "0px",
                backgroundColor: "#FB0000",
              }}
              type="submit"
              variant="contained"
              onClick={() => {
                dispatch(removeProduct(selectedId));
                onClose();
              }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
