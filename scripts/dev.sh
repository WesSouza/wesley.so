#!/bin/sh
export NODE_ENV=development

set -e

cd "$(dirname "$0")/.."

touch .env

mkdir -p public

cp ./src/LICENSE.txt ./public
cp ./src/resume.html ./public
cp ./src/resume-detailed.html ./public
cp -a ./archive ./public

parcel ./src/index.html --dist-dir ./public
