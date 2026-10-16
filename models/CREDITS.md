# 3D model credits

All third-party models in this folder are **public domain (CC0 1.0)** —
https://creativecommons.org/publicdomain/zero/1.0/ — no attribution required, credited here anyway.

## `characters/` — animated characters by **Quaternius** (https://quaternius.com), downloaded from Poly Pizza

| file | original model | source page | original GLB | license |
|---|---|---|---|---|
| `sam.glb` | "Characters Sam" | https://poly.pizza/m/UcLErL2W37 | https://static.poly.pizza/2d0ad9ee-2e86-4b0c-b20e-cfc8c80c8c78.glb | CC0 |
| `shaun.glb` | "Characters Shaun" | https://poly.pizza/m/eJFT9MxzOM | https://static.poly.pizza/c8ecc219-6a19-4fd1-ae1a-6ceeda529eaf.glb | CC0 |
| `lis.glb` | "Lis" | https://poly.pizza/m/gjuwleUT1U | https://static.poly.pizza/5c3f2a86-c030-49aa-8a4c-86a7a1220801.glb | CC0 |
| `matt.glb` | "Characters Matt" | https://poly.pizza/m/66kQ4dBBC7 | https://static.poly.pizza/1e87091b-7202-4906-bd14-22881d9b945c.glb | CC0 |
| `anne.glb` | "Anne" | https://poly.pizza/m/tZYaOQ4l94 | https://static.poly.pizza/1cc2232d-b43e-4fc0-b97f-134b4a528bf8.glb | CC0 |
| `enforcer.glb` | "Character Soldier" | https://poly.pizza/m/PpLF4rt4ah | https://static.poly.pizza/1083c1d3-d1d4-4682-adf6-bc516d06ac84.glb | CC0 |

Modifications (made for EdsaRunner): the held weapons / shoulder pads were removed, unused animation
clips were dropped and the kept clips were renamed to their short names
(`Idle, Run, Jump, Jump_Idle, Jump_Land, Duck, HitReact, Wave, Death` — enforcer: `Idle, Run, Jump,
Jump_Idle, Duck, Wave, Punch, Yes, Walk`). The soldier has no walk cycle, so the enforcer's `Walk` clip
was copied (bone-name matched, same rig) from Quaternius' CC0 "Character Hazmat"
(https://poly.pizza/m/z3TSQYx1Kn — https://static.poly.pizza/484450a4-b76c-4e76-95d2-352337bb41e8.glb).
Colours are changed at runtime (`src/characters.js`) and the costumes/accessories are code-built props.
