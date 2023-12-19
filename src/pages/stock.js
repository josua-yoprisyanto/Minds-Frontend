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
import { getToken } from "src/utils/getToken";
import axios from "axios";

const useStocks = (stock, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(stock, page, rowsPerPage);
  }, [page, rowsPerPage, stock]);
};

const useStockIds = (stocks) => {
  return useMemo(() => {
    return stocks.map((customer) => customer.id);
  }, [stocks]);
};

const Page = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(0);

  const [searchName, setSearchName] = useState("");
  const [exportDatas, setExportDatas] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const stocks = useStocks(stockData, page, rowsPerPage);
  const stocksIds = useStockIds(stocks);
  const stocksSelection = useSelection(stocksIds);

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/?name=${searchName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        const exportTitle = [
          [
            "No",
            "Nama Produk",
            "Kode Produk",
            "Kuantitas",
            "Harga Beli Satuan",
            "Harga Jual Satuan",
          ],
        ];

        response.data.data.length > 0
          ? response.data.data.map((s, i) => {
              exportTitle.push([
                i + 1,
                s.name,
                s.product_code,
                s.quantity,
                s.buy_price,
                s.sell_price,
              ]);
            })
          : exportTitle.push([]);

        setExportDatas(exportTitle);

        setStockData(response.data.data);
        setIsLoading(false);
      }
    };
    handleFetchSupplier();
  }, [searchName, token, isLoading]);

  if (isLoading) {
    return <CircularProgress />;
  }

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
            </Stack>
            <SearchBar placeholder="Cari Stock" />
            <StockTable
              count={stockData.length}
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
              setIsLoading={setIsLoading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
