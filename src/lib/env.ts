const envRef = {
  current: {
    API_URL: '',
    REDIRECT_URL: '',
  },
};

export const reloadEnv = () => {
  envRef.current = {
    API_URL: String(process.env.API_URL),
    REDIRECT_URL: String(process.env.REDIRECT_URL),
  };
};

reloadEnv();

export const env = () => envRef.current;
