import { Box, Button, Modal, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import React from "react";

const AddAccountModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          borderRadius: 2,
          bgcolor: "background.paper",
          //   border: "2px solid #000",
          //   boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Tambah Daftar Akun
        </Typography>
        <TextField
          sx={{ mt: 5 }}
          //  error={!!(formik.touched.email && formik.errors.email)}
          fullWidth
          //  helperText={formik.touched.email && formik.errors.email}
          label="No. Akun"
          name="number"
          //  onBlur={formik.handleBlur}
          //  onChange={formik.handleChange}
          type="text"
          //  value={formik.values.email}
        />
        <TextField
          sx={{ mt: 1 }}
          //  error={!!(formik.touched.email && formik.errors.email)}
          fullWidth
          //  helperText={formik.touched.email && formik.errors.email}
          label="Nama"
          name="name"
          //  onBlur={formik.handleBlur}
          //  onChange={formik.handleChange}
          type="text"
          //  value={formik.values.email}
        />
        <TextField
          sx={{ mt: 1 }}
          //  error={!!(formik.touched.email && formik.errors.email)}
          fullWidth
          //  helperText={formik.touched.email && formik.errors.email}
          label="Tipe"
          name="type"
          //  onBlur={formik.handleBlur}
          //  onChange={formik.handleChange}
          type="text"
          //  value={formik.values.email}
        />

        <Stack direction="row">
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3, mr: 1 }}
            type="submit"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button fullWidth size="large" sx={{ mt: 3, ml: 1 }} type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddAccountModal;
