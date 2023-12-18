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
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import { useState } from "react";
import axios from "axios";
import { getToken } from "src/utils/getToken";

export const SupplierTable = (props) => {
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
    handleEditSupplier,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const token = getToken();

  const handleDeleteSupplier = async (id) => {
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
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>No. Telp</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell style={{ textAlign: "center" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((supplier) => {
                const isSelected = selected.includes(supplier.id);

                return (
                  <TableRow hover key={supplier.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(supplier.id);
                          } else {
                            onDeselectOne?.(supplier.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{supplier.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>0{supplier.phone_number}</TableCell>
                    <TableCell style={{ wordWrap: "break-word" }}>{supplier.address}</TableCell>
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
                        onClick={() => handleEditSupplier(supplier.id)}
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
                        onClick={() => handleDeleteSupplier(supplier.id)}
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

SupplierTable.propTypes = {
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
