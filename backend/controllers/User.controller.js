import User from "../models/User.js";

const generateTokens = async(userId) => {
    try {
        const user = await User.findOne({where: userId});
        const accessToken = user.generateAccessToken()
        const refreshTOken = user.refreshToken()

        user.refreshT = refreshTOken;
        await user.save()

        return {accessToken, refreshTOken}

    } catch (error) {
        throw new Error("Somthing went wrong while creating tokens")
    }
}

const RegisterUser = async(req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const createUser = await User.create({
            name,
            email,
            password,
            role
        })
        res.status(201).json(createUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            throw new Error("fill all input areas");
        }

        const user = await User.findOne({where: {email}})
        

        if(!user){
            throw new Error("User Not found")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid){
            throw new Error("Invalid Password")
        }

        const {accessToken, refreshTOken} = await generateTokens(user.id)

        const loggedInUser = await User.findOne({ where: user.id})

        const cookieOptions = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("accesstoken", accessToken, cookieOptions)
            .cookie("refresh", refreshTOken, cookieOptions)
            .json(
                loggedInUser.toJSON()
            )

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const logoutUser = async(req, res) => {
    try {
        const user = await User.findByPk(req.user.id)

        if(!user) {
            throw new Error("User not Found")
        }

        user.set({
            refreshT: 1
        })

        const options = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
        .cookie("accesstoken", options)
        .cookie("refresh", options)
        .json(
            {}
        )
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    RegisterUser,
    loginUser,
    logoutUser
}