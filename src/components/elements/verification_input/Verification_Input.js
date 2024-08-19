import ReactCodeInput from "react-code-input";
import Form from "react-bootstrap/Form";

const props = {
  inputStyle: {
    border: "1px solid #000",
    margin: "4px",
    paddingLeft: "8px",
    width: "49px",
    backgroundColor: "transparent",
    textAlign: "center",
    height: "33px",
    boxSizing: "border-box",
    borderRadius: "4px",
    borderColor: "#000",
    fontSize: "13px",
    padding: "0 5px",
    transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
    lineHeight: "1.5",
  },
  inputStyleFocused: {
    color: "#000",
    backgroundColor: "none",
    borderColor: "blue",
    outline: "0",
    boxShadow: "0 0 0 0.25rem rgb(13 110 253 / 25%)",
  },
};

const VerificationInputField = ({ label, change, value, ref, fields, key }) => {
  return (
    <>
      <Form.Label className="MontserratMedium-500 d-inline-block">
        {label}
      </Form.Label>
      <ReactCodeInput
        ref={ref}
        className="FocusedStyling"
        inputStyle={{
          color: "#564",
          display: "flex",
          justifyContent: "center",
        }}
        key={key}
        onChange={change}
        type="text"
        pattern="[A-Z0-9]"
        fields={fields}
        value={value}
        {...props}
      />
    </>
  );
};

export default VerificationInputField;
