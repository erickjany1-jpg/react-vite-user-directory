import { useState, useEffect } from 'react';
import UserCard from './UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h1>Staff & User Directory</h1>
        <p>Fetched dynamically via JSONPlaceholder API using React and useEffect</p>
      </header>

      {/* 1. Loading State */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Loading user data, please wait...</h2>
        </div>
      )}

      {/* 2. Error State */}
      {error && (
        <div style={{ color: '#e53e3e', backgroundColor: '#fff5f5', padding: '16px', borderRadius: '6px' }}>
          <h3>An error occurred:</h3>
          <p>{error}</p>
        </div>
      )}

      {/* 3. Data Loaded: Render Grid */}
      {!isLoading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              website={user.website}
              company={user.company}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;