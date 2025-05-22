
import { SearchResult, Source } from "@/types/search";
import { SearchType } from "@/components/search/SearchTypeToggle";
import { SearchModel, SearchDomain } from "@/components/search/SearchModelSelector";

export const performSearch = async (
  query: string,
  searchType: SearchType = "web", // Will be added back to the result by frontend
  searchModel: SearchModel = "default", // Will be added back to the result by frontend
  searchDomain: SearchDomain = "web", // Will be added back to the result by frontend
  fileContent?: { filename: string; content: string } // Will be handled later if needed
): Promise<SearchResult> => {
  try {
    const response = await fetch("/api/v1/search", { // Vite will proxy this
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }), // Only sending query for now
    });

    if (!response.ok) {
      // Try to get error message from backend if available
      let errorMsg = `Error from backend: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.detail || errorData.content || errorMsg;
      } catch (e) {
        // Ignore if error response is not JSON
      }
      throw new Error(errorMsg);
    }

    const backendResponse = await response.json();

    // Construct the full SearchResult for the frontend
    // Backend provides: query (should match input), content, sources
    // Frontend adds: timestamp, and the original searchType, searchModel, searchDomain
    return {
      query: backendResponse.query, // or simply use the input query
      content: backendResponse.content,
      sources: backendResponse.sources as Source[], // Assume backend sources match frontend type
      timestamp: new Date(),
      searchType,
      searchModel,
      searchDomain,
      fileContent, // Include fileContent in the result, even if not processed by backend
    };

  } catch (error)
  {
    console.error("Search service error:", error);
    // Return a SearchResult with error information
    return {
      query,
      content: error instanceof Error ? error.message : "An unknown error occurred during search.",
      sources: [],
      timestamp: new Date(),
      searchType,
      searchModel,
      searchDomain,
      fileContent, // Include fileContent in the error result as well
    };
  }
};

// Mock content generators for different search types and models
function generateWebContent(query: string, model: SearchModel, domain: SearchDomain): string {
  let prefix = "";
  
  if (domain === "academic") {
    prefix = "Academic research on ";
  } else if (domain === "social") {
    prefix = "Social discussion about ";
  }
  
  if (model === "basic") {
    return `Search results for **${prefix}${query}**:\n\n${generateParagraphs(2)}`;
  } else {
    return `**${prefix}${query}** is a topic of significant interest. Based on the latest research from multiple credible sources, we can provide a comprehensive overview.\n\n${generateParagraphs(3)}\n\nFurthermore, recent studies have shown that ${generateParagraph()}`;
  }
}

function generateChatContent(query: string, model: SearchModel): string {
  if (model === "basic") {
    return `Response to **${query}**:\n\n${generateParagraph()}`;
  } else {
    return `I'd be happy to help with **${query}**!\n\n${generateParagraph()}\n\nDoes that answer your question? If not, feel free to ask follow-up questions and I can provide more details on specific aspects you're curious about.`;
  }
}

function generateImageContent(query: string): string {
  return `Here are some visual results for **${query}**. Images can provide valuable visual context to understand this topic better.\n\n${generateParagraph()}\n\nThese images come from various reputable sources and illustrate key aspects of the topic.`;
}

function generateVideoContent(query: string): string {
  return `Video resources for **${query}** can offer in-depth explanations and visual demonstrations.\n\n${generateParagraph()}\n\nThese videos provide different perspectives and levels of detail on the topic, from brief overviews to comprehensive tutorials.`;
}

// Mock source generators
function generateWebSources(domain: SearchDomain = "web"): Source[] {
  if (domain === "academic") {
    return [
      {
        title: "Research Journal: Analysis of Modern Technology",
        url: "https://academic.example.com/tech-analysis",
      },
      {
        title: "University Study on Recent Developments",
        url: "https://university.example.org/studies",
      },
    ];
  } else if (domain === "social") {
    return [
      {
        title: "Community Discussion Forum",
        url: "https://social.example.com/discussions",
      },
      {
        title: "Expert Blog: Personal Insights",
        url: "https://blogs.example.org/expert-view",
      },
    ];
  } else {
    return [
      {
        title: "Comprehensive Guide to Modern Technology",
        url: "https://example.com/tech-guide",
      },
      {
        title: "Latest Research Findings and Analysis",
        url: "https://research.example.org/findings",
      },
      {
        title: "Expert Opinions and Insights",
        url: "https://experts.example.net/insights",
      },
    ];
  }
}

function generateAcademicSources(): Source[] {
  return [
    {
      title: "Peer-Reviewed Journal Article (2024)",
      url: "https://journal.example.edu/article123",
    },
    {
      title: "Academic Conference Proceedings",
      url: "https://conference.example.org/proceedings",
    },
    {
      title: "Meta-Analysis of Recent Studies",
      url: "https://meta.example.edu/analysis",
    },
  ];
}

function generateChatSources(): Source[] {
  return [
    {
      title: "Interactive Learning Platform",
      url: "https://learn.example.com/interactive",
    },
    {
      title: "Expert Q&A Database",
      url: "https://qa.example.org/expert-answers",
    },
  ];
}

function generateImageSources(): Source[] {
  return [
    {
      title: "Visual Reference Library",
      url: "https://images.example.com/library",
    },
    {
      title: "Stock Photography Collection",
      url: "https://photos.example.org/stock",
    },
    {
      title: "Infographic Repository",
      url: "https://infographics.example.net",
    },
  ];
}

function generateVideoSources(): Source[] {
  return [
    {
      title: "Educational Video Channel",
      url: "https://videos.example.com/educational",
    },
    {
      title: "Tutorial Library",
      url: "https://tutorials.example.org/video",
    },
    {
      title: "Expert Webinar Archive",
      url: "https://webinars.example.net/archives",
    },
  ];
}

// Helper functions to generate random text
function generateParagraph(): string {
  const sentences = [
    "This is a significant development in the field that challenges previous assumptions.",
    "Experts have been researching this topic for decades with fascinating results.",
    "Multiple studies confirm these findings across different contexts and populations.",
    "The implications of this information are far-reaching for both theory and practice.",
    "Understanding this concept requires looking at it from multiple perspectives.",
    "Recent technological advances have made new approaches possible in this area.",
    "There is still ongoing debate among specialists about certain aspects of this topic.",
    "The historical context provides important insights into how this evolved over time."
  ];
  
  const numberOfSentences = Math.floor(Math.random() * 3) + 3; // 3-5 sentences
  const result = [];
  
  for (let i = 0; i < numberOfSentences; i++) {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    result.push(sentences[randomIndex]);
  }
  
  return result.join(" ");
}

function generateParagraphs(count: number): string {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph());
  }
  return paragraphs.join("\n\n");
}
