// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};

// export const createUser = async (userData) => {
//     try {
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userData),
//         });

//         const data = await response.json();
//         if (!response.ok){
//             throw new Error("Signup failed, please try again.");
//         }
//         return data
//     } catch(err){
//         console.log(err);
//     }
// };

export const createUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:3001/api/users', {
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
        const response = await fetch('http://localhost:3001/api/users/login', {  // Correct the API URL
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