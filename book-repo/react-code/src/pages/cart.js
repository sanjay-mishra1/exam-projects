import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import Book from "../components/Book";
import store from "../redux/store";
import { PAGE_INDEX } from "../redux/type";
import googlepay from "../images/googlepay.png";
import paytm from "../images/paytm.png";
import paypal from "../images/paypal.svg";
import visa from "../images/visa.svg";
import mastercard from "../images/mastercard.svg";
import emptyCartIcon from "../images/no-books.jpg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const style = (theme) => ({
  root: { width: "100%" },
  toolbar: theme.mixins.toolbar,
  emptyScreen: {
    width: "min-content",
    marginLeft: "45%",
    marginTop: "10%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50%",
      margin: "auto",
    },
  },
  content: {
    flexGrow: 1,
    // marginTop: 43,
  },
  userBox: {
    width: 250,
    // height: 230,
    cursor: "pointer",
    "&:hover": {
      opacity: "70%",
    },
  },
});
class cart extends Component {
  formatBalance = (balance) => {
    var formatter = new Intl.NumberFormat("enp-IN", {
      style: "currency",
      currency: "INR",
    });
    return formatter.format(balance);
  };
  render() {
    if (!this.props.data.page || this.props.data.page !== "/cart") {
      store.dispatch({ type: PAGE_INDEX, payload: "/cart" });
    }
    const { classes } = this.props;
    let cart = localStorage.cart;
    if (!cart) cart = [];
    else cart = JSON.parse(cart);
    let totalAmount = 0;
    const cartMarkup =
      cart.length > 0 &&
      cart.map((book, index) => {
        totalAmount += book.price;
        return (
          <Book
            className={classes.userBox}
            relativePos={false}
            history={this.props.history}
            item={book}
            showLinear={true}
          />
        );
      });
    const titleMargin = { paddingLeft: 37, paddingTop: 10, paddingBottom: 13 };
    return (
      <main className={classes.toolbar} style={{ width: "98%" }}>
        {cart.length > 0 ? (
          <React.Fragment>
            <Grid container spacing="3">
              <Grid item sm={6} lg={8} xs={12}>
                <Card>
                  <div style={{ display: "flex", placeItems: "center" }}>
                    <Typography
                      style={{ ...titleMargin, width: "79%" }}
                      variant="h5"
                    >
                      {"Cart"}
                    </Typography>
                    <Typography>{cart.length} books</Typography>
                  </div>
                  <Divider />

                  {cartMarkup}
                </Card>
                <Card style={{ display: "flex", marginTop: 10 }}>
                  <Typography style={{ width: "90%", fontSize: "1.5em" }}>
                    Total
                  </Typography>
                  <Typography style={{ fontSize: "1.5em" }} variant="body1">
                    {this.formatBalance(totalAmount)}
                  </Typography>
                </Card>
              </Grid>
              <Grid item sm={6} lg={4} xs={12}>
                <Card>
                  <Typography
                    style={{ ...titleMargin, width: "90%" }}
                    variant="h5"
                  >
                    {"CHECKOUT"}
                  </Typography>
                  <Divider />
                  <div style={{ padding: "10px", display: "flex" }}>
                    <p style={{ width: "70%" }}>Sub total</p>
                    <p style={{ color: "#a2a2a2" }}>
                      {this.formatBalance(totalAmount)}
                    </p>
                  </div>
                  <div style={{ padding: "10px", display: "flex" }}>
                    <p style={{ width: "70%" }}>Delivery</p>
                    <p style={{ color: "#a2a2a2" }}>
                      {this.formatBalance("50")}
                    </p>
                  </div>

                  <Divider />
                  <Button
                    size="large"
                    fullWidth
                    style={{ margin: 10, padding: 14, width: "96%" }}
                    color="primary"
                    variant="contained"
                  >
                    checkout
                  </Button>
                  <Typography
                    style={{ ...titleMargin, width: "90%" }}
                    variant="h5"
                  >
                    {"We Accept"}
                  </Typography>
                  <Divider />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <img
                      style={{ width: 50, height: 35 }}
                      src={visa}
                      alt="visa"
                    />
                    <img
                      style={{ width: 50, height: 35 }}
                      src={mastercard}
                      alt="mastercard"
                    />
                    <img
                      style={{ width: 50, height: 35 }}
                      src={paypal}
                      alt="paypal"
                    />
                    <img
                      style={{ width: 90, height: 28 }}
                      src={paytm}
                      alt="paytm"
                    />
                    <img
                      style={{ width: 70, height: 30 }}
                      src={googlepay}
                      alt="googlepay"
                    />
                  </div>
                  <br />
                </Card>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : (
          <Card className={classes.emptyScreen}>
            <CardMedia
              image={emptyCartIcon}
              style={{ width: 250, height: 250 }}
              title="Cart empty"
            />
            <CardContent style={{ textAlign: "center" }}>
              <p>No books in your cart</p>
              <Typography component={Link} to={"/books"}>
                Go To Books
              </Typography>
            </CardContent>
          </Card>
        )}
      </main>
    );
  }
}
cart.propTypes = {
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, null)(withStyles(style)(cart));
