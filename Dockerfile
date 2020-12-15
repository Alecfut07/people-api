FROM mongo-express:0.54

RUN apk update && apk --no-cache --update add vim

WORKDIR /usr/src

COPY ["package.json", "package-lock.json", "/usr/src/"]

RUN npm install --only=prod

COPY [".", "/usr/src/"]

EXPOSE 3000

CMD ["node", "app.js"]
