// route to get logged in user's info (needs the token)
// http://localhost:3001/api/users/me
export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },       
    });
};

export const createUser = async (userData) => {
    try {
        // http://localhost:3001/api/users
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Signup failed, please try again.");
        }

        return response.json();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const loginUser = async (userData) => {
    try {
        // http://localhost:3001/api/users/login
        const response = await fetch('/api/users/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response;
    } catch (err) {
        console.error('Login failed:', err);
        throw err;
    }
};
