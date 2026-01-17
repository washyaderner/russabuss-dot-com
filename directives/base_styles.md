## Base Styles Setup

## Goal
Create the baseline global styles and variables to match the design system.

## Inputs
- `russabuss-init-prompt.md`
- `.cursorrules` design system and color palette

## Tools/Scripts
- None required.

## Process
1. Check if `src/styles/variables.css` and `src/styles/global.css` exist.
2. If files exist, extend them without deleting existing comments.
3. If files do not exist, create them using the design system values.
4. Keep styles simple, readable, and well commented.
5. Avoid unrelated refactors.

## Outputs
- `src/styles/variables.css`
- `src/styles/global.css`

## Edge Cases
- If values already match the spec, note that no changes were needed.
