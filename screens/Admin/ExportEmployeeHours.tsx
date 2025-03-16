import React from "react";
import { View, Text, Button, Alert } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const ExportEmployeeHours = () => {
  const generatePDF = async () => {
    try {
      // HTML content for the PDF
      const htmlContent = `
        <h1 style="text-align: center;">Exported Data</h1>
        <p>This is a sample PDF generated in React Native.</p>
      `;

      const options = {
        html: htmlContent,
        fileName: "MyPDFDocument",
        directory: "Documents",
      };
      console.log("test =>", htmlContent, options);
      const pdf = await RNHTMLtoPDF.convert(options);

      Alert.alert("PDF Created", `Saved at: ${pdf.filePath}`);

      console.log("PDF Path: ", pdf.filePath);
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Export Data to PDF</Text>
      <Button title="Generate PDF" onPress={generatePDF} />
    </View>
  );
};

export default ExportEmployeeHours;
