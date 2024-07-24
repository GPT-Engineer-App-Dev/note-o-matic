import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const Comments = ({ comments, onUpdate }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { id: Date.now(), text: newComment.trim() }];
      onUpdate(updatedComments);
      setNewComment('');
    }
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    onUpdate(updatedComments);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
            <p>{comment.text}</p>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteComment(comment.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow"
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
      </div>
    </div>
  );
};

export default Comments;