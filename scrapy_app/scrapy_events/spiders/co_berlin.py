import scrapy
import string
import datetime
import requests
import json


class CoBerlin(scrapy.Spider):
    name = "co_berlin"
    BASE_URL = "https://www.co-berlin.org"

    def start_requests(self):
        urls = [
            self.BASE_URL+"/en/calender",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def clean_text(self,text):
        printable = set(string.printable)
        return ''.join(filter(lambda x: x in printable, text))

    def parse(self, response):
        for event in response.css(".seite-c-single"):
            dict ={}
            title = event.css(".article-title::text").extract_first()
            category = event.css(".article-category::text").extract_first()
            desc = event.css(".article-text::text").extract_first()
            href = self.BASE_URL + event.css(".seite-c-single ::attr(href)").extract_first()
            try:
                start = [x.strip() for x in event.css(".date-display-start ::attr(content)").extract_first().split('T')][0]
                start = datetime.datetime.strptime(start, '%Y-%m-%d').strftime('%Y-%m-%d')# %I:%m:%s.%f')
                end = [x.strip() for x in event.css(".date-display-end ::attr(content)").extract_first().split('T')][0]
                end = datetime.datetime.strptime(end, '%Y-%m-%d').strftime('%Y-%m-%d')# %I:%m:%s.%f')#2018-10-21 12:04:26.255181 2018-12-02 12:12:1543708800.000000
            except:
                start = [x.strip() for x in event.css(".date-display-single ::attr(content)").extract_first().split('T')][0]
                start = datetime.datetime.strptime(start, '%Y-%m-%d').strftime('%Y-%m-%d')# %I:%m:%s.%f')
                end = start

            dict['title'] = self.clean_text(title)
            dict['start_date'] = start
            dict['end_date'] = end
            dict['category'] = self.clean_text(category)
            dict['link'] = href
            dict['description'] = self.clean_text(desc)
            dict['web_source'] = "Co-Berlin"
            header = {"Content-Type": "application/json"}
            dict = json.dumps(dict, ensure_ascii=False)
            print(dict)
            r = requests.post('http://api_ruby:3000/events/', data= dict, headers=header)
            print (r.json())





