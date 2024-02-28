import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createFutsal } from '../services/futsalHelper'; // Update with your service imports

const FutsalCreation: React.FC = () => {
  const navigate = useNavigate();
  const [futsalData, setFutsalData] = useState({
    name: '',
    address: '',
    image: null as File | null, // Updated to accept File type
    qr: '',
    price: 0,
  });

  useEffect(() => {
    // Refresh logic goes here
    // For example, you might want to reset the form fields
    setFutsalData({
      name: '',
      address: '',
      image: null,
      qr: '',
      price: 0,
    });
  }, []); // Empty dependency array ensures this effect runs only once after mounting

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFutsalData({
      ...futsalData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFutsalData({
        ...futsalData,
        image: file,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createFutsal(futsalData)
      .then((resp) => {
        console.log(resp);
        console.log('Futsal created successfully');
        toast.success('Futsal created successfully');
      })
      .catch((error) => {
        console.log(error);
        console.log('Error creating futsal');
        toast.error('Error creating futsal');
      });

    navigate('/admin');
  };

  return (
    <div className="container dark:bg-gray-800 rounded-3xl dark:border-gray-700 mx-auto max-w-sm px-4 py-8 mt-20">
      <h2 className="text-2xl text-gray-500 font-semibold mb-4">Create Futsal</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-sm text-gray-500 font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={futsalData.name}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="address" className="text-sm text-gray-500 font-medium">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={futsalData.address}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="text-sm text-gray-500 font-medium">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="qr" className="text-sm text-gray-500 font-medium">Account Number:</label>
          <input
            type="text"
            id="qr"
            name="qr"
            value={futsalData.qr}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-sm text-gray-500 font-medium">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={futsalData.price}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className='justify-content-center'>
          <button type="submit" className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-700">
            Create Futsal
          </button>
        </div>
      </form>
    </div>
  );
};

export default FutsalCreation;
