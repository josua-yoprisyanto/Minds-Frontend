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
import React, { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Page = () => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const [status, setStatus] = useState("");

  const [items, setItems] = useState([{}]);

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

            <Typography variant="h6">Akun Tambah</Typography>

            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Akun" />}
            />
            <TextField sx={{ mt: 1 }} fullWidth label="Nominal" name="nominal" type="text" />

            <Typography variant="h6">Akun Kurang</Typography>

            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Akun" />}
            />
            <TextField sx={{ mt: 1 }} fullWidth label="Nominal" name="Nominal" type="text" />

            <Typography variant="h6">Stock</Typography>

            {items.map((item, index) => (
              <Grid container key={index}>
                <Grid item xs={10} md={10} lg={10}>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={top100Films}
                    renderInput={(params) => <TextField {...params} label="Supplier" />}
                  />
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                  <TextField sx={{ mt: 1 }} label="Quantity" name="qty" type="text" />
                </Grid>
              </Grid>
            ))}

            <Button
              onClick={() => {
                let arr = [...items];

                arr.push({});

                setItems(arr);
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
                  type="submit"
                  variant="contained"
                  color="error"
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
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
