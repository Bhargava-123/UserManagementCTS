require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserSchema = require("../models/UserSchema");
let refreshTokens = []

createUser = async (req, res) => {
    const newUser = new UserSchema(req.body);
    await newUser.save().then(
        () => {
            res.status(201).json({
                message : "New User Created Successfully",
            })
        }
    )
        .catch(
            (err) => {
                res.status(500).json({
                    message: err.message,   
                })
        }
    );
}

updateUser = async (req, res) => {
    try {
        // console.log(req.body);
        var userId = req.body.userId;
        const filter = { userId: userId };
        const update = req.body;
        //updation works even for wrong userID need to check, and some error handlings
        await UserSchema.exists(filter).then((doc) => {
            UserSchema.updateOne(filter, update).then(
                () => {
                    res.status(200).json({
                        message : "Updated User successfully"
                    })
                }
            )
                .catch(
                (err) => {
                    res.status(500).json({
                        message : err.message,
                    })
                }
            );
        });

    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

//delets user even if it is not present, requires error handling
deleteUser = async (req, res) => {
    userId = req.body.userId;
    filter = { userId: userId };
    await UserSchema.deleteOne(filter).then(
        () => {
            res.status(200).json({
                message : "deletion Successful",
            })
        }
    )
    .catch(
            (error) => {
                res.status(500).json({
                    message: error.message,
                })
        }
    )

}

readUser = async (req, res) => {
    await UserSchema.find().then(
        (doc) => {
            res.status(200).json(doc);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: error.message,
            })
        }
    );
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

var getAccessToken = async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
}


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

const validiateLoginCredentials = async (userId, password) => {
    const user_credentials = await UserSchema.find({
        userId: userId,
        password: password
    }).then(
        (doc) => {
            if (doc.length == 0) {
                return {
                    isExists: 0
                }
            }
            else {
                return {
                    isExists: 1,
                    doc : doc,
                };
            }
        }
    ).catch(
        (error) => {
            return {
                message: error.message
            }
        }
    )
    return user_credentials;
}

var loginUser = async (req, res) => {
    // Authenticate User
    const userId = req.body.userId
    const password = req.body.password
    var user_credentials;

    //Validate Login and Password
    validiateLoginCredentials(userId, password).then(
        (value) => {
            if (value.isExists == 1) {
                console.log("User Found");
            }
            else {
                console.log("User Not Found");
            };
        }
    );
    

    res.send("done");
    // await UserSchema.find({
    //     userId: userId,
    //     password: password
    // }).then(
    //     (doc) => {
    //         if (doc.length == 0) {
    //             res.status(500).json({
    //                 message : "User not Found"
    //             })
    //         }
    //         else {
    //             res.status(200).json(doc);
    //         }
    //     }
    // ).catch(
    //     (error) => {
    //         res.status(500).json({
    //             message : error.message
    //         })
    //     }
    // )


    
    const user = {
        username: userId
    }

    // const accessToken = generateAccessToken(user)
    // console.log(accessToken);
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // refreshTokens.push(refreshToken)
    // res.json({ accessToken: accessToken, refreshToken: refreshToken })
}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    readUser,
    getAccessToken,
    loginUser
}