import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
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
import { getToken } from "src/utils/getToken";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Page = () => {
  const [accountData, setAccountData] = useState([]);
  const [stockData, setStockData] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(0);

  const [status, setStatus] = useState("");

  const token = getToken();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      accountIdAdd: null,
      accountNameAdd: null,
      nominalAdd: 0,
      accountIdSubtract: null,
      nominalSubtract: 0,
      accountNameSubtract: null,
      stocks: [
        {
          stockId: 0,
          quantity: 0,
        },
      ],
    },
    validationSchema: Yup.object({
      // accountIdAdd: Yup.number().max(255).required("Akun Tambah is required"),
      // nominalAdd: Yup.number().max(255).required("Nominal Tambah is required"),
      // accountIdSubtract: Yup.number().max(255).required("Akun Kurang is required"),
      // nominalSubtract: Yup.number().max(255).required("Nominal Kurang is required"),
      // stocks: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      const reqBody = {
        accountIdAdd: values.accountIdAdd,
        nominalAdd: values.nominalAdd,
        accountIdSubtract: values.accountIdSubtract,
        nominalSubtract: values.nominalSubtract,
        stocks: values.stocks.map((stock) => ({
          stockId: stock.stockId,
          quantity: stock.quantity,
        })),
      };

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/sell`,
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
    const handleFetchAccount = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
        headers: {
          Authorization: token,
        },
      });

      if (response?.data?.success) {
        setAccountData(response.data.data);
      }
    };

    const handleFetchStock = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stock`, {
        headers: {
          Authorization: token,
        },
      });

      if (response?.data?.success) {
        setStockData(response.data.data);
      }
    };

    handleFetchAccount();
    handleFetchStock();
  }, [token]);

  return (
    <>
      <Head>
        <title>Penjualan Stock | Minds</title>
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
                Jurnal Penjualan
              </Typography>

              <Typography variant="h6">Kredit</Typography>

              <Autocomplete
                disablePortal
                fullWidth
                id="accountIdAdd"
                options={accountData.map((s) => ({
                  id: s.id,
                  label: s.name,
                }))}
                name="accountIdAdd"
                onBlur={formik.handleBlur}
                onChange={(event, value) => {
                  formik.handleChange(event);
                  formik.setFieldValue("accountIdAdd", value?.id);
                }}
                value={
                  formik.values.accountIdAdd
                    ? {
                        id: accountData.find((sd) => sd.id === formik.values.accountIdAdd)?.id,
                        label: accountData.find((sd) => sd.id === formik.values.accountIdAdd)?.name,
                      }
                    : null
                }
                renderInput={(params) => <TextField {...params} label="Account" />}
              />
              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Nominal"
                name="nominalAdd"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nominalAdd}
              />

              <Typography variant="h6">Debit</Typography>

              <Autocomplete
                disablePortal
                fullWidth
                id="accountIdSubtract"
                options={accountData.map((s) => ({
                  id: s.id,
                  label: s.name,
                }))}
                name="accountIdSubtract"
                onBlur={formik.handleBlur}
                onChange={(event, value) => {
                  formik.handleChange(event);
                  formik.setFieldValue("accountIdSubtract", value?.id);
                }}
                value={
                  formik.values.accountIdSubtract
                    ? {
                        id: accountData.find((sd) => sd.id === formik.values.accountIdSubtract)?.id,
                        label: accountData.find((sd) => sd.id === formik.values.accountIdSubtract)
                          ?.name,
                      }
                    : null
                }
                renderInput={(params) => <TextField {...params} label="Account" />}
              />

              <TextField
                sx={{ mt: 1 }}
                fullWidth
                label="Nominal"
                name="nominalSubtract"
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nominalSubtract}
              />

              <Typography variant="h6">Stock</Typography>

              {formik.values.stocks.map((stock, index) => (
                <Grid container key={index}>
                  <Grid item xs={10} md={10} lg={10}>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id={`stocks.${index}.stockId`}
                      options={stockData.map((s) => ({
                        id: s.id,
                        label: s.name,
                      }))}
                      name={`stocks.${index}.stockId`}
                      onBlur={formik.handleBlur}
                      onChange={(event, value) => {
                        formik.handleChange(event);
                        formik.setFieldValue(`stocks.${index}.stockId`, value?.id);
                      }}
                      value={
                        stock.stockId
                          ? {
                              id: stockData.find((sd) => sd.id === stock.stockId)?.id,
                              label: stockData.find((sd) => sd.id === stock.stockId)?.name,
                            }
                          : null
                      }
                      renderInput={(params) => <TextField {...params} label="Stock" />}
                    />
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
                    <TextField
                      label="Quantity"
                      name={`stocks.${index}.quantity`}
                      type="text"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.stocks[index].quantity}
                    />
                  </Grid>
                </Grid>
              ))}

              <Button
                onClick={() => {
                  let arr = [...formik.values.stocks];

                  arr.push({
                    stockId: 0,
                    quantity: 0,
                  });

                  formik.setFieldValue(`stocks`, arr);
                }}
              >
                Add Item
              </Button>

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
                    variant="contained"
                    color="error"
                    onClick={() => {
                      formik.resetForm();
                    }}
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
