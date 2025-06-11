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
  "GST",
  "Amount",
];

export default function generatePDFLayout2(inputValues) {
  let invoiceData = invoiceDataFn(inputValues);

  const doc = new jsPDF({
    unit: "mm",
    format: [215.9, 279.4],
  });

  invoiceData.forEach((invoice, index) => {
    autoTable(doc, {
      body: [
        // ROW-1: Supplier Name

        [
          {
            content: inputValues.sellerName,
            colSpan: 7,
            styles: {
              halign: "center", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fontSize: 26, // Set font size to make heading large
              fillColor: [255, 255, 255], // Light gray background color
              textColor: [0, 0, 0], // Slightly dark gray text color
              cellPadding: { top: 2, right: 0, bottom: 2, left: 0 }, // padding on all sides of the cell
              lineWidth: 0.4, // border thickness
              font: "times", // Set to built-in "times"
              fontStyle: "normal", // "normal" or 'bold', 'italic', 'bolditalic'
            },
          },
        ],

        // ROW-2: Address

        [
          {
            content: inputValues.sellerAddress,
            colSpan: 7,
            styles: {
              cellPadding: 2, // padding on all sides of the cell
              lineWidth: 0.4, // border thickness
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-3: DEBIT  || SALES INVOICE || ORIGINAL

        [
          //DEBIT
          {
            content:
              "DEBIT                SALES INVOICE                ORIGINAL",
            colSpan: 7,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
          // SALES INVOICE
          // {
          //   content: "SALES INVOICE",
          //   colSpan: 3,
          //   styles: {
          //     fillColor: [255, 255, 255],
          //     lineWidth: { top: 0.4, right: 0, bottom: 0.4, left: 0 }, // border thickness
          //   },
          // },
          // // ORIGINAL
          // {
          //   content: "ORIGINAL",
          //   colSpan: 2,
          //   styles: {
          //     fillColor: [255, 255, 255],
          //     lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0 }, // border thickness
          //   },
          // },
        ],

        // ROW-4: To, & INVOICE DATE
        [
          {
            content: "To,",
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "bottom",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "INVOICE DATE:",
            colSpan: 2,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: invoice.date,
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0 }, // border thickness
            },
          },
        ],

        // ROW-5: To, & INVOICE DATE
        [
          {
            content: inputValues.buyerName,
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "top",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "INVOICE NO:",
            colSpan: 2,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: invoice.no,
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 }, // border thickness
            },
          },
        ],

        // ROW-6: LR DATE
        [
          {
            content: "",
            colSpan: 3,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "LR DATE:",
            colSpan: 2,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 }, // border thickness
            },
          },
        ],
        // ROW-7: LR NO
        [
          {
            content: "PARTY'S GST:",
            colSpan: 3,
            styles: {
              halign: "left",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "LR NO:",
            colSpan: 2,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 }, // border thickness
            },
          },
        ],
        // ROW-8: TRANSPORT
        [
          {
            content: "PARTY'S PAN:",
            colSpan: 3,
            styles: {
              halign: "left",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "TRANSPORT:",
            colSpan: 2,
            styles: {
              halign: "right",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "middle",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 }, // border thickness
            },
          },
        ],

        // ROW-9: Particulars Heading

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

        // ROW-10: Particulars List

        ...inputValues.data.particulars.map((parti, i) => {
          return [
            {
              content: i + 1, //Sr No
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.particulars[i] || "", //Particular Item
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: "", //HSN
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.qty[i] || "", //Qty
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.rate[i] || "", //Rate
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: "", //GST
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.amount[i] || "", //Amount
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
          ];
        }),

        // ROW-11: Sub Total

        [
          {
            content: "",
            colSpan: 3,
            styles: {
              lineWidth: 0.4,
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "Sub Total",
            colSpan: 3,
            styles: {
              // fontStyle: "bold",
              lineWidth: 0.4,
              fillColor: [255, 255, 255],
            },
          },

          {
            content: invoice.totalAmount || "",
            styles: {
              halign: "right",
              // fontStyle: "bold",
              lineWidth: 0.4,
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-12: Bank Details

        [
          {
            content: "Bank Details: N/A",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "FREIGHT",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0.4, right: 0, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "0.00",
            colSpan: 1,
            styles: {
              halign: "right",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0 },
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-13: Sub Total

        [
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "Sub Total",
            colSpan: 3,
            styles: {
              halign: "left",
              fontStyle: "bold",
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: invoice.totalAmount || "",
            colSpan: 1,
            styles: {
              halign: "right",
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 },
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-14: Gst Summary CGST

        [
          {
            content: "Gst Summary:",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "CGST",
            colSpan: 3,
            styles: {
              halign: "left",
              fontStyle: "bold",
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "0.00",
            colSpan: 1,
            styles: {
              halign: "right",
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 },
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-15: SGST

        [
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "SGST",
            colSpan: 3,
            styles: {
              halign: "left",
              fontStyle: "bold",
              lineWidth: { top: 0, right: 0, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "0.00",
            colSpan: 1,
            styles: {
              halign: "right",
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0 },
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-16: IGST

        [
          {
            content: "Company's GST:",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "IGST",
            colSpan: 3,
            styles: {
              halign: "left",
              fontStyle: "bold",
              lineWidth: { top: 0, right: 0, bottom: 0.4, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "0.00",
            colSpan: 1,
            styles: {
              halign: "right",
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0 },
              fillColor: [255, 255, 255],
            },
          },
        ],

        // ROW-16: Grand Total

        [
          {
            content: "Company's PAN:",
            colSpan: 3,
            styles: {
              halign: "left",
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "GRAND TOTAL",
            colSpan: 2,
            styles: {
              halign: "center", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fontSize: 14,
              fontStyle: "bold",
              cellPadding: 2,
              fillColor: [217, 217, 217],
              lineWidth: { top: 0.4, right: 0, bottom: 0.4, left: 0.4 },
            },
          },
          {
            content: invoice.totalAmount || "",
            colSpan: 2,
            styles: {
              hhalign: "center", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fontSize: 18,
              fontStyle: "bold",
              cellPadding: 2,
              fillColor: [217, 217, 217],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0 },
            },
          },
        ],

        // ROW-17: For,

        [
          {
            content: "T&C*",
            colSpan: 4,
            styles: {
              halign: "left",
              lineWidth: { top: 0.4, right: 0, bottom: 0.4, left: 0.4 },
              cellPadding: { top: 3, right: 3, bottom: 5, left: 3 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: `For, ${inputValues.sellerName}`,
            colSpan: 4,
            styles: {
              halign: "right", // Horizontally center the text
              lineWidth: { top: 0.4, right: 0.4, bottom: 0.4, left: 0 },
              cellPadding: { top: 3, right: 3, bottom: 5, left: 3 },
              fillColor: [255, 255, 255],
              font: "times",
              fontStyle: "normal",
            },
          },
        ],

        //body end
      ],

      styles: {
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
