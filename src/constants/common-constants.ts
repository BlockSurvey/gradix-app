const CommonConstants = {
    API_PREFIX: (process.env.NEXT_PUBLIC_PRODUCTION === 'true' ? process.env.NEXT_PUBLIC_API_PREFIX : 'http://localhost:8080'),
    AGENT_API_PREFIX: process.env.NEXT_PUBLIC_AGENT_API_PREFIX || 'http://127.0.0.1:8000',
    SEARCH_API_PREFIX: process.env.NEXT_PUBLIC_SEARCH_API_PREFIX || 'http://000000000:8000',
};

export default CommonConstants;
