// eslint-disable-next-line import/no-anonymous-default-export
export default {
  palette: {
    secondary: {
      light: "#7530ff",
      dark: "#7530ff",
      contrastText: "#ffffff",
      main: "#7530ff",
    },
    primary: {
      main: "#369fff",
      light: "#369fff",
      dark: "#7530ff",
      contrastText: "#ffffff",
    },
  },
  spreadIt: {
    subTitle: {
      color: "#8e8e8e",
      marginTop: 4,
    },
    title: {
      color: "#000000",
      fontWeight: "bold",
      marginTop: 10,
    },
    horizontalDivider: {
      borderColor: "#eff1f3",
      marginLeft: -17,
      marginRight: -17,
      marginTop: "auto",
      borderTop: "0px solid #eff1f3",
    },
    link: {
      paddingLeft: 16,
      paddingTop: 5,
      marginTop: -8,
      width: "inherit",
      textDecoration: "none",
      marginLeft: -16,
      marginRight: -16,
      "&:hover": {
        cursor: "pointer",
        background: "#eff1f3",
      },
    },

    searchResultContainer: {
      width: "32em",
      zIndex: 1,
      position: "fixed",
      marginTop: 14,
      // marginLeft: "14%",
    },
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
      height: 120,
    },
    textField: {
      margin: "5px auto 10px auto",
    },
    pageTitle: {
      margin: "5px auto 10px auto",
    },
    button: {
      marginTop: "20px",
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: ".8rem",
      marginTop: "10",
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },

    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        marginRight: -20,
        marginLeft: -21,
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 134,
        height: 134,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "start",
        marginTop: 18,
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#00bcd4",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
    hiddenBt: {
      display: "none",
    },
  },
};
