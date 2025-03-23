import Store from "../models/Store.js";

const createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const existingStore = await Store.findOne({ where: { email } });
    if (existingStore) {
      throw new Error("Store with this email already exists");
    }

    const store = await Store.create({ name, email, address });
    res.status(201).json({ message: "Store created successfully", store });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    await store.update({ name, email, address });
    res.status(200).json({ message: "Store updated successfully", store });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    await store.destroy();
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createStore, getAllStores, getStoreById, updateStore, deleteStoreById };
