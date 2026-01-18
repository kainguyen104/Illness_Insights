# Illness Insights

## Overview

Illness Insights is a web-based health education tool designed to help users identify potential illnesses by analyzing their symptoms. Our goal is to provide a resource for recognizing health issues early and taking preventive measures.

Although our tool offers valuable insights, consulting a healthcare professional remains essential for accurate diagnosis and treatment.

We aim to create awareness about common health conditions and empower users to make informed decisions regarding their well-being.

## Features

- 🔍 **Symptom Checker** - Input symptoms and get AI-powered health advice and recommendations
- 📋 **Petition System** - Sign our petition to advocate for better health education and preventive care
- 🌙 **Dark Mode** - Toggle between light and dark themes for comfortable viewing
- ♿ **Accessibility** - Reduce motion option for users with motion sensitivity
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 💡 **AI Suggestions** - Real-time suggestions as you type in the petition form

## Supported Symptoms

The AI suggestion system currently supports:
- Fever
- Cough
- Headache
- Fatigue
- Nausea
- Body Ache
- Cold
- Sore Throat
- Stomach Ache
- Dizziness

## How to View the Website

### Quick Start

```powershell
python -m http.server 8000
```

Then visit: `http://localhost:8000`

### Other Options

**Live Server (VS Code Extension):**
1. Right-click `index.html` → "Open with Live Server"
2. Browser opens at `http://localhost:5500`

**Node.js HTTP Server:**
```powershell
npm install -g http-server
http-server
```
Visit: `http://localhost:8080`

**GitHub Pages:**
1. Push to GitHub
2. Settings → Pages → Select `main` branch
3. Live at: `https://YOUR_USERNAME.github.io/illness-insight`

## How to Use

1. **Symptom Checker**: 
   - Scroll to "Check Your Symptoms" section
   - Enter any symptom you're experiencing
   - Click "Check Symptom" or press Enter
   - Get personalized health advice

2. **Sign Petition**: 
   - Fill in your name, hometown, and email
   - Click "Sign Now" to add your signature
   - Get instant health tips as you type

## Project Structure

```
Illness_Insights/
├── index.html          # Main HTML file
├── index.js            # JavaScript functionality
├── styles.css          # Styling
├── reset.css           # CSS reset
├── readme.md           # Project documentation
└── img/                # Images folder
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (No frameworks)

## Important Disclaimer

⚠️ **This tool provides general information only and is not a substitute for professional medical advice.** Always consult a qualified healthcare professional for proper diagnosis and treatment of any health condition.

## Author

Created as an educational health awareness project.

---

**Note:** Stop the server anytime by pressing `Ctrl + C` in the terminal.

