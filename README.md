# Collatz Quest 🔢✨

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue?style=for-the-badge&logo=github)](https://mohdjey123.github.io/collatz-quest)
[![Last Number Checked](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/mohdjey123/collatz-quest/main/data.json&query=$.lastNumber&label=Last%20Number%20Checked&style=for-the-badge)](data.json)

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
- 🌐 Collaborative exploration tracking global progress
- 📈 Interactive charts with logarithmic scaling
- 🏆 Record tracking for longest sequences
- 🔄 Auto-calculation mode
- 🌙 Modern dark theme interface
- 📱 Fully responsive design
- 💾 Progress persistence across sessions
- 🔗 Shareable discoveries

## 🚀 Live Demo

Visit the live application: [Collatz Quest](https://mohdjey123.github.io/collatz-quest)

## 📈 Current Progress

Our community has explored numbers up to `[dynamic-last-number]`. The current record holders for longest sequences can be viewed in the application.

## 🛠️ Setup

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Update the GitHub Action secret `DOWNLOAD_URL` to point to your data.json file
4. Your instance will be live at `https://mohdjey123.github.io/collatz-quest`

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
```

## 📊 Data Storage

- Local progress is saved in browser storage
- Global records are maintained in `data.json`
- Data is automatically updated every 6 hours
- Manual updates can be triggered through the GitHub Action

## 🔬 Scientific Interest

While this project doesn't aim to prove the conjecture, it provides an interactive way to explore its patterns and potentially discover interesting sequences. All numbers up to 2^68 have been verified to reach 1, but the conjecture remains unproven for all positive integers.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Chart.js for visualization
- The mathematical community for ongoing research into the Collatz Conjecture
- All contributors to this exploration

---

<p align="center">Made with ❤️ by the mathematics community</p>