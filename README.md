# Azure DevOps Persian Improver

A Chrome extension that automatically converts Gregorian dates to Jalali (Persian) dates in Azure DevOps.

## Features

- ✅ Automatic conversion of Gregorian dates to Jalali dates
- ✅ Preserves original date and displays Jalali date alongside it
- ✅ Supports dates with and without year
- ✅ Uses Persian month names instead of numbers
- ✅ Prevents double conversion of already converted dates
- ✅ Supports dynamic content
- ✅ Enable/disable toggle via popup

## Installation

### Method 1: Install from Chrome Web Store
(Coming soon)

### Method 2: Manual Installation

1. Clone or download this repository:
```bash
git clone https://github.com/your-username/azure-devops-persian-improver.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode"

4. Click "Load unpacked" and select the project folder

## Usage

1. After installation, the extension is automatically enabled
2. Navigate to Azure DevOps pages
3. Gregorian dates will be automatically converted to Jalali dates
4. To enable/disable, click on the extension icon and toggle the checkbox

## Conversion Format

### Date with Year
- **Input**: `Nov 26, 2025`
- **Output**: `Nov 26, 2025 (آذر 5, 1404)`

### Date without Year
- **Input**: `Nov 26`
- **Output**: `Nov 26 (آذر 5)`

## Project Structure

```
azure-devops-persian-improver/
├── assets/
│   └── icon.png          # Extension icon
├── libs/
│   └── jalaali.js        # Jalali date conversion library
├── content.js            # Main date conversion script
├── popup.html            # Popup user interface
├── popup.js              # Popup logic
├── manifest.json         # Extension manifest file
└── README.md             # This file
```

## Technologies

- **Manifest V3**: Latest Chrome Extensions API
- **Jalaali.js**: Library for converting Gregorian to Jalali dates
- **MutationObserver**: For tracking DOM changes

## Development

### Prerequisites
- Chrome or Chromium-based browser
- Code editor (VS Code recommended)

### Building
No build process required, code can be used directly.

### Testing
1. Install the extension in Developer mode
2. Navigate to Azure DevOps pages
3. Make changes to files
4. Click "Reload" button in `chrome://extensions/` page
5. Refresh the Azure DevOps page

## License

This project is licensed under the MIT License.

## Contributing

Contributions, issues, and pull requests are welcome!

## Author

Made with ❤️ for the Persian-speaking community

## Changelog

### Version 1.5
- Convert dates without year using Persian month names
- Improved algorithm to prevent double conversion
- Fixed bug with duplicate dates in tooltips

### Version 1.0
- Initial release
- Gregorian to Jalali date conversion
- Popup user interface
