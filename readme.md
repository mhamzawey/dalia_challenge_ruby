**Project Target:**

    - A multi website agenda

    - Collect all the cultural activities in Berlin into one.
    - The specifications:
        -Collect the information for your website from other web sources.
            - https://www.co-berlin.org/en/calender
            - http://berghain.de/events/
    - Events filter: User can filter the events based on different criteria:
          - Web Source
          - Dates
          - Simple partial text search on title.
**Implementation:**

    - Implement the code needed to parse 2 of the "web sources" into the standardized format.
    - Implement the code needed to collect the standardized format and render it in a website.
    - Add some simple filtering mechanism (based on backend filtering, not frontend JS filtering)
    - Prepare your code for easy deployment

**Prerequisites:**

    docker
    docker-compose

**Starting Project:**

    1- git clone https://github.com/mhamzawey/dalia_challenge_ruby

    2- cd dalia_challenge_ruby

    3- docker-compose up -d --build

    4- wait 2-3 minutes till the composer builds and starts the containers

    5- Go to your browser:- To access the front-end visit -> http:localhost:3000/

**Important Note: sometimes cron tasks are not triggered automatically,
so for testing purposes, execute the following command from your terminal:**
`docker exec -it api python /app/scrapy_events/core.py`

**Project Setup:**

Project consists of **Five** docker contaiers:

**1- api_ruby:**

    - built on top of ruby:2.5
    - This api is a Rails project that has model:
        1- events:
            - A model called `event` which has those attributes: `{id, title ,description, category, start_date, end_date, link ,created_at, updated_at}`
            - We have one main filters in this api:
                -starts_with:
                    - Responsible for filtering using title
            - Test cases: added 16 test cases for testing CRUD events
            - To run test case manually : `docker exec -it api_ruby  bundle exec rspec`
            - Can be automated using any ci/cd over Gitlab CI/CD, Jenkins, or Github Cirrus


**2- scrappy_app:**

    - A crawler that's built on the Scrapy Framework that has two spiders:
        - co_berlin: that scrapes the events on co_berlin website
        - berghain: that scrapes the events on berghain website

    - This is scalable as we can define any other spider we need and handle its case and map it to our own serializer
    - Scrapping done as a crontask that gets registered once the api container is up and running
        - Cron job runs every 1 minute, this can be enhanced according to the needed time.

**3- mysqldb_ruby:**

    - Built on top of mysql:5.7
    - Doesn't persist data, can be presisted by adding volumes to the docker-compose file
    - It is the default database, we use another container for test cases

**4- mysqldb_ruby_test:**

    - Built on top of mysql:5.7
    - Doesn't persist data, can be presisted by adding volumes to the docker-compose file
    - Used purely for Rspec test cases

**5- front-end:**

    - Built on top of node:9.6.1
    - A versy simple ReactJS app that integrates with the api
    - It fetches from the `api_ruby` the events and has a search bar that does backend searching on `title`
    - There's another endpoint that can filter by dates that you can access via the swagger documentation `events/filter/`

**To clean up everything afterwards, docker-compose down**

**Future Enhancements:**

    - Writing all unit test cases for the three frameworks and triggering them in the .cirrus.yml CI:
        - Rails
        - Scrapy
        - ReactJs

    - Writing the whole cycle for deployment in the .cirrus.yml CD or Jenkins:
        - Use ECS (AWS) to deploy the Django & Scrapy Container
        - User RDS for the MySQL DB
        - Use S3 (AWS) for ReactJS app