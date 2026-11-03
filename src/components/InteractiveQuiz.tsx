import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

export const InteractiveQuiz: React.FC = () => {
  const { completeQuiz, quizCompleted, quizBestScore, senderName, recipientName } = useWorld();
  const questions = giftConfig.quizQuestions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIdx !== null) return;
    setSelectedOptionIdx(idx);
    const option = currentQ.options[idx];
    if (option.isCorrect) {
      soundEngine.playChime('sparkle');
      setScore((prev) => prev + 1);
    } else {
      soundEngine.playChime('flip');
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
    } else {
      setIsFinished(true);
      completeQuiz(score);
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#D98F9B', '#C9B8E8', '#F4D88B'],
      });
    }
  };

  const handleRestart = () => {
    soundEngine.playChime('flip');
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setScore(0);
    setIsFinished(false);
  };

  const getResultMessage = (finalScore: number) => {
    if (finalScore >= questions.length) {
      return `100% Soulmate Certified! ${recipientName}, you know my heart better than I know it myself.`;
    }
    if (finalScore >= 3) {
      return `Officially my favorite human! You know all our best little quirks and stories—and we have a lifetime to make even more.`;
    }
    return `Every answer still leads back to the same truth: I'm head over heels for you, ${recipientName}!`;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-[#392D40]/12 bg-[#FFFDF9] p-6 sm:p-8 shadow-[0_18px_45px_-12px_rgba(57,45,64,0.08)]">
      {/* Top Game Badge */}
      <div className="flex items-center justify-between border-b border-[#392D40]/10 pb-4">
        <div>
          <span className="font-mono-code text-[11px] font-semibold uppercase tracking-widest text-[#D98F9B]">
            MINI GAME 01 • TRIVIA
          </span>
          <h3 className="font-serif-display text-2xl font-medium text-[#392D40]">
            How Well Do You Know Me?
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {quizCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#9AB89F]/25 px-3 py-1 text-xs font-medium text-[#392D40]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#588561]" />
              Best: {quizBestScore}/{questions.length}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="my-auto py-6">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="mb-4 flex items-center justify-between text-xs text-[#74647D] font-mono-code">
                <span>
                  QUESTION {currentIdx + 1} OF {questions.length}
                </span>
                <span>SCORE: {score}</span>
              </div>
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#F6EFE6]">
                <div
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[#D98F9B] to-[#C9B8E8] transition-all duration-300"
                />
              </div>

              <h4 className="font-serif-display text-xl sm:text-2xl font-medium text-[#392D40]">
                {currentQ.question}
              </h4>
              <p className="mt-1 font-handwriting text-lg text-[#74647D]">
                {currentQ.subtitle}
              </p>

              {/* Options */}
              <div className="mt-5 space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  const showResult = selectedOptionIdx !== null;

                  let btnStyle =
                    'border-[#392D40]/12 bg-[#FFF9F3] hover:border-[#D98F9B] hover:bg-white text-[#392D40]';
                  if (showResult) {
                    if (isSelected && opt.isCorrect) {
                      btnStyle = 'border-[#9AB89F] bg-[#9AB89F]/20 text-[#392D40] font-medium';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'border-[#D98F9B] bg-[#D98F9B]/15 text-[#392D40]';
                    } else if (opt.isCorrect) {
                      btnStyle = 'border-[#9AB89F]/60 bg-[#9AB89F]/10 text-[#392D40]';
                    } else {
                      btnStyle = 'border-[#392D40]/8 bg-[#FFF9F3]/50 text-[#74647D] opacity-65';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={showResult}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full rounded-2xl border p-4 text-left text-sm transition-all cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>{opt.text}</span>
                        {showResult && isSelected && (
                          <Heart className="h-4 w-4 shrink-0 fill-[#D98F9B] text-[#D98F9B]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Reaction Feedback & Next Button */}
              {selectedOptionIdx !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#D98F9B]/30 bg-[#FFF9F3] p-4"
                >
                  <p className="text-xs sm:text-sm text-[#392D40]">
                    <strong className="text-[#D98F9B]">{senderName} says:</strong>{' '}
                    &ldquo;{currentQ.options[selectedOptionIdx].reaction}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#392D40] px-5 py-2.5 text-xs font-medium text-[#FFF9F3] transition hover:bg-[#4e3e58] cursor-pointer"
                  >
                    <span>
                      {currentIdx + 1 < questions.length ? 'Next Question' : 'See Final Score'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="quiz-finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4D88B]/40 text-[#D98F9B]">
                <Sparkles className="h-8 w-8" />
              </div>
              <p className="mt-4 font-mono-code text-xs uppercase tracking-widest text-[#D98F9B]">
                QUIZ COMPLETE • {score} / {questions.length} POINTS
              </p>
              <h4 className="mt-2 font-serif-display text-2xl sm:text-3xl font-medium text-[#392D40]">
                {getResultMessage(score)}
              </h4>
              <p className="mx-auto mt-3 max-w-md font-handwriting text-xl text-[#74647D]">
                &ldquo;No matter the score, my favorite answer in life will always be you.&rdquo;
              </p>

              <button
                type="button"
                onClick={handleRestart}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#392D40]/15 bg-white px-6 py-2.5 text-xs font-medium text-[#392D40] shadow-xs transition hover:border-[#D98F9B] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Play Quiz Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
