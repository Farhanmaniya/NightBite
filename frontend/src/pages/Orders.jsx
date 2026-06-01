const Orders = () => {
  const getOrderTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const orders = [
    {
      id: 1001,
      date: "29 May 2026",
      status: "Preparing",
      items: [
        { name: "Chicken Burger", quantity: 2, price: 199 },
        { name: "Mango Lassi", quantity: 1, price: 79 },
      ],
    },
    {
      id: 1002,
      date: "28 May 2026",
      status: "Delivered",
      items: [{ name: "Crispy Fries", quantity: 1, price: 99 }],
    },
    {
      id: 1003,
      date: "27 May 2026",
      status: "Cancelled",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 299 },
        { name: "Chocolate Brownie", quantity: 2, price: 149 },
      ],
    },
  ];
  return (
    <div
      className="min-h-screen px-4 py-24"
      style={{
        backgroundColor: "#0F172A",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Page title */}
        <h1 className="text-[#F1F5F9] font-bold text-2xl mb-8">📦 My Orders</h1>

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] flex flex-col gap-4"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#F1F5F9] font-bold text-sm">
                    Order #{order.id}
                  </h3>
                  <p className="text-[#94A3B8] text-xs mt-1">{order.date}</p>
                </div>
                {/* Status Badge */}
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "Preparing"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
                {/* Items */}
                <div className="flex flex-col gap-2 border-t border-[#334155] pt-4">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span className="text-[#94A3B8]">{item.name} × {item.quantity}</span>
                            <span className="text-[#F1F5F9]">₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>
              {/* Total */}
              <div className="flex justify-between border-t border-[#334155] pt-3">
                <span className="text-[#94A3B8] text-sm">Total</span>
                <span className="text-[#FF6B35] font-bold">
                  ₹{getOrderTotal(order.items)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
