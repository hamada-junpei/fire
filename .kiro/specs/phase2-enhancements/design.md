# Phase 2 機能強化 - 設計書

## 概要

Phase 1の実績・レベルアップシステムの成功を受けて、Phase 2では以下の5つの主要機能を実装する：

1. **ガチャシステム** - 毎月の積立に応じたランダム報酬システム
2. **ランキングシステム** - 同年代ユーザーとの比較機能
3. **詳細分析ダッシュボード** - 高度な資産分析機能
4. **モバイル体験向上** - スマートフォン最適化
5. **高度なアニメーション** - より派手で満足感のある視覚効果

## アーキテクチャ

### システム構成

```
┌─────────────────────────────────────────────────────────────┐
│                    Phase 2 Enhanced UI Layer                │
├─────────────────────────────────────────────────────────────┤
│  GachaSystem  │  RankingSystem  │  AnalyticsDashboard       │
│  Component    │  Component      │  Component                │
├─────────────────────────────────────────────────────────────┤
│                    Core Game Engine                         │
├─────────────────────────────────────────────────────────────┤
│  GachaEngine  │  RankingEngine  │  AnalyticsEngine          │
│  (確率計算)    │  (順位計算)      │  (分析計算)                │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
├─────────────────────────────────────────────────────────────┤
│  LocalStorage │  IndexedDB      │  Memory Cache             │
│  (設定・履歴)  │  (大容量データ)  │  (一時データ)              │
└─────────────────────────────────────────────────────────────┘
```

### データフロー

```
User Input → Validation → Engine Processing → State Update → UI Rendering → Animation
     ↓                                                              ↑
LocalStorage ←→ Data Persistence ←→ Background Processing ←→ Notification System
```

## コンポーネントとインターフェース

### 1. ガチャシステム

#### GachaEngine
```typescript
interface GachaEngine {
  calculateTickets(monthlyContribution: number): number;
  drawGacha(tickets: number): GachaResult[];
  applyTemporaryEffect(item: TemporaryEffectItem): void;
  removeExpiredEffects(): void;
}

interface GachaResult {
  item: GachaItem;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: TemporaryEffect;
}

interface TemporaryEffect {
  type: 'compound_boost' | 'expense_cut' | 'income_boost';
  multiplier: number;
  duration: number; // days
  expiresAt: Date;
}
```

#### GachaComponent
```typescript
interface GachaComponentProps {
  availableTickets: number;
  onDrawGacha: (tickets: number) => void;
  recentResults: GachaResult[];
  isAnimating: boolean;
}
```

### 2. ランキングシステム

#### RankingEngine
```typescript
interface RankingEngine {
  calculateAssetRanking(age: number, assets: number): RankingResult;
  calculateSavingsRateRanking(savingsRate: number): RankingResult;
  calculateFireSpeedRanking(yearsToFire: number): RankingResult;
  generateAnonymizedData(): AnonymizedUserData[];
}

interface RankingResult {
  rank: number;
  percentile: number;
  totalUsers: number;
  category: string;
  reward?: RankingReward;
}
```

#### RankingComponent
```typescript
interface RankingComponentProps {
  userAge: number;
  userAssets: number;
  userSavingsRate: number;
  userFireYears: number;
  onClaimReward: (reward: RankingReward) => void;
}
```

### 3. 詳細分析ダッシュボード

#### AnalyticsEngine
```typescript
interface AnalyticsEngine {
  calculateMonthlyAnalysis(data: MonthlyData[]): MonthlyAnalysis;
  generateYearlyProjections(currentData: UserData): YearlyProjections;
  performBenchmarkComparison(userData: UserData): BenchmarkResult;
  generateOptimizationSuggestions(analysis: MonthlyAnalysis): OptimizationSuggestion[];
}

interface MonthlyAnalysis {
  incomeGrowth: number;
  expenseOptimization: number;
  investmentPerformance: number;
  savingsRateImprovement: number;
  trend: 'improving' | 'stable' | 'declining';
}

interface YearlyProjections {
  conservative: ProjectionScenario;
  realistic: ProjectionScenario;
  optimistic: ProjectionScenario;
}
```

### 4. モバイル最適化

#### ResponsiveLayout
```typescript
interface ResponsiveLayoutProps {
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  children: React.ReactNode;
  enableSwipeGestures?: boolean;
  collapsible?: boolean;
}

interface SwipeGestureHandler {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  sensitivity: number;
}
```

### 5. 高度なアニメーション

#### AnimationEngine
```typescript
interface AnimationEngine {
  playGachaAnimation(result: GachaResult): Promise<void>;
  playRankingAnimation(newRank: number): Promise<void>;
  playAchievementAnimation(achievement: Achievement): Promise<void>;
  playStreakAnimation(days: number): Promise<void>;
}

interface AnimationConfig {
  duration: number;
  easing: string;
  particles: boolean;
  sound: boolean;
  reducedMotion: boolean;
}
```

## データモデル

### ガチャ関連

```typescript
interface GachaItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  type: 'equipment' | 'consumable' | 'title' | 'effect';
  effect?: TemporaryEffect;
}

interface GachaHistory {
  userId: string;
  timestamp: Date;
  ticketsUsed: number;
  results: GachaResult[];
  totalValue: number;
}
```

### ランキング関連

```typescript
interface UserRankingData {
  userId: string;
  age: number;
  assets: number;
  savingsRate: number;
  fireYears: number;
  lastUpdated: Date;
  isAnonymized: boolean;
}

interface RankingReward {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: RankingRequirement;
}
```

### 分析関連

```typescript
interface AnalyticsData {
  userId: string;
  month: string;
  income: number;
  expenses: number;
  assets: number;
  savingsRate: number;
  investmentReturn: number;
  goals: Goal[];
}

interface OptimizationSuggestion {
  id: string;
  category: 'income' | 'expenses' | 'investment';
  title: string;
  description: string;
  impact: number; // expected improvement percentage
  difficulty: 'easy' | 'medium' | 'hard';
  timeframe: string;
}
```

## 正確性プロパティ

*プロパティとは、システムの全ての有効な実行において真であるべき特性や動作のことです。これらは人間が読める仕様と機械で検証可能な正確性保証の橋渡しをします。*

### Property 1: ガチャチケット計算の一貫性
*任意の* 月次積立額に対して、ガチャチケット数は積立額に比例し、負の値にならない
**検証: 要件 1.1**

### Property 2: ガチャ確率分布の正確性
*任意の* 大量のガチャ試行において、各レアリティの出現率は設定された確率に収束する
**検証: 要件 1.2**

### Property 3: 一時的効果の期間管理
*任意の* 一時的効果アイテムについて、指定期間後に効果が自動的に解除される
**検証: 要件 1.4**

### Property 4: ランキング計算の正確性
*任意の* ユーザーデータセットに対して、年齢・資産額・貯蓄率に基づく順位計算が正しく行われる
**検証: 要件 2.1, 2.2, 2.3**

### Property 5: データ匿名化の完全性
*任意の* ランキング表示データにおいて、個人を特定可能な情報が含まれない
**検証: 要件 2.4**

### Property 6: 報酬付与の条件一致
*任意の* ランキング順位に対して、条件を満たす場合のみ適切な報酬が付与される
**検証: 要件 2.5**

### Property 7: 分析指標計算の正確性
*任意の* 月次データに対して、収入成長率・支出最適化率・投資パフォーマンス・貯蓄率改善が正しく算出される
**検証: 要件 3.2**

### Property 8: シナリオ予測の一貫性
*任意の* 入力データに対して、保守的・現実的・楽観的の3つのシナリオが適切な順序で生成される
**検証: 要件 3.3**

### Property 9: ベンチマーク比較の正確性
*任意の* ユーザーデータに対して、同業界・同地域の平均データとの比較が正しく計算される
**検証: 要件 3.4**

### Property 10: 最適化提案の妥当性
*任意の* 分析データに対して、実行可能で具体的な改善提案が生成される
**検証: 要件 3.5**

### Property 11: データ永続化のラウンドトリップ
*任意の* ガチャ履歴・ランキング・分析データについて、保存後の読み込みで元のデータが正確に復元される
**検証: 要件 6.1, 6.2, 6.3, 6.4**

### Property 12: 破損データの安全な処理
*任意の* 破損したローカルストレージデータに対して、システムが安全にデフォルト値で初期化される
**検証: 要件 6.5**

### Property 13: 並行処理の独立性
*任意の* アニメーション実行中において、他の機能が正常に動作し続ける
**検証: 要件 7.2**

### Property 14: 非同期処理の応答性
*任意の* 分析データ計算中において、UIが応答可能な状態を維持する
**検証: 要件 7.4**

### Property 15: アニメーション設定の尊重
*任意の* アニメーション無効設定において、システムが設定に従って動作を制御する
**検証: 要件 8.1**

## エラーハンドリング

### 1. ガチャシステムエラー
- **チケット不足**: ユーザーフレンドリーなメッセージで通知
- **アニメーション失敗**: フォールバック表示で結果を表示
- **効果適用エラー**: ログ記録後、デフォルト状態に復帰

### 2. ランキングシステムエラー
- **データ取得失敗**: キャッシュデータまたはダミーデータで表示
- **計算エラー**: エラーログ記録後、概算値で表示
- **匿名化失敗**: データ表示を停止し、プライバシーを保護

### 3. 分析システムエラー
- **データ不足**: 利用可能なデータで部分的な分析を実行
- **計算タイムアウト**: 簡略化された計算にフォールバック
- **予測エラー**: 過去データベースの予測を表示

### 4. モバイル対応エラー
- **ジェスチャー認識失敗**: 従来のボタン操作にフォールバック
- **レイアウト崩れ**: 最小限の機能レイアウトで表示
- **パフォーマンス低下**: 重い機能を段階的に無効化

## テスト戦略

### 単体テスト
- ガチャ確率計算の正確性テスト
- ランキング順位計算のテスト
- 分析指標計算のテスト
- データ永続化のテスト
- エラーハンドリングのテスト

### プロパティベーステスト
- ガチャ確率分布の収束テスト（1000回試行）
- ランキング計算の一貫性テスト（ランダムデータセット）
- 分析計算の正確性テスト（様々な入力パターン）
- データ永続化のラウンドトリップテスト
- 並行処理の独立性テスト

### 統合テスト
- ガチャ→通知→データ保存の一連の流れ
- ランキング更新→報酬付与→実績解放の流れ
- 分析データ生成→表示→エクスポートの流れ

### パフォーマンステスト
- 大量データでのランキング計算速度
- 複数アニメーション同時実行時の応答性
- モバイルデバイスでの動作確認

### アクセシビリティテスト
- スクリーンリーダー対応の確認
- キーボードナビゲーションの確認
- 色覚異常対応の確認
- アニメーション無効設定の確認

## 実装フェーズ

### Phase 2.1: コアエンジン実装（1週間）
- GachaEngine, RankingEngine, AnalyticsEngineの実装
- 基本的なデータモデルの定義
- 単体テストの作成

### Phase 2.2: UI コンポーネント実装（1週間）
- ガチャ、ランキング、分析の各UIコンポーネント
- モバイル対応のレスポンシブデザイン
- 基本的なアニメーション実装

### Phase 2.3: 高度な機能実装（1週間）
- 派手なアニメーション効果
- データ永続化システム
- エラーハンドリングの強化

### Phase 2.4: 統合とテスト（3日）
- 全機能の統合
- プロパティベーステストの実行
- パフォーマンス最適化

### Phase 2.5: アクセシビリティ対応（2日）
- スクリーンリーダー対応
- キーボードナビゲーション
- 色覚異常対応