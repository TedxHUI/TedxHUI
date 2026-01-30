import React from "react";
import { Minus, Plus } from "lucide-react";

export const BillingForm = ({
  selectedTicket,
  quantity,
  setQuantity,
  formData,
  setFormData,
}: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-16">
      <div className="bg-[#1A1A1A] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
          <div>
            <h4 className="text-[#EA1D2C] text-sm font-black uppercase mb-2">
              {selectedTicket.name}
            </h4>
            <div className="text-6xl font-black">
              ₦{selectedTicket.price.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
              Quantity
            </span>
            <div className="flex items-center gap-8">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <Minus size={20} />
              </button>
              <span className="text-3xl font-black">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-14 h-14 rounded-2xl bg-[#EA1D2C] flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <FormInput
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, type = "text" }: any) => (
  <div className="space-y-4">
    <label className="text-sm font-black uppercase tracking-widest text-gray-800 ml-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-16 px-8 bg-[#F8F8F8] border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#EA1D2C]/20 outline-none font-bold transition-all"
    />
  </div>
);
