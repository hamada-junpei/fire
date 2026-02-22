# ジユウノコンパス - FIREシミュレーター

経済的自由（FIRE: Financial Independence, Retire Early）達成をゲーム感覚でシミュレートするWebアプリケーション

## ✨ 主な機能

### 📊 FIREシミュレーション
- 現在の資産・収入・支出から経済的自由達成までの年数を計算
- 4つのFIREコース（Side FIRE、Fat FIRE、Barista FIRE、Lean FIRE）
- モンテカルロシミュレーションによる確率的予測

### 📈 詳細分析ダッシュボード
- 月次分析（収入成長率、支出最適化、投資パフォーマンス）
- 将来予測（保守的・現実的・楽観的シナリオ）
- ベンチマーク比較（同年代との比較）
- 最適化提案（AI による改善アドバイス）

### 💼 キャリアプランナー
- FIRE後の働き方シミュレーション
- 職業データベースに基づく収入計算
- MBTIタイプに応じた職業推薦

### 📚 ナレッジセンター
- FIRE基礎知識の学習
- 実践的なケーススタディ
- インタラクティブツール（ラテファクター計算、インフレモンスター）

### 🎮 ゲーム要素
- レベルシステム（資産額に応じて成長）
- 実績システム（マイルストーン達成で解放）
- パーティクル・サウンドエフェクト

## 🛠️ 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **チャート**: Recharts
- **アイコン**: Lucide React
- **状態管理**: React Hooks
- **データ永続化**: LocalStorage

## 🚀 開発

### セットアップ
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev
```

開発サーバーは http://localhost:5173/ で起動します

### ビルド
```bash
npm run build
```

### プレビュー
```bash
npm run preview
```

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── dashboard/      # ダッシュボード関連
│   ├── ui/             # 共通UIコンポーネント
│   └── ...             # 各種機能コンポーネント
├── utils/              # ユーティリティ関数
│   ├── calculations.ts # FIRE計算ロジック
│   ├── achievementSystem.ts
│   ├── analyticsSystem.ts
│   └── ...
├── data/               # 静的データ
│   ├── jobs.ts         # 職業データ
│   └── updates.ts      # 更新履歴
├── types/              # TypeScript型定義
└── hooks/              # カスタムフック
```

## 🎯 主要コンポーネント

- **Dashboard**: メインダッシュボード
- **OnboardingWizard**: 初回セットアップウィザード
- **AnalyticsDashboard**: 詳細分析ダッシュボード
- **CareerPlanner**: キャリアプランニング
- **KnowledgeSection**: 学習コンテンツ
- **GameStatus**: ゲーム進行状況

## 🌟 特徴

- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **ダークモード**: 目に優しいダークテーマ
- **スワイプジェスチャー**: モバイルで直感的なタブ切り替え
- **オフライン対応**: LocalStorageによるデータ永続化
- **アクセシビリティ**: キーボードナビゲーション対応

## 📝 ライセンス

MIT

## 🤝 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📧 お問い合わせ

質問や提案がある場合は、GitHubのissueでお知らせください。
