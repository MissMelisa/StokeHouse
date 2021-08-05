import { Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  errorMessage: { color: "red" },
  spanTitle: {
    alignSelf: "flex-start",
    fontSize: "15px",
    fontWeight: "bolder",
    margin: "6px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  buttonFoodItem: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function FoodItemOptions({
  title,
  options,
  onClick,
  selectedOption,
  error,
}) {
  const classes = useStyles();

  return (
    <div className={classes.buttonFoodItem}>
      <Typography className={classes.spanTitle}>{title}</Typography>
      <ButtonGroup
        size="large"
        variant="contained"
        orientation="vertical"
        color="primary"
        className={classes.buttonGroup}
        aria-label="vertical outlined primary button group"
      >
        {options.map((option) => (
          <Button
            className={classes.buttonFoodItem}
            onClick={() => onClick(title, option)}
            color="primary"
            variant={option === selectedOption ? "contained" : "outline"}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>

      {error === true && (
        <span className={classes.errorMessage}>
          Selecciona el {selectedOption[title]}.
        </span>
      )}
    </div>
  );
}
