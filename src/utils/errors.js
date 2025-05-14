const errorDictionary = {
    USER_ALREADY_EXISTS: {
        code: 1001,
        message: 'User already exists',
    },
    INVALID_CREDENTIALS: {
        code: 1002,
        message: 'Invalid credentials',
    },
    PET_NOT_FOUND: {
        code: 2001,
        message: 'Pet not found',
    },
    MISSING_REQUIRED_FIELDS: {
        code: 3001,
        message: 'Missing required fields',
    },
};

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (errorDictionary[error.message]) {
        const errorInfo = errorDictionary[error.message];
        return res.status(400).json({ error: errorInfo.message, code: errorInfo.code });
    }
    return res.status(500).json({ error: 'Internal server error' });
};

export { errorDictionary, errorHandler };
