# Healing Core Recipe Library — Supabase-connected
This version reads public recipes from the Supabase `public.recipes` table.

## Add a recipe
In Supabase → Table Editor → `recipes` → Insert row. Fill `name`, `description`, `categories` (text array), `ingredients` (text array), `steps` (text array), `prep_minutes`, `recipe_type`, optional `image_url`, and set `published` to `true`.

## Security
The browser uses the Supabase publishable key, which is intended for public-client use. Row Level Security must remain enabled. The current policy allows public SELECT only for rows with `published = true`. Do not create public INSERT, UPDATE, or DELETE policies, and never expose a service-role/secret key in this website. Add authenticated admin access before implementing website-based recipe editing.
