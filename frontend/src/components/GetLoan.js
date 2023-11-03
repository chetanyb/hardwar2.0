import React, {useState} from 'react';
const {ethers} = require("ethers");

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "createCreditRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "creditRequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "borrower",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "fulfilled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalRequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "transferTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contractAddress = "0x90C725Da06b05FE638c962CC6D94Bdb8CEDf71a9"

const GetLoan = ({creditValue}) => {
  const [loading, setLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');

  const createRequest = async () => {
    if (creditValue === null || creditValue === undefined) {
      console.error('Credit value is not defined');
      return;
    }

    setLoading(true);
    setTransactionStatus('Creating credit request...');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
	  const roundedCreditValue = parseFloat(creditValue).toFixed(6);
      const tx = await contract.createCreditRequest(ethers.utils.parseUnits(roundedCreditValue, 6));
      await tx.wait();
      console.log("Transaction Mined!");
      setTransactionStatus('Transaction successful!');
    } catch (error) {
      console.error(error);
      setTransactionStatus('Transaction failed.');
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg items-center text-center h-full snap-center">
      <h2 className="text-lg font-bold mb-4">Ready to expand?</h2>
      <p className="mb-4">Get a loan to take your farm to the next level.</p>
      <button 
        onClick={createRequest} 
        className={`bg-green-500 text-white py-2 px-4 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Get Loan'}
      </button>
      {transactionStatus && <p className="mt-4 text-center">{transactionStatus}</p>}
    </div>
  );
};

export default GetLoan;
