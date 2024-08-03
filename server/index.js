const express = require('express');
const cors = require('cors');
const StreamChat = require('stream-chat').StreamChat;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use((cors()));
app.use(express.json());


const serverClient = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET_KEY);

app.get('/test', (req, res) => {
    res.json({'status': 'online'})
})



app.post("/signup", async (req, res) => {
    try {
        const response = await serverClient.queryUsers({ name: { $autocomplete: req.body.username } });
        if(response.users.length > 0){
            res.json({'status': 'failed'});
            return;
        }
        
        const { firstName, lastName, username, address, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const token = serverClient.createToken(userId);

        const stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0
        };

        await serverClient.upsertUser({
            id: userId,
            name: username,
            firstName,
            lastName,
            address,
            hashedPassword,
            stats
        });

        res.json({ token, userId, firstName, lastName, username, address, hashedPassword, stats, 'status':'success' });

    } catch (error) {
        res.json(error);
    }
});

app.post("/login", async (req, res) => {
    try {
    
    const {username, password} = req.body;
    const {users} = await serverClient.queryUsers({name: username });
    if (users.length  === 0) return res.json({ message: 'User not found' });
    
    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

    if (passwordMatch) {
        res.json({
            token, 
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            username,
            address: users[0].address,
            stats: users[0].stats,
            userId: users[0].id,
            message: "success",
        })
    } else {
        res.json({message: "failed"})
    };
}catch(error) {
res.json(error);
}
})


app.listen(4000, () => {
    console.log(`App listening on port 4000`)
})