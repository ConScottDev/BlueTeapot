// Import necessary hooks and Firebase utilities
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth'; // Import User type from firebase/auth
import { auth } from '../utils/firebase';

// Custom hook for authentication
const useAuth = () => {
  // State to store the current user
  const [user, setUser] = useState<User | null>(null);

  // Effect to subscribe to the auth state changes
  useEffect(() => {
    // Subscribe to auth state changes and update the user state
    const unsubscribe = auth.onAuthStateChanged(setUser);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user state
  return { user };
};

// Export the custom hook
export default useAuth;
