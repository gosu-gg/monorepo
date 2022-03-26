import axios from "axios";

export default async function getClashBattleLog(playerTag: string) {
  const config = {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  };

  const data = await axios.get(
    `https://api.clashroyale.com/v1/players/${playerTag}/battlelog`,
    config
  );

  return data.data;
}
