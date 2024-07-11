function getEnvVariable(key: string) {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
}

const Secret = {
    DATABASE_URL: getEnvVariable("DATABASE_URL"),
    PORT: getEnvVariable("PORT"),
    JWT_SECRET: getEnvVariable("JWT_SECRET"),
    OPENAI_API_KEY: getEnvVariable("OPENAI_API_KEY"),
    KEY_ID: getEnvVariable("KEY_ID"),
    KEY_SECRET: getEnvVariable("KEY_SECRET"),
    MAIL_PASSWORD: getEnvVariable("MAIL_PASSWORD"),
    MAIL_ID: getEnvVariable("MAIL_ID"),
};

export default Secret;
