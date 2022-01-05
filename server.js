import express from 'express';
import dotenv from "dotenv";
import {OAuth2Client} from "google-auth-library"

dotenv.config();

const app = express();

app.use(express.json())

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_API_KEY);

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    res.status(201);
    res.json({ name, email, picture });
  });

app.listen(process.env.PORT || 5000 ,()=>{
    console.log("server listing to port")
});