FROM tarampampam/node:alpine
LABEL MAINTAINER 'Jared Leonard <jmaleonard@github.com>'
RUN npm install -g typescript ts-node
WORKDIR /home/app

COPY package.json /home/app/
COPY yarn.lock /home/app/
COPY . /home/app
RUN NODE_ENV=production yarn
EXPOSE 8000 443 9229 5432
COPY files/startscript.sh /root/startscript.sh
RUN chmod +x /root/startscript.sh
ENTRYPOINT ["bash", "/root/startscript.sh"]
