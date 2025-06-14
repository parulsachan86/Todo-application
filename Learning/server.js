const express = require("express");
const app = express();
const PORT = 8000;



// Middleware to parse JSON
app.use(express.json());

let users = [
  {
  name : "JOHN"
  }
]
 
/* The method informs the nature of request and routes are path which represent where the user should be directed to return the appropriate response and are called endpoints */


/**
 * Route: GET /
 * Description: Serve an HTML page displaying users
 */
app.get("/", (req, res) => {
  console.log("You hit the root endpoint");
  res.send(`
    <html>
      <body>
        <h1>Users:</h1>
        <pre>${JSON.stringify(users, null, 2)}</pre>
      </body>
    </html>
  `);
});


/* There are two type of  endpoints
Website endpoints - These are the endpoints that return HTML code and they are basically hit depending on the specific URL that user hits. 
API endpoints -  Non visuals reponse*/

app.get("/api/data", (req, res) => {
  console.log("Fetching all users");
  res.json(users);
});


/**
 * Route: POST /api/createUser
 * Description: Add a new user
 */
app.post("/api/createUser", (req, res) => {
  const newUser = req.body;

  if (!newUser.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  users.push({ name: newUser.name });
  console.log("User added:", newUser.name);
  res.status(201).json({ message: "User created", user: newUser });
});

/**
 * Route: DELETE /api/deleteUser
 * Description: Delete the last user in the list
 */
app.delete("/api/deleteUser", (req, res) => {
  if (users.length === 0) {
    return res.status(404).json({ error: "No users to delete" });
  }

  const deletedUser = users.pop();
  console.log("User deleted:", deletedUser.name);
  res.status(200).json({ message: "User deleted", deletedUser });
});


/* CRUD Operation => Create - POST, read - GET, update - PUT, delete - DELETE*/


app.listen(PORT, () => {console.log(`Server started at port :${PORT}`)});