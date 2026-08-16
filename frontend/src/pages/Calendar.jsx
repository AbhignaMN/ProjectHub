import { useEffect, useState } from "react";

function Calendar() {
    const [events, setEvents] = useState(() => {
        return JSON.parse(localStorage.getItem("projecthub_events")) || [];
    });

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        localStorage.setItem(
            "projecthub_events",
            JSON.stringify(events)
        );
    }, [events]);

    const addEvent = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const newEvent = {
            id: Date.now(),
            title: title.trim(),
            date: selectedDate,
            time: time || "All day",
        };

        setEvents([...events, newEvent]);

        setTitle("");
        setTime("");
    };

    const deleteEvent = (id) => {
        setEvents(
            events.filter((event) => event.id !== id)
        );
    };

    const selectedEvents = events
        .filter((event) => event.date === selectedDate)
        .sort((a, b) => a.time.localeCompare(b.time));

    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <main className="px-6 py-10 lg:ml-64 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <p className="text-sm font-medium tracking-widest text-violet-300">
                        ORGANIZE
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Calendar
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Plan deadlines, meetings and important project dates.
                    </p>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

                        {/* Calendar */}
                        <div className="glass rounded-3xl p-6">

                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Schedule
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Select a date to see what's planned.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-violet-500/10 p-3 text-2xl">
                                    📅
                                </div>
                            </div>

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                className="mt-7 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none focus:border-violet-500"
                            />

                            <div className="mt-7">
                                <p className="text-sm text-slate-500">
                                    Selected date
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    {new Date(
                                        `${selectedDate}T00:00:00`
                                    ).toLocaleDateString(
                                        undefined,
                                        {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">

                                {selectedEvents.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                                        <div className="text-3xl">
                                            ✨
                                        </div>

                                        <p className="mt-3 text-sm text-slate-500">
                                            Nothing scheduled for this day.
                                        </p>
                                    </div>
                                ) : (
                                    selectedEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                                        >
                                            <div className="rounded-xl bg-violet-500/10 px-3 py-2 text-sm text-violet-300">
                                                {event.time}
                                            </div>

                                            <p className="flex-1 font-medium">
                                                {event.title}
                                            </p>

                                            <button
                                                onClick={() =>
                                                    deleteEvent(event.id)
                                                }
                                                className="text-slate-600 transition hover:text-red-400"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))
                                )}

                            </div>
                        </div>

                        {/* Add event */}
                        <div className="glass h-fit rounded-3xl p-6">

                            <h2 className="text-xl font-semibold">
                                Add Event
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Add something you don't want to forget.
                            </p>

                            <form
                                onSubmit={addEvent}
                                className="mt-6 space-y-4"
                            >

                                <div>
                                    <label className="text-sm text-slate-400">
                                        Event
                                    </label>

                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Project deadline"
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-slate-400">
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-slate-400">
                                        Time
                                    </label>

                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) =>
                                            setTime(e.target.value)
                                        }
                                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-violet-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold transition hover:-translate-y-0.5"
                                >
                                    + Add to Calendar
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Calendar;