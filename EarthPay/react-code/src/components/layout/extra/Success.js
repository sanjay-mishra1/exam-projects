import React from "react";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import { Divider } from "@material-ui/core";
import dayjs from "dayjs";

export default function Success({ message, extraMessage, data }) {
  const formatBalance = (balance) => {
    var formatter = new Intl.NumberFormat("enp-IN", {
      style: "currency",
      currency: "INR",
    });
    return formatter.format(balance);
  };
  return (
    <div style={{ padding: 10 }}>
      <CheckCircleTwoToneIcon
        htmlColor="#9ac432"
        style={{ fontSize: "8.5rem" }}
      />
      <p>{message}</p>
      {extraMessage && <p>{extraMessage}</p>}
      <Divider style={{ marginLeft: -10, marginRight: -10 }} />
      {data && (
        <table style={{ lineHeight: 0, textAlign: "start", width: "100%" }}>
          {data.tid && (
            <tr>
              <td style={{ color: "gray" }}>
                <p>Reference no </p>
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
                <p>{formatBalance(data.amount)}</p>
              </td>
            </tr>
          )}
          {data.message && (
            <tr>
              <td style={{ color: "gray" }}>
                <p> Message</p>{" "}
              </td>
              <td>
                <p>{data.message}</p>
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
          {data.username && (
            <tr>
              <td style={{ color: "gray" }}>
                <p>Name</p>{" "}
              </td>
              <td>
                <p> {data.username}</p>
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
