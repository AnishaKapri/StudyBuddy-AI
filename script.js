function selectMode(mode) {
  const learningArea = document.getElementById("learning-area");
  const workspaceDescription = document.getElementById("workspace-description");
  const quizArea = document.getElementById("quiz-area");
  const flashcardArea = document.getElementById("flashcard-area");

  // Hide all learning sections first
  learningArea.hidden = true;
  quizArea.hidden = true;
  flashcardArea.hidden = true;

  // Show the selected learning mode
  if (mode === "Explain a Topic" || mode === "Ask a Question") {
    learningArea.hidden = false;

    if (workspaceDescription) {
      workspaceDescription.textContent =
        mode === "Explain a Topic"
          ? "Enter a C++ OOP topic to learn about it."
          : "Enter your C++ OOP question below.";
    }

    document.getElementById("learning-area").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (mode === "Take a Quiz") {
    quizArea.hidden = false;
    startQuiz();

    quizArea.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (mode === "Flashcards") {
    flashcardArea.hidden = false;
    startFlashcards();

    flashcardArea.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function explainTopic() {
  const input = document.getElementById("topic-input");
  const answer = document.getElementById("answer");

  const topic = input.value
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[?!.]+/g, " ")
    .replace(
      /\b(can you|could you|please|tell me|explain|describe|define|what is|what are|whats|how does|how do|how can|help me understand|i want to know about|teach me about)\b/g,
      " ",
    )
    .replace(
      /\b(about|the|a|an|in simple words|with an example|with example|with code|with a code example|example|code)\b/g,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();

  const explanations = {
    class: {
      explanation: "A class is a blueprint for creating objects.",
      example:
        "A Car design describes what a car has and does. Individual cars are objects created from that design.",
      code: `#include <iostream>
#include <string>
using namespace std;

class Car {
public:
    string color;

    void drive() {
        cout << "Car is moving";
    }
};

int main() {
    Car myCar;
    myCar.color = "Red";
    myCar.drive();
    return 0;
}`,
    },

    object: {
      explanation: "An object is an instance of a class.",
      example:
        "If Car is a class, myCar can be an object created from that class.",
      code: `class Car {
public:
    string color;
};

int main() {
    Car myCar;
    myCar.color = "Red";
    return 0;
}`,
    },

    "class and object": {
      explanation:
        "A class is a blueprint, while an object is an instance created from that blueprint.",
      example:
        "A Student class describes students. Each individual student can be represented by an object.",
      code: `class Student {
public:
    string name;
};

int main() {
    Student student1;
    student1.name = "Aman";
    return 0;
}`,
    },

    inheritance: {
      explanation:
        "Inheritance allows one class to acquire properties and functions from another class.",
      example: "A Dog class can inherit a function from an Animal class.",
      code: `class Animal {
public:
    void eat() {
        cout << "Eating";
    }
};

class Dog : public Animal {
};

int main() {
    Dog d;
    d.eat();
    return 0;
}`,
    },

    polymorphism: {
      explanation:
        "Polymorphism allows the same function interface to behave differently in different situations.",
      example:
        "Different animal classes can provide their own versions of a sound function.",
      code: `class Animal {
public:
    virtual void sound() {
        cout << "Animal sound";
    }
};

class Dog : public Animal {
public:
    void sound() override {
        cout << "Bark";
    }
};`,
    },

    encapsulation: {
      explanation:
        "Encapsulation combines data and functions inside a class and controls access to the data.",
      example:
        "A BankAccount class can keep its balance private and provide a function to check it.",
      code: `class BankAccount {
private:
    double balance = 1000;

public:
    double getBalance() {
        return balance;
    }
};`,
    },

    abstraction: {
      explanation:
        "Abstraction hides unnecessary implementation details and shows essential features.",
      example:
        "You can drive a car using its controls without knowing how its engine works internally.",
      code: `class Car {
public:
    void start() {
        cout << "Car started";
    }
};`,
    },

    constructor: {
      explanation:
        "A constructor is a special member function called automatically when an object is created.",
      example:
        "A Student constructor can set the student's name when the object is created.",
      code: `class Student {
public:
    string name;

    Student() {
        name = "Aman";
    }
};`,
    },

    destructor: {
      explanation:
        "A destructor is a special member function called when an object is destroyed.",
      example:
        "A destructor can perform cleanup when an object is no longer needed.",
      code: `class Demo {
public:
    ~Demo() {
        cout << "Object destroyed";
    }
};`,
    },

    "access specifiers": {
      explanation:
        "Access specifiers control access to class members. The main C++ access specifiers are public, private, and protected.",
      example:
        "A private bank balance cannot be accessed directly from outside the class.",
      code: `class Account {
private:
    double balance = 500;

public:
    double getBalance() {
        return balance;
    }
};`,
    },

    "data hiding": {
      explanation:
        "Data hiding restricts direct access to internal data, often by using private members.",
      example: "A class can protect its balance from being changed directly.",
      code: `class Account {
private:
    int balance = 1000;
};`,
    },

    "function overloading": {
      explanation:
        "Function overloading allows multiple functions to have the same name but different parameter lists.",
      example:
        "An add function can accept either two integers or two decimal numbers.",
      code: `int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}`,
    },

    "operator overloading": {
      explanation:
        "Operator overloading allows operators to work with user-defined types.",
      example:
        "You can define what the + operator means when adding two objects of a class.",
      code: `class Number {
public:
    int value;

    Number operator+(const Number& other) {
        Number result;
        result.value = value + other.value;
        return result;
    }
};`,
    },

    "multiple inheritance": {
      explanation:
        "Multiple inheritance allows a class to inherit from more than one base class.",
      example:
        "A SmartDevice class could inherit features from both Camera and Phone.",
      code: `class Camera {
};

class Phone {
};

class SmartDevice : public Camera, public Phone {
};`,
    },

    "virtual function": {
      explanation:
        "A virtual function supports runtime polymorphism when overridden in a derived class.",
      example:
        "A Dog object can provide its own sound when accessed through an Animal pointer.",
      code: `class Animal {
public:
    virtual void sound() {
        cout << "Animal sound";
    }
};`,
    },

    "friend function": {
      explanation:
        "A friend function is allowed to access the private and protected members of a class.",
      example:
        "A friend function can read a class's private value when the class grants permission.",
      code: `class Box {
private:
    int value = 10;

    friend void show(Box b);
};

void show(Box b) {
    cout << b.value;
}`,
    },

    "this pointer": {
      explanation:
        "The this pointer refers to the current object whose member function is running.",
      example:
        "If each Student object has its own name, the this pointer helps the object refer to its own name.",
      code: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;

    void setName(string name) {
        this->name = name;
    }

    void showName() {
        cout << this->name;
    }
};

int main() {
    Student s1;
    s1.setName("Aman");
    s1.showName();
    return 0;
}`,
    },

    "static members": {
      explanation:
        "A static data member belongs to the class and is shared by all objects of that class.",
      example:
        "A class can use a shared counter to count how many Student objects have been created.",
      code: `#include <iostream>
using namespace std;

class Student {
public:
    static int count;

    Student() {
        count++;
    }
};

int Student::count = 0;

int main() {
    Student s1;
    Student s2;
    cout << Student::count;
    return 0;
}`,
    },

    "abstract class": {
      explanation:
        "An abstract class has at least one pure virtual function and cannot be used to create objects directly.",
      example:
        "You cannot create a general Shape object if Shape is designed to be a base for specific shapes.",
      code: `class Shape {
public:
    virtual void draw() = 0;
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing Circle";
    }
};`,
    },

    "pure virtual function": {
      explanation:
        "A pure virtual function is declared with = 0 and must be implemented by a concrete derived class.",
      example:
        "A Shape class can require every specific shape to provide its own draw function.",
      code: `class Shape {
public:
    virtual void draw() = 0;
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing Circle";
    }
};`,
    },

    "function overriding": {
      explanation:
        "Function overriding happens when a derived class provides its own implementation of a virtual function from a base class.",
      example:
        "A Dog class can provide its own sound instead of using the general Animal sound.",
      code: `class Animal {
public:
    virtual void sound() {
        cout << "Animal sound";
    }
};

class Dog : public Animal {
public:
    void sound() override {
        cout << "Bark";
    }
};`,
    },

    composition: {
      explanation:
        "Composition is a relationship in which one class contains an object of another class as part of itself.",
      example: "A Car can contain an Engine object as one of its parts.",
      code: `class Engine {
public:
    void start() {
        cout << "Engine started";
    }
};

class Car {
public:
    Engine engine;
};`,
    },

    aggregation: {
      explanation:
        "Aggregation is a relationship where one object uses or refers to another object, but they can exist independently.",
      example:
        "A Teacher can work with a Department without the Department being owned exclusively by that Teacher.",
      code: `class Department {
};

class Teacher {
public:
    Department* department;

    Teacher(Department* d) {
        department = d;
    }
};`,
    },

    "copy constructor": {
      explanation:
        "A copy constructor creates a new object using another object of the same class.",
      example:
        "You can create a second Student object by copying the details of an existing Student object.",
      code: `class Student {
public:
    int marks;

    Student(int m) : marks(m) {
    }

    Student(const Student& other) {
        marks = other.marks;
    }
};`,
    },

    "shallow copy and deep copy": {
      explanation:
        "A shallow copy copies member values directly, including pointer addresses. A deep copy creates separate copies of dynamically allocated data.",
      example:
        "If two objects point to the same allocated memory, changing or deleting that memory can affect both. A deep copy gives each object its own memory.",
      code: `// Conceptual example
class Example {
public:
    int* value;

    Example(int n) {
        value = new int(n);
    }

    ~Example() {
        delete value;
    }
};`,
    },
  };

  if (topic === "") {
    answer.textContent = "Please enter a topic first.";
  } else if (explanations[topic] || explanations[findOOPTopic(input.value)]) {
    const matchedKey = explanations[topic] ? topic : findOOPTopic(input.value);
    const item = explanations[matchedKey];

    const safeCode = item.code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    answer.innerHTML = `
    <h3>Simple Explanation</h3>
    <p>${item.explanation}</p>

    <h3>Real-Life Example</h3>
    <p>${item.example}</p>

    <h3>C++ Code Example</h3>
    <button id="copy-code-button" type="button">Copy Code</button>
    <pre><code id="cpp-code">${safeCode}</code></pre>
    <h3>Key Points to Remember</h3>
<ul>
  <li>Understand the main concept before memorizing the code.</li>
  <li>Connect the concept with its real-life example.</li>
  <li>Practice explaining the concept in your own words.</li>
</ul>
  `;

    document.getElementById("copy-code-button").onclick = async () => {
      try {
        await navigator.clipboard.writeText(item.code);
        document.getElementById("copy-code-button").textContent = "Copied!";
      } catch (error) {
        alert("Copy failed. Please select the code and copy it manually.");
      }
    };
  } else {
    const topicAliases = {
      "class and object": [
        "difference between class and object",
        "difference between object and class",
        "class vs object",
        "class versus object",
      ],
      inheritance: [
        "how inheritance works",
        "types of inheritance",
        "parent child class",
        "base and derived class",
      ],
      polymorphism: [
        "how polymorphism works",
        "types of polymorphism",
        "many forms",
      ],
      encapsulation: [
        "how encapsulation works",
        "binding data and functions",
        "data and methods together",
      ],
      abstraction: ["how abstraction works", "hiding implementation details"],

      constructor: [
        "how constructor works",
        "how does constructor work",
        "constructor in cpp",
        "why constructor is used",
        "why do we use constructor",
        "why do we use constructors",
        "purpose of constructor",
        "purpose of a constructor",
        "use of constructor",
        "use of a constructor",
        "constructor purpose",
      ],

      destructor: ["how destructor works", "why destructor is used"],
      "function overloading": [
        "how function overloading works",
        "same function different parameters",
      ],
      "function overriding": [
        "how function overriding works",
        "overriding a function",
      ],
      "copy constructor": [
        "how copy constructor works",
        "copy one object to another",
      ],
      "this pointer": ["how this pointer works", "current object pointer"],
    };

    const matchedTopic = Object.keys(explanations).find((key) => {
      if (topic === key || topic.includes(key)) {
        return true;
      }

      return (topicAliases[key] || []).some((alias) => topic.includes(alias));
    });

    const questionAnswers = [
      {
        matches:
          /difference between (a )?class and (an )?object|class vs object|class versus object/,
        explanation:
          "A class is a blueprint that defines data and functions. An object is an actual instance created from that class.",
        example:
          "Think of a house plan as the class and a real house built from that plan as an object. One class can create many objects.",
      },
      {
        matches:
          /why.*constructor|purpose of (a )?constructor|use of (a )?constructor/,
        explanation:
          "A constructor initializes an object when it is created. It can assign starting values to the object's data members.",
        example:
          "When a Student object is created, its constructor can automatically set the student's name and marks instead of requiring separate setup calls.",
      },
      {
        matches: /how.*this pointer|this pointer.*work/,
        explanation:
          "The this pointer refers to the current object. It is especially useful when a function parameter has the same name as a class member.",
        example:
          "In this->name = name, the name on the left is the current object's member, while the name on the right is the function parameter.",
      },
    ];

    const specialAnswer = questionAnswers.find((item) =>
      item.matches.test(input.value.trim().toLowerCase()),
    );

    if (specialAnswer) {
      answer.innerHTML = `
        <h3>Answer</h3>
        <p>${specialAnswer.explanation}</p>
        <h3>Example</h3>
        <p>${specialAnswer.example}</p>
      `;
      return;
    }

    if (matchedTopic) {
      const item = explanations[matchedTopic];

      const safeCode = item.code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      answer.innerHTML = `
        <h3>Simple Explanation</h3>
        <p>${item.explanation}</p>

        <h3>Real-Life Example</h3>
        <p>${item.example}</p>

        <h3>C++ Code Example</h3>
        <button id="copy-code-button" type="button">Copy Code</button>
        <pre><code id="cpp-code">${safeCode}</code></pre>
      `;

      document.getElementById("copy-code-button").onclick = async () => {
        try {
          await navigator.clipboard.writeText(item.code);
          document.getElementById("copy-code-button").textContent = "Copied!";
        } catch (error) {
          alert("Copy failed. Please select the code and copy it manually.");
        }
      };
    } else {
      answer.textContent =
        "I couldn't match that question to a topic yet. Try asking about class, object, inheritance, polymorphism, encapsulation, or constructor.";
    }
  }
}

const quizQuestions = [
  {
    question: "What is a class in C++?",
    options: [
      "A blueprint for creating objects",
      "A type of loop",
      "A database",
      "A header file",
    ],
    answer: 0,
  },
  {
    question: "What is an object?",
    options: [
      "A function only",
      "An instance of a class",
      "A compiler",
      "A database",
    ],
    answer: 1,
  },
  {
    question:
      "Which concept allows one class to acquire features from another?",
    options: ["Abstraction", "Encapsulation", "Inheritance", "Looping"],
    answer: 2,
  },
  {
    question: "Which concept combines data and functions in a class?",
    options: ["Iteration", "Encapsulation", "Compilation", "Looping"],
    answer: 1,
  },
  {
    question: "What does polymorphism mean?",
    options: [
      "One interface with different behaviours",
      "Creating only one object",
      "Deleting a class",
      "Hiding every function",
    ],
    answer: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let quizAnswered = false;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-score").textContent = "";
  showQuestion();
}

function showQuestion() {
  const question = quizQuestions[currentQuestion];

  document.getElementById("quiz-progress").textContent =
    `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

  document.getElementById("quiz-question").textContent = question.question;
  document.getElementById("quiz-feedback").textContent = "";
  document.getElementById("next-question").hidden = true;

  const optionsArea = document.getElementById("quiz-options");
  optionsArea.innerHTML = "";
  quizAnswered = false;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsArea.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (quizAnswered) return;
  quizAnswered = true;

  const question = quizQuestions[currentQuestion];
  const feedback = document.getElementById("quiz-feedback");

  if (selectedIndex === question.answer) {
    score++;
    feedback.textContent = "Correct! Well done!";
  } else {
    feedback.textContent =
      "Incorrect. Correct answer: " + question.options[question.answer];
  }

  document.querySelectorAll("#quiz-options button").forEach((button) => {
    button.disabled = true;
  });

  const nextButton = document.getElementById("next-question");
  nextButton.hidden = false;
  nextButton.textContent =
    currentQuestion === quizQuestions.length - 1
      ? "See Final Score"
      : "Next Question";
}

function nextQuestion() {
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("quiz-progress").textContent = "Quiz completed!";
  document.getElementById("quiz-question").textContent =
    "Well done for completing the quiz!";

  document.getElementById("quiz-options").innerHTML = "";
  document.getElementById("quiz-feedback").textContent = "";
  document.getElementById("quiz-score").textContent =
    `Your score: ${score} out of ${quizQuestions.length}`;

  const nextButton = document.getElementById("next-question");
  nextButton.textContent = "Try Again";
  nextButton.hidden = false;
  nextButton.onclick = startQuiz;
}

const flashcards = [
  {
    question: "What is a class?",
    answer: "A class is a blueprint for creating objects.",
  },
  {
    question: "What is an object?",
    answer: "An object is an instance of a class.",
  },
  {
    question: "What is inheritance?",
    answer:
      "Inheritance allows a class to acquire features from another class.",
  },
  {
    question: "What is encapsulation?",
    answer:
      "Encapsulation combines data and functions in a class and controls access to the data.",
  },
  {
    question: "What is polymorphism?",
    answer: "Polymorphism allows one interface to have different behaviours.",
  },
];

let currentCard = 0;

function startFlashcards() {
  currentCard = 0;
  showFlashcard();
}

function showFlashcard() {
  const card = flashcards[currentCard];

  document.getElementById("flashcard-progress").textContent =
    `Card ${currentCard + 1} of ${flashcards.length}`;

  document.getElementById("flashcard-question").textContent = card.question;

  const answer = document.getElementById("flashcard-answer");
  answer.textContent = card.answer;
  answer.hidden = true;

  document.getElementById("reveal-answer").hidden = false;
  document.getElementById("next-card").textContent =
    currentCard === flashcards.length - 1 ? "Start Again" : "Next Card";
}

function revealAnswer() {
  document.getElementById("flashcard-answer").hidden = false;
  document.getElementById("reveal-answer").hidden = true;
}

function nextCard() {
  if (currentCard < flashcards.length - 1) {
    currentCard++;
  } else {
    currentCard = 0;
  }

  showFlashcard();
}

/* Step 6: Subject Selector */

const subjectSelect = document.getElementById("subject-select");
const subjectDescription = document.getElementById("subject-description");

subjectSelect.addEventListener("change", function () {
  if (subjectSelect.value === "cpp") {
    subjectDescription.textContent =
      "Learn C++ OOP concepts, practise quiz questions, and revise with flashcards.";
  }
});

/* Step 7: C++ OOP Topic Search */

const topicSearchInput = document.getElementById("topic-search-input");
const topicSearchResults = document.getElementById("topic-search-results");

const oopTopics = [
  "Class",
  "Object",
  "Class and Object",
  "Inheritance",
  "Polymorphism",
  "Encapsulation",
  "Abstraction",
  "Constructor",
  "Destructor",
  "Access Specifiers",
  "Data Hiding",
  "Function Overloading",
  "Operator Overloading",
  "Multiple Inheritance",
  "Virtual Function",
  "Friend Function",
  "This Pointer",
  "Static Members",
  "Abstract Class",
  "Pure Virtual Function",
  "Function Overriding",
  "Composition",
  "Aggregation",
  "Copy Constructor",
  "Shallow Copy and Deep Copy",
];

topicSearchInput.addEventListener("input", function () {
  const searchText = topicSearchInput.value.trim().toLowerCase();

  topicSearchResults.innerHTML = "";

  if (searchText === "") {
    return;
  }

  const matchingTopics = oopTopics.filter(function (topic) {
    return topic.toLowerCase().includes(searchText);
  });

  if (matchingTopics.length === 0) {
    topicSearchResults.innerHTML =
      '<p class="topic-search-empty">No matching topic found. Try another keyword.</p>';
    return;
  }

  matchingTopics.forEach(function (topic) {
    const resultButton = document.createElement("button");

    resultButton.type = "button";
    resultButton.className = "topic-search-result";
    resultButton.textContent = topic;

    resultButton.addEventListener("click", function () {
      topicSearchInput.value = "";
      topicSearchResults.innerHTML = "";

      selectMode("Explain a Topic");

      document.getElementById("topic-input").value = topic;
      explainTopic();
    });

    topicSearchResults.appendChild(resultButton);
  });
});

/* Step 8: Smarter Question Matching */

function findOOPTopic(userQuestion) {
  const question = userQuestion
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[?!.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const topicKeywords = {
    "class and object": [
      "class and object",
      "difference between class and object",
      "difference between object and class",
      "class vs object",
    ],
    inheritance: [
      "inheritance",
      "parent class",
      "child class",
      "base class",
      "derived class",
    ],
    polymorphism: ["polymorphism", "many forms"],
    encapsulation: ["encapsulation", "data and functions together"],
    abstraction: ["abstraction", "hiding implementation"],
    constructor: ["constructor", "initialize an object"],
    destructor: ["destructor", "destroy an object"],
    "function overloading": ["function overloading", "same function name"],
    "function overriding": ["function overriding", "override a function"],
    "this pointer": ["this pointer", "current object pointer"],
    "copy constructor": ["copy constructor", "copy an object"],
  };

  for (const topic in topicKeywords) {
    if (topicKeywords[topic].some((keyword) => question.includes(keyword))) {
      return topic;
    }
  }

  return null;
}
