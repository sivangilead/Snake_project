## Use an official Python runtime as an image
FROM python:3.6.6 as dependencies-base
#
## The EXPOSE instruction indicates the ports on which a container # # will listen for connections
## Since Flask apps listen to port 5000  by default, we expose it
RUN mkdir HOMEDIR
COPY ./run.sh HOMEDIR
COPY ./server HOMEDIR/server
#
## Sets the working directory for following COPY and CMD instructions
## Notice we haven’t created a directory by this name - this
## instruction creates a directory with this name if it doesn’t exist
WORKDIR HOMEDIR/server
#
## Install any needed packages specified in requirements.txt
#COPY requirements.txt /server
RUN pip install -r requirements.txt


WORKDIR /HOMEDIR
ENV FLASK_ENV="docker"
EXPOSE 5000
CMD ["bash","run.sh"]
#



