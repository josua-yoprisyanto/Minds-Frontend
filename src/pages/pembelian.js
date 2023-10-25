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
import { PembelianTable } from "src/table/PembelianTable";

const data = [
  {
    id: 1,
    tanggal: "2023-10-20",
    invoice: "INV-001",
    supplier: "Supplier A",
    akun: "Pembelian Barang",
    nominal: 2500.0,
    status: "ongoing",
  },
  {
    id: 2,
    tanggal: "2023-10-21",
    invoice: "INV-002",
    supplier: "Supplier B",
    akun: "Pembelian Perlengkapan",
    nominal: 1200.0,
    status: "pending",
  },
  {
    id: 3,
    tanggal: "2023-10-22",
    invoice: "INV-003",
    supplier: "Supplier C",
    akun: "Pembelian Jasa",
    nominal: 3500.0,
    status: "done",
  },
  {
    id: 4,
    tanggal: "2023-10-23",
    invoice: "INV-004",
    supplier: "Supplier D",
    akun: "Pembelian Bahan Baku",
    nominal: 1800.0,
    status: "ongoing",
  },
  {
    id: 5,
    tanggal: "2023-10-24",
    invoice: "INV-005",
    supplier: "Supplier E",
    akun: "Pembelian Perlengkapan",
    nominal: 2800.0,
    status: "done",
  },
  {
    id: 6,
    tanggal: "2023-10-25",
    invoice: "INV-006",
    supplier: "Supplier F",
    akun: "Pembelian Barang",
    nominal: 2100.0,
    status: "pending",
  },
  {
    id: 7,
    tanggal: "2023-10-26",
    invoice: "INV-007",
    supplier: "Supplier G",
    akun: "Pembelian Jasa",
    nominal: 3000.0,
    status: "done",
  },
  {
    id: 8,
    tanggal: "2023-10-27",
    invoice: "INV-008",
    supplier: "Supplier H",
    akun: "Pembelian Bahan Baku",
    nominal: 1900.0,
    status: "ongoing",
  },
  {
    id: 9,
    tanggal: "2023-10-28",
    invoice: "INV-009",
    supplier: "Supplier I",
    akun: "Pembelian Barang",
    nominal: 2700.0,
    status: "pending",
  },
  {
    id: 10,
    tanggal: "2023-10-29",
    invoice: "INV-010",
    supplier: "Supplier J",
    akun: "Pembelian Jasa",
    nominal: 3200.0,
    status: "done",
  },
];

const useBuys = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useBuyIds = (buys) => {
  return useMemo(() => {
    return buys.map((customer) => customer.id);
  }, [buys]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const buys = useBuys(page, rowsPerPage);
  const buysIds = useBuyIds(buys);
  const buysSelection = useSelection(buysIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Jurnal Pembelian | Minds</title>
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
                <Typography variant="h4">Jurnal Pembelian</Typography>
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
            <SearchBar placeholder="Cari Jurnal Pembelian" />
            <PembelianTable
              count={data.length}
              items={buys}
              onDeselectAll={buysSelection.handleDeselectAll}
              onDeselectOne={buysSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={buysSelection.handleSelectAll}
              onSelectOne={buysSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={buysSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
