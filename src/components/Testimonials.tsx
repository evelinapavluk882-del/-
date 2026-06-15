import React, { useState, useEffect } from 'react';
import { TESTIMONIALS, SERVICES } from '../data';
import { Testimonial } from '../types';
import { Star, CheckCircle, MessageSquare, Plus, X, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState(SERVICES[0]?.name || 'Септум');
  const [text, setText] = useState('');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Load from local storage or set initial state
  useEffect(() => {
    const saved = localStorage.getItem('aura_customer_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(TESTIMONIALS);
      }
    } else {
      setReviews(TESTIMONIALS);
    }
  }, []);

  const saveReviews = (updatedReviews: Testimonial[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('aura_customer_reviews', JSON.stringify(updatedReviews));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview: Testimonial = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      rating,
      date: new Date().toLocaleDateString('uk-UA'),
      serviceName: service,
      text: text.trim(),
      verified: true
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);
    setSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setName('');
      setRating(5);
      setText('');
      setSubmitted(false);
      setShowAddForm(false);
    }, 2000);
  };

  const handleLikeReview = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="testimonials" className="py-24 bg-black border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase block">
              РЕАЛЬНІ ВІДГУКИ КЛІЄНТІВ
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans font-black text-white mt-3 tracking-tighter uppercase leading-none">
              Що про нас говорять
            </h2>
            <div className="w-16 h-1 bg-purple-600 mt-4" />
            <p className="text-zinc-400 mt-4 font-light text-sm leading-relaxed">
              Комфорт клієнта та безпека проколу — наші головні цінності. Прочитайте справжні відгуки задоволених гостей про стерильність, якість прикрас та досвід наших майстрів.
            </p>
          </div>

          <button
            id="add-review-btn"
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold font-mono tracking-widest uppercase transition-all duration-300 border border-purple-500 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Залишити відгук</span>
          </button>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((testimonial) => {
            const isLiked = (likes[testimonial.id] || 0) > 0;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                id={`review-card-${testimonial.id}`}
                key={testimonial.id}
                className="bg-zinc-950 p-6 sm:p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  {/* Rating or stars row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {testimonial.date}
                    </span>
                  </div>

                  {/* Feedback text */}
                  <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6 italic">
                    «{testimonial.text}»
                  </p>
                </div>

                <div>
                  {/* Service indicator & author meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-white font-black text-xs uppercase tracking-wide">
                          {testimonial.name}
                        </span>
                        {testimonial.verified && (
                          <div className="flex items-center text-purple-400" title="Перевірене відвідування">
                            <CheckCircle id="verified-icon" className="w-3.5 h-3.5 fill-black" />
                          </div>
                        )}
                      </div>
                      <div className="text-[10.5px] text-purple-400 uppercase font-mono tracking-wider mt-1 font-bold">
                        Прокол: {testimonial.serviceName}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLikeReview(testimonial.id)}
                      className={`flex items-center space-x-1 px-3 py-1.5 border text-[10px] font-mono tracking-wider transition-all duration-200 ${
                        isLiked
                          ? 'bg-rose-950/40 border-rose-500 text-rose-400'
                          : 'bg-black border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                      <span>{isLiked ? 'Подобається' : 'Корисно'}</span>
                      {(likes[testimonial.id] || 0) > 0 && (
                        <span className="font-bold ml-1">({likes[testimonial.id]})</span>
                      )}
                    </button>
                  </div>

                  {/* Answer from master if exists */}
                  {testimonial.repliedBy && (
                    <div className="mt-5 p-4 bg-zinc-900/50 border-l-2 border-purple-500 text-xs">
                      <div className="flex items-center space-x-1.5 mb-1.5 text-[11px] font-bold text-white uppercase tracking-wider">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>Відповідь від студії ({testimonial.repliedBy}):</span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed font-light italic">
                        {testimonial.replyText}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal feedback creation form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => !submitted && setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-white/10 max-w-lg w-full p-6 sm:p-8 relative"
              >
                {!submitted ? (
                  <>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase">
                      ДЯКУЄМО ЗА ВІДГУК
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1 uppercase tracking-tight font-sans">
                      Ваш досвід у AURA
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                      Поділіться враженнями про точність проколу, стерильність або спілкування з майстром. Це допоможе нам тримати планку на висоті!
                    </p>

                    <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                          Ваше ім'я
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Наприклад, Олена К."
                          className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      {/* Rating selection star */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                          Ваша оцінка
                        </label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRating(star)}
                              className="p-1 text-zinc-500 hover:text-yellow-500 transition-colors cursor-pointer"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= rating
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-zinc-700 hover:text-yellow-500'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service selection */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                          Виберіть процедуру (прокол)
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Comment text */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                          Текст відгуку
                        </label>
                        <textarea
                          required
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          rows={4}
                          placeholder="Опишіть ваші враження, рівень стерильності, роботу майстра..."
                          className="w-full bg-zinc-900 border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono tracking-widest uppercase font-black py-3.5 transition-colors cursor-pointer"
                      >
                        Опублікувати відгук
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 bg-purple-900/40 border border-purple-500 rounded-full flex items-center justify-center mx-auto text-purple-400">
                      <Sparkles className="w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-sans font-black text-white uppercase tracking-tight">
                      Відгук збережено!
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-xs mx-auto">
                      Дякуємо! Ваш відгук успішно опубліковано у нашій стрічці та збережено. Ми цінуємо ваші теплі слова.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
