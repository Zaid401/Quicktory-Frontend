
function EventCards({ year, title, description, links, image }) {
  return (
    <div className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
      {/* Image section */}
      {image && (
        <img
          src={image}
          alt={title || description}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}

      <h3 className="text-lg font-semibold">🗓️ {year}</h3>

      {title && <p className="text-gray-800 font-medium mt-1">{title}</p>}
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

export default EventCards;




// function EventCard({ year,title,description, links }) {
//   return (
//     <div className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
//       <h3 className="text-lg font-semibold">🗓️ {year}</h3>
//       <p className="text-gray-700 mt-2">{title}</p>
//       <p className="text-gray-700 mt-2">{description}</p>


//       {/* Wikipedia Link */}
//       {links && links.length > 0 && (
//         <a
//           href={links[0].wikipedia}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-600 underline mt-2 inline-block"
//         >
//           🔗 Read more on Wikipedia
//         </a>
//       )}
//     </div>
//   );
// }

// export default EventCard;
