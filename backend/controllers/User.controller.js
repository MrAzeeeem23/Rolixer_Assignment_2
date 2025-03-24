import User from "../models/User.js";

const generateTokens = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.refreshToken(); 

        user.refreshT = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while creating tokens");
    }
};

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const createUser = await User.create({
            name,
            email,
            password,
            role,
        });

        res.status(201).json(createUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Fill all input fields");
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const { accessToken, refreshToken } = await generateTokens(user.id);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        };

        res.status(200)
            .cookie("accesstoken", accessToken, cookieOptions)
            .cookie("refresh", refreshToken, cookieOptions)
            .json(user.toJSON());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const {currentPassword, updatePassword} = req.body;

        const user = await User.findByPk(req.id)

        const isPasswordValid = await user.isPasswordCorrect(currentPassword)

        if(!isPasswordValid){
            throw new Error("Invalid current-Password");
        }

        await User.update(
            { password: updatePassword},
            { where: {
                id: req.id
            }}
        )
        
        res.send({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating password."
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            throw new Error("User not found");
        }

        user.refreshT = null; 
        await user.save();

        res.status(200)
            .clearCookie("accesstoken")
            .clearCookie("refresh")
            .json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = req.user; // Assuming user is added to req in authentication middleware
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.update({ name, email, role });
        res.status(200).json({ message: "User updated", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFilteredUsers = async (req, res) => {
    try {
        const { name, email, role } = req.query;

        const filterConditions = {};
        if (name) filterConditions.name = name;
        if (email) filterConditions.email = email;
        if (role) filterConditions.role = role;

        const users = await User.findAll({ where: filterConditions });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    RegisterUser,
    loginUser,
    logoutUser,
    updatePassword,
    getAllUsers,
    getUserById,
    getUserDetails,
    updateUser,
    deleteUser,
    getFilteredUsers
};
