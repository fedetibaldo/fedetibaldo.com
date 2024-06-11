#!/usr/bin/env sh

# Root folder

if [ ! -d "./public" ]; then
    mkdir public
fi

# Main website

cp -Rv packages/website/public/* public/

# Connection

if [ ! -d "./public/connection" ]; then
    mkdir public/connection
fi

cp -Rv packages/connection/dist/* public/connection/

# Codepen assets

if [ ! -d "./public/codepen-assets" ]; then
    mkdir public/codepen-assets
fi

cp -Rv packages/codepen-assets/assets/* public/codepen-assets/

cp netlify.toml public/netlify.toml
