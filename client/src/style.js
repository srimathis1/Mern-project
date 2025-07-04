import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#333',
  },
  formBox: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  textField: {
    marginBottom: '15px',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0d47a1',
    },
  },
  tableContainer: {
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    padding: '10px',
  },
  tableHead: {
    backgroundColor: '#1976d2',
  },
  tableHeadCell: {
    color: 'white',
    fontWeight: 'bold',
  },
}));
