import * as React from "react";
import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  ProSidebarProvider,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  ListItem,
  Button,
  Icon,
  Chip,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import { useHref, Link } from "react-router-dom";
// import avatar from "../../assets/img/avatar.jpg";
import { tokens } from "../../Theme";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useNavigate } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LgemsLogo from "../../assets/img/LgemsLogo.png";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanguageIcon from "@mui/icons-material/Language";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AirlinesIcon from "@mui/icons-material/Airlines";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GradeIcon from "@mui/icons-material/Grade";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import DescriptionIcon from "@mui/icons-material/Description";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { ReactComponent as UomIcon } from "../../assets/icon/uom.svg";
import { ReactComponent as ProformaInvoiceIcon } from "../../assets/icon/proformainvoice.svg";
import { ReactComponent as SupplierIcon } from "../../assets/icon/supplier.svg";
import { ReactComponent as CustomerIcon } from "../../assets/icon/customer.svg";
import { ReactComponent as MaterialIcon } from "../../assets/icon/material.svg";
import { ReactComponent as BatchIcon } from "../../assets/icon/batch.svg";
import { ReactComponent as ProductIcon } from "../../assets/icon/products.svg";
import { ReactComponent as SubstanceIcon } from "../../assets/icon/substance.svg";
import { Details } from "@mui/icons-material";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FactoryIcon from "@mui/icons-material/Factory";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
const child = {
  data: [
    {
      name: "Masters",
      id: 1,
      Tooltipname: "Maters",
      icon: (
        <Tooltip title="Maters">
          <FactCheckOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      MenuID: "MA100",
      children: [
        {
          name: "Company",
          url: "./TR014/Company",
          id: 11,
          icon: (
            <Tooltip title="Company">
              <BusinessIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR014",
        },
        {
          name: "Bank",
          id: 12,
          url: "./TR022/Bank",
          icon: (
            <Tooltip title="Bank">
              <AccountBalanceIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR022",
        },
        {
          name: "UOM",
          id: 13,
          url: "./TR049/UOM Type",
          icon: (
            <Tooltip title="UOM">
              <UomIcon style={{ width: "1.5em", height: " 1.5em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR049",
        },
        {
          name: "Country",
          url: "./TR025/Country",
          id: 14,
          icon: (
            <Tooltip title="Country">
              <LanguageIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR025",
        },
        // {
        //   name: "Currency",
        //   url: "./TR023/Currency",
        //   id: 15,
        //   icon: (
        //     <Tooltip title="Currency">
        //       <CurrencyRupeeIcon color="info" />
        //     </Tooltip>
        //   ),
        //   UGA_ADD: true,
        //   UGA_DEL: true,
        //   UGA_MOD: true,
        //   UGA_PRINT: true,
        //   UGA_PROCESS: true,
        //   UGA_VIEW: true,
        //   UGA_ACCESSIDS: "TR023",
        // },
        {
          name: "Airlines",
          url: "./TR036/Airlines",
          id: 16,
          icon: (
            <Tooltip title="Airlines">
              <AirlinesIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR036",
        },

        {
          name: "Process Stage",
          url: "./TR072/Process Stage",
          id: 111,
          icon: (
            <Tooltip title="Process Stage">
              <DeveloperBoardIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR072",
        },

        {
          name: "Design Pattern",
          url: "./TR045/Design Pattern",
          id: 113,
          icon: (
            <Tooltip title="Colors">
              <StyleOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR045",
        },
        {
          name: "Remarks",
          url: "./TR058/Remarks Type",
          id: 114,
          icon: (
            <Tooltip title="Remarks">
              <InfoRoundedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR058",
        },

        {
          name: "Grade",
          url: "./TR061/Grade",
          id: 115,
          icon: (
            <Tooltip title="Grade">
              <GradeIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR061",
        },
        
        {
          name: "Purchase Order Parameter",
          url: "./TR157/Paurchase Order Parameter",
          id: 115,
          icon: (
            <Tooltip title="Purchase Order Parameter">
              <GradeIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR061",
        },
        {
          name: "Substance",
          url: "./TR062/Substance",
          id: 116,
          icon: (
            <Tooltip title="Substance">
              <SubstanceIcon style={{ width: "2em", height: " 2em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR062",
        },
        {
          name: "HSN",
          url: "./TR096/HSN",
          id: 117,
          icon: (
            <Tooltip title="HSN">
              <FeaturedPlayListIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR096",
        },
      ],
    },
    {
      name: "Configurations",
      Tooltipname: "Configurations",
      id: 67,
      icon: (
        <Tooltip title="Configurations">
          <ManageAccountsIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      MenuID: "CN100",
      children: [
        {
          name: "Customers",
          url: "./TR010/Customers",
          id: 18,
          icon: (
            <Tooltip title="Customers">
              <CustomerIcon style={{ width: "2em", height: " 2em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR010",
        },
        {
          name: "Suppliers",
          url: "./TR009/Suppliers",
          id: 19,
          icon: (
            <Tooltip title="Suppliers">
              <SupplierIcon style={{ width: "1.5em", height: " 1.5em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR009",
        },
        {
          name: "Colors",
          url: "./TR083/Colors - Material type",
          id: 112,
          icon: (
            <Tooltip title="Colors">
              <ColorLensIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR083",
        },
      ],
    },
    {
      name: "IM",
      Tooltipname: "Inventory Management",
      id: 2,
      icon: (
        <Tooltip title="Inventory Management">
          <LocalGroceryStoreOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      MenuID: "IM200",
      children: [
        {
          name: "Products",
          url: "./TR002/Categories",
          id: 21,
          icon: (
            <Tooltip title="Categories">
              <ProductIcon style={{ width: "2em", height: "2em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR002",
        },
        
        {
          name: "Job-Work Component",
          url: "./TR148/Job-Work",
          id: 255,
          icon: (
            <Tooltip title="Job-Work">
              <ProductIcon style={{ width: "2em", height: "2em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR002",
        },

        {
          name: "Materials",
          url: "./TR044/Materials Type",
          id: 22,
          icon: (
            <Tooltip title="Materials">
              {/* <DescriptionOutlinedIcon color="info" /> */}
              <MaterialIcon style={{ width: "1.8em", height: " 1.8em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR044",
        },
      ],
    },
    {
      name: "Stock",
      Tooltipname: "Stock",
      id: 9,
      MenuID: "SK300",
      icon: (
        <Tooltip title="Stock">
          <Inventory2OutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Opening Stock",
          url: "./TR064/Opening Stock",
          id: 96,
          icon: (
            <Tooltip title="Opening Stock">
              <InventoryIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR064",
        },
        {
          name: "Delivery Challan",
          url: "./TR059/Delivery Type",
          id: 94,
          icon: (
            <Tooltip title="Delivery Challan">
              <LocalShippingIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR059",
        },
        {
          name: "Indent Purchase Order",
          id: 998,
          url: "./TR152/Indent Purchase Order",
          icon: (
            <Tooltip title="Indent Purchase Order">
              <ShoppingCartIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR085",
        },
        {
          name: " Open Purchase Order",
          id: 998,
          url: "./TR155/Open Purchase Order ",
          icon: (
            <Tooltip title="Open Purchase Order ">
              <ShoppingCartIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR085",
        },
        {
          name: "Stock Enquiry",
          url: "./TR078/Stock Enquiry",
          id: 98,
          icon: (
            <Tooltip title="Stock Enquiry">
              <ProductionQuantityLimitsIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR078",
        },
      ],
    },
    {
      name: "MM",
      Tooltipname: "Manufacturing Module",
      id: 7,
      MenuID: "MM400",
      icon: (
        <Tooltip title="Manufacturing Module">
          <FactoryIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Production Card",
          url: "./TR047/Production Card",
          id: 73,
          icon: (
            <Tooltip title="Production Card">
              <SubtitlesOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR047",
        },
        {
          name: "Batch",
          url: "./TR076/Batches",
          id: 75,
          icon: (
            <Tooltip title="Batches">
              <BatchIcon style={{ width: "2em", height: " 2em" }} />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR076",
        },
        {
          name: "Packing List",
          id: 32,
          url: "./TR116/Packing List",
          icon: (
            <Tooltip title="Packing">
              <DescriptionOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR116",
        },
        {
          name: "Leather Packing List",
          id: 32,
          url: "./TR109/Leather Packing List ",
          icon: (
            <Tooltip title="Leather Packing List ">
              <DescriptionOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR109",
        },
      ],
    },
    {
      name: "OM",
      Tooltipname: "Order Management",
      id: 3,
      MenuID: "OM500",
      icon: (
        <Tooltip title="Order Management">
          <PaymentOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Invoice",
          id: 31,
          url: "./TR043/Invoice Types",
          icon: (
            <Tooltip title="Invoice">
              <DescriptionOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR043",
        },

        {
          name: "Order Enquiry",
          id: 7678,
          url: "./TR101/Order Enquiry",
          icon: (
            <Tooltip title="Packing ">
              <DescriptionOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR101",
        },
      ],
    },
    {
      name: "HR",
      id: 4,
      MenuID: "HR600",
      Tooltipname: "Human Resource",
      icon: (
        <Tooltip title="Human Resource">
          <GroupsOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Functions",
          id: 43,
          url: "./TR121/Functions",
          icon: (
            <Tooltip title="Functions">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR121",
        },
        {
          name: "Designation",
          id: 44,
          url: "./TR122/Designation",
          icon: (
            <Tooltip title="Designation">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR122",
        },
        {
          name: "Project",
          id: 44,
          url: "./TR133/Project",
          icon: (
            <Tooltip title="Project">
              <SourceOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR133",
        },
        {
          name: "Department",
          id: 41,
          url: "./TR026/Department",
          icon: (
            <Tooltip title="Department">
              <DeveloperBoardIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR026",
        },

        {
          name: "Employees",
          url: "./TR027/Employees",
          id: 42,
          icon: (
            <Tooltip title="Employees">
              <PeopleAltIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR027",
        },
      ],
    },
    {
      name: "Payroll",
      id: 10,
      MenuID: "EM900",
      Tooltipname: "Employees",
      icon: (
        <Tooltip title="Employees">
          <GroupsOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Employees",
          id: 46,
          url: "./TR027/EmployeePayroll",
          icon: (
            <Tooltip title="Employees">
                <PeopleAltIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR027",
        },
        {
          name: "Salary Component",
          id: 57,
          url: "./TR205/Salary Component",
          icon: (
            <Tooltip title="Salary Component">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR026",
        },
        // {
        //   name: "Employee Allowance",
        //   // id: 45,
        //   url: "./TR152/Employee Allowance",
        //   icon: (
        //     <Tooltip title="Employee Allowance">
        //       <Diversity3Icon color="info" />
        //     </Tooltip>
        //   ),
        //   UGA_ADD: true,
        //   UGA_DEL: true,
        //   UGA_MOD: true,
        //   UGA_PRINT: true,
        //   UGA_PROCESS: true,
        //   UGA_VIEW: true,
        //   UGA_ACCESSIDS: "TR026",
        // },
        {
          name: "Satuary Component",
          id: 59,
          url: "./TR207/Satuary Component",
          icon: (
            <Tooltip title="Satuary Component">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR026",
        },
        {
          name: "Check In",
          id: 45,
          url: "./TR123/Check In",
          icon: (
            <Tooltip title="Check In">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR123",
        },
        {
          name: "Check Out",
          id: 46,
          url: "./TR124/Check Out",
          icon: (
            <Tooltip title="Check Out">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR124",
        },
        
      ],
    },
    {
      name: "FM",
      id: 5,
      MenuID: "FM700",
      Tooltipname: "Finance Module",
      icon: (
        <Tooltip title="Finance Module">
          <GroupsOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "Over Head",
          id: 41,
          url: "./TR085/Over Head",
          icon: (
            <Tooltip title="Over Head">
              <RequestQuoteOutlinedIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR085",
        },
        {
          name: "Fixed Asset Type",
          id: 48,
          url: "./TR135/Fixed Asset Type",
          icon: (
            <Tooltip title="Fixed Asset Type">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR135",
        },
        {
          name: "Finance Category",
          id: 453,
          url: "./TR136/Finance Category",
          icon: (
            <Tooltip title="Finance Category">
              <MonetizationOnIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR136",
        },
        {
          name: "Costing",
          id: 234,
          url: "./TR140/Customer-Product",
          icon: (
            <Tooltip title="Costing">
              <MonetizationOnIcon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR091",
        },
      ],
    },
    {
      name: "Security",
      id: 8,
      Tooltipname: "Security",
      MenuID: "SE100",
      icon: (
        <Tooltip title="Security">
          <GroupsOutlinedIcon sx={{ color: "#651fff" }} />
        </Tooltip>
      ),
      children: [
        {
          name: "User",
          id: 235,
          url: "./TR094/User",
          icon: (
            <Tooltip title="User">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR094",
        },
        {
          name: "User Group",
          id: 236,
          url: "./TR099/Companies",
          icon: (
            <Tooltip title="User Group">
              <Diversity3Icon color="info" />
            </Tooltip>
          ),
          UGA_ADD: true,
          UGA_DEL: true,
          UGA_MOD: true,
          UGA_PRINT: true,
          UGA_PROCESS: true,
          UGA_VIEW: true,
          UGA_ACCESSIDS: "TR099",
        },
      ],
    },
  ],
};

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const colors = tokens(theme.palette.mode);

  function cal() {
    setSelected(title);
    navigate(to);
  }

  return (
    <MenuItem active={selected === title} icon={icon} onClick={cal}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebars = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Product Category");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const company = sessionStorage.getItem("company");
  const year = sessionStorage.getItem("year");
  const Groupaccess = JSON.parse(sessionStorage.getItem("Groupaccess")) || [];
  const Modules = JSON.parse(sessionStorage.getItem("Modules")) || [];
  // console.log("🚀 ~ file: Sidebar.jsx:773 ~ Sidebars ~ Modules:", Modules);
  // console.log("🚀 ~ file: Sidebar.jsx:772 ~ Sidebars ~ Groupaccess:", Groupaccess)

  const handleClicks = (item) => {
    let newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  const [menu, setMenu] = useState({});
  const handleMenu = (children, accessRow) => {
    // console.log("🚀 ~ file: Sidebar.jsx:780 ~ handleMenu ~ accessRow:", accessRow)

    return children.map(
      ({
        children,
        name,
        url,
        icon,
        Tooltipname,
        id,
        UGA_ACCESSIDS,
        MenuID,
      }) => {
        if (!children) {
          return accessRow.map(
            ({
              UGA_ADD,
              UGA_DEL,
              UGA_MOD,
              UGA_PRINT,
              UGA_PROCESS,
              UGA_VIEW,
              UGA_ACCESSID,
            }) => {
              if (
                UGA_ACCESSID === UGA_ACCESSIDS &&
                (UGA_ADD ||
                  UGA_DEL ||
                  UGA_MOD ||
                  UGA_PRINT ||
                  UGA_PROCESS ||
                  UGA_VIEW)
              ) {
                return (
                  <List component="div" disablePadding key={id}>
                    <ListItem
                      disableGutters
                      style={{ padding: "0px" }}
                      key={id}
                    >
                      <Item
                        title={name}
                        to={url}
                        icon={icon}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </ListItem>
                  </List>
                );
              }
            }
          );
        }

        return Modules.map(({ PPD, SM_PMENU }) => {
          if (PPD && SM_PMENU === MenuID) {
            return (
              <div key={id}>
                <ListItem
                  disableGutters
                  key={id}
                  onClick={() => handleClicks(name)}
                >
                  {!collapsed && (
                    <Tooltip title={Tooltipname}>
                      <ListItemButton>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name} />

                        {menu[name] ? (
                          <ExpandMore />
                        ) : (
                          <ChevronRightOutlinedIcon />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  )}
                  {collapsed && (
                    <ListItemButton>
                      <ListItemIcon>
                        {icon}{" "}
                        {menu[name] ? (
                          <ExpandMore />
                        ) : (
                          <ChevronRightOutlinedIcon />
                        )}
                      </ListItemIcon>
                    </ListItemButton>
                  )}
                </ListItem>
                <Collapse
                  in={menu[name] ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  {handleMenu(children, Groupaccess)}
                </Collapse>
              </div>
            );
          }
        });

        //
        // }
      }
    );
  };
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 7,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar breakPoint="md" backgroundColor={colors.primary[400]}>
        <Menu>
          <MenuItem
            icon={
              collapsed ? (
                <IconButton onClick={() => collapseSidebar()}>
                  <MenuOutlinedIcon />
                </IconButton>
              ) : undefined
            }
            style={{
              margin: "10px 0 3px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Avatar
                  variant="rounded"
                  src={LgemsLogo}
                  sx={{ width: "100px" }}
                  onClick={() => {
                    navigate("./Chart");
                  }}
                ></Avatar>

                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="space-around"
              width="91%"
              height="67px"
              mt="16px"
              p="7px"
              ml="8px"
              borderRadius="4px"
              boxShadow="0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)"
            >
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2">{company}</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle2">{year}</Typography>
              </Box>
            </Box>
          )}

          <Box paddingBottom={3}>
            {handleMenu(child.data, Groupaccess)}

         
            <Tooltip title="Logout">
              <ListItemButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <LogoutOutlinedIcon color="error" />
                </ListItemIcon>

                {!collapsed && <ListItemText primary="Logout" />}
              </ListItemButton>
            </Tooltip>

            <Tooltip title="Logout">
              <ListItemButton
                onClick={() => {
                  navigate("/Apps/changepassword");
                }}
              >

                {!collapsed && <ListItemText primary="Change Password" />}
              </ListItemButton>
            </Tooltip>
            <Divider sx={{ mt: 1 }} variant="middle" />
            <Grid mt={1} p={1} container direction={"column"} spacing={2}>
              <Grid item>
                <Chip
                  color="primary"
                  variant="outlined"
                  sx={{ width: "100%", background: "#DFDDDD" }}
                  size="medium"
                  label="Text"
                />
              </Grid>
              <Grid item>
                <Chip
                  color="primary"
                  size="medium"
                  variant="outlined"
                  sx={{ width: "100%", background: "#F0E8B8" }}
                  label="Numeric"
                />
              </Grid>
              <Grid item>
                <Chip
                  color="primary"
                  size="medium"
                  variant="outlined"
                  sx={{ width: "100%", background: "#F0CDB5" }}
                  label="Calculation"
                />
              </Grid>
            </Grid>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebars;
