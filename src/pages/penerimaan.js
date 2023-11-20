import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { PembelianTable } from "src/table/PembelianTable";
import { PenerimaanTable } from "src/table/PenerimaanTable";

const data = [
  {
    id: 1,
    tanggal: "2023-10-20",
    nomor: "A001",
    kode: "qwq",
    nominal: 10000,
    qty: 12,
  },
  {
    id: 2,
    tanggal: "2023-10-21",
    nomor: "B002",
    kode: "qwq",
    nominal: 10000,
    qty: 12,
  },
  {
    id: 3,
    tanggal: "2023-10-22",
    nomor: "C003",
    nominal: 7500,
    kode: "qwq",
    qty: 12,
  },
  {
    id: 4,
    tanggal: "2023-10-23",
    nomor: "D004",
    nominal: 10000,

    kode: "qwq",
    qty: 12,
  },
  {
    id: 5,
    tanggal: "2023-10-24",
    nomor: "E005",
    nominal: 10000,

    kode: "qwq",
    qty: 12,
  },
  {
    id: 6,
    tanggal: "2023-10-25",
    nomor: "F006",
    kode: "qwq",
    qty: 12,
  },
  {
    id: 7,
    tanggal: "2023-10-26",
    nomor: "G007",
    nominal: 10000,

    kode: "qwq",
    qty: 12,
  },
  {
    id: 8,
    tanggal: "2023-10-27",
    nomor: "H008",
    nominal: 10000,

    kode: "qwq",
    qty: 12,
  },
  {
    id: 9,
    tanggal: "2023-10-28",
    nomor: "I009",
    nominal: 10000,

    kode: "qwq",
    qty: 12,
  },
  {
    id: 10,
    tanggal: "2023-10-29",
    nomor: "J010",
    nominal: 10000,

    kode: "qwq",
    qty: 12,
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
        <title>Jurnal Penerimaan | Minds</title>
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
                <Typography variant="h4">Jurnal Penerimaan</Typography>
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
            <SearchBar placeholder="Cari Jurnal Penerimaan" />
            <PenerimaanTable
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
