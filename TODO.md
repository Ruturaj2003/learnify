# Priority Features

## PDF Buffer in model right now is not set as reuired , later do it ok

1. **Add General Loading Spinners**

   - Show spinners during any data fetching or processing.

2. **Improve Explanation Fetching Logic**

   - When fetching an explanation, first clear the existing one.
   - If the requested explanation is different, clear the old one, fetch the new one, and show a loading spinner until it's ready.

3. **Complete Remaining Routes for Quiz Analysis**

   - Add all missing API routes and frontend pages related to quiz performance analysis.

4. **Update Quiz Completion Data**

   - After a quiz is completed, update the user's quiz stats properly in the database.

5. **Implement Book Deletion on Dashboard**

   - Allow users to delete books from their dashboard view.

6. **Add Book Stats in Dashboard**

   - Track each time a book is accessed (store timestamps in an array).
   - Display a graph showing access history.
   - Track and display the average quiz performance for each book.
   - Might need to update the database structure for this.

7. **Update Book Upload Flow**
   - While uploading a book, allow users to choose which page to start from (skip pages if needed).
   - Update the Learnify Worker accordingly to handle this change.

## Use React Swipe for Using Gestures for changing pages and also for quiz

## Handle Markdown Data , right now only simple text is handled

## Add Screen Shots in Manifest File

"screenshots": [
{
"src": "/screenshot-desktop.png",
"type": "image/png",
"sizes": "1280x720"
},
{
"src": "/screenshot-mobile.png",
"type": "image/png",
"sizes": "750x1334"
}
]

# To Do When Time is There

## About The Quiz Analysis

We always just tell which was wrong answer or just tell a simple explation about the correct answer , but i dont think we actually analze the worng asnwer and tell why it was worng

Basically , u should know why your asnwers wasnt correct , not just what is the right answer

## time of Answer review

Let user decide if they want review after every question or at the end of the quiz
You could even add a "Hybrid Mode" where users get instant feedback for wrong answers but wait until the end for correct ones.
Track confidence levels and prioritize explanations based on uncertain answers.
