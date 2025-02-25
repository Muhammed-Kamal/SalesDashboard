import React, { useState } from 'react';
import { BarChart3, Users, Target, Pencil, Trash2, DollarSign, UserCheck, Star, Award, Calendar, MapPin, TrendingDown, BrainCircuit, ChevronRight } from 'lucide-react';
import { AddAgentModal } from '../components/AddAgentModal';
import { PerformanceChart } from '../components/PerformanceChart';
import { CloseRatioGauge } from '../components/CloseRatioGauge';
import toast from 'react-hot-toast';

// Enhanced sample data for Egyptian sales agents
const sampleAgents = [
  {
    id: '1',
    name: 'Amira El-Sayed',
    monthlyTarget: 280000,
    customerTarget: 52,
    achievement: 280000,
    target: 280000,
    supervisor: 'Khaled Ibrahim',
    areaManager: 'Mohamed Ali',
    closeRatio: 92,
    performance: 'Exceptional',
    region: 'Cairo',
    cities: ['Maadi', 'Heliopolis', 'Nasr City'],
    pipeline: {
      qualified: 35,
      proposal: 15,
      negotiation: 8,
      closed: 12
    }
  },
  {
    id: '2',
    name: 'Karim Mahmoud',
    monthlyTarget: 195000,
    customerTarget: 38,
    achievement: 195000,
    target: 195000,
    supervisor: 'Ahmed Hassan',
    areaManager: 'Laila Farid',
    closeRatio: 78,
    performance: 'Good',
    region: 'Alexandria',
    cities: ['Miami', 'Montazah', 'Glim'],
    pipeline: {
      qualified: 42,
      proposal: 20,
      negotiation: 12,
      closed: 15
    }
  },
  {
    id: '3',
    name: 'Nour Hassan',
    monthlyTarget: 230000,
    customerTarget: 45,
    achievement: 230000,
    target: 230000,
    supervisor: 'Khaled Ibrahim',
    areaManager: 'Mohamed Ali',
    closeRatio: 85,
    performance: 'Very Good',
    region: 'Delta',
    cities: ['Mansoura', 'Tanta', 'Zagazig'],
    pipeline: {
      qualified: 38,
      proposal: 18,
      negotiation: 10,
      closed: 14
    }
  },
  {
    id: '4',
    name: 'Youssef Adel',
    monthlyTarget: 165000,
    customerTarget: 32,
    achievement: 165000,
    target: 165000,
    supervisor: 'Sarah Mostafa',
    areaManager: 'Omar Farouk',
    closeRatio: 71,
    performance: 'Satisfactory',
    region: 'Upper Egypt',
    cities: ['Assiut', 'Minya', 'Sohag'],
    pipeline: {
      qualified: 30,
      proposal: 12,
      negotiation: 6,
      closed: 8
    }
  },
  {
    id: '5',
    name: 'Laila Farid',
    monthlyTarget: 245000,
    customerTarget: 48,
    achievement: 245000,
    target: 245000,
    supervisor: 'Ahmed Hassan',
    areaManager: 'Mohamed Ali',
    closeRatio: 88,
    performance: 'Excellent',
    region: 'Canal',
    cities: ['Port Said', 'Ismailia', 'Suez'],
    pipeline: {
      qualified: 40,
      proposal: 22,
      negotiation: 15,
      closed: 18
    }
  }
];

const calculateTeamCloseRatio = (agents) => {
  if (agents.length === 0) return 0;
  return agents.reduce((sum, agent) => sum + agent.closeRatio, 0) / agents.length;
};

export function Targets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState(sampleAgents);
  const [editingAgent, setEditingAgent] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleAddAgent = (data) => {
    const newAgent = {
      id: Date.now().toString(),
      ...data,
      monthlyTarget: data.monthlyTargetLimit,
      customerTarget: data.monthlyTargetCustomers,
      achievement: 0,
      target: data.monthlyTargetLimit,
      closeRatio: data.closeRatio,
      pipeline: {
        qualified: 0,
        proposal: 0,
        negotiation: 0,
        closed: 0
      }
    };
    setAgents([...agents, newAgent]);
    toast.success('Sales agent added successfully');
  };

  const handleEditAgent = (agent) => {
    setEditingAgent(agent);
    setIsModalOpen(true);
  };

  const handleUpdateAgent = (data) => {
    const updatedAgents = agents.map((agent) =>
      agent.id === editingAgent.id
        ? {
            ...agent,
            ...data,
            monthlyTarget: data.monthlyTargetLimit,
            customerTarget: data.monthlyTargetCustomers,
            closeRatio: data.closeRatio,
          }
        : agent
    );
    setAgents(updatedAgents);
    setEditingAgent(null);
    toast.success('Sales agent updated successfully');
  };

  const handleDeleteAgent = (agentId) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      setAgents(agents.filter((agent) => agent.id !== agentId));
      toast.success('Sales agent deleted successfully');
    }
  };

  const totalTarget = agents.reduce((sum, agent) => sum + agent.monthlyTarget, 0);
  const totalAchievement = agents.reduce((sum, agent) => sum + agent.achievement, 0);
  const achievementRate = (totalAchievement / totalTarget) * 100;
  const teamCloseRatio = calculateTeamCloseRatio(agents);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sales Targets</h1>
        <button
          onClick={() => {
            setEditingAgent(null);
            setIsModalOpen(true);
          }}
          className="btn bg-[#35de75] hover:bg-[#2bc364] text-[#6d21c8] font-semibold inline-flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Add New Sales Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-500/20 rounded-lg">
              <Target className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Monthly Target</h3>
              <p className="text-gray-400">Current Progress</p>
            </div>
          </div>
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat('en-EG', {
              style: 'currency',
              currency: 'EGP',
              maximumFractionDigits: 0,
            }).format(totalTarget)}
          </div>
          <div className="mt-2 text-sm text-gray-400">
            <span className="text-green-500">↑ 12%</span> vs last month
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <Users className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Agents</h3>
              <p className="text-gray-400">Active Sales Team</p>
            </div>
          </div>
          <div className="text-3xl font-bold">{agents.length}</div>
          <div className="mt-2 text-sm text-gray-400">
            <span className="text-green-500">↑ 2</span> new this month
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-rose-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Achievement Rate</h3>
              <p className="text-gray-400">Team Performance</p>
            </div>
          </div>
          <div className="text-3xl font-bold">{achievementRate.toFixed(1)}%</div>
          <div className="mt-2 text-sm text-gray-400">
            <span className={achievementRate >= 100 ? "text-green-500" : "text-yellow-500"}>
              {achievementRate >= 100 ? "↑" : "↓"} {Math.abs(100 - achievementRate).toFixed(1)}%
            </span>{" "}
            vs target
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Close Ratio</h3>
              <p className="text-gray-400">Team Average</p>
            </div>
          </div>
          <div className="flex justify-center">
            <CloseRatioGauge value={teamCloseRatio} size={150} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <PerformanceChart data={agents} />
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Individual Close Ratios</h2>
          <div className="grid grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">{agent.name}</h3>
                <div className="flex flex-col items-center">
                  <CloseRatioGauge value={agent.closeRatio} size={120} />
                  <div className="mt-2 text-sm text-gray-400">{agent.performance}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Regional Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-gradient-to-br from-[#6d21c8] to-[#35de75] p-1 rounded-lg">
              <div className="bg-gray-900 p-6 rounded-lg h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#35de75] to-[#6d21c8] blur-lg opacity-40"></div>
                    <div className="relative p-3 bg-[#35de75]/20 rounded-lg">
                      <Star className="w-6 h-6 text-[#35de75]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{agent.name}</h3>
                    <p className="text-sm text-gray-400">{agent.region}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Close Ratio</span>
                    <span className="font-medium">{agent.closeRatio}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#35de75] rounded-full"
                      style={{ width: `${agent.closeRatio}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Coverage Areas</div>
                  <div className="flex flex-wrap gap-2">
                    {agent.cities.map((city) => (
                      <span
                        key={city}
                        className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Monthly Target</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-EG', {
                        style: 'currency',
                        currency: 'EGP',
                        maximumFractionDigits: 0,
                      }).format(agent.monthlyTarget)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">Customer Target</span>
                    <span className="font-medium">{agent.customerTarget}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Pipeline</h2>
        <div className="space-y-6">
          {agents.map((agent) => (
            <div key={agent.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{agent.name}</span>
                <span className="text-sm text-gray-400">Close Ratio: {agent.closeRatio}%</span>
              </div>
              <div className="flex gap-1 h-3">
                <div
                  className="bg-blue-500 rounded-l"
                  style={{ width: `${(agent.pipeline.qualified / 100) * 100}%` }}
                  title={`Qualified: ${agent.pipeline.qualified}`}
                />
                <div
                  className="bg-yellow-500"
                  style={{ width: `${(agent.pipeline.proposal / 100) * 100}%` }}
                  title={`Proposal: ${agent.pipeline.proposal}`}
                />
                <div
                  className="bg-orange-500"
                  style={{ width: `${(agent.pipeline.negotiation / 100) * 100}%` }}
                  title={`Negotiation: ${agent.pipeline.negotiation}`}
                />
                <div
                  className="bg-green-500 rounded-r"
                  style={{ width: `${(agent.pipeline.closed / 100) * 100}%` }}
                  title={`Closed: ${agent.pipeline.closed}`}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Qualified ({agent.pipeline.qualified})</span>
                <span>Proposal ({agent.pipeline.proposal})</span>
                <span>Negotiation ({agent.pipeline.negotiation})</span>
                <span>Closed ({agent.pipeline.closed})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Team Targets</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4">Agent Name</th>
                <th className="text-left py-3 px-4">Monthly Target</th>
                <th className="text-left py-3 px-4">Customer Target</th>
                <th className="text-left py-3 px-4">Close Ratio</th>
                <th className="text-left py-3 px-4">Supervisor</th>
                <th className="text-left py-3 px-4">Area Manager</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b border-gray-800">
                  <td className="py-3 px-4">{agent.name}</td>
                  <td className="py-3 px-4">
                    {new Intl.NumberFormat('en-EG', {
                      style: 'currency',
                      currency: 'EGP',
                      maximumFractionDigits: 0,
                    }).format(agent.monthlyTarget)}
                  </td>
                  <td className="py-3 px-4">{agent.customerTarget}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${agent.closeRatio}%` }}
                        />
                      </div>
                      <span>{agent.closeRatio}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{agent.supervisor}</td>
                  <td className="py-3 px-4">{agent.areaManager}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAgent(agent)}
                        className="text-[#35de75] hover:text-[#2bc364]"
                        title="Edit agent"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="text-red-500 hover:text-red-400"
                        title="Delete agent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddAgentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAgent(null);
        }}
        onSubmit={editingAgent ? handleUpdateAgent : handleAddAgent}
        initialData={editingAgent}
      />
    </div>
  );
}