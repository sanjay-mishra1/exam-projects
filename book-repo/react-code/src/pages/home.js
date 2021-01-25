import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSearchResult,
  getBooks,
  getAuthors,
} from "../redux/actions/dataAction";
import emptyCartIcon from "../images/no-books.jpg";

import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  withStyles,
  withWidth,
} from "@material-ui/core";
import store from "../redux/store";
import Loading from "../components/Loading";
import { PAGE_INDEX } from "../redux/type";
import ListContainer from "../components/ListContainer";
import BookInformation from "../components/BookInformation";
import AuthorInformation from "../components/AuthorInformation";
const style = (theme) => ({
  root: { width: "100%" },
  toolbar: theme.mixins.toolbar,

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
  emptyScreen: {
    width: "min-content",
    marginLeft: "45%",
    marginTop: "10%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50%",
      margin: "auto",
    },
  },
});
export class home extends Component {
  state = {
    oldID: -1,
  };
  componentDidMount() {
    let type = this.props.match.path;
    this.handleTabChange(type);
  }
  componentDidUpdate(prevProps) {
    let type = this.props.match.path;
    if (type !== this.state.oldID) this.handleTabChange(type);
  }

  handleTabChange = (type) => {
    this.setState({ oldID: type });
    if (!this.props.data.page || this.props.data.page !== type) {
      store.dispatch({ type: PAGE_INDEX, payload: type });
    }
    if (type === "/books" || type === "/") {
      if (
        this.props.data &&
        this.props.data.books &&
        this.props.data.books.length > 0
      )
        console.log();
      else {
        this.props.getBooks();
      }
    } else {
      if (
        this.props.data &&
        this.props.data.authors &&
        this.props.data.authors.length > 0
      )
        console.log();
      else {
        this.props.getAuthors();
      }
    }
  };

  setbooks = (data, pageName) => {
    return (
      <ListContainer
        userBox={this.props.classes.userBox}
        pageName={pageName}
        data={data}
        width={this.props.width}
        history={this.props.history}
        style={this.props.classes.content}
      />
    );
  };
  getUI = () => {
    let type = this.props.match.path;
    switch (type) {
      case "/":
      case "/books":
        return (
          <React.Fragment>
            {this.props.data.books && this.props.data.books.length > 0 ? (
              this.setbooks(this.props.data.books, "Books")
            ) : (
              <Card className={this.props.classes.emptyScreen}>
                <CardMedia
                  image={emptyCartIcon}
                  style={{ width: 250, height: 250 }}
                  title="Cart empty"
                />
                <CardContent style={{ textAlign: "center" }}>
                  <p>No books found</p>
                  {this.props.data.filter &&
                    this.props.data.filter.length > 0 && (
                      <p>Try change your filter options</p>
                    )}
                </CardContent>
              </Card>
            )}
          </React.Fragment>
        );

      case "/authors":
        return (
          <React.Fragment>
            {this.props.data.authors && this.props.data.authors.length > 0 ? (
              this.setbooks(this.props.data.authors, "Authors")
            ) : (
              <Card className={this.props.classes.emptyScreen}>
                <CardMedia
                  image={emptyCartIcon}
                  style={{ width: 250, height: 250 }}
                  title="Cart empty"
                />
                <CardContent style={{ textAlign: "center" }}>
                  <p>No authers found</p>
                </CardContent>
              </Card>
            )}
          </React.Fragment>
        );

      default:
    }
  };
  handleBookInfoClose = () => {
    this.setState({ book: null });
  };
  render() {
    const { loading } = this.props.data;
    const { classes, width } = this.props;
    const uiMarkup = loading ? (
      <Loading small={width === "xs"} />
    ) : (
      this.getUI(width)
    );
    return (
      <React.Fragment>
        <main className={classes.toolbar} style={{ width: "98%" }}>
          {uiMarkup}
          {this.props.match.params.bookId && (
            <BookInformation
              bookId={this.props.match.params.bookId}
              width={width}
              history={this.props.history}
              handleClose={this.handleBookInfoClose}
              open
            />
          )}
          {this.props.match.params.author && (
            <AuthorInformation
              author={this.props.match.params.author}
              width={width}
              context={this.props.classes.content}
              userBox={this.props.classes.userBox}
              history={this.props.history}
              handleClose={this.handleBookInfoClose}
              open
            />
          )}
        </main>
      </React.Fragment>
    );
  }
}

home.propTypes = {
  data: PropTypes.object.isRequired,
  getSearchResult: PropTypes.func.isRequired,
  getBooks: PropTypes.func,
  getAuthors: PropTypes.func,
};
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default withWidth()(
  connect(mapStateToProps, {
    getSearchResult,
    getBooks,
    getAuthors,
  })(withStyles(style)(home))
);
