const faqs = [
    {
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page and follow the instructions."
    },
    {
        question: "How do I register for courses?",
        answer: "Log into your student portal and select the course registration option."
    },
    {
        question: "How do I check my results or grades?",
        answer: "Log into the student portal and open the results section."
    },
    {
        question: "How do I update my profile?",
        answer: "Go to your profile page, edit your information and save the changes."
    },
    {
        question: "How do I contact support?",
        answer: "Contact the school's support team through the support page or official contact details."
    },
    {
        question: "How do I check my fees?",
        answer: "Log into the student portal and select the fees or payments section."
    },
    {
        question: "What should I do if I forget my username?",
        answer: "Contact the student support team to recover your username."
    },
    {
        question: "How do I log into the student portal?",
        answer: "Enter your student username and password on the portal login page."
    }
];

function cleanText(text) {
    const stopWords = [
        "how", "do", "i", "my", "the", "a", "an",
        "is", "to", "can", "where", "what", "for"
    ];

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 0 && !stopWords.includes(word));
}

function calculateSimilarity(userQuestion, faqQuestion) {
    const userWords = cleanText(userQuestion);
    const faqWords = cleanText(faqQuestion);

    const allWords = [...new Set([...userWords, ...faqWords])];

    let userVector = [];
    let faqVector = [];

    allWords.forEach(word => {
        userVector.push(userWords.includes(word) ? 1 : 0);
        faqVector.push(faqWords.includes(word) ? 1 : 0);
    });

    let dotProduct = 0;
    let userLength = 0;
    let faqLength = 0;

    for (let i = 0; i < allWords.length; i++) {
        dotProduct += userVector[i] * faqVector[i];
        userLength += userVector[i] ** 2;
        faqLength += faqVector[i] ** 2;
    }

    if (userLength === 0 || faqLength === 0) {
        return 0;
    }

    return dotProduct /
        (Math.sqrt(userLength) * Math.sqrt(faqLength));
}

function findAnswer(userQuestion) {
    let bestMatch = null;
    let highestScore = 0;

    faqs.forEach(faq => {
        const score = calculateSimilarity(
            userQuestion,
            faq.question
        );

        if (score > highestScore) {
            highestScore = score;
            bestMatch = faq;
        }
    });

    if (highestScore >= 0.3) {
        return bestMatch.answer;
    }

    return "Sorry, I don't understand your question. Please try asking about the student portal.";
}

const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendButton.addEventListener("click", function () {

    const question = userInput.value.trim();

    if (question === "") {
        return;
    }

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = question;

    chatBox.appendChild(userMessage);

    const answer = findAnswer(question);

    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = answer;

    chatBox.appendChild(botMessage);

    userInput.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
});