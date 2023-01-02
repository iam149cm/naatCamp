import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">

      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Zoom in={true}>
      <Fab 
      onClick={handleClick}><DeleteIcon/> </Fab>
      </Zoom>
    </div>
  );
}

export default Note;
