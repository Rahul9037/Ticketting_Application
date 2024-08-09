import axios from 'axios';

const Landing = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser');
  return <h1>Landing2</h1>;
};

// Landing.getInitialProps = async () => {
//   const response = await axios.get('/api/users/currentuser');
//   return response.data;
// };

export default Landing;
