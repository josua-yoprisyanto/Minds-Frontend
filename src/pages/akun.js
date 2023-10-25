import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { AccountTable } from "src/table/AccountTable";
import AddAccountModal from "src/components/Modal/AddAccountModal";

const data = [
  {
    id: 1,
    no_akun: 101,
    nama: "Kas",
    tipe: "Aktiva",
  },
  {
    id: 2,
    no_akun: 201,
    nama: "Hutang Usaha",
    tipe: "Liabilitas",
  },
  {
    id: 3,
    no_akun: 301,
    nama: "Pendapatan",
    tipe: "Pendapatan",
  },
  {
    id: 4,
    no_akun: 401,
    nama: "Peralatan",
    tipe: "Aktiva",
  },
  {
    id: 5,
    no_akun: 501,
    nama: "Modal Pemilik",
    tipe: "Ekuitas",
  },
  {
    id: 6,
    no_akun: 601,
    nama: "Beban Operasional",
    tipe: "Beban",
  },
  {
    id: 7,
    no_akun: 701,
    nama: "Utang Bank",
    tipe: "Liabilitas",
  },
  {
    id: 8,
    no_akun: 801,
    nama: "Dividen",
    tipe: "Ekuitas",
  },
  {
    id: 9,
    no_akun: 901,
    nama: "Penjualan",
    tipe: "Pendapatan",
  },
  {
    id: 10,
    no_akun: 1001,
    nama: "Persediaan",
    tipe: "Aktiva",
  },
];

const useAccounts = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useAccountIds = (stocks) => {
  return useMemo(() => {
    return stocks.map((customer) => customer.id);
  }, [stocks]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(page, rowsPerPage);
  const accountsIds = useAccountIds(accounts);
  const accountsSelection = useSelection(accountsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openAccountModal, setOpenAccountModal] = useState(false);

  return (
    <>
      <Head>
        <title>Daftar Akun | Minds</title>
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
                <Typography variant="h4">Daftar Akun</Typography>
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
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setOpenAccountModal(true)}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <SearchBar placeholder="Cari Daftar Akun" />
            <AccountTable
              count={data.length}
              items={accounts}
              onDeselectAll={accountsSelection.handleDeselectAll}
              onDeselectOne={accountsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={accountsSelection.handleSelectAll}
              onSelectOne={accountsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={accountsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>

      <AddAccountModal open={openAccountModal} handleClose={() => setOpenAccountModal(false)} />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
