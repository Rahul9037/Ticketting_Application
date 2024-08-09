import 'bootstrap/dist/css/bootstrap.css';

const GlobalComponent  = ({Component ,pageProps}) => {
  return <Component {...pageProps} />
}

export default GlobalComponent;