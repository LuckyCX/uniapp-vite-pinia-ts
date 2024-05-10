const apiEnv: ApiEnv = process.env.NODE_ENV;
const envMap = {
    development: {
        baseUrl: '*',
        apiBaseUrl: 'https://reserve-dev.xunikaifabu.com:10071'
    },
    production: {
        baseUrl: '**',
        apiBaseUrl: 'https://reserve-dev.xunikaifabu.com:10071'
    },
};

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
    apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
    return Object.assign({ apiEnv }, envMap[apiEnv]);
}

const env = createEnv(apiEnv);
export default env;
