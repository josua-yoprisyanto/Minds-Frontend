import {
  Autocomplete,
  Box,
  Button,
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField sx={{ mt: 1 }} fullWidth label="Nomor Invoice" name="invoice" type="text" />
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Supplier" />}
            />
            <TextField sx={{ mt: 1 }} fullWidth label="Nominal" name="nominal" type="text" />
            <TextField sx={{ mt: 1 }} fullWidth label="Keterangan" name="keterangan" type="text" />
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"ongoing"}>Ongoing</MenuItem>
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ borderColor: "black.700", my: 2 }} />

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
              Produk
            </Typography>

            <TextField sx={{ mt: 1 }} fullWidth label="Nama Produk" name="produk" type="text" />
            <TextField sx={{ mt: 1 }} fullWidth label="Kode Produk" name="kode" type="text" />
            <TextField sx={{ mt: 1 }} fullWidth label="Kuantitas" name="kuantitas" type="text" />
            <TextField sx={{ mt: 1 }} fullWidth label="Harga Beli" name="harga_beli" type="text" />
            <TextField sx={{ mt: 1 }} fullWidth label="Harga Jual" name="harga_jual" type="text" />
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
