# Tasks

## Brighten Colors Task (Completed)
- [x] Modify primary color HSL values
- [x] Update gradient-primary colors
- [x] Adjust therapy type colors (nasya, vamana, etc.)
- [x] Adjust health metric colors (energy, stress, etc.)
- [ ] Test the app to verify brighter appearance (pending dev server)

## Profile Page Redesign Task (Completed)
- [x] Update ProfileSummary.tsx with new form layout
- [x] Add phone to profile state and update logic
- [x] Implement notification switches and update preferences
- [ ] Test the profile page rendering and functionality

## Dashboard Layout and HealthTrends Fix Task
### Plan
- Fix left sidebar layout to remain fixed/sticky during scroll, preventing overlap.
- Redesign HealthTrends to fill space: row of 4 metric cards (energy, stress, digestion, sleep), line chart for energy trend below, integrate with QuickActions/WellnessTips on right.
- Use Recharts for charts, useHealthData for data, flex/grid for layout.

### Steps
- [ ] Update App.tsx for fixed sidebar and scrollable main content
- [ ] Update HealthTrends.tsx with metric cards, line chart, space-filling layout
- [ ] Test dashboard scroll and HealthTrends rendering
