#!/usr/bin/env sh

# Root folder

if [ ! -d "./public" ]; then
    mkdir public
fi

# Main website

cp -Rv packages/website/dist/* public/

# Codepen assets

if [ ! -d "./public/codepen-assets" ]; then
    mkdir public/codepen-assets
fi

cp -Rv packages/codepen-assets/assets/* public/codepen-assets/

cp netlify.toml public/netlify.toml
