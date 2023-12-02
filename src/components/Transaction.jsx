import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setAlertMessage('');

    if (!walletAddress.trim()) {
      showAlert('Wallet address field cannot be empty!');
      return;
    }

    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{10}$/;
    if (!ethereumAddressRegex.test(walletAddress)) {
      showAlert('Invalid Ethereum address format!');
      return;
    }

    if (!amount.trim()) {
      showAlert('Amount field cannot be empty!');
      return;
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) {
      showAlert('Amount must be a number!');
      return;
    }

    if (parsedAmount < 0 || parsedAmount > 10000) {
      showAlert('Amount must be between 0 and 10,000!');
      return;
    }
    
    postData( walletAddress, amount );
    
    navigate('/data');

  };

  const showAlert = (message) => {
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage('');
    }, 2000);
  };

  const postData = async ( walletAddress, amount ) => {
    try {
      const tempData = {
        wAddress: walletAddress,
        wAmount: amount
      }
      const response = await fetch(
        'https://sharpe-assignment-dde2a-default-rtdb.firebaseio.com/sharpeform.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      console.log('Data posted successfully');
    } catch (error) {
      console.error('Error posting data:', error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center mt-4">
        Transaction Page
      </h2>
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        {alertMessage && (
          <div className="bg-red-200 p-2 rounded mb-4">
            <p className="text-red-800">{alertMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold text-center uppercase tracking-wider mb-8">
            Form
          </h3>
          <label className="block">
            Wallet Address:
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="border p-2 w-full"
            />
            <p className="text-gray-500 text-sm mt-1">
              Format: 0x followed by 10 hexadecimal characters (e.g.,
              0x1234567890)
            </p>
          </label>
          <label className="block">
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;