import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStore, updateStore } from '../api';

function StoreForm({ store = null }) {
  const [formData, setFormData] = useState({
    name: store?.name || '',
    description: store?.description || '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (store) {
        // Update existing store
        await updateStore({ ...formData, id: store._id });
      } else {
        // Create new store
        await createStore(formData);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Failed to save store', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">{store ? 'Update Store' : 'Create Store'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Store Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          rows="4"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {store ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default StoreForm;