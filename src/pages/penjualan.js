import { useCallback, useEffect, useMemo, useState } from "react";
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
import { StockTable } from "src/table/StockTable";
import { PenjualanTable } from "src/table/PenjualanTable";
import axios from "axios";
import { getToken } from "src/utils/getToken";
import moment from "moment";

const useAccounts = (account, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(account, page, rowsPerPage);
  }, [account, page, rowsPerPage]);
};

const useAccountIds = (accounts) => {
  return useMemo(() => {
    return accounts.map((account) => account.id);
  }, [accounts]);
};

const Page = () => {
  const [accountData, setAccountData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [exportDatas, setExportDatas] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(accountData, page, rowsPerPage);
  const accountsIds = useAccountIds(accounts);
  const accountsSelection = useSelection(accountsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const token = getToken();

  useEffect(() => {
    setIsLoading(true);
    const handleFetchSupplier = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/sell?name=${searchName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        const exportTitle = [["No", "Tanggal", "Nomor Transaksi", "Kode Barang", "Quantity"]];

        response.data.data.length > 0
          ? response.data.data.map((s, i) => {
              exportTitle.push([
                i + 1,
                moment(s.created_at).format("DD MMMM YYYY"),
                s.transaction_no,
                s.stock.product_code,
                s.quantity,
              ]);
            })
          : exportTitle.push([]);

        setExportDatas(exportTitle);

        setAccountData(response.data.data);
        setIsLoading(false);
      }
    };
    handleFetchSupplier();
  }, [searchName, token]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Head>
        <title>Jurnal Penjualan | Minds</title>
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
                <Typography variant="h4">Jurnal Penjualan</Typography>
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
            <SearchBar placeholder="Cari Jurnal Penjualan" />
            <PenjualanTable
              count={accountData.length}
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
