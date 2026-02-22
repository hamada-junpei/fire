import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { GameStatus } from '../GameStatus';

interface QuestBoardProps {
    assets: number;
    savingsRate: number;
    age: number;
    yearsToFire: number | null;
    fireNumber: number;
    income: number;
    expenses: number;
    investmentReturn: number;
    playerAchievements: any;
    playerStats: any;
}

export const QuestBoard: React.FC<QuestBoardProps> = (props) => {
    const [showAnalytics, setShowAnalytics] = useState(false);

    return (
        <div className="space-y-6 animate-slide-in-bottom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left: Game Status */}
                <div className="md:col-span-1">
                    <GameStatus
                        playerStats={props.playerStats}
                        playerAchievements={props.playerAchievements}
                    />
                </div>

                {/* Right: Analytics Dashboard Button */}
                <div className="md:col-span-2">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-8 text-center">
                            <BarChart2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                                詳細分析ダッシュボード
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                月次分析、将来予測、ベンチマーク比較、最適化提案を確認できます
                            </p>
                            <button
                                onClick={() => setShowAnalytics(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                📊 詳細分析を開く
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Analytics Dashboard Modal */}
            {showAnalytics && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowAnalytics(false)}>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl text-center">
                        <p className="text-slate-600 dark:text-slate-300">詳細分析機能は準備中です</p>
                        <button onClick={() => setShowAnalytics(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">閉じる</button>
                    </div>
                </div>
            )}
        </div>
    );
};
