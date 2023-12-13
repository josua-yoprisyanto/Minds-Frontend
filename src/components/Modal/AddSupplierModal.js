import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { getToken } from "src/utils/getToken";

const AddSupplierModal = ({ open, handleClose, isLoading, setIsLoading, selectedSupplier }) => {
  const token = getToken();

  const formik = useFormik({
    initialValues: {
      name: selectedSupplier?.name || "",
      email: selectedSupplier?.email || "",
      phoneNumber: selectedSupplier?.phone_number || "",
      address: selectedSupplier?.address || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string().max(255).required("Email is required"),
      phoneNumber: Yup.string().max(255).required("Phone is required"),
      address: Yup.string().max(255).required("Address is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      const reqBody = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };

      if (!selectedSupplier) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/supplier`,
          reqBody,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (data.success) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/`, {
            headers: {
              Authorization: token,
            },
          });

          if (response?.data?.success) {
            setIsLoading(false);
            handleClose();
          }
        } else {
          setIsLoading(false);

          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: data.message });
          helpers.setSubmitting(false);
        }
      } else {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/supplier/${selectedSupplier.id}`,
          reqBody,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (data.success) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/`, {
            headers: {
              Authorization: token,
            },
          });

          if (response?.data?.success) {
            setIsLoading(false);
            handleClose();
          }
        } else {
          setIsLoading(false);

          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: data.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            borderRadius: 2,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tambah Supplier
          </Typography>
          <TextField
            sx={{ mt: 5 }}
            fullWidth
            label="Nama"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.name}
          />

          <TextField
            sx={{ mt: 1 }}
            fullWidth
            label="Email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            label="No. Telp"
            name="phoneNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.phoneNumber}
          />
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            label="Alamat"
            name="address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.address}
          />

          {formik.errors.submit && (
            <Typography color="error" sx={{ mt: 3 }} variant="body2">
              {formik.errors.submit}
            </Typography>
          )}
          <Stack direction="row">
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3, mr: 1 }}
              variant="contained"
              color="error"
              onClick={handleClose} // Remove type="submit"
            >
              Close
            </Button>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3, ml: 1 }}
              type="submit"
              variant="contained"
              color="primary" // Change color to "primary" or "default"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default AddSupplierModal;
