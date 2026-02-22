import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { RECOMMENDED_BOOKS } from '../../config/monetization';

export const BooksTab: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50 mb-8">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                            FIRE達成のためのおすすめ書籍
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            知識は最高のリターンをもたらす投資です。FIREを目指す上で必ず読んでおきたい、評価の高い名著を厳選しました。
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECOMMENDED_BOOKS.map((book) => (
                    <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-0 flex h-full">
                            {/* Image Section */}
                            <div className="w-1/3 min-w-[120px] bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-center border-r border-slate-100 dark:border-slate-800">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="max-h-40 object-contain shadow-md rounded-sm group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="w-2/3 p-5 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                                        {book.category}
                                    </span>
                                </div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight line-clamp-2">
                                    {book.title}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
                                    {book.author}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-grow line-clamp-3">
                                    {book.description}
                                </p>

                                <a
                                    href={book.amazonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#ff9900] hover:bg-[#ff9900]/90 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                                >
                                    Amazonで見る
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <p className="text-xs text-slate-400 text-center mt-8">
                ※リンク先はAmazonアソシエイトプログラムを利用しています。
            </p>
        </div>
    );
};
