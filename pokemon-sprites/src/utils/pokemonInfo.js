export const getPokemonInfo = ({
  name = "",
  abilities = [],
  types = [],
  weight = 0,
  moves = [],
  sprites = {},
} = {}) => {
  const type = types
    .map(({ type }) => type?.name)
    .filter(Boolean)
    .join(", ");

  const ability = abilities
    .map(({ ability }) => ability?.name)
    .filter(Boolean)
    .join(", ");

  const move = moves
    .slice(0, 3)
    .map(({ move }) => move?.name)
    .filter(Boolean)
    .join(", ");

  const sprite = sprites?.front_default ?? null;
  const weightKg = Number((weight * 0.1).toFixed(1)); // convert hg -> kg, 1 decimal

  return {
    name,
    type,
    ability,
    move,
    weight: weightKg,
    sprite,
  };
};
