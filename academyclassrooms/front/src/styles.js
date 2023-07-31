import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    '@global': {
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        html: {
            height: '100%',
        },
        body: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '#root': {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: 'arial',
            fontWeight: "lighter",
        },
    },
    container: {
        maxWidth: "1100px",
    }


});

export default useStyles;