# CidiLabs Canvas Templates - Local Development Environment

This project provides CSS and JavaScript files that recreate the functionality of CidiLabs DesignPlus components for local testing outside of Canvas LMS. This allows instructional designers to test and refine their templates locally before deploying to Canvas. The CidiLabs template html files also have Texas State Technical College (TSTC) branding colors integrated in.

## Project Overview

**Problem Solved**: Previously, testing CidiLabs templates required pasting HTML into Canvas pages and testing there. This workflow was time-consuming and inefficient.

**Solution**: This project provides local CSS and JavaScript files that replicate Canvas functionality, enabling testing with VS Code's Live Server extension.

## File Structure

```
├── README.md
├── cidilabs-styles.css          # Main CSS file for all CidiLabs components
├── cidilabs-scripts.js          # Main JavaScript file for interactive functionality
├── CidiLabs Button Tabs Vertical.html    # ✅ Completed - Vertical tab navigation
├── CidiLabs Flipcards.html      # 🚧 Pending implementation
├── CidiLabs Match Items.html     # 🚧 Pending implementation
├── CidiLabs Modals.html          # 🚧 Pending implementation
├── CidiLabs Select All.html      # 🚧 Pending implementation
├── CidiLabs Sort Items.html      # 🚧 Pending implementation
└── Order Items.html              # 🚧 Pending implementation
```

## Implemented Components

### ✅ Button Tabs Vertical
- **File**: `CidiLabs Button Tabs Vertical.html`
- **Functionality**: Vertical navigation tabs with content switching
- **Features**:
  - Texas State Technical College branding colors (#1d2757)
  - Rounded corners matching Canvas styling
  - Active tab highlighting with subtle outline
  - Responsive design
  - Full accessibility support (ARIA attributes, keyboard navigation)
  - System font stack for optimal readability

## How to Use

1. **Setup**: Open the project folder in VS Code
2. **Test Locally**: Use the "Go Live" button (Live Server extension) to serve files
3. **View Templates**: Open any HTML file in your browser to test functionality
4. **Deploy**: Copy the HTML content (without the boilerplate) into Canvas pages

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

The following components are ready for implementation:

- **Flipcards**: Interactive cards that flip to reveal content
- **Modals**: Pop-up dialog boxes
- **Match Items**: Drag and drop matching activities
- **Select All**: Bulk selection interfaces
- **Sort Items**: Drag and drop sorting activities

## Technical Notes

- **CSS Architecture**: Modular approach with component-specific styling
- **JavaScript**: Vanilla JS with accessibility features and event handling
- **Browser Support**: Modern browsers with system font support
- **Responsive**: Mobile-friendly layouts included

## Contributing

When adding new components:
1. Follow the established naming conventions
2. Maintain accessibility standards
3. Use the Texas State Technical College color palette
4. Test across different screen sizes
5. Update this README with component details

---

*This project enhances the efficiency of instructional design workflows by providing local testing capabilities for CidiLabs DesignPlus components.*