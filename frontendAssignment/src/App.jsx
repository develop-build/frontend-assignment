import React, { useState, useEffect } from 'react'
import './App.css'
import Table from './components/Table.jsx';

const App = () => {
  const [projects, setProjects] = useState([]);    // for storing projects data fetched from JSON api
  const [loading, setLoading] = useState(true);   // for loading state
  const [error, setError] = useState(""); // for error state

  useEffect(() => {
    // fetching data and setting sortedData data to projects 
    fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Sorting a/c to amount pledged (requirement)
        const sortedData = data.sort((a, b) => {
          if (b["amt.pledged"] !== a["amt.pledged"]) {
            return b["amt.pledged"] - a["amt.pledged"];
          }
          return b["percentage.funded"] - a["percentage.funded"];
        });
        setProjects(sortedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [])


  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div>
      <header>Kickstarter Projects</header>
      <Table projects={projects} />
    </div>
  )
}

export default App
