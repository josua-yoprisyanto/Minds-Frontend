import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getToken } from "src/utils/getToken";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";

const EditStockModal = ({ open, handleClose, selectedStock }) => {
  const [supplierData, setSupplierData] = useState([]);
  const [stockDetail, setStockDetail] = useState();

  const [selectedSupplier, setSelectedSupplier] = useState(0);

  const [status, setStatus] = useState("");

  const token = getToken();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      date: moment(selectedStock?.buy_date),
      supplierId: selectedStock?.supplier_id,
      invoiceNo: selectedStock?.invoice_no,
      productCode: selectedStock?.product_code,
      quantity: selectedStock?.quantity,
      status: selectedStock?.status,
      buyPrice: selectedStock?.buy_price,
      sellPrice: selectedStock?.sell_price,
      name: selectedStock?.name,
      submit: null,
    },
    validationSchema: Yup.object({
      date: Yup.string().max(255).required("Date is required"),
      supplierId: Yup.number().max(255).required("Supplier is required"),
      invoiceNo: Yup.string().max(255).required("Invoice is required"),
      productCode: Yup.string().max(255).required("Product code is required"),
      quantity: Yup.number().max(255).required("Quantity is required"),
      status: Yup.string().max(255).required("Status is required"),
      buyPrice: Yup.number().max(255).required("Buy price is required"),
      sellPrice: Yup.number().max(255).required("Sell price is required"),
      name: Yup.string().max(255).required("Name is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      const reqBody = {
        date: moment(values.date).format("YYYY-MM-DD"),
        supplierId: values.supplierId,
        invoiceNo: values.invoiceNo,
        productCode: values.productCode,
        quantity: values.quantity,
        status: values.status,
        buyPrice: values.buyPrice,
        sellPrice: values.sellPrice,
        name: values.name,
      };

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/${selectedStock.id}`,
        reqBody,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        formik.resetForm();
      } else {
        console.error("Error submitting form:", error);
        setIsLoading(false);
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const handleFetchSupplier = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier`, {
        headers: {
          Authorization: token,
        },
      });

      if (response?.data?.success) {
        setSupplierData(response.data.data);
      }
    };
    handleFetchSupplier();
  }, [token]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        {console.log({
          id: supplierData.find((sd) => sd.id === selectedStock.supplier_id)?.id,
          label: supplierData.find((sd) => sd.id === selectedStock.supplier_id)?.name,
        })}

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
            overflowY: "auto",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={3}>
              <Typography
                color="neutral.100"
                variant="subtitle2"
                sx={{
                  alignItems: "center",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Jurnal Pembelian
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Tanggal"
                  inputFormat="DD-MM-YYYY"
                  value={formik.values.date}
                  onChange={(e) => {
                    const event = { target: { name: "date", value: e.$d } };
                    formik.handleChange(event);
                    formik.setFieldValue("date", e?.$d || ""); // Set the date value
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  name="date"
                  onBlur={formik.handleBlur}
                />
              </LocalizationProvider>

              <Autocomplete
                disablePortal
                fullWidth
                id="supplierId"
                options={supplierData.map((s) => ({
                  id: s.id,
                  label: s.name,
                }))}
                value={{
                  id: supplierData.find((sd) => sd.id === selectedStock.supplier_id)?.id,
                  label: supplierData.find((sd) => sd.id === selectedStock.supplier_id)?.name,
                }}
                name="supplierId"
                onBlur={formik.handleBlur}
                onChange={(event, value) => {
                  formik.handleChange(event);
                  formik.setFieldValue("supplierId", value?.id);
                }}
                renderInput={(params) => <TextField {...params} label="Supplier" />}
              />

              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="No. Invoice"
                name="invoiceNo"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.invoiceNo}
              />
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Nama"
                name="name"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Kode"
                name="productCode"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.productCode}
              />
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Quantity"
                name="quantity"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  name="status"
                >
                  <MenuItem value={"ongoing"}>Ongoing</MenuItem>
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"done"}>Done</MenuItem>
                </Select>
              </FormControl>

              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Harga Beli"
                name="buyPrice"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.buyPrice}
              />
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Harga Jual"
                name="sellPrice"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sellPrice}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Stack direction="row">
                  <Button
                    size="large"
                    sx={{ mt: 3, mr: 1 }}
                    type="submit"
                    variant="contained"
                    color="error"
                    onClick={() => handleClose()}
                  >
                    Close
                  </Button>
                  <Button size="large" sx={{ mt: 3, ml: 1 }} type="submit" variant="contained">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}
        </Box>
      </form>
    </Modal>
  );
};

export default EditStockModal;
