# Learnify : Dynamic Learning System

## Overview

The **Dynamic Learning System** is an AI-powered personalized learning assistant that dynamically generates explanations, quizzes, and progress tracking based on user interactions. It enhances the learning process by providing tailored study materials and adaptive quizzes.

## Features & Workflow

### 1. **Book Upload & Processing**

- Users can upload books in **PDF, EPUB, and other formats**.
- The system extracts the **Table of Contents (ToC)** and divides the book into manageable sections.

### 2. **Dynamic Content Explanation**

- Users select a section they want to study.
- The selected text is processed by an **AI API** (OpenAI, Claude, Gemini, etc.).
- The AI provides **simplified or detailed** explanations based on user preferences.

### 3. **Quiz Generation & Scoring**

- AI generates **10 dynamic questions per section**:
  - **4 Easy**
  - **3 Medium**
  - **3 Hard**
- Each quiz attempt generates **new questions** to prevent repetition.
- AI evaluates quiz responses and provides **automated grading**.

### 4. **Performance Tracking & Recommendations**

- **Grade Dashboard**: Users can track performance per book and section.
- **Dynamic Quiz Evaluation**: AI suggests topics to revisit based on quiz scores.
- **Progress Bars**: Visual tracking of learning progress for each section.
- **Knowledge Score**: Aggregates quiz performance to measure understanding.

## Tech Stack (probly)

| Component           | Technology                                            |
| ------------------- | ----------------------------------------------------- |
| **Frontend**        | React.js / Next.js                                    |
| **Backend**         | Firebase (Storage, Authentication, Real-time updates) |
| **AI Processing**   | OpenAI / Gemini (for explanations & quiz generation)  |
| **Database**        | Firestore (Stores progress, quiz results, user data)  |
| **File Processing** | PDF.js / PyMuPDF (Extracts ToC & text)                |

## How to Run the Project

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-repo/dynamic-learning-system.git
   cd dynamic-learning-system
   ```
2. **Install Dependencies**:
   ```sh
   npm install
   ```
3. **Set Up Firebase**:
   - Configure Firebase Authentication and Firestore.
   - Add Firebase configuration to the project.
4. **Run the Application**:
   ```sh
   npm run dev
   ```

## Future Enhancements

- **Gamification Elements** (Badges, Leaderboards, Streaks).

## License

This project is licensed under the **MIT License**.

---

Developed with ❤️ by **DOTAIZZ**
