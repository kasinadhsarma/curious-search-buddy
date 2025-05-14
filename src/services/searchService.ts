
import { SearchResult } from "@/types/search";

// Simulated responses based on different queries
const simulatedResponses: Record<string, Partial<SearchResult>> = {
  "what is perplexity ai": {
    content: "**Perplexity AI** is a conversational search engine that combines the capabilities of large language models with real-time web search to provide accurate, up-to-date answers to user queries.\n\nLaunched in 2022, Perplexity AI has gained popularity for its ability to deliver more comprehensive responses than traditional search engines. Unlike conventional search engines that return a list of links, Perplexity presents information in a conversational format with cited sources.\n\nThe platform works by using AI to search the internet in real-time, analyze various sources, and compile the information into coherent, detailed answers. This approach aims to provide direct answers to questions while maintaining transparency by showing where the information comes from.\n\nPerplexity offers both free and premium subscription tiers, with the paid version (Perplexity Pro) offering features like more powerful AI models, custom file uploads, and personalized responses.",
    sources: [
      {
        title: "Perplexity AI - Official Website",
        url: "https://www.perplexity.ai/",
      },
      {
        title: "What is Perplexity AI: Features, Benefits & Alternatives",
        url: "https://influencermarketinghub.com/what-is-perplexity-ai/",
      },
      {
        title: "Perplexity AI: What It Is And How To Use It - Forbes",
        url: "https://www.forbes.com/sites/qai/2023/09/05/perplexity-ai-what-it-is-and-how-to-use-it/",
      }
    ],
  },
  "what is react": {
    content: "**React** is an open-source JavaScript library developed by Facebook (now Meta) for building user interfaces or UI components, particularly for single-page applications.\n\nCreated by Jordan Walke, a software engineer at Facebook, React was first deployed on Facebook's newsfeed in 2011 and later open-sourced in 2013. It has since become one of the most popular frontend libraries in web development.\n\nKey features of React include:\n\n1. **Component-Based Architecture**: React applications are built using components, which are reusable, self-contained pieces of code that return HTML via a render function.\n\n2. **Virtual DOM**: React creates a virtual representation of the UI in memory, which it uses to determine the most efficient way to update the actual DOM, improving performance.\n\n3. **Declarative Syntax**: Developers describe how the UI should look based on the current state, and React efficiently updates and renders components when data changes.\n\n4. **JSX**: React uses JSX, a syntax extension that allows you to write HTML-like code in JavaScript files.\n\n5. **Unidirectional Data Flow**: Data in React flows in one direction, from parent components to child components, making applications more predictable and easier to debug.\n\nReact is often used in combination with other libraries or frameworks, such as Redux for state management, and can be used to develop both web and mobile applications (through React Native).",
    sources: [
      {
        title: "React – A JavaScript library for building user interfaces",
        url: "https://react.dev/",
      },
      {
        title: "Getting Started – React",
        url: "https://react.dev/learn",
      },
      {
        title: "React (software) - Wikipedia",
        url: "https://en.wikipedia.org/wiki/React_(software)",
      }
    ],
  },
  "how to learn programming": {
    content: "**Learning programming** is a journey that requires patience, persistence, and practice. Here's a comprehensive guide to get you started:\n\n**1. Choose a Programming Language**\nBeginners often start with languages like Python, JavaScript, or Ruby due to their readable syntax and supportive communities. Your choice might depend on your goals:\n- Web development: JavaScript, HTML, CSS\n- Data science: Python, R\n- Mobile apps: Swift (iOS), Kotlin (Android)\n- Game development: C#, C++\n\n**2. Understand Programming Fundamentals**\nRegardless of the language, focus on understanding key concepts:\n- Variables and data types\n- Control structures (if/else statements, loops)\n- Functions and methods\n- Data structures (arrays, lists, dictionaries)\n- Object-oriented programming concepts\n\n**3. Choose Learning Resources**\nMultiple resources are available for learning:\n- Online platforms: Codecademy, freeCodeCamp, Coursera, edX\n- Interactive tutorials: LeetCode, HackerRank\n- Documentation: Official language documentation\n- Books: \"Automate the Boring Stuff with Python\", \"Eloquent JavaScript\"\n- YouTube channels: Traversy Media, The Net Ninja, CS50\n\n**4. Practice Consistently**\nProgramming is a skill that improves with practice:\n- Start with small programs\n- Solve coding challenges on platforms like LeetCode or CodeWars\n- Participate in hackathons\n\n**5. Build Projects**\nApply your knowledge by building projects that interest you:\n- Simple games (Tic-tac-toe, Hangman)\n- Personal website or blog\n- Automation scripts for daily tasks\n- Mobile app for a specific need\n\n**6. Join Programming Communities**\nConnect with other programmers:\n- GitHub\n- Stack Overflow\n- Reddit programming communities\n- Local meetups or coding groups\n\n**7. Learn Version Control**\nUnderstand Git and GitHub to manage your code effectively.\n\n**8. Debug Effectively**\nDevelop problem-solving skills and learn to use debugging tools.\n\nRemember that learning to code is a marathon, not a sprint. Be patient with yourself and celebrate small victories along the way.",
    sources: [
      {
        title: "Learn to Code — For Free — Coding Courses for Busy People",
        url: "https://www.freecodecamp.org/",
      },
      {
        title: "How to Start Learning Computer Programming | Codecademy",
        url: "https://www.codecademy.com/resources/blog/how-to-start-coding/",
      },
      {
        title: "Programming for Beginners: Where to Start?",
        url: "https://www.geeksforgeeks.org/programming-for-beginners/",
      }
    ],
  }
};

const defaultResponse = {
  content: "I apologize, but I don't have specific information on that topic. Here are some general points that might help you start researching this subject:\n\n1. **Consider checking authoritative sources** related to your query for the most accurate and up-to-date information.\n\n2. **Look for recent publications or articles** that might cover this topic in detail.\n\n3. **Academic databases and journals** often contain peer-reviewed research that could provide valuable insights.\n\n4. **Industry experts and thought leaders** might have shared their perspectives on this through various platforms.\n\nFor more specific information, you might want to refine your search terms or consult specialized resources in this field.",
  sources: [
    {
      title: "Google Search",
      url: "https://www.google.com",
    },
    {
      title: "Wikipedia",
      url: "https://www.wikipedia.org",
    },
    {
      title: "Scholar Research",
      url: "https://scholar.google.com",
    }
  ]
};

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function performSearch(query: string): Promise<SearchResult> {
  // Simulate API delay
  await delay(2000 + Math.random() * 2000);
  
  // Normalize the query for matching
  const normalizedQuery = query.toLowerCase().trim();
  
  // Find a matching response or use default
  let responseData: Partial<SearchResult> | undefined;
  
  // Check for exact matches first
  if (normalizedQuery in simulatedResponses) {
    responseData = simulatedResponses[normalizedQuery];
  } else {
    // Check for partial matches
    for (const key of Object.keys(simulatedResponses)) {
      if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
        responseData = simulatedResponses[key];
        break;
      }
    }
  }
  
  // Use default if no match found
  if (!responseData) {
    responseData = defaultResponse;
  }
  
  // Return the complete result
  return {
    id: Date.now().toString(),
    query,
    content: responseData.content || "",
    sources: responseData.sources || [],
    timestamp: new Date(),
  };
}
