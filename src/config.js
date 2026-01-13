let config = null;

export const loadConfig = async () => {
  if (config) return config;

  const response = await fetch(`/config.json?v=${Date.now()}`);
  config = await response.json();
  console.log("CONFIG LOADED", config);
  return config;
};

export const getConfig = () => {
  if (!config) {
    throw new Error("Config not loaded yet");
  }
  return config;
};
