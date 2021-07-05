#!/usr/bin/env sh

# Root folder

if [ ! -d "./public" ]; then
    mkdir public
fi

# 2020 website

if [ ! -d "./public/2020" ]; then
    mkdir public/2020
fi

cp -Rv packages/2020-website/public/* public/2020/

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