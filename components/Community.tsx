import React, { useState } from 'react';
import { Comment } from '../types';
import { INITIAL_COMMENTS } from '../constants';

const Community: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [mainCommentText, setMainCommentText] = useState('');
  
  // State for tracking which comment is being replied to
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Track which comments the user has liked to support toggle behavior
  const [userLikedIds, setUserLikedIds] = useState<Set<string>>(new Set());

  // Handle posting a new top-level comment
  const handlePostMain = () => {
    if (!mainCommentText.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      user: 'Seeker_' + Math.floor(Math.random() * 1000),
      text: mainCommentText,
      likes: 0,
      timestamp: Date.now(),
      replies: []
    };
    setComments([comment, ...comments]);
    setMainCommentText('');
  };

  // Handle posting a reply to a specific comment
  const handlePostReply = (parentId: string) => {
    if (!replyText.trim()) return;
    
    const newReply: Comment = {
        id: Date.now().toString(),
        user: 'Seeker_' + Math.floor(Math.random() * 1000),
        text: replyText,
        likes: 0,
        timestamp: Date.now()
    };

    setComments(prevComments => prevComments.map(comment => {
        if (comment.id === parentId) {
            return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
            };
        }
        return comment;
    }));

    setReplyText('');
    setActiveReplyId(null);
  };

  const handleLike = (id: string, isReply: boolean = false, parentId?: string) => {
    const isLiked = userLikedIds.has(id);

    // Update comment like counts
    setComments(prev => prev.map(comment => {
        // If liking a main comment
        if (!isReply && comment.id === id) {
            return { ...comment, likes: isLiked ? comment.likes - 1 : comment.likes + 1 };
        }
        // If liking a reply (nested)
        if (isReply && parentId && comment.id === parentId) {
            return {
                ...comment,
                replies: comment.replies?.map(reply => 
                    reply.id === id ? { ...reply, likes: isLiked ? reply.likes - 1 : reply.likes + 1 } : reply
                )
            };
        }
        return comment;
    }));

    // Toggle user like status
    setUserLikedIds(prev => {
        const newSet = new Set(prev);
        if (isLiked) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };

  const toggleReplyBox = (commentId: string) => {
    if (activeReplyId === commentId) {
        setActiveReplyId(null);
    } else {
        setActiveReplyId(commentId);
        setReplyText('');
    }
  };

  const renderCommentContent = (comment: Comment, isReply = false, parentId?: string) => (
    <div className={`relative ${isReply ? 'mt-3 pl-4 border-l-2 border-white/10' : 'bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-white/5'}`}>
        <div className="flex justify-between items-start mb-2">
            <span className={`font-serif text-sm ${isReply ? 'text-violet-300' : 'text-fuchsia-300'}`}>
                {comment.user}
            </span>
            <span className="text-[10px] text-slate-500">{new Date(comment.timestamp).toLocaleDateString()}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-3">{comment.text}</p>
        
        <div className="flex items-center gap-4">
            <button 
                onClick={() => handleLike(comment.id, isReply, parentId)}
                className={`flex items-center gap-1 text-xs transition-colors active:scale-95 ${userLikedIds.has(comment.id) ? 'text-fuchsia-400' : 'text-slate-400 hover:text-fuchsia-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={userLikedIds.has(comment.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                {comment.likes}
            </button>
            
            {/* Only allow replying to main comments for this level of nesting simplicity */}
            {!isReply && (
                <button 
                    onClick={() => toggleReplyBox(comment.id)}
                    className={`flex items-center gap-1 text-xs transition-colors active:scale-95 ${activeReplyId === comment.id ? 'text-violet-400' : 'text-slate-400 hover:text-violet-400'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    回覆
                </button>
            )}
        </div>
    </div>
  );

  return (
    <div className="pt-6 pb-24 px-4 max-w-md mx-auto w-full">
      <h2 className="text-3xl font-serif text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-violet-300 mb-8">
        低語之環
      </h2>

      {/* Main Input */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-8 shadow-lg">
        <textarea
          value={mainCommentText}
          onChange={(e) => setMainCommentText(e.target.value)}
          placeholder="分享你的符文故事..."
          className="w-full bg-transparent text-slate-200 placeholder-slate-500 resize-none outline-none border-b border-white/10 pb-2 mb-3 min-h-[80px]"
        />
        <div className="flex justify-end">
          <button 
            onClick={handlePostMain}
            className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(192,38,211,0.3)]"
          >
            分享智慧
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="group">
            {/* Main Comment Card */}
            {renderCommentContent(comment)}

            {/* Render Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 space-y-2 mt-2">
                    {comment.replies.map(reply => (
                        <div key={reply.id}>
                            {renderCommentContent(reply, true, comment.id)}
                        </div>
                    ))}
                </div>
            )}

            {/* Inline Reply Input Box */}
            {activeReplyId === comment.id && (
                <div className="ml-4 mt-3 animate-float-in">
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-violet-500/30 flex gap-2">
                        <input
                            type="text"
                            autoFocus
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`回覆 @${comment.user}...`}
                            className="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder-slate-600"
                            onKeyDown={(e) => e.key === 'Enter' && handlePostReply(comment.id)}
                        />
                        <button 
                            onClick={() => handlePostReply(comment.id)}
                            className="text-violet-400 hover:text-violet-300 text-xs font-bold px-2"
                        >
                            發送
                        </button>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;