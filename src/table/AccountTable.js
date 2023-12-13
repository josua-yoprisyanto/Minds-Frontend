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
import EditIcon from "@heroicons/react/20/solid/PencilSquareIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import { getToken } from "src/utils/getToken";
import axios from "axios";

export const AccountTable = (props) => {
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
    handleEditAccount,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const token = getToken();

  const handleDeleteAccount = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/account/${id}`, {
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
                <TableCell>No. Akun</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Tipe</TableCell>
                <TableCell>Nominal</TableCell>
                <TableCell style={{ textAlign: "center" }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((account, index) => {
                const isSelected = selected.includes(account.id);

                return (
                  <TableRow hover key={account.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(account.id);
                          } else {
                            onDeselectOne?.(account.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{account.account_number}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell>{account.nominal}</TableCell>
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
                        onClick={() => handleEditAccount(account.id)}
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
                        onClick={() => handleDeleteAccount(account.id)}
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

AccountTable.propTypes = {
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
