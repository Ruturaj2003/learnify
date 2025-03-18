### ✅ **1. Global Store (GlobalStore)**

- **Purpose:** Manages the global app state such as the current mode (`learn`, `quiz`, `explain`) and the selected section.
- **State to Manage:**
  - `currentSection` (Selected section)
  - `mode` (Learn, Quiz, Explain)
- **Why?** It handles app-wide states used across multiple components.

---

### ✅ **2. Book Store (BookStore)**

- **Purpose:** Stores book-related data like uploaded books and extracted sections.
- **State to Manage:**
  - `books` (Array of books with sections)
  - `currentBook` (Selected book)
- **Why?** It ensures proper management of uploaded books and supports future scalability.

---

### ✅ **3. Quiz Store (QuizStore)**

- **Purpose:** Manages quiz generation, user answers, and scores.
- **State to Manage:**
  - `questions` (Quiz questions)
  - `answers` (User's answers)
  - `score` (Evaluation result)
- **Why?** Keeping quiz logic separate avoids unnecessary re-renders.

---

### ✅ **4. Explanation Store (ExplanationStore)**

- **Purpose:** Handles AI-generated explanations and tracks user preferences.
- **State to Manage:**
  - `explanation` (AI-generated text)
  - `detailLevel` (Simple or Detailed)
- **Why?** It isolates AI-based content generation logic.

---

### ✅ **5. Performance Store (PerformanceStore)**

- **Purpose:** Tracks the user’s progress and performance across books and sections.
- **State to Manage:**
  - `performanceData` (Scores and progress per section)
- **Why?** It simplifies data management for dashboards and progress tracking.

---

### ✅ **Summary**

- **GlobalStore:** For navigation and mode management.
- **BookStore:** For book and section management.
- **QuizStore:** For quizzes and evaluation.
- **ExplanationStore:** For AI-based explanations.
- **PerformanceStore:** For tracking user progress.
