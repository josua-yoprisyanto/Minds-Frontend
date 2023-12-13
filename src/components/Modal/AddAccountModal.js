import { Box, Button, Modal, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { getToken } from "src/utils/getToken";
import * as Yup from "yup";

const AddAccountModal = ({ open, handleClose, selectedAccount, setIsLoading }) => {
  const token = getToken();

  const formik = useFormik({
    initialValues: {
      name: selectedAccount?.name || "",
      accountNumber: selectedAccount?.account_number || "",
      type: selectedAccount?.type || "",
      nominal: selectedAccount?.nominal || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      accountNumber: Yup.string().max(255).required("Email is required"),
      type: Yup.string().max(255).required("Phone is required"),
      nominal: Yup.string().max(255).required("Address is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      const reqBody = {
        name: values.name,
        accountNumber: values.accountNumber,
        type: values.type,
        nominal: values.nominal,
      };

      if (!selectedAccount) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/account`,
          reqBody,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (data.success) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/account/`, {
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/account/${selectedAccount.id}`,
          reqBody,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (data.success) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/account/`, {
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
            Tambah Daftar Akun
          </Typography>
          <TextField
            sx={{ mt: 5 }}
            fullWidth
            label="No. Akun"
            name="accountNumber"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.accountNumber}
          />
          <TextField
            sx={{ mt: 1 }}
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
            label="Tipe"
            name="type"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.type}
          />
          <TextField
            sx={{ mt: 1 }}
            fullWidth
            label="Nominal"
            name="nominal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.nominal}
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
      </form>
    </Modal>
  );
};

export default AddAccountModal;
