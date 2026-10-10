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
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px] fill-current"
        >
          <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.77 2.4 3.48 1.7.1-.73.4-1.23.7-1.51-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16a10.78 10.78 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.75 1.03.75 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
        </svg>
        <span>GitHub</span>
      </button>
    </div>
  );
}
