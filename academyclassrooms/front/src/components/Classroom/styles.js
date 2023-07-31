import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    container: {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
      },
      tr:{
        '&:hover':{
            backgroundColor: '#bfc9d6',
        }
      },
      th: {
        borderBottom: '1px solid grey',
        borderRight: '1px solid grey',
        borderTop: '1px solid grey',
        borderLeft: '1px solid grey',
        padding: '8px',
        textAlign: 'center',
        background: "#e6e8eb",
        textTransform: "uppercase"
      },
      td: {
        borderBottom: '1px solid grey',
        borderRight: '1px solid grey',
        borderTop: '1px solid grey',
        borderLeft: '1px solid grey',
        padding: '8px',
        textAlign: 'center',
        fontSize: '14px',
      },


});

export default useStyles;