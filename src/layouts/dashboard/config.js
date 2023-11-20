import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UserCircle from "@heroicons/react/24/solid/UserCircleIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import BookIcon from "@heroicons/react/24/solid/BookOpenIcon";
import BoxIcon from "@heroicons/react/24/solid/ArchiveBoxIcon";
import CartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import MoneyIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ArrowDownCircleIcon from "@heroicons/react/24/solid/ArrowDownCircleIcon";
import NoteIcon from "@heroicons/react/24/solid/BanknotesIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Supplier",
    path: "/supplier",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Daftar Akun",
    path: "/akun",
    icon: (
      <SvgIcon fontSize="small">
        <UserCircle />
      </SvgIcon>
    ),
  },
  {
    title: "Jurnal",
    dropdowns: [
      {
        title: "Penjualan",
        path: "/penjualan",
        icon: (
          <SvgIcon fontSize="small">
            <CartIcon />
          </SvgIcon>
        ),
      },
      {
        title: "Pembelian",
        path: "/pembelian",
        icon: (
          <SvgIcon fontSize="small">
            <NoteIcon />
          </SvgIcon>
        ),
      },
      {
        title: "Pembayaran",
        path: "/pembayaran",
        icon: (
          <SvgIcon fontSize="small">
            <MoneyIcon />
          </SvgIcon>
        ),
      },
      {
        title: "Penerimaan",
        path: "/penerimaan",
        icon: (
          <SvgIcon fontSize="small">
            <ArrowDownCircleIcon />
          </SvgIcon>
        ),
      },
    ],
    icon: (
      <SvgIcon fontSize="small">
        <BookIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Stock",
    path: "/stock",
    icon: (
      <SvgIcon fontSize="small">
        <BoxIcon />
      </SvgIcon>
    ),
  },
];

export const inputItems = [
  {
    title: "Pembelian Stock",
    path: "/pembelian-stock",
    icon: (
      <SvgIcon fontSize="small">
        <NoteIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Penjualan Stock",
    path: "/penjualan-stock",
    icon: (
      <SvgIcon fontSize="small">
        <NoteIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Accounting",
  //   path: "/lain-lain",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <MoneyIcon />
  //     </SvgIcon>
  //   ),
  // },
];
