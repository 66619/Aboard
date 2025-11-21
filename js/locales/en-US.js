/**
 * English (United States) - English
 * Language file for Aboard application
 */

window.translations = {
    // Common
    common: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        close: 'Close',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        remove: 'Remove',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        apply: 'Apply',
        reset: 'Reset'
    },

    // App Title
    app: {
        title: 'Aboard - Minimalist Whiteboard',
        name: 'Aboard'
    },

    // Toolbar
    toolbar: {
        undo: 'Undo',
        redo: 'Redo',
        pen: 'Pen',
        move: 'Move',
        eraser: 'Eraser',
        clear: 'Clear',
        background: 'Background',
        more: 'More',
        settings: 'Settings',
        export: 'Export Canvas',
        zoomOut: 'Zoom Out (-)',
        zoomIn: 'Zoom In (+)',
        fullscreen: 'Fullscreen (F11)',
        zoomPlaceholder: 'Zoom Level (Enter Percentage)'
    },

    // Tools
    tools: {
        pen: {
            title: 'Pen',
            type: 'Pen Type',
            normal: 'Normal Pen',
            pencil: 'Pencil',
            ballpoint: 'Ballpoint',
            fountain: 'Fountain Pen',
            brush: 'Brush',
            colorAndSize: 'Color & Size',
            colorPicker: 'Color Picker'
        },
        eraser: {
            title: 'Eraser',
            type: 'Eraser Type',
            normal: 'Normal Eraser',
            pixel: 'Pixel Eraser',
            size: 'Eraser Size',
            sizeLabel: 'Eraser Size',
            shape: 'Shape',
            shapeCircle: 'Circle',
            shapeRectangle: 'Rectangle'
        },
        clear: {
            title: 'Clear Canvas',
            confirm: 'Confirm Clear',
            message: 'Are you sure you want to clear the canvas? This action cannot be undone.'
        }
    },

    // Background
    background: {
        title: 'Background',
        color: 'Background Color',
        pattern: 'Background Pattern',
        blank: 'Blank',
        none: 'None',
        dots: 'Dots',
        grid: 'Grid',
        lines: 'Lines',
        tianzige: 'Tianzige (Chinese)',
        english4line: 'English 4-Line',
        musicStaff: 'Music Staff',
        coordinate: 'Coordinate',
        image: 'Image',
        density: 'Density',
        size: 'Size',
        opacity: 'Background Opacity',
        opacityHint: 'Adjust background transparency, 100% is fully opaque',
        contrast: 'Contrast',
        contrastHint: 'Adjust the darkness of background pattern lines',
        preference: 'Background Pattern Preference'
    },

    // Page Navigation
    page: {
        previous: 'Previous',
        next: 'Next',
        jumpPlaceholder: 'Enter page number',
        of: ' / ',
        newPage: 'New Page'
    },

    // Settings
    settings: {
        title: 'Settings',
        tabs: {
            general: 'General',
            display: 'Display',
            pen: 'Pen',
            eraser: 'Eraser',
            canvas: 'Canvas',
            background: 'Background',
            about: 'About',
            announcement: 'Announcement',
            more: 'More'
        },
        display: {
            title: 'Display Settings',
            theme: 'Theme',
            themeHint: 'Choose application theme',
            themeColor: 'Theme Color',
            showZoomControls: 'Show Zoom Controls',
            showZoomControlsHint: 'Show zoom controls above the canvas',
            showFullscreenBtn: 'Show Fullscreen Button',
            showFullscreenBtnHint: 'Show fullscreen button next to zoom controls',
            toolbarSize: 'Toolbar Size',
            toolbarSizeHint: 'Adjust the size of the bottom toolbar',
            configScale: 'Config Panel Size',
            configScaleHint: 'Adjust the size of popup config panels',
            themeColorHint: 'Color for selected toolbar items',
            colorOptions: {
                blue: 'Blue',
                purple: 'Purple',
                green: 'Green',
                orange: 'Orange',
                red: 'Red',
                pink: 'Pink',
                cyan: 'Cyan',
                yellow: 'Yellow'
            },
            colorPicker: 'Color Picker'
        },
        general: {
            title: 'General Settings',
            language: 'Language',
            languageHint: 'Choose interface language',
            globalFont: 'Global Font',
            globalFontHint: 'Choose the font used in the application',
            edgeSnap: 'Enable Edge Snapping',
            edgeSnapHint: 'Automatically snap control panels to screen edges when dragging',
            controlPosition: 'Control Button Position',
            controlPositionHint: 'Choose where to display zoom and pagination controls on the screen',
            positionTopLeft: 'Top Left',
            positionTopRight: 'Top Right',
            positionBottomLeft: 'Bottom Left',
            positionBottomRight: 'Bottom Right',
            canvasMode: 'Canvas Mode',
            canvasModeHint: 'Choose between pagination or infinite canvas mode',
            pagination: 'Pagination',
            infiniteCanvas: 'Infinite Canvas',
            autoSave: 'Auto Save',
            autoSaveHint: 'Automatically save your drawings periodically'
        },
        canvas: {
            title: 'Canvas Settings',
            mode: 'Canvas Mode',
            modeHint: 'Choose the canvas display mode',
            size: 'Canvas Size',
            sizeHint: 'Choose preset sizes or customize canvas aspect ratio and size',
            infiniteCanvas: 'Infinite Canvas',
            pagination: 'Pagination Mode'
        },
        background: {
            title: 'Background Settings',
            opacity: 'Background Opacity',
            opacityHint: 'Adjust background transparency, 100% is fully opaque',
            patternIntensity: 'Pattern Intensity',
            patternIntensityHint: 'Adjust the darkness of background pattern lines',
            preference: 'Background Pattern Preference',
            preferenceHint: 'Choose which patterns to display in the config panel'
        },
        announcement: {
            title: 'Announcement'
        },
        more: {
            title: 'More Settings',
            showTimeDisplay: 'Show Time and Date',
            showTimeDisplayHint: 'Display current time and date in the top right corner'
        },
        time: {
            title: 'Time Display Settings',
            showDate: 'Show Date',
            showTime: 'Show Time',
            timezone: 'Timezone',
            timezoneHint: 'Choose the timezone to display',
            timeFormat: 'Time Format',
            timeFormatHint: 'Choose the time display format',
            timeFormat12: '12-hour (AM/PM)',
            timeFormat24: '24-hour',
            dateFormat: 'Date Format',
            dateFormatHint: 'Choose the date display format',
            dateFormatYMD: 'Year-Month-Day (2024-01-01)',
            dateFormatMDY: 'Month-Day-Year (01-01-2024)',
            dateFormatDMY: 'Day-Month-Year (01-01-2024)',
            dateFormatChinese: 'Chinese (2024年1月1日)',
            colorSettings: 'Color Settings',
            colorSettingsHint: 'Set font and background colors for time display',
            colorHint: 'Set font and background colors for time display',
            textColor: 'Text Color',
            bgColor: 'Background Color',
            fontSize: 'Font Size',
            fontSizeHint: 'Adjust time display font size',
            opacity: 'Opacity',
            opacityHint: 'Adjust time display opacity',
            fullscreenMode: 'Fullscreen Mode',
            fullscreenModeHint: 'Choose how to trigger fullscreen time display',
            fullscreenDisabled: 'Disabled',
            fullscreenSingle: 'Single Click',
            fullscreenDouble: 'Double Click',
            fullscreenFontSize: 'Fullscreen Font Size',
            fullscreenFontSizeHint: 'Adjust fullscreen time display font size, range 10%-85%',
            customColor: 'Custom Color',
            displayOptions: 'Display Options'
        },
        about: {
            title: 'About Aboard',
            version: 'Version',
            description: 'Aboard is a minimalist yet powerful whiteboard application designed for creative work and efficient note-taking.',
            features: 'Key Features',
            feature1: 'Smooth drawing experience',
            feature2: 'Rich pen types',
            feature3: 'Flexible eraser tool',
            feature4: 'Rich background patterns (dots, grid, Tianzige, English 4-line, etc.)',
            feature5: 'Export to PNG images',
            feature6: 'Undo/Redo functionality',
            feature7: 'Full touch support',
            feature8: 'Fullscreen mode',
            feature9: 'Auto-save',
            feature10: 'Multi-language support',
            license: 'Open Source License',
            github: 'GitHub Repository'
        }
    },

    // Feature Area
    features: {
        title: 'Features',
        moreFeatures: 'More Features',
        time: 'Time',
        timer: 'Timer'
    },

    // Time Display
    timeDisplay: {
        title: 'Time Display',
        settingsTitle: 'Time Display Settings',
        options: 'Time Display Options',
        showDate: 'Show Date',
        showTime: 'Show Time',
        settings: 'Settings',
        displayOptions: 'Display Options',
        dateAndTime: 'Date and Time',
        dateOnly: 'Date Only',
        timeOnly: 'Time Only',
        timezone: 'Timezone',
        timeFormat: 'Time Format',
        dateFormat: 'Date Format',
        colorSettings: 'Color Settings',
        textColor: 'Text Color',
        bgColor: 'Background Color',
        fontSize: 'Font Size',
        opacity: 'Opacity',
        fullscreenMode: 'Fullscreen Mode',
        fullscreenFontSize: 'Fullscreen Font Size',
        fullscreenSliderLabel: 'Font Size Adjustment (10%-85%)',
        customColor: 'Custom Color',
        transparent: 'Transparent'
    },

    // Timer
    timer: {
        title: 'Timer Settings',
        mode: 'Mode',
        countdown: 'Countdown',
        stopwatch: 'Stopwatch',
        duration: 'Duration (minutes)',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        title: 'Title',
        titlePlaceholder: 'Enter timer title',
        fontSettings: 'Font Settings',
        fontSize: 'Font Size',
        adjustColor: 'Adjust Color',
        colorSettings: 'Color Settings',
        textColor: 'Text Color',
        bgColor: 'Background Color',
        colors: {
            black: 'Black',
            white: 'White',
            blue: 'Blue',
            red: 'Red',
            green: 'Green',
            yellow: 'Yellow',
            orange: 'Orange',
            purple: 'Purple',
            transparent: 'Transparent'
        },
        customColor: 'Custom Color',
        start: 'Start',
        adjust: 'Adjust',
        continue: 'Continue',
        pause: 'Pause',
        reset: 'Reset',
        stop: 'Stop'
    },

    // Timezone names
    timezones: {
        'china': 'China (UTC+8)',
        'newyork': 'New York (UTC-5/-4)',
        'losangeles': 'Los Angeles (UTC-8/-7)',
        'chicago': 'Chicago (UTC-6/-5)',
        'london': 'London (UTC+0/+1)',
        'paris': 'Paris (UTC+1/+2)',
        'berlin': 'Berlin (UTC+1/+2)',
        'tokyo': 'Tokyo (UTC+9)',
        'seoul': 'Seoul (UTC+9)',
        'hongkong': 'Hong Kong (UTC+8)',
        'singapore': 'Singapore (UTC+8)',
        'dubai': 'Dubai (UTC+4)',
        'sydney': 'Sydney (UTC+10/+11)',
        'auckland': 'Auckland (UTC+12/+13)',
        'utc': 'UTC (Coordinated Universal Time)'
    },

    // Welcome Dialog
    welcome: {
        title: 'Welcome to Aboard',
        content: `Welcome to Aboard Whiteboard Application!

Usage Tips:
• Click the toolbar at the bottom to select different drawing tools
• Use Ctrl+Z to undo, Ctrl+Y to redo
• Click zoom buttons in the top right or use mouse wheel to zoom canvas
• Click the background button to choose different background patterns
• Switch between infinite canvas or pagination mode in settings
• Supports both touch and mouse input

Enjoy your creative work!`,
        confirm: 'OK',
        noShowAgain: 'Don\'t show again'
    },

    // Color names
    colors: {
        black: 'Black',
        red: 'Red',
        blue: 'Blue',
        green: 'Green',
        yellow: 'Yellow',
        orange: 'Orange',
        purple: 'Purple',
        white: 'White',
        transparent: 'Transparent'
    },

    // Days of week
    days: {
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday'
    }
};
