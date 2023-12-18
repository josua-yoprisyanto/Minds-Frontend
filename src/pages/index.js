import Head from "next/head";
import { Box, CircularProgress, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import { useEffect, useState } from "react";
import { getToken } from "src/utils/getToken";
import axios from "axios";
import moment from "moment";

const now = new Date();

const Page = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [buyData, setBuyData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [sellData, setSellData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const handleFetchOverview = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/overview`, {
        headers: {
          Authorization: token,
        },
      });

      if (response?.data?.success) {
        let data = response.data.data;

        let incomeData = Object.entries(data.incomeData);

        let buyData = Object.entries(data.buyData);

        let sellData = Object.entries(data.sellData);

        setBuyData(buyData);
        setIncomeData(incomeData);
        setSellData(sellData);

        setOverviewData(data);
        setIsLoading(false);
      }
    };
    handleFetchOverview();
  }, [token]);

  if (isLoading) {
    return <CircularProgress />;
  }

  console.log(overviewData);

  const allOverviewData = overviewData.sell + overviewData.buy + overviewData.income;

  const buyPercentage = (overviewData.buy / allOverviewData) * 100;
  const incomePercentage = (overviewData.income / allOverviewData) * 100;
  const sellPercentage = (overviewData.sell / allOverviewData) * 100;

  return (
    <>
      <Head>
        <title>Overview | Minds</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Nominal Kas"
                value={overviewData.kas}
                iconColor="orange"
                icon={<ShoppingCartIcon />}
                lineColor={"orange"}
                isPrice
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Total Pembayaran"
                value={overviewData.buy}
                iconColor="red"
                isPrice
                icon={<BanknotesIcon />}
                lineColor={"red"}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Total Pendapatan"
                value={overviewData.income}
                iconColor="blue"
                isPrice
                icon={<ChartBarIcon />}
                lineColor={"blue"}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
              <OverviewBudget
                title="Persediaan Barang Dagang"
                iconColor="green"
                value={overviewData.sell}
                isPrice
                icon={<CurrencyDollarIcon />}
                lineColor={"green"}
              />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "Pembelian",
                    data: buyData,
                    color: "#FF0000",
                  },
                  {
                    name: "Penjualan",
                    data: sellData,
                    color: "#0000FF",
                  },
                  {
                    name: "Dana Masuk",
                    data: incomeData,
                    color: "#008000",
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={[overviewData.buy, overviewData.sell, overviewData.income]}
                percentage={[buyPercentage, sellPercentage, incomePercentage]}
                labels={["Pembelian", "Penjualan", "Dana Masuk"]}
                sx={{ height: "100%" }}
              />
            </Grid>
            {/* <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: "5ece2c0d16f70bff2cf86cd8",
                    image: "/assets/products/product-2.png",
                    name: "Makeup Lancome Rouge",
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: "b393ce1b09c1254c3a92c827",
                    image: "/assets/products/product-5.png",
                    name: "Skincare Soja CO",
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: "a6ede15670da63f49f752c89",
                    image: "/assets/products/product-6.png",
                    name: "Makeup Lipstick",
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: "bcad5524fe3a2f8f8620ceda",
                    image: "/assets/products/product-7.png",
                    name: "Healthcare Ritual",
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestOrders
                orders={overviewData.latestOrder.map((lo, i) => ({
                  id: i + 1,
                  tanggal: moment(lo.buy_date).format("DD MMMM YYYY"),
                  invoice: lo.invoice_no,
                  supplier: lo.supplier.name,
                  kode: lo.product_code,
                  nominal: lo.nominal,
                  status: lo.status,
                }))}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
