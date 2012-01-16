#!/bin/bash
sudo service mysql stop
sudo service mongodb stop

sudo service apache2 restart
autobench --single_host --host1 127.0.0.1 --uri1 /test.php --low_rate 20 --high_rate 400 --rate_step 20 --num_call 10 --num_conn 5000 --file php.tsv
sudo service apache2 restart
sleep 15s

ps aux | grep "node test.js" | grep -v grep | awk '{print $2}' | xargs -I xxx kill xxx
nohup node test.js &
sleep 15s
autobench --single_host --host1 127.0.0.1 --port1 1337 --low_rate 20 --high_rate 400 --rate_step 20 --num_call 10 --num_conn 5000 --file node.tsv
ps aux | grep "node test.js" | grep -v grep | awk '{print $2}' | xargs -I xxx kill xxx
