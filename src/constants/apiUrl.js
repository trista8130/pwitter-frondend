const devUrl = "http://localhost:3005";

const prodUrl = "https://pwitter-trista.herokuapp.com";

const currentEnv = process.env.REACT_APP_ENV;

const getAPIUrl = () => {
  if (currentEnv === "dev") {
    return devUrl;
  }
  return prodUrl;
};

export default getAPIUrl;
