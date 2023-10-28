const dummyUser = require("../models/UserSchema");

async function displayPage(req, res){
    try {
        res.status(200).json({
            message : "Hello World!",
        })
    }
    catch (error) {
        res.status(500).json({error : error.message})
    }
};

postDummyUser = async (req, res) => {
    const newDummyUser = new dummyUser(req.body);
    console.log(req.body);
    try {
        await newDummyUser.save(req.body).then(
            (createdTask) => {
                console.log(createdTask);
            }
        )
    }
    catch (error) {
        console.log(error);
    }
};

updateDummyUser = async (req, res) => {
    console.log(req.body.name);
    dummyUser.findOne({
        id: "1"
    }).then(
        async (docs) => {
            docs.name = req.body.name;
            await docs.save();
            console.log("updated");
        }
    ).catch((err) => {
        console.log(err);
    })
    // try {
    //     await existingDummyUser.save().then(
    //         (createdTask) => {
    //             console.log(createdTask);
    //         }
    //     )
    // }
    // catch (error) {
    //     console.log(error);
    // }

}

module.exports = {
    displayPage,
    postDummyUser,
    updateDummyUser
}