import * as joi from "joi";
import "dotenv/config";

type Environments = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_SCHEMA: string;
};

type ValidationEnvironments = {
  error: joi.ValidationError | undefined;
  value: Environments;
};

const validateEnvironments = (
  vars: NodeJS.ProcessEnv
): ValidationEnvironments => {
  const envScheme = joi
    .object({
      PORT: joi.number().required(),
      DB_HOST: joi.string().required(),
      DB_PORT: joi.number().default(3306),
      DB_USER: joi.string().required(),
      DB_NAME: joi.string().required(),
      DB_PASSWORD: joi.string().allow("").optional(),
      DB_SCHEMA: joi.string().required(),
    })
    .unknown(true);

  const { error, value } = envScheme.validate(vars);
  return { error, value };
};

const loadEnvironments = (): Environments => {
  const result = validateEnvironments(process.env);

  if (result.error) throw new Error("Error validating environment variables.");

  const value = result.value;

  return {
    PORT: value.PORT,
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_NAME: value.DB_NAME,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_SCHEMA: value.DB_SCHEMA
  };
};

const environments = loadEnvironments();

export default environments;
