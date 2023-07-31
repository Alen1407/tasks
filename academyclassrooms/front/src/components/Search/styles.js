import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root:{
    marginTop: '50px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '3px',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    color: '#fff',

    cursor: 'pointer',
  },
  
});

export default useStyles;