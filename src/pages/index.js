import { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioGrid from '../components/PortfolioGrid';
import '../button.css';

const Home = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/work');
        setWorks(response.data);
      } catch (error) {
        console.error('Error fetching works:', error);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div>
      <h1>Digital Artist's Portfolio</h1>
      <PortfolioGrid works={works} />
    </div>
  );
};

export default Home;