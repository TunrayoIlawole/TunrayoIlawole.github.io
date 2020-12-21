const makeRequest = axios.create({
    baseURL: 'https://store-application-xyz.herokuapp.com/api'
});
  
makeRequest.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
  
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
});
  
window.makeRequest = makeRequest;