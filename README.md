# 🤖 DSA Instructor Chatbot

A premium, AI-powered "Data Structures and Algorithms" instructor that helps you master coding concepts through interactive chat. Built with a modern dark-mode UI, voice interaction, and bilingual support.

![Project Preview](public/preview.png)
*(Note: Add a screenshot of your app here)*

## ✨ Features

- **🧠 AI-Powered**: Uses the **Groq API (Llama 3.1)** to provide instant, accurate explanations for complex DSA topics.
- **🎙️ Voice Interaction**: Ask questions using your voice! Supports both **English (US)** and **Hindi (IN)** via the Web Speech API.
- **🎨 Premium UI**: A sleek, responsive interface featuring glassmorphism, smooth gradients, and a "Matrix-style" dark mode.
- **💻 Syntax Highlighting**: Beautifully formatted code snippets using **Prism.js**.
- **⚡ Fast & Lightweight**: Built with Vanilla JS, HTML5, and CSS3 on the frontend, and a lightweight Express.js backend.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Prism.js
- **Backend**: Node.js, Express.js
- **AI Model**: Groq SDK (Llama 3.1-8b-instant)
- **API**: Web Speech API (Browser Native)

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- A **Groq API Key** (Get one for free at [console.groq.com](https://console.groq.com/)).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/dsa-chatbot.git
    cd dsa-chatbot
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your API key:
    ```env
    GROQ_API_KEY=your_groq_api_key_here
    ```

4.  **Run the Server**
    ```bash
    npm start
    ```

5.  **Open in Browser**
    Visit `http://localhost:3000` to start learning!

## 📖 How to Use

1.  **Type or Speak**: Type your question or click the **Microphone 🎤** icon.
2.  **Select Language**: Use the dropdown to switch voice input between **English 🇺🇸** and **Hindi 🇮🇳**.
3.  **Get Answers**: The AI will explain the concept, provide code examples, and guide you.
4.  **Code Blocks**: All code examples are automatically highlighted for better readability.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
