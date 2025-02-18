import 'dotenv/config';

export const getEnvVar = (envVarName, defaultValue) => {
  const value = process.env[envVarName];

  if (!value && defaultValue) {
    return defaultValue;
  }
  if (!value) {
    throw new Error(`Environment variable ${envVarName} is not defined`);
  }

  return value;
};
