const { response } = require("express");
const UserSchema = require("../models/UserSchema");

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

module.exports = {
    createUser,
    updateUser,
    deleteUser
}