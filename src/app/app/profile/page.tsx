"use client";

import { useLocalAllGames } from "@/lib/data/local";
import { page } from "@d-exclaimation/next";

export default page(() => {
  const { data, isLoading, error } = useLocalAllGames();

  return (
    <div className="flex flex-col w-full min-h-[100dvh] pb-2">
      <div className="flex flex-col items-center justify-center gap-4 px-3 pt-12 pb-2">
        <img
          className="w-20 h-20 rounded-full"
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Coco"
        />
        <div className="flex flex-col items-center text-center gap-1">
          <span className="text-lg text-white">Anonymous user</span>
          <span className="text-sm text-neutral-400">@anonymous-user</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center gap-2">
          {[0, 0.25, 0.5, 1].map((each, i) => (
            <div
              key={`loading-${i}`}
              className="w-3 h-3 rounded-full mt-4 bg-neutral-400 animate-bounce [animation-fill-mode:backwards] mb-20"
              style={{
                animationDelay: `${each}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="relative flex items-end justify-center gap-4 px-3 pt-12 pb-2">
            {[1, 3, 4, 2, 6, 4, 6, 10].map((each, i) => (
              <span
                key={`bar-${i}`}
                className="w-6 rounded bg-white opacity-[0.025]"
                style={{ height: `${Math.round(each / 2)}rem` }}
              />
            ))}

            <div className="absolute inset-0 flex items-center justify-around gap-4 px-3 pt-12 pb-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg text-white">{data?.length ?? 0}</span>
                <span className="text-sm text-neutral-400">Games Played</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg text-white">
                  {data?.filter(({ winning }) => winning)?.length ?? 0}
                </span>
                <span className="text-sm text-neutral-400">Games Won</span>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 py-6 place-items-center place-content-center px-3">
            {data?.map(
              ({ winning, attempts, goal: { difficulty, items } }, i) =>
                winning ? (
                  <img
                    key={`attempt-${i}`}
                    className={`w-[calc(50vw-2rem)] h-[calc(50vw-2rem)] object-cover outline max-w-[10rem] max-h-[10rem]
                    ${
                      difficulty === "easiest"
                        ? "outline-blue-600"
                        : difficulty === "easy"
                        ? "outline-purple-500"
                        : difficulty === "medium"
                        ? "outline-fuchsia-400"
                        : difficulty === "hard"
                        ? "outline-red-400"
                        : "outline-orange-500"
                    }`}
                    src={winning}
                  />
                ) : (
                  <div
                    key={`attempt-${i}`}
                    className={`w-[calc(50vw-2rem)] h-[calc(50vw-2rem)] bg-neutral-700 flex items-center justify-center outline max-w-[10rem] max-h-[10rem]
                    ${
                      difficulty === "easiest"
                        ? "outline-blue-600"
                        : difficulty === "easy"
                        ? "outline-purple-500"
                        : difficulty === "medium"
                        ? "outline-fuchsia-400"
                        : difficulty === "hard"
                        ? "outline-red-400"
                        : "outline-orange-500"
                    }`}
                  >
                    <div className="flex flex-col">
                      {attempts.map((attempt, j) => {
                        const row = attempt
                          .map(({ kind }) =>
                            kind === "exact"
                              ? "🟩"
                              : kind === "similar"
                              ? "🟨"
                              : "🟥"
                          )
                          .join("");

                        return (
                          <span
                            className="leading-none text-2xl"
                            key={`attempt-${i}-${j}`}
                          >
                            {row}
                          </span>
                        );
                      })}
                      {Array.from({ length: 5 - attempts.length }).map(
                        (_, k) => (
                          <span
                            className="leading-none text-2xl opacity-50"
                            key={`attempt-${i}-${k}x`}
                          >
                            {"⬜".repeat(items.length)}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
});
