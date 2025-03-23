import Rating from "../models/Rating.js";
import Store from "../models/Store.js";
import User from "../models/User.js";

const submitRating = async (req, res) => {
    try {
        const { storeId, rating } = req.body;
        const userId = req.user.id; 

        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }

        const store = await Store.findByPk(storeId);
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const existingRating = await Rating.findOne({ where: { userId, storeId } });

        if (existingRating) {
            return res.status(400).json({ message: "You have already rated this store" });
        }

        const newRating = await Rating.create({ userId, storeId, rating });

        const ratings = await Rating.findAll({ where: { storeId } });
        const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

        store.rating = avgRating;
        await store.save();

        res.status(201).json({ message: "Rating submitted successfully", newRating });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const updateRating = async (req, res) => {
    try {
        const { rating } = req.body;
        const userId = req.user.id;
        const storeId = req.params.storeId;

        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }

        const existingRating = await Rating.findOne({ where: { userId, storeId } });
        if (!existingRating) {
            return res.status(404).json({ message: "No rating found for this store" });
        }

        existingRating.rating = rating;
        await existingRating.save();

        const ratings = await Rating.findAll({ where: { storeId } });
        const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

        const store = await Store.findByPk(storeId);
        store.rating = avgRating;
        await store.save();

        res.status(200).json({ message: "Rating updated successfully", existingRating });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getStoreRatings = async (req, res) => {
    try {
        const storeId = req.params.storeId;

        const ratings = await Rating.findAll({
            where: { storeId },
            include: [{ model: User, attributes: ["name", "email"] }]
        });

        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserRating = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const userId = req.user.id;

        const rating = await Rating.findOne({ where: { userId, storeId } });

        if (!rating) {
            return res.status(404).json({ message: "No rating found for this store" });
        }

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRating = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const userId = req.user.id;

        const rating = await Rating.findOne({ where: { userId, storeId } });

        if (!rating) {
            return res.status(404).json({ message: "No rating found for this store" });
        }

        await rating.destroy();

        const remainingRatings = await Rating.findAll({ where: { storeId } });
        const avgRating = remainingRatings.length
            ? remainingRatings.reduce((sum, r) => sum + r.rating, 0) / remainingRatings.length
            : 0;

        const store = await Store.findByPk(storeId);
        store.rating = avgRating;
        await store.save();

        res.status(200).json({ message: "Rating deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    submitRating,
    updateRating,
    getStoreRatings,
    getUserRating,
    deleteRating
};
