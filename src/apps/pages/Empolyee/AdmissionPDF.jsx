import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import store from "../../../index";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
  },

  header: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "800",
    color:"#064779"
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#376981",
    marginTop: 40
  },
    sectionTitle1: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#376981",
    marginTop: 41
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  label: {
    width: "35%",
    fontWeight: "bold",
  },

  valueBox: {
    width: "65%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    minHeight: 18,
    justifyContent: "center",
  },

  image: {
    width: 90,
    height: 90,
    position: "absolute",
    right: 30,
    top: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

const AdmissionPDF = ({ data }) => {
  const userimg = store.getState().globalurl.imageUrl;
  const student = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* IMAGE */}
        {student?.StudentImage && (
          <Image
            style={styles.image}
            src={`${userimg}${student.StudentImage}`}
          />
        )}

        {/* HEADER */}
        <Text style={styles.header}>Student Admission Form</Text>

        {/* STUDENT DETAILS */}
        <Text style={[styles.sectionTitle]}>Student Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Academic Year</Text>
          <View style={styles.valueBox}>
            <Text>{student.AcademicYear}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Grade</Text>
          <View style={styles.valueBox}>
            <Text>{student.StandardName}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Student Name</Text>
          <View style={styles.valueBox}>
            <Text>{student.StudentName}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.valueBox}>
            <Text>{student.DateOfBirth}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.valueBox}>
            <Text>{student.Gender === "F" ? "Female" : "Male"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nationality</Text>
          <View style={styles.valueBox}>
            <Text>{student.Nationality}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Board</Text>
          <View style={styles.valueBox}>
            <Text>{student.BoardOfEducation == "I" ? "ICSE" :
              student.BoardOfEducation == "S" ? "State Board" :
              student.BoardOfEducation == "M" ? "MATRIC" :
              student.BoardOfEducation == "C" ? "CBSE" :
              student.BoardOfEducation == "O" ? "OTHER" : null
              }</Text>
          </View>
        </View>

        {/* PARENT DETAILS */}
        <Text style={styles.sectionTitle1}>Parent Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Father Name</Text>
          <View style={styles.valueBox}>
            <Text>{student.FatherName}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mother Name</Text>
          <View style={styles.valueBox}>
            <Text>{student.MotherName}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Occupation</Text>
          <View style={styles.valueBox}>
            <Text>{student.Occupation}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Sibling in School</Text>
          <View style={styles.valueBox}>
            <Text>{student.HasSibling === "Y" ? "Yes" : "No"}</Text>
          </View>
        </View>

        {/* CONTACT DETAILS */}
        <Text style={styles.sectionTitle1}>Contact Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Mobile</Text>
          <View style={styles.valueBox}>
            <Text>{student.MobileNumber}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.valueBox}>
            <Text>{student.EmailID}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.valueBox}>
            <Text>{student.Address}</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
};

export default AdmissionPDF;