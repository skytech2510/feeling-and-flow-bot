
type ResponseType = 'feeling' | 'goal';

interface FeelingResponse {
  keywords: string[];
  responses: string[];
}

interface GoalResponse {
  keywords: string[];
  responses: string[];
}

// Feeling responses
export const feelingResponses: FeelingResponse[] = [
  {
    keywords: ['happy', 'joy', 'excited', 'cheerful', 'elated', 'joyful'],
    responses: [
      "It's wonderful that you're feeling happy! Happiness is a powerful emotion that can transform your day. Keep nurturing those positive feelings and notice what brings you joy.",
      "Your happiness is something to celebrate. Remember this feeling and the circumstances that brought it about so you can recreate it in the future.",
      "Feeling happy is a gift. Allow yourself to fully experience and embody this joy, letting it flow through every part of your being."
    ]
  },
  {
    keywords: ['sad', 'down', 'unhappy', 'depressed', 'blue', 'grief', 'gloomy'],
    responses: [
      "I understand feeling sad can be difficult. Remember that all emotions, even challenging ones, provide important information and are part of the human experience.",
      "When sadness visits, try to approach it with gentleness and curiosity. What might this feeling be telling you about what matters most?",
      "Sadness often points to something we value or care about. By acknowledging your feelings, you're honoring an important part of yourself."
    ]
  },
  {
    keywords: ['angry', 'frustrated', 'annoyed', 'irritated', 'mad', 'rage'],
    responses: [
      "Anger often arises when boundaries have been crossed or needs aren't being met. What might your anger be trying to protect?",
      "Your frustration is valid. Consider what specific action might help address the situation that's triggering these feelings.",
      "Anger carries powerful energy. Once acknowledged, you can channel it constructively to make positive changes in your situation."
    ]
  },
  {
    keywords: ['anxious', 'worried', 'nervous', 'stressed', 'uneasy', 'tense'],
    responses: [
      "Anxiety often comes from caring deeply and wanting things to go well. What small step might help you feel more grounded right now?",
      "When anxiety arises, remember that you've faced uncertain situations before and found your way through them.",
      "Your nervous system is trying to protect you. Taking slow, deep breaths can help signal to your body that you're safe in this moment."
    ]
  },
  {
    keywords: ['tired', 'exhausted', 'drained', 'fatigue', 'weary', 'burnout'],
    responses: [
      "Feeling tired is your body's way of asking for rest. What small form of restoration might be possible for you today?",
      "Exhaustion is a signal that shouldn't be ignored. Consider what boundaries might need strengthening to protect your energy.",
      "Rest isn't just a physical need but a profound form of self-care. Your well-being matters, and you deserve to replenish your energy."
    ]
  },
  {
    keywords: ['confused', 'uncertain', 'unsure', 'lost', 'puzzled', 'bewildered'],
    responses: [
      "Confusion often precedes clarity. Give yourself permission to not have all the answers right now.",
      "Feeling uncertain is natural when facing complex situations. What's one small aspect that you feel more clear about?",
      "Sometimes the path forward reveals itself one step at a time. Trust that you're gathering important information even in this uncertain state."
    ]
  },
  {
    keywords: ['hopeful', 'optimistic', 'expectant', 'encouraged', 'positive'],
    responses: [
      "Hope is a powerful force that can illuminate even the darkest paths. Nurture this feeling by focusing on possibilities.",
      "Your optimism is a strength that can carry you through challenges and open doors to new opportunities.",
      "Feeling hopeful connects you to your resilience and inner wisdom. Trust this positive orientation toward the future."
    ]
  },
  {
    keywords: ['grateful', 'thankful', 'appreciative', 'blessed', 'content'],
    responses: [
      "Gratitude is like a lens that brings the good in your life into sharper focus. What else might you notice through this perspective?",
      "Feeling appreciative creates a virtuous cycle, opening us to notice even more to be thankful for.",
      "The practice of gratitude can transform ordinary moments into extraordinary ones. You're nurturing an important quality."
    ]
  },
  {
    keywords: ['peaceful', 'calm', 'serene', 'tranquil', 'relaxed', 'centered'],
    responses: [
      "Peace is not just the absence of turbulence but a positive state worth cultivating. How might you extend this feeling?",
      "The calm you're experiencing is your natural state beneath the surface noise of life. You can return to this center anytime.",
      "Serenity allows us to see situations more clearly and respond with wisdom rather than reactivity. Cherish this state."
    ]
  },
  {
    keywords: ['lonely', 'isolated', 'alone', 'disconnected', 'separated'],
    responses: [
      "Loneliness reminds us of our fundamental need for connection. Is there a small way you might reach out to someone today?",
      "Feeling isolated is a common human experience, even though it can feel like you're the only one. Many others feel this way too.",
      "Sometimes loneliness points us toward important connections we're missing. What kind of relationship might your heart be seeking?"
    ]
  },
  // Default response if no keywords match
  {
    keywords: ['default'],
    responses: [
      "Thank you for sharing how you're feeling. Every emotion provides valuable information about what matters to you.",
      "I appreciate your openness about your feelings. Awareness is the first step toward understanding yourself more deeply.",
      "Your feelings are valid and important. By acknowledging them, you're honoring your authentic experience."
    ]
  },
];

// Goal responses
export const goalResponses: GoalResponse[] = [
  {
    keywords: ['health', 'fitness', 'exercise', 'workout', 'weight', 'diet', 'nutrition'],
    responses: [
      "Your health goals reflect a commitment to your well-being. Remember that sustainable changes often come from small, consistent actions rather than dramatic overhauls.",
      "Taking care of your body is one of the most fundamental forms of self-respect. Your goal matters, and every step forward counts.",
      "Health journeys aren't linear - they include both progress and setbacks. Be kind to yourself throughout the process of working toward this important goal."
    ]
  },
  {
    keywords: ['career', 'job', 'work', 'professional', 'business', 'promotion'],
    responses: [
      "Your professional aspirations speak to your desire to contribute and grow. Consider both the outcome you want and the person you'll become on the journey.",
      "Career goals often connect to our deeper values about making an impact. What values are you honoring through this work?",
      "As you pursue your professional goals, remember that meaning can be found not just in achievement but in how you approach each day's work."
    ]
  },
  {
    keywords: ['learning', 'education', 'study', 'skill', 'knowledge', 'growth'],
    responses: [
      "Your commitment to learning reflects a growth mindset that will serve you well. Every bit of knowledge builds upon itself over time.",
      "The pursuit of new skills and understanding expands not just what you can do, but who you can become. Enjoy the process of discovery.",
      "Learning goals connect us to our innate curiosity and capacity for growth. Your brain will thank you for the new neural pathways you're creating!"
    ]
  },
  {
    keywords: ['relationship', 'family', 'friend', 'partner', 'marriage', 'connection', 'social'],
    responses: [
      "Nurturing meaningful relationships is one of life's most rewarding pursuits. Small moments of genuine connection often matter more than grand gestures.",
      "Your focus on relationships reflects wisdom about what truly matters in life. Quality connections are foundational to well-being.",
      "The effort you put into building and maintaining relationships creates ripples that extend far beyond what you can see right now."
    ]
  },
  {
    keywords: ['financial', 'money', 'saving', 'investing', 'debt', 'budget', 'wealth'],
    responses: [
      "Financial goals are not just about numbers—they're about creating security and possibilities for yourself and those you care about.",
      "Your attention to financial well-being shows foresight and self-care. Each step builds momentum toward greater stability and freedom.",
      "Money management is a form of self-respect. By taking control of your finances, you're creating more choices for your future self."
    ]
  },
  {
    keywords: ['creative', 'art', 'music', 'write', 'paint', 'create', 'expression'],
    responses: [
      "Creative pursuits nourish parts of ourselves that logic alone cannot reach. Your artistic goals matter not just for what you'll produce, but for how they'll transform you.",
      "Making space for creativity in your life invites more possibility and fresh perspectives into everything you do.",
      "The creative process teaches us to embrace uncertainty and find joy in experimentation. These are skills that benefit all areas of life."
    ]
  },
  {
    keywords: ['home', 'house', 'apartment', 'move', 'renovation', 'decorate'],
    responses: [
      "Creating a home that supports your well-being is a profound form of self-care. Your environment shapes your daily experience in countless ways.",
      "Home goals reflect our desire for sanctuary and self-expression. What qualities are you hoping to cultivate in your space?",
      "The effort you put into your living environment pays dividends in comfort, functionality, and peace of mind every single day."
    ]
  },
  {
    keywords: ['mental', 'emotional', 'therapy', 'healing', 'self-care', 'wellness', 'meditation'],
    responses: [
      "Your commitment to emotional well-being is perhaps the most important investment you can make. This inner work creates the foundation for everything else.",
      "Mental health goals honor the complexity of being human. Your awareness and intention already represent significant progress.",
      "The care you're giving to your emotional landscape will benefit not just you, but everyone you interact with. This work matters deeply."
    ]
  },
  {
    keywords: ['travel', 'adventure', 'explore', 'trip', 'journey', 'vacation'],
    responses: [
      "Travel opens us to new perspectives and reminds us of the vastness of human experience. Your desire for exploration speaks to a curious and open mind.",
      "Adventures, whether near or far, create memories and insights that become part of who we are. What are you hoping to discover?",
      "The anticipation of travel can bring almost as much joy as the journey itself. Savor both the planning and the experience."
    ]
  },
  {
    keywords: ['purpose', 'meaning', 'spiritual', 'faith', 'fulfillment', 'values'],
    responses: [
      "Seeking deeper meaning is part of what makes us human. Your questions and aspirations in this area reflect a rich inner life.",
      "Purpose often emerges gradually through living with intention and awareness. Each step on this path is valuable.",
      "The search for meaning invites us to connect with something larger than ourselves. Trust your intuition as you explore what brings you a sense of purpose."
    ]
  },
  // Default response if no keywords match
  {
    keywords: ['default'],
    responses: [
      "Your goal matters because it represents something you value. What small step might move you in that direction today?",
      "Setting intentions is powerful. By clarifying what you want, you've already begun the journey toward making it reality.",
      "Every meaningful achievement begins with a decision to try. Your commitment to this goal speaks to your courage and vision."
    ]
  },
];

// Helper function to find the best response
export function findBestResponse(input: string, type: ResponseType): string {
  const lowerInput = input.toLowerCase();
  
  // Select the appropriate response array based on type
  const responseArray = type === 'feeling' ? feelingResponses : goalResponses;
  
  // First try to find an exact match with keywords
  for (const category of responseArray) {
    for (const keyword of category.keywords) {
      if (keyword === 'default') continue; // Skip default for now
      
      if (lowerInput.includes(keyword)) {
        // Return a random response from matched category
        return category.responses[Math.floor(Math.random() * category.responses.length)];
      }
    }
  }
  
  // If no match, use default responses
  const defaultCategory = responseArray.find(category => 
    category.keywords.includes('default')
  );
  
  if (defaultCategory) {
    return defaultCategory.responses[Math.floor(Math.random() * defaultCategory.responses.length)];
  }
  
  // Fallback in case something goes wrong
  return "Thank you for sharing. Your journey matters, and each step you take is meaningful.";
}
