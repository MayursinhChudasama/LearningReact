export function invoiceDataFn(inputValues) {
  // INVOICE NO
  function generateInvoiceNo(invoiceNoPrefix, invoiceNoStart, invoiceNoAdd) {
    let invoiceNo = [];
    for (let i = 1; i < 15; i++) {
      invoiceNo.push(
        (invoiceNo[invoiceNo.length - 1] || invoiceNoStart) + invoiceNoAdd
      );
    }
    invoiceNo.push(
      invoiceNo[Math.floor(Math.random() * invoiceNo.length)] +
        Math.floor(Math.random() * invoiceNoAdd)
    );
    invoiceNo.push(
      invoiceNo[Math.floor(Math.random() * invoiceNo.length)] +
        Math.floor(Math.random() * invoiceNoAdd)
    );
    invoiceNo = invoiceNo.map((no) => invoiceNoPrefix + no);
    return invoiceNo;
  }
  const invoiceNo = generateInvoiceNo(
    inputValues?.invoiceNoPrefix || "",
    Number(inputValues.invoiceNoStart),
    Number(inputValues.invoiceNoAdd)
  );

  // INVOICE DATE

  function generateInvoiceDate(dateStart) {
    let invoiceDate = [dateStart];
    const add = 31 * 86400000;
    for (let i = 1; i < 14; i++) {
      let lastEle = invoiceDate[invoiceDate.length - 1];
      let invoiceDateAdd = lastEle + add;
      invoiceDate.push(Number(invoiceDateAdd));
    }

    invoiceDate = invoiceDate.map((timestamp) => {
      let date = new Date(timestamp + 86400000)
        .toLocaleString("in")
        .slice(0, 9);
      let newDate = date.slice(2);
      const dateNum = Math.floor(Math.random() * 25) + 1;
      if (newDate[0] === "/") {
        return dateNum + newDate;
      }
      if (newDate[newDate.length - 1] === ",") {
        return date.slice(0, date.length - 1);
      }
      return dateNum + "/" + newDate;
    });

    //
    let date2019 = `${Math.floor(Math.random() * 27) + 1}/${
      Math.floor(Math.random() * 11) + 1
    }/2019`;
    let date2021 = `${Math.floor(Math.random() * 27) + 1}/${
      Math.floor(Math.random() * 11) + 1
    }/2021`;
    invoiceDate.push(date2019);
    invoiceDate.push(date2021);
    return invoiceDate;
  }
  const startingDate = new Date(inputValues.dateStart);
  const invoiceDate = generateInvoiceDate(+startingDate);

  // INVOICE PARTICULARS

  function generateParticulars(particulars) {
    let finalArray = [];
    for (let i = 1; i < 17; i++) {
      let sortedParticulars = particulars.sort((a, b) => Math.random() - 0.5);
      const arraySize =
        Math.floor(Math.random() * sortedParticulars.length) + 4;
      let shortedShuffledArray = sortedParticulars.slice(0, arraySize);
      finalArray.push(shortedShuffledArray);
    }
    return finalArray;
  }
  const particulars = generateParticulars(inputValues.data.particulars);

  // RATE FOR PARTICULARS

  function generateRates(rates, particulars) {
    // console.log(rates);

    let ratesArray = [];
    for (let i = 0; i < 16; i++) {
      let ratesShortedArray = rates
        .sort((a, b) => Math.random() - 0.5)
        .slice(0, particulars[i].length);
      ratesArray.push(ratesShortedArray);
    }
    return ratesArray;
  }
  const rates = generateRates(inputValues.data.rate, particulars);

  // QTY

  function getRandomNear(number, range) {
    const min = number - range;
    const max = number + range;
    return Math.round(Math.random() * (max - min + 1)) + min;
  }
  let randomInputValueTotal = getRandomNear(Number(inputValues.total), 1000);

  function generateQty(total = 150000, rates) {
    // console.log("number", number);
    let finalQtyArray = [];

    for (let i = 0; i < 16; i++) {
      function getRandomNear2(number, range) {
        const min = number - range;
        const max = number + range;
        return Math.round(Math.random() * (max - min + 1)) + min;
      }
      const avgAmt = Math.round(total / rates[i].length);

      let amtArray = [];
      for (let j = 0; j < rates[i].length; j++) {
        const randomAvgAmt = getRandomNear2(avgAmt, 1000);
        amtArray.push(randomAvgAmt);
      }
      //
      let qtyArr = rates[i].map((amt, i) => Math.round(amtArray[i] / amt));

      finalQtyArray.push(qtyArr);
      // if (i <= 14) {
      //   finalQtyArray.push(qtyArr);
      // } else if (i == 15) {
      //   let lastQty = "";
      //   finalQtyArray.push(lastQty);
      // }
    }
    console.log("finalQtyArray", finalQtyArray);

    return finalQtyArray;
  }
  //
  const qty = generateQty(Number(randomInputValueTotal), rates);
  // AMOUNT
  const amount = qty.map((q, i) => q.map((item, j) => item * rates[i][j]));
  // INVOICE FINAL DATA
  const invoiceData = particulars.map((item, i) => {
    const totalAmount = amount[i].reduce((total, cur) => (total += cur));
    return {
      no: invoiceNo[i],
      date: invoiceDate[i],
      particulars: particulars[i],
      qty: qty[i],
      rate: rates[i],
      amount: amount[i],
      totalAmount: totalAmount,
    };
  });
  console.log("FINAL INVOICE DATA", invoiceData);

  return invoiceData;
}
