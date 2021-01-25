import React, { Component } from "react";
import { connect } from "react-redux";
import { getBook } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import { Rating } from "@material-ui/lab";
import { AddShoppingCartTwoTone } from "@material-ui/icons";
import { Link } from "react-router-dom";
class BookInformation extends Component {
  isItemInCart = () => {
    var cart = localStorage.cart;
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }
    let index = cart.findIndex((item) => item.id === this.props.data.book.id);
    return { index, cart };
  };
  state = {
    inCart: this.isItemInCart().index === -1 ? false : true,
  };
  handleClose = () => {
    // window.history.back();
    this.props.history.goBack();
  };
  componentDidMount() {
    if (
      this.props.data.book.id &&
      this.props.data.book.id === this.props.bookId
    ) {
    } else this.props.getBook(this.props.bookId);
  }
  formatBalance = (balance) => {
    var formatter = new Intl.NumberFormat("enp-IN", {
      style: "currency",
      currency: "INR",
    });
    return formatter.format(balance);
  };

  handleCart = () => {
    let { index, cart } = this.isItemInCart();
    if (index === -1) {
      cart.push({ ...this.props.data.book });
      this.setState({ inCart: true });
    } else {
      cart.splice(index, 1);
      this.setState({ inCart: false });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  handleCart = () => {
    var cart = localStorage.cart;
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }
    let index = cart.findIndex((item) => item.id === this.props.data.book.id);
    if (index === -1) {
      cart.push({ ...this.props.data.book });
      this.setState({ inCart: true });
    } else {
      cart.splice(index, 1);
      this.setState({ inCart: false });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  render() {
    const {
      book: {
        authors,
        average_rating,
        isbn,
        language_code,
        price,
        ratings_count,
        title,
        imageUrl,
        pageCount,
        desc,
      },
      loading,
    } = this.props.data;
    const { width, open } = this.props;
    return (
      <Dialog open={open} onClose={this.handleClose} fullWidth fullScreen>
        <DialogTitle>
          <IconButton
            onClick={this.handleClose}
            style={{ marginLeft: -24, marginTop: -6 }}
          >
            <ArrowIcon htmlColor="#369fff" />
          </IconButton>
          <span style={{ marginTop: 4 }}>{title}</span>
        </DialogTitle>
        <Divider />
        {loading ? (
          <CircularProgress
            size={40}
            style={{
              placeSelf: "center",
              marginBottom: "20%",
              marginTop: "10%",
            }}
          />
        ) : (
          <DialogContent>
            <div
              style={
                width !== "xs"
                  ? { display: "flex", justifyContent: "space-around" }
                  : {}
              }
            >
              <div style={{ textAlign: "center" }}>
                <img
                  style={{
                    width: 250,
                    borderRadius: 5,
                    marginRight: 18,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                  src={
                    imageUrl !== ""
                      ? imageUrl
                      : "https://firebasestorage.googleapis.com/v0/b/exams-projects.appspot.com/o/common%2Fno-cover.jpg?alt=media&token=a13f6987-415f-41fc-8221-8d38d3aaca07"
                  }
                  alt={""}
                />
              </div>
              <Paper
                variant="outlined"
                style={{ paddingLeft: 13, paddingBottom: 20, paddingRight: 13 }}
              >
                <br />
                <span style={{ fontSize: "2em" }}>{title}</span>
                <br />
                by{" "}
                <span>
                  {authors &&
                    authors.map((author, index) => (
                      <Typography
                        color={"textSecondary"}
                        component={Link}
                        key={index}
                        to={`/author/${author}`}
                        variant="body2"
                      >
                        {author}
                        {index !== authors.length - 1 && ","}{" "}
                      </Typography>
                    ))}
                </span>
                <br />
                <br />
                <Rating
                  name={"ratings"}
                  readOnly
                  size="small"
                  value={Math.round(average_rating * 10) / 10}
                />
                <span style={{ fontSize: "large" }}>
                  {" "}
                  {ratings_count} ratings
                </span>
                <br />
                <br />
                <Button
                  size="large"
                  color="primary"
                  disableRipple
                  variant="outlined"
                >
                  {this.formatBalance(price)}
                </Button>
                <br />
                <br />
                <Divider style={{ margin: -13 }} />
                <br />
                <h3>Other informations</h3>
                {isbn && isbn !== "" && (
                  <p>
                    <Typography color="textSecondary" component="span">
                      ISBN:
                    </Typography>
                    <Typography component="span">{" " + isbn}</Typography>
                  </p>
                )}
                {language_code && language_code !== "" && (
                  <p>
                    <Typography color="textSecondary" component="span">
                      Language:
                    </Typography>
                    <Typography component="span">
                      {" " + language_code}
                    </Typography>
                  </p>
                )}
                {pageCount && pageCount !== "" && (
                  <p>
                    <Typography color="textSecondary" component="span">
                      Pages:
                    </Typography>
                    <Typography component="span">{" " + pageCount}</Typography>
                  </p>
                )}
                {desc && desc !== "" && (
                  <div dangerouslySetInnerHTML={{ __html: desc }} />
                )}
                <br />
                <Divider style={{ margin: -13 }} />
                <br />
                <br />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.handleCart}
                  startIcon={<AddShoppingCartTwoTone htmlColor="white" />}
                >
                  {this.state.inCart ? "Remove" : "Cart"}
                </Button>
                <br />
              </Paper>
            </div>
          </DialogContent>
        )}
      </Dialog>
    );
  }
}
BookInformation.propTypes = {
  data: PropTypes.object.isRequired,
  getBook: PropTypes.func,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, {
  getBook,
})(BookInformation);
