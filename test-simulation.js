// Test script to verify simulation behavior
// Test case: Current age = Retirement age (immediate retirement)

import { simulateAssetGrowth, type FireInputs } from '../src/utils/calculations';

const testCase1: FireInputs = {
    currentAge: 50,
    retirementAge: 50,  // Same as current age
    currentAssets: 50000000, // 5000万円
    annualIncome: 0,  // Already retired, no income
    annualExpenses: 2500000, // 250万円
    investmentReturnRate: 0, // 0% to test pure withdrawal
    inflationRate: 0,
    withdrawalRate: 4,
    pensionStartAge: 65,
    monthlyPension: 0,
    postRetirementIncome: 0
};

console.log('=== Test Case 1: Immediate Retirement (Age 50) ===');
console.log('Initial Assets: ¥50,000,000');
console.log('Annual Expenses: ¥2,500,000');
console.log('Expected: Assets should decrease by ¥2,500,000 per year');
console.log('');

const result1 = simulateAssetGrowth(testCase1, false);

// Show first 5 years
console.log('Year | Age | Assets | Expected | Diff');
console.log('-----|-----|--------|----------|------');
for (let i = 0; i < 5 && i < result1.length; i++) {
    const expected = 50000000 - (i * 2500000);
    const diff = result1[i].assets - expected;
    console.log(`${i} | ${result1[i].age} | ¥${result1[i].assets.toLocaleString()} | ¥${expected.toLocaleString()} | ${diff === 0 ? 'OK' : '❌ ' + diff.toLocaleString()}`);
}

console.log('\n=== Test Case 2: Retirement in 5 years ===');
const testCase2: FireInputs = {
    currentAge: 45,
    retirementAge: 50,
    currentAssets: 30000000,
    annualIncome: 6000000, // 600万円
    annualExpenses: 3000000, // 300万円
    investmentReturnRate: 5,
    inflationRate: 0,
    withdrawalRate: 4,
    pensionStartAge: 65,
    monthlyPension: 0,
    postRetirementIncome: 0
};

const result2 = simulateAssetGrowth(testCase2, false);

console.log('Year | Age | isRetired | Assets | Income | Expenses');
console.log('-----|-----|-----------|--------|--------|----------');
for (let i = 0; i < 10 && i < result2.length; i++) {
    console.log(`${i} | ${result2[i].age} | ${result2[i].isRetired ? 'Yes' : 'No '} | ¥${result2[i].assets.toLocaleString()} | ¥${result2[i].income.toLocaleString()} | ¥${result2[i].expenses.toLocaleString()}`);
}

console.log('\n=== Test Case 3: With 5% return, Immediate Retirement ===');
const testCase3: FireInputs = {
    currentAge: 50,
    retirementAge: 50,
    currentAssets: 50000000,
    annualIncome: 0,
    annualExpenses: 2500000,
    investmentReturnRate: 5, // 5% return
    inflationRate: 0,
    withdrawalRate: 4,
    pensionStartAge: 65,
    monthlyPension: 0,
    postRetirementIncome: 0
};

const result3 = simulateAssetGrowth(testCase3, false);

console.log('With 5% annual return:');
console.log('Year | Age | Assets | Growth | Withdrawal | Net Change');
console.log('-----|-----|--------|--------|------------|------------');
for (let i = 0; i < 5 && i < result3.length; i++) {
    const prevAssets = i === 0 ? testCase3.currentAssets : result3[i - 1].assets;
    const netChange = result3[i].assets - prevAssets;
    console.log(`${i} | ${result3[i].age} | ¥${result3[i].assets.toLocaleString()} | ¥${result3[i].investmentReturns.toLocaleString()} | ¥${result3[i].withdrawal.toLocaleString()} | ${netChange >= 0 ? '+' : ''}¥${netChange.toLocaleString()}`);
}
