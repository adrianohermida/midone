import React from "react";

const TransactionsWidget: React.FC = () => {
  const transactions = [
    {
      id: 1,
      name: "Sylvester Stallone",
      date: "17 January 2022",
      amount: -57,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Brad Pitt",
      date: "14 June 2022",
      amount: 368,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Bruce Willis",
      date: "17 August 2022",
      amount: 875,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Angelina Jolie",
      date: "18 July 2020",
      amount: -54,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612e1c3?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Edward Norton",
      date: "11 October 2020",
      amount: 548,
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=64&h=64&fit=crop&crop=face",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
        <button className="text-sm text-blue-500 hover:text-blue-600">
          View More
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <img
                src={transaction.avatar}
                alt={transaction.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">{transaction.name}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.amount >= 0 ? "+" : ""}$
                {Math.abs(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsWidget;
