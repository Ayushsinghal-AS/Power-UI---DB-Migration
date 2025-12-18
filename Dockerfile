FROM postgres:15

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY . .

RUN chmod +x db/run_changed.sh

CMD ["bash", "db/run_changed.sh"]
