#!/bin/bash
rm -rf build
yarn build
cd build
zip -r ../../ltfront.zip .
cd ..
rm -rf build