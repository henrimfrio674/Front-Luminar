import React, { useState } from "react";

interface DonationPopupProps {
  cartItems: { id: number; name: string; price: number }[];
  onClose: () => void;
  onDonate: (donationItem: number) => void;
  onFinalizeWithoutDonation: () => void;
}

function DonationPopup({ cartItems, onClose, onDonate, onFinalizeWithoutDonation }: DonationPopupProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleDonateClick = () => {
    if (selectedItem !== null) {
      onDonate(selectedItem); // Chama onDonate com o ID do item selecionado
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Deseja doar algum produto?</h2>

        <div className="flex flex-col gap-4">
          {cartItems.map(item => (
            <label key={item.id} className="flex items-center gap-2">
              <input
                type="radio"
                checked={selectedItem === item.id}
                onChange={() => setSelectedItem(item.id)}
              />
              {item.name}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onFinalizeWithoutDonation} className="bg-gray-300 px-4 py-2 rounded-lg">
            Finalizar compra sem doar
          </button>
          <button onClick={handleDonateClick} className="bg-yellow-500 px-4 py-2 rounded-lg">
            Doar item selecionado
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationPopup;
