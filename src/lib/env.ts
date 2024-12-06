const envRef = {
  current: {
    API_URL: '',
  },
};

export const reloadEnv = () => {
  envRef.current = {
    API_URL: String(process.env.API_URL),
  };
};

reloadEnv();

export const env = () => envRef.current;
