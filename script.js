// Data structure to track selections
const selections = {
    setup: {
        date: { type: 'today', value: new Date().toISOString().split('T')[0] },
        pair: 'XAUUSD',
        direction: 'buy'
    },
    yesterday: {
        day: [],      // Ytd Day selections
        fvg: [],
        pd: [],
        m15: [],      // m15 Structure selections
        m5: []        // m5 Structure selections
    },
    today: {
        fvg: [],
        session: [],
        gap: [],
        rn: [],       // Round Number selections
        m15: [],      // Today m15 Structure selections
        m5: []        // Today m5 Structure selections
    },
    entry: {
        breakGo: [],       // Break and Go strategies
        breakMitiGo: [],   // Break and Miti and Go strategies
        sweep: [],         // Sweep Type strategies
        fill: []           // Fill Type strategies
    },
    entrySelection: {
        de: [],            // Direct Entry
        ce: [],            // Confirmation Entry
        m5Type: [],        // m5 Entry Type
        bos: [],           // BOS Type
        m5Age: []          // m5 Age
    },
    tpSelection: {
        pd: [],            // PD
        ses: [],           // Session
        rr: [],            // RR
        rn: [],            // Round Number
        oppositeFvg: [],   // Opposite FVG
        oldStructure: []   // Old Structure
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize trade setup panel first
    initSetupPanel();
    
    // Set default active timeframe buttons
    setDefaultActiveTimeframes();
    
    // Set up all event listeners
    setupEventListeners();
    
    // Then update all panel summaries
    updateAllPanelSummaries();
    
    // Update complete trade summary
    updateCompleteTradeSummary();
    
    // Initialize highlighting
    updateHighlightedOptions();
    
    // Setup export functionality
    setupExportFunctionality();
    
    // Load saved notes
    loadNotesFromStorage();
});

// ============================================
// TRADE SETUP PANEL FUNCTIONALITY
// ============================================
function initSetupPanel() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('trade-date').value = today;
    
    // Setup button click handlers
    setupButtonHandlers();
    
    // Load saved setup if exists
    loadSavedSetup();
}

function setupButtonHandlers() {
    // Date buttons
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all date buttons
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
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
            // Remove active class from all pair buttons
            document.querySelectorAll('.pair-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const pair = this.getAttribute('data-pair');
            updateSetupSelection('pair', pair);
        });
    });
    
    // Direction buttons
    document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all direction buttons
            document.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const direction = this.getAttribute('data-direction');
            updateSetupSelection('direction', direction);
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
        
        // Update active button
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
    switch(type) {
        case 'date':
            selections.setup.date = value;
            break;
        case 'pair':
            selections.setup.pair = value;
            break;
        case 'direction':
            selections.setup.direction = value;
            break;
    }
    
    // Update display
    updateCurrentSetupDisplay();
    
    // Update complete summary
    updateCompleteTradeSummary();
    
    // Save to localStorage
    saveSetupToStorage();
}

function updateCurrentSetupDisplay() {
    // Format date for display
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
    
    // Update DOM elements
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
        
        // Update selections
        selections.setup = setup;
        
        // Update UI
        updateSetupUI(setup);
    }
}

function updateSetupUI(setup) {
    // Set date
    document.getElementById('trade-date').value = setup.date.value;
    
    // Set pair buttons
    document.querySelectorAll('.pair-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-pair') === setup.pair);
    });
    
    // Set direction buttons
    document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-direction') === setup.direction);
    });
    
    // Set date button
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-date') === setup.date.type);
    });
    
    // Update display
    updateCurrentSetupDisplay();
}

// ============================================
// DASHBOARD INITIALIZATION
// ============================================
function setDefaultActiveTimeframes() {
    // Set default active timeframe for yesterday FVG (Daily)
    const yesterdayFvgTimeframe = document.querySelector('#yesterday-fvg-section .timeframe-btn[data-timeframe="d"]');
    if (yesterdayFvgTimeframe) {
        yesterdayFvgTimeframe.classList.add('active');
    }
    
    // Set default active timeframe for today FVG (Daily)
    const todayFvgTimeframe = document.querySelector('#today-fvg-section .timeframe-btn[data-timeframe="d"]');
    if (todayFvgTimeframe) {
        todayFvgTimeframe.classList.add('active');
    }
    
    // Set default active PD level for yesterday PD (PDH)
    const yesterdayPdLevel = document.querySelector('#yesterday-pd-section .timeframe-btn[data-pd-level="pdh"]');
    if (yesterdayPdLevel) {
        yesterdayPdLevel.classList.add('active');
    }
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
        btn.addEventListener('click', handleTimeframeClick);
    });
    
    // Today FVG timeframes
    document.querySelectorAll('#today-fvg-section .timeframe-btn').forEach(btn => {
        btn.addEventListener('click', handleTimeframeClick);
    });
    
    // Yesterday PD levels
    document.querySelectorAll('#yesterday-pd-section .timeframe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all PD level buttons
            document.querySelectorAll('#yesterday-pd-section .timeframe-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
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
    const section = this.closest('.entry-section').id;
    
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
        // Remove if already exists (toggle off)
        selections.entry[category].splice(existingIndex, 1);
    } else {
        // Add if doesn't exist (toggle on)
        selections.entry[category].push(selection);
    }
    
    updatePanelSummary('entry', category);
    updateHighlightedOptions();
}

function handleEntrySelectionClick() {
    const action = this.getAttribute('data-action');
    const section = this.closest('.entry-selection-section').querySelector('h3').textContent;
    
    let category, selection;
    
    if (section.includes('Direct Entry')) {
        category = 'de';
        selection = {
            type: 'de',
            action: action,
            id: generateId()
        };
        
        // Only one DE selection allowed
        if (this.classList.contains('active')) {
            // Deselect all DE buttons
            document.querySelectorAll('.entry-selection-btn.de').forEach(b => b.classList.remove('active'));
            selections.entrySelection.de = [];
        } else {
            // Deselect all DE buttons and clear selections
            document.querySelectorAll('.entry-selection-btn.de').forEach(b => b.classList.remove('active'));
            selections.entrySelection.de = [];
            this.classList.add('active');
            selections.entrySelection.de.push(selection);
        }
    } else if (section.includes('Confirmation Entry')) {
        category = 'ce';
        selection = {
            type: 'ce',
            action: action,
            id: generateId()
        };
        
        // Toggle active state
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
    } else if (section.includes('m5 Entry Type')) {
        category = 'm5Type';
        selection = {
            type: 'm5Type',
            action: action,
            id: generateId()
        };
        
        // Toggle active state
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
    } else if (section.includes('BOS Type')) {
        category = 'bos';
        selection = {
            type: 'bos',
            action: action,
            id: generateId()
        };
        
        // Toggle active state
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
    } else if (section.includes('m5 Age')) {
        category = 'm5Age';
        selection = {
            type: 'm5Age',
            action: action,
            id: generateId()
        };
        
        // Only one m5 Age selection allowed
        if (this.classList.contains('active')) {
            // Deselect all m5 Age buttons
            document.querySelectorAll('.entry-selection-btn.m5-age').forEach(b => b.classList.remove('active'));
            selections.entrySelection.m5Age = [];
        } else {
            // Deselect all m5 Age buttons and clear selections
            document.querySelectorAll('.entry-selection-btn.m5-age').forEach(b => b.classList.remove('active'));
            selections.entrySelection.m5Age = [];
            this.classList.add('active');
            selections.entrySelection.m5Age.push(selection);
        }
        updatePanelSummary('entrySelection', 'm5Age');
        return;
    }
    
    updatePanelSummary('entrySelection', category);
}

function handleTPSelectionClick() {
    const action = this.getAttribute('data-action');
    const section = this.closest('.tp-section').querySelector('h3').textContent;
    
    let category, selection;
    
    if (section.includes('PD')) {
        category = 'pd';
        selection = {
            type: 'pd',
            action: action,
            id: generateId()
        };
    } else if (section.includes('Ses')) {
        category = 'ses';
        selection = {
            type: 'ses',
            action: action,
            id: generateId()
        };
    } else if (section.includes('RR')) {
        category = 'rr';
        selection = {
            type: 'rr',
            action: action,
            id: generateId()
        };
    } else if (section.includes('RN')) {
        category = 'rn';
        selection = {
            type: 'rn',
            action: action,
            id: generateId()
        };
    } else if (section.includes('Opposite FVG')) {
        category = 'oppositeFvg';
        selection = {
            type: 'oppositeFvg',
            action: action,
            id: generateId()
        };
    } else if (section.includes('Old Structure')) {
        category = 'oldStructure';
        selection = {
            type: 'oldStructure',
            action: action,
            id: generateId()
        };
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
    
    const selection = {
        type: 'day',
        action: action,
        id: generateId()
    };
    
    // For Ytd Day, only allow one selection (remove previous)
    selections.yesterday.day.forEach(item => {
        const oldBtn = document.querySelector(`#yesterday-day-section .action-btn[data-action="${item.action}"]`);
        if (oldBtn) oldBtn.classList.remove('active');
    });
    
    // Clear previous selections (only one allowed)
    selections.yesterday.day = [];
    
    // Add new selection
    selections.yesterday.day.push(selection);
    
    // Set active state
    this.classList.add('active');
    
    updatePanelSummary('yesterday', 'day');
    updateHighlightedOptions();
}

function handleTimeframeClick() {
    // Remove active class from all timeframe buttons in this section
    const section = this.closest('.timeframe-section, .pd-level-section');
    if (section) {
        section.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
    } else {
        // Fallback: remove from all timeframe buttons in the parent section
        const parentSection = this.closest('[id$="-fvg-section"]');
        if (parentSection) {
            parentSection.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
        }
    }
    
    // Add active class to clicked button
    this.classList.add('active');
}

function handleYesterdayStructureClick() {
    const action = this.getAttribute('data-action');
    const sectionId = this.closest('.structure-section').id;
    
    let category;
    if (sectionId.includes('m15')) {
        category = 'm15';
    } else if (sectionId.includes('m5')) {
        category = 'm5';
    }
    
    const selection = {
        type: category,
        action: action,
        id: generateId()
    };
    
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
    
    const selection = {
        type: 'fvg',
        timeframe: timeframe,
        action: action,
        id: generateId()
    };
    
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
    const activePDLevel = document.querySelector('#yesterday-pd-section .timeframe-btn.active');
    const pdLevel = activePDLevel ? activePDLevel.getAttribute('data-pd-level') : 'pdh';
    
    const selection = {
        type: 'pd',
        level: pdLevel,
        action: action,
        id: generateId()
    };
    
    // Toggle active state
    this.classList.toggle('active');
    
    // Check if this selection already exists
    const existingIndex = selections.yesterday.pd.findIndex(
        item => item.level === pdLevel && item.action === action
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
    
    const selection = {
        type: 'fvg',
        timeframe: timeframe,
        action: action,
        id: generateId()
    };
    
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
    
    const selection = {
        type: 'session',
        action: action,
        id: generateId()
    };
    
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
    
    const selection = {
        type: 'gap',
        action: action,
        id: generateId()
    };
    
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
    
    const selection = {
        type: 'rn',
        action: action,
        id: generateId()
    };
    
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
    const sectionId = this.closest('.structure-section').id;
    
    let category;
    if (sectionId.includes('m15')) {
        category = 'm15';
    } else if (sectionId.includes('m5')) {
        category = 'm5';
    }
    
    const selection = {
        type: category,
        action: action,
        id: generateId()
    };
    
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
    updatePanelSummary('yesterday', 'day');
    updatePanelSummary('yesterday', 'fvg');
    updatePanelSummary('yesterday', 'pd');
    updatePanelSummary('yesterday', 'm15');
    updatePanelSummary('yesterday', 'm5');
    updatePanelSummary('today', 'fvg');
    updatePanelSummary('today', 'session');
    updatePanelSummary('today', 'gap');
    updatePanelSummary('today', 'rn');
    updatePanelSummary('today', 'm15');
    updatePanelSummary('today', 'm5');
    updatePanelSummary('entry', 'breakGo');
    updatePanelSummary('entry', 'breakMitiGo');
    updatePanelSummary('entry', 'sweep');
    updatePanelSummary('entry', 'fill');
    updatePanelSummary('entrySelection', 'de');
    updatePanelSummary('entrySelection', 'ce');
    updatePanelSummary('entrySelection', 'm5Type');
    updatePanelSummary('entrySelection', 'bos');
    updatePanelSummary('entrySelection', 'm5Age');
    updatePanelSummary('tpSelection', 'pd');
    updatePanelSummary('tpSelection', 'ses');
    updatePanelSummary('tpSelection', 'rr');
    updatePanelSummary('tpSelection', 'rn');
    updatePanelSummary('tpSelection', 'oppositeFvg');
    updatePanelSummary('tpSelection', 'oldStructure');
}

function updatePanelSummary(panel, category) {
    // Get the summary element ID for this category
    let summaryElementId;
    
    if (panel === 'yesterday') {
        summaryElementId = `yesterday-${category}-summary`;
    } else if (panel === 'today') {
        summaryElementId = `today-${category}-summary`;
    } else if (panel === 'entry') {
        // Map entry categories to summary IDs
        const entryMap = {
            'breakGo': 'entry-breakgo-summary',
            'breakMitiGo': 'entry-breakmiti-summary',
            'sweep': 'entry-sweep-summary',
            'fill': 'entry-fill-summary'
        };
        summaryElementId = entryMap[category];
    } else if (panel === 'entrySelection') {
        // Map entry selection categories to summary IDs
        const entrySelectionMap = {
            'de': 'entry-de-summary',
            'ce': 'entry-ce-summary',
            'm5Type': 'entry-m5type-summary',
            'bos': 'entry-bos-summary',
            'm5Age': 'entry-m5age-summary'
        };
        summaryElementId = entrySelectionMap[category];
    } else if (panel === 'tpSelection') {
        // Map TP selection categories to summary IDs
        const tpMap = {
            'pd': 'tp-pd-summary',
            'ses': 'tp-ses-summary',
            'rr': 'tp-rr-summary',
            'rn': 'tp-rn-summary',
            'oppositeFvg': 'tp-oppositefvg-summary',
            'oldStructure': 'tp-oldstructure-summary'
        };
        summaryElementId = tpMap[category];
    }
    
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
                const level = item.level || 'pdh';
                const actionText = item.action === 'break' ? 'Break' : 'Sweep';
                formattedText = `${actionText} ${level.toUpperCase()}`;
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
    
    // Display as chips for multiple selections
    if (formattedSelections.length === 1) {
        summaryElement.innerHTML = formattedSelections[0];
        // Add appropriate class based on selection type
        updateSummaryElementClass(summaryElement, selectionsArray[0]);
    } else {
        // For multiple selections, show as chips
        summaryElement.innerHTML = '';
        formattedSelections.forEach((text, index) => {
            const chip = document.createElement('span');
            chip.className = `selection-chip ${getChipClass(selectionsArray[index])}`;
            chip.textContent = text;
            summaryElement.appendChild(chip);
        });
        summaryElement.className = 'summary-value';
    }
    
    // Update complete trade summary
    updateCompleteTradeSummary();
}

function updateSummaryElementClass(element, selection) {
    // Reset classes
    element.className = 'summary-value';
    
    // Add appropriate class based on selection type
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
    } else if (selection.type === 'breakGo' || selection.type === 'breakMitiGo') {
        element.classList.add('break');
    } else if (selection.type === 'sweep') {
        element.classList.add('sweep');
    } else if (selection.type === 'fill') {
        element.classList.add('fill');
    }
}

function getChipClass(selection) {
    if (selection.action) {
        if (selection.action.includes('bull') || selection.action === 'bullish' || 
            selection.action === 'gap-up' || selection.action.includes('up')) {
            return 'bullish';
        } else if (selection.action.includes('bear') || selection.action === 'bearish' || 
                   selection.action === 'gap-down' || selection.action.includes('down')) {
            return 'bearish';
        } else if (selection.action.includes('break')) {
            return 'break';
        } else if (selection.action.includes('sweep')) {
            return 'sweep';
        } else if (selection.action.includes('fill')) {
            return 'fill';
        } else if (selection.action === 'no-gap') {
            return 'no-gap';
        }
    }
    return '';
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
                // Check if this reference exists in other panels
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
        (ref === 'break-pdh' && item.action === 'break' && item.level === 'pdh') ||
        (ref === 'break-pdl' && item.action === 'break' && item.level === 'pdl') ||
        (ref === 'sweep-pdh' && item.action === 'sweep' && item.level === 'pdh') ||
        (ref === 'sweep-pdl' && item.action === 'sweep' && item.level === 'pdl')
    )) {
        return true;
    }
    
    // Check today gap selections
    if (selections.today.gap.some(item => 
        item.action === ref
    )) {
        return true;
    }
    
    return false;
}

// Remove selection from the list
function removeSelection(day, category, id) {
    let index = -1;
    
    if (day === 'entry') {
        // Find in entry strategies
        for (const key in selections.entry) {
            index = selections.entry[key].findIndex(item => item.id === id);
            if (index !== -1) {
                const selection = selections.entry[key][index];
                selections.entry[key].splice(index, 1);
                
                // Remove active class from corresponding button
                if (selection.action) {
                    const button = document.querySelector(`.entry-option-btn[data-action="${selection.action}"]`);
                    if (button) button.classList.remove('active');
                } else if (selection.strategy) {
                    const button = document.querySelector(`.entry-option-btn[data-strategy="${selection.strategy}"]`);
                    if (button) button.classList.remove('active');
                }
                break;
            }
        }
        updatePanelSummary(day, category);
    } else if (day === 'entrySelection') {
        // Find in entry selection
        for (const key in selections.entrySelection) {
            index = selections.entrySelection[key].findIndex(item => item.id === id);
            if (index !== -1) {
                const selection = selections.entrySelection[key][index];
                selections.entrySelection[key].splice(index, 1);
                
                // Remove active class from corresponding button
                const button = document.querySelector(`.entry-selection-btn[data-action="${selection.action}"]`);
                if (button) button.classList.remove('active');
                break;
            }
        }
        updatePanelSummary(day, category);
    } else if (day === 'tpSelection') {
        // Find in TP selection
        for (const key in selections.tpSelection) {
            index = selections.tpSelection[key].findIndex(item => item.id === id);
            if (index !== -1) {
                const selection = selections.tpSelection[key][index];
                selections.tpSelection[key].splice(index, 1);
                
                // Remove active class from corresponding button
                const button = document.querySelector(`.tp-btn[data-action="${selection.action}"]`);
                if (button) button.classList.remove('active');
                break;
            }
        }
        updatePanelSummary(day, category);
    } else {
        // Find in yesterday/today panels
        index = selections[day][category].findIndex(item => item.id === id);
        if (index !== -1) {
            const selection = selections[day][category][index];
            selections[day][category].splice(index, 1);
            
            // Remove active class from corresponding button
            let buttonSelector;
            if (category === 'day') {
                buttonSelector = `#${day}-day-section .action-btn[data-action="${selection.action}"]`;
            } else if (category === 'm15' || category === 'm5') {
                buttonSelector = `#${day}-${category}-section .action-btn[data-action="${selection.action}"]`;
            } else if (category === 'fvg') {
                buttonSelector = `#${day}-fvg-section .action-btn[data-action="${selection.action}"]`;
            } else if (category === 'pd') {
                buttonSelector = `#${day}-pd-section .action-btn[data-action="${selection.action}"]`;
            } else if (category === 'session' || category === 'gap' || category === 'rn') {
                buttonSelector = `#${day}-${category}-section .action-btn[data-action="${selection.action}"]`;
            }
            
            if (buttonSelector) {
                const button = document.querySelector(buttonSelector);
                if (button) button.classList.remove('active');
            }
            
            updatePanelSummary(day, category);
            updateHighlightedOptions();
        }
    }
}

// ============================================
// COMPLETE TRADE SUMMARY FUNCTIONS
// ============================================
function updateCompleteTradeSummary() {
    // Update Trade Setup
    updateCompleteSummaryItem('complete-date-summary', document.getElementById('current-date').textContent);
    updateCompleteSummaryItem('complete-pair-summary', document.getElementById('current-pair').textContent);
    updateCompleteSummaryItem('complete-direction-summary', document.getElementById('current-direction').textContent, 
        document.getElementById('current-direction').className.includes('bullish') ? 'bullish' : 'bearish');
    
    // Update Yesterday Analysis
    updateCompleteSummaryFromElement('complete-yesterday-day-summary', 'yesterday-day-summary');
    updateCompleteSummaryFromElement('complete-yesterday-fvg-summary', 'yesterday-fvg-summary');
    updateCompleteSummaryFromElement('complete-yesterday-pd-summary', 'yesterday-pd-summary');
    updateCompleteSummaryFromElement('complete-yesterday-m15-summary', 'yesterday-m15-summary');
    updateCompleteSummaryFromElement('complete-yesterday-m5-summary', 'yesterday-m5-summary');
    
    // Update Today Analysis
    updateCompleteSummaryFromElement('complete-today-fvg-summary', 'today-fvg-summary');
    updateCompleteSummaryFromElement('complete-today-session-summary', 'today-session-summary');
    updateCompleteSummaryFromElement('complete-today-gap-summary', 'today-gap-summary');
    updateCompleteSummaryFromElement('complete-today-rn-summary', 'today-rn-summary');
    updateCompleteSummaryFromElement('complete-today-m15-summary', 'today-m15-summary');
    updateCompleteSummaryFromElement('complete-today-m5-summary', 'today-m5-summary');
    
    // Update Entry Strategy
    updateCompleteSummaryFromElement('complete-entry-breakgo-summary', 'entry-breakgo-summary');
    updateCompleteSummaryFromElement('complete-entry-breakmiti-summary', 'entry-breakmiti-summary');
    updateCompleteSummaryFromElement('complete-entry-sweep-summary', 'entry-sweep-summary');
    updateCompleteSummaryFromElement('complete-entry-fill-summary', 'entry-fill-summary');
    
    // Update Entry Selection
    updateCompleteSummaryFromElement('complete-entry-de-summary', 'entry-de-summary');
    updateCompleteSummaryFromElement('complete-entry-ce-summary', 'entry-ce-summary');
    updateCompleteSummaryFromElement('complete-entry-m5type-summary', 'entry-m5type-summary');
    updateCompleteSummaryFromElement('complete-entry-bos-summary', 'entry-bos-summary');
    updateCompleteSummaryFromElement('complete-entry-m5age-summary', 'entry-m5age-summary');
    
    // Update TP Selection
    updateCompleteSummaryFromElement('complete-tp-pd-summary', 'tp-pd-summary');
    updateCompleteSummaryFromElement('complete-tp-ses-summary', 'tp-ses-summary');
    updateCompleteSummaryFromElement('complete-tp-rr-summary', 'tp-rr-summary');
    updateCompleteSummaryFromElement('complete-tp-rn-summary', 'tp-rn-summary');
    updateCompleteSummaryFromElement('complete-tp-oppositefvg-summary', 'tp-oppositefvg-summary');
    updateCompleteSummaryFromElement('complete-tp-oldstructure-summary', 'tp-oldstructure-summary');
}

function updateCompleteSummaryItem(elementId, content, type = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Clear existing content
    element.innerHTML = '';
    
    if (typeof content === 'string') {
        element.textContent = content || 'None';
    } else {
        // Handle HTML content (like chips)
        element.appendChild(content.cloneNode(true));
    }
    
    // Reset classes
    element.className = 'summary-value';
    if (type) {
        element.classList.add(type);
    }
    
    // Add empty class if content is empty or "None"
    if (!content || content === 'None' || (typeof content === 'string' && content.includes('No selection'))) {
        element.classList.add('empty');
    }
}

function updateCompleteSummaryFromElement(completeElementId, sourceElementId) {
    const sourceElement = document.getElementById(sourceElementId);
    const completeElement = document.getElementById(completeElementId);
    
    if (!sourceElement || !completeElement) return;
    
    // Copy the content from source to complete summary
    completeElement.innerHTML = sourceElement.innerHTML;
    
    // Copy the classes
    completeElement.className = sourceElement.className;
    
    // Ensure it has the correct styling for complete panel
    if (completeElement.className.includes('empty')) {
        completeElement.textContent = 'None';
    }
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
        'pdh-to-pdl': 'PDH to PDL',
        'pdl-to-pdh': 'PDL to PDH'
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
        // Yesterday m15
        'break-bull-high-m15': 'Break Bull High',
        'sweep-bull-high-m15': 'Sweep Bull High',
        'break-bull-low-m15': 'Break Bull Low',
        'sweep-bull-low-m15': 'Sweep Bull Low',
        // Yesterday m5
        'break-bull-high-m5': 'Break Bull High',
        'sweep-bull-high-m5': 'Sweep Bull High',
        'break-bull-low-m5': 'Break Bull Low',
        'sweep-bull-low-m5': 'Sweep Bull Low',
        // Today m15
        'break-bull-high-m15-today': 'Break Bull High',
        'sweep-bull-high-m15-today': 'Sweep Bull High',
        'break-bull-low-m15-today': 'Break Bull Low',
        'sweep-bull-low-m15-today': 'Sweep Bull Low',
        // Today m5
        'break-bull-high-m5-today': 'Break Bull High',
        'sweep-bull-high-m5-today': 'Sweep Bull High',
        'break-bull-low-m5-today': 'Break Bull Low',
        'sweep-bull-low-m5-today': 'Sweep Bull Low'
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
    const exportBtn = document.getElementById('export-jpeg-btn');
    const exportStatus = document.getElementById('export-status');
    
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
        exportStatus.textContent = 'Capturing dashboard...';
        exportStatus.className = 'export-status processing';
        
        // Capture the entire dashboard container
        html2canvas(document.querySelector('.dashboard'), {
            scale: 2, // Higher quality
            useCORS: true,
            backgroundColor: '#f5f6fa'
        }).then(canvas => {
            // Convert canvas to JPEG
            const image = canvas.toDataURL('image/jpeg', 1.0);
            
            // Create download link
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
            const pair = selections.setup.pair || 'XAUUSD';
            const direction = selections.setup.direction === 'buy' ? 'Buy' : 'Sell';
            
            // Include more info in filename
            let filename = `Trading-Analysis-${pair}-${direction}-${timestamp}`;
            
            // Add key selections to filename for better organization
            const daySelection = selections.yesterday.day[0];
            if (daySelection) {
                filename += `-${daySelection.action}`;
            }
            
            link.download = `${filename}.jpg`;
            link.href = image;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            exportStatus.textContent = 'Dashboard exported successfully!';
            exportStatus.className = 'export-status success';
            
            // Reset status after 3 seconds
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