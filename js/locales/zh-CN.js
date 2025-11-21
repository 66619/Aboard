/**
 * Chinese (Simplified) - 中文简体
 * Language file for Aboard application
 */

window.translations = {
    // Common
    common: {
        confirm: '确定',
        cancel: '取消',
        close: '关闭',
        save: '保存',
        delete: '删除',
        edit: '编辑',
        add: '添加',
        remove: '移除',
        yes: '是',
        no: '否',
        ok: '好的',
        apply: '应用',
        reset: '重置'
    },

    // App Title
    app: {
        title: 'Aboard - 简约白板',
        name: 'Aboard'
    },

    // Toolbar
    toolbar: {
        undo: '撤销',
        redo: '重做',
        pen: '笔',
        move: '移动',
        eraser: '橡皮',
        clear: '清空',
        background: '背景',
        more: '更多',
        settings: '设置',
        export: '导出画布',
        zoomOut: '缩小 (-)',
        zoomIn: '放大 (+)',
        fullscreen: '全屏 (F11)',
        zoomPlaceholder: '缩放比例 (输入百分比)'
    },

    // Tools
    tools: {
        pen: {
            title: '笔',
            type: '笔触类型',
            normal: '普通笔',
            pencil: '铅笔',
            ballpoint: '圆珠笔',
            fountain: '钢笔',
            brush: '毛笔',
            colorAndSize: '颜色与粗细',
            colorPicker: '取色器'
        },
        eraser: {
            title: '橡皮',
            type: '橡皮类型',
            normal: '普通橡皮',
            pixel: '像素橡皮',
            size: '橡皮大小',
            sizeLabel: '橡皮擦大小',
            shape: '形状',
            shapeCircle: '圆形',
            shapeRectangle: '方形'
        },
        clear: {
            title: '清空画布',
            confirm: '确认清空',
            message: '确定要清空画布吗？此操作无法撤销。'
        }
    },

    // Background
    background: {
        title: '背景',
        color: '背景颜色',
        pattern: '背景图案',
        blank: '空白',
        none: '无',
        dots: '点阵',
        grid: '方格',
        lines: '横线',
        tianzige: '田字格',
        english4line: '四线格',
        musicStaff: '五线谱',
        coordinate: '坐标系',
        image: '图片',
        density: '密度',
        size: '大小',
        opacity: '背景透明度',
        opacityHint: '调整背景的透明度,100%为完全不透明',
        contrast: '对比度',
        contrastHint: '调整背景图案线条的明暗程度',
        preference: '背景图案偏好'
    },

    // Page Navigation
    page: {
        previous: '上一页',
        next: '下一页',
        jumpPlaceholder: '输入页码跳转',
        of: ' / ',
        newPage: '新建页面'
    },

    // Settings
    settings: {
        title: '设置',
        tabs: {
            general: '通用',
            display: '显示',
            pen: '笔',
            eraser: '橡皮',
            canvas: '画布',
            background: '背景',
            about: '关于',
            announcement: '公告',
            more: '更多'
        },
        display: {
            title: '显示设置',
            theme: '主题',
            themeHint: '选择应用主题',
            themeColor: '主题色',
            showZoomControls: '显示缩放控件',
            showZoomControlsHint: '勾选后，在画布上方显示缩放控件',
            showFullscreenBtn: '显示全屏按钮',
            showFullscreenBtnHint: '勾选后，在缩放控件旁显示全屏按钮',
            toolbarSize: '工具栏大小',
            toolbarSizeHint: '调整底部工具栏的大小',
            configScale: '属性栏大小',
            configScaleHint: '调整弹出具体属性面板的大小',
            themeColorHint: '工具栏被选中时的颜色',
            colorOptions: {
                blue: '蓝色',
                purple: '紫色',
                green: '绿色',
                orange: '橙色',
                red: '红色',
                pink: '粉色',
                cyan: '青色',
                yellow: '黄色'
            },
            colorPicker: '取色器'
        },
        general: {
            title: '通用设置',
            language: '语言',
            languageHint: '选择界面语言 / Choose interface language',
            globalFont: '全局字体',
            globalFontHint: '选择应用程序使用的字体',
            edgeSnap: '启用边缘吸附',
            edgeSnapHint: '拖动控制面板时自动吸附到屏幕边缘',
            controlPosition: '控制按钮位置',
            controlPositionHint: '选择缩放和分页控件在屏幕上的显示位置',
            positionTopLeft: '左上角',
            positionTopRight: '右上角',
            positionBottomLeft: '左下角',
            positionBottomRight: '右下角',
            canvasMode: '画布模式',
            canvasModeHint: '选择画布的显示模式',
            pagination: '分页模式',
            infiniteCanvas: '无限画布',
            autoSave: '自动保存',
            autoSaveHint: '定期保存您的绘图内容'
        },
        canvas: {
            title: '画布设置',
            mode: '画布模式',
            modeHint: '选择画布的显示模式',
            size: '画布尺寸',
            sizeHint: '选择预设尺寸或自定义画布比例和大小',
            infiniteCanvas: '无限画布',
            pagination: '分页模式'
        },
        background: {
            title: '背景设置',
            opacity: '背景透明度',
            opacityHint: '调整背景的透明度,100%为完全不透明',
            patternIntensity: '图案透明度',
            patternIntensityHint: '调整背景图案线条的明暗程度',
            preference: '背景图案偏好',
            preferenceHint: '选择在属性栏中显示的图案'
        },
        announcement: {
            title: '公告'
        },
        more: {
            title: '更多设置',
            showTimeDisplay: '显示时间和日期',
            showTimeDisplayHint: '在右上角显示当前时间和日期'
        },
        time: {
            title: '时间显示设置',
            showDate: '显示日期',
            showTime: '显示时间',
            timezone: '时区',
            timezoneHint: '选择要显示的时区',
            timeFormat: '时间格式',
            timeFormatHint: '选择时间的显示格式',
            timeFormat12: '12小时制 (上午/下午)',
            timeFormat24: '24小时制',
            dateFormat: '日期格式',
            dateFormatHint: '选择日期的显示格式',
            dateFormatYMD: '年-月-日 (2024-01-01)',
            dateFormatMDY: '月-日-年 (01-01-2024)',
            dateFormatDMY: '日-月-年 (01-01-2024)',
            dateFormatChinese: '中文 (2024年1月1日)',
            colorSettings: '颜色设置',
            colorSettingsHint: '设置时间显示的字体和背景颜色',
            colorHint: '设置时间显示的字体和背景颜色',
            textColor: '字体颜色',
            bgColor: '背景颜色',
            fontSize: '字体大小',
            fontSizeHint: '调整时间显示的字体大小',
            opacity: '透明度',
            opacityHint: '调整时间显示的透明度',
            fullscreenMode: '全屏模式',
            fullscreenModeHint: '选择如何触发时间全屏显示',
            fullscreenDisabled: '关闭',
            fullscreenSingle: '单击',
            fullscreenDouble: '双击',
            fullscreenFontSize: '全屏字体大小',
            fullscreenFontSizeHint: '调整全屏时间显示的字体大小，范围10%-85%',
            customColor: '自定义颜色',
            displayOptions: '显示选项'
        },
        about: {
            title: '关于 Aboard',
            version: '版本',
            description: 'Aboard 是一款简约而强大的白板应用，专为创意工作和高效记录而设计。',
            features: '主要特性',
            feature1: '流畅的绘图体验',
            feature2: '丰富的笔触类型',
            feature3: '灵活的橡皮擦工具',
            feature4: '丰富的背景图案（点阵、方格、田字格、英语四线格等）',
            feature5: '支持导出为PNG图片',
            feature6: '撤销/重做功能',
            feature7: '完整的触控支持',
            feature8: '全屏模式',
            feature9: '自动保存',
            feature10: '多语言支持',
            license: '开源协议',
            github: 'GitHub 仓库'
        }
    },

    // Feature Area
    features: {
        title: '小功能',
        moreFeatures: '更多功能',
        time: '时间',
        timer: '计时'
    },

    // Time Display
    timeDisplay: {
        title: '时间显示',
        settingsTitle: '时间显示设置',
        options: '时间显示选项',
        showDate: '显示日期',
        showTime: '显示时间',
        settings: '设置',
        displayOptions: '显示选项',
        dateAndTime: '日期和时间',
        dateOnly: '仅日期',
        timeOnly: '仅时间',
        timezone: '时区',
        timeFormat: '时间格式',
        dateFormat: '日期格式',
        colorSettings: '颜色设置',
        textColor: '字体颜色',
        bgColor: '背景颜色',
        fontSize: '字体大小',
        opacity: '透明度',
        fullscreenMode: '全屏模式',
        fullscreenFontSize: '全屏字体大小',
        fullscreenSliderLabel: '字体大小调节 (10%-85%)',
        customColor: '自定义颜色',
        transparent: '透明'
    },

    // Timer
    timer: {
        title: '计时器设置',
        mode: '模式',
        countdown: '倒计时',
        stopwatch: '正计时',
        duration: '计时时长（分钟）',
        hours: '时',
        minutes: '分',
        seconds: '秒',
        title: '标题',
        titlePlaceholder: '请输入计时器标题',
        fontSettings: '字体设置',
        fontSize: '字体大小',
        adjustColor: '调整颜色',
        colorSettings: '颜色设置',
        textColor: '字体颜色',
        bgColor: '背景颜色',
        colors: {
            black: '黑色',
            white: '白色',
            blue: '蓝色',
            red: '红色',
            green: '绿色',
            yellow: '黄色',
            orange: '橙色',
            purple: '紫色',
            transparent: '透明'
        },
        customColor: '自定义颜色',
        start: '开始',
        adjust: '调整',
        continue: '继续',
        pause: '暂停',
        reset: '重置',
        stop: '停止'
    },

    // Timezone names
    timezones: {
        'china': '中国 (UTC+8)',
        'newyork': '纽约 (UTC-5/-4)',
        'losangeles': '洛杉矶 (UTC-8/-7)',
        'chicago': '芝加哥 (UTC-6/-5)',
        'london': '伦敦 (UTC+0/+1)',
        'paris': '巴黎 (UTC+1/+2)',
        'berlin': '柏林 (UTC+1/+2)',
        'tokyo': '东京 (UTC+9)',
        'seoul': '首尔 (UTC+9)',
        'hongkong': '香港 (UTC+8)',
        'singapore': '新加坡 (UTC+8)',
        'dubai': '迪拜 (UTC+4)',
        'sydney': '悉尼 (UTC+10/+11)',
        'auckland': '奥克兰 (UTC+12/+13)',
        'utc': 'UTC (协调世界时)'
    },

    // Welcome Dialog
    welcome: {
        title: '欢迎使用 Aboard',
        content: `欢迎使用 Aboard 白板应用！

使用提示：
• 点击底部工具栏选择不同工具进行绘画
• 使用 Ctrl+Z 撤销，Ctrl+Y 重做
• 点击右上角缩放按钮或使用鼠标滚轮缩放画布
• 点击背景按钮可以选择不同的背景图案
• 在设置中可以切换无限画布或分页模式
• 支持触控和鼠标操作

祝您使用愉快！`,
        confirm: '确定',
        noShowAgain: '不再弹出'
    },

    // Color names
    colors: {
        black: '黑色',
        red: '红色',
        blue: '蓝色',
        green: '绿色',
        yellow: '黄色',
        orange: '橙色',
        purple: '紫色',
        white: '白色',
        transparent: '透明'
    },

    // Days of week
    days: {
        sunday: '星期日',
        monday: '星期一',
        tuesday: '星期二',
        wednesday: '星期三',
        thursday: '星期四',
        friday: '星期五',
        saturday: '星期六'
    }
};
