import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Target, 
  Gamepad2, 
  Brain, 
  RefreshCw, 
  BarChart3, 
  Users, 
  Globe, 
  DollarSign, 
  Send, 
  Zap, 
  TrendingUp
} from 'lucide-react';

// Mock chapter components for demo - these show the actual keywords
const MockChapter = ({ title, activePanel, handleSuggestionClick, onProgress, keywords }) => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
        {title}
      </h1>
      <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
        Interactive demo showcasing our hybrid dominance in the gaming investment space.
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {keywords.map((keyword) => (
        <button
          key={keyword}
          onClick={() => handleSuggestionClick(keyword)}
          className="p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-purple-500 transition-all duration-200 text-left group"
        >
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 capitalize">
            {keyword}
          </h3>
          <p className="text-gray-400 text-sm">
            Click to explore this interactive element
          </p>
        </button>
      ))}
    </div>

    {activePanel && (
      <div className="mt-8 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl animate-pulse">
        <h3 className="text-2xl font-bold text-white mb-4">🎯 Interactive Panel Active</h3>
        <p className="text-gray-300 mb-4">
          Panel: <span className="text-purple-300 font-mono">{activePanel}</span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-green-400 mb-2">✅ Success Metrics</h4>
            <p className="text-gray-300 text-sm">94.7% prediction accuracy • 127% IRR • $47.2M portfolio value</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">📊 Key Data Points</h4>
            <p className="text-gray-300 text-sm">2.3M daily signals • 847 developers • $184B market</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Chapter mapping with real keywords
const chapterComponents = {
  'the-problem': (props) => <MockChapter title="The Problem" keywords={['missed opportunities', 'among us', 'viral patterns']} {...props} />,
  'developer-self-publishing': (props) => <MockChapter title="Developer Self Publishing" keywords={['self publishing', 'indie revolution', 'steam direct']} {...props} />,
  'the-solution': (props) => <MockChapter title="The Solution" keywords={['mtrnn', 'ecosystem', 'prediction', 'signals']} {...props} />,
  'flywheel-economics': (props) => <MockChapter title="Flywheel Economics" keywords={['flywheel', 'network effects', 'compound advantage']} {...props} />,
  'the-proof': (props) => <MockChapter title="The Proof" keywords={['track record', 'monte carlo', 'validation', 'portfolio']} {...props} />,
  'the-team': (props) => <MockChapter title="The Team" keywords={['team', 'founders', 'expertise', 'track record']} {...props} />,
  'tam': (props) => <MockChapter title="TAM" keywords={['market size', 'tam', 'gaming market', 'opportunity']} {...props} />,
  'the-fund': (props) => <MockChapter title="The Fund" keywords={['investment', 'fund economics', 'opportunity', 'irr']} {...props} />
};

const GenesisAI = () => {
  const [currentChapter, setCurrentChapter] = useState('the-problem');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [activePanel, setActivePanel] = useState(null);
  const [progress, setProgress] = useState({});

  const chapters = [
    {
      id: 'the-problem',
      title: 'The Problem',
      subtitle: 'The $465M Mistake',
      icon: Target,
      description: 'How Traditional VCs Keep Missing the Biggest Gaming Wins',
      keywords: ['missed opportunities', 'among us', 'viral patterns'],
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'developer-self-publishing',
      title: 'Developer Self Publishing', 
      subtitle: 'The Indie Revolution',
      icon: Gamepad2,
      description: 'The new indie revolution changing everything',
      keywords: ['self publishing', 'indie revolution', 'steam direct'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'the-solution',
      title: 'The Solution',
      subtitle: 'AI Breakthrough',
      icon: Brain,
      description: 'MTRNN neural networks, 2.3M signals',
      keywords: ['mtrnn', 'ecosystem', 'prediction', 'signals'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'flywheel-economics',
      title: 'Flywheel Economics',
      subtitle: 'Network Effects',
      icon: RefreshCw,
      description: 'How our platform creates compound advantages',
      keywords: ['flywheel', 'network effects', 'compound advantage'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'the-proof',
      title: 'The Proof',
      subtitle: '94.7% Accuracy',
      icon: BarChart3,
      description: '94.7% accuracy, real portfolio returns',
      keywords: ['track record', 'monte carlo', 'validation', 'portfolio'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'the-team',
      title: 'The Team',
      subtitle: 'Gaming Veterans',
      icon: Users,
      description: 'Who\'s building this revolution',
      keywords: ['team', 'founders', 'expertise', 'track record'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'tam',
      title: 'TAM',
      subtitle: '$184B Market',
      icon: Globe,
      description: '$184B gaming market, $60B+ indie segment',
      keywords: ['market size', 'tam', 'gaming market', 'opportunity'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'the-fund',
      title: 'The Fund',
      subtitle: '$60M Opportunity',
      icon: DollarSign,
      description: '$60M opportunity, 47% IRR projections',
      keywords: ['investment', 'fund economics', 'opportunity', 'irr'],
      color: 'from-emerald-500 to-green-500'
    }
  ];

  const processKeywords = (message) => {
    const lowerMessage = message.toLowerCase();
    const currentChapterData = chapters.find(c => c.id === currentChapter);
    
    if (!currentChapterData) return;

    // Check for keyword matches
    const matchedKeywords = currentChapterData.keywords.filter(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );

    if (matchedKeywords.length > 0) {
      const keyword = matchedKeywords[0];
      const panelId = `${currentChapter}-${keyword.replace(/\s+/g, '-')}`;
      
      setActivePanel(panelId);
      
      // Add system response
      setChatMessages(prev => [...prev, {
        type: 'system',
        content: `🎯 Showing interactive panel for "${keyword}" in ${currentChapterData.title}`,
        timestamp: new Date()
      }]);

      // Mark progress
      setProgress(prev => {
        const currentProgress = prev[currentChapter] || [];
        if (!currentProgress.includes(keyword)) {
          return {
            ...prev,
            [currentChapter]: [...currentProgress, keyword]
          };
        }
        return prev;
      });
    } else {
      setChatMessages(prev => [...prev, {
        type: 'system', 
        content: `💡 Try keywords like: ${currentChapterData.keywords.join(', ')}`,
        timestamp: new Date()
      }]);
    }
  };

  const handleChapterChange = (chapterId) => {
    setCurrentChapter(chapterId);
    setActivePanel(null);
    setChatMessages([]);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, {
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    }]);

    // Process for keywords
    processKeywords(chatInput);

    setChatInput('');
  };

  // Handle suggestion button clicks - directly process without needing enter
  const handleSuggestionClick = (suggestion) => {
    setChatInput(suggestion);
    
    // Add user message
    setChatMessages(prev => [...prev, {
      type: 'user',
      content: suggestion,
      timestamp: new Date()
    }]);

    // Process for keywords immediately
    processKeywords(suggestion);
    
    // Clear input after processing
    setChatInput('');
  };

  const currentChapterData = chapters.find(c => c.id === currentChapter);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Wider on desktop */}
      <div className="w-72 lg:w-80 xl:w-96 bg-gray-800 border-r border-gray-700 flex flex-col flex-shrink-0">
        {/* Header */}
        <div className="p-6 xl:p-8 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl xl:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Genesis AI
              </h1>
              <p className="text-xs text-gray-400">Gaming Investment Fund</p>
            </div>
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="flex-1 overflow-y-auto p-4 xl:p-6">
          <div className="space-y-2">
            {chapters.map((chapter, index) => {
              const Icon = chapter.icon;
              const isActive = currentChapter === chapter.id;
              
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterChange(chapter.id)}
                  className={
                    isActive 
                      ? 'w-full text-left p-4 xl:p-5 rounded-lg transition-all duration-200 group bg-purple-600/20 border border-purple-500/30 shadow-lg'
                      : 'w-full text-left p-4 xl:p-5 rounded-lg transition-all duration-200 group hover:bg-gray-700/50 border border-transparent'
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className={
                      isActive 
                        ? 'w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ' + chapter.color
                        : 'bg-gray-600 group-hover:bg-gray-500 w-10 h-10 rounded-lg flex items-center justify-center'
                    }>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">#{index + 1}</span>
                        <h3 className={isActive ? 'font-semibold text-white text-base' : 'font-semibold text-gray-300 text-base'}>
                          {chapter.title}
                        </h3>
                      </div>
                      <p className={isActive ? 'text-sm text-purple-300 mt-1' : 'text-sm text-gray-500 mt-1'}>
                        {chapter.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="p-4 xl:p-6 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span>Presentation Progress</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: ((Object.keys(progress).length / chapters.length) * 100) + '%' 
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {Object.keys(progress).length} of {chapters.length} chapters explored
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Interactive Content - Constrained width for better readability */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full p-8 lg:p-12 xl:p-16">
            {(function() {
              const CurrentChapter = chapterComponents[currentChapter];
              
              if (CurrentChapter) {
                return (
                  <CurrentChapter 
                    activePanel={activePanel} 
                    setChatInput={setChatInput}
                    handleSuggestionClick={handleSuggestionClick}
                    onProgress={function(keyword) {
                      setProgress(function(prev) {
                        const currentProgress = prev[currentChapter] || [];
                        if (!currentProgress.includes(keyword)) {
                          return {
                            ...prev,
                            [currentChapter]: [...currentProgress, keyword]
                          };
                        }
                        return prev;
                      });
                    }}
                  />
                );
              } else {
                return (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-8">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">Component Missing</h2>
                    <p className="text-gray-400 text-lg mb-8">
                      {currentChapterData ? currentChapterData.title : 'Unknown'} component needs to be built
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        </div>

        {/* Chat Interface - Simplified padding */}
        <div className="border-t border-gray-700 bg-gray-800">
          {/* Chat Messages Preview */}
          {chatMessages.length > 0 && (
            <div className="max-h-40 overflow-y-auto border-b border-gray-700">
              <div className="max-w-7xl mx-auto p-6 xl:p-8">
                <div className="space-y-3">
                  {chatMessages.slice(-2).map((message, index) => (
                    <div 
                      key={index}
                      className="flex gap-4 text-base"
                    >
                      <span className={
                        message.type === 'user' ? 'font-semibold text-purple-300' : 'font-semibold text-green-300'
                      }>
                        {message.type === 'user' ? 'You' : 'Genesis AI'}:
                      </span>
                      <span className="text-gray-300 flex-1">{message.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-6 xl:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-4 items-center">
                <MessageSquare className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Try typing: missed opportunities, indie revolution, mtrnn, track record, market size, or fund economics"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-6 py-4 xl:px-8 xl:py-5 text-base text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 xl:p-5 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex-shrink-0"
                >
                  <Send className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenesisAI;
