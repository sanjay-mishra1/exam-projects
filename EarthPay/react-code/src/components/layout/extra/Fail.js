import React from "react";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import dayjs from "dayjs";
import { Divider } from "@material-ui/core";

export default function Fail({ message, extraMessage, data }) {
  return (
    <div style={{ padding: 10 }}>
      <CancelTwoToneIcon color="error" style={{ fontSize: "8.5rem" }} />
      <p style={{ marginTop: 100 }}>{message}</p>
      {extraMessage && <p>{extraMessage}</p>}
      <Divider />
      {data && (
        <table style={{ lineHeight: 0, textAlign: "start", width: "100%" }}>
          {data.tid && (
            <tr>
              <td style={{ color: "gray" }}>
                <p>Refrence no </p>
              </td>
              <td>
                <p>{data.tid}</p>
              </td>
            </tr>
          )}

          {data.amount && (
            <tr>
              <td style={{ color: "gray" }}>
                <p> Amount</p>{" "}
              </td>
              <td>
                <p>₹ {data.amount}</p>
              </td>
            </tr>
          )}
          {data.mobilenumber && (
            <tr>
              <td style={{ color: "gray" }}>
                <p>Mobile</p>{" "}
              </td>
              <td>
                <p> {data.mobilenumber}</p>
              </td>
            </tr>
          )}
          {data.createdAt && (
            <tr>
              <td style={{ color: "gray" }}>
                <p>Time</p>{" "}
              </td>
              <td>
                <p> {dayjs(data.createdAt).format("DD MMM YY hh:mm")}</p>
              </td>
            </tr>
          )}
        </table>
      )}
    </div>
  );
}
