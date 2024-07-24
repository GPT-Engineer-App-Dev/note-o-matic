import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ColorPicker } from "./ColorPicker";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const addNote = (note) => {
    const updatedNotes = [...notes, { ...note, id: Date.now() }];
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    toast({
      title: "Note added",
      description: "Your note has been successfully added.",
    });
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setSelectedNote(updatedNote);
    setIsEditing(false);
    toast({
      title: "Note updated",
      description: "Your note has been successfully updated.",
    });
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setSelectedNote(null);
    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <NoteForm onSave={addNote} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="cursor-pointer"
            onClick={() => navigate(`/note/${note.id}`)}
            style={{ backgroundColor: note.color }}
          >
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="truncate mb-2">{note.content}</p>
              <div className="flex flex-wrap gap-1">
                {note.tags && note.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedNote && (
        <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Note" : selectedNote.title}
              </DialogTitle>
            </DialogHeader>
            {isEditing ? (
              <NoteForm
                note={selectedNote}
                onSave={updateNote}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div>
                <p className="mb-4">{selectedNote.content}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedNote.tags && selectedNote.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteNote(selectedNote.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const NoteForm = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [color, setColor] = useState(note?.color || "#ffffff");
  const [tags, setTags] = useState(note?.tags || []);
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: note?.id, title, content, color, tags });
    setTitle("");
    setContent("");
    setColor("#ffffff");
    setTags([]);
    setCurrentTag("");
  };

  const handleAddTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <ColorPicker color={color} onChange={setColor} />
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add a tag"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
        />
        <Button type="button" onClick={handleAddTag}>
          <Tag className="mr-2 h-4 w-4" /> Add Tag
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
            {tag} <span className="ml-1">&times;</span>
          </Badge>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{note ? "Update" : "Save"}</Button>
      </div>
    </form>
  );
};

export default Index;