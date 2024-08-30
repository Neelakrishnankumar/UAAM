import { IconButton,Box ,Stack,Tooltip} from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link }from 'react-router-dom'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';



// Product Category

export const P_columns = [
 
  { field: 'SNo', headerName: 'SNo', width:50},
  { field: 'product', headerName: 'Name', flex:1},
  { field: 'producthsn', headerName: 'HSN #',flex:1 },
  

  { field: 'id', headerName: 'Id',hide:true },
 
];

export const p_rows = [
  {SNo:1, id: 42022110, producthsn: '42022110', product: 'Bag' },
  {SNo:2, id: 42033000, producthsn: '42033000', product: 'Belt' },
  {SNo:3, id: 39, producthsn: '41079900', product: 'bed'},
  
];

// Product Masters




export  const PM_columns = [
 
  
    { field: 'product', headerName: 'Name', width: 170 },
    { field: 'ModelNo', headerName: 'Model No',flex:1 },
    { field: 'id', headerName: 'Id',flex:1 ,hide:true},
    { field: 'Description', headerName: 'Description',flex:1 },
    // { field: 'SortOrder', headerName: 'Sort Order',flex:1 },
    // { field: 'Disable', headerName: 'Disable',flex:1 },
    { field: 'CreatedDate', headerName: 'Created Date',flex:1 },

  ];
  
  export  const PM_rows = [
   
    { id: 32, product: 'NET MISC', ModelNo: '5456',SortOrder:'1',Disable:'N',CreatedDate:'12/16/2022',Description:''},
    { id: 33, product: 'TRFFETA FBBRIC BLACK', ModelNo: '5456',SortOrder:'2',Disable:'Y',CreatedDate:'12/16/2022',Description:''},
    { id: 34, product: 'COW PROMO NAAPPA', ModelNo: '5456',SortOrder:'3',Disable:'N',CreatedDate:'12/16/2022',Description:''},
  ]

// Material category

export  const M_columns = [
  { field: 'id', headerName: 'Id' , width: 170},
    { field: 'categoryname', headerName: 'Name', width: 170 },
    { field: 'visible', headerName: 'Total Hides Visible' , width: 170},
    // { field: 'start', headerName: 'Start With' , width: 170},
   
    // { field: 'sortorder', headerName: 'SortOrder' , hide:true},
    // { field: 'disable', headerName: 'Disable' , hide:true},
    { field: 'createddate', headerName: 'CreatedDate' , width: 170},
    
  ];
  
  export const M_rows = [
    { id: 1, categoryname: 'ACCESSORIES', start: 'A',visible:'False ', sortorder:1,disable:'Y',createddate:20221216},
    { id: 2, categoryname: 'BOARD & CARDS', start: 'BC' ,visible:'False ',sortorder:2,disable:'Y',createddate:20221216},
    { id: 18, categoryname: 'BUTTON & RIVIT', start: 'B',visible:'False ',sortorder:3,disable:'Y',createddate:20221216},
    { id: 3, categoryname: 'COVERS ', start: 'C',visible:'False ',sortorder:4,disable:'Y',createddate:20221216},
  ];


  // Proforma 

  export const Pro_columns = [
  { field: 'id', headerName: 'ID' ,hide:true},
  { field: 'datewid', headerName: 'ID', width: 170 },
  { field: 'date', headerName: 'Date' },
  { field: 'ref', headerName: 'Ref#' },
  { field: 'inv', headerName: 'Inv #' },
  { field: 'cons', headerName: 'Consignee' },
  { field: 'buy', headerName: 'Buyer' },
 
]

export const Pro_rows = [
  { id: 1, datewid: '18/22-23', date: '7/12/2022',ref:'TL-17/22-23',inv:'/22-23',cons:'M/S EM-EL COLLECTION GmbH',buy:'M/S EM-EL COLLECTION GmbH', },
  { id: 2, datewid: '17/22--23', date: '29/11/2022',ref:'TL-16/22-23',inv:'13/22-23',cons:'M/S Pageants(FZE)',buy:'M/S Pageants(FZE)', },
  { id: 3, datewid: '16/22-23', date: '14/12/2022',ref:'TL-14/22-23',inv:'14/22-23',cons:'M/S EM-EL COLLECTION GmbH',buy:'M/S EM-EL COLLECTION GmbH', },

];


export  const ML_columns = [
 
  
  { field: 'product', headerName: 'Name', width: 170 },
  { field: 'ModelNo', headerName: 'Model No',flex:1 },
  { field: 'id', headerName: 'Id',flex:1 ,hide:true},
  { field: 'Description', headerName: 'Description',flex:1 },
  // { field: 'SortOrder', headerName: 'Sort Order',flex:1 ,hide:true},
  // { field: 'Disable', headerName: 'Disable',flex:1 ,hide:true},
  { field: 'CreatedDate', headerName: 'Created Date',flex:1 },
   




];


export  const ML_rows = [
 
  { id:1 ,product: 'Feirik-black', ModelNo: '5456',CreatedDate:'12/16/2022',Description:''},
  { id:2 , product: 'Thin black board', ModelNo: '5456',CreatedDate:'12/16/2022',Description:''},
  {id:3 ,  product: 'COW PROMO NAAPPA', ModelNo: '5456',CreatedDate:'12/16/2022',Description:''},
]