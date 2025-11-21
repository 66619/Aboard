/**
 * Korean (South Korea) - 한국어
 * Language file for Aboard application
 */

window.translations = {
    // Common
    common: {
        confirm: '확인',
        cancel: '취소',
        close: '닫기',
        save: '저장',
        delete: '삭제',
        edit: '편집',
        add: '추가',
        remove: '제거',
        yes: '예',
        no: '아니오',
        ok: '확인',
        apply: '적용',
        reset: '재설정'
    },

    // App Title
    app: {
        title: 'Aboard - 미니멀 화이트보드',
        name: 'Aboard'
    },

    // Toolbar
    toolbar: {
        undo: '실행 취소',
        redo: '다시 실행',
        pen: '펜',
        move: '이동',
        eraser: '지우개',
        clear: '지우기',
        background: '배경',
        more: '더보기',
        settings: '설정',
        export: '캔버스 내보내기',
        zoomOut: '축소 (-)',
        zoomIn: '확대 (+)',
        fullscreen: '전체 화면 (F11)',
        zoomPlaceholder: '확대/축소 수준 (백분율 입력)'
    },

    // Tools
    tools: {
        pen: {
            title: '펜',
            type: '펜 유형',
            normal: '일반 펜',
            pencil: '연필',
            ballpoint: '볼펜',
            fountain: '만년필',
            brush: '붓',
            colorAndSize: '색상 및 크기',
            colorPicker: '색상 선택기'
        },
        eraser: {
            title: '지우개',
            type: '지우개 유형',
            normal: '일반 지우개',
            pixel: '픽셀 지우개',
            size: '지우개 크기',
            shapeCircle: '원형',
            shapeRectangle: '사각형'
        },
        clear: {
            title: '캔버스 지우기',
            confirm: '지우기 확인',
            message: '캔버스를 지우시겠습니까? 이 작업은 취소할 수 없습니다.'
        }
    },

    // Background
    background: {
        title: '배경',
        color: '배경색',
        pattern: '배경 패턴',
        blank: '빈 화면',
        none: '없음',
        dots: '점',
        grid: '격자',
        lines: '선',
        tianzige: '田字格 (중국)',
        english4line: '영어 4선',
        musicStaff: '오선보',
        coordinate: '좌표계',
        image: '이미지',
        opacity: '배경 불투명도',
        opacityHint: '배경 투명도를 조정합니다. 100%는 완전 불투명',
        contrast: '대비',
        contrastHint: '배경 패턴 선의 명암을 조정합니다',
        preference: '배경 패턴 기본 설정'
    },

    // Page Navigation
    page: {
        previous: '이전',
        next: '다음',
        jumpPlaceholder: '페이지 번호 입력',
        of: ' / ',
        newPage: '새 페이지'
    },

    // Settings
    settings: {
        title: '설정',
        tabs: {
            general: '일반',
            display: '표시',
            pen: '펜',
            eraser: '지우개',
            canvas: '캔버스',
            background: '배경',
            about: '정보',
            announcement: '공지사항',
            more: '더보기'
        },
        display: {
            title: '표시 설정',
            theme: '테마',
            themeHint: '애플리케이션 테마 선택',
            themeColor: '테마 색상',
            colorOptions: {
                blue: '파란색',
                purple: '보라색',
                green: '녹색',
                orange: '주황색',
                red: '빨간색',
                pink: '분홍색',
                cyan: '청록색',
                yellow: '노란색'
            },
            colorPicker: '색상 선택기'
        },
        general: {
            title: '일반 설정',
            language: '언어',
            languageHint: '인터페이스 언어 선택',
            canvasMode: '캔버스 모드',
            canvasModeHint: '페이지 매김 또는 무한 캔버스 모드 선택',
            pagination: '페이지 매김',
            infiniteCanvas: '무한 캔버스',
            autoSave: '자동 저장',
            autoSaveHint: '주기적으로 그림을 자동 저장'
        },
        time: {
            title: '시간 표시 설정',
            showDate: '날짜 표시',
            showTime: '시간 표시',
            timezone: '시간대',
            timeFormat: '시간 형식',
            timeFormat12: '12시간제 (오전/오후)',
            timeFormat24: '24시간제',
            dateFormat: '날짜 형식',
            dateFormatYMD: '년-월-일 (2024-01-01)',
            dateFormatMDY: '월-일-년 (01-01-2024)',
            dateFormatDMY: '일-월-년 (01-01-2024)',
            dateFormatChinese: '중국어 (2024年1月1日)',
            colorSettings: '색상 설정',
            colorHint: '시간 표시를 위한 글꼴 및 배경색 설정',
            textColor: '텍스트 색상',
            bgColor: '배경색',
            fontSize: '글꼴 크기',
            opacity: '불투명도',
            fullscreenMode: '전체 화면 모드',
            fullscreenDisabled: '비활성화',
            fullscreenSingle: '한 번 클릭',
            fullscreenDouble: '두 번 클릭',
            fullscreenFontSize: '전체 화면 글꼴 크기',
            fullscreenFontSizeHint: '전체 화면 시간 표시 글꼴 크기 조정, 범위 10%-85%',
            customColor: '사용자 정의 색상'
        },
        about: {
            title: 'Aboard 정보',
            version: '버전',
            description: 'Aboard는 창의적인 작업과 효율적인 메모 작성을 위해 설계된 미니멀하면서도 강력한 화이트보드 애플리케이션입니다.',
            features: '주요 기능',
            feature1: '부드러운 그리기 경험',
            feature2: '다양한 펜 유형',
            feature3: '유연한 지우개 도구',
            feature4: '풍부한 배경 패턴 (점, 격자, 田字格, 영어 4선 등)',
            feature5: 'PNG 이미지로 내보내기',
            feature6: '실행 취소/다시 실행 기능',
            feature7: '완전한 터치 지원',
            feature8: '전체 화면 모드',
            feature9: '자동 저장',
            feature10: '다국어 지원',
            license: '오픈 소스 라이선스',
            github: 'GitHub 저장소'
        }
    },

    // Feature Area
    features: {
        title: '기능',
        time: '시간',
        timer: '타이머'
    },

    // Time Display
    timeDisplay: {
        options: '시간 표시 옵션',
        showDate: '날짜 표시',
        showTime: '시간 표시',
        settings: '설정',
        displayOptions: '표시 옵션',
        dateAndTime: '날짜 및 시간',
        dateOnly: '날짜만',
        timeOnly: '시간만'
    },

    // Timer
    timer: {
        title: '타이머 설정',
        mode: '모드',
        countdown: '카운트다운',
        stopwatch: '스톱워치',
        duration: '기간 (분)',
        hours: '시간',
        minutes: '분',
        seconds: '초',
        title: '제목',
        titlePlaceholder: '타이머 제목 입력',
        fontSettings: '글꼴 설정',
        fontSize: '글꼴 크기',
        adjustColor: '색상 조정',
        colorSettings: '색상 설정',
        textColor: '텍스트 색상',
        bgColor: '배경색',
        colors: {
            black: '검정',
            white: '흰색',
            blue: '파란색',
            red: '빨간색',
            green: '녹색',
            yellow: '노란색',
            orange: '주황색',
            purple: '보라색',
            transparent: '투명'
        },
        customColor: '사용자 정의 색상',
        start: '시작',
        adjust: '조정',
        continue: '계속',
        pause: '일시 정지',
        reset: '재설정',
        stop: '정지'
    },

    // Timezone names
    timezones: {
        'china': '중국 (UTC+8)',
        'newyork': '뉴욕 (UTC-5/-4)',
        'losangeles': '로스앤젤레스 (UTC-8/-7)',
        'chicago': '시카고 (UTC-6/-5)',
        'london': '런던 (UTC+0/+1)',
        'paris': '파리 (UTC+1/+2)',
        'berlin': '베를린 (UTC+1/+2)',
        'tokyo': '도쿄 (UTC+9)',
        'seoul': '서울 (UTC+9)',
        'hongkong': '홍콩 (UTC+8)',
        'singapore': '싱가포르 (UTC+8)',
        'dubai': '두바이 (UTC+4)',
        'sydney': '시드니 (UTC+10/+11)',
        'auckland': '오클랜드 (UTC+12/+13)',
        'utc': 'UTC (협정 세계시)'
    },

    // Welcome Dialog
    welcome: {
        title: 'Aboard에 오신 것을 환영합니다',
        content: `Aboard 화이트보드 애플리케이션에 오신 것을 환영합니다!

사용 팁:
• 하단 도구 모음을 클릭하여 다양한 그리기 도구 선택
• Ctrl+Z로 실행 취소, Ctrl+Y로 다시 실행
• 오른쪽 상단의 확대/축소 버튼을 클릭하거나 마우스 휠을 사용하여 캔버스 확대/축소
• 배경 버튼을 클릭하여 다양한 배경 패턴 선택
• 설정에서 무한 캔버스 또는 페이지 매김 모드로 전환
• 터치 및 마우스 입력 모두 지원

창의적인 작업을 즐기세요!`,
        confirm: '확인',
        noShowAgain: '다시 표시하지 않음'
    },

    // Color names
    colors: {
        black: '검정',
        red: '빨간색',
        blue: '파란색',
        green: '녹색',
        yellow: '노란색',
        orange: '주황색',
        purple: '보라색',
        white: '흰색',
        transparent: '투명'
    },

    // Days of week
    days: {
        sunday: '일요일',
        monday: '월요일',
        tuesday: '화요일',
        wednesday: '수요일',
        thursday: '목요일',
        friday: '금요일',
        saturday: '토요일'
    }
};
