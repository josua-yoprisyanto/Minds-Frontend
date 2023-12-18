import { Box, CircularProgress, Divider, Modal, Stack, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getPrice } from "src/utils/getPrice";
import { getToken } from "src/utils/getToken";

const StockDetailModal = ({ open, handleClose, selectedStockId }) => {
  const [stockDetail, setStockDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const token = getToken();

  useEffect(() => {
    setIsLoading(true);
    const handleFetchSupplier = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stock/${selectedStockId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        setStockDetail(response.data.data);
        setIsLoading(false);
      }
    };
    handleFetchSupplier();
  }, [selectedStockId, token]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          borderRadius: 2,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              color="neutral.100"
              variant="subtitle2"
              sx={{
                alignItems: "center",
                borderRadius: 1,
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
                width: "100%",
                color: "black",
                fontWeight: "600",
              }}
            >
              Stock Detail
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Tanggal Beli</Typography>
              <Typography>{moment(stockDetail.buy_date).format("DD MMMM YYYY")}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Invoice</Typography>
              <Typography>{stockDetail.invoice_no}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Kode Produk</Typography>
              <Typography>{stockDetail.product_code}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Nama Produk</Typography>
              <Typography>{stockDetail.name}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Kuantitas</Typography>
              <Typography>{stockDetail.quantity}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Harga Beli</Typography>
              <Typography>{getPrice(stockDetail.buy_price)}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Harga Jual</Typography>
              <Typography>{getPrice(stockDetail.sell_price)}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Nominal</Typography>
              <Typography>{stockDetail.nominal}</Typography>
            </Stack>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{
                pt: 3,
              }}
            >
              <Typography>Status</Typography>
              <Typography>{stockDetail.status}</Typography>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default StockDetailModal;
