/* CidiLabs DesignPlus JavaScript for Local Development
 * This file recreates the functionality of CidiLabs DesignPlus components
 * for local testing outside of Canvas LMS environment
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    initializeButtonTabsVertical();
});

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

// Export for potential use in other scripts
window.CidiLabsUtils = {
    initializeButtonTabsVertical: initializeButtonTabsVertical
};