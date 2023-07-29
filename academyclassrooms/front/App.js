import { useState, useEffect } from "react";
import Classroom from "./components/Classroom";
import useStyles from "./styles";
import Search from "./components/Search";


function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
    <Search/>
    
    <Classroom name="Ada Lovelace"/>
    
    <Classroom name="Alan Turing"/>
    
    <Classroom name="Claude Shannon"/>
    
    <Classroom name="Donald Knuth"/>
    
    <Classroom name="William Shockley"/>

    </div>
  );
}

export default App;