import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { PembayaranTable } from "src/table/PembayaranTable";

const data = [
  {
    id: 1,
    tanggal: "2023-10-20",
    debit: "Kas - 2000",
    kredit: "Penjualan - 2000",
    keterangan: "Penjualan barang A",
  },
  {
    id: 2,
    tanggal: "2023-10-21",
    debit: "Bank - 3000",
    kredit: "Pengeluaran - 3000",
    keterangan: "Pembayaran sewa",
  },
  {
    id: 3,
    tanggal: "2023-10-22",
    debit: "Piutang - 500",
    kredit: "Penjualan - 500",
    keterangan: "Pembayaran dari pelanggan X",
  },
  {
    id: 4,
    tanggal: "2023-10-23",
    debit: "Kas - 2500",
    kredit: "Pengeluaran - 2500",
    keterangan: "Pembelian perlengkapan kantor",
  },
  {
    id: 5,
    tanggal: "2023-10-24",
    debit: "Bank - 1500",
    kredit: "Penjualan - 1500",
    keterangan: "Penjualan barang B",
  },
  {
    id: 6,
    tanggal: "2023-10-25",
    debit: "Piutang - 800",
    kredit: "Penjualan - 800",
    keterangan: "Pembayaran dari pelanggan Y",
  },
  {
    id: 7,
    tanggal: "2023-10-26",
    debit: "Kas - 2000",
    kredit: "Pengeluaran - 2000",
    keterangan: "Pengeluaran untuk biaya listrik",
  },
  {
    id: 8,
    tanggal: "2023-10-27",
    debit: "Bank - 3500",
    kredit: "Pengeluaran - 3500",
    keterangan: "Pembayaran gaji karyawan",
  },
  {
    id: 9,
    tanggal: "2023-10-28",
    debit: "Piutang - 1000",
    kredit: "Penjualan - 1000",
    keterangan: "Pembayaran dari pelanggan Z",
  },
  {
    id: 10,
    tanggal: "2023-10-29",
    debit: "Kas - 3000",
    kredit: "Pengeluaran - 3000",
    keterangan: "Pembayaran sewa kantor",
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
