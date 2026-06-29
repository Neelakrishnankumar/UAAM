import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Paper,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fileUpload, imageUpload } from "../../../store/reducers/Imguploadreducer";
import { AcademicAutocomplete, CheckinAutocomplete, GradeAutocomplete } from "../../../ui-components/global/Autocomplete";
import { useLocation, useNavigate } from "react-router-dom";
import { getFetchData, postData } from "../../../store/reducers/Formapireducer";

import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadIcon from "@mui/icons-material/Download";
import AdmissionPDF from "./AdmissionPDF";
/* ================= VALIDATION ================= */
const validationSchema = Yup.object({
dob: Yup.string().required("Please select DOB"),
gender: Yup.string().required("Please select Gender"),
// academicyear: Yup.object().required("Please select Academic Year"),
academicyear: Yup.object()
  .nullable()
  .required("Please select Academic Year"),
grade: Yup.object()
  .nullable()
  .required("Please select Grade"),
// grade: Yup.string().required("Please select Grade"),
boardofeducation: Yup.string().required("Please select Board"),
occupation: Yup.string().required("Please enter Occupation"),

  studentName: Yup.string().required("Please Enter the Sudent Name"),
  nationality: Yup.string().required("Please Enter the Nationality"),
  fatherName: Yup.string().required("Please Enter the Father Name"),
  motherName: Yup.string().required("Please Enter the Mother Name"),
   mobile: Yup.string().max(10, "Not Valid Phone Number").required("Please Enter the Mobile Number"),
//   mobile: Yup.string().required("Please Enter the Mobile Number"),
  email: Yup.string().email("Invalid email").required("Please Enter the Email"),
  address: Yup.string().required("Please Enter the Address"),
});

/* ================= REUSABLE ROW ================= */
const FormRow = ({ label, children, required }) => (
  <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
    {/* Left Label */}
    <Grid item xs={12} md={4}>
      <Typography sx={{ fontWeight: 500 }}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
    </Grid>

    {/* Right Field */}
    <Grid item xs={12} md={8}>
      {children}
    </Grid>
  </Grid>
);

/* ================= MAIN COMPONENT ================= */
export default function EditadmissionForm() {
const [pdfReady, setPdfReady] = useState(false);
const [pdfData, setPdfData] = useState(null);
  const GetData = useSelector((state) => state.formApi.Data) || {};
  console.log(GetData, "--find GetData");

  // const [resata, setResdata] = useState(null);
  const dispatch = useDispatch();
const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state || {};
console.log(rowData, "--rowData in a AdmissionForm");

useEffect(() => {

  dispatch(

      getFetchData({
          accessID: "TR379",
          get: "get",
          recID: 28,
        })
)
   }, []);
  const [loading, setLoading] = useState(false);
  const listViewurl = useSelector((state) => state.globalurl.listViewurl);

const handleFileUpload = async (file, setFieldValue) => {
  console.log("📂 Selected file:", file);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "images");

    const res = await dispatch(fileUpload({ formData })).unwrap();

    console.log("✅ Upload response:", res);

    const uploadedPath = res?.path || res?.name || "";

    // ✅ IMPORTANT: store in Formik
    setFieldValue("file", uploadedPath);
    setFieldValue("fileName", file.name); // optional (for UI)

    toast.success(res?.Msg || "File uploaded successfully!");
  } catch (err) {
    console.error("❌ Upload failed:", err);
    toast.error("Upload failed");
  }
};



 const fnAdmissionSave = async (values, del) => {
    setLoading(true);
    
    console.log(values);

    var idata = {
      RecordID: -1,
      CompanyID: rowData.CompanyRecID,
      AdmissionNumber: "",
      AcademicYearID: values.academicyear?.RecordID,
      StandardID: values.grade?.RecordID,
      StudentName: values.studentName,
      DateOfBirth: values.dob,
      Gender: values.gender,
      Nationality: values.nationality,
      BoardOfEducation: values.boardofeducation,
      FatherName: values.fatherName,
      MotherName: values.motherName,
      Occupation: values.occupation,
      HasSibling: values.studyinginschl === "yes" ? "Y" : "N",
      MobileNumber: values.mobile,
      EmailID: values.email,
      Address: values.address,
      StudentImage:  values.file,
      Attachment: "",
      Approved: "",
      Sortorder: 0,
      Disable: "N",
      DeleteFlag: "N"
    };
    console.log(idata, "--idata");
    
//  return;
    const data = await dispatch(postData({ accessID:"TR379", action:"insert", idata }));
    if (data.payload.Status == "Y") {
      toast.success(data.payload.Msg);
      setLoading(false);
// setResdata(data.payload.RecordID);
        // ✅ Enable PDF download
  setPdfData({ Data: idata }); // or response data if needed
  setPdfReady(true);
dispatch(

      getFetchData({
          accessID: "TR379",
          get: "get",
          recID: data.payload.RecordID,
        })
)

    //   navigate(-1);
    } else {
      toast.error(data.payload.Msg);
      setLoading(false);
    }
  };






  return (
      <Paper elevation={3} sx={{ margin: "0px 10px", background: "#F2F0F0" }}>
    <Box
      sx={{
        maxWidth: 900,
        // inHeight: "100vh", py: 5, px: 2,
        mx: "auto",
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
     <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="800" color="#064779" gutterBottom>
            Student Admission Form
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please fill in the details below to complete the registration.
          </Typography>
        </Box>
      <Divider sx={{ mb: 3 }} />

      <Formik
      initialValues={{
  studentName: "",
  dob: "",
  gender: "",
  nationality: "",
  religion: "",
  fatherName: "",
  motherName: "",
  mobile: "",
  email: "",
  address: "",

  // ✅ ADD THESE
  academicyear: null,
  grade: null,
  boardofeducation: "",
  occupation: "",
  studyinginschl: "",

  file: "",
  fileName: "",
}}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data:", values);
          fnAdmissionSave(values, false);
        }}
      >
        {({
       values,
       errors,
       touched,
       handleBlur,
       handleChange,
       handleSubmit,
       setFieldValue,
       setFieldTouched
        }) => (
         <form onSubmit={handleSubmit}>
            {/* STUDENT DETAILS */}
            <Typography variant="h5" fontWeight="700" sx={{ mb: 2, color: "#376981"  }} >
              Student Details
            </Typography>

            <FormRow label="Academic Year" required>

                   <AcademicAutocomplete
                                          name="academicyear"
                                        //   label="Academic Year"
                                        //   label={
                                        //     <span>
                                        //       academicyear
                                        //       <span style={{ color: "red", fontSize: "20px" }}>
                                        //         *
                                        //       </span>
                                        //     </span>
                                        //   }
                                         
                                          id="academicyear"
                                         
                                          value={values.academicyear}
                                          onChange={(newValue) => {
                                            setFieldValue("academicyear", newValue);
                                          }}
                                          onBlur={handleBlur}
                                          error={!!touched.academicyear && !!errors.academicyear}
                                          helperText={touched.academicyear && errors.academicyear}
                                          url={`${listViewurl}?data=${JSON.stringify({
                                            Query: {
                                              AccessID: "2173",
                                              ScreenName: "academicyear",
                                              VerticalLicense: "",
                                              Filter: "",
                                              Any: "",
                                            },
                                          })}`}
                                       
                                        />
            </FormRow>

<FormRow label="Select Grade" required>

      <GradeAutocomplete
                                          name="grade"
                                          id="grade"
                                          value={values.grade}
                                          onChange={(newValue) => {
                                            setFieldValue("grade", newValue);
                                          }}
                                           onBlur={() => {
    setFieldTouched("grade", true); // 👈 ADD THIS
  }}
                                          error={!!touched.grade && !!errors.grade}
                                          helperText={touched.grade && errors.grade}
                                          url={`${listViewurl}?data=${JSON.stringify({
                                            Query: {
                                              AccessID: "2174",
                                              ScreenName: "Grade",
                                              VerticalLicense: "",
                                              Filter: `AcademicYearID='${values.academicyear?.RecordID}' AND CompanyID='${rowData.CompanyRecID}'`,
                                              Any: "",
                                            },
                                          })}`}
                                       
                                        />
  {/* <TextField
    select
    fullWidth
    name="grade"
    placeholder="Select Grade"
    value={values.grade}
    onChange={handleChange}
    error={touched.grade && !!errors.grade}
    helperText={touched.grade && errors.grade}
  >
  
    <MenuItem value="L">LKG</MenuItem>
    <MenuItem value="U">UKG</MenuItem>
    <MenuItem value="F">1st Grade</MenuItem>
    <MenuItem value="S">2nd Grade</MenuItem>
    <MenuItem value="T">3rd Grade</MenuItem>
    <MenuItem value="R">4th Grade</MenuItem>
    <MenuItem value="H">5th Grade</MenuItem>
  </TextField> */}
</FormRow>

            <FormRow label="Name of the student" required>
              <TextField
              type="text"
                fullWidth
                name="studentName"
                id="studentName"
                placeholder="Student Name"
                value={values.studentName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.studentName && !!errors.studentName}
                helperText={touched.studentName && errors.studentName}
              />
            </FormRow>

            <FormRow label="Date of Birth" required>
              <TextField
                fullWidth
                type="date"
                name="dob"
                id="dob"
                InputLabelProps={{ shrink: true }}
                value={values.dob}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
              />
            </FormRow>

            <FormRow label="Gender" required>
              <RadioGroup
                row
                name="gender"
                value={values.gender}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Others" control={<Radio />} label="Others" />
              </RadioGroup>
            </FormRow>

            <FormRow label="Nationality" required>
              <TextField
                type="text"
                fullWidth
                name="nationality"
                id="nationality"
                value={values.nationality}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.nationality && !!errors.nationality}
                helperText={touched.nationality && errors.nationality}
              />
            </FormRow>

                      <FormRow label="Board Of Education" required>
  <TextField
    select
    fullWidth
    name="boardofeducation"
    placeholder="Select Board"
    value={values.boardofeducation}
    onChange={handleChange}
    error={!!touched.boardofeducation && !!errors.boardofeducation}
    helperText={touched.boardofeducation && errors.boardofeducation}
  >
  
    <MenuItem value="S">STATE BOARD</MenuItem>
    <MenuItem value="M">MATRIC</MenuItem>
    <MenuItem value="C">CBSE</MenuItem>
    <MenuItem value="I">ICSE</MenuItem>
    <MenuItem value="O">OTHER</MenuItem>
   
  </TextField>
</FormRow>

      

          

            {/* PARENT DETAILS */}
           <Typography variant="h5" fontWeight="700" sx={{ mb: 2, color: "#376981"  }} >
              Parent Details
            </Typography>

            <FormRow label="Father's Name" required>
              <TextField
                fullWidth
                name="fatherName"
                id="fatherName"
                value={values.fatherName}
                placeholder="Father's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.fatherName && !!errors.fatherName}
                helperText={touched.fatherName && errors.fatherName}
              />
            </FormRow>

            <FormRow label="Mother's Name" required>
              <TextField
              type="text"
                fullWidth
                name="motherName"
                id="motherName"
                value={values.motherName}
                placeholder="Mother's Name"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.motherName && !!errors.motherName}
                helperText={touched.motherName && errors.motherName}
              />
            </FormRow>
              <FormRow label="Occupation" required>
              <TextField
              type="text"
                fullWidth
                name="occupation"
                id="occupation"
                value={values.occupation}
                placeholder="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.occupation && !!errors.occupation}
                helperText={touched.occupation && errors.occupation}
              />
            </FormRow>

            
  <FormRow label="Any Brother / Sister studying in School:" required>
    
        

              <RadioGroup
                row
                name="studyinginschl"
                value={values.studyinginschl}
                onChange={handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
               
              </RadioGroup>
            </FormRow>


            <FormRow label="Mobile Number" required>
              <TextField
              type="number"
                fullWidth
                name="mobile"
                id="mobile"
                value={values.mobile}
                placeholder="10-digit mobile number"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.mobile && !!errors.mobile}
                helperText={touched.mobile && errors.mobile}
                onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10);

                        e.target.setCustomValidity("");
                      }}
              />
            </FormRow>

            <FormRow label="Email" required>
              <TextField
              type="text"
                fullWidth
                name="email"
                id="email"
                value={values.email}
                placeholder="john@mail.com"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </FormRow>

            <FormRow label="Address" required>
              <TextField
               type="text"
                fullWidth
                multiline
                rows={3}
                name="address"
                id="address"
                placeholder="Address"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
            </FormRow>



            {/* FILE UPLOAD */}
            <FormRow label="Upload Photo">
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      border: "1px solid #1a237e",
      borderRadius: "4px",
      overflow: "hidden",
      width: "100%",
      height: 40,
    }}
  >
    {/* Button */}
    <Button
      component="label"
      sx={{
        borderRadius: 0,
        height: "100%",
        px: 2,
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #1a237e",
        color: "#000",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      }}
    >
      Choose File
      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file, setFieldValue);
          }
        }}
      />
    </Button>


    {/* File Name Display */}
    <Box
      sx={{
        px: 2,
        flex: 1,
        color: values.fileName ? "#000" : "#777",
        fontSize: "18px",
      }}
    >
      {values.fileName || "No file chosen"}
    </Box>

     
  </Box>
            <Typography
      variant="caption"
      sx={{ mt: 0.5, display: "block", color: "text.secondary" }}
    >
      Formats: .jpeg, .png, .mp4 | Max size: 25 MB
    </Typography>
            </FormRow>

            {/* SUBMIT */}
           <Box mt={4} display="flex" alignItems="center">
  
  {/* Left spacer */}
  <Box flex={1} />

  {/* Center Submit Button */}
  <Box flex={1} textAlign="center">
    <Button
      variant="contained"
      type="submit"
      disabled={loading}
      sx={{
        px: 6,
        backgroundColor: "#064779",
        color: "#dfdbdb",
         "&:hover": {
                      backgroundColor: "#04395f",
                       color: "#dfdbdb",
                    },
      }}
    >
      Submit
    </Button>
  </Box>

  {/* Right Download Button */}
  <Box flex={1} >
    {pdfReady && (
      <PDFDownloadLink
        document={<AdmissionPDF data={GetData} />}
        fileName="Student_Admission.pdf"
        style={{ textDecoration: "none" }}
      >
        {({ loading }) => (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            disabled={loading}
            sx={{
              borderColor: "#064779",
              color: "#064779",
            }}
          >
            {/* {loading ? "Preparing PDF..." : "Download"} */}
          </Button>
        )}
      </PDFDownloadLink>
    )}
  </Box>

</Box>
          </form>
        )}
      </Formik>
    </Box>
    </Paper>
  );
}