import { useState, useEffect } from "react";
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
import { Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ColorPicker } from "./ColorPicker";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

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
            onClick={() => setSelectedNote(note)}
            style={{ backgroundColor: note.color }}
          >
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="truncate">{note.content}</p>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: note?.id, title, content, color });
    setTitle("");
    setContent("");
    setColor("#ffffff");
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