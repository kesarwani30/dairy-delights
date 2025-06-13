export default function IntroSection()  {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-lg shadow-md">
        <img
          src="./dairies/dairy.jpg" 
          alt="Dairy Delights Logo"
          className="w-80 h-50 mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Dairy Delights</h1>
        <p className="text-lg text-gray-600 text-center mt-2">
          Experience the freshest and most delightful dairy products, crafted with love and quality.
        </p>
      </div>
    );
  };
  