import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const ApologyWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home'); // home, apology
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [flowers, setFlowers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
  }, []);

  // Play audio on page load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay prevented:', err));
    }
  }, []);

  useEffect(() => {
    // Only create flowers on home page
    if (currentPage === 'home') {
      const flowerEmojis = ['🌸', '🌹', '🌷'];
      let flowerCount = 0;

      const flowerInterval = setInterval(() => {
        // Create multiple flowers at once for smoother effect
        const flowerCountPerBatch = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < flowerCountPerBatch; i++) {
          setTimeout(() => {
            const newFlower = {
              id: Date.now() + flowerCount++,
              left: Math.random() * 100,
              emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
              duration: 6 + Math.random() * 2,
            };

            setFlowers(prev => [...prev, newFlower]);

            // Remove flower after animation
            setTimeout(() => {
              setFlowers(prev => prev.filter(f => f.id !== newFlower.id));
            }, newFlower.duration * 1000);
          }, i * 20);
        }
      }, 80); // Create flowers every 80ms for smooth flow

      return () => clearInterval(flowerInterval);
    } else {
      setFlowers([]);
    }
  }, [currentPage]);

  const questions = [
    "Will you forgive me?",
    "Do you accept my apology?",
    "Can we still be best friends?",
    "Will you give me a chance to make it right?",
    "Do you believe I'm truly sorry?",
    "Can you find it in your heart to forgive me?",
    "Will you let me prove myself to you?",
    "Do you think we can move past this?",
    "Will you hear me out?",
    "Can we start fresh?",
    "Do you still care about our friendship?",
    "Will you let me make it up to you?",
    "Can you see the sincerity in my words?",
    "Will you give me another chance?",
    "Do you know how much you mean to me?",
  ];

  const apologyText = `
    My dearest friend,

    I need to start by saying I'm truly sorry. There's no excuse for what happened, and I've been reflecting deeply on my actions. You mean the world to me, and the thought of having hurt you is something I can't bear.

    I realize now how thoughtless I was, and I can only imagine how you must have felt. You've always been there for me through thick and thin, and when you needed me the most, I let you down. That's not who I want to be, and it's not the kind of friend you deserve.

    I want you to know that I'm committed to doing better. I've learned so much from this, and I promise to be more mindful, more present, and more considerate of your feelings going forward. Our friendship is one of the most precious things in my life, and I'm willing to do whatever it takes to rebuild your trust.

    I hope you can find it in your heart to forgive me. I miss having you in my life, and I miss being the friend you deserve. Thank you for giving me the chance to apologize, and I truly hope we can move forward together.

    With all my love and deepest apologies,
    Your Best Friend
  `;

  // Placeholder image frames for collage
  const placeholderImages = [
    { id: 1, rotation: -3, top: '10%', left: '5%', size: 'w-32 h-32' },
    { id: 2, rotation: 2, top: '5%', left: '40%', size: 'w-40 h-40' },
    { id: 3, rotation: -2, top: '15%', right: '8%', size: 'w-36 h-36' },
    { id: 4, rotation: 3, top: '55%', left: '10%', size: 'w-32 h-32' },
    { id: 5, rotation: -1, top: '50%', left: '45%', size: 'w-38 h-38' },
    { id: 6, rotation: 2, top: '55%', right: '5%', size: 'w-40 h-40' },
  ];

  const handleNoMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    
    setNoButtonPos({
      x: randomX,
      y: randomY,
    });

    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  const handleYesClick = () => {
    // Celebration effect could go here
    setCurrentPage('celebration');
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Home Page with Photo Collage
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Music Control Button */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-pink-200"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-pink-500" />
        ) : (
          <Volume2 className="w-6 h-6 text-pink-500" />
        )}
      </button>

      {/* Flower Shower */}
      <div className="fixed inset-0 pointer-events-none">
        {flowers.map(flower => (
          <div
            key={flower.id}
            className="absolute text-4xl"
            style={{
              left: `${flower.left}%`,
              top: '-50px',
              animation: `flowerFall ${flower.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      {/* Floating decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-rose-200 rounded-full opacity-15 blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="flex flex-col gap-12 items-center">
          {/* Photo Collage */}
          <div className="relative h-96 flex items-center justify-center perspective">
            <div className="relative w-full h-full max-w-sm mx-auto">
              {placeholderImages.map((img, idx) => (
                <div
                  key={img.id}
                  style={{
                    position: 'absolute',
                    top: img.top,
                    left: img.left,
                    right: img.right || 'auto',
                    transform: `rotate(${img.rotation}deg)`,
                    animation: `float ${3 + idx * 0.5}s ease-in-out infinite`,
                  }}
                  className={`${img.size} rounded-2xl shadow-2xl bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-white flex items-center justify-center overflow-hidden`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-pink-300 opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Apology Flashcard */}
          <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-pink-100 max-w-2xl w-full hover:shadow-3xl transition-all duration-300">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4 text-center">
              I'm Sorry
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto mb-8"></div>

            <p className="text-gray-700 leading-relaxed text-base text-center mb-8 font-light">
              {apologyText}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setCurrentPage('apology')}
                className="group relative px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Continue to Next
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation)); }
          50% { transform: translateY(-20px) rotate(var(--rotation)); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes flowerFall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );

  // Apology Question Page
  const ApologyPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Music Control Button */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-pink-200"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-pink-500" />
        ) : (
          <Volume2 className="w-6 h-6 text-pink-500" />
        )}
      </button>

      {/* Animated background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-8 px-4 py-2 text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>

        {/* Main Question Box */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-purple-100">
          {/* Decorative header */}
          <div className="flex justify-center mb-8">
            <Heart className="w-8 h-8 text-rose-400 animate-bounce" />
          </div>

          {/* Question */}
          <h2
            key={currentQuestion}
            className="text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent mb-12 animate-in"
          >
            {questions[currentQuestion]}
          </h2>

          {/* Buttons Container */}
          <div className="flex gap-6 justify-center items-center relative h-20">
            {/* Yes Button */}
            <button
              onClick={handleYesClick}
              className="px-10 py-4 bg-gradient-to-r from-emerald-400 to-green-400 text-white font-bold text-lg rounded-full hover:shadow-xl transform hover:scale-110 transition-all duration-300 shadow-lg z-10"
            >
              Yes 💚
            </button>

            {/* No Button - Runs Away */}
            <button
              onMouseEnter={handleNoMouseEnter}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              }}
              className="px-10 py-4 bg-gradient-to-r from-red-400 to-rose-400 text-white font-bold text-lg rounded-full hover:shadow-xl transition-all duration-300 shadow-lg relative"
            >
              No ❌
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Celebration Page
  const CelebrationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Music Control Button */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border-2 border-emerald-200"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-emerald-500" />
        ) : (
          <Volume2 className="w-6 h-6 text-emerald-500" />
        )}
      </button>

      {/* Confetti animation background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-70 animate-pulse"
            style={{
              background: ['#f472b6', '#ec4899', '#db2777', '#be185d', '#831843'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8 animate-bounce">
          <Heart className="w-24 h-24 text-rose-500 mx-auto" />
        </div>

        <h1 className="text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          You're Amazing! 🎉
        </h1>

        <p className="text-2xl text-gray-700 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
          Thank you so much for forgiving me. Your friendship means everything to me, and I promise to be a better friend. Let's create more beautiful memories together! 💚
        </p>

        <div className="flex flex-col gap-4 justify-center items-center max-w-sm">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full px-8 py-4 bg-white text-emerald-600 font-bold rounded-full border-2 border-emerald-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Go Home 🏠
          </button>

          {/* New Button - Google Form */}
          <button
            onClick={() => {
              
              window.open('https://forms.gle/EVBV1pvk5M89sRAYA', '_blank');
            }}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Share Your Feelings 💌
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans" style={{ fontFamily: "'Harlow Solid Italic', cursive" }}>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        volume="0.5"
        crossOrigin="anonymous"
      >
        
        <source src="/song1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Harlow+Solid+Italic&display=swap');
        
        * {
          font-family: 'Harlow Solid Italic', cursive;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Harlow Solid Italic', cursive;
          font-weight: 900;
          font-style: italic;
        }

        p, button, div, span {
          font-family: 'Harlow Solid Italic', cursive;
        }
      `}</style>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'apology' && <ApologyPage />}
      {currentPage === 'celebration' && <CelebrationPage />}
    </div>
  );
};

export default ApologyWebsite;