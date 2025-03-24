import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreDetails, getStoreRatings } from '../api';
import RatingForm from '../components/RatingForm';

function StoreDetails() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeResponse = await getStoreDetails(id);
        setStore(storeResponse.data);

        const ratingsResponse = await getStoreRatings(id);
        setRatings(ratingsResponse.data);
      } catch (error) {
        console.error('Failed to fetch store details', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto mt-10">
      {store ? (
        <>
          <h1 className="text-3xl font-bold mb-6">{store.name}</h1>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <p>{store.description}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
          <div className="mb-6">
            {ratings.length > 0 ? (
              ratings.map((rating) => (
                <div key={rating._id} className="bg-gray-100 p-4 rounded-lg mb-2">
                  <p>Rating: {rating.rating}/5</p>
                  {/* Add user info if available */}
                </div>
              ))
            ) : (
              <p>No ratings yet.</p>
            )}
          </div>

          <RatingForm storeId={id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StoreDetails;