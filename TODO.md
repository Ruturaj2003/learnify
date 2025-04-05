## Use React Swipe for Using Gestures for changing pages and also for quiz

## Add the Ui and Logic of book view , sections and etc

- All will have common component of listing the section
- when one clicks on learn , it will set the Global State value to learn
- The list rendered will check the value of type and then use that for naviagtion of the section ,
- When the select field is changed it will chagne the GLobal State value aswell

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

## Add Protected Routes in middleware , Clerk now keeps all public by default

## About The Quiz Analysis

We always just tell which was wrong answer or just tell a simple explation about the correct answer , but i dont think we actually analze the worng asnwer and tell why it was worng

Basically , u should know why your asnwers wasnt correct , not just what is the right answer

## time of Answer review

Let user decide if they want review after every question or at the end of the quiz
You could even add a "Hybrid Mode" where users get instant feedback for wrong answers but wait until the end for correct ones.
Track confidence levels and prioritize explanations based on uncertain answers.
