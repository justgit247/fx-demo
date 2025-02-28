import React, { useState } from 'react';
import { auth } from '../firebase'; // Import the Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a user document in Firestore if it doesn't exist
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                email: user.email,
                createdAt: new Date(),
                // Add any other user data you want to store
            }, { merge: true }); // Use merge to avoid overwriting existing data

            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <form onSubmit={handleLogin} className="bg-secondary p-6 rounded shadow-md text-text">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-border rounded w-full p-2 bg-secondary text-text"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-border rounded w-full p-2 bg-secondary text-text"
                        required
                    />
                </div>
                <button type="submit" className="bg-accent text-text rounded p-2 w-full hover:bg-green-600">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
