// Data structure to track selections
const selections = {
    setup: {
        date: { type: 'today', value: new Date().toISOString().split('T')[0] },
        pair: 'XAUUSD',
        direction: 'buy'
    },
    yesterday: {
        day: [],
        fvg: [],
        pd: [],
        m15: [],
        m5: []
    },
    today: {
        fvg: [],
        session: [],
        gap: [],
        rn: [],
        m15: [],
        m5: []
    },
    entry: {
        breakGo: [],
        breakMitiGo: [],
        sweep: [],
        fill: []
    },
    entrySelection: {
        de: [],
        ce: [],
        m5Type: [],
        bos: [],
        m5Age: []
    },
    tpSelection: {
        pd: [],
        ses: [],
        rr: [],
        rn: [],
        oppositeFvg: [],
        oldStructure: []
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSetupPanel();
    setDefaultActiveTimeframes();
    setupEventListeners();
    updateAllPanelSummaries();
    updateCompleteTradeSummary();
    updateHighlightedOptions();
    setupExportFunctionality();
    loadNotesFromStorage();
});

// ============================================
// TRADE SETUP PANEL FUNCTIONALITY
// ============================================
function initSetupPanel() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('trade-date').value = today;
    setupButtonHandlers();
    loadSavedSetup();
}

function setupButtonHandlers() {
    // Date buttons
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const dateType = this.getAttribute('data-date');
            const dateInput = document.getElementById('trade-date');
            
            if (dateType === 'today') {
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                updateSetupSelection('date', { type: 'today', value: today });
            } else if (dateType === 'yesterday') {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                dateInput.value = yesterday.toISOString().split('T')[0];
                updateSetupSelection('date', { type: 'yesterday', value: dateInput.value });
            } else if (dateType === 'custom') {
                dateInput.focus();
                updateSetupSelection('date', { type: 'custom', value: dateInput.value });
            }
        });
    });
    
    // Pair buttons
    document.querySelectorAll('.pair-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.pair-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateSetupSelection('pair', this.getAttribute('data-pair'));
        });
    });
    
    // Direction buttons
    document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateSetupSelection('direction', this.getAttribute('data-direction'));
        });
    });
    
    // Date input change handler
    document.getElementById('trade-date').addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let dateType;
        if (this.value === today) {
            dateType = 'today';
        } else if (this.value === yesterdayStr) {
            dateType = 'yesterday';
        } else {
            dateType = 'custom';
        }
        
        document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.date-btn[data-date="${dateType}"]`).classList.add('active');
        updateSetupSelection('date', { type: dateType, value: this.value });
    });
    
    // Notes input handler
    document.getElementById('trading-notes').addEventListener('input', function() {
        saveNotesToStorage();
    });
}

function updateSetupSelection(type, value) {
    selections.setup[type] = value;
    updateCurrentSetupDisplay();
    updateCompleteTradeSummary();
    saveSetupToStorage();
}

function updateCurrentSetupDisplay() {
    let dateDisplay;
    const dateValue = selections.setup.date.value;
    
    if (selections.setup.date.type === 'today') {
        dateDisplay = 'Today';
    } else if (selections.setup.date.type === 'yesterday') {
        dateDisplay = 'Yesterday';
    } else {
        const date = new Date(dateValue);
        dateDisplay = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    document.getElementById('current-date').textContent = dateDisplay;
    document.getElementById('current-pair').textContent = selections.setup.pair;
    
    const directionElement = document.getElementById('current-direction');
    directionElement.textContent = selections.setup.direction === 'buy' ? 'Buy' : 'Sell';
    directionElement.className = selections.setup.direction === 'buy' ? 
        'setup-value bullish-text' : 'setup-value bearish-text';
}

function saveSetupToStorage() {
    localStorage.setItem('tradingSetup', JSON.stringify(selections.setup));
}

function loadSavedSetup() {
    const savedSetup = localStorage.getItem('tradingSetup');
    if (savedSetup) {
        const setup = JSON.parse(savedSetup);
        selections.setup = setup;
        updateSetupUI(setup);
    }
}

function updateSetupUI(setup) {
    document.getElementById('trade-date').value = setup.date.value;
    
    document.querySelectorAll('.pair-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-pair') === setup.pair);
    });
    
    document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-direction') === setup.direction);
    });
    
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-date') === setup.date.type);
    });
    
    updateCurrentSetupDisplay();
}

// ============================================
// DASHBOARD INITIALIZATION
// ============================================
function setDefaultActiveTimeframes() {
    // Set default active timeframe for yesterday FVG
    const yesterdayFvgTimeframe = document.querySelector('#yesterday-fvg-section .timeframe-btn[data-timeframe="d"]');
    if (yesterdayFvgTimeframe) yesterdayFvgTimeframe.classList.add('active');
    
    // Set default active timeframe for today FVG
    const todayFvgTimeframe = document.querySelector('#today-fvg-section .timeframe-btn[data-timeframe="d"]');
    if (todayFvgTimeframe) todayFvgTimeframe.classList.add('active');
}

function setupEventListeners() {
    // Entry strategy option buttons
    document.querySelectorAll('.entry-option-btn').forEach(btn => {
        btn.addEventListener('click', handleEntryStrategyClick);
    });
    
    // Entry Selection buttons
    document.querySelectorAll('.entry-selection-btn').forEach(btn => {
        btn.addEventListener('click', handleEntrySelectionClick);
    });
    
    // TP Selection buttons
    document.querySelectorAll('.tp-btn').forEach(btn => {
        btn.addEventListener('click', handleTPSelectionClick);
    });
    
    // Yesterday Ytd Day action buttons
    document.querySelectorAll('#yesterday-day-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleYesterdayDayClick);
    });
    
    // Yesterday FVG timeframes
    document.querySelectorAll('#yesterday-fvg-section .timeframe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleTimeframeClick.call(this, '#yesterday-fvg-section');
        });
    });
    
    // Today FVG timeframes
    document.querySelectorAll('#today-fvg-section .timeframe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleTimeframeClick.call(this, '#today-fvg-section');
        });
    });
    
    // Action buttons for yesterday m15 Structure
    document.querySelectorAll('#yesterday-m15-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleYesterdayStructureClick);
    });
    
    // Action buttons for yesterday m5 Structure
    document.querySelectorAll('#yesterday-m5-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleYesterdayStructureClick);
    });
    
    // Action buttons for yesterday FVG
    document.querySelectorAll('#yesterday-fvg-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleYesterdayFVGActionClick);
    });
    
    // Action buttons for yesterday PD
    document.querySelectorAll('#yesterday-pd-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleYesterdayPDActionClick);
    });
    
    // Action buttons for today FVG
    document.querySelectorAll('#today-fvg-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleTodayFVGActionClick);
    });
    
    // Action buttons for today Session
    document.querySelectorAll('#today-session-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleTodaySessionClick);
    });
    
    // Action buttons for today Gap
    document.querySelectorAll('#today-gap-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleTodayGapClick);
    });
    
    // Action buttons for today Round Number
    document.querySelectorAll('#today-round-number-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleTodayRNClick);
    });
    
    // Action buttons for today m15 Structure
    document.querySelectorAll('#today-m15-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleTodayStructureClick);
    });
    
    // Action buttons for today m5 Structure
    document.querySelectorAll('#today-m5-section .action-btn').forEach(btn => {
        btn.addEventListener('click', handleTodayStructureClick);
    });
}

// ============================================
// EVENT HANDLERS
// ============================================
function handleEntryStrategyClick() {
    const action = this.getAttribute('data-action');
    const strategy = this.getAttribute('data-strategy');
    const section = this.closest('.analysis-section').id;
    
    let category, selection;
    
    if (section === 'break-and-go-section') {
        category = 'breakGo';
        selection = {
            type: 'breakGo',
            action: action,
            id: generateId()
        };
    } else if (section === 'break-miti-go-section') {
        category = 'breakMitiGo';
        selection = {
            type: 'breakMitiGo',
            action: action,
            id: generateId()
        };
    } else if (section === 'sweep-type-section') {
        category = 'sweep';
        selection = {
            type: 'sweep',
            strategy: strategy,
            id: generateId()
        };
    } else if (section === 'fill-type-section') {
        category = 'fill';
        selection = {
            type: 'fill',
            strategy: strategy,
            id: generateId()
        };
    }
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.entry[category].findIndex(
        item => (item.action === action || item.strategy === strategy)
    );
    
    if (existingIndex !== -1) {
        selections.entry[category].splice(existingIndex, 1);
    } else {
        selections.entry[category].push(selection);
    }
    
    updatePanelSummary('entry', category);
    updateHighlightedOptions();
}

function handleEntrySelectionClick() {
    const action = this.getAttribute('data-action');
    const sectionTitle = this.closest('.analysis-section').querySelector('h3').textContent;
    
    let category, selection;
    
    if (sectionTitle.includes('Direct Entry')) {
        category = 'de';
        selection = { type: 'de', action: action, id: generateId() };
        
        // Only one DE selection allowed
        if (this.classList.contains('active')) {
            document.querySelectorAll('.entry-selection-btn.de').forEach(b => b.classList.remove('active'));
            selections.entrySelection.de = [];
        } else {
            document.querySelectorAll('.entry-selection-btn.de').forEach(b => b.classList.remove('active'));
            selections.entrySelection.de = [selection];
            this.classList.add('active');
        }
        updatePanelSummary('entrySelection', 'de');
        return;
    } else if (sectionTitle.includes('Confirmation Entry')) {
        category = 'ce';
        selection = { type: 'ce', action: action, id: generateId() };
    } else if (sectionTitle.includes('m5 Entry Type')) {
        category = 'm5Type';
        selection = { type: 'm5Type', action: action, id: generateId() };
    } else if (sectionTitle.includes('BOS Type')) {
        category = 'bos';
        selection = { type: 'bos', action: action, id: generateId() };
    } else if (sectionTitle.includes('m5 Age')) {
        category = 'm5Age';
        selection = { type: 'm5Age', action: action, id: generateId() };
        
        // Only one m5 Age selection allowed
        if (this.classList.contains('active')) {
            document.querySelectorAll('.entry-selection-btn.m5-age').forEach(b => b.classList.remove('active'));
            selections.entrySelection.m5Age = [];
        } else {
            document.querySelectorAll('.entry-selection-btn.m5-age').forEach(b => b.classList.remove('active'));
            selections.entrySelection.m5Age = [selection];
            this.classList.add('active');
        }
        updatePanelSummary('entrySelection', 'm5Age');
        return;
    }
    
    // Toggle active state for multiple selections
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.entrySelection[category].findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.entrySelection[category].splice(existingIndex, 1);
    } else {
        selections.entrySelection[category].push(selection);
    }
    
    updatePanelSummary('entrySelection', category);
}

function handleTPSelectionClick() {
    const action = this.getAttribute('data-action');
    const sectionTitle = this.closest('.analysis-section').querySelector('h3').textContent;
    
    let category, selection;
    
    if (sectionTitle.includes('PD')) {
        category = 'pd';
        selection = { type: 'pd', action: action, id: generateId() };
    } else if (sectionTitle.includes('Ses')) {
        category = 'ses';
        selection = { type: 'ses', action: action, id: generateId() };
    } else if (sectionTitle.includes('RR')) {
        category = 'rr';
        selection = { type: 'rr', action: action, id: generateId() };
    } else if (sectionTitle.includes('RN')) {
        category = 'rn';
        selection = { type: 'rn', action: action, id: generateId() };
    } else if (sectionTitle.includes('Opposite FVG')) {
        category = 'oppositeFvg';
        selection = { type: 'oppositeFvg', action: action, id: generateId() };
    } else if (sectionTitle.includes('Old Structure')) {
        category = 'oldStructure';
        selection = { type: 'oldStructure', action: action, id: generateId() };
    }
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.tpSelection[category].findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.tpSelection[category].splice(existingIndex, 1);
    } else {
        selections.tpSelection[category].push(selection);
    }
    
    updatePanelSummary('tpSelection', category);
}

function handleYesterdayDayClick() {
    const action = this.getAttribute('data-action');
    const selection = { type: 'day', action: action, id: generateId() };
    
    // Only one Ytd Day selection allowed
    selections.yesterday.day.forEach(item => {
        const oldBtn = document.querySelector(`#yesterday-day-section .action-btn[data-action="${item.action}"]`);
        if (oldBtn) oldBtn.classList.remove('active');
    });
    
    selections.yesterday.day = [selection];
    this.classList.add('active');
    
    updatePanelSummary('yesterday', 'day');
    updateHighlightedOptions();
}

function handleTimeframeClick(sectionSelector) {
    // Remove active class from all timeframe buttons in this section
    const parentSection = document.querySelector(sectionSelector);
    if (parentSection) {
        parentSection.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    }
}

function handleYesterdayStructureClick() {
    const action = this.getAttribute('data-action');
    const sectionId = this.closest('.analysis-section').id;
    
    let category;
    if (sectionId.includes('m15')) {
        category = 'm15';
    } else if (sectionId.includes('m5')) {
        category = 'm5';
    }
    
    const selection = { type: category, action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.yesterday[category].findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.yesterday[category].splice(existingIndex, 1);
    } else {
        selections.yesterday[category].push(selection);
    }
    
    updatePanelSummary('yesterday', category);
    updateHighlightedOptions();
}

function handleYesterdayFVGActionClick() {
    const action = this.getAttribute('data-action');
    const activeTimeframe = document.querySelector('#yesterday-fvg-section .timeframe-btn.active');
    const timeframe = activeTimeframe ? activeTimeframe.getAttribute('data-timeframe') : 'd';
    
    const selection = { type: 'fvg', timeframe: timeframe, action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.yesterday.fvg.findIndex(
        item => item.timeframe === timeframe && item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.yesterday.fvg.splice(existingIndex, 1);
    } else {
        selections.yesterday.fvg.push(selection);
    }
    
    updatePanelSummary('yesterday', 'fvg');
    updateHighlightedOptions();
}

function handleYesterdayPDActionClick() {
    const action = this.getAttribute('data-action');
    const selection = { type: 'pd', action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.yesterday.pd.findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.yesterday.pd.splice(existingIndex, 1);
    } else {
        selections.yesterday.pd.push(selection);
    }
    
    updatePanelSummary('yesterday', 'pd');
    updateHighlightedOptions();
}

function handleTodayFVGActionClick() {
    const action = this.getAttribute('data-action');
    const activeTimeframe = document.querySelector('#today-fvg-section .timeframe-btn.active');
    const timeframe = activeTimeframe ? activeTimeframe.getAttribute('data-timeframe') : 'd';
    
    const selection = { type: 'fvg', timeframe: timeframe, action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.today.fvg.findIndex(
        item => item.timeframe === timeframe && item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.today.fvg.splice(existingIndex, 1);
    } else {
        selections.today.fvg.push(selection);
    }
    
    updatePanelSummary('today', 'fvg');
    updateHighlightedOptions();
}

function handleTodaySessionClick() {
    const action = this.getAttribute('data-action');
    const selection = { type: 'session', action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.today.session.findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.today.session.splice(existingIndex, 1);
    } else {
        selections.today.session.push(selection);
    }
    
    updatePanelSummary('today', 'session');
    updateHighlightedOptions();
}

function handleTodayGapClick() {
    const action = this.getAttribute('data-action');
    const selection = { type: 'gap', action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.today.gap.findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.today.gap.splice(existingIndex, 1);
    } else {
        selections.today.gap.push(selection);
    }
    
    updatePanelSummary('today', 'gap');
    updateHighlightedOptions();
}

function handleTodayRNClick() {
    const action = this.getAttribute('data-action');
    const selection = { type: 'rn', action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.today.rn.findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.today.rn.splice(existingIndex, 1);
    } else {
        selections.today.rn.push(selection);
    }
    
    updatePanelSummary('today', 'rn');
    updateHighlightedOptions();
}

function handleTodayStructureClick() {
    const action = this.getAttribute('data-action');
    const sectionId = this.closest('.analysis-section').id;
    
    let category;
    if (sectionId.includes('m15')) {
        category = 'm15';
    } else if (sectionId.includes('m5')) {
        category = 'm5';
    }
    
    const selection = { type: category, action: action, id: generateId() };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.today[category].findIndex(
        item => item.action === action
    );
    
    if (existingIndex !== -1) {
        selections.today[category].splice(existingIndex, 1);
    } else {
        selections.today[category].push(selection);
    }
    
    updatePanelSummary('today', category);
    updateHighlightedOptions();
}

// ============================================
// PANEL SUMMARY FUNCTIONS
// ============================================
function updateAllPanelSummaries() {
    // Update all panel summaries
    ['yesterday', 'today', 'entry', 'entrySelection', 'tpSelection'].forEach(panel => {
        for (const category in selections[panel]) {
            updatePanelSummary(panel, category);
        }
    });
}

function updatePanelSummary(panel, category) {
    // Get the summary element ID for this category
    const summaryMap = {
        'yesterday': {
            'day': 'yesterday-day-summary',
            'fvg': 'yesterday-fvg-summary',
            'pd': 'yesterday-pd-summary',
            'm15': 'yesterday-m15-summary',
            'm5': 'yesterday-m5-summary'
        },
        'today': {
            'fvg': 'today-fvg-summary',
            'session': 'today-session-summary',
            'gap': 'today-gap-summary',
            'rn': 'today-rn-summary',
            'm15': 'today-m15-summary',
            'm5': 'today-m5-summary'
        },
        'entry': {
            'breakGo': 'entry-breakgo-summary',
            'breakMitiGo': 'entry-breakmiti-summary',
            'sweep': 'entry-sweep-summary',
            'fill': 'entry-fill-summary'
        },
        'entrySelection': {
            'de': 'entry-de-summary',
            'ce': 'entry-ce-summary',
            'm5Type': 'entry-m5type-summary',
            'bos': 'entry-bos-summary',
            'm5Age': 'entry-m5age-summary'
        },
        'tpSelection': {
            'pd': 'tp-pd-summary',
            'ses': 'tp-ses-summary',
            'rr': 'tp-rr-summary',
            'rn': 'tp-rn-summary',
            'oppositeFvg': 'tp-oppositefvg-summary',
            'oldStructure': 'tp-oldstructure-summary'
        }
    };
    
    const summaryElementId = summaryMap[panel]?.[category];
    if (!summaryElementId) return;
    
    const summaryElement = document.getElementById(summaryElementId);
    if (!summaryElement) return;
    
    const selectionsArray = selections[panel][category];
    
    if (selectionsArray.length === 0) {
        summaryElement.textContent = 'None';
        summaryElement.className = 'summary-value empty';
        return;
    }
    
    // Format selections for display
    let formattedSelections = [];
    
    selectionsArray.forEach(item => {
        let formattedText = '';
        
        if (panel === 'yesterday' || panel === 'today') {
            if (category === 'day') {
                formattedText = formatDayAction(item.action);
            } else if (category === 'm15' || category === 'm5') {
                formattedText = formatStructureAction(item.action);
            } else if (category === 'fvg') {
                const timeframe = item.timeframe || 'd';
                const actionText = item.action === 'bullish' ? 'Bullish' : 'Bearish';
                formattedText = `${timeframe.toUpperCase()} ${actionText}`;
            } else if (category === 'pd') {
                formattedText = formatPDAction(item.action);
            } else if (category === 'session') {
                formattedText = formatSessionAction(item.action);
            } else if (category === 'gap') {
                formattedText = formatGapAction(item.action);
            } else if (category === 'rn') {
                formattedText = formatRoundNumberAction(item.action);
            }
        } else if (panel === 'entry') {
            if (category === 'breakGo' || category === 'breakMitiGo') {
                formattedText = formatEntryAction(item.action);
            } else if (category === 'sweep' || category === 'fill') {
                formattedText = item.strategy;
            }
        } else if (panel === 'entrySelection') {
            if (category === 'de') {
                formattedText = formatDEAction(item.action);
            } else if (category === 'ce') {
                formattedText = formatCEAction(item.action);
            } else if (category === 'm5Type') {
                formattedText = formatM5TypeAction(item.action);
            } else if (category === 'bos') {
                formattedText = formatBOSAction(item.action);
            } else if (category === 'm5Age') {
                formattedText = formatM5AgeAction(item.action);
            }
        } else if (panel === 'tpSelection') {
            if (category === 'pd') {
                formattedText = formatPDAction(item.action);
            } else if (category === 'ses') {
                formattedText = formatSESAction(item.action);
            } else if (category === 'rr') {
                formattedText = formatRRAction(item.action);
            } else if (category === 'rn') {
                formattedText = formatRNAction(item.action);
            } else if (category === 'oppositeFvg') {
                formattedText = formatOppositeFVGAction(item.action);
            } else if (category === 'oldStructure') {
                formattedText = formatOldStructureAction(item.action);
            }
        }
        
        if (formattedText) {
            formattedSelections.push(formattedText);
        }
    });
    
    // Display selections
    if (formattedSelections.length === 1) {
        summaryElement.textContent = formattedSelections[0];
        updateSummaryElementClass(summaryElement, selectionsArray[0]);
    } else {
        summaryElement.textContent = formattedSelections.join(', ');
        summaryElement.className = 'summary-value';
    }
    
    // Update complete trade summary
    updateCompleteTradeSummary();
}

function updateSummaryElementClass(element, selection) {
    element.className = 'summary-value';
    
    if (selection.action) {
        if (selection.action.includes('bull') || selection.action === 'bullish' || 
            selection.action === 'gap-up' || selection.action.includes('up')) {
            element.classList.add('bullish');
        } else if (selection.action.includes('bear') || selection.action === 'bearish' || 
                   selection.action === 'gap-down' || selection.action.includes('down')) {
            element.classList.add('bearish');
        } else if (selection.action.includes('break')) {
            element.classList.add('break');
        } else if (selection.action.includes('sweep')) {
            element.classList.add('sweep');
        } else if (selection.action.includes('fill')) {
            element.classList.add('fill');
        } else if (selection.action === 'no-gap') {
            element.classList.add('no-gap');
        }
    }
}

// Update highlighted options based on other panel selections
function updateHighlightedOptions() {
    // Clear all highlights
    document.querySelectorAll('.entry-option-btn').forEach(btn => {
        btn.classList.remove('highlighted');
    });
    
    // Check each entry option for matches
    document.querySelectorAll('.entry-option-btn').forEach(btn => {
        const ref = btn.getAttribute('data-ref');
        if (ref) {
            const refs = ref.split(',');
            let shouldHighlight = false;
            
            refs.forEach(refItem => {
                if (checkIfSelected(refItem)) {
                    shouldHighlight = true;
                }
            });
            
            if (shouldHighlight) {
                btn.classList.add('highlighted');
            }
        }
    });
}

// Check if an option is selected in other panels
function checkIfSelected(ref) {
    // Check today session selections
    if (selections.today.session.some(item => item.action === ref)) {
        return true;
    }
    
    // Check yesterday PD selections
    if (selections.yesterday.pd.some(item => 
        (ref === 'break-pdh' && item.action === 'break-pdh') ||
        (ref === 'break-pdl' && item.action === 'break-pdl') ||
        (ref === 'sweep-pdh' && item.action === 'sweep-pdh') ||
        (ref === 'sweep-pdl' && item.action === 'sweep-pdl')
    )) {
        return true;
    }
    
    // Check today gap selections
    if (selections.today.gap.some(item => item.action === ref)) {
        return true;
    }
    
    return false;
}

// ============================================
// COMPLETE TRADE SUMMARY FUNCTIONS
// ============================================
function updateCompleteTradeSummary() {
    // Update Trade Setup
    document.getElementById('complete-date-summary').textContent = 
        document.getElementById('current-date').textContent;
    document.getElementById('complete-pair-summary').textContent = 
        document.getElementById('current-pair').textContent;
    document.getElementById('complete-direction-summary').textContent = 
        document.getElementById('current-direction').textContent;
    document.getElementById('complete-direction-summary').className = 
        document.getElementById('current-direction').className;
    
    // Update other summaries by copying from panel summaries
    const summaries = [
        'yesterday-day', 'yesterday-fvg', 'yesterday-pd', 'yesterday-m15', 'yesterday-m5',
        'today-fvg', 'today-session', 'today-gap', 'today-rn', 'today-m15', 'today-m5',
        'entry-breakgo', 'entry-breakmiti', 'entry-sweep', 'entry-fill',
        'entry-de', 'entry-ce', 'entry-m5type', 'entry-bos', 'entry-m5age',
        'tp-pd', 'tp-ses', 'tp-rr', 'tp-rn', 'tp-oppositefvg', 'tp-oldstructure'
    ];
    
    summaries.forEach(summary => {
        const source = document.getElementById(`${summary}-summary`);
        const target = document.getElementById(`complete-${summary}-summary`);
        if (source && target) {
            target.textContent = source.textContent;
            target.className = source.className;
        }
    });
}

// ============================================
// NOTES FUNCTIONALITY
// ============================================
function saveNotesToStorage() {
    const notes = document.getElementById('trading-notes').value;
    localStorage.setItem('tradingNotes', notes);
}

function loadNotesFromStorage() {
    const savedNotes = localStorage.getItem('tradingNotes');
    if (savedNotes) {
        document.getElementById('trading-notes').value = savedNotes;
    }
}

// ============================================
// FORMATTING FUNCTIONS
// ============================================
function formatDEAction(action) {
    const actions = {
        'h4-de': 'H4 DE',
        'h1-de': 'H1 DE',
        'm15-de': 'm15 DE',
        'm5-de': 'm5 DE',
        'm5-in-m15-fvg': 'm5 in m15 FVG'
    };
    return actions[action] || action;
}

function formatCEAction(action) {
    const actions = {
        'h4-m15-m5': 'H4 m15 m5',
        'h4-m15': 'h4 m15',
        'h4-m5': 'h4 m5',
        'h1-m15-m5': 'H1 m15 m5',
        'h1-m15': 'h1 m15',
        'h1-m5': 'h1 m5',
        'm15-m5': 'm15 m5'
    };
    return actions[action] || action;
}

function formatM5TypeAction(action) {
    const actions = {
        'cover-whole': 'Cover Whole',
        'cover-high': 'Cover High',
        'cover-low': 'Cover Low',
        'cover-previous': 'Cover Previous'
    };
    return actions[action] || action;
}

function formatBOSAction(action) {
    const actions = {
        'bull-to-bull-bos': 'Bull to Bull BOS',
        'bear-to-bear-bos': 'Bear to Bear BOS',
        'bull-to-bear-bos': 'Bull to Bear BOS',
        'bear-to-bull-bos': 'Bear to Bull BOS'
    };
    return actions[action] || action;
}

function formatM5AgeAction(action) {
    const actions = {
        'new-m5': 'New m5',
        'old-m5': 'Old m5'
    };
    return actions[action] || action;
}

function formatPDAction(action) {
    const actions = {
        'break-pdh': 'Break PDH',
        'sweep-pdh': 'Sweep PDH',
        'break-pdl': 'Break PDL',
        'sweep-pdl': 'Sweep PDL'
    };
    return actions[action] || action;
}

function formatSESAction(action) {
    const actions = {
        'to-asia-high': 'To Asia High',
        'to-asia-low': 'To Asia Low'
    };
    return actions[action] || action;
}

function formatRRAction(action) {
    const actions = {
        '1-4': '1 : 4',
        '1-5': '1 : 5',
        '1-8': '1 : 8',
        '1-10': '1 : 10'
    };
    return actions[action] || action;
}

function formatRNAction(action) {
    const actions = {
        'to-round-number': 'To Round Number'
    };
    return actions[action] || action;
}

function formatOppositeFVGAction(action) {
    const actions = {
        'new-opposite-m5-fvg': 'New Opposite m5 FVG',
        'new-opposite-m15-fvg': 'New Opposite m15 FVG'
    };
    return actions[action] || action;
}

function formatOldStructureAction(action) {
    const actions = {
        'd-structure-high': 'D Structure High',
        'd-structure-low': 'D Structure Low',
        'h4-structure-high': 'H4 Structure High',
        'h4-structure-low': 'H4 Structure Low'
    };
    return actions[action] || action;
}

function formatEntryAction(action) {
    const actions = {
        'break-ah': 'Break AH',
        'break-al': 'Break AL',
        'break-pdh': 'Break PDH',
        'break-pdl': 'Break PDL',
        'break-miti-ah': 'Break and Miti AH',
        'break-miti-al': 'Break and Miti AL',
        'break-miti-pdh': 'Break and Miti PDH',
        'break-miti-pdl': 'Break and Miti PDL'
    };
    return actions[action] || action;
}

function formatDayAction(action) {
    const actions = {
        'bull-day': 'Bull Day',
        'bear-day': 'Bear Day',
        'ranging-bull-day': 'Ranging but Bull',
        'ranging-bear-day': 'Ranging but Bear'
    };
    return actions[action] || action;
}

function formatStructureAction(action) {
    const actions = {
        'break-bull-high-m15': 'Break Bull High',
        'sweep-bull-high-m15': 'Sweep Bull High',
        'break-bull-low-m15': 'Break Bull Low',
        'sweep-bull-low-m15': 'Sweep Bull Low',
        'break-bear-high-m15': 'Break Bear High',
        'sweep-bear-high-m15': 'Sweep Bear High',
        'break-bear-low-m15': 'Break Bear Low',
        'sweep-bear-low-m15': 'Sweep Bear Low',
        'break-bull-high-m5': 'Break Bull High',
        'sweep-bull-high-m5': 'Sweep Bull High',
        'break-bull-low-m5': 'Break Bull Low',
        'sweep-bull-low-m5': 'Sweep Bull Low',
        'break-bear-high-m5': 'Break Bear High',
        'sweep-bear-high-m5': 'Sweep Bear High',
        'break-bear-low-m5': 'Break Bear Low',
        'sweep-bear-low-m5': 'Sweep Bear Low'
    };
    return actions[action] || action;
}

function formatRoundNumberAction(action) {
    const actions = {
        'break-rn-up': 'Break RN Up',
        'break-rn-down': 'Break RN Down',
        'sweep-rn-up': 'Sweep RN Up',
        'sweep-rn-down': 'Sweep RN Down'
    };
    return actions[action] || action;
}

function formatSessionAction(action) {
    const actions = {
        'asia-high': 'Asia High',
        'asia-low': 'Asia Low',
        'break-asia-high': 'Break Asia High',
        'break-asia-low': 'Break Asia Low',
        'sweep-asia-high': 'Sweep Asia High',
        'sweep-asia-low': 'Sweep Asia Low',
        'entry-asia-session': 'Entry in Asia Session',
        'asia-no-break-sweep': 'Asia Not Yet Break/Sweep'
    };
    return actions[action] || action;
}

function formatGapAction(action) {
    const actions = {
        'gap-up': 'Gap Up',
        'gap-down': 'Gap Down',
        'no-gap': 'No Gap',
        'fill-gap-up': 'Fill Gap Up',
        'fill-gap-down': 'Fill Gap Down'
    };
    return actions[action] || action;
}

// Generate unique ID for selections
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ============================================
// EXPORT FUNCTIONALITY
// ============================================
function setupExportFunctionality() {
    setupDashboardExport();
    setupSummaryExportFunctionality();
}

// Dashboard export function
function setupDashboardExport() {
    const exportBtn = document.getElementById('export-jpeg-btn');
    const exportStatus = document.getElementById('export-status');
    
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
        exportStatus.textContent = 'Capturing dashboard...';
        exportStatus.className = 'export-status processing';
        
        // Capture the entire dashboard container
        html2canvas(document.querySelector('.dashboard'), {
            scale: 2,
            useCORS: true,
            backgroundColor: '#f5f6fa'
        }).then(canvas => {
            const image = canvas.toDataURL('image/jpeg', 1.0);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
            const pair = selections.setup.pair || 'XAUUSD';
            const direction = selections.setup.direction === 'buy' ? 'Buy' : 'Sell';
            
            let filename = `Trading-Analysis-Dashboard-${pair}-${direction}-${timestamp}`;
            
            const daySelection = selections.yesterday.day[0];
            if (daySelection) {
                filename += `-${daySelection.action}`;
            }
            
            link.download = `${filename}.jpg`;
            link.href = image;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            exportStatus.textContent = 'Dashboard exported successfully!';
            exportStatus.className = 'export-status success';
            
            setTimeout(() => {
                exportStatus.textContent = '';
                exportStatus.className = 'export-status';
            }, 3000);
        }).catch(error => {
            console.error('Export error:', error);
            exportStatus.textContent = 'Error exporting dashboard. Please try again.';
            exportStatus.className = 'export-status error';
            
            setTimeout(() => {
                exportStatus.textContent = '';
                exportStatus.className = 'export-status';
            }, 3000);
        });
    });
}

// Summary report export function
function setupSummaryExportFunctionality() {
    const exportSummaryBtn = document.getElementById('export-summary-btn');
    const exportStatus = document.getElementById('export-status');
    
    if (!exportSummaryBtn) return;
    
    exportSummaryBtn.addEventListener('click', function() {
        exportStatus.textContent = 'Preparing summary report...';
        exportStatus.className = 'export-status processing';
        
        // Create a container for the export with better styling
        const exportContainer = document.createElement('div');
        exportContainer.className = 'export-summary-container';
        exportContainer.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 800px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
        `;
        
        // Clone the complete summary panel
        const summaryPanel = document.querySelector('.complete-summary-panel').cloneNode(true);
        
        // Remove the export button and notes from the export version
        const notesSection = summaryPanel.querySelector('.summary-notes');
        if (notesSection) notesSection.style.display = 'none';
        
        // Add header with trade setup info
        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        `;
        
        const title = document.createElement('h1');
        title.textContent = 'Trading Analysis Summary Report';
        title.style.cssText = `
            color: #1e293b;
            margin-bottom: 10px;
            font-size: 24px;
        `;
        
        const setupInfo = document.createElement('div');
        setupInfo.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 10px;
            flex-wrap: wrap;
        `;
        
        const pair = document.createElement('span');
        pair.textContent = `Pair: ${selections.setup.pair}`;
        pair.style.cssText = `
            font-weight: bold;
            color: #2563eb;
            padding: 5px 10px;
            background: #eff6ff;
            border-radius: 5px;
        `;
        
        const direction = document.createElement('span');
        direction.textContent = `Direction: ${selections.setup.direction === 'buy' ? 'Buy' : 'Sell'}`;
        direction.style.cssText = `
            font-weight: bold;
            color: ${selections.setup.direction === 'buy' ? '#10b981' : '#ef4444'};
            padding: 5px 10px;
            background: ${selections.setup.direction === 'buy' ? '#f0fdf4' : '#fef2f2'};
            border-radius: 5px;
        `;
        
        const date = document.createElement('span');
        date.textContent = `Date: ${selections.setup.date.value}`;
        date.style.cssText = `
            font-weight: bold;
            color: #64748b;
            padding: 5px 10px;
            background: #f8fafc;
            border-radius: 5px;
        `;
        
        setupInfo.appendChild(pair);
        setupInfo.appendChild(direction);
        setupInfo.appendChild(date);
        
        header.appendChild(title);
        header.appendChild(setupInfo);
        
        // Style the summary sections for export
        const sections = summaryPanel.querySelectorAll('.complete-summary-section');
        sections.forEach(section => {
            section.style.cssText = `
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
            `;
            
            // Style section headers
            const sectionHeader = section.querySelector('h3');
            if (sectionHeader) {
                sectionHeader.style.cssText = `
                    color: #2563eb;
                    margin-top: 0;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #e2e8f0;
                    font-size: 16px;
                `;
            }
            
            // Style summary items
            const summaryItems = section.querySelectorAll('.summary-item');
            summaryItems.forEach(item => {
                item.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px 0;
                    border-bottom: 1px solid #f1f5f9;
                `;
                
                const label = item.querySelector('.summary-label');
                const value = item.querySelector('.summary-value');
                
                if (label) {
                    label.style.cssText = `
                        color: #64748b;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    `;
                }
                
                if (value) {
                    value.style.cssText = `
                        color: #1e293b;
                        font-weight: 500;
                        text-align: right;
                        font-size: 14px;
                    `;
                }
            });
        });
        
        // Clear any existing content and append new structure
        exportContainer.innerHTML = '';
        exportContainer.appendChild(header);
        exportContainer.appendChild(summaryPanel);
        
        // Create a temporary container for export
        const tempContainer = document.createElement('div');
        tempContainer.appendChild(exportContainer);
        document.body.appendChild(tempContainer);
        
        // Add timestamp to the bottom
        const footer = document.createElement('div');
        footer.style.cssText = `
            text-align: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            color: #94a3b8;
            font-size: 12px;
        `;
        footer.textContent = `Generated on: ${new Date().toLocaleString()}`;
        exportContainer.appendChild(footer);
        
        // Capture the summary report
        html2canvas(exportContainer, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            width: exportContainer.offsetWidth,
            height: exportContainer.offsetHeight
        }).then(canvas => {
            // Convert canvas to JPEG
            const image = canvas.toDataURL('image/jpeg', 1.0);
            
            // Create download link
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
            const pair = selections.setup.pair || 'XAUUSD';
            const direction = selections.setup.direction === 'buy' ? 'Buy' : 'Sell';
            
            link.download = `Trading-Summary-${pair}-${direction}-${timestamp}.jpg`;
            link.href = image;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            document.body.removeChild(tempContainer);
            
            exportStatus.textContent = 'Summary report exported successfully!';
            exportStatus.className = 'export-status success';
            
            // Reset status after 3 seconds
            setTimeout(() => {
                exportStatus.textContent = '';
                exportStatus.className = 'export-status';
            }, 3000);
        }).catch(error => {
            console.error('Summary export error:', error);
            exportStatus.textContent = 'Error exporting summary report. Please try again.';
            exportStatus.className = 'export-status error';
            
            // Clean up
            if (tempContainer.parentNode) {
                document.body.removeChild(tempContainer);
            }
            
            setTimeout(() => {
                exportStatus.textContent = '';
                exportStatus.className = 'export-status';
            }, 3000);
        });
    });
}
