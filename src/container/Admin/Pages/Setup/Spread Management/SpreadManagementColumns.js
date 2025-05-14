import style from "./SpreadManagement.module.css";
import { Input } from "antd";
import "./SpreadManagement.module.css";

//Table columns for parity spot
export const ParitySpotcolumns = [
  {
    title: <label className="bottom-table-header">Currency</label>,
    dataIndex: "currency",
    key: "currency",
    width: 100,
    ellipsis: true,
    align: "center",
  },
  {
    title: <label className="bottom-table-header">Bid Spread</label>,
    dataIndex: "bidSpread",
    key: "bidSpread",
    width: 100,
    align: "center",
    ellipsis: true,
    // render: (text) => (
    //   <Input className={style["InputTableSpreadManagement"]} value={text} />
    // ),
  },

  {
    title: <label className="bottom-table-header">Ask Spread</label>,
    dataIndex: "askSpread",
    key: "askSpread",
    width: 100,
    ellipsis: true,
    align: "center",
    // render: (text) => <Input className="WidthInputParitySpot" value={text} />,
  },
];

//Table columns for Cross Rates
export const CrossRatecolumns = [
  {
    title: <label className="bottom-table-header">Currency</label>,
    dataIndex: "currency",
    key: "currency",
    width: 100,
    ellipsis: true,
    align: "center",
  },
  {
    title: <label className="bottom-table-header">Bid Spread</label>,
    dataIndex: "bidSpread",
    key: "bidSpread",
    width: 100,
    align: "center",
    ellipsis: true,
    // render: (text) => <Input className="WidthInputParitySpot" value={text} />,
  },

  {
    title: <label className="bottom-table-header">Ask Spread</label>,
    dataIndex: "askSpread",
    key: "askSpread",
    width: 100,
    ellipsis: true,
    align: "center",
    // render: (text) => <Input className="WidthInputParitySpot" value={text} />,
  },
];

//Forward Table
export const Forwardcolumns = [
  {
    // title: "Tenor",
    // dataIndex: "tenor",
    // key: "tenor",
    // // fixed: "left",
    // ecllipse: true,
    // align: "left",
    // width: 100,
    // render: (text) => {
    //   return (
    //     <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{text}</span>
    //   );
    // },

    title: "  ",
    children: [
      {
        title: "Tenor",
        dataIndex: "tenor",
        key: "tenor",
        // fixed: "left",
        ecllipse: true,
        align: "left",
        width: 100,
        render: (text) => {
          return (
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {text}
            </span>
          );
        },
      },
    ],
  },
  {
    title: "USD",
    align: "center",
    children: [
      {
        // title: (
        //   <>
        //     <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
        //       Bid Spread
        //     </span>
        //   </>
        // ),
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "usdBid",
        key: "usdBid",
        align: "center",
        width: 100,
        ecllipse: true,
        render: (text) => (
          <Input className={style["InputTableSpreadManagement"]} value={text} />
        ),

        // render: (text) => text,
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "usdAsk",
        align: "center",
        key: "usdAsk",
        width: 100,

        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "EUR",
    align: "center",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "eurBid",
        align: "center",
        key: "eurBid",
        width: 100,

        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "eurAsk",
        align: "center",
        key: "eurAsk",
        width: 100,

        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "GBP",
    align: "center",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "gbpBid",
        key: "gbpBid",
        align: "center",
        width: 100,
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "gbpAsk",
        key: "gbpAsk",
        align: "center",
        width: 100,

        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "HKD",
    align: "center",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "hkdBid",
        key: "hkdBid",
        align: "center",
        width: 100,
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "hkdAsk",
        width: 100,
        align: "center",
        key: "hkdAsk",
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "JPY",
    align: "center",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Bid Spread
            </span>
          </>
        ),
        dataIndex: "jpyBid",
        key: "jpyBid",
        width: 100,
        align: "center",
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Ask Spread
            </span>
          </>
        ),
        dataIndex: "jpyAsk",
        key: "jpyAsk",
        width: 100,
        align: "center",
        ecllipse: true,
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
];

//Discounting Table
export const Discountingcolumns = [
  {
    // title: "Tenor",
    title: <label className="bottom-table-header">Tenor</label>,
    dataIndex: "tenor",
    key: "tenor",
    align: "left",
    ecllipse: true,
    width: 100,
    // render: (text) => {
    //   return (
    //     <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{text}</span>
    //   );
    // },
  },
  {
    title: "USD",
    align: "center",
    children: [
      {
        title: <label className="bottom-table-header">Value</label>,
        dataIndex: "usdBid",
        key: "usdBid",
        align: "center",
        width: 100,
        ecllipse: true,

        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "EUR",
    align: "center",
    children: [
      {
        title: <label className="bottom-table-header">Value</label>,
        dataIndex: "eurBid",
        align: "center",
        key: "eurBid",
        width: 100,

        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "GBP",
    align: "center",
    children: [
      {
        title: <label className="bottom-table-header">Value</label>,
        dataIndex: "gbpBid",
        key: "gbpBid",
        align: "center",
        width: 100,
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "HKD",
    align: "center",
    children: [
      {
        title: <label className="bottom-table-header">Value</label>,
        dataIndex: "hkdBid",
        key: "hkdBid",
        align: "center",
        width: 100,
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
  {
    title: "JPY",
    align: "center",
    children: [
      {
        title: (
          <>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              Value
            </span>
          </>
        ),
        dataIndex: "jpyBid",
        key: "jpyBid",
        width: 100,
        align: "center",
        // render: (text) => (
        //   <Input className={style["InputTableSpreadManagement"]} value={text} />
        // ),
      },
    ],
  },
];

// Dummy data for the table
export const parityData = [
  {
    key: "1",
    currency: "EUR",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "2",
    currency: "USD",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "3",
    currency: "CAD",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "4",
    currency: "GBP",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "5",
    currency: "HKD",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "6",
    currency: "JPY",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
];

// Dummy data for the table
export const crossData = [
  {
    key: "1",
    currency: "EUR",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "2",
    currency: "USD",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "3",
    currency: "CAD",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "4",
    currency: "GBP",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "5",
    currency: "HKD",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
  {
    key: "6",
    currency: "JPY",
    bidSpread: "3.3",
    askSpread: "3.3",
  },
];

// Dummy data for the table
export const emptyParityData = [
  {
    key: "1",
    currency: "EUR",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "2",
    currency: "USD",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "3",
    currency: "CAD",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "4",
    currency: "GBP",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "5",
    currency: "HKD",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "6",
    currency: "JPY",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
];

// Dummy data for the table
export const emptyCrossData = [
  {
    key: "1",
    currency: "EUR",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "2",
    currency: "USD",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "3",
    currency: "CAD",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "4",
    currency: "GBP",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "5",
    currency: "HKD",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
  {
    key: "6",
    currency: "JPY",
    bidSpread: "0.0",
    askSpread: "0.0",
  },
];

//Forward Table Dummy Data
export const initialForwardState = [
  {
    key: "1",
    tenor: "1 WEEK",
    usdBid: "10.10",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "2",
    tenor: "3 WEEK",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "3",
    tenor: "1 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "4",
    tenor: "3 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "5",
    tenor: "6 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "6",
    tenor: "9 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "7",
    tenor: "10 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
];
//Forward Table Dummy Data
export const emptyForwardState = [
  {
    key: "1",
    tenor: "1 WEEK",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "2",
    tenor: "3 WEEK",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "3",
    tenor: "1 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "4",
    tenor: "3 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "5",
    tenor: "6 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "6",
    tenor: "9 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "7",
    tenor: "10 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
];

//Discounting Table Dummy Data
export const initialDiscountingState = [
  {
    key: "1",
    tenor: "1 WEEK",
    usdBid: "10.10",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "2",
    tenor: "3 WEEK",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "3",
    tenor: "1 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "4",
    tenor: "3 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "5",
    tenor: "6 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "6",
    tenor: "9 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
  {
    key: "7",
    tenor: "10 MONTH",
    usdBid: "10.00",
    usdAsk: "10.10",
    eurBid: "10.00",
    eurAsk: "10.10",
    gbpBid: "10.00",
    gbpAsk: "10.10",
    hkdBid: "10.00",
    hkdAsk: "10.10",
    jpyBid: "10.00",
    jpyAsk: "10.10",
  },
];
//Forward Table Dummy Data
export const emptyDiscountingState = [
  {
    key: "1",
    tenor: "1 WEEK",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "2",
    tenor: "3 WEEK",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "3",
    tenor: "1 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "4",
    tenor: "3 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "5",
    tenor: "6 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "6",
    tenor: "9 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
  {
    key: "7",
    tenor: "10 MONTH",
    usdBid: "00.00",
    usdAsk: "00.00",
    eurBid: "00.00",
    eurAsk: "00.00",
    gbpBid: "00.00",
    gbpAsk: "00.00",
    hkdBid: "00.00",
    hkdAsk: "00.00",
    jpyBid: "00.00",
    jpyAsk: "00.00",
  },
];
