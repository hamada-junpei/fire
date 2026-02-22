export interface BenchmarkData {
    ageGroup: string;
    avgAssets: number; // Average assets
    medianAssets: number; // Median assets
    avgIncome: number; // Average annual income
    medianIncome: number; // Median annual income
    medianExpenses: number; // Estimated annual expenses (median)
    medianSavings: number; // Estimated annual savings (median)
}

// Data approximation based on typical JP Government Family Income/Expenditure Surveys
// Values are in YEN.
export const BENCHMARK_DATA: Record<string, BenchmarkData> = {
    '20s': {
        ageGroup: '20代',
        avgAssets: 2000000,
        medianAssets: 800000,
        avgIncome: 3500000,
        medianIncome: 3000000,
        medianExpenses: 2500000,
        medianSavings: 500000
    },
    '30s': {
        ageGroup: '30代',
        avgAssets: 6000000,
        medianAssets: 2500000,
        avgIncome: 4500000,
        medianIncome: 4000000,
        medianExpenses: 3500000,
        medianSavings: 500000 // Spending increases with family etc.
    },
    '40s': {
        ageGroup: '40代',
        avgAssets: 10000000,
        medianAssets: 5000000,
        avgIncome: 5500000,
        medianIncome: 5000000,
        medianExpenses: 4500000,
        medianSavings: 500000
    },
    '50s': {
        ageGroup: '50代',
        avgAssets: 15000000,
        medianAssets: 8000000,
        avgIncome: 6500000,
        medianIncome: 6000000,
        medianExpenses: 5000000,
        medianSavings: 1000000
    },
    '60s': {
        ageGroup: '60代',
        avgAssets: 20000000,
        medianAssets: 12000000,
        avgIncome: 4000000,
        medianIncome: 3500000,
        medianExpenses: 3500000,
        medianSavings: 0
    }
};

export const getBenchmark = (age: number): BenchmarkData | null => {
    if (age < 30) return BENCHMARK_DATA['20s'];
    if (age < 40) return BENCHMARK_DATA['30s'];
    if (age < 50) return BENCHMARK_DATA['40s'];
    if (age < 60) return BENCHMARK_DATA['50s'];
    return BENCHMARK_DATA['60s'];
};
