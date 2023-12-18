import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getPrice } from "src/utils/getPrice";
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import axios from "axios";
import EditStockModal from "src/components/Modal/EditStockModal";
import { useState } from "react";
import StockDetailModal from "src/components/Modal/StockDetailModal";
import { getToken } from "src/utils/getToken";

export const StockTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setIsLoading,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const handleDeleteStock = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    if (data.success) {
      setIsLoading(false);
    } else {
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: data.message });
      helpers.setSubmitting(false);
    }
  };

  const [showEditStockModal, setShowEditStockModal] = useState(false);
  const [showDetailStockModal, setShowDetailStockModal] = useState(false);

  const [selectedStockId, setSelectedStockId] = useState(0);
  const [selectedStock, setSelectedStock] = useState();

  const token = getToken();

  const handleEdit = async (id) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stock/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.success) {
      setSelectedStock(response.data.data);
      setShowEditStockModal(true);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>Nama Produk</TableCell>
                <TableCell>Kode Produk</TableCell>
                <TableCell>Kuantitas</TableCell>
                <TableCell>Harga Beli Satuan</TableCell>
                <TableCell>Harga Jual Satuan</TableCell>
                <TableCell style={{ textAlign: "center" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((stock, index) => {
                const isSelected = selected.includes(stock.id);

                return (
                  <TableRow hover key={stock.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(stock.id);
                          } else {
                            onDeselectOne?.(stock.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.product_code}</TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>{getPrice(stock.buy_price)}</TableCell>
                    <TableCell>{getPrice(stock.sell_price)}</TableCell>
                    <TableCell
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <EditIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        style={{ backgroundColor: "blue", color: "white" }}
                        onClick={() => {
                          setShowDetailStockModal(true);
                          setSelectedStockId(stock.id);
                        }}
                      >
                        Detail
                      </Button>
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <EditIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                        onClick={() => {
                          handleEdit(stock.id);
                        }}
                      >
                        Ubah
                      </Button>
                      <Button
                        startIcon={
                          <SvgIcon fontSize="small">
                            <TrashIcon />
                          </SvgIcon>
                        }
                        variant="contained"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => handleDeleteStock(stock.id)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {showEditStockModal && (
        <EditStockModal
          open={showEditStockModal}
          handleClose={() => {
            setShowEditStockModal(false);
            setSelectedStock();
          }}
          selectedStock={selectedStock}
        />
      )}

      {showDetailStockModal && (
        <StockDetailModal
          open={showDetailStockModal}
          handleClose={() => {
            setShowDetailStockModal(false);
            setSelectedStockId(0);
          }}
          selectedStockId={selectedStockId}
        />
      )}
    </Card>
  );
};

StockTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
