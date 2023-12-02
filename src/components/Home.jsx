import React from 'react';
import img from '../extras/work.jpeg';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Home Page</h2>
      <div className="bg-white p-6 rounded shadow">
        <p className="text-md mb-4">
          Welcome to the React.js Web Application. This is the home page. You can navigate to other pages using the menu above.
        </p>
        <div className="relative overflow-hidden rounded">
          <img src={img} alt="not available" className="w-full h-96 object-cover object-center" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Explore the Possibilities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

