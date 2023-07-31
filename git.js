const axios = require('axios');

async function getUsers(usernames) {
  const userPromises = usernames.map(async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data;
    } catch (error) {
      // Handle API request error appropriately, e.g., log and return a default value
      console.error(`Error fetching data for ${username}:`, error.message);
      return null;
    }
  });

  const users = await Promise.all(userPromises);
  return users.filter((user) => user !== null);
}

// Example usage:
const usernames = ['elie', 'joelburton', 'mmmaaatttttt'];
getUsers(usernames)
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });
