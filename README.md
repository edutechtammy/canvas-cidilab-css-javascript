# CidiLabs Canvas Templates - Local Development Environment

This project provides CSS and JavaScript files that recreate the functionality of CidiLabs DesignPlus components for local testing outside of Canvas LMS. This allows instructional designers to test and refine their templates locally before deploying to Canvas. The CidiLabs template html files also have Texas State Technical College (TSTC) branding colors integrated in.

## Project Overview

**Problem Solved**: Previously, testing CidiLabs templates required pasting HTML into Canvas pages and testing there. This workflow was time-consuming and inefficient.

**Solution**: This project provides local CSS and JavaScript files that replicate Canvas functionality, enabling testing with VS Code's Live Server extension.

## File Structure

```
├── README.md
├── index.html                       # 🏠 Landing page with template navigation
├── cidilabs-styles.css              # All CSS: CidiLabs classes, component styling, and DesignPLUS functionality
├── cidilabs-scripts.js              # Main JavaScript file for interactive functionality
├── button-tabs-vertical.html        # ✅ Completed - Vertical tab navigation
├── flipcards.html                   # ✅ Completed - Interactive flip cards
├── modals.html                      # ✅ Completed - Pop-up dialog boxes
├── order-items.html                 # ✅ Completed - Drag-and-drop ordering
├── match-items.html                 # ✅ Completed - Click-to-match pairing activity
├── select-all.html                  # ✅ Completed - Multi-select checkbox functionality
├── sort-items.html                  # ✅ Completed - Drag-and-drop sorting activities
└── bootstrap.min.css/.js            # Bootstrap framework files
```

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/edutechtammy/canvas-cidilab-css-javascript.git
   ```

2. **Open in VS Code**:
   ```bash
   cd canvas-cidilab-css-javascript
   code .
   ```

3. **Start Live Server**: Click "Go Live" in VS Code status bar

4. **Access Landing Page**: Navigate to `http://localhost:5500` to view the template dashboard

## Implemented Components

### ✅ Button Tabs Vertical
- **File**: `button-tabs-vertical.html`
- **Functionality**: Vertical navigation tabs with content switching
- **Features**:
  - Texas State Technical College branding colors (#1d2757)
  - Rounded corners matching Canvas styling
  - Active tab highlighting with subtle outline
  - Responsive design
  - Full accessibility support (ARIA attributes, keyboard navigation)
  - System font stack for optimal readability

### ✅ Flipcards
- **File**: `flipcards.html`
- **Functionality**: Interactive cards that flip to reveal content on the back
- **Features**:
  - 3D flip animation with CSS transforms
  - TSTC branding colors and styling
  - Question mark icons indicating interactivity
  - 3-card responsive grid layout
  - Click and keyboard flip functionality
  - Accessibility compliant with ARIA labels

### ✅ Match Items
- **File**: `match-items.html`
- **Functionality**: Click-based matching game for pairing related items
- **Features**:
  - Click-to-match interaction model (not drag-and-drop)
  - Visual feedback with checkmarks on successful matches
  - Randomized item positions on load and reset
  - TSTC branding with Texas Blue background (#1d2757) and red borders (#d13138)
  - Matched Items section with green-bordered paired items
  - Control panel with Check/Reset buttons and live timer
  - Success state with soft green background showing final score and attempts
  - Attempt tracking and progress display
  - Reset functionality without confirmation dialog
  - Fully accessible with keyboard navigation support

### ✅ Select All
- **File**: `select-all.html`
- **Functionality**: Multi-select checkbox activity where students select all correct answers
- **Features**:
  - Click-to-select interaction with visual feedback
  - Grid-based layout (3x2) with responsive design
  - Item randomization on load and reset for varied positioning
  - TSTC branding with Texas Blue background (#1d2757) and red borders (#d13138)
  - Visual feedback with checkmarks for correct selections and X marks for incorrect
  - Control panel with Check/Reset buttons and live timer
  - Success state with green background, score display (3/3 format), and progress bar
  - Timer stops on completion
  - Fully accessible with ARIA attributes and keyboard navigation
  - Dynamic control panel creation preserving CidiLabs template integrity

## How to Use

1. **Setup**: Open the project folder in VS Code
2. **Start Development**: Use the "Go Live" button (Live Server extension) to serve files
3. **Navigate**: Open `index.html` to access the main landing page with template navigation
4. **Test Templates**: Click on completed templates to test functionality
5. **Deploy**: Copy the HTML content (without the boilerplate) into Canvas pages

## Important Constraints

- **Never modify the core template HTML structure** - this would break Canvas compatibility
- **Only add**: HTML boilerplate, CSS/JS file links, and HTML comments
- **Preserve all existing classes and IDs** - these are required for Canvas integration

## Styling Guidelines

- **Primary Color**: #1d2757 (TSTC Blue)
- **Secondary Color**: #d13138 (TSTC Lone Star Red)
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.)
- **Font Size**: 20px for content text
- **Design**: Rounded corners, clean spacing, accessibility-first approach

## Development Workflow

1. **Analysis**: Examine Canvas component behavior and styling
2. **Implementation**: Create CSS and JavaScript to replicate functionality
3. **Testing**: Use Live Server to test locally
4. **Refinement**: Compare with Canvas version and adjust
5. **Documentation**: Update this README with component details

## Next Steps

The following component is ready for implementation:

- **Sort Items**: Drag and drop sorting activities

## Technical Notes

- **CSS Architecture**: Modular approach with component-specific styling
- **JavaScript**: Vanilla JS with accessibility features and event handling
- **Browser Support**: Modern browsers with system font support
- **Responsive**: Mobile-friendly layouts included
- **FontAwesome Version**: **5.15.4** (Critical for Canvas compatibility)
  - Canvas uses FontAwesome 5.15.4, NOT the latest 6.x versions
  - FontAwesome 6.x renders icons as outlined/hollow - incompatible with Canvas
  - FontAwesome 5.15.4 renders icons as solid/filled - matches Canvas exactly
  - Always use: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css`

## Contributing

When adding new components:
1. Follow the established naming conventions
2. Maintain accessibility standards
3. Use the Texas State Technical College color palette
4. Test across different screen sizes
5. Update this README with component details
6. **Add consistent section headers**: Use the established commenting format for both CSS and JavaScript:

### CSS Section Headers:
```css
/* ===========================================
   COMPONENT NAME STYLES
   =========================================== */
```

### JavaScript Section Headers:
```javascript
// =========================================
// COMPONENT NAME FUNCTIONALITY
// =========================================
```

## ⚠️ CidiLabs Template Integrity Guidelines

**CRITICAL**: When working with CidiLabs templates, maintain the exact structure provided by CidiLabs to ensure Canvas compatibility.

### Template Structure Rules

1. **Preserve Original Classes & IDs**: Never modify CidiLabs classes (`dp-*`) or ID patterns (`dpPopup0`, etc.)
2. **Keep Inline Styles Intact**: CidiLabs provides inline styles as part of the template structure - do not modify them
3. **CSS Override Strategy**: Use external CSS with appropriate specificity (`!important` when needed) to achieve desired styling
4. **HTML Structure**: Maintain exact HTML structure and attribute patterns provided by CidiLabs

### Example - Modal Template:
```html
<!-- ✅ CORRECT: Preserve exact CidiLabs structure -->
<a id="dpPopup0" class="dp-popover-trigger" href="#dpPopup0Content">Trigger Text</a>
<div id="dpPopup0Content" class="dp-popover-content dp-popup-content" 
     style="border: 1px solid #A9A9A9; background: #f7f7f7; padding: 10px; width: 600px; max-width: 100%; margin: auto; border-radius: 3px;">
    <p>Content</p>
</div>

<!-- ❌ INCORRECT: Don't modify inline styles or add custom attributes -->
<div class="dp-popover-content custom-class" style="border-radius: 8px;">
```

### Why This Matters:
- **Canvas Deployment**: Templates must work identically when pasted into Canvas
- **Future Updates**: CidiLabs may update their structure - our changes shouldn't break compatibility  
- **Team Consistency**: Other developers need to use these exact templates
- **Maintenance**: Easier to debug when structure matches official CidiLabs templates

### Styling Approach:
- **External CSS**: Handle all visual customizations in `cidilabs-styles.css`
- **Specificity**: Use CSS specificity and `!important` to override inline styles when needed
- **Documentation**: Note any CSS overrides in component comments

## 🏗️ Project Architecture Guidelines

### File Structure & Responsibilities

**Core Files:**
- `cidilabs-styles.css` - All component styling, DesignPlus functionality, and CidiLabs classes (dp-has-icon, dp-icon-content, etc.)
- `cidilabs-scripts.js` - All interactive functionality and JavaScript
- `bootstrap.min.css` / `bootstrap.min.js` - Bootstrap framework (if needed)

**Template Files:**
- `*.html` files contain minimal boilerplate + CidiLabs template structure only
- NO internal `<style>` blocks (except for minimal container styling if absolutely necessary)
- NO internal `<script>` blocks (all JavaScript goes in `cidilabs-scripts.js`)

### CSS File Hierarchy

1. **cidilabs-styles.css**: All styling including foundational CidiLabs classes and component-specific enhancements
   - `dp-has-icon` / `dp-icon-content` system
   - Core icon implementations  
   - Base Canvas integration classes
   - Button Tabs Vertical styles
   - Flip Cards animations
   - Modal customizations
   - TSTC branding and color overrides

### Development Rules

**✅ CORRECT Approach:**
```html
<!-- Minimal boilerplate for local testing -->
<!DOCTYPE html>
<html><head>
    <link rel="stylesheet" href="cidilabs-styles.css">
</head><body>
    <!-- CidiLabs Template (preserve exactly) -->
    <div class="dp-component">...</div>
    <script src="cidilabs-scripts.js"></script>
</body></html>
```

**❌ INCORRECT Approach:**
```html
<!-- Don't add internal styles or scripts -->
<style>
    .custom-styling { ... }
</style>
<script>
    // Custom JavaScript here
</script>
```

### Why This Architecture Matters:
1. **Clear Separation**: Template HTML vs. local testing functionality
2. **Canvas Deployment**: Easy to extract just the CidiLabs template portion
3. **Maintenance**: All styling/scripting centralized in dedicated files
4. **Team Consistency**: Everyone follows the same pattern
5. **Debugging**: Issues can be traced to specific files (CSS vs JS vs template structure)

## 🎯 Session Context & Progress Tracking

### Current Session Status (Jan 28, 2026)
**✅ Completed Components:**
- ✅ **Button Tabs Vertical**: Full functionality with TSTC branding and secondary color option
- ✅ **Flipcards**: 3D flip animations, enhanced icons, compact spacing (resolved CSS troubleshooting)
- ✅ **Modals**: Canvas-accurate styling, proper trigger integration, template integrity restored
- ✅ **Order Items**: Drag-and-drop ordering functionality
- ✅ **Match Items**: Click-to-match pairing activity with randomization and success states
- ✅ **Select All**: Multi-select checkbox activity with randomization, success state, and Canvas-accurate styling
- ✅ **Sort Items**: Drag-and-drop sorting activities with control panel, timer, success states, and proper distractor item handling

**✅ Project Complete**: All 7 components successfully implemented and tested

### Key Session Learnings:
1. **Context Fatigue Risk**: Extended sessions can lead to drift from core constraints
2. **Template Integrity Critical**: Never modify CidiLabs HTML structure or inline styles  
3. **CSS Override Strategy**: Use external CSS with `!important` for visual enhancements
4. **Canvas Accuracy**: Always reference Canvas screenshots for styling accuracy

### Project Status:
✅ **All Components Complete**: The local development environment now includes all 7 CidiLabs DesignPlus components with full functionality and TSTC branding integration.

### Development Constraints Refresher:
- **DO NOT CHANGE**: CidiLabs template HTML structure, classes, IDs, or inline styles
- **CSS ONLY**: All styling modifications through external CSS files
- **Accessibility**: Maintain keyboard navigation and ARIA attributes
- **Canvas Compatibility**: Templates must work identically when deployed to Canvas

---

*This project enhances the efficiency of instructional design workflows by providing local testing capabilities for CidiLabs DesignPlus components.*

## Troubleshooting Log

### Issue: Flipcard CSS Changes Not Applying (Jan 27, 2026)

**Problem**: Multiple CSS updates to flipcard styling are not being reflected in browser, despite cache clearing and server restarts.

**Attempted Solutions**:
1. **Cache Busting**: Added version parameters to CSS links (`?v=1.0`, `?v=1.1`, `?v=1.2`)
2. **Hard Browser Refresh**: Ctrl+F5, Cmd+Shift+R, Developer Tools cache clearing
3. **CSS Specificity**: Added `!important` declarations and more specific selectors
4. **Multiple Selector Targeting**: 
   - `.dp-flip-card .dp-has-icon::after`
   - `.dp-front-card .dp-has-icon::after`
   - `h4.dp-has-icon::after`
5. **Server Restart**: VS Code Live Server restarted
6. **Direct File Access**: Tested via double-clicking index.html in Finder
7. **Element Positioning**: Added specific styles for h4 elements with `position: relative`

**Changes Made During Troubleshooting**:
- Flip icon size: 20px → 30px
- Icon colors: White background/blue text → Blue background/white text  
- Icon position: bottom: -10px → bottom: -15px → bottom: -25px
- Added white border: 2px solid white
- Added z-index: 10
- Enhanced CSS selectors for better targeting

**Status**: ✅ **RESOLVED** - Issue was CSS selector specificity. Fixed by targeting `.dp-flip-card::after` directly and removing duplicate selectors.

**Final Solution**: 
- Single flip icon using `.dp-flip-card::after`
- White background with blue arrow (`color: #1d2757`)
- Blue border (`border: 2px solid #1d2757`) 
- Proper positioning (`bottom: -15px`) on card edge
- Clean, professional appearance that matches/exceeds Canvas quality

### Issue: Button Tabs Vertical Regression After CSS Fix (Jan 27, 2026)

**Problem**: After fixing CSS media query brace issue, Button Tabs Vertical component lost all styling and JavaScript functionality.

**Root Cause**: JavaScript syntax error - missing line break after `closeAllModals()` function end, causing entire script to fail parsing.

**Error Location**: 
```javascript
// BROKEN:
}// Export for potential use in other scripts

// FIXED:
}

// Export for potential use in other scripts
```

**Resolution**: Added proper line break between function closing brace and following comment.

**Key Learning**: This type of subtle syntax error can look correct when viewed in isolation but prevents JavaScript execution entirely. Always review complete file structure when troubleshooting, not just isolated sections.

**Status**: ✅ **RESOLVED** - Button Tabs Vertical functionality fully restored with no impact to other components.