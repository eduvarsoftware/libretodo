#!/bin/bash
mkdir -p libretodo-dist
cd backend
cp -rv tests/*.js scripts functions middleware index.js libretodo.config.js package.json pm2.config.js ../libretodo-dist/
cd ..

cd frontend
cp -v src/config/config.production.js src/config/config.js
yarn build
mv -v build ../libretodo-dist/public
cp -v src/config/config.dev.js src/config/config.js
cd ..

if [ "$1" = "-t" ]; then
    tar cvzf libretodo.tgz libretodo-dist/
else
    zip -r libretodo.zip libretodo-dist/
fi

rm -rf libretodo-dist
