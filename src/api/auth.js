
import axios from 'axios';

// Login endpoint pakai axios
async function login(email, password) {
    email = email.toLowerCase();
    const response = await axios.post('https://bug-free-space-waddle-x7j6rqw5jr43p774-8002.app.github.dev/api/auth/login', {
        email,
        password
    });

    if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('exp', data.expires_in);
        // You can store other user data in localStorage as well
        // localStorage.setItem('user', JSON.stringify(data.user));
        console.log(localStorage);
        return data;
    }else{
        console.log(response);
        throw new Error('Login failed');
    }
}

// Register endpoint, name, email, password
async function register(name, email, password) {
    email = email.toLowerCase();
    const response = await axios.post('https://bug-free-space-waddle-x7j6rqw5jr43p774-8002.app.github.dev/api/auth/register', {
        name : name,
        email : email,
        password : password
    });

    if (response.status === 201) {
        const data = response.data;
        console.log(data);

        return data;
    }else{
        console.log(response);
        console(response.status);
        throw new Error(response.data.message);
    }
}

// Logout endpoint, menuju ke /auth/logout
async function logout() {
    const response = await axios.post('https://bug-free-space-waddle-x7j6rqw5jr43p774-8002.app.github.dev/api/auth/logout', {
        token : localStorage.getItem('token')
    });

    if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('exp');
        console.log(localStorage);
        return response.data;
    }else{
        console.log(response);
        throw new Error('Logout failed');
    }
}

export { login, register, logout };