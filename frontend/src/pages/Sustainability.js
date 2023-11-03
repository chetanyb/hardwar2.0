import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import LoadingAnimation from '../components/loadingAnimation';
import { AuthContext } from '../AuthProvider';

const Sustainability = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gpt/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="sustainability-page p-4">
        <h1 className="text-2xl font-bold mb-4">Sustainability Recommendations</h1>
        {loading && <LoadingAnimation />}
        {error && <div className="text-red-500">Error: {error.message}</div>}
        {data && (
          <div className="sustainability-content">
            <div className="suggestion p-4 mb-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Suggestion</h2>
              <p>{data.suggestion}</p>
            </div>
            <div className="sustainability-suggestion p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Sustainability Suggestion</h2>
              <p>{data.sustainabilitySuggestion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sustainability;
