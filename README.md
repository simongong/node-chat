## Build and Deploy

You need `Ruby & Compass` to build and `Redis` to run node-chat.

Instructions below are verified on Ubuntu. You should change them accordingly if your OS is different.

### Install redis
```
# Install Redis
echo 'Install Redis'
cd /tmp
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
cd src
sudo cp redis-server /usr/local/bin/
sudo cp redis-cli /usr/local/bin/
echo 'Redis install completed. '
# Start redis
redis-server
```

### Build and Run
```
# Fetch src
git clone https://github.com/simongong/node-chat.git
cd node-chat
# Install gulp and dependencies
sudo npm install -g gulp 
npm install --save-dev gulp *(This is optional)*
sudo npm install gulp-browserify gulp-compass gulp-minify-css gulp-nodemon gulp-uglify node-underscorify
# Install node dependencies
sudo npm install
# Install Ruby and Compass (for gulp compile task)
sudo apt-get install ruby1.9.1
sudo apt-get install ruby1.9.1-dev
sudo gem install compass
# Build and run
gulp compile
gulp
```

### Access in web browser
http://127.0.0.1:3000