import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRating } from '../api';

function RatingForm({ storeId }) {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRating({ storeId, rating });
      navigate(`/store/${storeId}`);
    } catch (error) {
      console.error('Failed to add rating', error);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Rate This Store</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.5"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default RatingForm;