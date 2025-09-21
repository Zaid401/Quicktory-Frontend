function EventCard({ year, description, links }) {
  return (
    <div className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold">🗓️ {year}</h3>
      <p className="text-gray-700 mt-2">{description}</p>

      {/* Wikipedia Link */}
      {links && links.length > 0 && (
        <a
          href={links[0].wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-2 inline-block"
        >
          🔗 Read more on Wikipedia
        </a>
      )}
    </div>
  );
}

export default EventCard;
