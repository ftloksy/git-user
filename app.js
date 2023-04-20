// Import required modules
import express from 'express';
import axios from 'axios';

// Create an instance of Express app
const app = express();

// Define routes

// Search for a user by username
app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const user = response.data;
    res.set('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user information' });
  }
});

// Retrieve user details by username
app.get('/api/users/:username/details', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repositories = response.data;
    const user = {
      username,
      repositories: repositories.map(repo => ({
        name: repo.name,
        last_commit_date: repo.updated_at,
        created_at: repo.created_at,
        description: repo.description
      }))
    };
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user details' });
  }
});

// Fetch repository details by username and repository name
app.get('/api/users/:username/repos/:repoName', async (req, res) => {
  try {
    const { username, repoName } = req.params;
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
    const repository = response.data;
    const commitResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits`);
    const commits = commitResponse.data.slice(0, 5).map(commit => ({
      description: commit.commit.message
    }));
    const repoDetails = {
      name: repository.name,
      last_commit_date: repository.updated_at,
      created_at: repository.created_at,
      description: repository.description,
      commits
    };
    res.status(200).json(repoDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve repository details' });
  }
});

// Start the Express app
const port = 3001; // or any other desired port number
//app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
//});

export default app.listen(3000);
