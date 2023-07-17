export default function Home() {
  return (
    <div className="bg-red-300">
      <div className="sidebar">
        <div className="flex gap-2">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="text-teal-700 dark:text-purple-700">cpu</span>
        </div>
      </div>
    </div>
  );
}
