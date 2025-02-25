import React, { useState } from 'react';
import { Trophy, TrendingUp, AlertTriangle, FileSpreadsheet, File as FilePdf, Mail, Star, Award, Target, Calendar, MapPin, TrendingDown, BrainCircuit, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import { format, subMonths } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Enhanced sample data with more details
const agentsData = [
  {
    id: 1,
    name: 'Amira El-Sayed',
    score: 92,
    performance: 'Exceptional',
    region: 'Cairo',
    cities: ['Maadi', 'Heliopolis', 'Nasr City'],
    monthlyAchievement: 280000,
    customerCount: 52,
    trend: 'up',
    forecast: {
      nextMonth: 310000,
      growth: 10.7,
      potential: 'High',
    },
    insights: [
      'Strong performance in premium segments',
      'Excellent customer retention rate',
      'High referral generation',
    ],
    advice: 'Focus on expanding your network in New Cairo area. Your success with premium customers suggests untapped potential in this region.',
  },
  {
    id: 2,
    name: 'Karim Mahmoud',
    score: 78,
    performance: 'Good',
    region: 'Alexandria',
    cities: ['Miami', 'Montazah', 'Glim'],
    monthlyAchievement: 195000,
    customerCount: 38,
    trend: 'up',
    forecast: {
      nextMonth: 220000,
      growth: 12.8,
      potential: 'Medium',
    },
    insights: [
      'Good performance in coastal areas',
      'Strong business relationships',
      'Room for improvement in follow-ups',
    ],
    advice: 'Consider implementing a structured follow-up system. Your relationship-building skills are excellent, but consistent follow-ups could increase conversion rates.',
  },
  {
    id: 3,
    name: 'Nour Hassan',
    score: 85,
    performance: 'Very Good',
    region: 'Delta',
    cities: ['Mansoura', 'Tanta', 'Zagazig'],
    monthlyAchievement: 230000,
    customerCount: 45,
    trend: 'up',
    forecast: {
      nextMonth: 255000,
      growth: 10.9,
      potential: 'High',
    },
    insights: [
      'Excellent market penetration',
      'Strong community presence',
      'Consistent performance',
    ],
    advice: 'Your community-based approach is working well. Consider hosting local business events to further strengthen your market presence.',
  },
  {
    id: 4,
    name: 'Youssef Adel',
    score: 71,
    performance: 'Satisfactory',
    region: 'Upper Egypt',
    cities: ['Assiut', 'Minya', 'Sohag'],
    monthlyAchievement: 165000,
    customerCount: 32,
    trend: 'down',
    forecast: {
      nextMonth: 185000,
      growth: 12.1,
      potential: 'Medium',
    },
    insights: [
      'Growing market presence',
      'Challenges in remote areas',
      'Improving customer engagement',
    ],
    advice: 'Your persistence in challenging markets is commendable. Focus on developing partnerships with local businesses to expand your reach.',
  },
  {
    id: 5,
    name: 'Laila Farid',
    score: 88,
    performance: 'Excellent',
    region: 'Canal',
    cities: ['Port Said', 'Ismailia', 'Suez'],
    monthlyAchievement: 245000,
    customerCount: 48,
    trend: 'up',
    forecast: {
      nextMonth: 270000,
      growth: 10.2,
      potential: 'High',
    },
    insights: [
      'Strong industrial sector performance',
      'Excellent negotiation skills',
      'High customer satisfaction',
    ],
    advice: 'Your success in the industrial sector is notable. Consider expanding your expertise to similar sectors in neighboring regions.',
  },
];

const COLORS = {
  Exceptional: '#35de75',
  Excellent: '#6d21c8',
  'Very Good': '#FF8042',
  Good: '#00C49F',
  Satisfactory: '#FFBB28',
};

const RADIAN = Math.PI / 180;

export function Achievements() {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [hoveredAgent, setHoveredAgent] = useState(null);

  // Generate last 12 months for the dropdown
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      value: format(date, 'yyyy-MM'),
      label: format(date, 'MMMM yyyy')
    };
  });

  const pieData = agentsData.map(agent => ({
    name: agent.name,
    value: agent.score,
    performance: agent.performance,
    achievement: agent.monthlyAchievement,
    customers: agent.customerCount
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <div className="space-y-2">
            <p className="text-white font-semibold text-lg">{data.name}</p>
            <div className="space-y-1">
              <p className="text-[#35de75] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[data.performance] }}></span>
                {data.performance}
              </p>
              <p className="text-gray-300">Score: {data.value}%</p>
              <p className="text-gray-300">Customers: {data.customers}</p>
              <p className="text-gray-300">
                Achievement: {new Intl.NumberFormat('en-EG', {
                  style: 'currency',
                  currency: 'EGP',
                  maximumFractionDigits: 0,
                }).format(data.achievement)}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const agent = agentsData.find(a => a.name === name);
    const isHovered = hoveredAgent === name;

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          className={`text-sm font-medium ${isHovered ? 'font-bold' : ''}`}
          onMouseEnter={() => setHoveredAgent(name)}
          onMouseLeave={() => setHoveredAgent(null)}
        >
          {name} ({value}%)
        </text>
        {isHovered && (
          <text
            x={x}
            y={y + 20}
            fill={COLORS[agent?.performance || 'Good']}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            className="text-xs"
          >
            {agent?.performance}
          </text>
        )}
      </g>
    );
  };

  const generateExcelReport = () => {
    const data = [
      ['Agent Name', 'Customers', 'Achievement', 'Target %', 'Status'],
      ['Ahmed Hassan', 45, '220,000 EGP', '88%', 'On Track'],
      ['Mariam Samir', 48, '240,000 EGP', '120%', 'Exceeding'],
      ['Omar Farouk', 35, '150,000 EGP', '83%', 'Below Target'],
      ['Nour El-Din', 42, '180,000 EGP', '82%', 'Below Target'],
      ['Yasmine Mahmoud', 44, '195,000 EGP', '103%', 'On Track'],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Achievements');
    XLSX.writeFile(wb, 'sales_achievements.xlsx');
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Sales Achievements Report', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    const headers = ['Agent', 'Customers', 'Achievement', 'Target %'];
    let y = 50;
    
    doc.setFontSize(14);
    headers.forEach((header, i) => {
      doc.text(header, 20 + (i * 45), y);
    });
    
    const data = [
      ['Ahmed Hassan', '45', '220,000', '88%'],
      ['Mariam Samir', '48', '240,000', '120%'],
      ['Omar Farouk', '35', '150,000', '83%'],
      ['Nour El-Din', '42', '180,000', '82%'],
      ['Yasmine Mahmoud', '44', '195,000', '103%'],
    ];
    
    doc.setFontSize(12);
    data.forEach((row, rowIndex) => {
      y = 60 + (rowIndex * 10);
      row.forEach((cell, cellIndex) => {
        doc.text(cell, 20 + (cellIndex * 45), y);
      });
    });
    
    doc.save('sales_achievements.pdf');
  };

  const handleEmailReport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Report sent to ${emailAddress}`);
    setShowEmailModal(false);
    setEmailAddress('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sales Achievements</h1>
        <div className="flex gap-2 relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="btn bg-[#35de75] hover:bg-[#2bc364] text-[#6d21c8] font-semibold inline-flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={() => setShowEmailModal(true)}
            className="btn bg-[#35de75] hover:bg-[#2bc364] text-[#6d21c8] font-semibold inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email Report
          </button>
          
          {showExportMenu && (
            <div className="absolute right-0 top-12 bg-gray-800 rounded-lg shadow-lg p-2 z-10">
              <button
                onClick={() => {
                  generateExcelReport();
                  setShowExportMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded w-full"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel Format
              </button>
              <button
                onClick={() => {
                  generatePDFReport();
                  setShowExportMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded w-full"
              >
                <FilePdf className="w-4 h-4" />
                PDF Format
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#6d21c8] to-[#35de75] p-1 rounded-lg">
          <div className="bg-gray-900 p-6 rounded-lg h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 blur-lg opacity-40"></div>
                  <div className="relative p-3 bg-yellow-500/20 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Top Achiever</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <select
                      value={format(selectedMonth, 'yyyy-MM')}
                      onChange={(e) => setSelectedMonth(new Date(e.target.value))}
                      className="bg-gray-800 text-sm text-gray-400 border border-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {last12Months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">Ahmed Hassan</div>
                <div className="text-sm text-gray-400">
                  142% of monthly target
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">Outstanding Performance</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Monthly Progress</span>
                <span className="text-yellow-500 font-semibold">142%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  style={{ width: '142%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Team Performance Distribution</h3>
            <div className="flex items-center gap-4">
              {Object.entries(COLORS).map(([performance, color]) => (
                <div key={performance} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-400">{performance}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={CustomLabel}
                  labelLine={true}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.performance]}
                      stroke={hoveredAgent === entry.name ? '#fff' : 'transparent'}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Geographical Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-500/20 rounded-lg">
              <MapPin className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold">Regional Activity</h3>
          </div>
          <div className="space-y-4">
            {agentsData.map(agent => (
              <div key={agent.id} className="border-b border-gray-700 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{agent.region}</span>
                  <span className="text-sm text-gray-400">{agent.cities.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#35de75]"
                      style={{ width: `${agent.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{agent.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecasting and Predictive Analytics */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold">Performance Forecast</h3>
          </div>
          <div className="space-y-4">
            {agentsData.map(agent => (
              <div key={agent.id} className="border-b border-gray-700 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{agent.name}</span>
                  <div className="flex items-center gap-2">
                    {agent.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-[#35de75]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      agent.trend === 'up' ? 'text-[#35de75]' : 'text-red-500'
                    }`}>
                      {agent.forecast.growth}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Next Month Forecast: {new Intl.NumberFormat('en-EG', {
                    style: 'currency',
                    currency: 'EGP',
                    maximumFractionDigits: 0,
                  }).format(agent.forecast.nextMonth)}
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    agent.forecast.potential === 'High'
                      ? 'bg-[#35de75]/20 text-[#35de75]'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {agent.forecast.potential} Potential
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agentsData.map(agent => (
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
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Performance Insights</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {agent.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1">
                          <div className="w-2 h-2 bg-[#35de75] rounded-full"></div>
                        </div>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-[#6d21c8]/20 rounded-lg">
                  <h4 className="font-medium mb-2 text-[#35de75]">Growth Advice</h4>
                  <p className="text-sm text-gray-300">{agent.advice}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Send Report via Email</h2>
            <form onSubmit={handleEmailReport}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 btn bg-primary-600 hover:bg-primary-700"
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 btn bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}