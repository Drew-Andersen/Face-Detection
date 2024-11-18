// route to get logged in user's info (needs the token)
export const getMe = async (token) => {
    try {
        const response = await fetch('/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Check if the response is okay (status 2xx)
        if (!response.ok) {
            // Handle error response
            const errorData = await response.text();  // Get raw text in case it's an HTML error page
            console.error('Error response from API:', errorData);  // Log the error data
            throw new Error('Failed to fetch user data');
        }

        // Parse and return the JSON if the response is okay
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;  // Re-throw the error to be handled in the calling function
    }
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

        // Check if the response is okay
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Signup failed, please try again.");
        }

        // If response is okay, return the parsed data
        return response.json();
    } catch (err) {
        // Log error and rethrow to be handled in the calling function
        console.log(err);
        throw err;
    }
};

export const loginUser = async (userData) => {
    try {
        // http://localhost:3001/api/users/login
        const response = await fetch('/api/users/login', {  // Correct the API URL
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
