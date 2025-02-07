import { useState } from "react";
import { Card } from "@/components/ui/card"; // Assuming you have a UI Card component

// Define the Product and Service interfaces
interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

const InventoryPage = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      name: "Cleaning",
      description: "Tools and products for cleaning your home or office.",
      products: [
        {
          id: "1",
          name: "Vacuum Cleaner",
          imageUrl:
            "https://images.unsplash.com/photo-1598756851264-c29d0b4d9d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Powerful vacuum cleaner for deep cleaning.",
          price: "₹3500",
        },
        {
          id: "2",
          name: "Mop Set",
          imageUrl:
            "https://images.unsplash.com/photo-1576502208932-8e3e92b23a3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Perfect mop set for floor cleaning.",
          price: "₹800",
        },
        {
          id: "3",
          name: "Dusting Cloths",
          imageUrl:
            "https://images.unsplash.com/photo-1557692250-e6278a91c7d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Durable dusting cloths for various surfaces.",
          price: "₹200",
        },
        {
          id: "4",
          name: "Cleaning Sprays",
          imageUrl:
            "https://images.unsplash.com/photo-1578932684962-2f2a3a91b6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Multipurpose cleaning spray for tough stains.",
          price: "₹350",
        },
      ],
    },
    {
      id: "2",
      name: "Plumbing",
      description: "Plumbing tools and equipment for home repairs.",
      products: [
        {
          id: "5",
          name: "Pipe Wrench",
          imageUrl:
            "https://images.unsplash.com/photo-1604013743516-3efedeea3651?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Durable pipe wrench for fixing leaks.",
          price: "₹1200",
        },
        {
          id: "6",
          name: "Plumber’s Tape",
          imageUrl:
            "https://images.unsplash.com/photo-1558492971-88d8a46b7ac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Sealing tape for plumbing joints.",
          price: "₹150",
        },
        {
          id: "7",
          name: "Plumbing Gloves",
          imageUrl:
            "https://images.unsplash.com/photo-1588204511079-4b1008fa31b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Heavy-duty gloves for plumbing work.",
          price: "₹300",
        },
        {
          id: "8",
          name: "Pipe Cutter",
          imageUrl:
            "https://images.unsplash.com/photo-1583976502122-d59b8d1be7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Precision pipe cutter for easy pipe cutting.",
          price: "₹850",
        },
      ],
    },
    {
      id: "3",
      name: "Painting",
      description: "Painting tools and products for your home improvement.",
      products: [
        {
          id: "9",
          name: "Paint Roller",
          imageUrl:
            "https://images.unsplash.com/photo-1591623641304-d4d58fe3409e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Smooth paint roller for easy application.",
          price: "₹500",
        },
        {
          id: "10",
          name: "Brush Set",
          imageUrl:
            "https://images.unsplash.com/photo-1583349422989-6d5be69a2267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Set of brushes for detailed painting work.",
          price: "₹350",
        },
        {
          id: "11",
          name: "Painter's Tape",
          imageUrl:
            "https://images.unsplash.com/photo-1561563249-3d38323224f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "High-quality painter’s tape for clean lines.",
          price: "₹200",
        },
        {
          id: "12",
          name: "Drop Cloths",
          imageUrl:
            "https://images.unsplash.com/photo-1600528258813-cbe6f282d312?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Protective cloths for flooring during painting.",
          price: "₹600",
        },
      ],
    },
    {
      id: "4",
      name: "Electrical",
      description: "Electrical tools and products for home repairs.",
      products: [
        {
          id: "13",
          name: "Wire Strippers",
          imageUrl:
            "https://images.unsplash.com/photo-1591577282153-018c15d87d56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Heavy-duty wire strippers for electrical work.",
          price: "₹1200",
        },
        {
          id: "14",
          name: "Voltage Tester",
          imageUrl:
            "https://images.unsplash.com/photo-1618454877125-52a2c582a5ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Digital voltage tester for safe measurements.",
          price: "₹800",
        },
        {
          id: "15",
          name: "Electrical Tape",
          imageUrl:
            "https://images.unsplash.com/photo-1567485360-d97e5d826e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Insulated electrical tape for wiring repairs.",
          price: "₹150",
        },
        {
          id: "16",
          name: "Extension Cords",
          imageUrl:
            "https://images.unsplash.com/photo-1581944241554-551a4f05b99a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Heavy-duty extension cords for safe usage.",
          price: "₹500",
        },
      ],
    },
    {
      id: "5",
      name: "Gardening",
      description: "Tools and products for maintaining your garden.",
      products: [
        {
          id: "17",
          name: "Garden Shovel",
          imageUrl:
            "https://images.unsplash.com/photo-1579074849225-f6e9fbd9fdf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Durable shovel for all gardening needs.",
          price: "₹800",
        },
        {
          id: "18",
          name: "Watering Can",
          imageUrl:
            "https://images.unsplash.com/photo-1618935910721-e86d20814980?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Efficient watering can for your plants.",
          price: "₹350",
        },
        {
          id: "19",
          name: "Pruning Shears",
          imageUrl:
            "https://images.unsplash.com/photo-1608224658481-cfd0b3a8b2db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "High-quality pruning shears for plants.",
          price: "₹600",
        },
        {
          id: "20",
          name: "Gardening Gloves",
          imageUrl:
            "https://images.unsplash.com/photo-1604083134152-6e03be06738d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
          description: "Comfortable gloves for gardening.",
          price: "₹200",
        },
      ],
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Service Connect Inventory
      </h1>

      {/* Service List */}
      <div className="space-y-6">
        {services.map((service) => (
          <Card key={service.id} className="p-4 shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold">{service.name}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>

            {/* Products List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.products.map((product) => (
                <Card key={product.id} className="p-4 shadow-lg rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {product.description}
                    </p>
                    <p className="text-xl font-bold mt-2">{product.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
