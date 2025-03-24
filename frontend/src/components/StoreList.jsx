import { Link } from 'react-router-dom';

function StoreList({ stores }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stores.map((store) => (
        <div key={store._id} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{store.name}</h2>
          <p>{store.description}</p>
          <Link to={`/store/${store._id}`} className="text-blue-600 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default StoreList;