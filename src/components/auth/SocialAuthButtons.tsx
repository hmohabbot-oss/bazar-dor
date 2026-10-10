import { Github } from "lucide-react";

type SocialAuthButtonsProps = {
  onGoogleClick: () => void;
  onGitHubClick: () => void;
};

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.61v2.93h3.87c2.26-2.08 3.57-5.15 3.57-8.78Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.93l-3.87-2.93c-1.08.72-2.46 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.02A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.34a7.2 7.2 0 0 1 0-4.68V6.64H1.27a12 12 0 0 0 0 10.72l4-3.02Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.81l3.44-3.44C17.95 1.15 15.24 0 12 0A12 12 0 0 0 1.27 6.64l4 3.02C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function SocialAuthButtons({
  onGoogleClick,
  onGitHubClick,
}: SocialAuthButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onGoogleClick}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
      >
        <GoogleMark />
        <span>Google</span>
      </button>
      <button
        type="button"
        onClick={onGitHubClick}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-900"
      >
        <Github aria-hidden="true" size={18} strokeWidth={2.2} />
        <span>GitHub</span>
      </button>
    </div>
  );
}
