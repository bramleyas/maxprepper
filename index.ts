import axios from "axios";
import { JSDOM, VirtualConsole } from "jsdom";
import fs from "fs/promises";

// MAXPREPS SCHEDULE PAGE (https://www.maxpreps.com/state/town/school-mascot/sport/schedule)
const page =
  "https://www.maxpreps.com/ca/el-dorado-hills/maxpreps-preppies/football/23-24/schedule/";

const { data: html } = await axios.get(page);

const document = new JSDOM(html, {
  virtualConsole: (() => {
    const vc = new VirtualConsole();
    vc.on("error", () => {});
    return vc;
  })(),
}).window.document;

const games = Array.from(document.querySelectorAll("tbody tr"));
const team = document.querySelector("a.title")?.textContent?.replace(/\ /gi, "");
const name = document.querySelector("a.sub-title")?.textContent?.replace(/\ /gi, "");

const data = games.map((game) => ({
  Date: game.querySelector("td:nth-child(1)")?.textContent,
  Opponent: game
    .querySelector("td:nth-child(2) .name")
    ?.textContent?.replaceAll(/\*+$/g, ""),
  "W/L": game.querySelector("td:nth-child(3) .w-l-t")?.textContent,
  Score: game.querySelector("td:nth-child(3) .score")?.textContent,
}));

const csv = [
  Object.keys(data[0]).join(","),
  ...data.map((game) => Object.values(game).join(",")),
].join("\n");

await fs.writeFile("./schedules/" + name + team + ".csv", csv);
console.log("Operation complete! Check 'schedule.csv' to view the data.");
