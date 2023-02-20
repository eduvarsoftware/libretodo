FROM ubuntu
RUN ln -s /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN apt update
RUN apt install -y nodejs npm wget git libpq5 postgresql
RUN npm i -g n@latest
RUN n lts
RUN apt remove -y nodejs npm
RUN apt autoremove
RUN apt autoclean
RUN pg_ctlcluster 12 main start
