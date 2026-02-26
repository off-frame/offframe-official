# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


### ＝＝＝premiumトリミングなしraw-->low/high画像フォルダに振り分ける＝＝＝poweshell

$src     = "C:\OffFrame\raw\select\premium"
$outBase = "C:\dev\OffFrame\public\images"

foreach ($d in @("full_low","full_high")) {
    New-Item -ItemType Directory -Force -Path "$outBase\$d" | Out-Null
}

$images = Get-ChildItem -Path $src -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png)$" } | Sort-Object Name

foreach ($img in $images) {
    $name = $img.BaseName

    magick "$($img.FullName)" -resize 400x -quality 80 "$outBase\full_low\$name.webp"
    magick "$($img.FullName)" -resize 1200x -quality 80 "$outBase\full_high\$name.webp"

    Write-Host "[$name] → 完了"
}

Write-Host "全て完了！"


### ＝＝＝standard画像-->low/high画像フォルダに振り分ける＝＝＝

$src     = "C:\OffFrame\raw\select\standard"
$outBase = "C:\dev\OffFrame\public\images"

foreach ($d in @("low", "high")) {
    New-Item -ItemType Directory -Force -Path "$outBase\$d" | Out-Null
}

$images = Get-ChildItem -Path $src -File |
    Where-Object { $_.Extension -match "\.(png)$" } |
    Sort-Object Name

foreach ($img in $images) {
    $name = $img.BaseName

    magick "$($img.FullName)" -resize 400x  -quality 80 "$outBase\low\$name.webp"
    magick "$($img.FullName)" -resize 800x -quality 80 "$outBase\high\$name.webp"

    Write-Host "[$name] → 完了"
}

Write-Host "全て完了！"


そのあとで

＝＝＝.md生成ターミナル＝＝＝

Get-ChildItem "C:\dev\OffFrame\public\images\low" -Filter "*.webp" | ForEach-Object {
    $name = $_.BaseName
    $title = $name.Substring(0,2) + ":" + $name.Substring(2,2)
    $content = "---`ntitle: `"$title`"`n---`n"
    Set-Content -Path "C:\dev\OffFrame\src\content\photos\$name.md" -Value $content -Encoding UTF8
}