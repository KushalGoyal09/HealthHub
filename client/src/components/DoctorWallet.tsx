import React from "react";
import 'tailwindcss/tailwind.css';

interface Order {
    updatedAt: Date;
    amount: number;
}

interface DoctorWalletProps {
    data: {
        orders: Order[];
        wallet: number;
    };
}

const DoctorWallet: React.FC<DoctorWalletProps> = ({ data }) => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Doctor Wallet</h1>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Balance</h2>
                <div className="text-4xl font-semibold text-green-600">${data.wallet.toFixed(2)}</div>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.orders.map((order, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.updatedAt.toDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DoctorWallet;
