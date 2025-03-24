import { useEffect, useState } from 'react';
import { getAllStores } from '../api';
import StoreList from '../components/StoreList';

function Home() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await getAllStores();
        setStores(data);
      } catch (error) {
        console.error('Failed to fetch stores', error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">All Stores</h1>
      <StoreList stores={stores} />
    </div>
  );
}

export default Home;