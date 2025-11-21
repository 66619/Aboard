/**
 * Japanese (Japan) - 日本語
 * Language file for Aboard application
 */

window.translations = {
    // Common
    common: {
        confirm: '確認',
        cancel: 'キャンセル',
        close: '閉じる',
        save: '保存',
        delete: '削除',
        edit: '編集',
        add: '追加',
        remove: '削除',
        yes: 'はい',
        no: 'いいえ',
        ok: 'OK',
        apply: '適用',
        reset: 'リセット'
    },

    // App Title
    app: {
        title: 'Aboard - ミニマリストホワイトボード',
        name: 'Aboard'
    },

    // Toolbar
    toolbar: {
        undo: '元に戻す',
        redo: 'やり直す',
        pen: 'ペン',
        move: '移動',
        eraser: '消しゴム',
        clear: 'クリア',
        background: '背景',
        more: 'もっと',
        settings: '設定',
        export: 'キャンバスをエクスポート',
        zoomOut: 'ズームアウト (-)',
        zoomIn: 'ズームイン (+)',
        fullscreen: 'フルスクリーン (F11)',
        zoomPlaceholder: 'ズームレベル (パーセントを入力)'
    },

    // Tools
    tools: {
        pen: {
            title: 'ペン',
            type: 'ペンの種類',
            normal: '通常ペン',
            pencil: '鉛筆',
            ballpoint: 'ボールペン',
            fountain: '万年筆',
            brush: 'ブラシ',
            colorAndSize: '色とサイズ',
            colorPicker: 'カラーピッカー'
        },
        eraser: {
            title: '消しゴム',
            type: '消しゴムの種類',
            normal: '通常消しゴム',
            pixel: 'ピクセル消しゴム',
            size: '消しゴムのサイズ',
            shapeCircle: '円形',
            shapeRectangle: '四角形'
        },
        clear: {
            title: 'キャンバスをクリア',
            confirm: 'クリアを確認',
            message: 'キャンバスをクリアしてもよろしいですか？この操作は元に戻せません。'
        }
    },

    // Background
    background: {
        title: '背景',
        color: '背景色',
        pattern: '背景パターン',
        blank: '空白',
        none: 'なし',
        dots: 'ドット',
        grid: 'グリッド',
        lines: 'ライン',
        tianzige: '田字格（中国）',
        english4line: '英語4線',
        musicStaff: '五線譜',
        coordinate: '座標系',
        image: '画像',
        opacity: '背景の不透明度',
        opacityHint: '背景の透明度を調整します。100%は完全に不透明',
        contrast: 'コントラスト',
        contrastHint: '背景パターン線の明暗を調整します',
        preference: '背景パターンの設定'
    },

    // Page Navigation
    page: {
        previous: '前へ',
        next: '次へ',
        jumpPlaceholder: 'ページ番号を入力',
        of: ' / ',
        newPage: '新しいページ'
    },

    // Settings
    settings: {
        title: '設定',
        tabs: {
            general: '一般',
            display: '表示',
            pen: 'ペン',
            eraser: '消しゴム',
            canvas: 'キャンバス',
            background: '背景',
            about: 'について',
            announcement: 'お知らせ',
            more: 'もっと'
        },
        display: {
            title: '表示設定',
            theme: 'テーマ',
            themeHint: 'アプリケーションテーマを選択',
            themeColor: 'テーマカラー',
            colorOptions: {
                blue: '青',
                purple: '紫',
                green: '緑',
                orange: 'オレンジ',
                red: '赤',
                pink: 'ピンク',
                cyan: 'シアン',
                yellow: '黄'
            },
            colorPicker: 'カラーピッカー'
        },
        general: {
            title: '一般設定',
            language: '言語',
            languageHint: 'インターフェース言語を選択',
            canvasMode: 'キャンバスモード',
            canvasModeHint: 'ページネーションまたは無限キャンバスモードを選択',
            pagination: 'ページネーション',
            infiniteCanvas: '無限キャンバス',
            autoSave: '自動保存',
            autoSaveHint: '定期的に描画を自動保存'
        },
        time: {
            title: '時刻表示設定',
            showDate: '日付を表示',
            showTime: '時刻を表示',
            timezone: 'タイムゾーン',
            timeFormat: '時刻形式',
            timeFormat12: '12時間制 (AM/PM)',
            timeFormat24: '24時間制',
            dateFormat: '日付形式',
            dateFormatYMD: '年-月-日 (2024-01-01)',
            dateFormatMDY: '月-日-年 (01-01-2024)',
            dateFormatDMY: '日-月-年 (01-01-2024)',
            dateFormatChinese: '中国語 (2024年1月1日)',
            colorSettings: '色設定',
            colorHint: '時刻表示のフォントと背景色を設定',
            textColor: 'テキスト色',
            bgColor: '背景色',
            fontSize: 'フォントサイズ',
            opacity: '不透明度',
            fullscreenMode: 'フルスクリーンモード',
            fullscreenDisabled: '無効',
            fullscreenSingle: 'シングルクリック',
            fullscreenDouble: 'ダブルクリック',
            fullscreenFontSize: 'フルスクリーンフォントサイズ',
            fullscreenFontSizeHint: 'フルスクリーン時刻表示のフォントサイズを調整、範囲10%-85%',
            customColor: 'カスタムカラー'
        },
        about: {
            title: 'Aboardについて',
            version: 'バージョン',
            description: 'Aboardは、創造的な作業と効率的なメモ取りのために設計されたミニマリストで強力なホワイトボードアプリケーションです。',
            features: '主な機能',
            feature1: 'スムーズな描画体験',
            feature2: '豊富なペンの種類',
            feature3: '柔軟な消しゴムツール',
            feature4: '豊富な背景パターン（ドット、グリッド、田字格、英語4線など）',
            feature5: 'PNG画像へのエクスポート',
            feature6: '元に戻す/やり直し機能',
            feature7: '完全なタッチサポート',
            feature8: 'フルスクリーンモード',
            feature9: '自動保存',
            feature10: '多言語サポート',
            license: 'オープンソースライセンス',
            github: 'GitHubリポジトリ'
        }
    },

    // Feature Area
    features: {
        title: '機能',
        time: '時刻',
        timer: 'タイマー'
    },

    // Time Display
    timeDisplay: {
        options: '時刻表示オプション',
        showDate: '日付を表示',
        showTime: '時刻を表示',
        settings: '設定',
        displayOptions: '表示オプション',
        dateAndTime: '日付と時刻',
        dateOnly: '日付のみ',
        timeOnly: '時刻のみ'
    },

    // Timer
    timer: {
        title: 'タイマー設定',
        mode: 'モード',
        countdown: 'カウントダウン',
        stopwatch: 'ストップウォッチ',
        duration: '期間（分）',
        hours: '時',
        minutes: '分',
        seconds: '秒',
        title: 'タイトル',
        titlePlaceholder: 'タイマーのタイトルを入力',
        fontSettings: 'フォント設定',
        fontSize: 'フォントサイズ',
        adjustColor: '色を調整',
        colorSettings: '色設定',
        textColor: 'テキスト色',
        bgColor: '背景色',
        colors: {
            black: '黒',
            white: '白',
            blue: '青',
            red: '赤',
            green: '緑',
            yellow: '黄',
            orange: 'オレンジ',
            purple: '紫',
            transparent: '透明'
        },
        customColor: 'カスタムカラー',
        start: '開始',
        adjust: '調整',
        continue: '続行',
        pause: '一時停止',
        reset: 'リセット',
        stop: '停止'
    },

    // Timezone names
    timezones: {
        'china': '中国 (UTC+8)',
        'newyork': 'ニューヨーク (UTC-5/-4)',
        'losangeles': 'ロサンゼルス (UTC-8/-7)',
        'chicago': 'シカゴ (UTC-6/-5)',
        'london': 'ロンドン (UTC+0/+1)',
        'paris': 'パリ (UTC+1/+2)',
        'berlin': 'ベルリン (UTC+1/+2)',
        'tokyo': '東京 (UTC+9)',
        'seoul': 'ソウル (UTC+9)',
        'hongkong': '香港 (UTC+8)',
        'singapore': 'シンガポール (UTC+8)',
        'dubai': 'ドバイ (UTC+4)',
        'sydney': 'シドニー (UTC+10/+11)',
        'auckland': 'オークランド (UTC+12/+13)',
        'utc': 'UTC (協定世界時)'
    },

    // Welcome Dialog
    welcome: {
        title: 'Aboardへようこそ',
        content: `Aboardホワイトボードアプリケーションへようこそ！

使用のヒント：
• 下部のツールバーをクリックして、さまざまな描画ツールを選択
• Ctrl+Zで元に戻す、Ctrl+Yでやり直し
• 右上のズームボタンをクリックするか、マウスホイールでキャンバスをズーム
• 背景ボタンをクリックして、さまざまな背景パターンを選択
• 設定で無限キャンバスまたはページネーションモードを切り替え
• タッチとマウス入力の両方をサポート

クリエイティブな作業をお楽しみください！`,
        confirm: 'OK',
        noShowAgain: '再度表示しない'
    },

    // Color names
    colors: {
        black: '黒',
        red: '赤',
        blue: '青',
        green: '緑',
        yellow: '黄',
        orange: 'オレンジ',
        purple: '紫',
        white: '白',
        transparent: '透明'
    },

    // Days of week
    days: {
        sunday: '日曜日',
        monday: '月曜日',
        tuesday: '火曜日',
        wednesday: '水曜日',
        thursday: '木曜日',
        friday: '金曜日',
        saturday: '土曜日'
    }
};
