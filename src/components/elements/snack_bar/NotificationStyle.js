import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(10),
    },
  },
  BackGroundSucces: {
    width: "100%",
    background: "rgb(0, 183, 22) !important",
    marginTop: theme.spacing(5),
    position: "relative",
  },
  BackGroundfailed: {
    width: "100%",
    backgroundColor: "#ce0000",
    position: "relative",
    marginTop: theme.spacing(6),
  },
}));
