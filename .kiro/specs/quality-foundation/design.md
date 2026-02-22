# 設計書

## 概要

本設計書は、FIREシミュレーターWebアプリケーションの品質基盤整備プロジェクトの技術設計を定義します。主な目標は以下の通りです：

1. テストフレームワーク（Vitest）の導入と設定
2. 重要な計算関数のユニットテストとプロパティベーステストの実装
3. 基本的なエラーハンドリングの実装
4. 入力検証の強化

このプロジェクトにより、今後の機能追加を安全に行える基盤が構築されます。

## アーキテクチャ

### テスト戦略

本プロジェクトでは、以下の2つのテスト手法を組み合わせます：

1. **ユニットテスト**: 特定の入力に対する期待される出力を検証
2. **プロパティベーステスト**: 任意の入力に対して成立すべき性質を検証

両者は補完的な関係にあり、ユニットテストは具体的なバグを捕捉し、プロパティベーステストは一般的な正しさを検証します。

### テストフレームワーク

- **Vitest**: 高速で設定が簡単なVite対応のテストフレームワーク
- **fast-check**: TypeScript/JavaScript用のプロパティベーステストライブラリ

### ディレクトリ構造

```
src/
├── utils/
│   ├── calculations.ts          # 既存の計算関数
│   ├── calculations.test.ts     # ユニットテスト
│   ├── calculations.property.test.ts  # プロパティベーステスト
│   ├── validation.ts            # 新規: 入力検証関数
│   └── validation.test.ts       # 検証関数のテスト
├── hooks/
│   ├── useLocalStorage.ts       # 新規: localStorage用カスタムフック
│   └── useLocalStorage.test.ts  # フックのテスト
└── components/
    └── Dashboard.tsx            # エラーハンドリングを追加
```

## コンポーネントとインターフェース

### 1. テスト設定

#### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**']
    }
  }
});
```

### 2. 入力検証モジュール

#### src/utils/validation.ts

```typescript
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FireInputValidation {
  currentAge: ValidationResult;
  retirementAge: ValidationResult;
  currentAssets: ValidationResult;
  annualIncome: ValidationResult;
  annualExpenses: ValidationResult;
  investmentReturnRate: ValidationResult;
  inflationRate: ValidationResult;
  withdrawalRate: ValidationResult;
}

export const validateAge = (age: number): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof age !== 'number' || isNaN(age)) {
    errors.push('年齢は数値である必要があります');
  } else if (age < 0) {
    errors.push('年齢は0以上である必要があります');
  } else if (age > 120) {
    errors.push('年齢は120以下である必要があります');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateRetirementAge = (
  currentAge: number,
  retirementAge: number
): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof retirementAge !== 'number' || isNaN(retirementAge)) {
    errors.push('退職年齢は数値である必要があります');
  } else if (retirementAge < currentAge) {
    errors.push('退職年齢は現在年齢以上である必要があります');
  } else if (retirementAge > 100) {
    errors.push('退職年齢は100以下である必要があります');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateAmount = (
  amount: number,
  fieldName: string
): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof amount !== 'number' || isNaN(amount)) {
    errors.push(`${fieldName}は数値である必要があります`);
  } else if (amount < 0) {
    errors.push(`${fieldName}は0以上である必要があります`);
  } else if (amount > Number.MAX_SAFE_INTEGER) {
    errors.push(`${fieldName}が大きすぎます`);
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validatePercentage = (
  percentage: number,
  fieldName: string,
  min: number = 0,
  max: number = 100
): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof percentage !== 'number' || isNaN(percentage)) {
    errors.push(`${fieldName}は数値である必要があります`);
  } else if (percentage < min) {
    errors.push(`${fieldName}は${min}%以上である必要があります`);
  } else if (percentage > max) {
    errors.push(`${fieldName}は${max}%以下である必要があります`);
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateFireInputs = (inputs: FireInputs): FireInputValidation => {
  return {
    currentAge: validateAge(inputs.currentAge),
    retirementAge: validateRetirementAge(inputs.currentAge, inputs.retirementAge),
    currentAssets: validateAmount(inputs.currentAssets, '現在資産'),
    annualIncome: validateAmount(inputs.annualIncome, '年間収入'),
    annualExpenses: validateAmount(inputs.annualExpenses, '年間支出'),
    investmentReturnRate: validatePercentage(
      inputs.investmentReturnRate,
      '運用利回り',
      -100,
      100
    ),
    inflationRate: validatePercentage(
      inputs.inflationRate,
      'インフレ率',
      -100,
      100
    ),
    withdrawalRate: validatePercentage(
      inputs.withdrawalRate,
      '引き出し率',
      0,
      100
    )
  };
};
```

### 3. LocalStorageフック

#### src/hooks/useLocalStorage.ts

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, Error | null] {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      setError(err as Error);
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setError(null);
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
      setError(err as Error);
    }
  };

  return [value, setStoredValue, error];
}
```

## データモデル

既存のデータモデルは変更しません。`FireInputs`、`SimulationData`、`MonteCarloResult`インターフェースはそのまま使用します。

## 正しさの性質

プロパティベーステストで検証する性質を定義します。各性質は、要件定義書の受入基準から導出されています。


*性質とは、システムのすべての有効な実行において真であるべき特性または動作です。本質的には、システムが何をすべきかについての形式的な記述です。性質は、人間が読める仕様と機械で検証可能な正しさの保証との橋渡しをします。*

### プロパティ1: FIRE目標額の正値性
*任意の*正の年間支出と正の引き出し率に対して、FIRE目標額は常に正の値である
**検証: 要件3.1**

### プロパティ2: FIRE目標額と引き出し率の逆比例関係
*任意の*年間支出と引き出し率に対して、引き出し率を2倍にすると、FIRE目標額は半分になる
**検証: 要件3.2**

### プロパティ3: FIRE目標額と年間支出の比例関係
*任意の*年間支出と引き出し率に対して、年間支出を2倍にすると、FIRE目標額も2倍になる
**検証: 要件3.3**

### プロパティ4: FIRE目標額計算のラウンドトリップ
*任意の*年間支出と引き出し率に対して、FIRE目標額に(引き出し率 / 100)を掛けると、元の年間支出と等しくなる
**検証: 要件3.4**

### プロパティ5: 目標達成済みの場合の年数
*任意の*現在資産とFIRE目標額に対して、現在資産がFIRE目標額以上の場合、FIRE達成年数は0である
**検証: 要件5.1**

### プロパティ6: FIRE達成年数の非負性
*任意の*正の年間貯蓄と非負の運用利回りに対して、FIRE達成年数は非負の数またはnullである
**検証: 要件5.2**

### プロパティ7: 年間貯蓄増加による達成年数の単調性
*任意の*入力に対して、年間貯蓄が増加すると、FIRE達成年数は減少するか同じである
**検証: 要件5.3**

### プロパティ8: 運用利回り増加による達成年数の単調性
*任意の*入力に対して、運用利回りが増加すると、FIRE達成年数は減少するか同じである
**検証: 要件5.4**

### プロパティ9: シミュレーションデータポイント数の不変性
*任意の*現在年齢に対して、シミュレーションが生成するデータポイント数は(100 - 現在年齢 + 1)と等しい
**検証: 要件7.1**

### プロパティ10: 支出超過時の資産減少
*任意の*入力に対して、すべての年で支出が収入を超える場合、資産は単調減少するか0に留まる
**検証: 要件7.2**

### プロパティ11: 収入超過時の資産増加
*任意の*入力に対して、すべての年で収入が支出を超え運用利回りが正の場合、資産は単調増加する
**検証: 要件7.3**

### プロパティ12: インフレ率0時の支出一定性
*任意の*入力に対して、インフレ率が0の場合、すべての年で支出は一定である
**検証: 要件7.4**

### プロパティ13: モンテカルロパーセンタイルの順序性
*任意の*有効な入力に対して、モンテカルロシミュレーションのpercentile10は常にpercentile90以下である
**検証: 要件9.1**

### プロパティ14: ボラティリティ増加による分散拡大
*任意の*入力に対して、ボラティリティが増加すると、percentile10とpercentile90の差は増加する
**検証: 要件9.2**

## エラーハンドリング

### 1. 計算関数のエラーハンドリング

計算関数は、無効な入力に対してエラーをスローするのではなく、安全なデフォルト値を返すか、nullを返します。

```typescript
// 例: calculateFireNumber
export const calculateFireNumber = (
  annualExpenses: number,
  withdrawalRate: number = 4
): number => {
  // 入力検証
  if (typeof annualExpenses !== 'number' || isNaN(annualExpenses) || annualExpenses < 0) {
    return 0;
  }
  if (typeof withdrawalRate !== 'number' || isNaN(withdrawalRate) || withdrawalRate <= 0) {
    return 0;
  }
  
  return Math.round(annualExpenses / (withdrawalRate / 100));
};
```

### 2. LocalStorageのエラーハンドリング

`useLocalStorage`フックは、エラーが発生してもアプリケーションをクラッシュさせず、エラー状態を返します。

### 3. UIレベルのエラーハンドリング

Dashboardコンポーネントに、入力検証とエラー表示を追加します：

```typescript
const [validationErrors, setValidationErrors] = useState<FireInputValidation | null>(null);

const handleInputChange = (key: keyof FireInputs, value: number) => {
  const newInputs = { ...inputs, [key]: value };
  setInputs(newInputs);
  
  // 検証を実行
  const validation = validateFireInputs(newInputs);
  const hasErrors = Object.values(validation).some(v => !v.isValid);
  
  if (hasErrors) {
    setValidationErrors(validation);
  } else {
    setValidationErrors(null);
  }
};
```

## テスト戦略

### ユニットテスト

各計算関数に対して、以下のカテゴリのテストを作成します：

1. **正常系テスト**: 典型的な入力に対する期待される出力
2. **境界値テスト**: 0、負の値、極端に大きな値
3. **エッジケーステスト**: null、undefined、NaN

### プロパティベーステスト

fast-checkライブラリを使用して、各性質を検証します。各テストは最低100回の反復を実行します。

#### テストの構造

```typescript
import fc from 'fast-check';

describe('calculateFireNumber - Properties', () => {
  it('プロパティ1: FIRE目標額の正値性', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100000000 }), // 年間支出
        fc.float({ min: 0.1, max: 10 }),        // 引き出し率
        (expenses, rate) => {
          const result = calculateFireNumber(expenses, rate);
          return result > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### テストカバレッジ目標

- 計算関数: 90%以上
- 検証関数: 95%以上
- フック: 80%以上

### テスト実行

```bash
# すべてのテストを実行
npm test

# カバレッジレポート付きで実行
npm test -- --coverage

# 特定のファイルのみ実行
npm test calculations.test.ts

# ウォッチモード
npm test -- --watch
```

## 実装の優先順位

1. **フェーズ1**: テストフレームワークのセットアップ
   - Vitestとfast-checkのインストール
   - 設定ファイルの作成
   - テストスクリプトの追加

2. **フェーズ2**: 計算関数のテスト
   - calculateFireNumberのユニットテストとプロパティテスト
   - calculateYearsToFireのユニットテストとプロパティテスト
   - simulateAssetGrowthのユニットテストとプロパティテスト
   - calculateMonteCarloのユニットテストとプロパティテスト

3. **フェーズ3**: 入力検証の実装とテスト
   - validation.tsの作成
   - 検証関数のユニットテスト

4. **フェーズ4**: エラーハンドリングの実装
   - useLocalStorageフックの作成とテスト
   - Dashboardコンポーネントへの検証とエラー表示の追加

## パフォーマンス考慮事項

- プロパティベーステストは多数の反復を実行するため、テスト実行時間が長くなる可能性があります
- モンテカルロシミュレーションのテストは特に時間がかかるため、反復回数を調整する必要があるかもしれません
- CI/CDパイプラインでは、タイムアウト設定を適切に調整します

## セキュリティ考慮事項

- 入力検証により、インジェクション攻撃のリスクを軽減
- localStorageに保存されるデータは機密情報を含まないため、暗号化は不要
- 極端に大きな数値によるDoS攻撃を防ぐため、上限値を設定

## 今後の拡張性

この品質基盤により、以下の今後の改善が容易になります：

1. 新しい計算機能の追加（テストファーストで開発可能）
2. リファクタリング（既存テストが回帰を防止）
3. パフォーマンス最適化（テストが正しさを保証）
4. より高度なエラーハンドリング（基盤が整っている）
