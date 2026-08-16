function StatCard({
                      title,
                      value,
                      subtitle,
                      icon: Icon,
                      color = "violet",
                  }) {
    const colors = {
        violet: "from-violet-500/20 to-fuchsia-500/10 border-violet-500/30",
        blue: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
        pink: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
        orange: "from-orange-500/20 to-yellow-500/10 border-orange-500/30",
    };

    const iconColors = {
        violet: "text-violet-300",
        blue: "text-cyan-300",
        pink: "text-pink-300",
        orange: "text-orange-300",
    };

    return (
        <div
            className={`glass rounded-2xl border bg-gradient-to-br p-5 ${colors[color]}`}
        >

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                        {subtitle}
                    </p>
                </div>

                <div
                    className={`rounded-xl bg-white/5 p-3 ${iconColors[color]}`}
                >
                    <Icon size={23} />
                </div>

            </div>

        </div>
    );
}

export default StatCard;