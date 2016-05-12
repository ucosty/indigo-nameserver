FROM mhart/alpine-node
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 9998
EXPOSE 9999
CMD ["npm", "start"]
