import os

CRAWLERS=['co_berlin','berghain']

os.chdir('/app/scrapy_events')
command = "scrapy crawl {}"
for craweler in CRAWLERS:
    os.system(command.format(craweler))