// 収益化に関する設定・データを一元管理するファイル

export const MONETIZATION = {
    // 投げ銭 (Buy Me a Coffee) のクリエイターURL
    // ※後でご自身のURL (例: https://buymeacoffee.com/yourname) に変更してください
    buyMeACoffeeUrl: 'https://buymeacoffee.com/',

    // AmazonアソシエイトのトラッキングID（タグ）
    // ※審査通過後に「your-tag-22」のようなご自身のIDに変更してください
    amazonTrackingId: 'YOUR_AMAZON_TAG-22',
};

// おすすめ書籍リスト
export const RECOMMENDED_BOOKS = [
    {
        id: 'book-1',
        title: '本当の自由を手に入れる お金の大学',
        author: '両＠リベ大学長',
        description: 'FIREを目指すなら必読。貯める・稼ぐ・増やす・守る・使うの5つの力を鍛える実践的なガイド。',
        imageUrl: 'https://m.media-amazon.com/images/I/81I-R7-W3TL._SY466_.jpg',
        amazonUrl: `https://www.amazon.co.jp/dp/447810996X?tag=${MONETIZATION.amazonTrackingId}`,
        category: '基礎',
    },
    {
        id: 'book-2',
        title: 'DIE WITH ZERO 人生が豊かになりすぎる究極のルール',
        author: 'ビル・パーキンス',
        description: 'ただお金を貯めるだけでなく、どう使うかに焦点を当てた、人生の満足度を最大化する考え方。',
        imageUrl: 'https://m.media-amazon.com/images/I/71R12H19tDL._SY466_.jpg',
        amazonUrl: `https://www.amazon.co.jp/dp/4478111247?tag=${MONETIZATION.amazonTrackingId}`,
        category: 'マインドセット',
    },
    {
        id: 'book-3',
        title: 'ウォール街のランダム・ウォーカー',
        author: 'バートン・マルキール',
        description: 'インデックス投資のバイブル。個別株投資やアクティブファンドの問題点をデータで解説。',
        imageUrl: 'https://m.media-amazon.com/images/I/81dGXYYf+kL._AC_UY218_.jpg',
        amazonUrl: `https://www.amazon.co.jp/dp/453235831X?tag=${MONETIZATION.amazonTrackingId}`,
        category: '投資',
    },
    {
        id: 'book-4',
        title: 'サイコロジー・オブ・マネー',
        author: 'モーガン・ハウセル',
        description: 'お金に対する人間の心理と行動の法則。投資のテクニック以上に重要な「心の持ち方」を学ぶ。',
        imageUrl: 'https://m.media-amazon.com/images/I/71tQ9wSntEL._SY466_.jpg',
        amazonUrl: `https://www.amazon.co.jp/dp/429600049X?tag=${MONETIZATION.amazonTrackingId}`,
        category: 'マインドセット',
    }
];
