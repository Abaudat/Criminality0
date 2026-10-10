Technical architecture of the game:

- Browser based, deploy on Github Pages
- No CI except the Github Pages deploy (no building, no testing, no watching, ...)
- Tests run locally as a repo-local Claude hook to guard remote against non working code
- No PR flow, push directly to master
- Single, 100% fill page, the game is entirely contained inside, no scrollbars on the game page
- Fully mouse/touch/keyboard controlled game
- Usable for both mobile (landscape) and web. Make sure the size is comfortable for mobile (text size, icons, ...)
- Free game, no cost, no server, no paid assets
- Follow best game develop practices
- Large tables (crime blotter, citizen) are filterable / orderable on each field, and searchable with full text search
- Think about an actual player cycle, not just a "start to finish" session. What happens when the player leaves the page? Changes tabs? Opens the page back up later? Can they pick up their session? How do we avoid losing their data?
- Translations: English, French, Spanish, Japanese. Changing language doesn't have to be seamless, allow changing from the main menu
- Fully determinist. The rules are created at design time, not generated. Maybe in the future they might be generated, but not in this version
- Hardcode some tests for each ending with a series of decisions a player could reasonably make
- Searching the citizen database should be very fast, less than 100ms for a multi criteria search
- Make sure the Github Pages page has everything needed for sharing (favicon, tags, ...)

