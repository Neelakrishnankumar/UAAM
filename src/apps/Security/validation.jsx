import * as yup from "yup";
import * as Yup from "yup";

export const valid = Yup.object().shape({
  code: Yup.string().required("Required"),
  description: Yup.string().required("required"),
  sortOrder: Yup.string().required("required"),
});

/*************************COMPANY SCREEN*********************/
export const companySchema = yup.object().shape({
  // code:yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ").min(3).max(5),
  address: yup.string().max(500, "Address must be 500 character "),
   phone: yup.string().max(10, "Not Valid Phone Number"),
  // phone:yup.number().min(10),
  pincode: yup
    .number()
    .min(10000, "Not Valid Pin Number")
    .max(999999, "Not Valid Pin Number"),
  iECode: yup
    .string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ")
    .min(10, "I.E.Code must be 10 character"),
  rbiCode: yup
    .string()
    .min(5, "RBI Code must be 5 character")
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets "),
  gst: yup
    .string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ")
    .min(15, "GST must be 15 character"),

  web: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter a valid url!"
    ),
  fax: yup.string().min(11, "fax must be 11 character"),
  email: yup.string().email("Please enter a valid email"),
  name: yup
    .string()
    .max(50)
    .matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets "),
});

/********************* BANK MASTER SCREEN*************************/
export const bankmasterSchema = yup.object().shape({
  // code:yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ").min(10,"Code must be 10 character"),
  description: yup
    .string()
    .matches(/^[a-zA-Z0-9\s\.'-]+$/, "Only Numeric and Alphabets ")
    .min(3, "Description must  least 3 character"),
  address: yup.string().max(500),
  phone: yup
    .number()
    .min(10000000000, "Not Valid Phone Number")
    .max(99999999999, "Not Valid Phone Number"),
  fax: yup
    .number()
    .min(10000000000, "FAX must be 11 character")
    .max(99999999999, "FAX must be 11 character"),
});

/********************* Packing SCREEN*************************/
export const packingSchema = yup.object().shape({
  // code:yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ").min(10,"Code must be 10 character"),
  code: yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets"),
});

/************************* PROCESS SCREEN *********************/
export const processSchema = yup.object().shape({
  // Code:yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets ").min(5,"Code must be 5 character"),
  Description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets "),
});

/************************* REMARKS SCREEN *********************/
export const RemarksSchema = yup.object().shape({
  // remarkCode:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets").min(5,"Code must be 5 character"),
  remarkDescription: yup
    .string()
    .matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets "),
});

/************************* DESIGN PATTERN SCREEN *********************/
export const designpatternSchema = yup.object().shape({
  // Code:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets").max(5,"Code must be 5 character"),
  Description: yup.string().matches(/^[A-Za-z\s\.'-+&]+$/, "Only  Alphabets "),
});

/************************* SUBSTANCE SCREEN *********************/
export const substanceSchema = yup.object().shape({
  // Code:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets").max(5,"Code must be 5 character"),
  Description: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s-.]+$/, "Only Numeric and Alphabets "),
});

/************************* GRADE SCREEN *********************/
export const gradeSchema = yup.object().shape({
  // Code:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets").max(5,"Code must be 5 character"),
  Description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets"),
});
/************************* RATINGS SCREEN *********************/
export const ratingsSchema = yup.object().shape({
  // Code:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets").max(5,"Code must be 5 character"),
  Description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets"),
});
/************************* COLORS SCREEN *********************/
export const colorsSchema = yup.object().shape({
  Code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets")
    .min(1, "Code minimum be 1 character")
    .max(5, "Code must be 5 character"),
  Description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets"),
});

/************************* COLOR SHADES SCREEN *********************/
export const colorshadesSchema = yup.object().shape({
  Code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only Numeric and Alphabets")
    .min(3, "Code minimum 3 character")
    .max(5, "Code maximum 5 character"),
  Description: yup.string().matches(/^[-_ a-zA-Z]+$/, "Only  Alphabets"),
});

/************************* UOM SCREEN *********************/
export const uomSchema = yup.object().shape({
  code: yup.string().matches(/^[-_ a-zA-Z]+$/, "Only  Alphabets"),
  description: yup
    .string()
    .matches(/^[a-zA-Z0-9\s'-.]+$/, "Only alphanumeric character"),
});

/************************* UOM CONVERSION SCREEN *********************/
export const uomconversionSchema = yup.object().shape({
  // Conversion:yup.string().matches(/^[-_ a-zA-Z]+$/, "Only  Alphabets").min(2,"Code must minimum 2 character").max(3, "Code must be 3 character"),
  Description: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  // Conversion: yup.string().matches(/^[0-9]+(\.[0-9]{1,4})?$/, "Numeric and maximum of 10 decimal places").max(10,"Maximum Length is Ten")
});

/************************* COUNTRY SCREEN *********************/
export const countrySchema = yup.object().shape({
  // Code:yup.string().matches(/^[-_ a-zA-Z]+$/, "Only  Alphabets"),
  Name: yup
    .string()
    .matches(/^[A-Za-z\s\.&()'-]+$/, "Only  Alphabets")
    .min(3, "Name must minimum 3 character"),
});

/************************* SEA PORT SCREEN *********************/
export const seaportSchema = yup.object().shape({
  PortCode: yup
    .string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets"),
  PortDescription: yup
    .string()
    .matches(/^[-_ a-zA-Z]+$/, "Only  Alphabets")
    .min(3, "Description must minimum 3 character"),
});

/************************* AIR PORT SCREEN *********************/
export const airportSchema = yup.object().shape({
  PortCode: yup
    .string()
    .matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets"),
  PortDescription: yup
    .string()
    .matches(/[-_ a-zA-Z]+$/, "Only  Alphabets")
    .min(3, "Description must minimum 3 character"),
});

/************************* REX SCREEN *********************/
export const rexSchema = yup.object().shape({
  RexCode: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  RexDescription: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d/\s]+$/, "Only alphanumeric character")
    .min(3, "Description must minimum 3 character"),
});

/************************* CURRENCY SCREEN *********************/
export const currencySchema = yup.object().shape({
  // Code:yup.string().matches(/^[-_ a-zA-Z]+$/, "Only  Alphabets").min(3,"Code must minimum 3 character"),
  Description: yup
    .string()
    .matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets")
    .min(3, "Description must minimum 3 character"),
  MinorDescription: yup
    .string()
    .matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets")
    .min(3, "Description must minimum 3 character"),
  Decimal: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,2})?$/,
      "Numeric and maximum of 2 decimal places "
    )
    .max(6, "Maximum Length is Six"),
  Rate: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(6, "Maximum Length is Six"),
  Fixedrate: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(6, "Maximum Length is Six"),
});

/************************* CURRENCY WISE BANK DETAILS SCREEN *********************/
export const curwisebankSchema = yup.object().shape({
  Address: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s-@/#&,.]+$/, "Only  Alphabets"),
});

/************************* AIRLINES SCREEN *********************/
export const airlinesSchema = yup.object().shape({
  // Code:yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets"),
  Description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets"),
});

/************************* TARIF SCREEN *********************/
export const tarifSchema = yup.object().shape({
  FromKg: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,4})?$/,
      "Numeric and maximum of 4 decimal places "
    ),
  Tokg: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,4})?$/,
      "Numeric and maximum of 4 decimal places "
    ),
  RatePerKg: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,2})?$/,
      "Numeric and maximum of 2 decimal places "
    )
    .max(9, "Maximum Length is Nine"),
  HandCharge: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,2})?$/,
      "Numeric and maximum of 2 decimal places "
    )
    .max(9, "Maximum Length is Nine"),
});

/**************************SATUARY SCREEN*********************/
export const SatuarySchema = yup.object().shape({
  Name: yup
    .string()
    .matches(/^[a-zA-Z0-9\/\s\.&'-]+$/, "Only alphanumeric character"),
  sortOrder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});

/************************* CUSTOMERS SCREEN *********************/
export const customersSchema = yup.object().shape({
  // Code:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  Name: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/\.&'-]+$/, "Only alphanumeric character"),
  Address1: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s-./#,]+$/, "Only alphanumeric character"),
  // Email:yup.string().matches( /[a-z0-9]+@gmail/, "Please enter a valid email").email("Please enter a valid email"),
  Contact: yup.string().matches(/^[A-Za-z\/\s'-]+$/, "Only  Alphabets"),
  Web: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter a valid url!"
    ),
  Phone: yup
    .string()
    .max(20, "Phone must be 20 character"),
  // Fax:yup.string().max(11,"Phone must be 11 character"),
  Fac: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)[%] ?$/,
      "percentage and maximum of 2 decimal places"
    ),
  Lac: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)[%] ?$/,
      "percentage and maximum of 2 decimal places"
    ),
});

/************************* CUSTOMER NOTIFICATION SCREEN *********************/
export const cusnotifySchema = yup.object().shape({
  Purpose: yup
    .string()
    .matches(/[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  Response: yup
    .string()
    .matches(/[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
});

/************************* CUSTOMER PRODUCT SCREEN *********************/
export const cusproductSchema = yup.object().shape({
  // AgreedPrice:yup.string().matches(/^[0-9]+(\.[0-9][0-9][0-9]?)?$/, "Numeric and maximum of 3 decimal places").max(10,"Maximum Length is Ten")

  Diesdesc: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s.'-()]+$/, "Only Numeric and Alphabets "),
});

/************************* SUPPLIERS SCREEN *********************/
export const suppliersSchema = yup.object().shape({
  // Code:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  Name: yup
    .string()
    .matches(/^[a-zA-Z0-9\s\.&'-]+$/, "Only alphanumeric character"),
  Email: yup.string().email("Please enter a valid email"),
  Address1: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s-./#,]+$/, "Only alphanumeric character"),
  Ph1: yup
    .string()
    .matches(/^[0-9\d\s]+$/, "Only Numeric ")
    .max(10, "Phone must be 10 character"),
  Ph2: yup
    .string()
    .matches(/^[0-9\d\s]+$/, "Only Numeric ")
    .max(10, "Phone must be 10 character"),
  Fax: yup.string().max(11, "Fax must be 11 character"),
  Gst: yup
    .string()
    .matches(/[a-zA-Z\d\s]+$/, "Only alphanumeric character")
    .max(15, "Maximum Length is fifteen"),
  Cst: yup
    .string()
    .matches(/^[0-9]+(\.[0-9][0-9]?)?$/, "Only Numeric ")
    .max(8, "CGST must be 8 character"),
  Tngst: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
});

/************************* SUPPLIER MATERIALS SCREEN *********************/
export const supmaterialSchema = yup.object().shape({
  OrderQty: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 4 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
  DeliverQty: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 4 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
  PendingQty: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 4 decimal places"
    ),
  AgreedPrice: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
});

/************************* SUPPLIERS NOTIFICATION SCREEN *********************/
export const supnotifySchema = yup.object().shape({
  Purpose: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  Response: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
});

/************************* DELIVERY CHALAN SCREEN *********************/
export const deliverychalanSchema = yup.object().shape({
  // Code:yup.string().matches(/^[-_ a-zA-Z0-9]+$/, "Only Numeric and Alphabets "),
});

/************************* PRODUCT CATEGORIES SCREEN *********************/
export const productcategoriesSchema = yup.object().shape({
  HsnCode: yup
    .string()
    .matches(/^[-_ 0-9]+$/, "Only Numeric")
    .min(4,"Minimum Length is Four")
  .max(8, "Maximum Length is Eight"),
  Code: yup
    .string()
    .matches(/^[-_ 0-9]+$/, "Only Numeric")
    .max(3, " Code must be 3 character"),
  desc: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets"),
  Cgst: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(8, "Maximum Length is Eight"),
  Sgst: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(8, "Maximum Length is Eight"),
  Igst: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(8, "Maximum Length is Eight"),
});

/************************* PRODUCTS SCREEN *********************/
export const productsSchema = yup.object().shape({
  ModelNo: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s-]+$/, "Only Numeric and Alphabets "),
  Desc: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s.'(),-]+$/, "Only Numeric and Alphabets "),
  Ppday: yup
    .string()
    .matches(/^[-_ 0-9]+$/, "Only Numeric")
    .max(5, " Code must be 5 character"),
  Height: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  Length: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  Breadth: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  Width: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  Weight: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  NetWeight: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
});

/************************* PRODUCTS SCREEN *********************/
export const productsHeaderSchema = yup.object().shape({
  modelNo: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s-]+$/, "Only Numeric and Alphabets "),
  description: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s.'-(),@\&]+$/, "Only Numeric and Alphabets "),
  productionPerDay: yup
    .string()
    .matches(/^[-0-9\d\s]+$/, "Only Numeric")
    .max(10, " Production Per Day must be 10 character"),
  height: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  length: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  Breadth: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  width: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  weight: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  netWeight: yup
    .string()
    .max(20, "Maximum Length is Twenty")
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
});

/************************* PRODUCT BOM SCREEN *********************/
export const probomSchema = yup.object().shape({
  // Quantity:yup.string().matches(/^[0-9]+(\.[0-9]{1,3})?$/, "Numeric and maximum of 3 decimal places").max(10,"Maximum Length is Ten"),
  bomQuantity: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,3})?$/,
      "Numeric and maximum of 3 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
  MtlCost: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    ),
});

export const proBomSchema = yup.object().shape({
  // bomQuantity:yup.string().matches(/^[0-9]+(\.[0-9][0-9][0-9][0-9])?$/, "Numeric and maximum of 4 decimal places").max(10,"Maximum Length is Ten"),
  bomQuantity: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9]{1,4})?$/,
      "Numeric and maximum of 4 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
});


/************************* CUSTOMER PRICE SCREEN *********************/
export const customerSchema = yup.object().shape({
  agreedPrice: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
});
/************************* MATERIAL CATEGORIES SCREEN *********************/

export const materialcategoriesSchema = yup.object().shape({
  Code: yup
    .string()
    .matches(/^[-_ 0-9]+$/, "Only Numeric")
    .min(1, " Code must be 1 character"),
  Desc: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s-.&()]+$/, "Only Numeric and Alphabets "),
  Desc1: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s-./&()]+$/, "Only Numeric and Alphabets "),
  Mgroup: yup
    .string()
    .matches(/^[a-zA-Z0-9\d\s-]+$/, "Only Numeric and Alphabets ")
    .min(1, "Search Phrase minimum 1 Character"),
});

/************************ MATERIAL  SCREEN ********************/
export const materialSchema = yup.object().shape({
  // MaterialCode:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s]+$/, "Only alphanumeric character"),
  // MaterialDescription: yup
  //   .string()
  //   .matches(/^[a-zA-Z0-9\d\s-.&()*,]+$/, "Only Numeric and Alphabets "),
  // FixRate:yup.string().matches(/^[0-9]+(\.[0-9][0-9]?)?$/, "Numeric and maximum of 2 decimal places").max(9,"Maximum Length is Nine"),
  //Length:yup.string().matches(/^[0-9]+(\.[0-9][0-9][0-9][0-9]?)?$/, "Numeric and maximum of 4 decimal places"),
  Limit: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(9, "Maximum Length is Three"),
  // Wastage:yup.string().matches(/^[0-9\s]+$/, "Only Numeric").min(1," Wastage must be 1 character"),
});

/************************* MATERIAL SUPPLIER SCREEN *********************/
export const matsupplierSchema = yup.object().shape({
  ApprovedPrice: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  ReorderQty: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  Ratingormark: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
  Location: yup.string().matches(/^[A-Za-z\/\s'-]+$/, "Only  Alphabets"),
  LatestPrice: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    ),
});

/************************* PROFORMA INVOICE SCREEN *********************/
export const proformainvoiceSchema = yup.object().shape({
  // Id:yup.string().matches(/^[0-9\s/-]+$/, "Only Numeric"),
  Id: yup
    .string()
    .matches(/^[a-zA-Z0-9\/\s\.'-]+$/, "Only alphanumeric character"),
  OrderBrief: yup.string().matches(/[a-zA-Z\s]+$/, "Only  Alphabets"),
  // ProformaNo: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  Sample: yup.string().matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
  Amount: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    )
    .max(8, "Maximum Length is Eight"),
});

/************************* PROFORMA TRAILER SCREEN *********************/
export const proformatrailerSchema = yup.object().shape({
  BuyerOrder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  // Precarrbyreciept: yup
  //   .string()
  //   .matches(/^(?!\d+\b)[a-zA-Z0-9\d\s/]+$/, "Only alphanumeric character"),
  // Precarrby: yup
  //   .string()
  //   .matches(/^(?!\d+\b)[a-zA-Z0-9\d\s/]+$/, "Only alphanumeric character"),
  Otherref: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z0-9\d\s/]+$/, "Only alphanumeric character"),
  Detect: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    )
    .max(10, "Maximum Length is Ten"),
 
});

/************************* PROFORMA ACCOUNT SCREEN *********************/
export const proformaaccountSchema = yup.object().shape({
  Referencecode: yup.string().matches(/[a-zA-Z\s]+$/, "Only  Alphabets"),
  Refcode: yup.string().matches(/[a-zA-Z\s]+$/, "Only  Alphabets"),
  Paymentterms: yup
    .string()
    .matches(/[a-zA-Z\s]+$/, "Only  Alphabets")
    .max(15),
  // Deliveryperiod:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s/-]+$/, "Only alphanumeric character"),
  // Freightrate:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
});

/************************* PROFORMA OTHER  SCREEN *********************/
export const proformaotherSchema = yup.object().shape({
  Itemheader: yup.string().matches(/[a-zA-Z\s]+$/, "Only  Alphabets"),
  Notify: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets "),
  Itemfooter: yup
    .string()
    .matches(/[a-zA0-9-Z\s]+$/, "Only Numeric and Alphabets "),
});

/************************* PROFORMA  ITEM  SCREEN *********************/
export const proformaitemsSchema = yup.object().shape({
  Hide: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    ),
  Hidesqft: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    ),
  Side: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    ),
  Sidesqft: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    ),
  Rate: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9]?)?$/,
      "Numeric and maximum of 2 decimal places"
    )
    .max(8, "Maximum Length is Eight"),
  Comments: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
});

/************************* BATCH ISSUE  SCREEN *********************/
export const BatchIssueSchema = yup.object().shape({
  Reference: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
});
/************************* OPENING STOCK SCREEN *********************/
export const OpeningstockSchema = yup.object().shape({
  Reference: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets")
    .max(15),
});
/************************* Hsn SCREEN *********************/
export const HsnSchema = yup.object().shape({
  hsnCode:yup.string().matches(/^[0-9\s]+$/, "Only Numeric")
  .min(4,"Minimum Length is Four")
  .max(8, "Maximum Length is Eight"),
  sgst: yup.string().matches(/^[0-9]+(\.[0-9][0-9]?)?$/,"Numeric and maximum of 2 decimal places")
  .max(8, "Maximum Length is Two"),
  cgst: yup.string().matches(/^[0-9]+(\.[0-9][0-9]?)?$/,"Numeric and maximum of 2 decimal places")
  .max(8, "Maximum Length is Two"),
  igst: yup.string().matches(/^[0-9]+(\.[0-9][0-9]?)?$/,"Numeric and maximum of 2 decimal places")
  .max(8, "Maximum Length is Two"),
  sortOrder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});
/************************* Hsn Location *********************/
export const LocationSchema = yup.object().shape({
  // code:yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  code: yup
    .string()
    .matches(/^[a-zA-Z0-9\/\s\.'-]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  address: yup
    .string()
    .matches(/^[a-zA-Z0-9\/\s\.'-]+$/, "Only alphanumeric character"),
  locationnumber: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  // Contact:yup.string().matches(/^[A-Za-z\/\s'-]+$/, "Only  Alphabets"),
  contactnumber: yup
    .string()
    .matches(/^[0-9\d\s-]+$/, "Only Numeric ")
    .max(20, "Phone must be 20 character"),
  contactmail: yup
    .string()
    .matches(/[a-z0-9]+@gmail/, "Please enter a valid email")
    .email("Please enter a valid email"),
  sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  // Precarrby:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  // Otherref:yup.string().matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),

  // Add:yup.string().matches(/^[0-9]+(\.[0-9][0-9][0-9]?)?$/, "Numeric and maximum of 3 decimal places").max(10,"Maximum Length is Ten"),
});

export const GateSchema = yup.object().shape({
  // code:yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  code: yup
    .string()
    .matches(/^[a-zA-Z0-9\/\s\.'-]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  comment: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
  sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});

export const BinSchema = yup.object().shape({
  bincode: yup
    .string()
    .matches(/^[a-zA-Z0-9\/\s\.'-]+$/, "Only alphanumeric character"),
  binname: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});
export const FunctionSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});
export const DesignationSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  // rank: yup
  // .string()
  // .matches(
  //   /^[0-9]+(\.[0-9][0-9]?)?$/,
  //   "Numeric and maximum of 2 decimal places"
  // )
  // .max(8, "Maximum Length is Eight"),
  rank: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
  sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});
export const OverheadSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
});
export const FinanceSchema = yup.object().shape({
  referenceifany: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  amount: yup
    .string()
    .matches(
      /^[0-9]+(\.[0-9][0-9][0-9]?)?$/,
      "Numeric and maximum of 3 decimal places"
    )
    .max(8, "Maximum Length is Eight"),
  comments: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  approvedby: yup.string().matches(/[a-zA-Z\s]+$/, "Only  Alphabets"),
});
export const UserSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  password: yup.string().required("Please enter password"),
  comfirmpassword: yup.string().required("Please enter password"),
  email: yup.string().email("Please enter a valid email"),
  comments: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
  sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});
export const DailytaskSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets "),
  Comment: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
});
export const DailyHoursTaskSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  description: yup.string().matches(/^[A-Za-z\s\.'-]+$/, "Only  Alphabets "),
  Comment: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),
});
//  ****************Department**********
// export const DepartmentSchema = yup.object().shape({
//   // code:yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
//   Code: yup
//     .string()
//     .matches(/[a-zA-Z\s]+$/, "Only alphanumeric character"),
//     Loc: yup
//     .string()
//     .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
//   Name: yup
//     .string()
//     .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
//     SortOrder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
// });

export const deptSchema=yup.object().shape({
  Code: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only alphanumeric character"),
    Loc: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
  Name: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
    SortOrder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
});
// fixed asset catagory

export const fixedassetSchema=yup.object().shape({
  code: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only alphanumeric character"),
    name: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
    comment: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
    sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
    
});

//Finance Entry
export const financeentrySchema=yup.object().shape({
  referenceifany: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only alphanumeric character"),
    amount: yup
    .string()
    .matches(/[0-9\s]+$/, "Only Numeric"),
    comments: yup
    .string()
    .matches(/[a-zA-Z0-9\s]+$/, "Only Numeric and Alphabets"),
    // sortorder: yup.string().matches(/^[0-9\s]+$/, "Only Numeric"),
    
});

/***********************Edit Purchase order*******************************************/
export const PurchaseOrderNoSchema = yup.object().shape({
 
  purchaseorderno: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z\d\s/]+$/, "Only alphanumeric character"),
  name: yup.string().matches(/[a-zA-Z\s/,.-]+$/, "Only  Alphabets"),

});


 /******************* Login screen ************************** */
export const basicSchema = yup.object().shape({
 
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
  company: yup.string().required("Please choose company"),
  year: yup.string().required("Please choose year"),

  /******************* Product category************************** */
  HsnCode: yup.string().max(15),
  code: yup.string().max(8),
  desc: yup.string().max(50),
  //SortOrder:yup.number('Please enter a number').required('Please fill out this field'),
  SortOrder: yup.number(),

  /******************* Product ************************** */
  Code: yup
    .string()
    .max(5)
    .matches(/^[0-9a-z]+$/, "Only Numeric and Alphabets "),
  ModelNo: yup.string().max(10),
  Desc: yup.string().max(50),
  Pgrid: yup
    .number("Please enter a number")
    .required("Please fill out this field"),
  LeaPattern: yup.string().required("Please fill Leather pattern"),
  LinePattern: yup.string().required("Please fill Line pattern"),
  Bomothers: yup.number(),
  Frqty: yup.number(),
  Height: yup.number(),
  Length: yup.number(),
  Breadth: yup.number(),
  Width: yup.number(),
  Weight: yup.number(),
  NetWeight: yup.number(),

  /******************* Material Category ************************** */
  Mgroup: yup.string().min(1).max(2),

  /******************* Material ************************** */
  MgrId: yup
    .number("Please enter a number")
    .required("Please choose material category"),
  Buom: yup.string().max(30),
  Conuom: yup.string().max(30),
  Color: yup.string().max(20),
  Limit: yup.number(),
  Wastage: yup.number(),
  Supp1: yup.string().max(15),
  Supp2: yup.string().max(15),
  Supp3: yup.string().max(15),
  FixRate: yup.number(),
  LateRate: yup.number(),
  Reorder: yup.number(),
  Mark: yup.string().max(1),
  Location: yup.string().max(20),
  Page: yup.string().max(5),
  MaterialCode: yup.string().max(8),
  MaterialDescription: yup.string().max(50),
  // Limit:yup.number(),
  // Wastage:yup.number(),
  //checkBox: yup.boolean().oneOf([true] ,"Accept terms&conditions"),

  //************************BOM Insert ***********************//
  MtlCode: yup.string(),
  Quantity: yup.number(),
  MtlCost: yup.number(),

  //************************Customer master ***********************//
  Name: yup.string().max(45),
  Bank: yup.number(),
  Address1: yup.string().max(100),
  Address2: yup.string().max(150),
  CountryOrigin: yup
    .string()
    .min(2, "Country Origin must be at least 2 characters")
    .max(25),
  CountryDestination: yup
    .string()
    .min(2, "Country Destination must be at least 2 characters")
    .max(25),
  PortFinalDestination: yup.string().max(30),
  PortDischarge: yup.string().max(30),
  PortPreCarriage: yup.string().max(30),
  PortLoading: yup.string().max(30),
  Fac: yup.number().max(20),
  Lac: yup.number().max(20),
  Contact: yup.string().max(50),
  //  Email:yup.string().email("Please enter a valid email"),
  Web: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter a valid url!"
    ),
  //  Phone:yup.number().min(1000000000,"Not Valid Phone Number").max(9999999999,"Not Valid Phone Number"),
  Fax: yup.string().max(11),

  //************************Customer notification ***********************//
  Response: yup.string().max(75),
  Purpose: yup.string().max(50),

  //************************Customer Product ***********************//
  OrderQty: yup.number(),
  DeliveredQty: yup.number(),
  PendingQty: yup.number(),
  AgreedPrice: yup.number(),

  //************************Supplier master ***********************//

  Ph1: yup
    .number()
    .min(1000000000, "Not Valid Phone Number")
    .max(9999999999, "Not Valid Phone Number"),
  Ph2: yup
    .number()
    .min(1000000000, "Not Valid Phone Number")
    .max(9999999999, "Not Valid Phone Number"),
  Gst: yup.string().max(75),
  Width: yup.number(),
  Cst: yup.string().max(25),
  Tngst: yup.string().max(25),
  Address2: yup.string().max(150),
  ReorderQty: yup.number(),
  LeadTime: yup.number(),
  Ratingormark: yup.number(),
  LatestPrice: yup.number(),
  LatestPurchaseQty: yup.number(),
  Location: yup.string().max(50),

  /***************************** Company********************/
  Address: yup.string().max(500, "Address must be 500 character "),
  Phone: yup
    .number()
    .min(10000000000, "Not Valid Phone Number")
    .max(99999999999, "Not Valid Phone Number"),
  Pincode: yup
    .number()
    .min(10000, "Not Valid Pin Number")
    .max(999999, "Not Valid Pin Number"),
  Tngst: yup.string().max(8),
  Cst: yup.string().max(8),
  Iecode: yup
    .string()
    .max(10)
    .matches(/^[0-9a-z]+$/, "Only Numeric and Alphabets "),
  Rbicode: yup
    .string()
    .max(10)
    .matches(/^[0-9a-z]+$/, "Only Numeric and Alphabets "),
  Gst: yup.string().max(10),
  Pincode: yup.string().max(6),
  Areacode: yup.string().max(6),
  Web: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter a valid url!"
    ),


  /***************************** Tax Master********************/

  Cgst: yup.number(),
  Sgst: yup.number(),
  Igst: yup.number(),
  Remarks: yup.string().max(100),

  /***************************** Employee********************/
  Loc: yup.string().max(100),
  Job: yup.string().max(100),
  Comm: yup.string().max(1000),
  Mgr: yup.string().max(100),
  Sal: yup.string().max(11),
  DeptRecordID: yup.string().max(11),

  /***************************** port********************/
  PortDescription: yup.string().max(45),

  /***************************** Rex********************/
  PortDescription: yup.string().max(45),
  Line: yup.string().max(2000),

  /*************************Process********* */
  Description: yup.string().max(45),

  /*************************UOM********* */
  Conversion: yup.string().max(45),

  /*************************department********* */
  Loc: yup
    .string()
    .matches(/[-_ a-zA-Z]+$/, "Only  Alphabets")
    .max(100),
  Name: yup
    .string()
    .matches(/^(?!\d+\b)[a-zA-Z0-9\s]+$/, "Only alphanumeric character"),
  /*************************Country********* */
  PortCode: yup.string().max(8),
  PortDescription: yup.string().max(50),
  RexCode: yup.string().max(8),
  RexDescription: yup.string().max(50),

  /*************************currency********* */
  Description: yup.string().max(45),
  Decimal: yup.number(),
  Rate: yup.number(),

  /*************************proforma********* */
  Hide: yup.number(),
  Hidesqft: yup.number(),
  Side: yup.number(),
  Sidesqft: yup.number(),
  ProductQuantity: yup.number(),
  Consignee: yup.string().max(25),
  Buyer: yup.string(),
  ProformaNo: yup.string().max(25),
  Sample: yup.string().max(16),

  /*********************REMARKS********* */

  remarkCode: yup.string().max(10, "Code must be at most 10 characters"),
  remarkDescription: yup.string().max(50),

  /*********************CUSTOMERORDER*********/

  receiverid: yup.number(),
  sample: yup.string().max(1),
  orderno: yup.string().max(15),
  date: yup.string().max(50),
  dispatchdate: yup.string().max(50),
  proformano: yup.number(),
  customerid: yup.number(),
  customerorderid: yup.number(),
  approvaldate: yup.string().max(50),
  destinationdate: yup.string().max(50),
  freight: yup.string().max(1),
  freightpercent: yup.number(),
  sortorder: yup.number(),

  /*********************Delivery Chalan******************/

  date: yup.string().max(50),
  receiver: yup.string().max(50),
  instruction: yup.string().max(2000),
  dispatchdetails: yup.string().max(50),
  documentthrough: yup.string().max(50),
  modeoftransport: yup.string().max(15),
  vehicleregistration: yup.string().max(50),
  reason: yup.string().max(1),
  remarkid: yup.number(),
  productioncardheader: yup.number(),
  sortorder: yup.number(),

  /*********************Tarif******************/
  FromKg: yup.number().max(45),
});

export default basicSchema;
