"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white dark:bg-slate-900">
      <div className="flex flex-col items-center gap-6">
        <div className="loader"></div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Loading
          </p>
          <div className="flex gap-1.5 justify-center pt-3">
            <div
              className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StyleSheet() {
  return (
    <style>{`
.loader {
  width: 50px;
  aspect-ratio: 1;
  display:grid;
  -webkit-mask: conic-gradient(from 15deg,#0000,#000);
  animation: l26 1s infinite steps(12);
}
.loader,
.loader:before,
.loader:after{
  background:
    radial-gradient(closest-side at 50% 12.5%,
     #f03355 96%,#0000) 50% 0/20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%,
     #f03355 96%,#0000) 0 50%/80% 20% repeat-x;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  transform: rotate(30deg);
}
.loader:after {
  transform: rotate(60deg);
}

@keyframes l26 {
  100% {transform:rotate(1turn)}
}`}</style>
  );
}
