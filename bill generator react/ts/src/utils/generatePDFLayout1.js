import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { invoiceDataFn } from "./invoiceData.js";
jsPDF.autoTable = autoTable;

const particulars = [
  "Sr",
  "Particulars",
  "HSN",
  "Quantity",
  "Rate",
  "Amount",
  "GST",
  "Net Amount",
];
const allStyling = {
  styles: "",
};

export default function generatePDFLayout1(inputValues) {
  let invoiceData = inputValues.invoiceData;

  const doc = new jsPDF({
    unit: "mm",
    format: [215.9, 279.4],
  });

  invoiceData.forEach((invoice, index) => {
    autoTable(doc, {
      body: [
        // Supplier Name
        [
          {
            content: inputValues.sellerName,
            colSpan: 8,
            styles: {
              halign: "center", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fontSize: 24, // Set font size to make heading large
              fillColor: [217, 217, 217], // Light gray background color
              // textColor: [224, 16, 165], // Light gray background color
              textColor: [0, 0, 0], // Slightly dark gray text color
              cellPadding: { top: 2, right: 0, bottom: 2, left: 0 }, //  padding on all sides of the cell
              lineWidth: 0.4, // border thickness
              font: "times", // Set to built-in "times"
              fontStyle: "normal", // "normal" or 'bold', 'italic', 'bolditalic'
            },
          },
        ],
        // Address
        [
          {
            content: inputValues.sellerAddress,
            colSpan: 8,
            styles: {
              cellPadding: 2, // padding on all sides of the cell
              lineWidth: 0.4, // border thickness
              fillColor: [255, 255, 255],
            },
          },
        ],
        // Debit Memo || SALES BILL || Original
        [
          //Debit Memo
          {
            content:
              "Debit Memo                 SALES BILL                 Original",
            colSpan: 8,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
          // SALES BILL
          // {
          //   content: "SALES BILL",
          //   colSpan: 4,
          //   styles: {
          //     fillColor: [255, 255, 255],
          //     lineWidth: { top: 0.4, right: 0, bottom: 0.4, left: 0 }, // border thickness
          //   },
          // },
          // // Original
          // {
          //   content: "Original",
          //   colSpan: 2,
          //   styles: {
          //     fillColor: [255, 255, 255],
          //     lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0 }, // border thickness
          //   },
          // },
        ],

        //third row
        [
          {
            content: "M/s:",
            colSpan: 4,
            styles: {
              halign: "left",
              valign: "bottom",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
              fontSize: 12,
            },
          },
          {
            content: "No:",
            colSpan: 1,
            styles: {
              fillColor: [217, 217, 217],
              halign: "right",
              valign: "middle",
              lineWidth: 0.4,
            },
          },
          {
            content: invoice.no,
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: 0.4,
            },
          },
        ],
        // Row 4
        [
          {
            content: inputValues.buyerName,
            colSpan: 4,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "Date:",
            colSpan: 1,
            styles: {
              fillColor: [217, 217, 217],
              halign: "right",
              valign: "middle",
              lineWidth: 0.4,
            },
          },
          {
            content: invoice.date,
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: 0.4,
            },
          },
        ],
        // Row 3
        [
          {
            content: "",
            colSpan: 4,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "",
            colSpan: 1,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0 },
            },
          },
        ],
        // Row 4
        [
          {
            content: "",
            colSpan: 4,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
            },
          },
          {
            content: "",
            colSpan: 1,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0, bottom: 0.4, left: 0.4 },
            },
          },
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0 },
            },
          },
        ],

        //Particulars
        particulars.map((item) => {
          return {
            content: item,
            colSpan: 1,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.8, left: 0.4 },
            },
          };
        }),
        ...inputValues.data.particulars.map((parti, i) => {
          return [
            {
              content: i + 1,
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.particulars[i] || "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.qty[i] || "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.rate[i] || "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.amount[i] || "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.amount[i] || "",
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
          ];
        }),
        //
        [
          {
            content: "",
            colSpan: 4,
            styles: {
              halign: "left",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "Sub Total",
            colSpan: 2,
            styles: {
              halign: "center",
              // fontStyle: "bold",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: invoice.totalAmount || "",
            colSpan: 2,
            styles: {
              halign: "center",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
        ],
        //
        [
          {
            content: "",
            // rowSpan: 2,
            colSpan: 4,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "Freight",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
              // fontStyle: "bold",
            },
          },
          {
            content: "0.00",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
        ],
        [
          {
            content: "",
            // rowSpan: 2,
            colSpan: 4,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "Sub-Total",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
              fontStyle: "bold",
            },
          },
          {
            content: invoice.totalAmount || "",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
        ],
        [
          {
            content: "",
            // rowSpan: 2,
            colSpan: 4,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "CGST",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
              // fontStyle: "bold",
            },
          },
          {
            content: "0.00",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
        ],
        [
          {
            content: "",
            // rowSpan: 2,
            colSpan: 4,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
          {
            content: "SGST",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
              // fontStyle: "bold",
            },
          },
          {
            content: "0.00",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
        ],
        [
          {
            content: "",
            // rowSpan: 2,
            colSpan: 4,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
            },
          },
          {
            content: "IGST",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
              // fontStyle: "bold",
            },
          },
          {
            content: "0.00",
            colSpan: 2,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
            },
          },
        ],
        [
          {
            content: "",
            colSpan: 4,
            styles: {
              // cellPadding: 10, // Equal padding on all sides of the cell
              fillColor: [255, 255, 255],
              lineWidth: 0.4,
            },
          },
          {
            content: "Total Amount",
            colSpan: 2,
            styles: {
              // fontStyle: "bold",
              cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
              fontSize: 14,
              fillColor: [217, 217, 217],
              lineWidth: { top: 0.4, right: 0, bottom: 0.4, left: 0.4 },
            },
          },
          {
            content: invoice.totalAmount || "",
            colSpan: 2,
            styles: {
              cellPadding: { top: 3, right: 0, bottom: 3, left: 0 },
              fontSize: 16,
              fillColor: [217, 217, 217],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0 },
            },
          },
        ],
        [
          {
            content: "",
            colSpan: 8,
            styles: {
              cellPadding: 6, // Equal padding on all sides of the cell
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
            },
          },
        ],
        [
          {
            content: `for, ${inputValues.sellerName}`,
            colSpan: 8,
            styles: {
              cellPadding: { top: 14, right: 14, bottom: 1, left: 1 },
              halign: "left",
              valign: "bottom",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
            },
          },
        ],
        //end
      ],
      // styling changes start
      styles: {
        cellPadding: 1,
        halign: "center", // Horizontally center the text
        valign: "middle", // Vertically center the text
        textColor: [0, 0, 0],
        fontSize: 11,
        lineColor: [0, 0, 0], // border color for the cell
      },
    });
    if (index < particulars.length - 1) {
      doc.addPage();
    }
  });

  doc.setFont("helvetica", "normal");

  doc.save(`${inputValues.sellerName}.pdf`);
}
