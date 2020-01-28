#!/bin/sh
export NODE_ENV=production

set -e

cd "$(dirname "$0")/.."

touch .env

mkdir -p ./public

cp ./src/LICENSE.txt ./public/LICENSE.txt
cp ./src/resume.html ./public/resume.html
cp -a ./archive ./public

parcel build ./src/index.html --dist-dir ./public
