cd project_x/tradingeconomics/kafka

sudo ssh -i university.pem ubuntu@18.206.150.247
3.239.208.210
sudo ssh -i university.pem ubuntu@3.239.208.210


cd ../../opt/stella/socket
node socket_api.js
cd ../../opt/stella/node.js
node fetch.js
cd ../../opt/stella/kafka
python3 producer.py

fuser 3002/tcp
fuser -k 3002/tcp
sudo systemctl status kafka

sudo rm -r kafka/

sudo git clone https://github.com/stella-te/kafka

vim shift+v j c p
nano alt+6 y c ctrl+u p

cd /etc/supervisor/
sudo vim supervisord.conf
sudo supervisorctl reread
sudo supervisorctl update

cd /home/ubuntu/kafka_2.13-3.2.3/bin

sudo systemctl status kafka
./kafka-topics.sh --list --bootstrap-server localhost:9092

./kafka-topics.sh --describe --topic stella_stream --bootstrap-server localhost:9092

**********************************************
# linux
virtualenv -p python3 /tmp/VIRTUAL
source /tmp/VIRTUAL/bin/activate
which python3


**********************************************
cd /home/ubuntu/kafka_2.13-3.2.3/bin

./kafka-topics.sh --list --bootstrap-server localhost:9092

./kafka-topics.sh --describe --topic stella_stream --bootstrap-server localhost:9092

./kafka-console-consumer.sh --topic stella_stream --from-beginning --bootstrap-server localhost:9092

./kafka-topics.sh --create --topic stella_markets --bootstrap-server localhost:9092

cd ../../opt/stella/
python3 producer.py

-------------------------------------------------
./kafka-console-producer.sh --topic stella_stream --bootstrap-server localhost:9092
./kafka-console-producer.sh --broker-list PLAINTEXT://localhost:9092 --topic stella_stream

./kafka-console-producer.sh --topic test-web --bootstrap-server localhost:9092

************************************************
te.login('3aecf53b46e647f:dqfs4pyvdzdxo5y')

docker
github
python examples
nodejs

~/Downloads
sudo ssh -i university.pem ubuntu@18.206.150.247

{"s":"AAPL:US","p":"151,42"d":1663718400,"source":"APISTREAM","origin_script":"your_script"}

python3 -m venv venv

docker run hello-world

# initialize kafka and zookeeper
docker-compose -f docker-compose.yml up -d

# running port
docker ps

# transfer py file to docker
docker cp producer.py kafka:/app
docker cp consumer.py kafka:/app
docker cp message.py kafka:/app


# kafka shell
docker exec -it kafka /bin/sh
tar -xzf kafka_2.13-3.2.3.tgz

cd /opt/kafka_2.13-2.8.1/bin
cd kafka_2.13-3.2.3/bin

./zookeeper-server-start.sh ../config/zookeeper.properties
./kafka-server-start.sh ../config/server.properties

kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic stella_stream
./kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic stella_stream
./kafka-topics.sh --create --topic stella_stream --bootstrap-server localhost:9092

# localhost
kafka-topics.sh --list --zookeeper zookeeper:2181
./kafka-topics.sh --list --bootstrap-server localhost:9092
./kafka-topics.sh --describe --topic stella_stream --bootstrap-server localhost:9092
./kafka-console-producer.sh --topic stella_stream --bootstrap-server localhost:9092

./kafka-console-consumer.sh --topic stella_stream --from-beginning --bootstrap-server localhost:9092

./kafka-console-producer.sh --broker-list localhost:9092 --topic stella_stream
{'user_id': 1, 'recipient_id': 2, 'message': 'hi from stella' }
{'user_id': 2, 'recipient_id': 1, 'message': 'hi there' }

./kafka-console-producer.sh --broker-list PLAINTEXT://localhost:9092 --topic stella_stream


kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic stella_stream

kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic stella_stream --from-beginning


curl -u 'stella-te' https://api.github.com/user/repos -d '{"name":"kafta"}'

git clone https://github.com/stella-te/kafka



ps aux | grep zookeeper

kill -9 76048









# end
