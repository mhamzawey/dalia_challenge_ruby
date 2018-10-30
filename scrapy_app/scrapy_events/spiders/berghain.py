import scrapy
import string
import io
import datetime
import json
import requests


class Berghain(scrapy.Spider):
    name = "berghain"

    BASE_URL ="http://berghain.de"

    events_url = BASE_URL+"/event/{}"

    months = ["2018-10","2018-11","2018-10","2018-12","2018-09","2019-02"]



    urls = []
    for month in months:
        urls.append(events_url.format("s"+month))



    def start_requests(self):
        for url in self.urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def clean_text(self,text):
        printable = set(string.printable)
        return ''.join(filter(lambda x: x in printable, text))

    def parse(self, response):
        for type in response.css(".navi_level3_extra ::attr(class)"):
            if type.extract() != "navi_level3_extra":
                _class = ".col_teaser_{}"
                for event in response.css(_class.format(type.extract())):
                    dict = {}
                    date =[x.strip() for x in event.css("."+type.extract()+" ::attr(title)").extract_first().split(':')][0]
                    title = [x.strip() for x in event.css("."+type.extract()+" ::attr(title)").extract_first().split(':')][1]
                    start = datetime.datetime.strptime(date, '%a %d %B %Y').strftime('%Y-%m-%d')
                    end = datetime.datetime.strptime(date, '%a %d %B %Y').strftime('%Y-%m-%d')
                    category = response.css("."+type.extract() +"::text").extract_first()
                    href = self.BASE_URL + event.css("."+type.extract()+" ::attr(href)").extract_first()
                    desc = event.css("."+type.extract()+"_color span::text").extract()[1]

                    dict['title'] = self.clean_text(title)
                    dict['start_date'] = start
                    dict['end_date'] = end
                    dict['category'] = self.clean_text(category)
                    dict['link'] = href
                    dict['description'] = self.clean_text(desc)
                    dict['web_source'] = "Berghain"
                    header = {"Content-Type": "application/json"}
                    dict = json.dumps(dict, ensure_ascii=False)
                    print(dict)
                    r = requests.post('http://api_ruby:3000/events/', data= dict, headers=header)
                    print (r.json())









