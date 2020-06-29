import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import CatList from "../CatList"

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: 'url("nyancat.jpg")',
    height: "100%",
    width: "100%"
  }
}));
const App = () => {

  const classes = useStyles();
  return (
    <div className={classes.background}>
      <CatList></CatList>
    </div>
  );
}

export default App