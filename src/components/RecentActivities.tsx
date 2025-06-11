import React from "react";

const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      user: "John Travolta",
      action: "Has joined the team",
      time: "07:00 PM",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    },
    {
      id: 2,
      user: "Vin Diesel",
      action: "Added 3 new photos",
      time: "07:00 PM",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=64&h=64&fit=crop&crop=face",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=32&h=32&fit=crop",
        "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=32&h=32&fit=crop",
        "https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=32&h=32&fit=crop",
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Activities
        </h3>
        <button className="text-sm text-blue-500 hover:text-blue-600">
          Show More
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex">
            <img
              src={activity.avatar}
              alt={activity.user}
              className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">
                      {activity.user}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {activity.action}
                    </span>
                  </p>
                  {activity.images && (
                    <div className="flex space-x-1 mt-2">
                      {activity.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="w-8 h-8 rounded object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {activity.time}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">12 November</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
