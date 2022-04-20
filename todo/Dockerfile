FROM python:3.9-alpine3.15

RUN apk update && apk add -f postgresql postgresql-contrib libpq-dev python3-dev
RUN pip3 install --upgrade pip
COPY ../../todo/ ./
RUN pip3 install -r requirements.txt
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh