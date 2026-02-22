import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { formatCurrency } from '../../utils/calculations';
import type { SimulationData, MonteCarloResult, FireInputs } from '../../utils/calculations';

interface SimulationTabProps {
    inputs: FireInputs;
    fireNumber: number;
    data: SimulationData[];
    mcData: MonteCarloResult[];
    isMonteCarlo: boolean;
    setIsMonteCarlo: (val: boolean) => void;
    useNisa: boolean;
    sideFireShortcut: number | null;
    onDiagnosisSideFire: () => void;
    pastData: { age: number; assets: number }[];
    showPast: boolean;
    setShowPast: (val: boolean) => void;
}

export const SimulationTab: React.FC<SimulationTabProps> = (props) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-slate-200 shadow-xl rounded-xl">
                    <p className="font-bold text-slate-800">{label}歳</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {entry.name}: {formatCurrency(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">目標資産額</h4>
                    <p className="text-3xl font-black text-slate-800">{formatCurrency(props.fireNumber)}</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg text-white">
                    <h4 className="text-sm font-bold opacity-80 mb-1 uppercase tracking-wider">Side FIRE 短縮可能年数</h4>
                    <div className="flex items-end gap-2">
                        <p className="text-3xl font-black">{props.sideFireShortcut || '-'}</p>
                        <p className="text-sm font-bold mb-1">年</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <span>📈</span> 資産推移シミュレーション
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => props.setIsMonteCarlo(!props.isMonteCarlo)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${props.isMonteCarlo
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            モンテカルロ法
                        </button>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {props.isMonteCarlo ? (
                            <AreaChart data={props.mcData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="age" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 10000}万`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="percentile90"
                                    name="楽観的"
                                    stroke="#82ca9d"
                                    fill="#82ca9d"
                                    fillOpacity={0.1}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="percentile50"
                                    name="中央値"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="percentile10"
                                    name="悲観的"
                                    stroke="#ff7300"
                                    fill="#ff7300"
                                    fillOpacity={0.1}
                                />
                            </AreaChart>
                        ) : (
                            <LineChart data={props.data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="age" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 10000}万`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="assets"
                                    name="資産合計"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
