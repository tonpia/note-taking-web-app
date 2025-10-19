# Folder Structure (Maintainability-Proof)

scale it sane way:

``` 
src/
  app/
    layout.tsx
    page.tsx                 # notes listing
    archive/
      page.tsx
    note/
      [id]/
        page.tsx
  components/
    ui/                      # generic UI (button, modal, input)
    notes/                   # specific to notes features
  hooks/                     # e.g. useLocalStorage, useTheme
  store/                     # Zustand stores
  lib/                       # utils (filtering, persistence helpers)
  types/                     # shared TS types
  styles/                    # Tailwind/global CSS overrides
  data/                      # seed or mock data (optional)
```