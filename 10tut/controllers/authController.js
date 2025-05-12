const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.sendStatus(400).json({'message':'Username and password are required.'}); //Missing Username or Password
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        //create JWTs
        res.status(200).json({'success':`User ${user} is logged in!`});
    }else{
        res.sendStatus(401); //Unauthorized
    }
}
module.exports= {handleLogin};
