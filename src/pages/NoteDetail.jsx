import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Edit, ArrowLeft, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Comments from './Comments';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNote = () => {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      const foundNote = notes.find(n => n.id === parseInt(id));
      if (foundNote) {
        setNote(foundNote);
      } else {
        toast({
          title: "Note not found",
          description: "The requested note could not be found.",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    fetchNote();
  }, [id, navigate, toast]);

  const handleDelete = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(n => n.id !== parseInt(id));
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted.",
      variant: "destructive",
    });
    navigate('/');
  };

  const handleCommentUpdate = (updatedComments) => {
    const updatedNote = { ...note, comments: updatedComments };
    setNote(updatedNote);
    
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.map(n => n.id === parseInt(id) ? updatedNote : n);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  if (!note) return null;

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Notes
      </Button>
      <Card style={{ backgroundColor: note.color }}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 whitespace-pre-wrap">{note.content}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags && note.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => navigate(`/edit/${note.id}`)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
      <Comments comments={note.comments || []} onUpdate={handleCommentUpdate} />
    </div>
  );
};

export default NoteDetail;