nvm use 10
echo "Kill all the running PM2 actions"
pm2 kill

echo "Jump to app folder"
cd /home/ec2-user/realtut-lms-ui

echo "Update app from Git"
git reset --hard
git pull

echo "Install app dependencies"
npm install

echo "start app"
npm run start:production
