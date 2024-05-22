# maxprepper
Generate spreadsheets from Maxpreps schedules

### Intro
Thanks to [PikachuB2005](https://github.com/pikachub2005) for helping with getting this to work properly and for doing it in Typescript and thanks to me for having exigence and writing the original thing in Node.
This project lets you create `.csv` files given a Maxpreps schedule url with columns for the Date, Opponent, W/L, and Score. Time was removed as I didn't really need it, but it can easily be reimplemented (just note that the time for completed games will likely give the score instead).
### Running
Bring this project into any IDE and make a `/schedules` folder in the directory. Then, replace the url in line 7 of `index.ts` with any schedule page from Maxpreps. Finally, run it and check the generated `.csv` in the `/schedules` folder.
### Todo
- Make a website or proper interface (or someone else just do it pleaseeee)
- Incorporate opponent page hyperlinks with `=HYPERLINK()` function
- Incorporate columns for opponent record and other info
- Make options to enable or disable columns
