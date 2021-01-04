import { Card, Divider, Grid } from "@material-ui/core";
import React, { Component } from "react";
import UserBadge from "./UserBadge";

export default class UsersBox extends Component {
  render() {
    const { users, customStyle, className } = this.props;
    console.log(users);
    return (
      <React.Fragment>
        {users && users.length !== 0 ? (
          <Card style={customStyle} className={className}>
            <h4 style={{ margin: 20, fontSize: 20 }}>Contacts</h4>
            <Divider />
            <Grid container>
              {users.map((item, index) => (
                <UserBadge
                  onUserClick={this.props.onClick}
                  userImage={item.imageUrl}
                  userName={item.username}
                  uid={item.uid}
                  key={index}
                />
              ))}
            </Grid>
          </Card>
        ) : null}
      </React.Fragment>
    );
  }
}
