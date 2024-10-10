import React from "react";

interface DonationConfirmationPopupProps {
  donationItem: { id: number; name: string; price: number };
  onConfirm: () => void;
  onReturn: () => void;
}

function DonationConfirmationPopup({ donationItem, onConfirm, onReturn }: DonationConfirmationPopupProps) {
  const newTotal = donationItem.price + 320; // Exemplo do valor atual + doação

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Confirmar Doação</h2>
        <p>Você escolheu doar: {donationItem.name}</p>
        <p>O novo total é: R$ {newTotal},00</p>

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onReturn} className="bg-gray-300 px-4 py-2 rounded-lg">
            Retornar
          </button>
          <button onClick={onConfirm} className="bg-yellow-500 px-4 py-2 rounded-lg">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationConfirmationPopup;
