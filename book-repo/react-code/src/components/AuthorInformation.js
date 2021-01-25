import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuthor } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
import {
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

import ListContainer from "./ListContainer";
class BookInformation extends Component {
  handleClose = () => {
    // window.history.back();
    this.props.history.goBack();
  };
  componentDidMount() {
    if (
      this.props.data.author.name &&
      this.props.data.author.name === this.props.author
    ) {
    } else this.props.getAuthor(this.props.author);
  }

  render() {
    const {
      author: { name, desc, imageUrl, books, booksList },
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
          <span style={{ marginTop: 4 }}>{this.props.author}</span>
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
                  style={{ width: 250 }}
                  src={
                    imageUrl !== ""
                      ? imageUrl
                      : "https://firebasestorage.googleapis.com/v0/b/exams-projects.appspot.com/o/common%2Fno-image.png?alt=media&token=23b1e6a1-a7fb-41b2-81e7-ea379f41dbe5"
                  }
                  alt={""}
                />
                <br />

                <span style={{ fontSize: "2em" }}>{name}</span>
                <br />
                <span>{books} books</span>
              </div>
              <div
                style={{ paddingLeft: 13, paddingBottom: 20, paddingRight: 13 }}
              >
                {desc && desc !== "" && (
                  <Paper
                    variant="outlined"
                    style={{
                      paddingLeft: 13,
                      paddingBottom: 20,
                      paddingRight: 13,
                    }}
                  >
                    <h2>About</h2>
                    <Divider style={{ margin: -13 }} />
                    <br />
                    <Typography component="span" variant="body2">
                      {desc}
                    </Typography>{" "}
                  </Paper>
                )}
                {booksList && booksList.length !== 0 && (
                  <ListContainer
                    userBox={this.props.userBox}
                    pageName={"Books"}
                    data={booksList}
                    relativePos
                    width={this.props.width}
                    history={this.props.history}
                    style={this.props.content}
                  />
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    );
  }
}
BookInformation.propTypes = {
  data: PropTypes.object.isRequired,
  getAuthor: PropTypes.func,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, {
  getAuthor,
})(BookInformation);
