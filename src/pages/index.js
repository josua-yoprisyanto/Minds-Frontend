import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingCartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";

const now = new Date();

const Page = () => (
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
              title="Jumlah Transaksi"
              value="100"
              iconColor="orange"
              icon={<ShoppingCartIcon />}
              lineColor={"orange"}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={6}>
            <OverviewBudget
              title="Total Pembelian"
              value={128889999999}
              iconColor="red"
              isPrice
              icon={<BanknotesIcon />}
              lineColor={"red"}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={6}>
            <OverviewBudget
              title="Total Penjualan"
              value={88990000}
              iconColor="blue"
              isPrice
              icon={<ChartBarIcon />}
              lineColor={"blue"}
            />
          </Grid>
          <Grid xs={12} sm={6} lg={6}>
            <OverviewBudget
              title="Total Dana Masuk"
              iconColor="green"
              value={200000000}
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
                  data: [
                    ["2022-01-01", 20],
                    ["2022-02-01", 32],
                    ["2022-03-01", 38],
                    ["2022-04-01", 45],
                    ["2022-05-01", 52],
                    ["2022-06-01", 62],
                    ["2022-07-01", 68],
                    ["2022-08-01", 75],
                    ["2022-09-01", 85],
                  ],
                  color: "#FF0000",
                },
                {
                  name: "Penjualan",
                  data: [
                    ["2022-01-01", 30],
                    ["2022-02-01", 40],
                    ["2022-03-01", 35],
                    ["2022-04-01", 50],
                    ["2022-05-01", 49],
                    ["2022-06-01", 60],
                    ["2022-07-01", 70],
                    ["2022-08-01", 91],
                    ["2022-09-01", 125],
                  ],
                  color: "#0000FF",
                },
                {
                  name: "Dana Masuk",
                  data: [
                    ["2022-01-01", 10],
                    ["2022-02-01", 15],
                    ["2022-03-01", 22],
                    ["2022-04-01", 30],
                    ["2022-05-01", 35],
                    ["2022-06-01", 40],
                    ["2022-07-01", 45],
                    ["2022-08-01", 50],
                    ["2022-09-01", 55],
                  ],
                  color: "#008000",
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={[50, 30, 20]}
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
              orders={[
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
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
