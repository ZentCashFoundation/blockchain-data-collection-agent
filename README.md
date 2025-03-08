![Zent Cash](https://github.com/ZentCashFoundation/brand/blob/master/logo/wordmark/zentcash_wordmark_color.png "Zent Cash")
# Zent Cash: Blockchain Data Collection Agent
Collects Zent Cash blockchain data into a SQL backend. The SQL backend serves other services, such as blockchain explorer, mobile wallet, and third party payment services. 

## Prerequisites

- Zent Cash >= 1.28.4
- node >=14
- MariaDB/MySQL with InnoDB support

## Hardware Requirements

For the best performance when using this package (as of April 8, 2025), your Database server must have a minimum of the following:

* 12GB RAM
  * 8GB dedicated to MariaDB/MySQL
* 4 CPU Cores (8 Recommended)
* SSD Storage (NVMe Recommended)

## Install

```sh
npm install
```

## Usage

1) Set your environment variables and start the service up

```sh
export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_USERNAME=yourdbusername
export MYSQL_PASSWORD=yourdbpassword
export MYSQL_DATABASE=yourdbname
export NODE_HOST=localhost
export NODE_PORT=21698
npm start
```

## Run tests

```sh
npm test
```

## Donate
Help us integrate Zent Cash into multiple platforms.
- **BTC: bc1qxzh342p9alru57gz29jexxlc90rdqzvzlvr6lz**

- **LTC: ltc1qyaalrjd6qkg9805774hfwtrccwuencz8xeetcz**

- **DOGE: D9M7Ef8G134iLeLP5cigvMNZ63gBZGAFJW**

- **ETH: 0xA16e6d3191B7EE5819Ea9d67e7d476f8881eB793**