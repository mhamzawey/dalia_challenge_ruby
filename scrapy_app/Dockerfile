FROM badouralix/python-scrapy:latest

RUN apt-get update
RUN apt-get install -y git cron
RUN pip install requests

RUN mkdir -p /app
ADD ./cron /cron
RUN chmod 0600 /cron
RUN touch /var/log/scrapy.log
RUN crontab /cron

WORKDIR /app