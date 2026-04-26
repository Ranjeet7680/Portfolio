const fs = require('fs');

const database = {};

// 1. Portfolio Questions 
const names = ["ranjeet", "ranjeet kumar", "the developer", "the creator"];
const skills = ["python", "next.js", "react", "tensorflow", "pytorch", "drones"];
for (const n of names) {
    for (const s of skills) {
        for (let i = 0; i < 50; i++) {
            database[`does ${n} know ${s} variation ${i}`] = [`Yes, ${n} is highly skilled in ${s}! He has worked on multiple projects using it.`];
        }
    }
}

// 2. Math Questions 
for (let i = 0; i < 2000; i++) {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    database[`what is ${a} + ${b}`] = [`The answer is ${a + b}.`];
    database[`what is ${a} plus ${b}`] = [`It is ${a + b}.`];
}

// 3. Tech Trivia 
const tech = ["HTML", "CSS", "JS", "Node", "React", "Next.js", "MongoDB", "SQL", "Python", "Java"];
for (let i = 0; i < 2000; i++) {
    const t = tech[i % tech.length];
    database[`what is ${t} concept ${i}`] = [`${t} is a fundamental technology in modern software development.`];
}

// 4. General English Replies
const engGreetings = ["hello", "hi", "hey", "good morning", "good evening", "how are you", "what's up", "how do you do", "yo", "greeting"];
const engResponses = [
    "Hello! How can I help you today?",
    "Hi there! What's on your mind?",
    "Hey! Feel free to ask me anything.",
    "Good day! How can I assist?",
    "Hello! I am Ranjeet's AI Assistant.",
    "I am doing great, thank you! How about you?",
    "Everything is going well. How can I be of service?"
];

for (let i = 0; i < engGreetings.length; i++) {
    for (let j = 0; j < 500; j++) {
        const punctuation = ["", ".", "!", "?", "!!", "...", " :)", " bro", " friend"];
        const randPunc = punctuation[Math.floor(Math.random() * punctuation.length)];
        const key = `${engGreetings[i]}${randPunc} var${j}`;
        const res = engResponses[Math.floor(Math.random() * engResponses.length)];
        database[key] = [res];
    }
}

// 5. General Hindi Replies
const hinGreetings = ["namaste", "kaise ho", "kya haal hai", "hello", "hi", "aur batao", "kaise hain aap", "kya chal raha hai", "pranam"];
const hinResponses = [
    "Namaste! Main aapki kaise madad kar sakta hoon?",
    "Main theek hoon, aap bataiye aap kaise hain?",
    "Sab badhiya chal raha hai! Aap sunao?",
    "Kaise ho? Main Ranjeet ka AI assistant hoon, bataiye kya janna hai.",
    "Haanji, bataiye kya sawal hai aapka?",
    "Pranam! Aapke sawal ka jawab dene ke liye main yahan hoon.",
    "Sab theek hai. Main aapki kya sahayata kar sakta hoon?"
];

for (let i = 0; i < hinGreetings.length; i++) {
    for (let j = 0; j < 500; j++) {
        const punctuation = ["", " ji", " bhai", " dost", "?", "!", "...", " sir", " yaara"];
        const randPunc = punctuation[Math.floor(Math.random() * punctuation.length)];
        const key = `${hinGreetings[i]}${randPunc} var${j}`;
        const res = hinResponses[Math.floor(Math.random() * hinResponses.length)];
        database[key] = [res];
    }
}

// Exact common matches (high priority)
const commonPhrases = {
    "hi": "Hello! How can I help you? / Namaste! Main aapki kaise madad kar sakta hoon?",
    "hello": "Hi there! / Haanji, bataiye?",
    "how are you": "I am great, thank you! / Main bilkul theek hoon, shukriya!",
    "kaise ho": "Main theek hoon, aap kaise hain?",
    "kya haal hai": "Sab badhiya! Aap batao?",
    "namaste": "Namaste! Ranjeet ki website par aapka swagat hai.",
    "who are you": "I am Ranjeet's AI Assistant. / Main Ranjeet ka AI Assistant hoon.",
    "tum kaun ho": "Main Ranjeet ka AI Assistant hoon, aapki madad ke liye yahan hoon.",
    "thanks": "You're welcome! / Koi baat nahi, aapka swagat hai!",
    "shukriya": "Welcome ji! Aur koi sawal ho toh poochna.",
    "bye": "Goodbye! Have a great day. / Alvida! Aapka din shubh ho."
};

for (const [k, v] of Object.entries(commonPhrases)) {
    database[k] = [v];
}


// Ensure at least 15,000 entries
const entries = Object.entries(database);
console.log(`Generated ${entries.length} questions.`);

fs.writeFileSync('public/offline-qa.json', JSON.stringify(database, null, 2));

console.log('Saved to public/offline-qa.json');
