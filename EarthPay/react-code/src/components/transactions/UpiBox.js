import React from "react";
import OffVisibility from "@material-ui/icons/VisibilityOffTwoTone";
import OnnVisibility from "@material-ui/icons/VisibilityTwoTone";
import { Button, IconButton, Input } from "@material-ui/core";

export default function UpiBox(props) {
  const [visible, setVisible] = React.useState(false);
  const [text, settext] = React.useState("");
  const handleVisibility = () => {
    setVisible(!visible);
  };
  const handleChange = (event) => {
    settext(event.target.value.replace(/[^0-9]/g, ""));
  };
  return (
    <div>
      <table style={{ width: "100%" }}>
        <tr>
          <td>
            <p style={{ color: "gray" }}>ENTER UPI PIN</p>
          </td>
          <td>
            <IconButton onClick={handleVisibility}>
              {!visible && <OnnVisibility />}
              {visible && <OffVisibility />}
            </IconButton>
          </td>
        </tr>
      </table>
      <Input
        style={{ textAlign: "center", textAlignLast: "center" }}
        type={visible ? "text" : "password"}
        id="upi-pwd"
        onChange={handleChange}
        value={text}
        inputProps={{ "aria-label": "description" }}
      />
      <br />
      <br />
      <Button
        onClick={() => {
          props.handleUPIBt(text);
        }}
        variant="contained"
        color="primary"
      >
        Send
      </Button>
    </div>
  );
}
