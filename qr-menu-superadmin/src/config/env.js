const REQUIRED_ENV_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_IMGBB_API_KEY',
];

export const validateEnv = () => {
    const missingVars = REQUIRED_ENV_VARS.filter(
        (key) => !import.meta.env[key] || import.meta.env[key].trim() === ''
    );

    if (missingVars.length > 0) {
        const errorMessage =
            `[ENV ERROR] Aşağıdaki zorunlu çevre değişkenleri eksik:\n- ` +
            missingVars.join('\n- ');

        console.error(errorMessage);
        throw new Error(errorMessage);
    }
};
