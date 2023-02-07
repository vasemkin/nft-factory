## artifacts
rm -r backend/src/deployments/* && rm -r backend/src/typechain/*
rm -r ui/deployments/* && rm -r ui/typechain/* && rm -r ui/artifacts/**/*

cp -R contracts/deployments/. backend/src/deployments/ && cp -R contracts/typechain/. backend/src/typechain/
cp -R contracts/artifacts/contracts/. backend/src/artifacts/contracts

cp -R contracts/deployments/. ui/deployments/ && cp -R contracts/typechain/. ui/typechain/
cp -R contracts/artifacts/contracts/. ui/artifacts/contracts

# .env
rm contracts/.env && cp .env contracts/.env
rm backend/.env && cp .env backend/.env
rm ui/.env && cp .env ui/.env