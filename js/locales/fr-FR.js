/**
 * French (France) - Français
 * Language file for Aboard application
 */

window.translations = {
    // Common
    common: {
        confirm: 'Confirmer',
        cancel: 'Annuler',
        close: 'Fermer',
        save: 'Enregistrer',
        delete: 'Supprimer',
        edit: 'Modifier',
        add: 'Ajouter',
        remove: 'Retirer',
        yes: 'Oui',
        no: 'Non',
        ok: 'OK',
        apply: 'Appliquer',
        reset: 'Réinitialiser'
    },

    // App Title
    app: {
        title: 'Aboard - Tableau Blanc Minimaliste',
        name: 'Aboard'
    },

    // Toolbar
    toolbar: {
        undo: 'Annuler',
        redo: 'Rétablir',
        pen: 'Stylo',
        move: 'Déplacer',
        eraser: 'Gomme',
        clear: 'Effacer',
        background: 'Arrière-plan',
        more: 'Plus',
        settings: 'Paramètres',
        export: 'Exporter le canevas',
        zoomOut: 'Dézoomer (-)',
        zoomIn: 'Zoomer (+)',
        fullscreen: 'Plein écran (F11)',
        zoomPlaceholder: 'Niveau de zoom (Entrer pourcentage)'
    },

    // Tools
    tools: {
        pen: {
            title: 'Stylo',
            type: 'Type de stylo',
            normal: 'Stylo normal',
            pencil: 'Crayon',
            ballpoint: 'Stylo à bille',
            fountain: 'Stylo-plume',
            brush: 'Pinceau',
            colorAndSize: 'Couleur et taille',
            colorPicker: 'Sélecteur de couleur'
        },
        eraser: {
            title: 'Gomme',
            type: 'Type de gomme',
            normal: 'Gomme normale',
            pixel: 'Gomme pixel',
            size: 'Taille de la gomme',
            shapeCircle: 'Cercle',
            shapeRectangle: 'Rectangle'
        },
        clear: {
            title: 'Effacer le canevas',
            confirm: 'Confirmer l\'effacement',
            message: 'Êtes-vous sûr de vouloir effacer le canevas ? Cette action ne peut pas être annulée.'
        }
    },

    // Background
    background: {
        title: 'Arrière-plan',
        color: 'Couleur d\'arrière-plan',
        pattern: 'Motif d\'arrière-plan',
        blank: 'Vide',
        none: 'Aucun',
        dots: 'Points',
        grid: 'Grille',
        lines: 'Lignes',
        tianzige: 'Tianzige (Chinois)',
        english4line: 'Ligne anglaise 4',
        musicStaff: 'Portée musicale',
        coordinate: 'Coordonnées',
        image: 'Image',
        opacity: 'Opacité de l\'arrière-plan',
        opacityHint: 'Ajuster la transparence de l\'arrière-plan, 100% est complètement opaque',
        contrast: 'Contraste',
        contrastHint: 'Ajuster l\'obscurité des lignes du motif d\'arrière-plan',
        preference: 'Préférence de motif d\'arrière-plan'
    },

    // Page Navigation
    page: {
        previous: 'Précédent',
        next: 'Suivant',
        jumpPlaceholder: 'Entrer le numéro de page',
        of: ' / ',
        newPage: 'Nouvelle page'
    },

    // Settings
    settings: {
        title: 'Paramètres',
        tabs: {
            display: 'Affichage',
            pen: 'Stylo',
            eraser: 'Gomme',
            background: 'Arrière-plan',
            more: 'Plus'
        },
        display: {
            title: 'Paramètres d\'affichage',
            theme: 'Thème',
            themeHint: 'Choisir le thème de l\'application',
            themeColor: 'Couleur du thème',
            colorOptions: {
                blue: 'Bleu',
                purple: 'Violet',
                green: 'Vert',
                orange: 'Orange',
                red: 'Rouge',
                pink: 'Rose',
                cyan: 'Cyan',
                yellow: 'Jaune'
            },
            colorPicker: 'Sélecteur de couleur'
        },
        general: {
            title: 'Paramètres généraux',
            language: 'Langue',
            languageHint: 'Choisir la langue de l\'interface',
            canvasMode: 'Mode canevas',
            canvasModeHint: 'Choisir entre le mode pagination ou canevas infini',
            pagination: 'Pagination',
            infiniteCanvas: 'Canevas infini',
            autoSave: 'Sauvegarde automatique',
            autoSaveHint: 'Sauvegarder automatiquement vos dessins périodiquement'
        },
        time: {
            title: 'Paramètres d\'affichage de l\'heure',
            showDate: 'Afficher la date',
            showTime: 'Afficher l\'heure',
            timezone: 'Fuseau horaire',
            timeFormat: 'Format de l\'heure',
            timeFormat12: '12 heures (AM/PM)',
            timeFormat24: '24 heures',
            dateFormat: 'Format de date',
            dateFormatYMD: 'Année-Mois-Jour (2024-01-01)',
            dateFormatMDY: 'Mois-Jour-Année (01-01-2024)',
            dateFormatDMY: 'Jour-Mois-Année (01-01-2024)',
            dateFormatChinese: 'Chinois (2024年1月1日)',
            colorSettings: 'Paramètres de couleur',
            colorHint: 'Définir les couleurs de police et d\'arrière-plan pour l\'affichage de l\'heure',
            textColor: 'Couleur du texte',
            bgColor: 'Couleur d\'arrière-plan',
            fontSize: 'Taille de police',
            opacity: 'Opacité',
            fullscreenMode: 'Mode plein écran',
            fullscreenDisabled: 'Désactivé',
            fullscreenSingle: 'Simple clic',
            fullscreenDouble: 'Double clic',
            fullscreenFontSize: 'Taille de police plein écran',
            fullscreenFontSizeHint: 'Ajuster la taille de police de l\'affichage de l\'heure en plein écran, plage 10%-85%',
            customColor: 'Couleur personnalisée'
        },
        about: {
            title: 'À propos d\'Aboard',
            version: 'Version',
            description: 'Aboard est une application de tableau blanc minimaliste mais puissante, conçue pour le travail créatif et la prise de notes efficace.',
            features: 'Fonctionnalités principales',
            feature1: 'Expérience de dessin fluide',
            feature2: 'Types de stylo riches',
            feature3: 'Outil gomme flexible',
            feature4: 'Motifs d\'arrière-plan riches (points, grille, Tianzige, ligne anglaise 4, etc.)',
            feature5: 'Exporter en images PNG',
            feature6: 'Fonctionnalité Annuler/Rétablir',
            feature7: 'Support tactile complet',
            feature8: 'Mode plein écran',
            feature9: 'Sauvegarde automatique',
            feature10: 'Support multilingue',
            license: 'Licence Open Source',
            github: 'Dépôt GitHub'
        }
    },

    // Feature Area
    features: {
        title: 'Fonctionnalités',
        time: 'Heure',
        timer: 'Minuteur'
    },

    // Time Display
    timeDisplay: {
        options: 'Options d\'affichage de l\'heure',
        showDate: 'Afficher la date',
        showTime: 'Afficher l\'heure',
        settings: 'Paramètres',
        displayOptions: 'Options d\'affichage',
        dateAndTime: 'Date et heure',
        dateOnly: 'Date seulement',
        timeOnly: 'Heure seulement'
    },

    // Timer
    timer: {
        title: 'Paramètres du minuteur',
        mode: 'Mode',
        countdown: 'Compte à rebours',
        stopwatch: 'Chronomètre',
        duration: 'Durée (minutes)',
        hours: 'Heures',
        minutes: 'Minutes',
        seconds: 'Secondes',
        title: 'Titre',
        titlePlaceholder: 'Entrer le titre du minuteur',
        fontSettings: 'Paramètres de police',
        fontSize: 'Taille de police',
        adjustColor: 'Ajuster la couleur',
        colorSettings: 'Paramètres de couleur',
        textColor: 'Couleur du texte',
        bgColor: 'Couleur d\'arrière-plan',
        colors: {
            black: 'Noir',
            white: 'Blanc',
            blue: 'Bleu',
            red: 'Rouge',
            green: 'Vert',
            yellow: 'Jaune',
            orange: 'Orange',
            purple: 'Violet',
            transparent: 'Transparent'
        },
        customColor: 'Couleur personnalisée',
        start: 'Démarrer',
        adjust: 'Ajuster',
        continue: 'Continuer',
        pause: 'Pause',
        reset: 'Réinitialiser',
        stop: 'Arrêter'
    },

    // Timezone names
    timezones: {
        'china': 'Chine (UTC+8)',
        'newyork': 'New York (UTC-5/-4)',
        'losangeles': 'Los Angeles (UTC-8/-7)',
        'chicago': 'Chicago (UTC-6/-5)',
        'london': 'Londres (UTC+0/+1)',
        'paris': 'Paris (UTC+1/+2)',
        'berlin': 'Berlin (UTC+1/+2)',
        'tokyo': 'Tokyo (UTC+9)',
        'seoul': 'Séoul (UTC+9)',
        'hongkong': 'Hong Kong (UTC+8)',
        'singapore': 'Singapour (UTC+8)',
        'dubai': 'Dubaï (UTC+4)',
        'sydney': 'Sydney (UTC+10/+11)',
        'auckland': 'Auckland (UTC+12/+13)',
        'utc': 'UTC (Temps universel coordonné)'
    },

    // Welcome Dialog
    welcome: {
        title: 'Bienvenue sur Aboard',
        content: `Bienvenue sur l'application de tableau blanc Aboard !

Conseils d'utilisation :
• Cliquez sur la barre d'outils en bas pour sélectionner différents outils de dessin
• Utilisez Ctrl+Z pour annuler, Ctrl+Y pour rétablir
• Cliquez sur les boutons de zoom en haut à droite ou utilisez la molette de la souris pour zoomer sur le canevas
• Cliquez sur le bouton arrière-plan pour choisir différents motifs d'arrière-plan
• Basculez entre le mode canevas infini ou pagination dans les paramètres
• Support des entrées tactiles et souris

Profitez de votre travail créatif !`,
        confirm: 'OK',
        noShowAgain: 'Ne plus afficher'
    },

    // Color names
    colors: {
        black: 'Noir',
        red: 'Rouge',
        blue: 'Bleu',
        green: 'Vert',
        yellow: 'Jaune',
        orange: 'Orange',
        purple: 'Violet',
        white: 'Blanc',
        transparent: 'Transparent'
    },

    // Days of week
    days: {
        sunday: 'Dimanche',
        monday: 'Lundi',
        tuesday: 'Mardi',
        wednesday: 'Mercredi',
        thursday: 'Jeudi',
        friday: 'Vendredi',
        saturday: 'Samedi'
    }
};
