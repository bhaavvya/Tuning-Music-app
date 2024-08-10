import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Features from '../components/Features';
import Footer from '../components/Footer';
import MusicCard from '../components/SongList';
import Navbar from '../components/Navbar';
import SongList from '../components/SongList';

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <Navbar />
        <Carousel />
        {loading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '5%' }}>
            <div className="spinner" style={{ 
              border: '16px solid #f3f3f3', 
              borderRadius: '50%', 
              borderTop: '16px solid #3498db', 
              width: '120px', 
              height: '120px', 
              animation: 'spin 2s linear infinite'
            }}></div>
          </div>
        ) : (
          <div className="music-container" style={{ 
            margin: '5%', display: 'flex', flexWrap: 'wrap' 
          }}>
            <SongList />
          </div>
        )}
        <Footer />
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Homepage;
