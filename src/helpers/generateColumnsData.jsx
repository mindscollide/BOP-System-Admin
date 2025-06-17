export const buildForwardsTable = (
  value,
  Data,
  getAllTenorsData,
  getAllInstrument,
  InputFIeld,
  onInputChange
) => {
  // console.log(
  //   !Data || !getAllTenorsData || !getAllInstrument,
  //   "buildForwardsTablebuildForwardsTable"
  // );
  if (!Data || !getAllTenorsData || !getAllInstrument) {
    return { rowData: [], columnsData: [] };
  }

  try {
    const { tenors } = getAllTenorsData;
    const { instruments } = getAllInstrument;

    const applicableInstruments =
      value === 1
        ? instruments?.filter((inst) => inst.discountingApplicable) || []
        : instruments;

    const applicableTenors =
      value === 1
        ? tenors?.filter((tenor) => tenor.isDiscountingApplicable) || []
        : tenors;

    // Step 1: Create rateMap with bid/ask
    const rateMap = {};
    Data.forEach((entry) => {
      // console.log({ entry }, "entryentry");
      const key = `${entry.instrumentID}-${entry.tenorID}`;
      // console.log({ key }, "entryentry");

      rateMap[key] = {
        bid: entry.bidSpread ?? 0,
        ask: entry.askSpread ?? 0,
      };
    });
    // console.log({ rateMap }, "entryentry");

    // Step 2: Create rows
    const rowData = applicableTenors.map((tenor) => {
      const row = {
        tenorID: tenor.tenorID,
        tenorName: tenor.tenorName,
        tenorDays: tenor.tenorDays,
      };

      applicableInstruments.forEach((instrument) => {
        const key = `${instrument.instrumentID}-${tenor.tenorID}`;
        // console.log(key, "entryentry1212");

        const rates = rateMap[key] || { bid: 0, ask: 0 };

        row[`bid_${instrument.instrumentName}`] = rates.bid;
        row[`ask_${instrument.instrumentName}`] = rates.ask;
        row[`InstrumentID_${instrument.instrumentName}`] =
          instrument.instrumentID;
        row[`InstrumentName_${instrument.instrumentName}`] =
          instrument.instrumentName;
      });

      return row;
    });

    // Step 3: Create columns
    let columnsData = [];

    if (value === 1) {
      // Discounting layout
      columnsData = [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
          width: 80,
        },
        ...applicableInstruments.map((inst) => ({
          title: inst.instrumentName,
          dataIndex: ` bid_${inst.instrumentName}`, // fallback
          key: `rate_${inst.instrumentName}`,
          align: "center",
          width: "100px",
          render: (text, record) => (
            <InputFIeld
              value={text}
              record={record}
              className={"ValueDiscountingInput"}
              instrumentName={inst.instrumentName}
              onInputChange={onInputChange}
            />
          ),
        })),
      ];
    } else {
      // Forwards layout
      columnsData = [
        {
          title: "Tenor",
          key: "tenorName",
          width: 120,
          className: "font-bold",
          dataIndex: "tenorName",
          align: "left",
        },
        ...applicableInstruments.map((inst) => ({
          title: inst.instrumentName,
          key: `group_${inst.instrumentName}`,
          align: "center",
          width: 180,
          children: [
            {
              title: "Bid Spread",
              dataIndex: `bid_${inst.instrumentName}`,
              key: `bid_${inst.instrumentName}`,
              align: "center",
              width: "100px",
              render: (text, record) => (
                <InputFIeld
                  value={text}
                  // className="text-center"
                  className={"ValueDiscountingInput"}
                  labelClass="d-none"
                  record={record}
                  onChange={(event) =>
                    onInputChange(
                      event.target.value,
                      record,
                      "bid",
                      inst.instrumentName
                    )
                  }
                />
              ),
            },
            {
              title: "Ask Spread",
              dataIndex: `ask_${inst.instrumentName}`,
              key: `ask_${inst.instrumentName}`,
              align: "center",
              width: "100px",
              render: (text, record) => (
                <InputFIeld
                  value={text}
                  // className="text-center"
                  className={"ValueDiscountingInput"}
                  labelClass="d-none"
                  record={record}
                  onChange={(event) =>
                    onInputChange(
                      event.target.value,
                      record,
                      "ask",
                      inst.instrumentName
                    )
                  }
                />
              ),
            },
          ],
        })),
      ];
    }

    return { rowData, columnsData };
  } catch (error) {
    console.error("Error while building forwards table:", error);
    return { rowData: [], columnsData: [] };
  }
};

export const convertToForwardSpreads = (data) => {
  const forwardSpreads = [];

  data.forEach((tenor) => {
    Object.keys(tenor).forEach((key) => {
      if (key.startsWith("InstrumentName_")) {
        const currency = key.split("_")[1]; // e.g., "USD"
        const instrumentID = tenor[`InstrumentID_${currency}`];
        const bidSpread = tenor[`bid_${currency}`];
        const askSpread = tenor[`ask_${currency}`];

        forwardSpreads.push({
          InstrumentID: instrumentID,
          TenorID: tenor.tenorID,
          BidSpread: Number(bidSpread),
          AskSpread: Number(askSpread),
        });
      }
    });
  });

  return forwardSpreads;
};

export const buildDiscountingTable = (
  value,
  Data,
  getAllTenorsData,
  getAllInstrument,
  InputFIeld,
  onInputChange
) => {
  if (!Data || !getAllTenorsData || !getAllInstrument) {
    return { rowData: [], columnsData: [] };
  }

  try {
    const { tenors } = getAllTenorsData;
    const { instruments } = getAllInstrument;

    // Step 1: Filter applicable instruments and tenors
    const applicableInstruments =
      value === 1
        ? instruments?.filter((inst) => inst.discountingApplicable) || []
        : instruments;
    const applicableTenors =
      value === 1
        ? tenors?.filter((tenor) => tenor.isDiscountingApplicable) || []
        : tenors;

    // Step 2: Create a map using composite key (instrumentID-tenorID)
    const rateMap = {};
    Data?.forEach((rate) => {
      const key = `${rate.instrumentID}_${rate.tenorID}`;
      rateMap[key] = rate.spread;
    });
    // Step 3: Build the row data
    const rowData = applicableTenors.map((tenor) => {
      const row = {
        TenorID: tenor.tenorID,
        tenorName: tenor.tenorName,
        tenorDays: tenor.tenorDays,
      };

      applicableInstruments.forEach((instrument) => {
        const compositeKey = `${instrument.instrumentID}_${tenor.tenorID}`;
        const rateValue = rateMap[compositeKey] ?? 0;

        row[`rate_${instrument.instrumentName}`] = rateValue;
        row[`InstrumentID_${instrument.instrumentName}`] =
          instrument.instrumentID;
        row[`InstrumentName_${instrument.instrumentName}`] =
          instrument.instrumentName;
      });

      return row;
    });
    let columnsData = [];
    if (value === 1) {
      columnsData = [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
          className: "font-bold",
          width: 80,
        },
        ...applicableInstruments.map((inst) => ({
          title: inst.instrumentName,
          dataIndex: `rate_${inst.instrumentName}`,
          key: `rate_${inst.instrumentName}`,
          align: "center",
          width: 60,
          render: (text, record) => (
            <InputFIeld
              value={text}
              record={record}
              instrumentName={inst.instrumentName}
              onInputChange={onInputChange}
              className={"ValueDiscountingInput"}
            />
          ),
        })),
      ];
    } else {
      columnsData = [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
          className: "font-bold",

          width: 120,
        },
        ...applicableInstruments.map((inst) => ({
          title: inst.instrumentName,
          key: `rate_${inst.instrumentName}`,
          align: "center",
          width: "100px",
          children: [
            {
              width: "100px",
              title: "Value",
              dataIndex: `rate_${inst.instrumentName}`,
              align: "center",

              render: (text, record) => (
                <InputFIeld
                  className={"ValueDiscountingInput"}
                  labelClass={"d-none"}
                  value={text}
                  record={record}
                  onChange={(e) =>
                    onInputChange(e.target.value, record, inst.instrumentName)
                  }
                />
              ),
            },
          ],
        })),
      ];
    }

    // Step 4: Build the column definitions

    return { rowData, columnsData };
  } catch (error) {
    console.error("Error while building discounting table:", error);
    return { rowData: [], columnsData: [] };
  }
};

export const convertToDicountSpreads = (originalData, instruments) => {
  const DiscountRates = originalData.flatMap(
    (item) =>
      instruments.map((instrument) => ({
        InstrumentID: item[`InstrumentID_${instrument.instrumentName}`],
        TenorID: item.TenorID,
        Spread: Number(item[`rate_${instrument.instrumentName}`]) || 0,
      }))
    // .filter((entry) => entry.Spread !== 0) // Exclude zero spreads
  );
  return DiscountRates;
};
