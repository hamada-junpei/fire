import React from 'react';
import { LearningTab } from './LearningTab';
import { CasesTab } from './CasesTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import type { FireCourse } from '../../types';
import { LatteFactor } from '../LatteFactor';
import { InflationMonster } from '../InflationMonster';

interface KnowledgeSectionProps {
    fireCourse: FireCourse | null;
    completedLearningIds: string[];
    onLearningComplete: (id: string) => void;
    investmentReturnRate: number;
}

export const KnowledgeSection: React.FC<KnowledgeSectionProps> = (props) => {
    return (
        <div className="space-y-6 animate-slide-in-bottom">
            <Tabs defaultValue="learning" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="learning">📝 基礎知識・学ぶ</TabsTrigger>
                    <TabsTrigger value="cases">👥 FIRE実践事例</TabsTrigger>
                </TabsList>

                <TabsContent value="learning" className="space-y-8">
                    <LearningTab
                        completedIds={props.completedLearningIds}
                        onComplete={props.onLearningComplete}
                    />

                    {/* Integrated Interactive Tools for Learning */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                        <div className="space-y-4">
                            <h3 className="font-bold flex items-center gap-2">
                                ☕ ラテファクター・シミュレーター
                            </h3>
                            <LatteFactor investmentReturnRate={props.investmentReturnRate} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-bold flex items-center gap-2">
                                👻 インフレ・モンスター
                            </h3>
                            <InflationMonster defaultInflationRate={2.0} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="cases">
                    <CasesTab fireCourse={props.fireCourse} />
                </TabsContent>
            </Tabs>
        </div>
    );
};
