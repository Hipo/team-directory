FROM python:3.7.1

# Development
RUN apt-get update
RUN apt-get install -y --no-install-recommends postgresql-client
RUN apt-get install -y --no-install-recommends libgdal-dev
RUN apt-get install -y --no-install-recommends graphviz
RUN pip install --upgrade pip
RUN pip install fabric
RUN pip install gunicorn

# Debuggers
RUN pip install ipdb
RUN pip install pudb
RUN pip install pytest-pudb
RUN pip install web-pdb
RUN pip install ptvsd
RUN pip install daphne==2.2.5

WORKDIR /app
COPY ./requirements.txt ./
RUN pip install -r requirements.txt
