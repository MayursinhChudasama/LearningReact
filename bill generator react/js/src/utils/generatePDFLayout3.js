import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { invoiceDataFn } from "./invoiceData.js";
jsPDF.autoTable = autoTable;

const particulars = [
  "SR NO",
  "DESCRIPTION OF GOODS",
  "HSN",
  "QUANTITY",
  "RATE",
  "AMOUNT",
];

export default function generatePDFLayout3(inputValues) {
  let invoiceData = invoiceDataFn(inputValues);

  const doc = new jsPDF({
    unit: "mm",
    format: [215.9, 279.4],
  });

  invoiceData.forEach((invoice, index) => {
    autoTable(doc, {
      body: [
        // ROW-1: Supplier Name , Invoice No, Dated

        [
          {
            content: inputValues.sellerName,
            rowSpan: 2,
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "bottom",
              fontSize: 16, // Set font size to make heading large
              fillColor: [255, 255, 255],
              cellPadding: { top: 0, right: 2, bottom: 0, left: 2 }, // padding on all sides of the cell
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
              font: "times", // Set to built-in "times"
              fontStyle: "bold", // "normal" or 'bold', 'italic', 'bolditalic'
            },
          },
          {
            content: "Invoice No.",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "Dated",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-2: Supplier Name , Invoice No, Dated

        [
          {
            content: invoice.no,
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
          {
            content: invoice.date,
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-3: Supplier Address, Buyer's Order No. , Dated

        [
          {
            content: inputValues.sellerAddress,
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "top",
              cellPadding: { top: 2, right: 2, bottom: 0, left: 2 },
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "Buyer's Order No.",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "Dated",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-4: Supplier Address, Buyer's Order No. , Dated

        [
          {
            content: `Mobile No: ${inputValues?.mobNo || "9725976111"}`,
            rowSpan: 5,
            colSpan: 2,
            styles: {
              halign: "left",
              valign: "top",
              cellPadding: { top: 2, right: 2, bottom: 0, left: 2 },
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-5: LR No. , Vehicle No.

        [
          {
            content: "LR No.",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "Vehicle No.",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-6: LR No. , Vehicle No.

        [
          {
            content: "",
            colSpan: 2,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
        ],
        //
        [
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ], //
        [
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left", // Horizontally center the text
              valign: "middle", // Vertically center the text
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-7: Buyer (Bill to):

        [
          {
            content: "Buyer (Bill to):",
            colSpan: 2,
            styles: {
              halign: "left",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            rowSpan: 3,
            colSpan: 2,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            rowSpan: 3,
            colSpan: 2,
            styles: {
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0 }, // border thickness
            },
          },
        ],

        // ROW-8: Buyer Name

        [
          {
            content: inputValues.buyerName,
            colSpan: 2,
            styles: {
              halign: "left",
              cellPadding: { top: 0, right: 1, bottom: 10, left: 1 },
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-9: Empty Row

        [
          {
            content: "",
            colSpan: 2,
            styles: {
              halign: "left",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-10: Particulars Heading

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

        // ROW-11: Particulars List

        ...inputValues.data.particulars.map((parti, i) => {
          return [
            {
              content: i + 1, //SR NO
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.particulars[i] || "", //DESCRIPTION OF GOODS
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
              content: invoice.qty[i] || "", //QUANTITY
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.rate[i] || "", //RATE
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
            {
              content: invoice.amount[i] || "", //AMOUNT
              styles: {
                lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 },
                fillColor: [255, 255, 255],
              },
            },
          ];
        }),

        // ROW-12: TOTAL

        [
          {
            content: "GRAND TOTAL",
            colSpan: 3,
            styles: {
              halign: "center",
              fontSize: 24,
              fillColor: [255, 255, 255],
              lineWidth: 0.4, // border thickness
            },
          },
          {
            content: `${invoice.totalAmount}.00` || "",
            colSpan: 3,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: 0.4, // border thickness
              cellPadding: { top: 4, right: 0, bottom: 4, left: 0 },
              fontSize: 22,
              fontStyle: "bold",
            },
          },
        ],

        // ROW-13: E. & O.E

        [
          {
            content: "E. & O.E ",
            colSpan: 6,
            styles: {
              halign: "right",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],
        //
        [
          {
            content: "",
            colSpan: 6,
            styles: {
              halign: "right",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-14: Empty Row

        [
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0.4, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-15: Empty Row

        [
          {
            content: "",
            colSpan: 3,
            styles: {
              cellPadding: 6,
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 3,
            styles: {
              cellPadding: 6,
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-16: Declaration:

        [
          {
            content: "Declaration:",
            colSpan: 3,
            styles: {
              halign: "left",
              cellPadding: 2,
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],

        // ROW-17: Empty Row

        [
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
          {
            content: "",
            colSpan: 3,
            styles: {
              halign: "center",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0, left: 0.4 }, // border thickness
            },
          },
        ],
        // ROW-18: We declare....

        [
          {
            content:
              "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct",
            rowSpan: 2,
            colSpan: 3,
            styles: {
              halign: "left",
              valign: "bottom",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
          {
            content: `for ${inputValues.sellerName},`,
            rowSpan: 2,
            colSpan: 3,
            styles: {
              halign: "right",
              valign: "bottom",
              fillColor: [255, 255, 255],
              lineWidth: { top: 0, right: 0.4, bottom: 0.4, left: 0.4 }, // border thickness
            },
          },
        ],

        // body end
      ],

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
