import axios from 'axios';

export const findUserByEmail = async (email) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    // For demo purposes, we'll match based on username part of the email
    const username = email.split('@')[0].toLowerCase();
    const user = response.data.find(u => 
      u.email.toLowerCase().includes(username) || 
      u.username.toLowerCase().includes(username)
    );
    return user || response.data[0]; // Fallback to first user if no match found
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};
