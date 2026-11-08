# IT Fix Hub — by Abdul Rahaman

> Your complete cross-platform troubleshooting guide — covering Windows, macOS, Linux, Android, iOS, and Dual Boot.

**IT Fix Hub** is a searchable, categorized library of IT troubleshooting guides built by **Abdul Rahaman**. It is designed to take a complete beginner from first-day basics to advanced, pro-level problem solving across all major desktop and mobile operating systems.

## 🌟 Supported Operating Systems & Platforms

1. 🪟 **Windows (10 & 11)** — Complete guides covering desktop navigation, Wi-Fi, printers, registry edits, services, BSOD recovery, and performance tuning.
2. 🍎 **macOS (Apple Silicon & Intel)** — Finder, Gatekeeper security, Time Machine snapshots, CUPS printing, Recovery Mode, SMC/NVRAM, and quarantine removal.
3. 🐧 **Linux (Ubuntu, Debian, Fedora, Arch)** — Shell basics, package managers (`apt`, `dnf`, Flatpak), NetworkManager, systemd service diagnostics, htop, and emergency mode fsck.
4. 🤖 **Android (Samsung, Pixel, Mobile OS)** — Storage cleanup, Google Play Store errors, battery drain & wakelocks, network resets, and Recovery Mode cache wiping.
5. 📱 **iOS (iPhone & iPad)** — Storage full / System Data purging, battery health & background refresh, Wi-Fi & cellular fixes, DFU recovery, and panic-full log decoding.
6. ⚡ **Dual Boot & Multiboot** — Windows + Linux coexistence, RTC clock desync fix, Fast Startup NTFS drive unlocking, BitLocker TPM validation, and GRUB rescue recovery.

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Setup
```bash
# Clone or download the project
cd "ANTIGRAVITY MY WEBSITE"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server starts at `http://localhost:5173` by default.

## 📁 Project Structure

```
├── index.html                          # Entry HTML
├── package.json                        # Dependencies & scripts
├── vite.config.js                      # Vite configuration
├── README.md                           # This file
├── public/
│   └── favicon.svg                     # Site favicon
└── src/
    ├── main.jsx                        # React entry point
    ├── App.jsx                         # Routes & layout
    ├── index.css                       # All styles
    ├── components/                     # Reusable components
    │   ├── Header.jsx                  # Site header with nav & OS selector
    │   ├── Footer.jsx                  # Site footer
    │   ├── SearchBar.jsx               # Debounced search input
    │   ├── GuideCard.jsx               # Guide preview card
    │   ├── StepList.jsx                # Step-by-step fix renderer
    │   ├── WarningBox.jsx              # Warning/info/danger alerts
    │   ├── LevelBadge.jsx              # Skill level badge
    │   ├── CategoryFilter.jsx          # Category filter pills
    │   └── OSSelector.jsx              # Operating system selector
    ├── pages/                          # Page components
    │   ├── Home.jsx                    # Landing page
    │   ├── GuidesLibrary.jsx           # Searchable guide listing
    │   ├── GuideView.jsx               # Individual guide detail
    │   ├── SymptomSearch.jsx           # Symptom-based search
    │   ├── LearningPath.jsx            # Skill progression path
    │   └── About.jsx                   # About page
    ├── content/                        # All content (JSON)
    │   ├── os-config.json              # OS definitions
    │   └── windows/                    # Windows-specific content
    │       ├── beginner/guides.json    # Beginner guides
    │       ├── intermediate/guides.json # Intermediate guides
    │       ├── advanced/guides.json    # Advanced guides
    │       └── symptoms.json           # Symptom-to-guide mapping
    └── utils/                          # Utilities
        ├── contentLoader.js            # Content loading functions
        └── search.js                   # Search logic
```

## 📝 How to Add a New Guide

1. Open the appropriate level file in `src/content/windows/`:
   - `beginner/guides.json` for beginner guides
   - `intermediate/guides.json` for intermediate guides
   - `advanced/guides.json` for advanced guides

2. Add a new guide object to the `"guides"` array:

```json
{
  "id": "unique-slug-id",
  "title": "Your Guide Title",
  "symptom": "How a user would describe the problem in plain language",
  "description": "Brief 1-2 sentence description",
  "category": "existing-category-slug",
  "categoryName": "Category Display Name",
  "categoryIcon": "🔧",
  "keywords": ["search", "keywords", "for", "matching"],
  "causes": [
    "Why this problem happens - reason 1",
    "Why this problem happens - reason 2"
  ],
  "whyItWorks": "A clear explanation of why the fix works, written for the target skill level.",
  "steps": [
    {
      "instruction": "Short step title",
      "detail": "Detailed explanation of what to do. Include exact paths like Settings > System > Display.",
      "warning": "Optional warning text for risky steps",
      "adminRequired": false,
      "backupAdvised": false
    }
  ]
}
```

3. **Add symptom mappings** — Edit `src/content/windows/symptoms.json` to map plain-language symptoms to your new guide:

```json
{
  "id": "symptom-slug",
  "text": "How a user describes this problem",
  "icon": "🔧",
  "keywords": ["search", "terms"],
  "guideIds": ["your-new-guide-id"],
  "category": "Category Name"
}
```

4. The guide will automatically appear in the library, search, and learning path.

## 🌐 How to Add a New Operating System

The site is designed to support multiple operating systems. To add one:

1. **Create the content directory:**
   ```
   src/content/[os-id]/
   ├── beginner/guides.json
   ├── intermediate/guides.json
   ├── advanced/guides.json
   └── symptoms.json
   ```

2. **Update `src/content/os-config.json`** — Set `"available": true` for your new OS:
   ```json
   {
     "id": "macos",
     "name": "macOS",
     "icon": "🍎",
     "description": "macOS troubleshooting guides",
     "available": true
   }
   ```

3. **Update `src/utils/contentLoader.js`** — Add imports for the new OS's guide files and update the functions to handle the new OS ID.

4. The OS will automatically appear in the OS selector, navigation, and all pages.

## 🏗️ Tech Stack

- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Vite** — Build tool & dev server
- **Vanilla CSS** — Styling with CSS custom properties
- **JSON files** — Content storage (easily editable, no database needed)

## 📋 Content Guidelines

When writing guides, follow these principles:

- **Symptom-first**: Start with how a user would describe the problem, not the technical cause
- **Ordered by safety**: List fixes from safest/easiest to most invasive/risky
- **Clear warnings**: Always warn before steps that require admin, could lose data, or are irreversible
- **Backup reminders**: Include backup advice before risky operations
- **Why it works**: Explain the underlying concept so users learn, not just follow steps
- **Exact paths**: Include specific Windows paths (Settings > System > Display) and exact commands
- **Level-appropriate language**: Beginner guides should explain everything; advanced guides can assume base knowledge

## 👨‍💻 Created By

**Abdul Rahaman** — IT Professional & Troubleshooting Expert  
📧 **Email:** [abdulrahaman.vazeed@gmail.com](mailto:abdulrahaman.vazeed@gmail.com)  
🔗 **LinkedIn:** [linkedin.com/in/abdul-rahaman-itsupport-with-ai](https://www.linkedin.com/in/abdul-rahaman-itsupport-with-ai)

Built with ❤️ to make IT troubleshooting accessible to everyone.

© 2026 Abdul Rahaman. All rights reserved.
