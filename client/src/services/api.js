import axios from 'axios';

// Ställer in en standardbas-URL för alla Axios-anrop
axios.defaults.baseURL = 'http://localhost:5001';

export default axios;