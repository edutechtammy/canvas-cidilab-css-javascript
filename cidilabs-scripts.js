/* CidiLabs DesignPlus JavaScript for Local Development
 * This file recreates the functionality of CidiLabs DesignPlus components
 * for local testing outside of Canvas LMS environment
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    initializeButtonTabsVertical();
    initializeFlipCards();
    initializeModals();
    initializeOrderItems();
    initializeMatchItems();
});

// =========================================
// BUTTON TABS VERTICAL FUNCTIONALITY
// =========================================

/**
 * Initialize Button Tabs Vertical functionality
 */
function initializeButtonTabsVertical() {
    const tabsContainers = document.querySelectorAll('.dp-tabs-buttons-vertical');

    tabsContainers.forEach(container => {
        const panels = container.querySelectorAll('.dp-panel-group');

        // Create new structure: tab navigation + content area
        const tabNav = document.createElement('div');
        tabNav.className = 'dp-tab-nav';

        const contentArea = document.createElement('div');
        contentArea.className = 'dp-content-area';

        // Extract headings and contents from original panels
        const headings = [];
        const contents = [];

        panels.forEach((panel, index) => {
            const heading = panel.querySelector('.dp-panel-heading');
            const content = panel.querySelector('.dp-panel-content');

            if (heading && content) {
                // Clone heading for tab navigation
                const tabHeading = heading.cloneNode(true);
                tabHeading.setAttribute('data-index', index);
                headings.push(tabHeading);

                // Clone content for content area
                const tabContent = content.cloneNode(true);
                tabContent.setAttribute('data-index', index);
                contents.push(tabContent);

                // Add to new structure
                tabNav.appendChild(tabHeading);
                contentArea.appendChild(tabContent);
            }
        });

        // Clear container and add new structure
        container.innerHTML = '';
        container.appendChild(tabNav);
        container.appendChild(contentArea);

        // Set up click handlers for tab headings
        headings.forEach((heading, index) => {
            heading.addEventListener('click', function () {
                // Remove active class from all headings and contents
                headings.forEach(h => h.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked heading and corresponding content
                heading.classList.add('active');
                if (contents[index]) {
                    contents[index].classList.add('active');
                }
            });

            // Add keyboard navigation support
            heading.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    heading.click();
                }
            });

            // Make headings focusable for accessibility
            heading.setAttribute('tabindex', '0');
            heading.setAttribute('role', 'tab');
            heading.setAttribute('aria-expanded', 'false');
            heading.id = `tab-${index}`;
            heading.setAttribute('aria-controls', `panel-${index}`);
        });

        // Set up content panels for accessibility
        contents.forEach((content, index) => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', `tab-${index}`);
            content.id = `panel-${index}`;
        });

        // Set first tab as active by default
        if (headings.length > 0 && contents.length > 0) {
            headings[0].classList.add('active');
            headings[0].setAttribute('aria-expanded', 'true');
            contents[0].classList.add('active');
        }

        // Add ARIA attributes to container
        container.setAttribute('role', 'tablist');
    });
}

// =========================================
// MODALS FUNCTIONALITY  
// =========================================

function initializeModals() {
    // Handle all modal triggers
    document.querySelectorAll('.dp-popover-trigger').forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target modal content from href attribute
            const targetId = this.getAttribute('href');
            const modalContent = document.querySelector(targetId);

            if (modalContent) {
                openModal(modalContent);
            }
        });
    });

    // Handle escape key to close modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Handle clicking outside modal to close
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('dp-modal-overlay')) {
            closeAllModals();
        }
    });
}

function openModal(modalContent) {
    // Close any existing modals first
    closeAllModals();

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.dp-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'dp-modal-overlay';
        document.body.appendChild(overlay);
    }

    // Add close button if not present
    if (!modalContent.querySelector('.dp-modal-close')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'dp-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close modal');
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            closeAllModals();
        });
        modalContent.appendChild(closeBtn);
    }

    // Show modal
    overlay.classList.add('show');
    modalContent.classList.add('show');

    // Focus management for accessibility
    modalContent.setAttribute('tabindex', '-1');
    modalContent.focus();
}

function closeAllModals() {
    const overlay = document.querySelector('.dp-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }

    document.querySelectorAll('.dp-popover-content.show').forEach(modal => {
        modal.classList.remove('show');
    });
}

// Export for potential use in other scripts
window.CidiLabsUtils = {
    initializeButtonTabsVertical: initializeButtonTabsVertical,
    initializeFlipCards: initializeFlipCards
};

// =========================================
// FLIP CARDS FUNCTIONALITY
// =========================================

/**
 * Initialize Flip Cards functionality
 */
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.dp-flip-card');

    flipCards.forEach(card => {
        // Add click event listener
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });

        // Add keyboard event listener for accessibility
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });

        // Make card focusable for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        // Add aria-label for better accessibility
        const frontText = card.querySelector('.dp-front-card .card-title');
        const backText = card.querySelector('.dp-back-card .card-title');

        if (frontText && backText) {
            card.setAttribute('aria-label', `Flip card: ${frontText.textContent.trim()}. Click to reveal: ${backText.textContent.trim()}`);
        }
    });
}

// =========================================
// ORDER ITEMS FUNCTIONALITY
// =========================================

/**
 * Initialize Order Items functionality
 */
function initializeOrderItems() {
    const orderContainers = document.querySelectorAll('.dp-order-wrapper');

    orderContainers.forEach(container => {
        const orderList = container.querySelector('.dp-order');
        if (!orderList) return;

        // Store original order
        const originalItems = Array.from(orderList.children).map(li => li.textContent.trim());

        // Add controls if they don't exist
        if (!container.querySelector('.dp-order-controls')) {
            addOrderControls(container, orderList, originalItems);
        }

        // Initialize drag and drop
        initializeDragAndDrop(orderList);

        // Start timer
        startTimer(container);
    });
}

function addOrderControls(container, orderList, originalItems) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'dp-order-controls';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'dp-order-buttons';

    const checkButton = document.createElement('button');
    checkButton.className = 'dp-order-check';
    checkButton.innerHTML = '✓ Check';
    checkButton.addEventListener('click', () => checkOrder(orderList, originalItems));

    const resetButton = document.createElement('button');
    resetButton.className = 'dp-order-reset';
    resetButton.innerHTML = '↻ Reset';
    resetButton.addEventListener('click', () => resetOrder(orderList, originalItems));

    const timerDiv = document.createElement('div');
    timerDiv.className = 'dp-order-timer';
    timerDiv.innerHTML = 'Time <span class="timer-display">0:00</span> <span class="dp-order-info-icon">ⓘ</span>';

    buttonsDiv.appendChild(checkButton);
    buttonsDiv.appendChild(resetButton);
    controlsDiv.appendChild(buttonsDiv);
    controlsDiv.appendChild(timerDiv);

    container.appendChild(controlsDiv);
}

function initializeDragAndDrop(orderList) {
    const items = orderList.querySelectorAll('li');

    items.forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    if (e.target === draggedElement) return;

    const orderList = e.target.closest('.dp-order');
    const afterElement = getDragAfterElement(orderList, e.clientY);

    if (afterElement == null) {
        orderList.appendChild(draggedElement);
    } else {
        orderList.insertBefore(draggedElement, afterElement);
    }
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkOrder(orderList, originalItems) {
    const currentOrder = Array.from(orderList.children).map(li => li.textContent.trim());
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(originalItems);

    if (isCorrect) {
        alert('Correct! Well done.');
    } else {
        alert('Not quite right. Try again.');
    }
}

function resetOrder(orderList, originalItems) {
    // Clear current items
    orderList.innerHTML = '';

    // Restore original order
    originalItems.forEach(itemText => {
        const li = document.createElement('li');
        li.textContent = itemText;
        li.draggable = true;
        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);
        li.addEventListener('dragend', handleDragEnd);
        orderList.appendChild(li);
    });

    // Reset timer
    const container = orderList.closest('.dp-order-wrapper');
    resetTimer(container);
}

function startTimer(container) {
    const timerDisplay = container.querySelector('.timer-display');
    if (!timerDisplay) return;

    let seconds = 0;
    const timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);

    // Store interval reference for reset functionality
    container.timerInterval = timerInterval;
}

function resetTimer(container) {
    if (container.timerInterval) {
        clearInterval(container.timerInterval);
    }
    startTimer(container);
}

// =========================================
// MATCH ITEMS FUNCTIONALITY
// =========================================

/**
 * Initialize Match Items functionality
 * Click-based matching activities with visual feedback
 */
function initializeMatchItems() {
    const matchContainers = document.querySelectorAll('.dp-match-items');

    matchContainers.forEach(container => {
        // Create matched items section if it doesn't exist
        createMatchedItemsSection(container);

        // Create control panel
        createControlPanel(container);

        // Initialize game state
        const gameState = {
            selectedItems: [],
            matchedPairs: [],
            isProcessing: false,
            startTime: Date.now(),
            timerInterval: null,
            attempts: 0
        };

        // Start timer
        startMatchTimer(container, gameState);

        // Get all matchable items
        const items = container.querySelectorAll('.dp-match-text dt, .dp-match-text dd');

        // Randomize the order of items
        randomizeItems(container);

        // Add click handlers to items
        items.forEach(item => {
            item.addEventListener('click', function () {
                handleItemClick(item, gameState, container);
            });
        });

        // Add control handlers
        setupControlHandlers(container, gameState);
    });
}

/**
 * Create the matched items section
 */
function createMatchedItemsSection(container) {
    if (!container.querySelector('.dp-matched-items')) {
        const matchedSection = document.createElement('div');
        matchedSection.className = 'dp-matched-items';
        matchedSection.innerHTML = `
            <h4 class="dp-has-icon">
                <i class="fas fa-check"><span class="dp-icon-content" style="display: none;">&nbsp;</span></i>
                Matched Items
            </h4>
            <div class="matched-pairs-container"></div>
        `;
        container.appendChild(matchedSection);
    }
}

/**
 * Handle item click
 */
function handleItemClick(item, gameState, container) {
    // Prevent interaction if processing or item is disabled
    if (gameState.isProcessing || item.classList.contains('disabled')) {
        return;
    }

    // Toggle selection
    if (item.classList.contains('selected')) {
        item.classList.remove('selected');
        gameState.selectedItems = gameState.selectedItems.filter(i => i !== item);
    } else {
        item.classList.add('selected');
        gameState.selectedItems.push(item);
    }

    // Check if we have two items selected
    if (gameState.selectedItems.length === 2) {
        checkForMatch(gameState, container);
    }
}

/**
 * Check if selected items are a match
 */
function checkForMatch(gameState, container) {
    gameState.isProcessing = true;
    gameState.attempts++; // Track attempts

    const [item1, item2] = gameState.selectedItems;

    // Check if items have the same pair-id
    const pairId1 = item1.getAttribute('data-pair-id');
    const pairId2 = item2.getAttribute('data-pair-id');

    if (pairId1 === pairId2) {
        // Match found!
        showMatchFeedback(item1, item2, () => {
            processMatch(item1, item2, gameState, container);
        });
    } else {
        // No match
        setTimeout(() => {
            item1.classList.remove('selected');
            item2.classList.remove('selected');
            gameState.selectedItems = [];
            gameState.isProcessing = false;
        }, 1000);
    }
}/**
 * Show visual feedback for a match
 */
function showMatchFeedback(item1, item2, callback) {
    // Add checkmarks
    const checkmark1 = document.createElement('span');
    checkmark1.className = 'checkmark';
    checkmark1.innerHTML = ' ✓';
    item1.appendChild(checkmark1);

    const checkmark2 = document.createElement('span');
    checkmark2.className = 'checkmark';
    checkmark2.innerHTML = ' ✓';
    item2.appendChild(checkmark2);

    // Add matched styling
    item1.classList.add('matched');
    item2.classList.add('matched');

    // Remove checkmarks and continue after delay
    setTimeout(() => {
        checkmark1.remove();
        checkmark2.remove();
        callback();
    }, 1500);
}

/**
 * Process a successful match
 */
function processMatch(item1, item2, gameState, container) {
    // Move to matched section
    const matchedContainer = container.querySelector('.matched-pairs-container');
    const matchedPair = document.createElement('div');
    matchedPair.className = 'matched-pair';
    matchedPair.innerHTML = `
        <div class="pair-item">${item1.textContent}</div>
        <div class="pair-item">${item2.textContent}</div>
    `;
    matchedContainer.appendChild(matchedPair);

    // Disable original items
    item1.classList.remove('selected', 'matched');
    item2.classList.remove('selected', 'matched');
    item1.classList.add('disabled');
    item2.classList.add('disabled');

    // Update game state
    gameState.matchedPairs.push([item1, item2]);
    gameState.selectedItems = [];
    gameState.isProcessing = false;

    // Check if game is complete
    checkGameComplete(container, gameState);
}

/**
 * Check if all pairs are matched
 */
function checkGameComplete(container, gameState) {
    const allItems = container.querySelectorAll('.dp-match-text dt, .dp-match-text dd');
    const disabledItems = container.querySelectorAll('.dp-match-text dt.disabled, .dp-match-text dd.disabled');

    if (allItems.length === disabledItems.length) {
        setTimeout(() => {
            showGameSuccess(container, gameState);
        }, 500);
    }
}

/**
 * Show game success state
 */
function showGameSuccess(container, gameState) {
    const controlPanel = container.parentNode.querySelector('.match-controls');
    const totalPairs = container.querySelectorAll('.dp-match-text dt, .dp-match-text dd').length / 2;

    // Stop timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    // Switch to success state
    controlPanel.classList.add('game-complete');

    // Update score and attempts
    const scoreText = controlPanel.querySelector('.score-text');
    const attemptsBadge = controlPanel.querySelector('.attempts-badge');

    scoreText.textContent = `${totalPairs}/${totalPairs}`;
    attemptsBadge.textContent = gameState.attempts;
}/**
 * Create the control panel with buttons and timer
 */
function createControlPanel(container) {
    if (!container.querySelector('.match-controls')) {
        const controlPanel = document.createElement('div');
        controlPanel.className = 'match-controls';
        controlPanel.innerHTML = `
            <div class="match-controls-left">
                <button class="btn btn-check" type="button">
                    <i class="fas fa-check"></i> Check
                </button>
                <button class="btn btn-reset" type="button">
                    <i class="fas fa-redo"></i> Reset
                </button>
            </div>
            <div class="match-controls-success">
                <div class="score-display">
                    <span>Score</span>
                    <div class="score-bar"></div>
                    <span class="score-text">0/0</span>
                </div>
                <div class="attempts-display">
                    <span>Attempts</span>
                    <div class="attempts-badge">0</div>
                </div>
            </div>
            <div class="timer">
                <span>Time</span>
                <div class="timer-display">0:00</div>
                <i class="fas fa-info-circle"></i>
            </div>
        `;

        // Insert after the main match items container
        container.parentNode.insertBefore(controlPanel, container.nextSibling);
    }
}/**
 * Setup control button handlers
 */
function setupControlHandlers(container, gameState) {
    const controlPanel = container.parentNode.querySelector('.match-controls');
    const checkBtn = controlPanel.querySelector('.btn-check');
    const resetBtn = controlPanel.querySelector('.btn-reset');

    checkBtn.addEventListener('click', () => {
        checkGameResults(container, gameState);
    });

    resetBtn.addEventListener('click', () => {
        resetGame(container, gameState);
    });
}

/**
 * Start the game timer
 */
function startMatchTimer(container, gameState) {
    const controlPanel = container.parentNode.querySelector('.match-controls');
    const timerDisplay = controlPanel.querySelector('.timer-display');

    gameState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

/**
 * Check game results
 */
function checkGameResults(container, gameState) {
    const allItems = container.querySelectorAll('.dp-match-text dt, .dp-match-text dd');
    const disabledItems = container.querySelectorAll('.dp-match-text dt.disabled, .dp-match-text dd.disabled');
    const totalPairs = allItems.length / 2;
    const matchedPairs = disabledItems.length / 2;

    if (matchedPairs === totalPairs) {
        alert(`Perfect! All ${totalPairs} pairs matched correctly!`);
    } else {
        alert(`You have matched ${matchedPairs} out of ${totalPairs} pairs. Keep trying!`);
    }
}

/**
 * Reset the game
 */
function resetGame(container, gameState) {
    const controlPanel = container.parentNode.querySelector('.match-controls');

    // Stop timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    // Reset success state
    controlPanel.classList.remove('game-complete');

    // Reset all items
    const items = container.querySelectorAll('.dp-match-text dt, .dp-match-text dd');
    items.forEach(item => {
        item.classList.remove('selected', 'matched', 'disabled');
    });

    // Clear matched items section
    const matchedContainer = container.querySelector('.matched-pairs-container');
    if (matchedContainer) {
        matchedContainer.innerHTML = '';
    }

    // Reset game state
    gameState.selectedItems = [];
    gameState.matchedPairs = [];
    gameState.isProcessing = false;
    gameState.startTime = Date.now();
    gameState.attempts = 0;

    // Randomize items again for new game
    randomizeItems(container);

    // Restart timer
    startMatchTimer(container, gameState);
}/**
 * Randomize the order of items in the container
 */
function randomizeItems(container) {
    const itemContainer = container.querySelector('.dp-match-text');
    const items = Array.from(itemContainer.querySelectorAll('dt, dd'));

    // Fisher-Yates shuffle algorithm
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    // Clear the container and append items in new order
    itemContainer.innerHTML = '';
    items.forEach(item => {
        itemContainer.appendChild(item);
    });
}