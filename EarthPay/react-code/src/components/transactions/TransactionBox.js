import { Card, Divider, Paper } from "@material-ui/core";
import React, { Component } from "react";
import Transaction from "./Transaction";

export default class TransactionBox extends Component {
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.transactions && this.props.transactions.length > 0 && (
          <Card>
            <h4 style={{ margin: 20, fontSize: 20 }}>Transactions</h4>
            <Divider />
            {this.props.transactions.map((item, index) => (
              <Transaction
                history={this.props.history}
                transaction={item}
                key={index}
              />
            ))}
          </Card>
        )}
      </React.Fragment>
    );
  }
}
