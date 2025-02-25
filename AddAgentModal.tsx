import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    monthlyTargetLimit: number;
    monthlyTargetCustomers: number;
    supervisor: string;
    areaManager: string;
    closeRatio: number;
  }) => void;
  initialData?: any;
}

export function AddAgentModal({ isOpen, onClose, onSubmit, initialData }: AddAgentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    monthlyTargetLimit: 0,
    monthlyTargetCustomers: 0,
    supervisor: '',
    areaManager: '',
    closeRatio: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        monthlyTargetLimit: initialData.monthlyTarget,
        monthlyTargetCustomers: initialData.customerTarget,
        supervisor: initialData.supervisor,
        areaManager: initialData.areaManager,
        closeRatio: initialData.closeRatio || 0
      });
    } else {
      setFormData({
        name: '',
        monthlyTargetLimit: 0,
        monthlyTargetCustomers: 0,
        supervisor: '',
        areaManager: '',
        closeRatio: 0
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Sales Agent' : 'Add New Sales Agent'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Agent Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35de75]"
              required
            />
          </div>
          <div>
            <label htmlFor="monthlyTargetLimit" className="block text-sm font-medium mb-1">
              Monthly Target Limit (EGP)
            </label>
            <input
              type="number"
              id="monthlyTargetLimit"
              value={formData.monthlyTargetLimit}
              onChange={(e) => setFormData({ ...formData, monthlyTargetLimit: Number(e.target.value) })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35de75]"
              required
              min="0"
            />
          </div>
          <div>
            <label htmlFor="monthlyTargetCustomers" className="block text-sm font-medium mb-1">
              Monthly Target Customers
            </label>
            <input
              type="number"
              id="monthlyTargetCustomers"
              value={formData.monthlyTargetCustomers}
              onChange={(e) => setFormData({ ...formData, monthlyTargetCustomers: Number(e.target.value) })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35de75]"
              required
              min="0"
            />
          </div>
          <div>
            <label htmlFor="closeRatio" className="block text-sm font-medium mb-1">
              Close Ratio (%)
            </label>
            <input
              type="number"
              id="closeRatio"
              value={formData.closeRatio}
              onChange={(e) => setFormData({ ...formData, closeRatio: Number(e.target.value) })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35de75]"
              required
              min="0"
              max="100"
            />
          </div>
          <div>
            <label htmlFor="supervisor" className="block text-sm font-medium mb-1">
              Supervisor Name
            </label>
            <input
              type="text"
              id="supervisor"
              value={formData.supervisor}
              onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35de75]"
              required
            />
          </div>
          <div>
            <label htmlFor="areaManager" className="block text-sm font-medium mb-1">
              Area Manager Name
            </label>
            <input
              type="text"
              id="areaManager"
              value={formData.areaManager}
              onChange={(e) => setFormData({ ...formData, areaManager: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#35de75]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full btn bg-[#35de75] hover:bg-[#2bc364] text-[#6d21c8] font-semibold"
          >
            {initialData ? 'Update Agent' : 'Add Agent'}
          </button>
        </form>
      </div>
    </div>
  );
}