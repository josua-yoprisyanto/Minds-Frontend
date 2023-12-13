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
import { getInitials } from "src/utils/get-initials";
import { getPrice } from "src/utils/getPrice";
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";

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
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

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
              {items.map((customer, index) => {
                const isSelected = selected.includes(customer.id);

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{customer.nama}</TableCell>
                    <TableCell>{customer.kode}</TableCell>
                    <TableCell>{customer.kuantitas}</TableCell>
                    <TableCell>{getPrice(customer.harga_beli)}</TableCell>
                    <TableCell>{getPrice(customer.harga_jual)}</TableCell>
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
                        style={{ backgroundColor: "green", color: "white" }}
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
                        style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
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
