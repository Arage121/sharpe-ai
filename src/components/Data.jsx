import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Table } from 'antd';

const Data = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userOnePostCount, setUserOnePostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      setData(jsonData);

      const userOnePosts = jsonData.filter((post) => post.userId === 1);
      setFilteredData(userOnePosts);
      setUserOnePostCount(userOnePosts.length);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPosts = data.length;
  const userOnePercentage = (userOnePostCount / totalPosts) * 100;

  const COLORS = ['#0088FE', '#FF8042'];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
  ];

  const pieChartData = [
    { name: 'User ID 1', value: userOnePostCount },
    { name: 'Others', value: totalPosts - userOnePostCount },
  ];

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12"></div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Data Page</h2>
          <div className="bg-white p-6 rounded shadow mb-6">
            <Table dataSource={filteredData} columns={columns} pagination={false} />
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="lg:flex items-center justify-center">
              <PieChart width={350} height={300} className="lg:mr-12">
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  cx="45%"
                  cy="50%"
                  outerRadius={105}
                  fill="#8884d8"
                  label
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="top" height={36}/>
                <Tooltip />
              </PieChart>
              <div className="text-center lg:text-left">
                <p className="text-lg">
                  Percentage of posts by User ID 1: {userOnePercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Data;
