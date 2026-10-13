// Rend les segments **…** du dictionnaire en gras mis en valeur (débuts d'étapes des guides).
// Pas de whitespace-nowrap : ces segments sont des phrases, qui doivent passer à la ligne à 375 px.
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-accent-hover">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
