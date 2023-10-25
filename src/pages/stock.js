import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { StockTable } from "src/table/StockTable";

const data = [
  {
    No: 1,
    nama: "Product A",
    kode: "ABC123",
    kuantitas: 100,
    harga_beli: 10500,
    harga_jual: 15000,
  },
  {
    No: 2,
    nama: "Product B",
    kode: "DEF456",
    kuantitas: 75,
    harga_beli: 8250,
    harga_jual: 12000,
  },
  {
    No: 3,
    nama: "Product C",
    kode: "GHI789",
    kuantitas: 50,
    harga_beli: 5750,
    harga_jual: 9500,
  },
  {
    No: 4,
    nama: "Product D",
    kode: "JKL012",
    kuantitas: 120,
    harga_beli: 7800,
    harga_jual: 14500,
  },
  {
    No: 5,
    nama: "Product E",
    kode: "MNO345",
    kuantitas: 60,
    harga_beli: 6300,
    harga_jual: 11750,
  },
  {
    No: 6,
    nama: "Product F",
    kode: "PQR678",
    kuantitas: 90,
    harga_beli: 9000,
    harga_jual: 13250,
  },
  {
    No: 7,
    nama: "Product G",
    kode: "STU901",
    kuantitas: 70,
    harga_beli: 7100,
    harga_jual: 10500,
  },
  {
    No: 8,
    nama: "Product H",
    kode: "VWX234",
    kuantitas: 85,
    harga_beli: 8900,
    harga_jual: 12750,
  },
  {
    No: 9,
    nama: "Product I",
    kode: "YZA567",
    kuantitas: 110,
    harga_beli: 11200,
    harga_jual: 16000,
  },
  {
    No: 10,
    nama: "Product J",
    kode: "BCD890",
    kuantitas: 65,
    harga_beli: 6800,
    harga_jual: 10750,
  },
];

const useStocks = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useStockIds = (stocks) => {
  return useMemo(() => {
    return stocks.map((customer) => customer.id);
  }, [stocks]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const stocks = useStocks(page, rowsPerPage);
  const stocksIds = useStockIds(stocks);
  const stocksSelection = useSelection(stocksIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Stock | Minds</title>
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
                <Typography variant="h4">Stocks</Typography>
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
            <SearchBar placeholder="Cari Stock" />
            <StockTable
              count={data.length}
              items={stocks}
              onDeselectAll={stocksSelection.handleDeselectAll}
              onDeselectOne={stocksSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={stocksSelection.handleSelectAll}
              onSelectOne={stocksSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={stocksSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
