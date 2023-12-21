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
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import axios from "axios";
import { getToken } from "src/utils/getToken";
import * as Yup from "yup";

const Page = () => {
  const [supplierData, setSupplierData] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState(0);

  const [status, setStatus] = useState("");

  const token = getToken();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      date: moment(),
      supplierId: 0,
      invoiceNo: null,
      productCode: null,
      quantity: 0,
      status: null,
      buyPrice: 0,
      sellPrice: 0,
      name: null,
      submit: null,
    },
    validationSchema: Yup.object({
      // date: Yup.string().max(255).required("Date is required"),
      // supplierId: Yup.number().max(255).required("Supplier is required"),
      // invoiceNo: Yup.string().max(255).required("Invoice is required"),
      // productCode: Yup.string().max(255).required("Product code is required"),
      // quantity: Yup.number().max(255).required("Quantity is required"),
      // status: Yup.string().max(255).required("Status is required"),
      // buyPrice: Yup.number().max(255).required("Buy price is required"),
      // sellPrice: Yup.number().max(255).required("Sell price is required"),
      // name: Yup.string().max(255).required("Name is required"),
    }),
    onSubmit: async (values, helpers) => {
      // setIsLoading(true);

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

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/buy`,
        reqBody,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        formik.resetForm();
        setIsLoading(false);
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
    <>
      <Head>
        <title>Pembelian Stock | Minds</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <form noValidate onSubmit={formik.handleSubmit}>
          <Container maxWidth="xl">
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
                name="supplierId"
                onBlur={formik.handleBlur}
                onChange={(event, value) => {
                  formik.handleChange(event);
                  formik.setFieldValue("supplierId", value?.id);
                }}
                value={
                  formik.values.supplierId
                    ? {
                        id: supplierData.find((sd) => sd.id === formik.values.supplierId)?.id,
                        label: supplierData.find((sd) => sd.id === formik.values.supplierId)?.name,
                      }
                    : null
                }
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
                    onClick={() => formik.resetForm()}
                  >
                    Reset
                  </Button>
                  <Button size="large" sx={{ mt: 3, ml: 1 }} type="submit" variant="contained">
                    Submit
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </form>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
