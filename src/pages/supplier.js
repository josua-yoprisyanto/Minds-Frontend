import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { SearchBar } from "src/components/SearchBar";
import { SupplierTable } from "src/table/SupplierTable";
import AddSupplierModal from "src/components/Modal/AddSupplierModal";
import { getToken } from "src/utils/getToken";
import axios from "axios";
import { CSVLink } from "react-csv";

const useSuppliers = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useSupplierIds = (suppliers) => {
  return useMemo(() => {
    return suppliers.map((customer) => customer.id);
  }, [suppliers]);
};

const Page = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(0);

  const [searchName, setSearchName] = useState("");
  const [exportDatas, setExportDatas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const suppliers = useSuppliers(supplierData, page, rowsPerPage);
  const suppliersIds = useSupplierIds(suppliers);
  const suppliersSelection = useSelection(suppliersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [openSupplierModal, setOpenSupplierModal] = useState(false);

  const token = getToken();

  useEffect(() => {
    setIsLoading(true);
    const handleFetchSupplier = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/supplier/?name=${searchName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        const exportTitle = [["User", "Email", "No. Telp", "Alamat"]];

        response.data.data.length > 0
          ? response.data.data.map((s) => {
              exportTitle.push([s.name, s.email, s.phone_number, s.address]);
            })
          : exportTitle.push([]);

        setExportDatas(exportTitle);

        setSupplierData(response.data.data);
        setIsLoading(false);
      }
    };
    handleFetchSupplier();
  }, [token, isLoading, searchName]);

  const handleEditSupplier = async (id) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    setSelectedSupplier(data.data);
    setOpenSupplierModal(true);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

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
                    <CSVLink style={{ textDecoration: "none" }} data={exportDatas}>
                      Export
                    </CSVLink>
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
            <SearchBar
              placeholder="Cari Supplier"
              onChange={(e) => setSearchName(e.target.value)}
              value={searchName}
            />
            <SupplierTable
              count={supplierData.length}
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
              setIsLoading={setIsLoading}
              handleEditSupplier={handleEditSupplier}
            />
          </Stack>
        </Container>
      </Box>

      {openSupplierModal && (
        <AddSupplierModal
          open={openSupplierModal}
          handleClose={() => {
            setOpenSupplierModal(false);
            setSelectedSupplier(0);
          }}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          selectedSupplier={selectedSupplier}
        />
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
