import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { SupplierTable } from "src/table/SupplierTable";
import AddSupplierModal from "src/components/Modal/AddSupplierModal";

const data = [
  {
    id: 1,
    name: "Josua Yoprisyanto",
    email: "josua@minds.com",
    phone: "08124689112212",
    address: "Jl. Cikini Raya No. 12, Menteng, Jakarta Pusat, 10330, Indonesia.",
  },
  {
    id: 2,
    name: "Jenny Tan",
    email: "jenny@minds.com",
    phone: "08124689112242",
    address: "Jl. Pemuda No. 45, Surabaya, 60271, Indonesia.",
  },
  {
    id: 3,
    name: "Davin lim",
    email: "davin@minds.com",
    phone: "08192492414211",
    address: "Jl. Gatot Subroto No. 89, Medan, 20234, Indonesia.",
  },
  {
    id: 4,
    name: "Darren",
    email: "darren@minds.com",
    phone: "08124912441122",
    address: "Jl. Diponegoro No. 34, Bandung, 40122, Indonesia.",
  },
  {
    id: 5,
    name: "Wlliam",
    email: "william@minds.com",
    phone: "08981872487881",
    address: "Jl. Mahkamah Agung No. 7, Denpasar, Bali, 80233, Indonesia.",
  },
  {
    id: 6,
    name: "6Josua Yoprisyanto",
    email: "josua@minds.com",
    phone: "08124689112212",
    address: "Jl. Hasanuddin No. 56, Makassar, 90111, Indonesia.",
  },
  {
    id: 7,
    name: "7Jenny Tan",
    email: "jenny@minds.com",
    phone: "08124689112242",
    address: "Jl. Gajah Mada No. 123, Semarang, 50111, Indonesia.",
  },
  {
    id: 8,
    name: "8Davin lim",
    email: "davin@minds.com",
    phone: "08192492414211",
    address: "Jl. Soekarno-Hatta No. 78, Pontianak, 78115, Indonesia.",
  },
  {
    id: 9,
    name: "9Darren",
    email: "darren@minds.com",
    phone: "08124912441122",
    address: "Jl. Panglima Sudirman No. 99, Manado, 95115, Indonesia.",
  },
  {
    id: 10,
    name: "10Wlliam",
    email: "william@minds.com",
    phone: "08981872487881",
    address: "Jl. Thamrin No. 200, Padang, 25000, Indonesi",
  },
];

const useSuppliers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useSupplierIds = (suppliers) => {
  return useMemo(() => {
    return suppliers.map((customer) => customer.id);
  }, [suppliers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const suppliers = useSuppliers(page, rowsPerPage);
  const suppliersIds = useSupplierIds(suppliers);
  const suppliersSelection = useSelection(suppliersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openSupplierModal, setOpenSupplierModal] = useState(false);

  return (
    <>
      <Head>
        <title>Supplier | Minds</title>
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
                <Typography variant="h4">Suppliers</Typography>
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
                  onClick={() => setOpenSupplierModal(true)}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <SearchBar placeholder="Cari Supplier" />
            <SupplierTable
              count={data.length}
              items={suppliers}
              onDeselectAll={suppliersSelection.handleDeselectAll}
              onDeselectOne={suppliersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={suppliersSelection.handleSelectAll}
              onSelectOne={suppliersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={suppliersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>

      {openSupplierModal && (
        <AddSupplierModal
          open={openSupplierModal}
          handleClose={() => setOpenSupplierModal(false)}
        />
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
