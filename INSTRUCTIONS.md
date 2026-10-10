Create the game as described in SPEC.md. Take your own decisions when data is missing.

# Visual design and art

- Look at named visual touchstones. Pull screenshots. Distill palettes. Search for visual descriptions. Find out what makes them stand out
- Choose a fixed palette, art style, UI style and stick to it
- Use available tools to create art (scripting, blender, ...)
- Make it look crisp, easy to understand, yet stylish
- Make it interactive, the player should feel like they are interacting with a living game, not a slideshow with a few buttons
- The deliverable is the whole thing, not just the game. Make the Github Page and the README beautiful, they are part of the whole
- Narrative text is well written, non-AI slop, with intriguing, nuanced characters. Avoid stereotypes and black-or-white morality
- Make the narrative, decisions, and scripted characters a web on interconnected and cross-referencing relations, not isolated events. Think globally, and think from the perspective of the player.
- Think about the branding, make it strong. Think about where in the game it should be felt, and make those moment striking.

# Game design

- Investigate touchstones. What makes their systems good? Why did players like them? What can we learn from them
- Always prefer system design to small scale fixes. Decouple systems when possible, and make them reusable
- Always start from the highest level of abstraction and work downwards, instead of starting with the code
- Don't lose the plot, the goal is to make something fun and intriguing for the player
- Always prefer hard provability rather than probabilistic completeness when setting up systems (design from constraints, not the other way around)
- Always keep in mind how players will approach the game, and especially which information is available to them
- Make it comfortable for the player: Undo / redo system, easy navigation. Player joy comes from UX
- Make it easy to share the ending alignment chart as an animated image, this is a very nice hook for players

# Testing

- Do not test the system itself, it's provability should be proven by hard math and shouldn't need testing
- Test the implementation, but do not delve into edge cases
- Test the interaction. What will the player do? What will they see? Does it match what the game is trying to achieve?
- Keep the tests very quick

# Code

- Use plain vocabulary, use proper functional naming
- Do not add comments to the code, function and variable names should be self-documenting
- Do not create additional text-only files to explain your process, abandoned directions, issues, or other non-timeless information. Do not edit the sources of truth such as [SPEC.md](http://SPEC.md) or TECHNICAL\_ARCHITECTURE.md
- Avoid caveats, exceptions, edge cases, etc. Those should be solved holistically through systems engineering
- Create a very succinct, high-level description of the different flows somewhere at the start, and use that as a base for implementation
- Make the README a frontpage for the game that makes first-time repo visitors want to play the game, not a technical document (include the link!)



&nbsp;