import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import { getPrice } from "src/utils/getPrice";
import Link from "next/link";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Transaction" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Invoice</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Kode Produk</TableCell>
                <TableCell>Nominal</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => {
                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.tanggal}</TableCell>
                    <TableCell>{order.invoice}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.kode}</TableCell>
                    <TableCell>{getPrice(order.nominal)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    {/* <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>{order.status}</SeverityPill>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        >
          <Link href={"/pembelian"} style={{ textDecoration: "none", color: "black" }}>
            {" "}
            View all
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
