#!/bin/bash

#Small script to benchmark node and apache
ulimit -n 3000

sudo service apache2 restart

ab -k -r -n 10000 -c 100 -g php_10000_100.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 200 -g php_10000_200.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 300 -g php_10000_300.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 400 -g php_10000_400.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 500 -g php_10000_500.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 600 -g php_10000_600.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 700 -g php_10000_700.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 800 -g php_10000_800.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 900 -g php_10000_900.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1000 -g php_10000_1000.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1100 -g php_10000_1100.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1200 -g php_10000_1200.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1300 -g php_10000_1300.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1400 -g php_10000_1400.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1500 -g php_10000_1500.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1600 -g php_10000_1600.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1700 -g php_10000_1700.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1800 -g php_10000_1800.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 1900 -g php_10000_1900.dat http://127.0.0.1/test.php
sleep 15s

ab -k -r -n 10000 -c 2000 -g php_10000_2000.dat http://127.0.0.1/test.php
sleep 15s

sudo service apache2 restart


ps aux | grep "node test.js" | grep -v grep | awk '{print $2}' | xargs -I xxx kill xxx
nohup node test.js &
ab -k -r -n 10000 -c 100 -g node_10000_100.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 200 -g node_10000_200.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 300 -g node_10000_300.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 400 -g node_10000_400.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 500 -g node_10000_500.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 600 -g node_10000_600.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 700 -g node_10000_700.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 800 -g node_10000_800.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 900 -g node_10000_900.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1000 -g node_10000_1000.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1100 -g node_10000_1100.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1200 -g node_10000_1200.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1300 -g node_10000_1300.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1400 -g node_10000_1400.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1500 -g node_10000_1500.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1600 -g node_10000_1600.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1700 -g node_10000_1700.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1800 -g node_10000_1800.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 1900 -g node_10000_1900.dat http://127.0.0.1:1337/
sleep 15s

ab -k -r -n 10000 -c 2000 -g node_10000_2000.dat http://127.0.0.1:1337/
sleep 15s

ps aux | grep "node test.js" | grep -v grep | awk '{print $2}' | xargs -I xxx kill xxx
