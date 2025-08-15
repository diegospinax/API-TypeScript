import * as joi from 'joi';
import "dotenv/config";

export type Environments = {
    PORT: number;
}

type ValidationEnvironments = {
    error: joi.ValidationError | undefined;
    value: Environments;
}

const validateEnvironments = (vars: NodeJS.ProcessEnv): ValidationEnvironments => {
    const envScheme = joi.object({
        PORT: joi.number().required
    }).unknown(true);
    
    const {error, value} = envScheme.validate(vars);
    return {error, value};
}

const loadEnvironments = (): Environments => {
    const result = validateEnvironments(process.env);
    
    if (result.error) throw new Error("Error validating environments variables."); 

    const value = result.value;

    return {
        PORT: value.PORT
    }
}

const environments = loadEnvironments();

export default environments;


