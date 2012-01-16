Web Socket Testing
------------------

This repository just contains some experiments with nodejs.  For the most part, I just want to compare websockets to other techniques.

Steps to setup the tests on ubuntu:

~~~
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee --append /etc/apt/sources.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install curl
sudo apt-get install git
sudo apt-get install mongodb-10gen
curl http://npmjs.org/install.sh | sudo sh


ssh-keygen -t rsa -C "praetoriansentry@gmail.com"
cat  /home/praetoriansentry/.ssh/id_rsa.pub
ssh -T git@github.com
git config --global user.name "John Hilliard"
git config --global user.email praetoriansentry@gmail.com
~~~


