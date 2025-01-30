# Collatz Quest 🔢✨

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue?style=for-the-badge&logo=github)](https://mohdjey123.github.io/collatz-quest)
[![Last Number Checked](https://img.shields.io/badge/dynamic/json?url=https://gist.githubusercontent.com/Mohdjey123/641742d2b625cd291d3944792c21dfeb/raw/data.json&query=$.lastNumber&label=Last%20Number%20Checked&style=for-the-badge)](https://gist.github.com/Mohdjey123/641742d2b625cd291d3944792c21dfeb)
[![Update Frequency](https://img.shields.io/badge/Updates%20Every-1%20Minute-success?style=for-the-badge)](https://github.com/Mohdjey123/collatz-quest/actions)

## About The Project

Collatz Quest is a collaborative exploration of the famous Collatz Conjecture, one of mathematics' most intriguing unsolved problems. This interactive web application allows users worldwide to contribute to the search for a potential counterexample while visualizing the fascinating patterns within the conjecture.

### The Collatz Conjecture

Take any positive integer n:
- If n is even, divide it by 2
- If n is odd, multiply it by 3 and add 1
- Repeat this process

The conjecture states that this sequence will eventually reach 1 for all positive integers. While this has been verified for numbers up to 2^68, it remains unproven for all numbers.

## ✨ Features

- 📊 Real-time visualization of Collatz sequences
- 🌐 Collaborative exploration with 1-minute data sync
- 📈 Interactive charts with logarithmic scaling
- 🏆 Record tracking for longest sequences
- 🔄 Auto-calculation mode
- 🌙 Modern dark theme interface
- 📱 Fully responsive design
- 💾 Progress persistence across sessions
- 🔗 Shareable discoveries
- ⚡ Near real-time global updates

## 🚀 Live Demo

Visit the live application: [Collatz Quest](https://mohdjey123.github.io/collatz-quest)

## 📈 Current Progress

Our community has explored numbers up to `[dynamic-last-number]`. The current record holders for longest sequences can be viewed in the application.

## 🛠️ Setup

1. Fork this repository
2. Create a public GitHub Gist:
   - Create a new Gist with your data.json content
   - Copy the Gist ID from the URL
3. Set up GitHub Actions:
   - Generate a Personal Access Token with `gist` scope
   - Add secrets to your repository:
     - `GIST_TOKEN`: Your personal access token
     - `GIST_ID`: Your Gist ID
4. Enable GitHub Pages in your repository settings
5. Update the Gist ID in app.js and README badges
6. Your instance will be live at `https://[your-username].github.io/collatz-quest`

## 🤝 Contributing

Join our quest to explore the Collatz Conjecture! Here's how you can contribute:

1. 🔍 Visit the website and let the auto-calculator run
2. 🐛 Report any bugs or issues
3. 💡 Suggest new features
4. 🔧 Submit pull requests

### Development

To run locally:
```bash
# Clone the repository
git clone https://github.com/mohdjey123/collatz-quest.git

# Navigate to the directory
cd collatz-quest

# Serve with any static file server
# Example using Python
python -m http.server 8000

# Example using Node.js
npx serve
```

## 📊 Data Storage

- Local progress saved in browser storage
- Global records maintained in GitHub Gist
- Data automatically updated every 1 minutes
- Fallback to local storage if Gist is unavailable
- Real-time synchronization between all users
- Manual updates can be triggered through GitHub Actions

## 🔬 Scientific Interest

While this project doesn't aim to prove the conjecture, it provides an interactive way to explore its patterns and potentially discover interesting sequences. All numbers up to 2^68 have been verified to reach 1, but the conjecture remains unproven for all positive integers.

## 🔄 Synchronization

The project uses a combination of:
- GitHub Gist for near real-time global state
- Local storage for immediate updates
- 5-minute sync intervals for all users
- Automatic fallback mechanisms for reliability

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Chart.js for visualization
- GitHub Gist for real-time data storage
- GitHub Actions for automated updates
- The mathematical community for ongoing research
- All contributors to this exploration

---
