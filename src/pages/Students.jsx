import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Students() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadStudents() {
      try {
        const res = await fetch(`${API_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          throw new Error('Your session is invalid or has expired. Please log in again.');
        }
        if (!res.ok) {
          throw new Error(`Failed to load students (status ${res.status}).`);
        }

        const data = await res.json();
        if (!cancelled) {
          setStudents(Array.isArray(data) ? data : data.students || []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load students.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadStudents();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page">
      <header className="navbar">
        <span>{user?.email ? `Signed in as ${user.email}` : 'Signed in'}</span>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <h1>Students</h1>

      {loading && <p>Loading students...</p>}
      {error && <p className="error" role="alert">{error}</p>}

      {!loading && !error && students.length === 0 && <p>No students found.</p>}

      {!loading && !error && students.length > 0 && (
        <ul className="student-list">
          {students.map((s) => (
            <li key={s._id || s.id || s.email}>
              <strong>{s.name}</strong>
              <span>{s.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}