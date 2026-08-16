import { useEffect, useState } from "react";

function Notes() {
    const [notes, setNotes] = useState(() => {
        return JSON.parse(localStorage.getItem("projecthub_notes")) || [];
    });

    const [activeNote, setActiveNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        localStorage.setItem(
            "projecthub_notes",
            JSON.stringify(notes)
        );
    }, [notes]);

    const createNote = () => {
        const note = {
            id: Date.now(),
            title: "Untitled Note",
            content: "",
            updatedAt: new Date().toISOString(),
        };

        setNotes([note, ...notes]);
        setActiveNote(note.id);
        setTitle(note.title);
        setContent("");
    };

    const selectNote = (note) => {
        setActiveNote(note.id);
        setTitle(note.title);
        setContent(note.content);
    };

    const saveNote = () => {
        setNotes(
            notes.map((note) =>
                note.id === activeNote
                    ? {
                        ...note,
                        title: title || "Untitled Note",
                        content,
                        updatedAt: new Date().toISOString(),
                    }
                    : note
            )
        );
    };

    const deleteNote = (id) => {
        const updated = notes.filter(
            (note) => note.id !== id
        );

        setNotes(updated);

        if (activeNote === id) {
            setActiveNote(null);
            setTitle("");
            setContent("");
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white">

            <main className="px-6 py-10 lg:ml-64 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <p className="text-sm font-medium tracking-widest text-violet-300">
                        WORKSPACE
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4">

                        <div>
                            <h1 className="text-4xl font-bold">
                                Notes
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Keep ideas, plans and technical notes in one place.
                            </p>
                        </div>

                        <button
                            onClick={createNote}
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold"
                        >
                            + New Note
                        </button>

                    </div>

                    <div className="mt-8 grid min-h-[600px] gap-6 lg:grid-cols-[320px_1fr]">

                        {/* Notes list */}
                        <div className="glass rounded-3xl p-4">

                            <div className="mb-4 px-3">
                                <p className="text-sm text-slate-500">
                                    {notes.length} notes
                                </p>
                            </div>

                            <div className="space-y-2">

                                {notes.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">

                                        <div className="text-3xl">
                                            📝
                                        </div>

                                        <p className="mt-3 text-sm text-slate-500">
                                            No notes yet.
                                        </p>

                                    </div>
                                ) : (
                                    notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className={`group flex cursor-pointer items-center gap-2 rounded-xl p-3 transition ${
                                                activeNote === note.id
                                                    ? "bg-violet-500/10 border border-violet-500/20"
                                                    : "hover:bg-white/5"
                                            }`}
                                            onClick={() =>
                                                selectNote(note)
                                            }
                                        >

                                            <div className="flex-1 overflow-hidden">

                                                <p className="truncate text-sm font-medium">
                                                    {note.title}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-slate-600">
                                                    {note.content ||
                                                        "Empty note"}
                                                </p>

                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteNote(note.id);
                                                }}
                                                className="hidden text-xs text-slate-600 hover:text-red-400 group-hover:block"
                                            >
                                                🗑
                                            </button>

                                        </div>
                                    ))
                                )}

                            </div>
                        </div>

                        {/* Editor */}
                        <div className="glass rounded-3xl p-6">

                            {activeNote ? (
                                <>

                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Note title"
                                        className="w-full border-b border-white/10 bg-transparent pb-4 text-2xl font-bold text-white outline-none placeholder:text-slate-700"
                                    />

                                    <textarea
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        placeholder="Start writing..."
                                        className="mt-6 min-h-[400px] w-full resize-none bg-transparent text-sm leading-7 text-slate-300 outline-none placeholder:text-slate-700"
                                    />

                                    <div className="flex justify-end border-t border-white/5 pt-4">

                                        <button
                                            onClick={saveNote}
                                            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500"
                                        >
                                            Save Note
                                        </button>

                                    </div>

                                </>
                            ) : (
                                <div className="flex h-full min-h-[500px] flex-col items-center justify-center text-center">

                                    <div className="text-5xl">
                                        📝
                                    </div>

                                    <h2 className="mt-5 text-xl font-semibold">
                                        Your workspace for ideas
                                    </h2>

                                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                        Create a note for an idea, architecture
                                        decision, interview preparation,
                                        project plan or anything else.
                                    </p>

                                    <button
                                        onClick={createNote}
                                        className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold"
                                    >
                                        Create your first note
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Notes;