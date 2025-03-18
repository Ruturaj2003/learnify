### Explanation of `stores` Folder:

1. **index.ts**

   - Acts as a central export point for all stores, making imports cleaner:

   ```ts
   export { useBookStore } from './bookStore';
   export { useSectionStore } from './sectionStore';
   export { useQuizStore } from './quizStore';
   export { useExplanationStore } from './explanationStore';
   export { usePerformanceStore } from './performanceStore';
   export { useUserStore } from './userStore';
   ```

2. **bookStore.ts**

   - Manages book-related state like uploaded book data and processed sections.

3. **sectionStore.ts**

   - Handles the currently selected section and its content.

4. **quizStore.ts**

   - Manages quiz-related state, including generated quizzes and user answers.

5. **explanationStore.ts**

   - Stores AI-generated explanations and tracks detail preferences.

6. **performanceStore.ts**

   - Maintains user performance data, scores, and progress tracking.

7. **userStore.ts**
   - Manages user authentication data and preferences.
