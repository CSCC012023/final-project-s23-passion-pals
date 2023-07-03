/* formStyles.js */

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: theme.spacing(4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  fileInput: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  buttonSubmit: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
