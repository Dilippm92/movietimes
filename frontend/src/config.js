let BaseURL;

if (process.env.NODE_ENV === 'production') {
  // For production (e.g. when deployed on 'https://movietimess.onrender.com/')
  BaseURL = 'https://movietimess.onrender.com/';
} else {
  // For development (e.g. when running on 'http://localhost:5000')
  BaseURL = 'http://localhost:5000/';
}

export default BaseURL;
