import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, getAllStores, deleteStore } from '../api';
import StoreForm from '../components/StoreForm';

function Profile() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming user ID is stored in token or can be fetched from backend
        const userId = 'user-id-from-token'; // Replace with actual logic to get user ID
        const userResponse = await getUserDetails(userId);
        setUser(userResponse.data);

        const storeResponse = await getAllStores();
        // Filter stores owned by the user (assuming backend returns owner info)
        const userStores = storeResponse.data.filter(store => store.owner === userId);
        setStores(userStores);
      } catch (error) {
        console.error('Failed to fetch profile data', error);
        navigate('/login'); // Redirect to login if token is invalid
      }
    };
    fetchData();
  }, [navigate]);

  const handleDelete = async (storeId) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStore(storeId);
        setStores(stores.filter(store => store._id !== storeId));
      } catch (error) {
        console.error('Failed to delete store', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Profile</h1>
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold">User Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">My Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {stores.map((store) => (
              <div key={store._id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{store.name}</h3>
                <p>{store.description}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => setEditingStore(store)}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(store._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingStore ? (
            <StoreForm store={editingStore} />
          ) : (
            <StoreForm />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;