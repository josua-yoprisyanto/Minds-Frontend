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
import { AccountTable } from "src/table/AccountTable";
import AddAccountModal from "src/components/Modal/AddAccountModal";
import { CSVLink } from "react-csv";
import { getToken } from "src/utils/getToken";
import axios from "axios";

const useAccounts = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const useAccountIds = (account) => {
  return useMemo(() => {
    return account.map((customer) => customer.id);
  }, [account]);
};

const Page = () => {
  const [accountData, setAccountData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);

  const [searchName, setSearchName] = useState("");

  const [exportDatas, setExportDatas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(true);

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

  const [openAccountModal, setOpenAccountModal] = useState(false);

  const token = getToken();

  useEffect(() => {
    setIsLoading(true);
    const handleFetchAccount = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/account/`, {
        headers: {
          Authorization: token,
        },
      });

      if (response?.data?.success) {
        const exportTitle = [["No Akun", "Nama", "Tipe", "Nominal"]];

        response.data.data.length > 0
          ? response.data.data.map((s) => {
              exportTitle.push([s.account_number, s.name, s.type, s.nominal]);
            })
          : exportTitle.push([]);

        setExportDatas(exportTitle);

        setAccountData(response.data.data);
        setIsLoading(false);
        setScreenLoading(false);
      }
    };
    handleFetchAccount();
  }, [token, isLoading]);

  const handleEditAccount = async (id) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/account/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    setSelectedAccount(data.data);
    setOpenAccountModal(true);
  };

  if (isLoading && screenLoading) {
    return <CircularProgress />;
  }

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
                    <CSVLink style={{ textDecoration: "none" }} data={exportDatas}>
                      Export
                    </CSVLink>
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
            <SearchBar placeholder="Cari Daftar Akun" onChange={setSearchName} value={searchName} />
            <AccountTable
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
              setIsLoading={setIsLoading}
              handleEditAccount={handleEditAccount}
            />
          </Stack>
        </Container>
      </Box>

      {openAccountModal && (
        <AddAccountModal
          open={openAccountModal}
          handleClose={() => {
            setOpenAccountModal(false);
            setSelectedAccount();
          }}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          selectedAccount={selectedAccount}
        />
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
