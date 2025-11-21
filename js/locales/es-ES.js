/**
 * Spanish (Spain) - Español
 * Language file for Aboard application
 */

window.translations = {
    // Common
    common: {
        confirm: 'Confirmar',
        cancel: 'Cancelar',
        close: 'Cerrar',
        save: 'Guardar',
        delete: 'Eliminar',
        edit: 'Editar',
        add: 'Añadir',
        remove: 'Quitar',
        yes: 'Sí',
        no: 'No',
        ok: 'OK',
        apply: 'Aplicar',
        reset: 'Restablecer'
    },

    // App Title
    app: {
        title: 'Aboard - Pizarra Minimalista',
        name: 'Aboard'
    },

    // Toolbar
    toolbar: {
        undo: 'Deshacer',
        redo: 'Rehacer',
        pen: 'Bolígrafo',
        move: 'Mover',
        eraser: 'Borrador',
        clear: 'Borrar',
        background: 'Fondo',
        more: 'Más',
        settings: 'Configuración',
        export: 'Exportar lienzo',
        zoomOut: 'Alejar (-)',
        zoomIn: 'Acercar (+)',
        fullscreen: 'Pantalla completa (F11)',
        zoomPlaceholder: 'Nivel de zoom (Introducir porcentaje)'
    },

    // Tools
    tools: {
        pen: {
            title: 'Bolígrafo',
            type: 'Tipo de bolígrafo',
            normal: 'Bolígrafo normal',
            pencil: 'Lápiz',
            ballpoint: 'Bolígrafo de bola',
            fountain: 'Pluma estilográfica',
            brush: 'Pincel',
            colorAndSize: 'Color y tamaño',
            colorPicker: 'Selector de color'
        },
        eraser: {
            title: 'Borrador',
            type: 'Tipo de borrador',
            normal: 'Borrador normal',
            pixel: 'Borrador de píxel',
            size: 'Tamaño del borrador',
            shapeCircle: 'Círculo',
            shapeRectangle: 'Rectángulo'
        },
        clear: {
            title: 'Borrar lienzo',
            confirm: 'Confirmar borrado',
            message: '¿Está seguro de que desea borrar el lienzo? Esta acción no se puede deshacer.'
        }
    },

    // Background
    background: {
        title: 'Fondo',
        color: 'Color de fondo',
        pattern: 'Patrón de fondo',
        blank: 'En blanco',
        none: 'Ninguno',
        dots: 'Puntos',
        grid: 'Cuadrícula',
        lines: 'Líneas',
        tianzige: 'Tianzige (Chino)',
        english4line: 'Línea inglesa 4',
        musicStaff: 'Pentagrama',
        coordinate: 'Coordenadas',
        image: 'Imagen',
        opacity: 'Opacidad del fondo',
        opacityHint: 'Ajustar la transparencia del fondo, 100% es completamente opaco',
        contrast: 'Contraste',
        contrastHint: 'Ajustar la oscuridad de las líneas del patrón de fondo',
        preference: 'Preferencia de patrón de fondo'
    },

    // Page Navigation
    page: {
        previous: 'Anterior',
        next: 'Siguiente',
        jumpPlaceholder: 'Introducir número de página',
        of: ' / ',
        newPage: 'Nueva página'
    },

    // Settings
    settings: {
        title: 'Configuración',
        tabs: {
            display: 'Pantalla',
            pen: 'Bolígrafo',
            eraser: 'Borrador',
            background: 'Fondo',
            more: 'Más'
        },
        display: {
            title: 'Configuración de pantalla',
            theme: 'Tema',
            themeHint: 'Elegir tema de la aplicación',
            themeColor: 'Color del tema',
            colorOptions: {
                blue: 'Azul',
                purple: 'Morado',
                green: 'Verde',
                orange: 'Naranja',
                red: 'Rojo',
                pink: 'Rosa',
                cyan: 'Cian',
                yellow: 'Amarillo'
            },
            colorPicker: 'Selector de color'
        },
        general: {
            title: 'Configuración general',
            language: 'Idioma',
            languageHint: 'Elegir idioma de la interfaz',
            canvasMode: 'Modo de lienzo',
            canvasModeHint: 'Elegir entre el modo de paginación o lienzo infinito',
            pagination: 'Paginación',
            infiniteCanvas: 'Lienzo infinito',
            autoSave: 'Guardado automático',
            autoSaveHint: 'Guardar automáticamente sus dibujos periódicamente'
        },
        time: {
            title: 'Configuración de visualización de hora',
            showDate: 'Mostrar fecha',
            showTime: 'Mostrar hora',
            timezone: 'Zona horaria',
            timeFormat: 'Formato de hora',
            timeFormat12: '12 horas (AM/PM)',
            timeFormat24: '24 horas',
            dateFormat: 'Formato de fecha',
            dateFormatYMD: 'Año-Mes-Día (2024-01-01)',
            dateFormatMDY: 'Mes-Día-Año (01-01-2024)',
            dateFormatDMY: 'Día-Mes-Año (01-01-2024)',
            dateFormatChinese: 'Chino (2024年1月1日)',
            colorSettings: 'Configuración de color',
            colorHint: 'Establecer colores de fuente y fondo para la visualización de hora',
            textColor: 'Color de texto',
            bgColor: 'Color de fondo',
            fontSize: 'Tamaño de fuente',
            opacity: 'Opacidad',
            fullscreenMode: 'Modo de pantalla completa',
            fullscreenDisabled: 'Desactivado',
            fullscreenSingle: 'Clic simple',
            fullscreenDouble: 'Doble clic',
            fullscreenFontSize: 'Tamaño de fuente de pantalla completa',
            fullscreenFontSizeHint: 'Ajustar el tamaño de fuente de la visualización de hora en pantalla completa, rango 10%-85%',
            customColor: 'Color personalizado'
        },
        about: {
            title: 'Acerca de Aboard',
            version: 'Versión',
            description: 'Aboard es una aplicación de pizarra minimalista pero potente, diseñada para trabajo creativo y toma de notas eficiente.',
            features: 'Características principales',
            feature1: 'Experiencia de dibujo suave',
            feature2: 'Tipos de bolígrafo variados',
            feature3: 'Herramienta de borrador flexible',
            feature4: 'Patrones de fondo ricos (puntos, cuadrícula, Tianzige, línea inglesa 4, etc.)',
            feature5: 'Exportar a imágenes PNG',
            feature6: 'Funcionalidad Deshacer/Rehacer',
            feature7: 'Soporte táctil completo',
            feature8: 'Modo de pantalla completa',
            feature9: 'Guardado automático',
            feature10: 'Soporte multiidioma',
            license: 'Licencia de código abierto',
            github: 'Repositorio de GitHub'
        }
    },

    // Feature Area
    features: {
        title: 'Características',
        time: 'Hora',
        timer: 'Temporizador'
    },

    // Time Display
    timeDisplay: {
        options: 'Opciones de visualización de hora',
        showDate: 'Mostrar fecha',
        showTime: 'Mostrar hora',
        settings: 'Configuración',
        displayOptions: 'Opciones de visualización',
        dateAndTime: 'Fecha y hora',
        dateOnly: 'Solo fecha',
        timeOnly: 'Solo hora'
    },

    // Timer
    timer: {
        title: 'Configuración del temporizador',
        mode: 'Modo',
        countdown: 'Cuenta regresiva',
        stopwatch: 'Cronómetro',
        duration: 'Duración (minutos)',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
        title: 'Título',
        titlePlaceholder: 'Introducir título del temporizador',
        fontSettings: 'Configuración de fuente',
        fontSize: 'Tamaño de fuente',
        adjustColor: 'Ajustar color',
        colorSettings: 'Configuración de color',
        textColor: 'Color de texto',
        bgColor: 'Color de fondo',
        colors: {
            black: 'Negro',
            white: 'Blanco',
            blue: 'Azul',
            red: 'Rojo',
            green: 'Verde',
            yellow: 'Amarillo',
            orange: 'Naranja',
            purple: 'Morado',
            transparent: 'Transparente'
        },
        customColor: 'Color personalizado',
        start: 'Iniciar',
        adjust: 'Ajustar',
        continue: 'Continuar',
        pause: 'Pausar',
        reset: 'Restablecer',
        stop: 'Detener'
    },

    // Timezone names
    timezones: {
        'china': 'China (UTC+8)',
        'newyork': 'Nueva York (UTC-5/-4)',
        'losangeles': 'Los Ángeles (UTC-8/-7)',
        'chicago': 'Chicago (UTC-6/-5)',
        'london': 'Londres (UTC+0/+1)',
        'paris': 'París (UTC+1/+2)',
        'berlin': 'Berlín (UTC+1/+2)',
        'tokyo': 'Tokio (UTC+9)',
        'seoul': 'Seúl (UTC+9)',
        'hongkong': 'Hong Kong (UTC+8)',
        'singapore': 'Singapur (UTC+8)',
        'dubai': 'Dubái (UTC+4)',
        'sydney': 'Sídney (UTC+10/+11)',
        'auckland': 'Auckland (UTC+12/+13)',
        'utc': 'UTC (Tiempo Universal Coordinado)'
    },

    // Welcome Dialog
    welcome: {
        title: 'Bienvenido a Aboard',
        content: `¡Bienvenido a la aplicación de pizarra Aboard!

Consejos de uso:
• Haga clic en la barra de herramientas en la parte inferior para seleccionar diferentes herramientas de dibujo
• Use Ctrl+Z para deshacer, Ctrl+Y para rehacer
• Haga clic en los botones de zoom en la parte superior derecha o use la rueda del ratón para hacer zoom en el lienzo
• Haga clic en el botón de fondo para elegir diferentes patrones de fondo
• Cambie entre el modo de lienzo infinito o paginación en la configuración
• Admite entrada táctil y de ratón

¡Disfruta de tu trabajo creativo!`,
        confirm: 'OK',
        noShowAgain: 'No mostrar de nuevo'
    },

    // Color names
    colors: {
        black: 'Negro',
        red: 'Rojo',
        blue: 'Azul',
        green: 'Verde',
        yellow: 'Amarillo',
        orange: 'Naranja',
        purple: 'Morado',
        white: 'Blanco',
        transparent: 'Transparente'
    },

    // Days of week
    days: {
        sunday: 'Domingo',
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado'
    }
};
