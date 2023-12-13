import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { PembayaranTable } from "src/table/PembayaranTable";

const data = [
  {
    id: 1,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 2,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 3,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 4,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 5,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 6,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 7,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 8,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 9,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
  {
    id: 10,
    invoice: 1001,
    kode: "123",
    qty: 10,
    nominal: 1000,
  },
];

const usePayments = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const usePaymentIds = (payments) => {
  return useMemo(() => {
    return payments.map((customer) => customer.id);
  }, [payments]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const payments = usePayments(page, rowsPerPage);
  const paymentsIds = usePaymentIds(payments);
  const paymentsSelection = useSelection(paymentsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Jurnal Pembayaran | Minds</title>
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Jurnal Pembayaran</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              {/* <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <SearchBar placeholder="Cari Jurnal Pembayaran" />
            <PembayaranTable
              count={data.length}
              items={payments}
              onDeselectAll={paymentsSelection.handleDeselectAll}
              onDeselectOne={paymentsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={paymentsSelection.handleSelectAll}
              onSelectOne={paymentsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={paymentsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
