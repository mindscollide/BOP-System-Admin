import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Paho from "paho-mqtt";
import { secureRandomString } from "../commen/functions/utils";

// Create the context
const MqttContext = createContext();

export const useMqtt = () => useContext(MqttContext);

export const MqttProvider = ({ subscribeID, dispatch, children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);
  const retryCountRef = useRef(0); // Tracks number of retries
  const MAX_RETRIES = 3;
  const randomString = secureRandomString();
  // Related Bank User Request and Created and Rejected
  const [bankUserCreated, setBankUserCreated] = useState(null);
  const [bankUserRoleStatusChange, setBankUserRoleStatusChange] =
    useState(null);
  const [bankUserUpdated, setBankUserUpdated] = useState(null);
  const [branchCreated, setBranchCreated] = useState(null);
  const [branchUpdated, setBranchUpdated] = useState(null);

  // Related Corporate User Request and Created and Rejected
  const [corproateUserCreated, setCorporateUserCreated] = useState(null);
  const [corporateUserRoleStatusChange, setCorporateUserRoleStatusChange] =
    useState(null);
  const [corporateCreated, setCorporateCreated] = useState(null);
  const [corporateUpdated, setCorporateUpdated] = useState(null);
  const [corporateUserUpdated, setCorporateUserUpdated] = useState(null);
  const [marketTimingsUpdated, setMarketTimingsUpdated] = useState(null);
  const [categoryAdded, setCategoryAdded] = useState(null);
  const [categoryUpdate, setCategoryUpdate] = useState(null);
  const [categoryDeleted, setCategoryDeleted] = useState(null);
  const [counterpartyChnaged, setCounterpartyChnaged] = useState(null);
  const [counterpartyBranchChnaged, setCounterpartyBranchChnaged] =
    useState(null);
  const [corporateStatusUpdated, setCorporateStatusUpdated] = useState(null);
  const [branchStatusUpdated, setBranchStatusUpdated] = useState(null);
  const [corporateTradeStatusUpdated, setCorporateTradeStatusUpdated] =
    useState(null);
  const [branchTradeStatusUpdated, setBranchTradeStatusUpdated] =
    useState(null);
  const [corporateTradeRightsUpdated, setCorporateTradeRightsUpdated] =
    useState(null);
  const [branchTradeRightsUpdated, setBranchTradeRightsUpdated] =
    useState(null);
  const [spotSpreadUpdated, setSpotSpreadUpdated] = useState(null);
  const [spotCrossUpdated, setCrossSpreadUpdated] = useState(null);

  const connectToMqtt = () => {
    if (!subscribeID) {
      console.error("No subscribeID provided for MQTT connection.");
      return;
    }

    let newClientID = `${subscribeID}-${randomString}`;

    // Initialize client
    clientRef.current = new Paho.Client("192.168.18.241", 8228, newClientID);

    clientRef.current.onConnectionLost = (responseObject) => {
      console.error("MQTT Connection lost:", responseObject.errorMessage);
      setIsConnected(false);

      setTimeout(connectToMqtt, 6000); // Retry after 6 seconds
    };

    clientRef.current.onMessageArrived = (message) => {
      console.log("Message arrived:", JSON.parse(message.payloadString));
      let data = JSON.parse(message.payloadString);

      console.log("Message arrived:", JSON.parse(message.payloadString));

      switch (data.payload.message) {
        case "BANK_USER_CREATED":
          console.log("Message arrived:", data);

          // When Security Admin Accepted a Bank User Request
          setBankUserCreated(data.payload);
          break;
        case "CORPORATE_USER_CREATED":
          console.log("Message arrived:", data);

          // When Security Admin Accepted a Corporate User Request
          setCorporateUserCreated(data.payload);
          break;

        case "CORP_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);

          // When Security Admin Change a Corporate User Role
          setCorporateUserRoleStatusChange(data.payload);
          break;
        case "BANK_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);

          // When Security Admin Change a Bank User Role
          setBankUserRoleStatusChange(data.payload);
          break;
        case "BRANCH_CREATED":
          console.log("Message arrived:", data);

          // When System  Admin Created a Branch
          setBranchCreated(data.payload);
          break;
        case "BRANCH_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Branch
          setBranchUpdated(data.payload);
          break;
        case "CORPORATE_CREATED":
          console.log("Message arrived:", data);

          // When System  Admin Created a Corporate
          setCorporateCreated(data.payload);
          break;
        case "CORPORATE_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Corporate
          setCorporateUpdated(data.payload);
          break;
        case "BANK_USER_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Bank User
          setBankUserUpdated(data.payload);
          break;
        case "CORPORATE_USER_UPDATED":
          console.log("Message arrived:", data);
          // When System  Admin Updated a Corporate User
          setCorporateUserUpdated(data.payload);
          break;
        case "MARKET_TIME_UPDATED":
          setMarketTimingsUpdated(data.payload);
          break;
        // When Category is Added
        case "CATEGORY_ADDED":
          setCategoryAdded(data.payload);
          break;
        // When Category is Updated
        case "CATEGORY_UPDATED":
          setCategoryUpdate(data.payload);
          break;
        // When Category is Deleted
        case "CATEGORY_DELETED":
          setCategoryDeleted(data.payload);
          break;
        // When Counter party category is mapped
        case "CORPORATE_CATEGORY_CHANGED":
          setCounterpartyChnaged(data.payload);
          break;
        // When Counter party Branch is mapped
        case "BRANCH_CATEGORY_CHANGED":
          setCounterpartyBranchChnaged(data.payload);
          break;
        // When Corporate Status is Updated (Active / Trade)
        case "CORPORATE_STATUS_UPDATED":
          setCorporateStatusUpdated(data.payload);
          break;
        // When Branch Status is Updated (Active / Trade)
        case "BRANCH_STATUS_UPDATED":
          setBranchStatusUpdated(data.payload);
          break;
        // When Corporate Trade Status is Updated (Active / Trade)
        case "CORPORATE_TRADE_STATUS_UPDATED":
          setCorporateTradeStatusUpdated(data.payload);
          break;
        // When Branch Trade Status is Updated (Active / Trade)
        case "BRANCH_TRADE_STATUS_UPDATED":
          setBranchTradeStatusUpdated(data.payload);
          break;
        // When Corporate Trade Rights Updated
        case "CORPORATE_TRADE_RIGHTS_UPDATED":
          setCorporateTradeRightsUpdated(data.payload);
          break;
        // When Branch Trade Rights Updated
        case "BRANCH_TRADE_RIGHTS_UPDATED":
          setBranchTradeRightsUpdated(data.payload);
          break;
        // When CATEGORY_PARITY_SPOT_SPREADS
        case "CATEGORY_PARITY_SPOT_SPREADS":
          setSpotSpreadUpdated(data.payload);
          break;

        case "CATEGORY_CROSS_RATE_SPREADS":
          setCrossSpreadUpdated(data.payload);
        default:
          break;
      }
    };

    const options = {
      onSuccess: () => {
        console.log("Connected to MQTT broker");
        setIsConnected(true);
        clientRef.current.subscribe(subscribeID.toString(), {
          onSuccess: () => console.log(`Subscribed to ${subscribeID}`),
          onFailure: (error) =>
            console.error("Subscription failed:", error.errorMessage),
        });
      },
      onFailure: (error) => {
        console.error("MQTT connection failed:", error.errorMessage);
        setIsConnected(false);

        setTimeout(connectToMqtt, 6000); // Retry after 6 seconds
      },
      keepAliveInterval: 30,
      reconnect: true,
      userName: "user1",
      password: "password1",
    };

    clientRef.current.connect(options);
  };

  useEffect(() => {
    connectToMqtt();
    return () => {
      if (clientRef.current?.isConnected()) {
        clientRef.current.disconnect();
      }
    };
  }, [subscribeID]);

  return (
    <MqttContext.Provider
      value={{
        client: clientRef.current,
        isConnected,
        bankUserCreated,
        bankUserRoleStatusChange,
        bankUserUpdated,
        branchCreated,
        branchUpdated,
        corproateUserCreated,
        corporateUserRoleStatusChange,
        corporateCreated,
        corporateUpdated,
        corporateUserUpdated,
        setBranchCreated,
        setBranchUpdated,
        setCorporateCreated,
        setCorporateUpdated,
        marketTimingsUpdated,
        setMarketTimingsUpdated,
        setCorporateUserRoleStatusChange,
        setBankUserRoleStatusChange,
        setBankUserUpdated,
        setCorporateUserUpdated,
        categoryAdded,
        setCategoryAdded,
        categoryUpdate,
        setCategoryUpdate,
        categoryDeleted,
        setCategoryDeleted,
        counterpartyChnaged,
        setCounterpartyChnaged,
        counterpartyBranchChnaged,
        setCounterpartyBranchChnaged,
        corporateStatusUpdated,
        setCorporateStatusUpdated,
        branchStatusUpdated,
        setBranchStatusUpdated,
        corporateTradeStatusUpdated,
        setCorporateTradeStatusUpdated,
        branchTradeStatusUpdated,
        setBranchTradeStatusUpdated,
        corporateTradeRightsUpdated,
        setCorporateTradeRightsUpdated,
        branchTradeRightsUpdated,
        setBranchTradeRightsUpdated,
        spotSpreadUpdated,
        setSpotSpreadUpdated,
        spotCrossUpdated,
        setCrossSpreadUpdated,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};
