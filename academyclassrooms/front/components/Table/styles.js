import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    tableContainer: {
      width: '100%',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'center',
    },
    th: {
      backgroundColor: '#e6e8eb',
      border: '1px solid grey',
      padding: '8px',
    },
    td: {
      border: '1px solid grey',
      padding: '8px',
      fontSize: '14px',
    },
    trHover: {
      '&:hover': {
        backgroundColor: '#bfc9d6',
      },
    },
  });
  
  export default useStyles
